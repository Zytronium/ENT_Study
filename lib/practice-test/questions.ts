import { MasterQuestion } from "./types";

export const MASTER_QUESTIONS: MasterQuestion[] = [
  // ==========================================
  // MODULE 1: OSI MODEL
  // ==========================================
  {
    id: "q-osi-l1",
    moduleId: "osi-model",
    moduleName: "OSI Model",
    category: "Layer Roles",
    primary: {
      prompt: "Which OSI model layer is responsible for transmitting raw binary bits across physical media such as copper wires, fiber optics, or radio signals?",
      options: ["Physical Layer (Layer 1)", "Data-Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)"],
      answer: "Physical Layer (Layer 1)",
      explanation: "The Physical layer (Layer 1) deals with transmitting raw bits over physical mediums including copper, fiber, and wireless frequencies.",
      aliases: ["physical", "layer 1", "physical layer", "l1"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "At which layer of the OSI architecture do physical components like patch cables, network hubs, and wireless antennas operate?",
      options: ["Physical Layer (Layer 1)", "Session Layer (Layer 5)", "Data-Link Layer (Layer 2)", "Network Layer (Layer 3)"],
      answer: "Physical Layer (Layer 1)",
      explanation: "Physical cables, hubs, and antennas operate at Layer 1 (Physical layer).",
      aliases: ["physical", "layer 1", "physical layer", "l1"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-osi-l2",
    moduleId: "osi-model",
    moduleName: "OSI Model",
    category: "Layer Roles",
    primary: {
      prompt: "Which OSI layer provides node-to-node communication across a local network using physical MAC addressing?",
      options: ["Data-Link Layer (Layer 2)", "Network Layer (Layer 3)", "Session Layer (Layer 5)", "Physical Layer (Layer 1)"],
      answer: "Data-Link Layer (Layer 2)",
      explanation: "Layer 2 (Data-Link) handles local frame delivery, MAC addressing, and switch operations.",
      aliases: ["data-link", "data link", "layer 2", "l2", "datalink"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Network switches and network interface cards (NICs) primarily function at which layer of the Open Systems Interconnection model?",
      options: ["Data-Link Layer (Layer 2)", "Transport Layer (Layer 4)", "Presentation Layer (Layer 6)", "Network Layer (Layer 3)"],
      answer: "Data-Link Layer (Layer 2)",
      explanation: "Switches and NIC hardware operate at Layer 2 (Data-Link layer).",
      aliases: ["data-link", "data link", "layer 2", "l2", "datalink"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-osi-l3",
    moduleId: "osi-model",
    moduleName: "OSI Model",
    category: "Layer Roles",
    primary: {
      prompt: "Which OSI layer manages logical IP addressing and path routing across multiple interconnected networks?",
      options: ["Network Layer (Layer 3)", "Data-Link Layer (Layer 2)", "Transport Layer (Layer 4)", "Session Layer (Layer 5)"],
      answer: "Network Layer (Layer 3)",
      explanation: "The Network layer (Layer 3) handles IP addressing and router packet forwarding.",
      aliases: ["network", "layer 3", "network layer", "l3"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Routers making packet forwarding decisions based on IPv4 or IPv6 headers operate at which OSI layer?",
      options: ["Network Layer (Layer 3)", "Physical Layer (Layer 1)", "Data-Link Layer (Layer 2)", "Application Layer (Layer 7)"],
      answer: "Network Layer (Layer 3)",
      explanation: "Routers and logical IP addressing operate at Layer 3 (Network layer).",
      aliases: ["network", "layer 3", "network layer", "l3"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-osi-l4",
    moduleId: "osi-model",
    moduleName: "OSI Model",
    category: "Layer Roles",
    primary: {
      prompt: "Which layer of the OSI model provides end-to-end flow control, reliability, and error correction using TCP and UDP?",
      options: ["Transport Layer (Layer 4)", "Session Layer (Layer 5)", "Network Layer (Layer 3)", "Presentation Layer (Layer 6)"],
      answer: "Transport Layer (Layer 4)",
      explanation: "The Transport layer (Layer 4) handles reliable end-to-end flow control and segment delivery via TCP and UDP.",
      aliases: ["transport", "layer 4", "transport layer", "l4"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "End-to-end flow control protocols like TCP and connectionless protocols like UDP are managed at which OSI layer?",
      options: ["Transport Layer (Layer 4)", "Data-Link Layer (Layer 2)", "Application Layer (Layer 7)", "Session Layer (Layer 5)"],
      answer: "Transport Layer (Layer 4)",
      explanation: "TCP and UDP protocols operate at Layer 4 (Transport layer).",
      aliases: ["transport", "layer 4", "transport layer", "l4"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-osi-l5-l7",
    moduleId: "osi-model",
    moduleName: "OSI Model",
    category: "Upper Layers",
    primary: {
      prompt: "Which OSI layer is directly responsible for data translation, syntax representation, and cryptographic encryption?",
      options: ["Presentation Layer (Layer 6)", "Session Layer (Layer 5)", "Application Layer (Layer 7)", "Transport Layer (Layer 4)"],
      answer: "Presentation Layer (Layer 6)",
      explanation: "Layer 6 (Presentation layer) handles translation, data formatting, and encryption.",
      aliases: ["presentation", "layer 6", "presentation layer", "l6"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Handling encryption, decryption, and data format translation between network systems occurs at which OSI layer?",
      options: ["Presentation Layer (Layer 6)", "Network Layer (Layer 3)", "Session Layer (Layer 5)", "Physical Layer (Layer 1)"],
      answer: "Presentation Layer (Layer 6)",
      explanation: "Presentation layer (Layer 6) handles encryption and translation.",
      aliases: ["presentation", "layer 6", "presentation layer", "l6"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 2: NETWORKING TOOLS
  // ==========================================
  {
    id: "q-tool-crimper-stripper",
    moduleId: "networking-tools",
    moduleName: "Networking Tools",
    category: "Cable Preparation",
    primary: {
      prompt: "Which tool is specifically designed to attach RJ45 connector plugs onto the ends of twisted pair network cables?",
      options: ["Wire Crimper", "Cable Stripper", "Punch Down Tool", "Tone Generator"],
      answer: "Wire Crimper",
      explanation: "A wire crimper permanently secures RJ45/RJ11 connectors onto cable ends.",
      aliases: ["crimper", "wire crimper", "crimping tool"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "When terminating a CAT6 patch cord with an RJ45 modular connector, which hand tool secures the pins onto the copper wires?",
      options: ["Wire Crimper", "Cable Tester", "Butt Set", "TDR"],
      answer: "Wire Crimper",
      explanation: "Wire crimpers terminate connectors onto twisted pair cables.",
      aliases: ["crimper", "wire crimper", "crimping tool"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-tool-tester-tone",
    moduleId: "networking-tools",
    moduleName: "Networking Tools",
    category: "Testing & Tracing",
    primary: {
      prompt: "Which tool combination is used to trace and locate the opposite end of an unlabeled cable in a patch panel by generating an audible signal?",
      options: ["Tone Generator", "Loopback Adapter", "Light Meter", "Wire Crimper"],
      answer: "Tone Generator",
      explanation: "A tone generator (and probe) emits and detects an audible tone to trace hidden or unlabeled cable runs.",
      aliases: ["tone generator", "toner", "tone probe", "tone generator and probe"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "An administrator needs to identify which wall jack in an office connects to which port on a distant server rack. Which tool generates the test signal for tracing?",
      options: ["Tone Generator", "Butt Set", "Multimeter", "Cable Stripper"],
      answer: "Tone Generator",
      explanation: "Tone generators locate the opposite end of cable runs across rooms or racks.",
      aliases: ["tone generator", "toner", "tone probe", "tone generator and probe"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-tool-tdr-otdr",
    moduleId: "networking-tools",
    moduleName: "Networking Tools",
    category: "Fault Isolation",
    primary: {
      prompt: "Which diagnostic instrument detects breaks and measures distance to faults in copper network cabling by sending electrical pulses?",
      options: ["TDR (Time Domain Reflectometer)", "OTDR (Optical Time Domain Reflectometer)", "Light Meter", "Multimeter"],
      answer: "TDR (Time Domain Reflectometer)",
      explanation: "TDR sends electrical pulses through copper cables to detect faults and measure distance to breaks.",
      aliases: ["tdr", "time domain reflectometer"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "To pinpoint the exact physical location of a severed fiber optic strand along a multi-kilometer link, which device sends light pulses down the fiber?",
      options: ["OTDR (Optical Time Domain Reflectometer)", "TDR (Time Domain Reflectometer)", "Loopback Adapter", "Light Meter"],
      answer: "OTDR (Optical Time Domain Reflectometer)",
      explanation: "OTDR uses light pulses to locate breaks and attenuation points in optical fiber cables.",
      aliases: ["otdr", "optical time domain reflectometer"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-tool-punchdown-buttset",
    moduleId: "networking-tools",
    moduleName: "Networking Tools",
    category: "Telecom & Termination",
    primary: {
      prompt: "Which tool is used to seat individual twisted pair wires into a 110 or punch block while trimming off the excess wire simultaneously?",
      options: ["Punch Down Tool", "Wire Crimper", "Cable Stripper", "Loopback Adapter"],
      answer: "Punch Down Tool",
      explanation: "A punch down tool seats wire pairs into termination blocks and automatically cuts off excess wire.",
      aliases: ["punch down tool", "punch down", "punchdown", "punchdown tool"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "When terminating network cables into keystone jacks or patch panel blocks, which tool forces the wire into the IDC blade and shears the remnant?",
      options: ["Punch Down Tool", "Multimeter", "Tone Generator", "Cable Tester"],
      answer: "Punch Down Tool",
      explanation: "Punch down tools seat and trim wires in punch blocks and keystone jacks.",
      aliases: ["punch down tool", "punch down", "punchdown", "punchdown tool"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-tool-loopback-multimeter",
    moduleId: "networking-tools",
    moduleName: "Networking Tools",
    category: "Port & Electrical Testing",
    primary: {
      prompt: "Which device is plugged directly into a network interface card (NIC) or switch port to verify physical port hardware functionality by redirecting outbound traffic back to the input?",
      options: ["Loopback Adapter", "Tone Generator", "Cable Stripper", "Butt Set"],
      answer: "Loopback Adapter",
      explanation: "A loopback adapter redirects transmit signals back to receive pins to test physical port circuitry.",
      aliases: ["loopback adapter", "loopback", "loopback plug"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "To test whether an Ethernet switch port's physical transceiver is operating without connecting to another host, which test plug should be inserted?",
      options: ["Loopback Adapter", "Light Meter", "TDR", "Punch Down Tool"],
      answer: "Loopback Adapter",
      explanation: "Loopback adapters test transceiver ports by looping signals directly back.",
      aliases: ["loopback adapter", "loopback", "loopback plug"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 3: MODEMS VS ROUTERS
  // ==========================================
  {
    id: "q-modem-router-conn",
    moduleId: "modem-router",
    moduleName: "Modems VS Routers",
    category: "Device Roles",
    primary: {
      prompt: "Which network device provides the physical connection to the Internet Service Provider (ISP)?",
      options: ["Modem", "Router"],
      answer: "Modem",
      explanation: "Modems provide the physical connection to the ISP by translating physical carrier signals.",
      aliases: ["modem"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Which hardware unit handles logical IP routing and connects all local client devices together across a subnet?",
      options: ["Router", "Modem"],
      answer: "Router",
      explanation: "Routers provide the logical connection to the ISP and route packets among local devices.",
      aliases: ["router"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-modem-modulation",
    moduleId: "modem-router",
    moduleName: "Modems VS Routers",
    category: "Signal Processing",
    primary: {
      prompt: "What process does a modem perform on incoming analog signals received from the ISP?",
      options: [
        "Demodulates incoming analog signals into digital signals",
        "Modulates incoming digital signals into analog signals",
        "Encapsulates packets into Layer 3 IP datagrams",
        "Filters frames using MAC address tables",
      ],
      answer: "Demodulates incoming analog signals into digital signals",
      explanation: "Modems DE-modulate incoming analog signals to digital signals, and modulate outgoing digital signals to analog.",
      aliases: ["demodulate", "demodulation", "demodulates"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "When transmitting digital computer data outwards across an analog ISP transmission line, what conversion must the modem execute?",
      options: [
        "Modulates outgoing digital signals into analog signals",
        "Demodulates incoming analog signals into digital signals",
        "Converts full duplex frames to simplex frames",
        "Translates IPv4 packets to IPv6 packets",
      ],
      answer: "Modulates outgoing digital signals into analog signals",
      explanation: "Modulation converts outgoing digital signals into analog format for transmission over ISP carrier lines.",
      aliases: ["modulate", "modulation", "modulates"],
      canTypeInHardMode: false,
    },
  },
  {
    id: "q-modem-media-types",
    moduleId: "modem-router",
    moduleName: "Modems VS Routers",
    category: "Media Types",
    primary: {
      prompt: "What physical transmission medium is utilized by a DSL (Digital Subscriber Line) modem?",
      options: ["Phone lines", "Coaxial cables", "Single-mode fiber optic", "Unshielded plenum conduits"],
      answer: "Phone lines",
      explanation: "DSL modems connect over traditional copper telephone lines.",
      aliases: ["phone lines", "telephone lines", "phone line", "telephone line"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Which cable type connects a cable modem to the ISP cable distribution network?",
      options: ["Coaxial cables", "Phone lines", "Cat5e unshielded twisted pair", "Multimode optical ribbon"],
      answer: "Coaxial cables",
      explanation: "Cable modems connect to broadband providers over coaxial cables.",
      aliases: ["coaxial", "coax", "coaxial cable", "coaxial cables"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 4: EIA/TIA 568B STANDARD
  // ==========================================
  {
    id: "q-eiatia-pin1",
    moduleId: "eia-tia-standard",
    moduleName: "EIA/TIA 568B Standard",
    category: "Pin Specifications",
    primary: {
      prompt: "In the EIA/TIA 568B wiring standard, which color conductor is wired to Pin 1?",
      options: ["Orange/white stripe", "Green/white stripe", "Orange", "Blue"],
      answer: "Orange/white stripe",
      explanation: "Pin 1 of the EIA/TIA 568B standard is Orange/white stripe.",
      aliases: ["orange/white", "orange/white stripe", "orange white", "orange-white"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "According to the EIA/TIA 568B specification, what is the first wire color seated at the top pin position (Pin 1)?",
      options: ["Orange/white stripe", "Blue/white stripe", "Green", "Brown/white stripe"],
      answer: "Orange/white stripe",
      explanation: "Pin 1 is Orange/white stripe in 568B.",
      aliases: ["orange/white", "orange/white stripe", "orange white", "orange-white"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-eiatia-pin8",
    moduleId: "eia-tia-standard",
    moduleName: "EIA/TIA 568B Standard",
    category: "Pin Specifications",
    primary: {
      prompt: "In the EIA/TIA 568B standard, which wire color corresponds to Pin 8?",
      options: ["Brown", "Brown/white stripe", "Green", "Blue/white stripe"],
      answer: "Brown",
      explanation: "Pin 8 is solid Brown in 568B.",
      aliases: ["brown", "solid brown"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "What is the final conductor color connected to Pin 8 when wiring an RJ45 modular plug to EIA/TIA 568B?",
      options: ["Brown", "Orange", "Green/white stripe", "Blue"],
      answer: "Brown",
      explanation: "Pin 8 is Brown.",
      aliases: ["brown", "solid brown"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-eiatia-pin-sequence",
    moduleId: "eia-tia-standard",
    moduleName: "EIA/TIA 568B Standard",
    category: "Pin Sequence",
    primary: {
      prompt: "Which pair of colors occupy Pin 4 and Pin 5 in an EIA/TIA 568B terminated RJ45 connector?",
      options: [
        "Pin 4: Blue, Pin 5: Blue/white stripe",
        "Pin 4: Green/white stripe, Pin 5: Green",
        "Pin 4: Orange, Pin 5: Orange/white stripe",
        "Pin 4: Brown/white stripe, Pin 5: Brown",
      ],
      answer: "Pin 4: Blue, Pin 5: Blue/white stripe",
      explanation: "Pins 4 and 5 in 568B are Blue and Blue/white stripe respectively.",
      aliases: ["blue and blue/white", "blue, blue/white"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "In the EIA/TIA 568B sequence, which colored wire is positioned immediately at Pin 3?",
      options: ["Green/white stripe", "Orange", "Blue/white stripe", "Brown"],
      answer: "Green/white stripe",
      explanation: "Pin 3 is Green/white stripe in 568B (mnemonic: Aliens!!).",
      aliases: ["green/white", "green/white stripe", "green white", "green-white"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 5: BITS, NIBBLES, AND BYTES
  // ==========================================
  {
    id: "q-bnb-definitions",
    moduleId: "bits-nibbles-bytes",
    moduleName: "Bits, Nibbles, and Bytes",
    category: "Units of Measure",
    primary: {
      prompt: "How many bits are contained in a single Nibble and a single Byte respectively?",
      options: [
        "Nibble: 4 bits, Byte: 8 bits",
        "Nibble: 8 bits, Byte: 16 bits",
        "Nibble: 2 bits, Byte: 4 bits",
        "Nibble: 4 bits, Byte: 16 bits",
      ],
      answer: "Nibble: 4 bits, Byte: 8 bits",
      explanation: "A nibble is exactly 4 bits; a byte is 8 bits (2 nibbles).",
      aliases: ["4 and 8", "4 bits and 8 bits"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "A data unit composed of exactly 4 binary digits (bits) is referred to as what?",
      options: ["Nibble", "Byte", "Octet", "Word"],
      answer: "Nibble",
      explanation: "A nibble consists of 4 bits.",
      aliases: ["nibble"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-bnb-kilo-units",
    moduleId: "bits-nibbles-bytes",
    moduleName: "Bits, Nibbles, and Bytes",
    category: "Prefix Units",
    primary: {
      prompt: "What is the exact quantity of bits in one kilobit (Kb), and bytes in one kilobyte (KB)?",
      options: [
        "1 kilobit = 1,000 bits; 1 kilobyte = 1,024 bytes",
        "1 kilobit = 1,024 bits; 1 kilobyte = 1,000 bytes",
        "1 kilobit = 1,000 bits; 1 kilobyte = 1,000 bytes",
        "1 kilobit = 8,000 bits; 1 kilobyte = 8,192 bytes",
      ],
      answer: "1 kilobit = 1,000 bits; 1 kilobyte = 1,024 bytes",
      explanation: "Kilobits (Kb) are base-10 (1,000 bits), while Kilobytes (KB) are base-2 (1,024 bytes).",
      aliases: ["1000 and 1024", "1000 bits, 1024 bytes"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "Which standard metric value defines a kilobit (abbreviated lowercase 'Kb') in network data throughput?",
      options: ["1,000 bits", "1,024 bits", "8,000 bits", "1,024 bytes"],
      answer: "1,000 bits",
      explanation: "A kilobit (Kb) equals 1,000 bits.",
      aliases: ["1000", "1,000", "1000 bits", "1,000 bits"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-bnb-speed-storage",
    moduleId: "bits-nibbles-bytes",
    moduleName: "Bits, Nibbles, and Bytes",
    category: "Application",
    primary: {
      prompt: "Network transmission speed (throughput) is typically measured in which unit, while data storage capacity is measured in which unit?",
      options: [
        "Speed: Bits per second; Storage: Bytes",
        "Speed: Bytes per second; Storage: Bits",
        "Speed: Nibbles per second; Storage: Bytes",
        "Speed: Octets per second; Storage: Bits",
      ],
      answer: "Speed: Bits per second; Storage: Bytes",
      explanation: "Throughput is measured in bits per second (b/s, Mb/s, Gb/s), whereas storage is measured in Bytes (KB, MB, GB).",
      aliases: ["bits for speed, bytes for storage"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "When reviewing network bandwidth specifications, what does lowercase 'b' represent compared to uppercase 'B'?",
      options: [
        "Lowercase 'b' is bits (speed); uppercase 'B' is bytes (storage)",
        "Lowercase 'b' is bytes; uppercase 'B' is bits",
        "Lowercase 'b' is binary; uppercase 'B' is base-10",
        "Lowercase 'b' is broadband; uppercase 'B' is baseband",
      ],
      answer: "Lowercase 'b' is bits (speed); uppercase 'B' is bytes (storage)",
      explanation: "b = bits, B = bytes.",
      aliases: ["bits vs bytes"],
      canTypeInHardMode: false,
    },
  },

  // ==========================================
  // MODULE 6: BINARY CALCULATION
  // ==========================================
  {
    id: "q-bin-calc-192",
    moduleId: "binary-calculation",
    moduleName: "Binary Calculation",
    category: "Conversions",
    primary: {
      prompt: "What is the decimal equivalent of the 8-bit binary value 11000000?",
      options: ["192", "224", "128", "240"],
      answer: "192",
      explanation: "128 + 64 = 192.",
      aliases: ["192"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Converting the binary octet 11000000 into base-10 decimal yields which value?",
      options: ["192", "168", "255", "128"],
      answer: "192",
      explanation: "128 + 64 = 192.",
      aliases: ["192"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-bin-calc-255",
    moduleId: "binary-calculation",
    moduleName: "Binary Calculation",
    category: "Conversions",
    primary: {
      prompt: "What is the maximum decimal value represented by an 8-bit byte with all bits set to 1 (11111111)?",
      options: ["255", "256", "128", "512"],
      answer: "255",
      explanation: "128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255.",
      aliases: ["255"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "If all 8 bits in an IPv4 octet are binary 1s (11111111), what is the calculated decimal number?",
      options: ["255", "254", "256", "127"],
      answer: "255",
      explanation: "8 ones equals 255.",
      aliases: ["255"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 7: COMMUNICATION TYPES
  // ==========================================
  {
    id: "q-comm-definitions",
    moduleId: "communication-types",
    moduleName: "Communication Types",
    category: "Duplex Modes",
    primary: {
      prompt: "Which communication transmission mode permits data to travel in only ONE unidirectional path?",
      options: ["Simplex", "Half-Duplex", "Full Duplex", "Multiplex"],
      answer: "Simplex",
      explanation: "Simplex communication allows transmission in only one single direction (e.g., radio broadcast, megaphone).",
      aliases: ["simplex"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "A broadcast radio tower transmitting FM radio signals to automobile receivers is an example of which communication type?",
      options: ["Simplex", "Half-Duplex", "Full Duplex", "Asynchronous Duplex"],
      answer: "Simplex",
      explanation: "Radio broadcasts are one-way only (Simplex).",
      aliases: ["simplex"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-comm-half-full",
    moduleId: "communication-types",
    moduleName: "Communication Types",
    category: "Duplex Modes",
    primary: {
      prompt: "Which duplex mode enables two devices to communicate in BOTH directions, but only ONE device can transmit at a time?",
      options: ["Half-Duplex", "Simplex", "Full Duplex", "Continuous Duplex"],
      answer: "Half-Duplex",
      explanation: "Half-Duplex allows bidirectional communication, but stations must take turns (e.g. walkie-talkies, legacy hubs).",
      aliases: ["half-duplex", "half duplex", "half"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Walkie-talkies requiring users to press a push-to-talk button before speaking operate in which transmission mode?",
      options: ["Half-Duplex", "Full Duplex", "Simplex", "Dual Simplex"],
      answer: "Half-Duplex",
      explanation: "Push-to-talk radios alternate transmission turns (Half-Duplex).",
      aliases: ["half-duplex", "half duplex", "half"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-comm-switch-full",
    moduleId: "communication-types",
    moduleName: "Communication Types",
    category: "Network Hardware Duplex",
    primary: {
      prompt: "Modern network switches and landline telephone calls operate in which communication mode where both endpoints transmit simultaneously?",
      options: ["Full Duplex", "Half-Duplex", "Simplex", "Shared Media Contention"],
      answer: "Full Duplex",
      explanation: "Full Duplex allows simultaneous two-way transmission over dedicated channels without collisions.",
      aliases: ["full duplex", "full-duplex", "full"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Which communication type allows simultaneous bidirectional data exchange on dedicated point-to-point Ethernet links?",
      options: ["Full Duplex", "Half-Duplex", "Simplex", "Token Ring"],
      answer: "Full Duplex",
      explanation: "Modern Ethernet switch links run in Full Duplex.",
      aliases: ["full duplex", "full-duplex", "full"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 8: WIRED NETWORK TOPOLOGIES
  // ==========================================
  {
    id: "q-topo-star",
    moduleId: "network-topologies",
    moduleName: "Wired Network Topologies",
    category: "Topology Identification",
    primary: {
      prompt: "In which physical network topology are all client endpoints individually wired back to a central device such as a hub or switch?",
      options: ["Star", "Bus", "Ring", "Mesh"],
      answer: "Star",
      explanation: "A Star topology connects all hosts to a central hub or switch using twisted pair cables and RJ45 connectors.",
      aliases: ["star"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Which common LAN topology uses RJ45 twisted pair cabling radiating from a central network switch to each workstation?",
      options: ["Star", "Mesh", "Bus", "Ring"],
      answer: "Star",
      explanation: "Star is the standard centralized topology.",
      aliases: ["star"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-topo-bus",
    moduleId: "network-topologies",
    moduleName: "Wired Network Topologies",
    category: "Topology Identification",
    primary: {
      prompt: "Which legacy topology connects all computers in a single linear line along a shared coaxial cable with terminators at both physical ends?",
      options: ["Bus", "Star", "Ring", "Mesh"],
      answer: "Bus",
      explanation: "Bus topology uses a single coaxial trunk cable, BNC connectors, and terminating resistors at both ends.",
      aliases: ["bus"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "A network that utilizes thicknet or thinnet coaxial cable terminated on both ends with 50-ohm resistors describes which physical layout?",
      options: ["Bus", "Ring", "Star", "Mesh"],
      answer: "Bus",
      explanation: "Coaxial cabling with end terminators forms a Bus topology.",
      aliases: ["bus"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-topo-ring-mesh",
    moduleId: "network-topologies",
    moduleName: "Wired Network Topologies",
    category: "Topology Identification",
    primary: {
      prompt: "Which network topology connects all devices to every other device to provide maximum redundancy and fault tolerance, representing the architecture of the Internet?",
      options: ["Mesh", "Ring", "Star", "Bus"],
      answer: "Mesh",
      explanation: "Mesh topology interconnects nodes with redundant paths, offering high fault tolerance.",
      aliases: ["mesh"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "In a Ring topology, what mechanism is passed from node to node around the closed circular loop to control transmission access?",
      options: ["Token", "Vampire Tap", "BNC Terminator", "ARP Broadcast"],
      answer: "Token",
      explanation: "Ring networks use token passing around the loop to coordinate communication.",
      aliases: ["token", "a token"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 9: 802.3 WIRED ETHERNET STANDARDS
  // ==========================================
  {
    id: "q-8023-thin-thick",
    moduleId: "802.3-ethernet-standards",
    moduleName: "Wired Ethernet Standards",
    category: "Legacy Coax Standards",
    primary: {
      prompt: "What is the maximum segment distance and connector type used with 10base2 (Thinnet) Ethernet?",
      options: [
        "200m; BNC / T-connectors",
        "500m; Vampire Taps",
        "100m; RJ45",
        "100m; RJ11",
      ],
      answer: "200m; BNC / T-connectors",
      explanation: "10base2 (Thinnet) has a maximum distance of 200m and uses BNC T-connectors with terminators.",
      aliases: ["200m and bnc", "200m, bnc"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "Which legacy 802.3 standard utilizes Thicknet coaxial cable, spans up to 500 meters, and attaches devices using Vampire Taps?",
      options: ["10base5", "10base2", "10baseT", "100baseT"],
      answer: "10base5",
      explanation: "10base5 (Thicknet) supports 500m and uses Vampire Taps.",
      aliases: ["10base5", "10base-5", "10 base 5"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-8023-twisted-pair",
    moduleId: "802.3-ethernet-standards",
    moduleName: "Wired Ethernet Standards",
    category: "Twisted Pair Standards",
    primary: {
      prompt: "What is the maximum transmission distance for 100baseT (Fast Ethernet) and 1000baseT (Gigabit Ethernet) over twisted pair cabling?",
      options: ["100m", "55m", "200m", "500m"],
      answer: "100m",
      explanation: "Standard twisted pair Ethernet standards (10baseT, 100baseT, 1000baseT) have a maximum distance of 100 meters.",
      aliases: ["100m", "100 meters", "100"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Which minimum cable category is required to support Gigabit Ethernet (1000baseT / IEEE 802.3z) across a 100-meter run?",
      options: ["Cat5e or better", "Cat3 or better", "Cat5 or better", "Cat2"],
      answer: "Cat5e or better",
      explanation: "1000baseT requires at least Cat5e cabling.",
      aliases: ["cat5e", "cat5e or better", "cat 5e"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 10: PATCH VS CROSSOVER CABLES
  // ==========================================
  {
    id: "q-cables-patch-crossover",
    moduleId: "patch-vs-crossover-cables",
    moduleName: "Patch VS Crossover Cables",
    category: "Cable Construction",
    primary: {
      prompt: "Which cable type has the exact same wiring standard (such as 568B on both ends) and connects dissimilar devices like a PC to a Switch?",
      options: ["Patch Cable", "Crossover Cable", "Rollover Cable", "Loopback Cable"],
      answer: "Patch Cable",
      explanation: "A Patch (straight-through) cable uses the same pinout on both ends to connect dissimilar devices.",
      aliases: ["patch", "patch cable", "straight", "straight-through"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "An Ethernet cable terminated with EIA/TIA 568A on one end and EIA/TIA 568B on the opposite end is designated as what type of cable?",
      options: ["Crossover Cable", "Patch Cable", "Plenum Cable", "Shielded Patch Cord"],
      answer: "Crossover Cable",
      explanation: "568A on one end and 568B on the other forms a Crossover cable (used for similar devices like PC to PC or Switch to Switch).",
      aliases: ["crossover", "crossover cable", "cross over"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-cables-stp-utp",
    moduleId: "patch-vs-crossover-cables",
    moduleName: "Patch VS Crossover Cables",
    category: "Cable Shielding",
    primary: {
      prompt: "Which twisted pair cable construction includes an extra layer of protective shielding around the wire pairs specifically for industrial environments?",
      options: [
        "Shielded Twisted Pair (STP)",
        "Unshielded Twisted Pair (UTP)",
        "Plenum Rated PVC (CM)",
        "Single-mode Coaxial",
      ],
      answer: "Shielded Twisted Pair (STP)",
      explanation: "STP (Shielded Twisted Pair) adds protective foil shielding to guard against electromagnetic noise in industrial settings.",
      aliases: ["stp", "shielded twisted pair", "shielded"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "What is the standard twisted pair cabling type without internal foil shielding that is deployed in ordinary office environments?",
      options: [
        "Unshielded Twisted Pair (UTP)",
        "Shielded Twisted Pair (STP)",
        "Armored Fiber Ribbon",
        "Thicknet 10base5",
      ],
      answer: "Unshielded Twisted Pair (UTP)",
      explanation: "UTP is unshielded twisted pair used in standard non-industrial installations.",
      aliases: ["utp", "unshielded twisted pair", "unshielded"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 11: CABLE RATINGS
  // ==========================================
  {
    id: "q-ratings-plenum",
    moduleId: "cable-ratings",
    moduleName: "Cable Ratings",
    category: "Fire Safety Standards",
    primary: {
      prompt: "Which cable fire rating is legally required when running cables through HVAC return air plenums and drop ceilings?",
      options: ["CMP (Plenum)", "CMR (Riser)", "CM (General Use)", "PVC General"],
      answer: "CMP (Plenum)",
      explanation: "CMP (Communications Plenum) cables emit minimal toxic smoke and are fire-resistant for air-handling spaces.",
      aliases: ["cmp", "cmp (plenum)", "plenum", "cmp plenum"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Why must CMP (Plenum) rated cabling be installed in drop ceilings that serve as building air-handling spaces?",
      options: [
        "It releases low amounts of toxic smoke when burned, preventing fumes spreading through HVAC ducts",
        "It provides double the network throughput of standard CM cables",
        "It contains heavy lead shielding to block Wi-Fi signals",
        "It is the only cable rating that supports RJ45 connectors",
      ],
      answer: "It releases low amounts of toxic smoke when burned, preventing fumes spreading through HVAC ducts",
      explanation: "CMP prevents dangerous smoke and toxic gas distribution via HVAC air returns.",
      aliases: ["low toxic smoke", "toxic smoke", "plenum safety"],
      canTypeInHardMode: false,
    },
  },
  {
    id: "q-ratings-riser-hierarchy",
    moduleId: "cable-ratings",
    moduleName: "Cable Ratings",
    category: "Substitution Hierarchy",
    primary: {
      prompt: "Which cable rating is designed for vertical shafts between building floors to prevent fire from climbing floor to floor?",
      options: ["CMR (Riser)", "CMP (Plenum)", "CM (General Use)", "UTP Standard"],
      answer: "CMR (Riser)",
      explanation: "CMR (Communications Riser) is rated for vertical shafts to stop fire climbing between floors.",
      aliases: ["cmr", "cmr (riser)", "riser", "cmr riser"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "According to the National Electrical Code substitution hierarchy, which statement regarding cable replacement is true?",
      options: [
        "CMP can substitute for CMR and CM; CMR can substitute for CM",
        "CM can substitute for CMP and CMR anywhere",
        "CMR can substitute for CMP in plenum spaces",
        "No cable ratings may be substituted for one another",
      ],
      answer: "CMP can substitute for CMR and CM; CMR can substitute for CM",
      explanation: "CMP outranks CMR and CM; CMR outranks CM; CM cannot substitute for either.",
      aliases: ["cmp can substitute for cmr and cm", "cmp outranks all"],
      canTypeInHardMode: false,
    },
  },

  // ==========================================
  // MODULE 12: ESD, EMI, & EMP
  // ==========================================
  {
    id: "q-threats-definitions",
    moduleId: "esd-emi-emp",
    moduleName: "ESD, EMI, & EMP",
    category: "Threat Definitions",
    primary: {
      prompt: "Which environmental threat represents a static electricity discharge that can damage or destroy sensitive electronic components upon physical contact?",
      options: ["ESD", "EMI", "EMP", "RFI"],
      answer: "ESD",
      explanation: "ESD (Electrostatic Discharge) is a static electricity spark that damages silicon chips.",
      aliases: ["esd", "electrostatic discharge"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "A technician walks across a carpeted floor and feels a static zap when touching a computer motherboard. What occurred?",
      options: ["ESD", "EMP", "EMI", "APIPA"],
      answer: "ESD",
      explanation: "Static electricity transfer is Electrostatic Discharge (ESD).",
      aliases: ["esd", "electrostatic discharge"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-threats-emi-emp",
    moduleId: "esd-emi-emp",
    moduleName: "ESD, EMI, & EMP",
    category: "Interference & Pulses",
    primary: {
      prompt: "Temporary wireless disruptions caused by electrical motors, storms, or power lines represent which threat?",
      options: ["EMI", "ESD", "EMP", "NAT"],
      answer: "EMI",
      explanation: "EMI (Electromagnetic Interference) causes temporary noise and signal disruptions from motors, power lines, and storms.",
      aliases: ["emi", "electromagnetic interference"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "A direct lightning strike or nuclear detonation produces a destructive, high-energy burst of electromagnetic radiation known as what?",
      options: ["EMP", "EMI", "ESD", "TKIP"],
      answer: "EMP",
      explanation: "EMP (Electromagnetic Pulse) is a destructive burst from lightning (localized) or nuclear blasts (wide area).",
      aliases: ["emp", "electromagnetic pulse"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 13: WIRELESS 802.11 & SECURITY
  // ==========================================
  {
    id: "q-wifi-bands",
    moduleId: "wireless-802-11",
    moduleName: "Wireless 802.11",
    category: "Frequency Bands",
    primary: {
      prompt: "Which wireless frequency band provides longer physical range but has fewer non-overlapping channels (channels 1, 6, and 11)?",
      options: ["2.4 GHz", "5 GHz", "60 GHz", "900 MHz"],
      answer: "2.4 GHz",
      explanation: "The 2.4 GHz band provides greater range through obstacles but has only 3 non-overlapping 20MHz channels (1, 6, 11).",
      aliases: ["2.4 ghz", "2.4ghz", "2.4"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Compared to 2.4 GHz, what are the primary performance characteristics of the 5 GHz Wi-Fi frequency band?",
      options: [
        "Higher throughput and more non-overlapping channels (24), but shorter range",
        "Lower speeds and only 3 non-overlapping channels, but longer range",
        "Identical speeds, identical channels, and longer range",
        "Requires coaxial cabling to connect to mobile devices",
      ],
      answer: "Higher throughput and more non-overlapping channels (24), but shorter range",
      explanation: "5 GHz offers higher speeds and 24 non-overlapping channels at the cost of shorter transmission distance.",
      aliases: ["higher speed shorter range", "higher throughput"],
      canTypeInHardMode: false,
    },
  },
  {
    id: "q-wifi-security-standards",
    moduleId: "wireless-802-11",
    moduleName: "Wireless 802.11",
    category: "Wireless Security",
    primary: {
      prompt: "Which wireless encryption standard is considered modern best practice, utilizing robust AES ciphers, alongside the newer WPA3 standard?",
      options: ["WPA2", "WEP", "WPA", "WPS"],
      answer: "WPA2",
      explanation: "WPA2 (using AES) and WPA3 are the secure standards; WEP, WPA (TKIP), and WPS are deprecated/insecure.",
      aliases: ["wpa2", "wpa-2"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Why should WEP (Wired Equivalent Privacy) and WPS (Wi-Fi Protected Setup) never be enabled on an enterprise router?",
      options: [
        "Both have severe cryptographic vulnerabilities allowing rapid cracking and brute-force penetration",
        "They only function over 5 GHz channels",
        "They require proprietary token rings",
        "They convert full duplex connections to simplex",
      ],
      answer: "Both have severe cryptographic vulnerabilities allowing rapid cracking and brute-force penetration",
      explanation: "WEP has broken IVs and WPS has a split-PIN brute-force vulnerability.",
      aliases: ["cryptographic vulnerabilities", "insecure", "easily cracked"],
      canTypeInHardMode: false,
    },
  },

  // ==========================================
  // MODULE 14: 802.11 WIRELESS WI-FI STANDARDS
  // ==========================================
  {
    id: "q-80211-ac-ax",
    moduleId: "802.11-wireless-standards",
    moduleName: "Wireless Wi-Fi Standards",
    category: "Wi-Fi Generations",
    primary: {
      prompt: "Which IEEE wireless standard is marketed as Wi-Fi 5 and operates exclusively on the 5 GHz frequency band?",
      options: ["802.11ac", "802.11n", "802.11ax", "802.11g"],
      answer: "802.11ac",
      explanation: "802.11ac (Wi-Fi 5) operates exclusively on 5 GHz and delivers gigabit wireless speeds.",
      aliases: ["802.11ac", "ac", "wifi 5", "wi-fi 5"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "What is the commercial name and operating frequencies for the IEEE 802.11ax wireless standard?",
      options: [
        "Wi-Fi 6 (2.4 GHz + 5 GHz)",
        "Wi-Fi 5 (5 GHz only)",
        "Wi-Fi 4 (2.4 GHz only)",
        "Wi-Fi 3 (5 GHz only)",
      ],
      answer: "Wi-Fi 6 (2.4 GHz + 5 GHz)",
      explanation: "802.11ax is Wi-Fi 6 and operates on both 2.4 GHz and 5 GHz (up to 14 Gb/s).",
      aliases: ["wifi 6", "wi-fi 6", "802.11ax"],
      canTypeInHardMode: false,
    },
  },

  // ==========================================
  // MODULE 15: WIRED VS WIRELESS
  // ==========================================
  {
    id: "q-contention-cd-ca",
    moduleId: "wired-vs-wireless",
    moduleName: "Wired VS Wireless",
    category: "Contention Methods",
    primary: {
      prompt: "What contention methods are used in traditional Wired Ethernet and Wireless 802.11 networks respectively?",
      options: [
        "Wired: CSMA/CD; Wireless: CSMA/CA",
        "Wired: CSMA/CA; Wireless: CSMA/CD",
        "Wired: Token Passing; Wireless: Polling",
        "Wired: Full Duplex Only; Wireless: Simplex",
      ],
      answer: "Wired: CSMA/CD; Wireless: CSMA/CA",
      explanation: "Wired Ethernet uses CSMA/CD (Collision Detection); Wireless uses CSMA/CA (Collision Avoidance).",
      aliases: ["csma/cd and csma/ca", "csma/cd for wired, csma/ca for wireless"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "Why are wireless transceivers unable to use Collision Detection (CSMA/CD) like wired cables?",
      options: [
        "A station's own radio transmission overpowers its receiver, making local collision detection during transmission impossible",
        "Radio frequencies travel faster than electrical signals in copper",
        "Wireless access points operate in simplex mode only",
        "IEEE standards legally prohibit collision detection algorithms on radio bands",
      ],
      answer: "A station's own radio transmission overpowers its receiver, making local collision detection during transmission impossible",
      explanation: "Transmitting RF energy drowns out incoming signals at the antenna, requiring collision avoidance (CSMA/CA).",
      aliases: ["radio overpowering receiver", "cannot detect while transmitting"],
      canTypeInHardMode: false,
    },
  },

  // ==========================================
  // MODULE 16: WAN TECHNOLOGIES
  // ==========================================
  {
    id: "q-wan-carriers",
    moduleId: "wan-technologies",
    moduleName: "WAN Technologies",
    category: "Digital Carrier Lines",
    primary: {
      prompt: "What is the maximum throughput and number of 64 Kbps channels on a North American T1 carrier line?",
      options: [
        "1.544 Mbps (24 channels)",
        "2.048 Mbps (32 channels)",
        "44.736 Mbps (672 channels)",
        "128 Kbps (2 channels)",
      ],
      answer: "1.544 Mbps (24 channels)",
      explanation: "A T1 line provides 1.544 Mbps throughput across 24 channels of 64 Kbps each.",
      aliases: ["1.544 mbps", "1.544 mbps (24 channels)", "1.544"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "What is the total maximum throughput of a European E1 digital carrier line comprising 32 individual 64 Kbps channels?",
      options: ["2.048 Mbps", "1.544 Mbps", "34.368 Mbps", "44.736 Mbps"],
      answer: "2.048 Mbps",
      explanation: "An E1 line delivers 2.048 Mbps across 32 channels.",
      aliases: ["2.048 mbps", "2.048", "2.048mbps"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 17: DATA-LINK LAYER
  // ==========================================
  {
    id: "q-datalink-sublayers",
    moduleId: "data-link-layer",
    moduleName: "Data-Link Layer",
    category: "Layer 2 Sublayers",
    primary: {
      prompt: "The Data-Link layer (Layer 2) is divided into which two sublayers?",
      options: [
        "LLC (Logical Link Control) and MAC (Media Access Control)",
        "Network Interface and Physical Framing",
        "Session Control and Transport Sockets",
        "IP Routing and Subnet Masking",
      ],
      answer: "LLC (Logical Link Control) and MAC (Media Access Control)",
      explanation: "Layer 2 consists of LLC (Logical Link Control) on top and MAC (Media Access Control) on the bottom.",
      aliases: ["llc and mac", "logical link control and media access control"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "Which sublayer of Layer 2 acts as the bridge between the hardware MAC sublayer and the Network layer (Layer 3)?",
      options: [
        "LLC (Logical Link Control)",
        "Physical Layer",
        "Transport Layer",
        "Presentation Layer",
      ],
      answer: "LLC (Logical Link Control)",
      explanation: "LLC is the upper Layer 2 sublayer that binds hardware to logical Layer 3 protocols.",
      aliases: ["llc", "logical link control"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-datalink-mac-structure",
    moduleId: "data-link-layer",
    moduleName: "Data-Link Layer",
    category: "MAC Addressing",
    primary: {
      prompt: "What is the total length of a MAC address in bits and bytes, and what is the first 24-bit half called?",
      options: [
        "48 bits (6 bytes); OUI (Organizationally Unique Identifier)",
        "32 bits (4 bytes); Network ID",
        "128 bits (16 bytes); Interface Identifier",
        "64 bits (8 bytes); GUID",
      ],
      answer: "48 bits (6 bytes); OUI (Organizationally Unique Identifier)",
      explanation: "A MAC address is 48 bits (6 bytes) long; the first 24 bits (3 bytes) are the vendor OUI.",
      aliases: ["48 bits and oui", "48 bits, 6 bytes, oui"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "Which protocol resolves a destination device's Layer 2 MAC address when only its IPv4 address is known?",
      options: ["ARP", "DNS", "DHCP", "NAT"],
      answer: "ARP",
      explanation: "ARP resolves IPv4 addresses to hardware MAC addresses on local networks.",
      aliases: ["arp", "address resolution protocol"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 18: HEXADECIMAL
  // ==========================================
  {
    id: "q-hex-base",
    moduleId: "hexadecimal",
    moduleName: "Hexadecimal",
    category: "Number Systems",
    primary: {
      prompt: "What base number system is Hexadecimal, and what character represents the decimal value 15?",
      options: ["Base 16; F", "Base 10; 9", "Base 8; 7", "Base 16; E"],
      answer: "Base 16; F",
      explanation: "Hexadecimal is Base 16 (0-9, A-F); F represents 15.",
      aliases: ["base 16 and f", "base 16, f"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "How many binary bits are represented by a single hexadecimal character?",
      options: ["4 bits (1 nibble)", "8 bits (1 byte)", "2 bits", "16 bits"],
      answer: "4 bits (1 nibble)",
      explanation: "One hexadecimal digit represents exactly 4 bits (a nibble). Two hex digits represent one 8-bit byte.",
      aliases: ["4 bits", "4", "4 bit", "one nibble", "1 nibble"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 19: LAYER 2 SWITCHES
  // ==========================================
  {
    id: "q-switches-cam-table",
    moduleId: "layer-2-switches",
    moduleName: "Layer 2 Switches",
    category: "Switch Operation",
    primary: {
      prompt: "What table does a Layer 2 switch build and maintain to map physical switch ports to device hardware addresses?",
      options: ["MAC / CAM table", "Routing table", "ARP cache", "DNS host table"],
      answer: "MAC / CAM table",
      explanation: "A switch uses a MAC address table (also called a CAM table) to map physical ports to learned MAC addresses.",
      aliases: ["mac table", "cam table", "mac/cam table", "cam"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "When a Layer 2 switch receives a frame destined for an unknown MAC address not in its CAM table, what action does it take?",
      options: [
        "Broadcasts (floods) the frame out all ports except the receiving port",
        "Drops the frame immediately and sends an error",
        "Forwards the frame exclusively to the default gateway router",
        "Broadcasts the frame out all ports including the ingress port",
      ],
      answer: "Broadcasts (floods) the frame out all ports except the receiving port",
      explanation: "When a destination MAC is unlearned, the switch floods the frame out all other ports.",
      aliases: ["floods", "broadcasts to all ports except source"],
      canTypeInHardMode: false,
    },
  },

  // ==========================================
  // MODULE 20: NETWORK LAYER - IP ADDRESSES
  // ==========================================
  {
    id: "q-ip-structure",
    moduleId: "network-layer-ip-addresses",
    moduleName: "Network Layer - IP Addresses",
    category: "IPv4 Architecture",
    primary: {
      prompt: "What is the total bit length and octet count of a standard IPv4 address?",
      options: [
        "32 bits (4 octets)",
        "128 bits (16 octets)",
        "48 bits (6 octets)",
        "64 bits (8 octets)",
      ],
      answer: "32 bits (4 octets)",
      explanation: "IPv4 addresses are 32 bits divided into 4 octets (8 bits each), with values from 0 to 255.",
      aliases: ["32 bits", "32 bits (4 octets)", "32"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Which technology allows multiple internal devices with private IPv4 addresses to share a single public IPv4 address over the Internet?",
      options: [
        "NAT (Network Address Translation)",
        "APIPA (Automatic Private IP Addressing)",
        "ARP (Address Resolution Protocol)",
        "CSMA/CA",
      ],
      answer: "NAT (Network Address Translation)",
      explanation: "NAT translates private local IP addresses to a public routable IP address.",
      aliases: ["nat", "network address translation"],
      canTypeInHardMode: true,
    },
  },
  {
    id: "q-ip-apipa-loopback",
    moduleId: "network-layer-ip-addresses",
    moduleName: "Network Layer - IP Addresses",
    category: "Special IPv4 Addresses",
    primary: {
      prompt: "What IP address range is automatically assigned by APIPA when a client computer fails to contact a DHCP server?",
      options: [
        "169.254.0.1 - 169.254.255.254",
        "127.0.0.1 - 127.255.255.255",
        "192.168.1.1 - 192.168.1.254",
        "10.0.0.1 - 10.255.255.254",
      ],
      answer: "169.254.0.1 - 169.254.255.254",
      explanation: "APIPA auto-assigns an address in the 169.254.0.0/16 range when DHCP fails.",
      aliases: ["169.254", "169.254.0.0", "169.254.x.x"],
      canTypeInHardMode: true,
    },
    alternate: {
      prompt: "Which special IPv4 address is universally reserved for local loopback internal host testing?",
      options: ["127.0.0.1", "169.254.0.1", "192.168.0.1", "255.255.255.255"],
      answer: "127.0.0.1",
      explanation: "127.0.0.1 (and the 127.0.0.0/8 block) is reserved for local loopback.",
      aliases: ["127.0.0.1", "127.0.0.0"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 21: PRIVATE IP ADDRESS CLASSES
  // ==========================================
  {
    id: "q-private-classes",
    moduleId: "private-ip-classes",
    moduleName: "Private IP Address Classes",
    category: "RFC 1918 Ranges",
    primary: {
      prompt: "What are the standard RFC 1918 private IPv4 address ranges for Class A, Class B, and Class C?",
      options: [
        "Class A: 10.0.0.0 - 10.255.255.255; Class B: 172.16.0.0 - 172.31.255.255; Class C: 192.168.0.0 - 192.168.255.255",
        "Class A: 1.0.0.0 - 126.255.255.255; Class B: 128.0.0.0 - 191.255.255.255; Class C: 192.0.0.0 - 223.255.255.255",
        "Class A: 10.0.0.0 - 10.0.255.255; Class B: 172.0.0.0 - 172.255.255.255; Class C: 192.168.0.0 - 192.168.0.255",
        "Class A: 169.254.0.0 - 169.254.255.255; Class B: 127.0.0.0 - 127.255.255.255; Class C: 224.0.0.0 - 239.255.255.255",
      ],
      answer: "Class A: 10.0.0.0 - 10.255.255.255; Class B: 172.16.0.0 - 172.31.255.255; Class C: 192.168.0.0 - 192.168.255.255",
      explanation: "RFC 1918 private ranges are 10.0.0.0/8 (Class A), 172.16.0.0/12 (Class B), and 192.168.0.0/16 (Class C).",
      aliases: ["10.0.0.0, 172.16.0.0, 192.168.0.0"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "Which private IP address range is allocated for Class C local networks?",
      options: [
        "192.168.0.0 - 192.168.255.255",
        "10.0.0.0 - 10.255.255.255",
        "172.16.0.0 - 172.31.255.255",
        "169.254.0.0 - 169.254.255.255",
      ],
      answer: "192.168.0.0 - 192.168.255.255",
      explanation: "Class C private IP range is 192.168.0.0 - 192.168.255.255.",
      aliases: ["192.168.0.0 - 192.168.255.255", "192.168.0.0"],
      canTypeInHardMode: true,
    },
  },

  // ==========================================
  // MODULE 22: GENERAL IP ADDRESS CLASSES
  // ==========================================
  {
    id: "q-ip-general-classes",
    moduleId: "ip-address-classes",
    moduleName: "General IP Address Classes",
    category: "Class Ranges & Masks",
    primary: {
      prompt: "What are the first octet decimal ranges and default subnet masks for IPv4 Class A, Class B, and Class C networks?",
      options: [
        "Class A: 1-126 (255.0.0.0); Class B: 128-191 (255.255.0.0); Class C: 192-223 (255.255.255.0)",
        "Class A: 1-127 (255.255.0.0); Class B: 128-192 (255.0.0.0); Class C: 193-224 (255.255.255.0)",
        "Class A: 0-128 (255.0.0.0); Class B: 129-192 (255.255.0.0); Class C: 193-240 (255.255.255.0)",
        "Class A: 10-100 (255.0.0.0); Class B: 172-192 (255.255.0.0); Class C: 192-255 (255.255.255.0)",
      ],
      answer: "Class A: 1-126 (255.0.0.0); Class B: 128-191 (255.255.0.0); Class C: 192-223 (255.255.255.0)",
      explanation: "Class A is 1-126 (/8), Class B is 128-191 (/16), Class C is 192-223 (/24).",
      aliases: ["1-126, 128-191, 192-223"],
      canTypeInHardMode: false,
    },
    alternate: {
      prompt: "What purposes are designated for IPv4 Class D (224-239) and Class E (240-254) addresses?",
      options: [
        "Class D: Multicasting; Class E: Research and Experimental",
        "Class D: Private LANs; Class E: Public WANs",
        "Class D: Loopback testing; Class E: APIPA fallback",
        "Class D: Default gateways; Class E: Broadcast addresses",
      ],
      answer: "Class D: Multicasting; Class E: Research and Experimental",
      explanation: "Class D (224-239) is reserved for Multicast; Class E (240-254) is reserved for Experimental/Research purposes.",
      aliases: ["multicast and research", "multicast, experimental"],
      canTypeInHardMode: false,
    },
  },
];
