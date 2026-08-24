import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { validateFlashcardAnswer, FlashcardItem } from "../components/study-quiz/FlashcardQuiz";

describe("FlashcardQuiz Validation Logic", () => {
  test("validates exact and case-insensitive port numbers", () => {
    const card: FlashcardItem = {
      id: "fc-test-ssh",
      prompt: "What is the standard port number for SSH?",
      answer: "22",
      aliases: ["22", "tcp 22", "port 22"],
      keywords: ["22"],
    };

    assert.strictEqual(validateFlashcardAnswer(card, "22"), true);
    assert.strictEqual(validateFlashcardAnswer(card, " 22 "), true);
    assert.strictEqual(validateFlashcardAnswer(card, "tcp 22"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "port 22"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "23"), false);
    assert.strictEqual(validateFlashcardAnswer(card, ""), false);
  });

  test("validates acronyms and full names in parentheses", () => {
    const card: FlashcardItem = {
      id: "fc-test-protocol",
      prompt: "Which secure CLI protocol operates on port 22?",
      answer: "SSH (Secure Shell)",
      aliases: ["ssh", "secure shell", "ssh (secure shell)"],
      keywords: ["ssh"],
    };

    assert.strictEqual(validateFlashcardAnswer(card, "SSH (Secure Shell)"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "ssh"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "secure shell"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "SSH"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "telnet"), false);
  });

  test("validates port range formatting and aliases", () => {
    const card: FlashcardItem = {
      id: "fc-test-range",
      prompt: "What is the designated port number range for System / Well-Known ports?",
      answer: "0 to 1023",
      aliases: ["0-1023", "0 to 1023", "0 - 1023", "0 through 1023"],
      keywords: ["0", "1023"],
    };

    assert.strictEqual(validateFlashcardAnswer(card, "0 to 1023"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "0-1023"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "0 - 1023"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "0 through 1023"), true);
    assert.strictEqual(validateFlashcardAnswer(card, "1024 to 49151"), false);
  });

  test("validates multi-port entries such as DHCP and SMB", () => {
    const dhcpCard: FlashcardItem = {
      id: "fc-test-dhcp",
      prompt: "Which ports and transport protocol are used by DHCP?",
      answer: "UDP 67, 68",
      aliases: ["udp 67, 68", "udp 67,68", "udp 67 and 68", "udp 67/68", "udp 67 68", "67, 68 udp"],
      keywords: ["udp", "67", "68"],
    };

    assert.strictEqual(validateFlashcardAnswer(dhcpCard, "UDP 67, 68"), true);
    assert.strictEqual(validateFlashcardAnswer(dhcpCard, "udp 67, 68"), true);
    assert.strictEqual(validateFlashcardAnswer(dhcpCard, "67, 68 udp"), true);
    assert.strictEqual(validateFlashcardAnswer(dhcpCard, "TCP 67, 68"), false);
    assert.strictEqual(validateFlashcardAnswer(dhcpCard, "67"), false);
    assert.strictEqual(validateFlashcardAnswer(dhcpCard, "69"), false);
  });

  test("validates port + transport questions strictly and rejects wrong transport protocol (e.g. L2TP, SNMP)", () => {
    const l2tpCard: FlashcardItem = {
      id: "fc-l2tp-port",
      category: "VPN & Tunneling",
      prompt: "What is the standard port number and transport protocol for L2TP (Layer 2 Tunneling Protocol)?",
      answer: "UDP 1701",
      aliases: ["udp 1701", "port 1701 udp", "udp port 1701", "1701 udp", "1701/udp"],
      keywords: ["udp", "1701"],
      options: ["UDP 1701", "TCP 1701", "TCP 389", "TCP 3389"],
    };

    assert.strictEqual(validateFlashcardAnswer(l2tpCard, "UDP 1701"), true);
    assert.strictEqual(validateFlashcardAnswer(l2tpCard, "udp 1701"), true);
    assert.strictEqual(validateFlashcardAnswer(l2tpCard, "1701 udp"), true);
    assert.strictEqual(validateFlashcardAnswer(l2tpCard, "TCP 1701"), false);
    assert.strictEqual(validateFlashcardAnswer(l2tpCard, "tcp 1701"), false);
    assert.strictEqual(validateFlashcardAnswer(l2tpCard, "TCP 389"), false);
    assert.strictEqual(validateFlashcardAnswer(l2tpCard, "TCP 3389"), false);

    const snmpCard: FlashcardItem = {
      id: "fc-snmp-port",
      category: "Network Management",
      prompt: "What is the standard port number and transport protocol for SNMP (Simple Network Management Protocol)?",
      answer: "UDP 161",
      aliases: ["udp 161", "port 161 udp", "udp port 161", "161 udp", "161/udp"],
      keywords: ["udp", "161"],
      options: ["UDP 161", "TCP 161", "TCP 389", "UDP 1701"],
    };

    assert.strictEqual(validateFlashcardAnswer(snmpCard, "UDP 161"), true);
    assert.strictEqual(validateFlashcardAnswer(snmpCard, "udp 161"), true);
    assert.strictEqual(validateFlashcardAnswer(snmpCard, "TCP 161"), false);
    assert.strictEqual(validateFlashcardAnswer(snmpCard, "tcp 161"), false);
    assert.strictEqual(validateFlashcardAnswer(snmpCard, "TCP 389"), false);
    assert.strictEqual(validateFlashcardAnswer(snmpCard, "UDP 1701"), false);
  });

  test("rejects substring number collisions (e.g. 8443 for 443, 8080 for 80, 3389 for 389)", () => {
    const httpsCard: FlashcardItem = {
      id: "fc-https-port",
      category: "Web Protocols",
      prompt: "What is the standard port number for encrypted HTTPS web traffic?",
      answer: "443",
      aliases: ["443", "tcp 443", "port 443", "tcp port 443"],
      keywords: ["443"],
      options: ["443", "80", "8443", "22"],
    };

    assert.strictEqual(validateFlashcardAnswer(httpsCard, "443"), true);
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "tcp 443"), true);
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "port 443"), true);
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "tcp port 443"), true);
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "443/tcp"), true);
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "it uses port 443"), true);

    // Rejects distractor 8443 and other numbers containing 443
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "8443"), false);
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "4430"), false);
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "1443"), false);
    assert.strictEqual(validateFlashcardAnswer(httpsCard, "80"), false);

    const httpCard: FlashcardItem = {
      id: "fc-http-port",
      category: "Web Protocols",
      prompt: "What is the standard port number for unencrypted HTTP web traffic?",
      answer: "80",
      aliases: ["80", "tcp 80", "port 80", "tcp port 80"],
      keywords: ["80"],
      options: ["80", "443", "8080", "53"],
    };

    assert.strictEqual(validateFlashcardAnswer(httpCard, "80"), true);
    assert.strictEqual(validateFlashcardAnswer(httpCard, "tcp 80"), true);
    assert.strictEqual(validateFlashcardAnswer(httpCard, "8080"), false);
    assert.strictEqual(validateFlashcardAnswer(httpCard, "180"), false);
    assert.strictEqual(validateFlashcardAnswer(httpCard, "800"), false);

    const ldapCard: FlashcardItem = {
      id: "fc-ldap-port",
      category: "Directory Services",
      prompt: "What is the standard port number for LDAP (Lightweight Directory Access Protocol)?",
      answer: "389",
      aliases: ["389", "tcp 389", "port 389", "tcp port 389"],
      keywords: ["389"],
      options: ["389", "1701", "3389", "143"],
    };

    assert.strictEqual(validateFlashcardAnswer(ldapCard, "389"), true);
    assert.strictEqual(validateFlashcardAnswer(ldapCard, "tcp 389"), true);
    assert.strictEqual(validateFlashcardAnswer(ldapCard, "3389"), false);
    assert.strictEqual(validateFlashcardAnswer(ldapCard, "1701"), false);
  });

  test("validates TCP reliability and rejects 'Connectionless and not reliable' distractor", () => {
    const tcpCard: FlashcardItem = {
      id: "fc-tcp-reliability",
      category: "Transport Protocols",
      prompt: "What are the primary operational characteristics of TCP (Transmission Control Protocol)?",
      answer: "Connection-oriented and reliable",
      aliases: [
        "connection-oriented and reliable",
        "reliable and connection-oriented",
        "connection-oriented",
        "connection oriented",
        "connection oriented and reliable",
        "reliable and connection oriented",
      ],
      keywords: ["connection", "reliable"],
      options: [
        "Connection-oriented and reliable",
        "Connectionless and not reliable",
        "Broadcast-only and best-effort",
        "Hardware-based with no flow control",
      ],
    };

    assert.strictEqual(validateFlashcardAnswer(tcpCard, "Connection-oriented and reliable"), true);
    assert.strictEqual(validateFlashcardAnswer(tcpCard, "connection-oriented and reliable"), true);
    assert.strictEqual(validateFlashcardAnswer(tcpCard, "connection-oriented"), true);
    assert.strictEqual(validateFlashcardAnswer(tcpCard, "connection oriented"), true);
    assert.strictEqual(validateFlashcardAnswer(tcpCard, "reliable and connection-oriented"), true);

    // Reject wrong distractors
    assert.strictEqual(validateFlashcardAnswer(tcpCard, "Connectionless and not reliable"), false);
    assert.strictEqual(validateFlashcardAnswer(tcpCard, "connectionless and not reliable"), false);
    assert.strictEqual(validateFlashcardAnswer(tcpCard, "Broadcast-only and best-effort"), false);
    assert.strictEqual(validateFlashcardAnswer(tcpCard, "Hardware-based with no flow control"), false);
  });
});
