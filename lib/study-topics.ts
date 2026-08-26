import type { StudyTopicEntry } from "@/lib/json-quizzes";

function topicDateValue(date: string): number {
  const firstDate = date.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (!firstDate) return Number.POSITIVE_INFINITY;

  const [, month, day, explicitYear] = firstDate;
  const year = explicitYear ?? date.match(/\/(\d{2,4})$/)?.[1];
  if (!year) return Number.POSITIVE_INFINITY;

  const normalizedYear = year.length === 2 ? 2000 + Number(year) : Number(year);
  const value = new Date(normalizedYear, Number(month) - 1, Number(day)).getTime();
  return Number.isNaN(value) ? Number.POSITIVE_INFINITY : value;
}

export function sortStudyTopicsByDate(topics: StudyTopicEntry[]): StudyTopicEntry[] {
  return topics
    .map((topic, index) => ({ topic, index }))
    .sort((a, b) => topicDateValue(a.topic.date) - topicDateValue(b.topic.date) || a.index - b.index)
    .map(({ topic }) => topic);
}

// -------- static, hand-authored topics --------
export const STATIC_STUDY_TOPICS: StudyTopicEntry[] = [
  {
    href: "/osi-model",
    title: "OSI Model",
    date: "8/10-12/26",
    description: "The 7 layers of the Open Systems Interconnection model.",
  },
  {
    href: "/networking-tools",
    title: "Networking Tools",
    date: "8/11/26",
    description: "Tools of the trade for networking professionals.",
  },
  {
    href: "/modem-router",
    title: "Modems VS Routers",
    date: "8/11/26",
    description: "Difference between modems and routers.",
  },
  {
    href: "/eia-tia-standard",
    title: "EIA/TIA 568B Standard Specification",
    date: "8/11/26",
    description: "Order of the colored wires in a CAT5/CAT6 cable plug.",
  },
  {
    href: "/bits-nibbles-bytes",
    title: "Bits, Nibbles, and Bytes",
    date: "8/13/26",
    description: "Bits, nibbles, bytes, kilobits, megabytes, etc.",
  },
  {
    href: "/binary-calculation",
    title: "Binary Calculation",
    date: "8/13/26",
    description: "Calculating binary numbers.",
  },
  {
    href: "/communication-types",
    title: "Communication Types",
    date: "8/13/26",
    description: "Simplex, Half-Duplex, Full Duplex.",
  },
  {
    href: "/network-topologies",
    title: "Wired Network Topologies",
    date: "8/14/26",
    description: "Network layouts; Star, ring, bus, mesh.",
  },
  {
    href: "/802.3-ethernet-standards",
    title: "Wired Ethernet Standards",
    date: "8/14/26",
    description: "802.3 wired ethernet IEEE standards chart.",
  },
  {
    href: "/patch-vs-crossover-cables",
    title: "Patch VS Crossover Cables",
    date: "8/14/26",
    description: "Patch (straight) cables VS crossover cables and shielded vs unshielded twisted pairs.",
  },
  {
    href: "/cable-ratings",
    title: "Cable Ratings",
    date: "8/14/26",
    description: "PVC vs Plenum-rated cable specifications and fire safety ratings.",
  },
  {
    href: "/esd-emi-emp",
    title: "ESD, EMI, & EMP",
    date: "8/14/26",
    description: "Electrostatic discharges, electromagnetic interference, and electromagnetic pulses.",
  },
  {
    href: "/wireless-802-11",
    title: "Wireless 802.11",
    date: "8/18/26",
    description: "Radio frequencies (2.4/5 GHz) and wireless security (WPA2/WPA3 router setup simulator).",
  },
  {
    href: "/802.11-wireless-standards",
    title: "Wireless Wi-Fi Standards",
    date: "8/18/26",
    description: "802.11 wireless IEEE standards chart, frequencies, speeds, and distances.",
  },
  {
    href: "/wired-vs-wireless",
    title: "Wired VS Wireless",
    date: "8/18/26",
    description: "Comparing wired vs wireless characteristics and contention methods (CSMA/CD vs CSMA/CA).",
  },
  {
    href: "/wan-technologies",
    title: "WAN Technologies",
    date: "8/18/26",
    description: "Comparing WAN technologies: POTS dial-up modems, and digital carrier line specifications.",
  },
  {
    href: "/data-link-layer",
    title: "Data-Link Layer",
    date: "8/19/26",
    description: "LLC and MAC sublayers, MAC addressing, and Layer 2 networking concepts.",
  },
  {
    href: "/hexadecimal",
    title: "Hexadecimal",
    date: "8/19/26",
    description: "Hexadecimal base-16 number system and converting between hex, binary, and decimal.",
  },
  {
    href: "/layer-2-switches",
    title: "Layer 2 Switches",
    date: "8/20/26",
    description: "Layer 2 switch operation, MAC/CAM tables, port mapping, and frame broadcasting.",
  },
  {
    href: "/network-layer-ip-addresses",
    title: "Network Layer - IP Addresses",
    date: "8/20/26",
    description: "IPv4/IPv6 architecture, address spaces, public vs private IP addresses, NAT, APIPA, and loopback.",
  },
  {
    href: "/private-ip-classes",
    title: "Private IP Address Classes",
    date: "8/20/26",
    description: "Private IPv4 address ranges, Class A/B/C allocations, and default subnet masks.",
  },
  {
    href: "/ip-address-classes",
    title: "General IP Address Classes",
    date: "8/20/26",
    description: "Class A through E IPv4 classifications, network numbers, Net/Host layouts, subnet masks, and capacities.",
  },
  {
    href: "/ports",
    title: "Transport Layer Ports",
    date: "8/24/26",
    description: "Transport layer protocols/Application ports and TCP/UDP.",
  },
  {
    href: "/nat",
    title: "Network Address Translation (NAT)",
    date: "8/25/26",
    description: "Static, Dynamic, and PAT (Port Address Translation) NAT configurations.",
  },
  {
    href: "/ftp",
    title: "File Transfer Protocol (FTP): FTP, SFTP, & TFTP",
    date: "8/25/26",
    description: "Difference between FTP, SFTP, and TFTP protocols.",
  },
  {
    href: "/ip-address-assignment",
    title: "IP Address Assignment (IPv4)",
    date: "8/25/26",
    description: "Static vs automatic IP address assignment, DHCP, & DORA.",
  },
  {
    href: "/dns",
    title: "Domain Name Service (DNS)",
    date: "8/25/26",
    description: "DNS servers, record types, and name resolution.",
  },
  {
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "ᚳᛚᛁᚳᚴ  ᛏᛟ  ᛒᛖ  ᚱᛁᚳᚴᚱᛟᛚᛚᛖᛞ",
    date: "1/2/34",
    description: "An important supplemental study resource.",
  },
];
