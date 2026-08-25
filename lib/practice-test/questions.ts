import { MasterQuestion } from "./types";

export const MASTER_QUESTIONS: MasterQuestion[] = [
  {
    "id": "q-osi-l1",
    "moduleId": "osi-model",
    "moduleName": "OSI Model",
    "category": "Layer Roles",
    "primary": {
      "prompt": "Which OSI model layer is responsible for transmitting raw binary bits across physical media such as copper wires, fiber optics, or radio signals?",
      "options": [
        "Physical Layer (Layer 1)",
        "Data-Link Layer (Layer 2)",
        "Network Layer (Layer 3)",
        "Transport Layer (Layer 4)"
      ],
      "answer": "Physical Layer (Layer 1)",
      "explanation": "The Physical layer (Layer 1) deals with transmitting raw bits over physical mediums including copper, fiber, and wireless frequencies.",
      "aliases": [
        "physical",
        "layer 1",
        "physical layer",
        "l1"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "At which layer of the OSI architecture do physical components like patch cables, network hubs, and wireless antennas operate?",
      "options": [
        "Physical Layer (Layer 1)",
        "Session Layer (Layer 5)",
        "Data-Link Layer (Layer 2)",
        "Network Layer (Layer 3)"
      ],
      "answer": "Physical Layer (Layer 1)",
      "explanation": "Physical cables, hubs, and antennas operate at Layer 1 (Physical layer).",
      "aliases": [
        "physical",
        "layer 1",
        "physical layer",
        "l1"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-osi-l2",
    "moduleId": "osi-model",
    "moduleName": "OSI Model",
    "category": "Layer Roles",
    "primary": {
      "prompt": "Which OSI layer provides node-to-node communication across a local network using physical MAC addressing?",
      "options": [
        "Data-Link Layer (Layer 2)",
        "Network Layer (Layer 3)",
        "Session Layer (Layer 5)",
        "Physical Layer (Layer 1)"
      ],
      "answer": "Data-Link Layer (Layer 2)",
      "explanation": "Layer 2 (Data-Link) handles local frame delivery, MAC addressing, and switch operations.",
      "aliases": [
        "data-link",
        "data link",
        "layer 2",
        "l2",
        "datalink"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Network switches and network interface cards (NICs) primarily function at which layer of the Open Systems Interconnection model?",
      "options": [
        "Data-Link Layer (Layer 2)",
        "Transport Layer (Layer 4)",
        "Presentation Layer (Layer 6)",
        "Network Layer (Layer 3)"
      ],
      "answer": "Data-Link Layer (Layer 2)",
      "explanation": "Switches and NIC hardware operate at Layer 2 (Data-Link layer).",
      "aliases": [
        "data-link",
        "data link",
        "layer 2",
        "l2",
        "datalink"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-osi-l3",
    "moduleId": "osi-model",
    "moduleName": "OSI Model",
    "category": "Layer Roles",
    "primary": {
      "prompt": "Which OSI layer manages logical IP addressing and path routing across multiple interconnected networks?",
      "options": [
        "Network Layer (Layer 3)",
        "Data-Link Layer (Layer 2)",
        "Transport Layer (Layer 4)",
        "Session Layer (Layer 5)"
      ],
      "answer": "Network Layer (Layer 3)",
      "explanation": "The Network layer (Layer 3) handles IP addressing and router packet forwarding.",
      "aliases": [
        "network",
        "layer 3",
        "network layer",
        "l3"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Routers making packet forwarding decisions based on IPv4 or IPv6 headers operate at which OSI layer?",
      "options": [
        "Network Layer (Layer 3)",
        "Physical Layer (Layer 1)",
        "Data-Link Layer (Layer 2)",
        "Application Layer (Layer 7)"
      ],
      "answer": "Network Layer (Layer 3)",
      "explanation": "Routers and logical IP addressing operate at Layer 3 (Network layer).",
      "aliases": [
        "network",
        "layer 3",
        "network layer",
        "l3"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-osi-l4",
    "moduleId": "osi-model",
    "moduleName": "OSI Model",
    "category": "Layer Roles",
    "primary": {
      "prompt": "Which layer of the OSI model provides end-to-end flow control, reliability, and error correction using TCP and UDP?",
      "options": [
        "Transport Layer (Layer 4)",
        "Session Layer (Layer 5)",
        "Network Layer (Layer 3)",
        "Presentation Layer (Layer 6)"
      ],
      "answer": "Transport Layer (Layer 4)",
      "explanation": "The Transport layer (Layer 4) handles reliable end-to-end flow control and segment delivery via TCP and UDP.",
      "aliases": [
        "transport",
        "layer 4",
        "transport layer",
        "l4"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "End-to-end flow control protocols like TCP and connectionless protocols like UDP are managed at which OSI layer?",
      "options": [
        "Transport Layer (Layer 4)",
        "Data-Link Layer (Layer 2)",
        "Application Layer (Layer 7)",
        "Session Layer (Layer 5)"
      ],
      "answer": "Transport Layer (Layer 4)",
      "explanation": "TCP and UDP protocols operate at Layer 4 (Transport layer).",
      "aliases": [
        "transport",
        "layer 4",
        "transport layer",
        "l4"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-osi-l5-l7",
    "moduleId": "osi-model",
    "moduleName": "OSI Model",
    "category": "Upper Layers",
    "primary": {
      "prompt": "Which OSI layer is directly responsible for data translation, syntax representation, and cryptographic encryption?",
      "options": [
        "Presentation Layer (Layer 6)",
        "Session Layer (Layer 5)",
        "Application Layer (Layer 7)",
        "Transport Layer (Layer 4)"
      ],
      "answer": "Presentation Layer (Layer 6)",
      "explanation": "Layer 6 (Presentation layer) handles translation, data formatting, and encryption.",
      "aliases": [
        "presentation",
        "layer 6",
        "presentation layer",
        "l6"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Handling encryption, decryption, and data format translation between network systems occurs at which OSI layer?",
      "options": [
        "Presentation Layer (Layer 6)",
        "Network Layer (Layer 3)",
        "Session Layer (Layer 5)",
        "Physical Layer (Layer 1)"
      ],
      "answer": "Presentation Layer (Layer 6)",
      "explanation": "Presentation layer (Layer 6) handles encryption and translation.",
      "aliases": [
        "presentation",
        "layer 6",
        "presentation layer",
        "l6"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-osi-l5",
    "moduleId": "osi-model",
    "moduleName": "OSI Model",
    "category": "Upper Layers",
    "primary": {
      "prompt": "Which OSI layer is responsible for establishing, managing, maintaining, and terminating dialogue sessions between network applications?",
      "options": [
        "Session Layer (Layer 5)",
        "Presentation Layer (Layer 6)",
        "Transport Layer (Layer 4)",
        "Application Layer (Layer 7)"
      ],
      "answer": "Session Layer (Layer 5)",
      "explanation": "The Session layer (Layer 5) manages, starts, stops, and maintains communication connections between endpoints.",
      "aliases": [
        "session",
        "layer 5",
        "session layer",
        "l5"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Managing network sessions and connection states between communicating endpoint applications occurs at which layer of the OSI model?",
      "options": [
        "Session Layer (Layer 5)",
        "Network Layer (Layer 3)",
        "Data-Link Layer (Layer 2)",
        "Transport Layer (Layer 4)"
      ],
      "answer": "Session Layer (Layer 5)",
      "explanation": "Layer 5 (Session layer) maintains session persistence and coordinates dialogs between systems.",
      "aliases": [
        "session",
        "layer 5",
        "session layer",
        "l5"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-osi-l7",
    "moduleId": "osi-model",
    "moduleName": "OSI Model",
    "category": "Upper Layers",
    "primary": {
      "prompt": "Which layer of the OSI model provides network services directly to user applications and sits closest to the end user?",
      "options": [
        "Application Layer (Layer 7)",
        "Presentation Layer (Layer 6)",
        "Session Layer (Layer 5)",
        "Transport Layer (Layer 4)"
      ],
      "answer": "Application Layer (Layer 7)",
      "explanation": "The Application layer (Layer 7) interfaces directly with end-user software applications and network services.",
      "aliases": [
        "application",
        "layer 7",
        "application layer",
        "l7"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which OSI model layer interacts directly with user-facing software applications and network services?",
      "options": [
        "Application Layer (Layer 7)",
        "Session Layer (Layer 5)",
        "Presentation Layer (Layer 6)",
        "Network Layer (Layer 3)"
      ],
      "answer": "Application Layer (Layer 7)",
      "explanation": "Layer 7 (Application layer) provides network services directly to end users and applications.",
      "aliases": [
        "application",
        "layer 7",
        "application layer",
        "l7"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-tool-crimper-stripper",
    "moduleId": "networking-tools",
    "moduleName": "Networking Tools",
    "category": "Cable Preparation",
    "primary": {
      "prompt": "Which tool is specifically designed to attach RJ45 connector plugs onto the ends of twisted pair network cables?",
      "options": [
        "Wire Crimper",
        "Cable Stripper",
        "Punch Down Tool",
        "Tone Generator"
      ],
      "answer": "Wire Crimper",
      "explanation": "A wire crimper permanently secures RJ45/RJ11 connectors onto cable ends.",
      "aliases": [
        "crimper",
        "wire crimper",
        "crimping tool"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "When terminating a CAT6 patch cord with an RJ45 modular connector, which hand tool secures the pins onto the copper wires?",
      "options": [
        "Wire Crimper",
        "Cable Tester",
        "Butt Set",
        "TDR"
      ],
      "answer": "Wire Crimper",
      "explanation": "Wire crimpers terminate connectors onto twisted pair cables.",
      "aliases": [
        "crimper",
        "wire crimper",
        "crimping tool"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-tool-tester-tone",
    "moduleId": "networking-tools",
    "moduleName": "Networking Tools",
    "category": "Testing & Tracing",
    "primary": {
      "prompt": "Which tool combination is used to trace and locate the opposite end of an unlabeled cable in a patch panel by generating an audible signal?",
      "options": [
        "Tone Generator",
        "Loopback Adapter",
        "Light Meter",
        "Wire Crimper"
      ],
      "answer": "Tone Generator",
      "explanation": "A tone generator (and probe) emits and detects an audible tone to trace hidden or unlabeled cable runs.",
      "aliases": [
        "tone generator",
        "toner",
        "tone probe",
        "tone generator and probe"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "An administrator needs to identify which wall jack in an office connects to which port on a distant server rack. Which tool generates the test signal for tracing?",
      "options": [
        "Tone Generator",
        "Butt Set",
        "Multimeter",
        "Cable Stripper"
      ],
      "answer": "Tone Generator",
      "explanation": "Tone generators locate the opposite end of cable runs across rooms or racks.",
      "aliases": [
        "tone generator",
        "toner",
        "tone probe",
        "tone generator and probe"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-tool-tdr-otdr",
    "moduleId": "networking-tools",
    "moduleName": "Networking Tools",
    "category": "Fault Isolation",
    "primary": {
      "prompt": "Which diagnostic instrument detects breaks and measures distance to faults in copper network cabling by sending electrical pulses?",
      "options": [
        "TDR (Time Domain Reflectometer)",
        "OTDR (Optical Time Domain Reflectometer)",
        "Light Meter",
        "Multimeter"
      ],
      "answer": "TDR (Time Domain Reflectometer)",
      "explanation": "TDR sends electrical pulses through copper cables to detect faults and measure distance to breaks.",
      "aliases": [
        "tdr",
        "time domain reflectometer"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "To pinpoint the exact physical location of a severed fiber optic strand along a multi-kilometer link, which device sends light pulses down the fiber?",
      "options": [
        "OTDR (Optical Time Domain Reflectometer)",
        "TDR (Time Domain Reflectometer)",
        "Loopback Adapter",
        "Light Meter"
      ],
      "answer": "OTDR (Optical Time Domain Reflectometer)",
      "explanation": "OTDR uses light pulses to locate breaks and attenuation points in optical fiber cables.",
      "aliases": [
        "otdr",
        "optical time domain reflectometer"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-tool-punchdown-buttset",
    "moduleId": "networking-tools",
    "moduleName": "Networking Tools",
    "category": "Telecom & Termination",
    "primary": {
      "prompt": "Which tool is used to seat individual twisted pair wires into a 110 or punch block while trimming off the excess wire simultaneously?",
      "options": [
        "Punch Down Tool",
        "Wire Crimper",
        "Cable Stripper",
        "Loopback Adapter"
      ],
      "answer": "Punch Down Tool",
      "explanation": "A punch down tool seats wire pairs into termination blocks and automatically cuts off excess wire.",
      "aliases": [
        "punch down tool",
        "punch down",
        "punchdown",
        "punchdown tool"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "When terminating network cables into keystone jacks or patch panel blocks, which tool forces the wire into the IDC blade and shears the remnant?",
      "options": [
        "Punch Down Tool",
        "Multimeter",
        "Tone Generator",
        "Cable Tester"
      ],
      "answer": "Punch Down Tool",
      "explanation": "Punch down tools seat and trim wires in punch blocks and keystone jacks.",
      "aliases": [
        "punch down tool",
        "punch down",
        "punchdown",
        "punchdown tool"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-tool-loopback-multimeter",
    "moduleId": "networking-tools",
    "moduleName": "Networking Tools",
    "category": "Port & Electrical Testing",
    "primary": {
      "prompt": "Which device is plugged directly into a network interface card (NIC) or switch port to verify physical port hardware functionality by redirecting outbound traffic back to the input?",
      "options": [
        "Loopback Adapter",
        "Tone Generator",
        "Cable Stripper",
        "Butt Set"
      ],
      "answer": "Loopback Adapter",
      "explanation": "A loopback adapter redirects transmit signals back to receive pins to test physical port circuitry.",
      "aliases": [
        "loopback adapter",
        "loopback",
        "loopback plug"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "To test whether an Ethernet switch port's physical transceiver is operating without connecting to another host, which test plug should be inserted?",
      "options": [
        "Loopback Adapter",
        "Light Meter",
        "TDR",
        "Punch Down Tool"
      ],
      "answer": "Loopback Adapter",
      "explanation": "Loopback adapters test transceiver ports by looping signals directly back.",
      "aliases": [
        "loopback adapter",
        "loopback",
        "loopback plug"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-tool-light-meter",
    "moduleId": "networking-tools",
    "moduleName": "Networking Tools",
    "category": "Fiber Testing",
    "primary": {
      "prompt": "Which diagnostic tool measures optical power and signal attenuation in fiber optic cabling and requires a dedicated light source on the opposite end?",
      "options": [
        "Light Meter",
        "OTDR",
        "TDR",
        "Cable Tester"
      ],
      "answer": "Light Meter",
      "explanation": "A light meter measures optical light loss and requires a light source device on the other end of the fiber cable.",
      "aliases": [
        "light meter",
        "optical light meter",
        "power meter",
        "optical power meter"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which specialized networking instrument is used to test signal strength and loss across fiber optic cables in conjunction with a separate light emitter?",
      "options": [
        "Light Meter",
        "Tone Generator",
        "Loopback Adapter",
        "Multimeter"
      ],
      "answer": "Light Meter",
      "explanation": "Light meters measure optical power in fiber cables when paired with a light source.",
      "aliases": [
        "light meter",
        "optical light meter",
        "power meter",
        "optical power meter"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-modem-router-conn",
    "moduleId": "modem-router",
    "moduleName": "Modems VS Routers",
    "category": "Device Roles",
    "primary": {
      "prompt": "Which network device provides the physical connection to the Internet Service Provider (ISP)?",
      "options": [
        "Modem",
        "Router"
      ],
      "answer": "Modem",
      "explanation": "Modems provide the physical connection to the ISP by translating physical carrier signals.",
      "aliases": [
        "modem"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which hardware unit handles logical IP routing and connects all local client devices together across a subnet?",
      "options": [
        "Router",
        "Modem"
      ],
      "answer": "Router",
      "explanation": "Routers provide the logical connection to the ISP and route packets among local devices.",
      "aliases": [
        "router"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-modem-modulation",
    "moduleId": "modem-router",
    "moduleName": "Modems VS Routers",
    "category": "Signal Processing",
    "primary": {
      "prompt": "What process does a modem perform on incoming analog signals received from the ISP?",
      "options": [
        "Demodulates incoming analog signals into digital signals",
        "Modulates incoming digital signals into analog signals",
        "Encapsulates packets into Layer 3 IP datagrams",
        "Filters frames using MAC address tables"
      ],
      "answer": "Demodulates incoming analog signals into digital signals",
      "explanation": "Modems DE-modulate incoming analog signals to digital signals, and modulate outgoing digital signals to analog.",
      "aliases": [
        "demodulate",
        "demodulation",
        "demodulates"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "When transmitting digital computer data outwards across an analog ISP transmission line, what conversion must the modem execute?",
      "options": [
        "Modulates outgoing digital signals into analog signals",
        "Demodulates incoming analog signals into digital signals",
        "Converts full duplex frames to simplex frames",
        "Translates IPv4 packets to IPv6 packets"
      ],
      "answer": "Modulates outgoing digital signals into analog signals",
      "explanation": "Modulation converts outgoing digital signals into analog format for transmission over ISP carrier lines.",
      "aliases": [
        "modulate",
        "modulation",
        "modulates"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-modem-media-types",
    "moduleId": "modem-router",
    "moduleName": "Modems VS Routers",
    "category": "Media Types",
    "primary": {
      "prompt": "What physical transmission medium is utilized by a DSL (Digital Subscriber Line) modem?",
      "options": [
        "Phone lines",
        "Coaxial cables",
        "Single-mode fiber optic",
        "Unshielded plenum conduits"
      ],
      "answer": "Phone lines",
      "explanation": "DSL modems connect over traditional copper telephone lines.",
      "aliases": [
        "phone lines",
        "telephone lines",
        "phone line",
        "telephone line"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which cable type connects a cable modem to the ISP cable distribution network?",
      "options": [
        "Coaxial cables",
        "Phone lines",
        "Cat5e unshielded twisted pair",
        "Multimode optical ribbon"
      ],
      "answer": "Coaxial cables",
      "explanation": "Cable modems connect to broadband providers over coaxial cables.",
      "aliases": [
        "coaxial",
        "coax",
        "coaxial cable",
        "coaxial cables"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-modem-router-routing",
    "moduleId": "modem-router",
    "moduleName": "Modem vs Router",
    "category": "Device Roles",
    "primary": {
      "prompt": "What is the primary function of a network Router in TCP/IP networking?",
      "options": [
        "Routes packets between different IP networks and subnets",
        "Modulates digital signals into analog signals",
        "Converts copper signals into optical light pulses",
        "Regulates electrical voltage across twisted pair cables"
      ],
      "answer": "Routes packets between different IP networks and subnets",
      "explanation": "Routers provide logical network layer routing and packet forwarding between distinct IP subnets.",
      "aliases": [
        "routes packets",
        "routing",
        "routing packets",
        "inter-network routing"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which network device forwards packets between different IP subnets based on destination IP addresses?",
      "options": [
        "Router",
        "Modem",
        "Layer 2 Switch",
        "Network Hub"
      ],
      "answer": "Router",
      "explanation": "A router forwards IP packets across different logical networks and subnets.",
      "aliases": [
        "router",
        "network router",
        "l3 router"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-modem-gateway-combo",
    "moduleId": "modem-router",
    "moduleName": "Modem vs Router",
    "category": "Device Roles",
    "primary": {
      "prompt": "What functions are combined in a modern residential broadband 'Gateway' unit?",
      "options": [
        "Modem, router, Wi-Fi access point, and multiport Ethernet switch",
        "Modem, OTDR, light meter, and cable tester",
        "Router, DNS root server, DHCP authority, and firewall appliance",
        "Modem, repeater, analog amplifier, and butt set"
      ],
      "answer": "Modem, router, Wi-Fi access point, and multiport Ethernet switch",
      "explanation": "Residential gateways integrate a broadband modem, router, Wi-Fi AP, and switch into a single unit.",
      "aliases": [
        "modem router switch ap",
        "gateway"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "A standard consumer broadband gateway typically integrates which set of networking hardware components into a single chassis?",
      "options": [
        "Modem, router, wireless AP, and Ethernet switch",
        "TDR, OTDR, punch down tool, and toner",
        "Core switch, distribution switch, and access switch",
        "CSU/DSU, frame relay switch, and ATM multiplexer"
      ],
      "answer": "Modem, router, wireless AP, and Ethernet switch",
      "explanation": "Consumer gateway devices combine modem, routing, wireless AP, and LAN switching capabilities.",
      "aliases": [
        "modem router switch ap",
        "gateway"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-eiatia-pin1",
    "moduleId": "eia-tia-standard",
    "moduleName": "EIA/TIA 568B Standard",
    "category": "Pin Specifications",
    "primary": {
      "prompt": "In the EIA/TIA 568B wiring standard, which color conductor is wired to Pin 1?",
      "options": [
        "Orange/white stripe",
        "Green/white stripe",
        "Orange",
        "Blue"
      ],
      "answer": "Orange/white stripe",
      "explanation": "Pin 1 of the EIA/TIA 568B standard is Orange/white stripe.",
      "aliases": [
        "orange/white",
        "orange/white stripe",
        "orange white",
        "orange-white"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "According to the EIA/TIA 568B specification, what is the first wire color seated at the top pin position (Pin 1)?",
      "options": [
        "Orange/white stripe",
        "Blue/white stripe",
        "Green",
        "Brown/white stripe"
      ],
      "answer": "Orange/white stripe",
      "explanation": "Pin 1 is Orange/white stripe in 568B.",
      "aliases": [
        "orange/white",
        "orange/white stripe",
        "orange white",
        "orange-white"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-eiatia-pin8",
    "moduleId": "eia-tia-standard",
    "moduleName": "EIA/TIA 568B Standard",
    "category": "Pin Specifications",
    "primary": {
      "prompt": "In the EIA/TIA 568B standard, which wire color corresponds to Pin 8?",
      "options": [
        "Brown",
        "Brown/white stripe",
        "Green",
        "Blue/white stripe"
      ],
      "answer": "Brown",
      "explanation": "Pin 8 is solid Brown in 568B.",
      "aliases": [
        "brown",
        "solid brown"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "What is the final conductor color connected to Pin 8 when wiring an RJ45 modular plug to EIA/TIA 568B?",
      "options": [
        "Brown",
        "Orange",
        "Green/white stripe",
        "Blue"
      ],
      "answer": "Brown",
      "explanation": "Pin 8 is Brown.",
      "aliases": [
        "brown",
        "solid brown"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-eiatia-pin-sequence",
    "moduleId": "eia-tia-standard",
    "moduleName": "EIA/TIA 568B Standard",
    "category": "Pin Sequence",
    "primary": {
      "prompt": "Which pair of colors occupy Pin 4 and Pin 5 in an EIA/TIA 568B terminated RJ45 connector?",
      "options": [
        "Pin 4: Blue, Pin 5: Blue/white stripe",
        "Pin 4: Green/white stripe, Pin 5: Green",
        "Pin 4: Orange, Pin 5: Orange/white stripe",
        "Pin 4: Brown/white stripe, Pin 5: Brown"
      ],
      "answer": "Pin 4: Blue, Pin 5: Blue/white stripe",
      "explanation": "Pins 4 and 5 in 568B are Blue and Blue/white stripe respectively.",
      "aliases": [
        "blue and blue/white",
        "blue, blue/white"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "In the EIA/TIA 568B sequence, which colored wire is positioned immediately at Pin 3?",
      "options": [
        "Green/white stripe",
        "Orange",
        "Blue/white stripe",
        "Brown"
      ],
      "answer": "Green/white stripe",
      "explanation": "Pin 3 is Green/white stripe in 568B (mnemonic: Aliens!!).",
      "aliases": [
        "green/white",
        "green/white stripe",
        "green white",
        "green-white"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-eiatia-568a-vs-568b",
    "moduleId": "eia-tia-standard",
    "moduleName": "EIA/TIA 568B Standard",
    "category": "Pinouts",
    "primary": {
      "prompt": "Which pairs of pin positions swap wire colors between the EIA/TIA 568A and 568B termination standards?",
      "options": [
        "Pins 1 and 2 swap with Pins 3 and 6 (Green and Orange pairs)",
        "Pins 4 and 5 swap with Pins 7 and 8 (Blue and Brown pairs)",
        "Pins 1 and 3 swap with Pins 2 and 4",
        "Pins 3 and 4 swap with Pins 5 and 6"
      ],
      "answer": "Pins 1 and 2 swap with Pins 3 and 6 (Green and Orange pairs)",
      "explanation": "The difference between 568A and 568B is that the orange and green wire pairs swap positions on Pins 1/2 and 3/6.",
      "aliases": [
        "pins 1 and 2 with 3 and 6",
        "green and orange",
        "green and orange pairs"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "When converting an Ethernet termination from EIA/TIA 568A to 568B, which color pairs are swapped on Pins 1, 2, 3, and 6?",
      "options": [
        "Orange and Green pairs",
        "Blue and Brown pairs",
        "Green and Blue pairs",
        "Orange and Brown pairs"
      ],
      "answer": "Orange and Green pairs",
      "explanation": "The Green pair (568A pins 1, 2, 3, 6) and Orange pair (568B pins 1, 2, 3, 6) swap between standards.",
      "aliases": [
        "orange and green",
        "green and orange",
        "orange and green pairs"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-eiatia-identical-pins",
    "moduleId": "eia-tia-standard",
    "moduleName": "EIA/TIA 568B Standard",
    "category": "Pinouts",
    "primary": {
      "prompt": "Which pin positions maintain the exact same wire color sequence in both EIA/TIA 568A and 568B standards?",
      "options": [
        "Pins 4, 5, 7, and 8 (Blue and Brown pairs)",
        "Pins 1, 2, 3, and 6 (Green and Orange pairs)",
        "Pins 1, 4, 5, and 8",
        "Pins 2, 3, 6, and 7"
      ],
      "answer": "Pins 4, 5, 7, and 8 (Blue and Brown pairs)",
      "explanation": "Pins 4 (Blue), 5 (White/Blue), 7 (White/Brown), and 8 (Brown) are identical in both 568A and 568B.",
      "aliases": [
        "4, 5, 7, 8",
        "pins 4 5 7 8",
        "4 5 7 8",
        "pins 4, 5, 7, and 8"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Pins 4, 5, 7, and 8 share identical wire color assignments across which two cabling standards?",
      "options": [
        "EIA/TIA 568A and EIA/TIA 568B",
        "IEEE 802.3 and IEEE 802.11",
        "10base2 and 10base5",
        "Cat5 and Cat6a"
      ],
      "answer": "EIA/TIA 568A and EIA/TIA 568B",
      "explanation": "Both EIA/TIA 568A and 568B have identical pinouts for pins 4, 5, 7, and 8.",
      "aliases": [
        "eia/tia 568a and eia/tia 568b",
        "568a and 568b",
        "t568a and t568b"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-bnb-definitions",
    "moduleId": "bits-nibbles-bytes",
    "moduleName": "Bits, Nibbles, and Bytes",
    "category": "Units of Measure",
    "primary": {
      "prompt": "How many bits are contained in a single Nibble and a single Byte respectively?",
      "options": [
        "Nibble: 4 bits, Byte: 8 bits",
        "Nibble: 8 bits, Byte: 16 bits",
        "Nibble: 2 bits, Byte: 4 bits",
        "Nibble: 4 bits, Byte: 16 bits"
      ],
      "answer": "Nibble: 4 bits, Byte: 8 bits",
      "explanation": "A nibble is exactly 4 bits; a byte is 8 bits (2 nibbles).",
      "aliases": [
        "4 and 8",
        "4 bits and 8 bits"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "A data unit composed of exactly 4 binary digits (bits) is referred to as what?",
      "options": [
        "Nibble",
        "Byte",
        "Octet",
        "Word"
      ],
      "answer": "Nibble",
      "explanation": "A nibble consists of 4 bits.",
      "aliases": [
        "nibble"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-bnb-kilo-units",
    "moduleId": "bits-nibbles-bytes",
    "moduleName": "Bits, Nibbles, and Bytes",
    "category": "Prefix Units",
    "primary": {
      "prompt": "What is the exact quantity of bits in one kilobit (Kb), and bytes in one kilobyte (KB)?",
      "options": [
        "1 kilobit = 1,000 bits; 1 kilobyte = 1,024 bytes",
        "1 kilobit = 1,024 bits; 1 kilobyte = 1,000 bytes",
        "1 kilobit = 1,000 bits; 1 kilobyte = 1,000 bytes",
        "1 kilobit = 8,000 bits; 1 kilobyte = 8,192 bytes"
      ],
      "answer": "1 kilobit = 1,000 bits; 1 kilobyte = 1,024 bytes",
      "explanation": "Kilobits (Kb) are base-10 (1,000 bits), while Kilobytes (KB) are base-2 (1,024 bytes).",
      "aliases": [
        "1000 and 1024",
        "1000 bits, 1024 bytes"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which standard metric value defines a kilobit (abbreviated lowercase 'Kb') in network data throughput?",
      "options": [
        "1,000 bits",
        "1,024 bits",
        "8,000 bits",
        "1,024 bytes"
      ],
      "answer": "1,000 bits",
      "explanation": "A kilobit (Kb) equals 1,000 bits.",
      "aliases": [
        "1000",
        "1,000",
        "1000 bits",
        "1,000 bits"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-bnb-speed-storage",
    "moduleId": "bits-nibbles-bytes",
    "moduleName": "Bits, Nibbles, and Bytes",
    "category": "Application",
    "primary": {
      "prompt": "Network transmission speed (throughput) is typically measured in which unit, while data storage capacity is measured in which unit?",
      "options": [
        "Speed: Bits per second; Storage: Bytes",
        "Speed: Bytes per second; Storage: Bits",
        "Speed: Nibbles per second; Storage: Bytes",
        "Speed: Octets per second; Storage: Bits"
      ],
      "answer": "Speed: Bits per second; Storage: Bytes",
      "explanation": "Throughput is measured in bits per second (b/s, Mb/s, Gb/s), whereas storage is measured in Bytes (KB, MB, GB).",
      "aliases": [
        "bits for speed, bytes for storage"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "When reviewing network bandwidth specifications, what does lowercase 'b' represent compared to uppercase 'B'?",
      "options": [
        "Lowercase 'b' is bits (speed); uppercase 'B' is bytes (storage)",
        "Lowercase 'b' is bytes; uppercase 'B' is bits",
        "Lowercase 'b' is binary; uppercase 'B' is base-10",
        "Lowercase 'b' is broadband; uppercase 'B' is baseband"
      ],
      "answer": "Lowercase 'b' is bits (speed); uppercase 'B' is bytes (storage)",
      "explanation": "b = bits, B = bytes.",
      "aliases": [
        "bits vs bytes"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-bnb-byte-nibble-ratio",
    "moduleId": "bits-nibbles-bytes",
    "moduleName": "Bits, Nibbles, and Bytes",
    "category": "Data Units",
    "primary": {
      "prompt": "How many 4-bit nibbles are contained in a single 8-bit byte?",
      "options": [
        "2 nibbles",
        "4 nibbles",
        "8 nibbles",
        "16 nibbles"
      ],
      "answer": "2 nibbles",
      "explanation": "Since a byte is 8 bits and a nibble is 4 bits, there are exactly 2 nibbles in one byte.",
      "aliases": [
        "2",
        "two",
        "2 nibbles"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "An 8-bit byte is composed of how many nibbles?",
      "options": [
        "2 nibbles",
        "1 nibble",
        "4 nibbles",
        "8 nibbles"
      ],
      "answer": "2 nibbles",
      "explanation": "Each byte contains 2 nibbles (4 bits each).",
      "aliases": [
        "2",
        "two",
        "2 nibbles"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-bnb-case-symbols",
    "moduleId": "bits-nibbles-bytes",
    "moduleName": "Bits, Nibbles, and Bytes",
    "category": "Data Units",
    "primary": {
      "prompt": "Which standard capitalization distinguishes bits from bytes in networking and computing abbreviations?",
      "options": [
        "Lowercase 'b' for bits, uppercase 'B' for bytes",
        "Uppercase 'B' for bits, lowercase 'b' for bytes",
        "Lowercase for both bits and bytes",
        "Uppercase for both bits and bytes"
      ],
      "answer": "Lowercase 'b' for bits, uppercase 'B' for bytes",
      "explanation": "Standard abbreviation uses lowercase 'b' for bits (e.g., Mb/s) and uppercase 'B' for bytes (e.g., MB).",
      "aliases": [
        "lowercase b for bits, uppercase b for bytes",
        "b for bits, b for bytes",
        "lowercase b for bits"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "In networking notation, what do lowercase 'b' and uppercase 'B' represent respectively?",
      "options": [
        "Bits and Bytes",
        "Bytes and Bits",
        "Baud and Bandwidth",
        "Binary and Base"
      ],
      "answer": "Bits and Bytes",
      "explanation": "Lowercase 'b' stands for bits and uppercase 'B' stands for bytes.",
      "aliases": [
        "bits and bytes",
        "bit and byte",
        "bits, bytes"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-bin-calc-192",
    "moduleId": "binary-calculation",
    "moduleName": "Binary Calculation",
    "category": "Conversions",
    "primary": {
      "prompt": "What is the decimal equivalent of the 8-bit binary value 11000000?",
      "options": [
        "192",
        "224",
        "128",
        "240"
      ],
      "answer": "192",
      "explanation": "128 + 64 = 192.",
      "aliases": [
        "192"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Converting the binary octet 11000000 into base-10 decimal yields which value?",
      "options": [
        "192",
        "168",
        "255",
        "128"
      ],
      "answer": "192",
      "explanation": "128 + 64 = 192.",
      "aliases": [
        "192"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-bin-calc-255",
    "moduleId": "binary-calculation",
    "moduleName": "Binary Calculation",
    "category": "Conversions",
    "primary": {
      "prompt": "What is the maximum decimal value represented by an 8-bit byte with all bits set to 1 (11111111)?",
      "options": [
        "255",
        "256",
        "128",
        "512"
      ],
      "answer": "255",
      "explanation": "128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255.",
      "aliases": [
        "255"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "If all 8 bits in an IPv4 octet are binary 1s (11111111), what is the calculated decimal number?",
      "options": [
        "255",
        "254",
        "256",
        "127"
      ],
      "answer": "255",
      "explanation": "8 ones equals 255.",
      "aliases": [
        "255"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-bin-calc-positional",
    "moduleId": "binary-calculation",
    "moduleName": "Binary Calculation",
    "category": "Binary Conversion",
    "primary": {
      "prompt": "What are the eight decimal place values represented by each bit in a standard 8-bit byte from left to right?",
      "options": [
        "128, 64, 32, 16, 8, 4, 2, 1",
        "256, 128, 64, 32, 16, 8, 4, 2",
        "1, 2, 4, 8, 16, 32, 64, 128",
        "512, 256, 128, 64, 32, 16, 8, 4"
      ],
      "answer": "128, 64, 32, 16, 8, 4, 2, 1",
      "explanation": "The 8 bit positions in an octet represent powers of 2 from 2^7 (128) down to 2^0 (1).",
      "aliases": [
        "128, 64, 32, 16, 8, 4, 2, 1",
        "128 64 32 16 8 4 2 1"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "In an 8-bit binary octet, what decimal value does the most significant bit (leftmost bit) represent?",
      "options": [
        "128",
        "256",
        "64",
        "1"
      ],
      "answer": "128",
      "explanation": "The leftmost bit (bit 7) represents 2^7 = 128 in base 10.",
      "aliases": [
        "128",
        "one hundred twenty-eight",
        "one hundred twenty eight"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-bin-calc-subnet-240",
    "moduleId": "binary-calculation",
    "moduleName": "Binary Calculation",
    "category": "Binary Conversion",
    "primary": {
      "prompt": "What is the decimal equivalent of the binary octet 11110000 commonly found in subnet masks?",
      "options": [
        "240",
        "248",
        "224",
        "252"
      ],
      "answer": "240",
      "explanation": "128 + 64 + 32 + 16 = 240.",
      "aliases": [
        "240",
        "two hundred forty",
        "two hundred and forty"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Converting the 8-bit binary octet 11110000 into standard decimal format produces which value?",
      "options": [
        "240",
        "192",
        "224",
        "254"
      ],
      "answer": "240",
      "explanation": "Binary 11110000 = 128 + 64 + 32 + 16 = 240.",
      "aliases": [
        "240",
        "two hundred forty",
        "two hundred and forty"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-comm-definitions",
    "moduleId": "communication-types",
    "moduleName": "Communication Types",
    "category": "Duplex Modes",
    "primary": {
      "prompt": "Which communication transmission mode permits data to travel in only ONE unidirectional path?",
      "options": [
        "Simplex",
        "Half-Duplex",
        "Full Duplex",
        "Multiplex"
      ],
      "answer": "Simplex",
      "explanation": "Simplex communication allows transmission in only one single direction (e.g., radio broadcast, megaphone).",
      "aliases": [
        "simplex"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "A broadcast radio tower transmitting FM radio signals to automobile receivers is an example of which communication type?",
      "options": [
        "Simplex",
        "Half-Duplex",
        "Full Duplex",
        "Asynchronous Duplex"
      ],
      "answer": "Simplex",
      "explanation": "Radio broadcasts are one-way only (Simplex).",
      "aliases": [
        "simplex"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-comm-half-full",
    "moduleId": "communication-types",
    "moduleName": "Communication Types",
    "category": "Duplex Modes",
    "primary": {
      "prompt": "Which duplex mode enables two devices to communicate in BOTH directions, but only ONE device can transmit at a time?",
      "options": [
        "Half-Duplex",
        "Simplex",
        "Full Duplex",
        "Continuous Duplex"
      ],
      "answer": "Half-Duplex",
      "explanation": "Half-Duplex allows bidirectional communication, but stations must take turns (e.g. walkie-talkies, legacy hubs).",
      "aliases": [
        "half-duplex",
        "half duplex",
        "half"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Walkie-talkies requiring users to press a push-to-talk button before speaking operate in which transmission mode?",
      "options": [
        "Half-Duplex",
        "Full Duplex",
        "Simplex",
        "Dual Simplex"
      ],
      "answer": "Half-Duplex",
      "explanation": "Push-to-talk radios alternate transmission turns (Half-Duplex).",
      "aliases": [
        "half-duplex",
        "half duplex",
        "half"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-comm-switch-full",
    "moduleId": "communication-types",
    "moduleName": "Communication Types",
    "category": "Network Hardware Duplex",
    "primary": {
      "prompt": "Modern network switches and landline telephone calls operate in which communication mode where both endpoints transmit simultaneously?",
      "options": [
        "Full Duplex",
        "Half-Duplex",
        "Simplex",
        "Shared Media Contention"
      ],
      "answer": "Full Duplex",
      "explanation": "Full Duplex allows simultaneous two-way transmission over dedicated channels without collisions.",
      "aliases": [
        "full duplex",
        "full-duplex",
        "full"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which communication type allows simultaneous bidirectional data exchange on dedicated point-to-point Ethernet links?",
      "options": [
        "Full Duplex",
        "Half-Duplex",
        "Simplex",
        "Token Ring"
      ],
      "answer": "Full Duplex",
      "explanation": "Modern Ethernet switch links run in Full Duplex.",
      "aliases": [
        "full duplex",
        "full-duplex",
        "full"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-comm-examples-simplex-half",
    "moduleId": "communication-types",
    "moduleName": "Communication Types",
    "category": "Transmission Modes",
    "primary": {
      "prompt": "Which real-world communication systems illustrate Simplex and Half-Duplex transmission modes respectively?",
      "options": [
        "Commercial FM radio broadcast (Simplex) and Walkie-talkie push-to-talk (Half-Duplex)",
        "Landline phone call (Simplex) and Switch port (Half-Duplex)",
        "Walkie-talkie (Simplex) and FM radio (Half-Duplex)",
        "Web browsing (Simplex) and TV broadcast (Half-Duplex)"
      ],
      "answer": "Commercial FM radio broadcast (Simplex) and Walkie-talkie push-to-talk (Half-Duplex)",
      "explanation": "FM radio is strictly one-way (Simplex), while walkie-talkies allow two-way communication but only one party at a time (Half-Duplex).",
      "aliases": [
        "fm radio and walkie talkie",
        "radio and walkie-talkie"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Commercial radio broadcasts and walkie-talkie push-to-talk communications represent which transmission modes respectively?",
      "options": [
        "Simplex and Half-Duplex",
        "Half-Duplex and Full-Duplex",
        "Full-Duplex and Simplex",
        "Simplex and Full-Duplex"
      ],
      "answer": "Simplex and Half-Duplex",
      "explanation": "Radio broadcasting is one-way (Simplex), whereas walkie-talkies are bidirectional non-simultaneous (Half-Duplex).",
      "aliases": [
        "simplex and half-duplex",
        "simplex and half duplex",
        "simplex, half-duplex"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-topo-star",
    "moduleId": "network-topologies",
    "moduleName": "Wired Network Topologies",
    "category": "Topology Identification",
    "primary": {
      "prompt": "In which physical network topology are all client endpoints individually wired back to a central device such as a hub or switch?",
      "options": [
        "Star",
        "Bus",
        "Ring",
        "Mesh"
      ],
      "answer": "Star",
      "explanation": "A Star topology connects all hosts to a central hub or switch using twisted pair cables and RJ45 connectors.",
      "aliases": [
        "star"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which common LAN topology uses RJ45 twisted pair cabling radiating from a central network switch to each workstation?",
      "options": [
        "Star",
        "Mesh",
        "Bus",
        "Ring"
      ],
      "answer": "Star",
      "explanation": "Star is the standard centralized topology.",
      "aliases": [
        "star"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-topo-bus",
    "moduleId": "network-topologies",
    "moduleName": "Wired Network Topologies",
    "category": "Topology Identification",
    "primary": {
      "prompt": "Which legacy topology connects all computers in a single linear line along a shared coaxial cable with terminators at both physical ends?",
      "options": [
        "Bus",
        "Star",
        "Ring",
        "Mesh"
      ],
      "answer": "Bus",
      "explanation": "Bus topology uses a single coaxial trunk cable, BNC connectors, and terminating resistors at both ends.",
      "aliases": [
        "bus"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "A network that utilizes thicknet or thinnet coaxial cable terminated on both ends with 50-ohm resistors describes which physical layout?",
      "options": [
        "Bus",
        "Ring",
        "Star",
        "Mesh"
      ],
      "answer": "Bus",
      "explanation": "Coaxial cabling with end terminators forms a Bus topology.",
      "aliases": [
        "bus"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-topo-ring-mesh",
    "moduleId": "network-topologies",
    "moduleName": "Wired Network Topologies",
    "category": "Topology Identification",
    "primary": {
      "prompt": "Which network topology connects all devices to every other device to provide maximum redundancy and fault tolerance, representing the architecture of the Internet?",
      "options": [
        "Mesh",
        "Ring",
        "Star",
        "Bus"
      ],
      "answer": "Mesh",
      "explanation": "Mesh topology interconnects nodes with redundant paths, offering high fault tolerance.",
      "aliases": [
        "mesh"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "In a Ring topology, what mechanism is passed from node to node around the closed circular loop to control transmission access?",
      "options": [
        "Token",
        "Vampire Tap",
        "BNC Terminator",
        "ARP Broadcast"
      ],
      "answer": "Token",
      "explanation": "Ring networks use token passing around the loop to coordinate communication.",
      "aliases": [
        "token",
        "a token"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-topo-cabling-star",
    "moduleId": "network-topologies",
    "moduleName": "Network Topologies",
    "category": "Physical Topologies",
    "primary": {
      "prompt": "What type of cabling is universally deployed to connect client devices to central switches in a Star topology?",
      "options": [
        "Twisted pair Ethernet patch cables",
        "Thicknet coaxial cables",
        "Twinaxial copper cables",
        "Single continuous loop fiber"
      ],
      "answer": "Twisted pair Ethernet patch cables",
      "explanation": "Star topologies use twisted pair Ethernet cables (UTP/STP Cat5e/Cat6) connecting each host to a central switch.",
      "aliases": [
        "twisted pair",
        "twisted pair ethernet",
        "ethernet cables",
        "patch cables",
        "utp",
        "stp"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "In modern local area networks utilizing a physical Star topology, which cabling medium connects endpoints to the central switch?",
      "options": [
        "Twisted pair Ethernet patch cables",
        "Coaxial Thinnet with T-connectors",
        "Single serial daisy chains",
        "Shielded ribbon cables"
      ],
      "answer": "Twisted pair Ethernet patch cables",
      "explanation": "Endpoints in a Star topology connect individually to the switch using twisted pair Ethernet patch cables.",
      "aliases": [
        "twisted pair",
        "twisted pair ethernet",
        "ethernet cables",
        "patch cables",
        "utp",
        "stp"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-topo-bus-terminator",
    "moduleId": "network-topologies",
    "moduleName": "Network Topologies",
    "category": "Physical Topologies",
    "primary": {
      "prompt": "What critical issue occurs on a Bus topology network if terminators are missing or removed from either end of the coaxial cable?",
      "options": [
        "Signals reflect back along the wire, causing packet collisions and bringing down the entire bus",
        "Devices automatically switch to full-duplex operation",
        "Packets loop infinitely without collision",
        "The network converts into a ring topology"
      ],
      "answer": "Signals reflect back along the wire, causing packet collisions and bringing down the entire bus",
      "explanation": "Without terminators to absorb electrical signals, signals bounce/reflect back across the bus, creating collisions that disable all communication.",
      "aliases": [
        "signals reflect",
        "signal reflection",
        "packet collisions"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Why are terminating resistors required at both physical ends of a coaxial Bus topology segment?",
      "options": [
        "To prevent signal reflection and eliminate line collisions",
        "To amplify electrical signal voltage across long distances",
        "To assign unique MAC addresses to attached hosts",
        "To prevent unauthorized computers from tapping into the cable"
      ],
      "answer": "To prevent signal reflection and eliminate line collisions",
      "explanation": "Terminators absorb the electrical signal at the bus ends so it does not reflect back and cause collisions.",
      "aliases": [
        "prevent signal reflection",
        "absorb signals",
        "stop signal reflection"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-8023-thin-thick",
    "moduleId": "802.3-ethernet-standards",
    "moduleName": "Wired Ethernet Standards",
    "category": "Legacy Coax Standards",
    "primary": {
      "prompt": "What is the maximum segment distance and connector type used with 10base2 (Thinnet) Ethernet?",
      "options": [
        "200m; BNC / T-connectors",
        "500m; Vampire Taps",
        "100m; RJ45",
        "100m; RJ11"
      ],
      "answer": "200m; BNC / T-connectors",
      "explanation": "10base2 (Thinnet) has a maximum distance of 200m and uses BNC T-connectors with terminators.",
      "aliases": [
        "200m and bnc",
        "200m, bnc"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which legacy 802.3 standard utilizes Thicknet coaxial cable, spans up to 500 meters, and attaches devices using Vampire Taps?",
      "options": [
        "10base5",
        "10base2",
        "10baseT",
        "100baseT"
      ],
      "answer": "10base5",
      "explanation": "10base5 (Thicknet) supports 500m and uses Vampire Taps.",
      "aliases": [
        "10base5",
        "10base-5",
        "10 base 5"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-8023-twisted-pair",
    "moduleId": "802.3-ethernet-standards",
    "moduleName": "Wired Ethernet Standards",
    "category": "Twisted Pair Standards",
    "primary": {
      "prompt": "What is the maximum transmission distance for 100baseT (Fast Ethernet) and 1000baseT (Gigabit Ethernet) over twisted pair cabling?",
      "options": [
        "100m",
        "55m",
        "200m",
        "500m"
      ],
      "answer": "100m",
      "explanation": "Standard twisted pair Ethernet standards (10baseT, 100baseT, 1000baseT) have a maximum distance of 100 meters.",
      "aliases": [
        "100m",
        "100 meters",
        "100"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which minimum cable category is required to support Gigabit Ethernet (1000baseT / IEEE 802.3z) across a 100-meter run?",
      "options": [
        "Cat5e or better",
        "Cat3 or better",
        "Cat5 or better",
        "Cat2"
      ],
      "answer": "Cat5e or better",
      "explanation": "1000baseT requires at least Cat5e cabling.",
      "aliases": [
        "cat5e",
        "cat5e or better",
        "cat 5e"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-8023-10g-distances",
    "moduleId": "802.3-ethernet-standards",
    "moduleName": "Wired Ethernet Standards",
    "category": "Ethernet Specifications",
    "primary": {
      "prompt": "What are the maximum transmission distances for 10GbaseT (10 Gb/s Ethernet) over Cat6 and Cat6a twisted pair cabling respectively?",
      "options": [
        "55 meters on Cat6, 100 meters on Cat6a",
        "100 meters on Cat6, 500 meters on Cat6a",
        "50 meters on Cat6, 75 meters on Cat6a",
        "100 meters on Cat6, 200 meters on Cat6a"
      ],
      "answer": "55 meters on Cat6, 100 meters on Cat6a",
      "explanation": "10GbaseT can reach up to 55m over Cat6, and the full standard distance of 100m over Cat6a.",
      "aliases": [
        "55m on cat6, 100m on cat6a",
        "55m cat6 100m cat6a",
        "55m and 100m"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "How far can 10GbaseT transmit 10 Gbps Ethernet signals when using Cat6 versus Cat6a unshielded twisted pair cabling?",
      "options": [
        "55 meters on Cat6, 100 meters on Cat6a",
        "25 meters on Cat6, 50 meters on Cat6a",
        "100 meters on both Cat6 and Cat6a",
        "185 meters on Cat6, 500 meters on Cat6a"
      ],
      "answer": "55 meters on Cat6, 100 meters on Cat6a",
      "explanation": "Cat6 supports 10 Gbps up to 55 meters; Cat6a supports 10 Gbps up to 100 meters.",
      "aliases": [
        "55m on cat6, 100m on cat6a",
        "55m cat6 100m cat6a",
        "55m and 100m"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-8023-standards-mapping",
    "moduleId": "802.3-ethernet-standards",
    "moduleName": "Wired Ethernet Standards",
    "category": "Ethernet Specifications",
    "primary": {
      "prompt": "Which IEEE 802.3 standard designations represent Fast Ethernet (100 Mb/s) and 10-Gigabit Ethernet (10 Gb/s) respectively?",
      "options": [
        "802.3u (Fast Ethernet) and 802.3an (10GbaseT)",
        "802.3i (Fast Ethernet) and 802.3z (10GbaseT)",
        "802.3 (Fast Ethernet) and 802.3ab (10GbaseT)",
        "802.11u (Fast Ethernet) and 802.11an (10GbaseT)"
      ],
      "answer": "802.3u (Fast Ethernet) and 802.3an (10GbaseT)",
      "explanation": "IEEE 802.3u defines 100baseT Fast Ethernet, and IEEE 802.3an defines 10GbaseT.",
      "aliases": [
        "802.3u and 802.3an",
        "802.3u, 802.3an"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "IEEE 802.3u and IEEE 802.3an define which Ethernet speed standards respectively?",
      "options": [
        "100 Mb/s (Fast Ethernet) and 10 Gb/s (10GbaseT)",
        "10 Mb/s (10baseT) and 1 Gb/s (1000baseT)",
        "1 Gb/s (Gigabit) and 100 Gb/s (100G)",
        "10 Mb/s (Thinnet) and 10 Mb/s (Thicknet)"
      ],
      "answer": "100 Mb/s (Fast Ethernet) and 10 Gb/s (10GbaseT)",
      "explanation": "802.3u specifies 100 Mb/s Fast Ethernet, while 802.3an specifies 10 Gb/s 10GbaseT.",
      "aliases": [
        "100 mb/s and 10 gb/s",
        "100mbps and 10gbps",
        "100 mbps and 10 gbps"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-cables-patch-crossover",
    "moduleId": "patch-vs-crossover-cables",
    "moduleName": "Patch VS Crossover Cables",
    "category": "Cable Construction",
    "primary": {
      "prompt": "Which cable type has the exact same wiring standard (such as 568B on both ends) and connects dissimilar devices like a PC to a Switch?",
      "options": [
        "Patch Cable",
        "Crossover Cable",
        "Rollover Cable",
        "Loopback Cable"
      ],
      "answer": "Patch Cable",
      "explanation": "A Patch (straight-through) cable uses the same pinout on both ends to connect dissimilar devices.",
      "aliases": [
        "patch",
        "patch cable",
        "straight",
        "straight-through"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "An Ethernet cable terminated with EIA/TIA 568A on one end and EIA/TIA 568B on the opposite end is designated as what type of cable?",
      "options": [
        "Crossover Cable",
        "Patch Cable",
        "Plenum Cable",
        "Shielded Patch Cord"
      ],
      "answer": "Crossover Cable",
      "explanation": "568A on one end and 568B on the other forms a Crossover cable (used for similar devices like PC to PC or Switch to Switch).",
      "aliases": [
        "crossover",
        "crossover cable",
        "cross over"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-cables-stp-utp",
    "moduleId": "patch-vs-crossover-cables",
    "moduleName": "Patch VS Crossover Cables",
    "category": "Cable Shielding",
    "primary": {
      "prompt": "Which twisted pair cable construction includes an extra layer of protective shielding around the wire pairs specifically for industrial environments?",
      "options": [
        "Shielded Twisted Pair (STP)",
        "Unshielded Twisted Pair (UTP)",
        "Plenum Rated PVC (CM)",
        "Single-mode Coaxial"
      ],
      "answer": "Shielded Twisted Pair (STP)",
      "explanation": "STP (Shielded Twisted Pair) adds protective foil shielding to guard against electromagnetic noise in industrial settings.",
      "aliases": [
        "stp",
        "shielded twisted pair",
        "shielded"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "What is the standard twisted pair cabling type without internal foil shielding that is deployed in ordinary office environments?",
      "options": [
        "Unshielded Twisted Pair (UTP)",
        "Shielded Twisted Pair (STP)",
        "Armored Fiber Ribbon",
        "Thicknet 10base5"
      ],
      "answer": "Unshielded Twisted Pair (UTP)",
      "explanation": "UTP is unshielded twisted pair used in standard non-industrial installations.",
      "aliases": [
        "utp",
        "unshielded twisted pair",
        "unshielded"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-cables-auto-mdix",
    "moduleId": "patch-vs-crossover-cables",
    "moduleName": "Patch vs Crossover Cables",
    "category": "Cable Standards",
    "primary": {
      "prompt": "What is the primary function of Auto-MDIX (Automatic Medium-Dependent Interface Crossover) on modern network switch ports?",
      "options": [
        "Automatically detects cable pinout and configures transmit/receive pairs to work with straight-through or crossover cables",
        "Automatically converts analog voice signals into digital packets",
        "Monitors continuity on all 8 conductor pins and repairs broken wires",
        "Increases cable bandwidth from 100 Mb/s to 10 Gb/s automatically"
      ],
      "answer": "Automatically detects cable pinout and configures transmit/receive pairs to work with straight-through or crossover cables",
      "explanation": "Auto-MDIX senses whether a connected cable is straight-through or crossover and configures the port internally.",
      "aliases": [
        "auto-mdix",
        "auto mdix",
        "automatically configures transmit/receive pairs"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which network switch feature eliminates the requirement for dedicated crossover cables by automatically sensing and adjusting transmit/receive pin pairs?",
      "options": [
        "Auto-MDIX",
        "PoE (Power over Ethernet)",
        "STP (Spanning Tree Protocol)",
        "VLAN Trunking"
      ],
      "answer": "Auto-MDIX",
      "explanation": "Auto-MDIX allows standard patch cables to connect any two devices regardless of device type.",
      "aliases": [
        "auto-mdix",
        "auto mdix",
        "automdix"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-cables-device-rules",
    "moduleId": "patch-vs-crossover-cables",
    "moduleName": "Patch vs Crossover Cables",
    "category": "Cable Standards",
    "primary": {
      "prompt": "Which cable type is traditionally required when connecting two similar devices directly without Auto-MDIX, such as PC to PC or Switch to Switch?",
      "options": [
        "Crossover Cable",
        "Patch Cable (Straight-Through)",
        "Rollover Cable",
        "Loopback Cable"
      ],
      "answer": "Crossover Cable",
      "explanation": "Connecting like devices directly (PC-to-PC, switch-to-switch, router-to-router) without Auto-MDIX requires a crossover cable.",
      "aliases": [
        "crossover",
        "crossover cable"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "When connecting two like devices together (e.g., router-to-router or switch-to-switch without Auto-MDIX), which cable pinout must be used?",
      "options": [
        "Crossover Cable",
        "Patch Cable",
        "Coaxial Drop Cable",
        "Null Modem Cable"
      ],
      "answer": "Crossover Cable",
      "explanation": "A crossover cable crosses the transmit and receive pairs so like devices can communicate directly.",
      "aliases": [
        "crossover",
        "crossover cable"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ratings-plenum",
    "moduleId": "cable-ratings",
    "moduleName": "Cable Ratings",
    "category": "Fire Safety Standards",
    "primary": {
      "prompt": "Which cable fire rating is legally required when running cables through HVAC return air plenums and drop ceilings?",
      "options": [
        "CMP (Plenum)",
        "CMR (Riser)",
        "CM (General Use)",
        "PVC General"
      ],
      "answer": "CMP (Plenum)",
      "explanation": "CMP (Communications Plenum) cables emit minimal toxic smoke and are fire-resistant for air-handling spaces.",
      "aliases": [
        "cmp",
        "cmp (plenum)",
        "plenum",
        "cmp plenum"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Why must CMP (Plenum) rated cabling be installed in drop ceilings that serve as building air-handling spaces?",
      "options": [
        "It releases low amounts of toxic smoke when burned, preventing fumes spreading through HVAC ducts",
        "It provides double the network throughput of standard CM cables",
        "It contains heavy lead shielding to block Wi-Fi signals",
        "It is the only cable rating that supports RJ45 connectors"
      ],
      "answer": "It releases low amounts of toxic smoke when burned, preventing fumes spreading through HVAC ducts",
      "explanation": "CMP prevents dangerous smoke and toxic gas distribution via HVAC air returns.",
      "aliases": [
        "low toxic smoke",
        "toxic smoke",
        "plenum safety"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-ratings-riser-hierarchy",
    "moduleId": "cable-ratings",
    "moduleName": "Cable Ratings",
    "category": "Substitution Hierarchy",
    "primary": {
      "prompt": "Which cable rating is designed for vertical shafts between building floors to prevent fire from climbing floor to floor?",
      "options": [
        "CMR (Riser)",
        "CMP (Plenum)",
        "CM (General Use)",
        "UTP Standard"
      ],
      "answer": "CMR (Riser)",
      "explanation": "CMR (Communications Riser) is rated for vertical shafts to stop fire climbing between floors.",
      "aliases": [
        "cmr",
        "cmr (riser)",
        "riser",
        "cmr riser"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "According to the National Electrical Code substitution hierarchy, which statement regarding cable replacement is true?",
      "options": [
        "CMP can substitute for CMR and CM; CMR can substitute for CM",
        "CM can substitute for CMP and CMR anywhere",
        "CMR can substitute for CMP in plenum spaces",
        "No cable ratings may be substituted for one another"
      ],
      "answer": "CMP can substitute for CMR and CM; CMR can substitute for CM",
      "explanation": "CMP outranks CMR and CM; CMR outranks CM; CM cannot substitute for either.",
      "aliases": [
        "cmp can substitute for cmr and cm",
        "cmp outranks all"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-ratings-substitution-hierarchy",
    "moduleId": "cable-ratings",
    "moduleName": "Cable Fire Ratings",
    "category": "Safety Codes",
    "primary": {
      "prompt": "Which statement accurately describes the cable fire rating substitution hierarchy?",
      "options": [
        "CMP can substitute for CMR and CM; CMR can substitute for CM; CM cannot substitute for either",
        "CM can substitute for both CMR and CMP",
        "CMR can substitute for CMP, but CMP cannot substitute for CMR",
        "All cable ratings are fully interchangeable in any installation"
      ],
      "answer": "CMP can substitute for CMR and CM; CMR can substitute for CM; CM cannot substitute for either",
      "explanation": "Higher fire-resistant ratings can substitute downwards: CMP (Plenum) > CMR (Riser) > CM (General Use).",
      "aliases": [
        "cmp > cmr > cm",
        "cmp can substitute for cmr and cm"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Under standard building codes, which cable rating can legally be used to substitute for both CMR and CM cables?",
      "options": [
        "CMP (Plenum)",
        "CMR (Riser)",
        "CM (General Use)",
        "Coaxial RG-6"
      ],
      "answer": "CMP (Plenum)",
      "explanation": "CMP has the highest fire and smoke rating, allowing it to substitute downwards for CMR and CM.",
      "aliases": [
        "cmp",
        "cmp (plenum)",
        "plenum",
        "cmp cable"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ratings-cm-general",
    "moduleId": "cable-ratings",
    "moduleName": "Cable Fire Ratings",
    "category": "Safety Codes",
    "primary": {
      "prompt": "Why are standard CM (General Use) cables strictly prohibited from installation inside HVAC return air plenums and vertical risers?",
      "options": [
        "CM cables emit dense toxic smoke when burned and do not meet flame-retardant requirements for vertical shafts or air ducts",
        "CM cables do not support Fast Ethernet or Gigabit Ethernet speeds",
        "CM cables cause severe electrical shorts when touching metal building studs",
        "CM cables only operate with BNC connectors"
      ],
      "answer": "CM cables emit dense toxic smoke when burned and do not meet flame-retardant requirements for vertical shafts or air ducts",
      "explanation": "Standard CM cabling generates heavy toxic smoke and flammable fumes when ignited, making it illegal for plenum and riser spaces.",
      "aliases": [
        "toxic smoke",
        "dense toxic smoke",
        "smoke hazard"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which cable type is restricted to horizontal single-room runs and prohibited in building air-handling plenums and vertical shafts?",
      "options": [
        "CM (General Use)",
        "CMP (Plenum)",
        "CMR (Riser)",
        "Armored fiber"
      ],
      "answer": "CM (General Use)",
      "explanation": "CM (General Use) cable is only permitted for basic workstation patch runs and standard horizontal drops.",
      "aliases": [
        "cm",
        "cm (general use)",
        "general use",
        "cm general use"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-threats-definitions",
    "moduleId": "esd-emi-emp",
    "moduleName": "ESD, EMI, & EMP",
    "category": "Threat Definitions",
    "primary": {
      "prompt": "Which environmental threat represents a static electricity discharge that can damage or destroy sensitive electronic components upon physical contact?",
      "options": [
        "ESD",
        "EMI",
        "EMP",
        "RFI"
      ],
      "answer": "ESD",
      "explanation": "ESD (Electrostatic Discharge) is a static electricity spark that damages silicon chips.",
      "aliases": [
        "esd",
        "electrostatic discharge"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "A technician walks across a carpeted floor and feels a static zap when touching a computer motherboard. What occurred?",
      "options": [
        "ESD",
        "EMP",
        "EMI",
        "APIPA"
      ],
      "answer": "ESD",
      "explanation": "Static electricity transfer is Electrostatic Discharge (ESD).",
      "aliases": [
        "esd",
        "electrostatic discharge"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-threats-emi-emp",
    "moduleId": "esd-emi-emp",
    "moduleName": "ESD, EMI, & EMP",
    "category": "Interference & Pulses",
    "primary": {
      "prompt": "Temporary wireless disruptions caused by electrical motors, storms, or power lines represent which threat?",
      "options": [
        "EMI",
        "ESD",
        "EMP",
        "NAT"
      ],
      "answer": "EMI",
      "explanation": "EMI (Electromagnetic Interference) causes temporary noise and signal disruptions from motors, power lines, and storms.",
      "aliases": [
        "emi",
        "electromagnetic interference"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "A direct lightning strike or nuclear detonation produces a destructive, high-energy burst of electromagnetic radiation known as what?",
      "options": [
        "EMP",
        "EMI",
        "ESD",
        "TKIP"
      ],
      "answer": "EMP",
      "explanation": "EMP (Electromagnetic Pulse) is a destructive burst from lightning (localized) or nuclear blasts (wide area).",
      "aliases": [
        "emp",
        "electromagnetic pulse"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-threats-prevention-methods",
    "moduleId": "esd-emi-emp",
    "moduleName": "ESD, EMI, and EMP",
    "category": "Physical Threats",
    "primary": {
      "prompt": "What protective equipment is used by technicians to prevent ESD damage when handling delicate internal computer components?",
      "options": [
        "Anti-static wrist strap and ESD mat",
        "Faraday cage and lead shield",
        "Surge suppressor and UPS battery",
        "STP cabling and shielded patch panel"
      ],
      "answer": "Anti-static wrist strap and ESD mat",
      "explanation": "Anti-static wrist straps and ESD grounding mats safely dissipate static electricity before it damages sensitive silicon chips.",
      "aliases": [
        "anti-static wrist strap",
        "esd wrist strap",
        "anti-static strap",
        "esd strap and mat",
        "esd wrist strap and mat"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which preventative tools safely ground technicians and dissipate static charges before touching sensitive circuit boards and RAM modules?",
      "options": [
        "Anti-static wrist strap and ESD mat",
        "Uninterruptible Power Supply (UPS)",
        "Loopback adapter and multimeter",
        "Toner probe and butt set"
      ],
      "answer": "Anti-static wrist strap and ESD mat",
      "explanation": "Technicians wear an anti-static wrist strap connected to ground to equalize static potential.",
      "aliases": [
        "anti-static wrist strap",
        "esd wrist strap",
        "anti-static strap",
        "esd strap and mat",
        "esd wrist strap and mat"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-threats-shielding-fiber",
    "moduleId": "esd-emi-emp",
    "moduleName": "ESD, EMI, and EMP",
    "category": "Physical Threats",
    "primary": {
      "prompt": "What cabling technologies provide the best protection against severe Electromagnetic Interference (EMI) in industrial environments?",
      "options": [
        "Shielded Twisted Pair (STP) and Fiber Optic cabling",
        "Unshielded Twisted Pair (UTP) Cat5e",
        "Unshielded flat ribbon cable",
        "Standard copper jumper wire"
      ],
      "answer": "Shielded Twisted Pair (STP) and Fiber Optic cabling",
      "explanation": "STP uses foil/braided shielding against EMI, while fiber optics uses light pulses completely immune to electromagnetic interference.",
      "aliases": [
        "stp and fiber",
        "stp and fiber optic",
        "shielded twisted pair and fiber"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "To completely eliminate the risk of Electromagnetic Interference (EMI) across long cable runs near high-voltage motors, which cabling medium is recommended?",
      "options": [
        "Fiber optic cabling",
        "Unshielded Twisted Pair (UTP)",
        "Thinnet coaxial cable",
        "Standard Cat6 patch cable"
      ],
      "answer": "Fiber optic cabling",
      "explanation": "Fiber optic cabling uses photons of light rather than electrical currents, making it 100% immune to EMI.",
      "aliases": [
        "fiber",
        "fiber optic",
        "fiber optics",
        "fiber optic cabling"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-wifi-bands",
    "moduleId": "wireless-802-11",
    "moduleName": "Wireless 802.11",
    "category": "Frequency Bands",
    "primary": {
      "prompt": "Which wireless frequency band provides longer physical range but has fewer non-overlapping channels (channels 1, 6, and 11)?",
      "options": [
        "2.4 GHz",
        "5 GHz",
        "60 GHz",
        "900 MHz"
      ],
      "answer": "2.4 GHz",
      "explanation": "The 2.4 GHz band provides greater range through obstacles but has only 3 non-overlapping 20MHz channels (1, 6, 11).",
      "aliases": [
        "2.4 ghz",
        "2.4ghz",
        "2.4"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Compared to 2.4 GHz, what are the primary performance characteristics of the 5 GHz Wi-Fi frequency band?",
      "options": [
        "Higher throughput and more non-overlapping channels (24), but shorter range",
        "Lower speeds and only 3 non-overlapping channels, but longer range",
        "Identical speeds, identical channels, and longer range",
        "Requires coaxial cabling to connect to mobile devices"
      ],
      "answer": "Higher throughput and more non-overlapping channels (24), but shorter range",
      "explanation": "5 GHz offers higher speeds and 24 non-overlapping channels at the cost of shorter transmission distance.",
      "aliases": [
        "higher speed shorter range",
        "higher throughput"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-wifi-security-standards",
    "moduleId": "wireless-802-11",
    "moduleName": "Wireless 802.11",
    "category": "Wireless Security",
    "primary": {
      "prompt": "Which wireless encryption standard is considered modern best practice, utilizing robust AES ciphers, alongside the newer WPA3 standard?",
      "options": [
        "WPA2",
        "WEP",
        "WPA",
        "WPS"
      ],
      "answer": "WPA2",
      "explanation": "WPA2 (using AES) and WPA3 are the secure standards; WEP, WPA (TKIP), and WPS are deprecated/insecure.",
      "aliases": [
        "wpa2",
        "wpa-2"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Why should WEP (Wired Equivalent Privacy) and WPS (Wi-Fi Protected Setup) never be enabled on an enterprise router?",
      "options": [
        "Both have severe cryptographic vulnerabilities allowing rapid cracking and brute-force penetration",
        "They only function over 5 GHz channels",
        "They require proprietary token rings",
        "They convert full duplex connections to simplex"
      ],
      "answer": "Both have severe cryptographic vulnerabilities allowing rapid cracking and brute-force penetration",
      "explanation": "WEP has broken IVs and WPS has a split-PIN brute-force vulnerability.",
      "aliases": [
        "cryptographic vulnerabilities",
        "insecure",
        "easily cracked"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-wifi-24-channels",
    "moduleId": "wireless-802-11",
    "moduleName": "Wireless 802.11",
    "category": "Channels & Overlap",
    "primary": {
      "prompt": "In North America, how many total channels exist in the 2.4 GHz Wi-Fi spectrum, and which three channels do not overlap?",
      "options": [
        "11 total channels; Channels 1, 6, and 11 do not overlap",
        "14 total channels; Channels 1, 7, and 14 do not overlap",
        "25 total channels; Channels 1, 6, and 11 do not overlap",
        "3 total channels; all channels overlap"
      ],
      "answer": "11 total channels; Channels 1, 6, and 11 do not overlap",
      "explanation": "The 2.4 GHz band in North America has 11 channels, with channels 1, 6, and 11 being the only non-overlapping channels.",
      "aliases": [
        "11 total channels; channels 1, 6, and 11 do not overlap",
        "1, 6, 11",
        "channels 1, 6, and 11",
        "1, 6, and 11"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which three 2.4 GHz Wi-Fi channels are non-overlapping and recommended for multi-AP wireless deployments?",
      "options": [
        "Channels 1, 6, and 11",
        "Channels 1, 2, and 3",
        "Channels 2, 7, and 11",
        "Channels 6, 8, and 11"
      ],
      "answer": "Channels 1, 6, and 11",
      "explanation": "Channels 1, 6, and 11 have 25 MHz channel separation, preventing co-channel RF interference.",
      "aliases": [
        "channels 1, 6, and 11",
        "1, 6, 11",
        "1, 6, and 11",
        "ch 1, 6, 11"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-wifi-5ghz-channels",
    "moduleId": "wireless-802-11",
    "moduleName": "Wireless 802.11",
    "category": "Channels & Overlap",
    "primary": {
      "prompt": "How many non-overlapping 20 MHz channels are available in the 5 GHz Wi-Fi frequency band?",
      "options": [
        "25 non-overlapping channels",
        "3 non-overlapping channels",
        "11 non-overlapping channels",
        "14 non-overlapping channels"
      ],
      "answer": "25 non-overlapping channels",
      "explanation": "The 5 GHz frequency band offers 25 non-overlapping 20 MHz channels, vastly reducing interference compared to 2.4 GHz.",
      "aliases": [
        "25",
        "25 channels",
        "25 non-overlapping channels"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "The 5 GHz wireless frequency spectrum provides how many non-overlapping channels for enterprise Wi-Fi networks?",
      "options": [
        "25 channels",
        "11 channels",
        "3 channels",
        "8 channels"
      ],
      "answer": "25 channels",
      "explanation": "5 GHz provides 25 non-overlapping channels in the standard regulatory domain.",
      "aliases": [
        "25",
        "25 channels"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-wifi-wps-risks",
    "moduleId": "wireless-802-11",
    "moduleName": "Wireless 802.11",
    "category": "Security & Encryption",
    "primary": {
      "prompt": "What major security assessment is associated with WPS (Wi-Fi Protected Setup) on wireless routers?",
      "options": [
        "Easy to set up, but very insecure and vulnerable to PIN brute-force attacks",
        "Approved by the US Department of Defense for classified data",
        "Extremely secure because it utilizes 256-bit asymmetric elliptic curves",
        "Incompatible with all modern 802.11ac and 802.11ax devices"
      ],
      "answer": "Easy to set up, but very insecure and vulnerable to PIN brute-force attacks",
      "explanation": "WPS was designed for easy push-button/PIN configuration, but is inherently insecure and should be disabled.",
      "aliases": [
        "easy to set up, but very insecure",
        "insecure",
        "vulnerable to brute force"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Why is Wi-Fi Protected Setup (WPS) widely considered insecure and recommended to be disabled on enterprise access points?",
      "options": [
        "Its 8-digit PIN design is vulnerable to rapid offline and online brute-force cracking",
        "It consumes over 80% of total access point transmission power",
        "It prevents devices from using AES encryption",
        "It forces access points to downgrade to 802.11b speeds"
      ],
      "answer": "Its 8-digit PIN design is vulnerable to rapid offline and online brute-force cracking",
      "explanation": "WPS PIN architecture is flawed and can be brute-forced in hours, bypassing strong WPA2 passphrases.",
      "aliases": [
        "vulnerable to brute force",
        "pin brute force",
        "insecure"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-wifi-interference-sources",
    "moduleId": "wireless-802-11",
    "moduleName": "Wireless 802.11",
    "category": "Interference & Speed",
    "primary": {
      "prompt": "Why does the 2.4 GHz Wi-Fi band experience significantly more wireless interference than the 5 GHz band?",
      "options": [
        "The 2.4 GHz ISM band is shared by many consumer devices including microwave ovens, Bluetooth devices, and cordless phones",
        "2.4 GHz signals reflect off atmospheric ozone layers",
        "2.4 GHz operates exclusively at half-duplex while 5 GHz is full-duplex",
        "2.4 GHz channels are wider than 5 GHz channels"
      ],
      "answer": "The 2.4 GHz ISM band is shared by many consumer devices including microwave ovens, Bluetooth devices, and cordless phones",
      "explanation": "2.4 GHz is an unlicensed band heavily congested by microwaves, Bluetooth peripherals, and baby monitors.",
      "aliases": [
        "shared by many consumer devices",
        "microwaves bluetooth cordless phones",
        "crowded band"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which common household and office devices share the 2.4 GHz ISM band and frequently cause RF interference with Wi-Fi?",
      "options": [
        "Microwave ovens, Bluetooth peripherals, and cordless landline phones",
        "Laser printers and wired optical mice",
        "Fiber optic media converters and patch panels",
        "FM radios and terrestrial television antennas"
      ],
      "answer": "Microwave ovens, Bluetooth peripherals, and cordless landline phones",
      "explanation": "Microwave ovens, Bluetooth devices, and cordless phones all emit RF energy in the 2.4 GHz spectrum.",
      "aliases": [
        "microwaves bluetooth cordless phones",
        "microwave ovens and bluetooth",
        "microwaves and bluetooth"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-80211-ac-ax",
    "moduleId": "802.11-wireless-standards",
    "moduleName": "Wireless Wi-Fi Standards",
    "category": "Wi-Fi Generations",
    "primary": {
      "prompt": "Which IEEE wireless standard is marketed as Wi-Fi 5 and operates exclusively on the 5 GHz frequency band?",
      "options": [
        "802.11ac",
        "802.11n",
        "802.11ax",
        "802.11g"
      ],
      "answer": "802.11ac",
      "explanation": "802.11ac (Wi-Fi 5) operates exclusively on 5 GHz and delivers gigabit wireless speeds.",
      "aliases": [
        "802.11ac",
        "ac",
        "wifi 5",
        "wi-fi 5"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "What is the commercial name and operating frequencies for the IEEE 802.11ax wireless standard?",
      "options": [
        "Wi-Fi 6 (2.4 GHz + 5 GHz)",
        "Wi-Fi 5 (5 GHz only)",
        "Wi-Fi 4 (2.4 GHz only)",
        "Wi-Fi 3 (5 GHz only)"
      ],
      "answer": "Wi-Fi 6 (2.4 GHz + 5 GHz)",
      "explanation": "802.11ax is Wi-Fi 6 and operates on both 2.4 GHz and 5 GHz (up to 14 Gb/s).",
      "aliases": [
        "wifi 6",
        "wi-fi 6",
        "802.11ax"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-80211-wifi4-n",
    "moduleId": "802.11-wireless-standards",
    "moduleName": "Wireless Wi-Fi Standards",
    "category": "Generations & Speeds",
    "primary": {
      "prompt": "Which IEEE wireless standard was the first to introduce dual-band 2.4 GHz and 5 GHz support with speeds up to 600 Mb/s?",
      "options": [
        "802.11n (Wi-Fi 4)",
        "802.11g (Wi-Fi 3)",
        "802.11a (Wi-Fi 2)",
        "802.11b (Wi-Fi 1)"
      ],
      "answer": "802.11n (Wi-Fi 4)",
      "explanation": "802.11n (Wi-Fi 4) introduced simultaneous dual-band 2.4 GHz/5 GHz operation and speeds up to 600 Mb/s.",
      "aliases": [
        "802.11n",
        "wifi 4",
        "wi-fi 4",
        "802.11n (wi-fi 4)"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "IEEE 802.11n (marketed as Wi-Fi 4) introduced support for which frequency bands and maximum theoretical throughput?",
      "options": [
        "2.4 GHz + 5 GHz dual-band up to 600 Mb/s",
        "5 GHz only up to 1 Gb/s",
        "2.4 GHz only up to 54 Mb/s",
        "60 GHz up to 7 Gb/s"
      ],
      "answer": "2.4 GHz + 5 GHz dual-band up to 600 Mb/s",
      "explanation": "802.11n operates across both 2.4 GHz and 5 GHz bands with a maximum speed of 600 Mb/s.",
      "aliases": [
        "2.4 ghz + 5 ghz up to 600 mb/s",
        "2.4 ghz and 5 ghz 600 mb/s",
        "2.4 ghz + 5 ghz, 600 mb/s"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-80211-wifi-generations",
    "moduleId": "802.11-wireless-standards",
    "moduleName": "Wireless Wi-Fi Standards",
    "category": "Generations & Speeds",
    "primary": {
      "prompt": "Which IEEE standard is branded as Wi-Fi 3 and provides 54 Mb/s throughput on the 2.4 GHz frequency band?",
      "options": [
        "802.11g (Wi-Fi 3)",
        "802.11a (Wi-Fi 2)",
        "802.11b (Wi-Fi 1)",
        "802.11n (Wi-Fi 4)"
      ],
      "answer": "802.11g (Wi-Fi 3)",
      "explanation": "802.11g is Wi-Fi 3, providing 54 Mb/s in the 2.4 GHz frequency band.",
      "aliases": [
        "802.11g",
        "wi-fi 3",
        "wifi 3",
        "802.11g (wi-fi 3)"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "IEEE 802.11g operates at what maximum speed and frequency band?",
      "options": [
        "54 Mb/s at 2.4 GHz",
        "54 Mb/s at 5 GHz",
        "11 Mb/s at 2.4 GHz",
        "600 Mb/s at 2.4 GHz + 5 GHz"
      ],
      "answer": "54 Mb/s at 2.4 GHz",
      "explanation": "802.11g delivers up to 54 Mb/s throughput on 2.4 GHz.",
      "aliases": [
        "54 mb/s at 2.4 ghz",
        "54 mbps 2.4 ghz",
        "54 mb/s, 2.4 ghz"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-contention-cd-ca",
    "moduleId": "wired-vs-wireless",
    "moduleName": "Wired VS Wireless",
    "category": "Contention Methods",
    "primary": {
      "prompt": "What contention methods are used in traditional Wired Ethernet and Wireless 802.11 networks respectively?",
      "options": [
        "Wired: CSMA/CD; Wireless: CSMA/CA",
        "Wired: CSMA/CA; Wireless: CSMA/CD",
        "Wired: Token Passing; Wireless: Polling",
        "Wired: Full Duplex Only; Wireless: Simplex"
      ],
      "answer": "Wired: CSMA/CD; Wireless: CSMA/CA",
      "explanation": "Wired Ethernet uses CSMA/CD (Collision Detection); Wireless uses CSMA/CA (Collision Avoidance).",
      "aliases": [
        "csma/cd and csma/ca",
        "csma/cd for wired, csma/ca for wireless"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Why are wireless transceivers unable to use Collision Detection (CSMA/CD) like wired cables?",
      "options": [
        "A station's own radio transmission overpowers its receiver, making local collision detection during transmission impossible",
        "Radio frequencies travel faster than electrical signals in copper",
        "Wireless access points operate in simplex mode only",
        "IEEE standards legally prohibit collision detection algorithms on radio bands"
      ],
      "answer": "A station's own radio transmission overpowers its receiver, making local collision detection during transmission impossible",
      "explanation": "Transmitting RF energy drowns out incoming signals at the antenna, requiring collision avoidance (CSMA/CA).",
      "aliases": [
        "radio overpowering receiver",
        "cannot detect while transmitting"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-contention-acronyms",
    "moduleId": "wired-vs-wireless",
    "moduleName": "Wired vs Wireless",
    "category": "Traffic Control",
    "primary": {
      "prompt": "In network contention protocols, what do the acronyms 'CD' and 'CA' represent?",
      "options": [
        "Collision Detection (CD) and Collision Avoidance (CA)",
        "Carrier Detection (CD) and Carrier Allocation (CA)",
        "Cable Distribution (CD) and Channel Allocation (CA)",
        "Contention Domain (CD) and Contention Access (CA)"
      ],
      "answer": "Collision Detection (CD) and Collision Avoidance (CA)",
      "explanation": "CD stands for Collision Detection (used in CSMA/CD wired Ethernet), and CA stands for Collision Avoidance (used in CSMA/CA wireless).",
      "aliases": [
        "collision detection and collision avoidance",
        "collision detection, collision avoidance"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "In CSMA/CD and CSMA/CA traffic management methods, what do the abbreviations CD and CA stand for?",
      "options": [
        "Collision Detection and Collision Avoidance",
        "Channel Division and Channel Access",
        "Circuit Delivery and Circuit Authentication",
        "Connection Dedicated and Connection Asynchronous"
      ],
      "answer": "Collision Detection and Collision Avoidance",
      "explanation": "CSMA/CD = Carrier Sense Multiple Access with Collision Detection; CSMA/CA = Carrier Sense Multiple Access with Collision Avoidance.",
      "aliases": [
        "collision detection and collision avoidance",
        "collision detection, collision avoidance"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-contention-why-wireless-ca",
    "moduleId": "wired-vs-wireless",
    "moduleName": "Wired vs Wireless",
    "category": "Traffic Control",
    "primary": {
      "prompt": "Why are wireless networks unable to use Collision Detection (CSMA/CD) and forced to use Collision Avoidance (CSMA/CA) instead?",
      "options": [
        "Wireless radios cannot transmit and receive on the same frequency simultaneously to detect collisions during transmission",
        "Wireless antennas do not support binary framing",
        "Wireless signals travel too fast for collision detection algorithms",
        "Collision Detection is legally restricted to coaxial cables"
      ],
      "answer": "Wireless radios cannot transmit and receive on the same frequency simultaneously to detect collisions during transmission",
      "explanation": "Transmitting radios drown out incoming signals on the same frequency (half-duplex RF nature), preventing real-time collision detection.",
      "aliases": [
        "cannot transmit and receive at the same time",
        "half duplex radio",
        "cannot transmit and receive simultaneously"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "What physical transceiver limitation prevents wireless 802.11 Wi-Fi radios from detecting collisions during packet transmission?",
      "options": [
        "Radios cannot listen for collisions while actively transmitting on the same channel",
        "Wireless frames lack destination MAC address fields",
        "RF signals cannot reflect off metal surfaces",
        "Wireless packets are not modulated into analog waves"
      ],
      "answer": "Radios cannot listen for collisions while actively transmitting on the same channel",
      "explanation": "Because the local transmitter overpowers incoming signals, collision avoidance (CSMA/CA) must be used instead.",
      "aliases": [
        "cannot listen while transmitting",
        "cannot transmit and receive simultaneously"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-wan-carriers",
    "moduleId": "wan-technologies",
    "moduleName": "WAN Technologies",
    "category": "Digital Carrier Lines",
    "primary": {
      "prompt": "What is the maximum throughput and number of 64 Kbps channels on a North American T1 carrier line?",
      "options": [
        "1.544 Mbps (24 channels)",
        "2.048 Mbps (32 channels)",
        "44.736 Mbps (672 channels)",
        "128 Kbps (2 channels)"
      ],
      "answer": "1.544 Mbps (24 channels)",
      "explanation": "A T1 line provides 1.544 Mbps throughput across 24 channels of 64 Kbps each.",
      "aliases": [
        "1.544 mbps",
        "1.544 mbps (24 channels)",
        "1.544"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "What is the total maximum throughput of a European E1 digital carrier line comprising 32 individual 64 Kbps channels?",
      "options": [
        "2.048 Mbps",
        "1.544 Mbps",
        "34.368 Mbps",
        "44.736 Mbps"
      ],
      "answer": "2.048 Mbps",
      "explanation": "An E1 line delivers 2.048 Mbps across 32 channels.",
      "aliases": [
        "2.048 mbps",
        "2.048",
        "2.048mbps"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-wan-pots-dialup",
    "moduleId": "wan-technologies",
    "moduleName": "WAN Technologies",
    "category": "Analog Modems & POTS",
    "primary": {
      "prompt": "What does the telecommunications acronym 'POTS' stand for, and what signal type did legacy POTS lines use?",
      "options": [
        "Plain Old Telephone Service; Analog signals",
        "Packet Optical Transmission System; Digital signals",
        "Private Open Telephony Standard; Radio frequency signals",
        "Point of Termination System; Binary pulses"
      ],
      "answer": "Plain Old Telephone Service; Analog signals",
      "explanation": "POTS stands for Plain Old Telephone Service, transmitting analog voice signals over copper wire pairs.",
      "aliases": [
        "plain old telephone service and analog signals",
        "plain old telephone service; analog signals"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "What was the typical speed range of traditional dial-up modems operating over POTS lines?",
      "options": [
        "Approximately 300 bps to 54 Kbps",
        "Approximately 64 Kbps to 128 Kbps",
        "Approximately 1.544 Mbps to 44.736 Mbps",
        "Approximately 10 Mb/s to 100 Mb/s"
      ],
      "answer": "Approximately 300 bps to 54 Kbps",
      "explanation": "Dial-up modem speeds ranged from early 300 bps modems up to 54 Kbps (or 56 Kbps standard).",
      "aliases": [
        "300 bps to 54 kbps",
        "300 bps - 54 kbps",
        "300bps to 54kbps"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-wan-bundling-t3-e3",
    "moduleId": "wan-technologies",
    "moduleName": "WAN Technologies",
    "category": "Carrier Bundling & Regions",
    "primary": {
      "prompt": "How many T1 circuits are bundled together to form a North American T3 line, and what is its maximum throughput?",
      "options": [
        "28 T1 lines (672 channels); 44.736 Mbps",
        "16 T1 lines (512 channels); 34.368 Mbps",
        "24 T1 lines (576 channels); 37.056 Mbps",
        "32 T1 lines (768 channels); 49.408 Mbps"
      ],
      "answer": "28 T1 lines (672 channels); 44.736 Mbps",
      "explanation": "A T3 line multiplexes 28 T1 circuits (T1x28) to provide 672 channels and 44.736 Mbps throughput in North America.",
      "aliases": [
        "28 t1 lines; 44.736 mbps",
        "28 t1 lines (672 channels); 44.736 mbps"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "How many E1 circuits are multiplexed to form a European E3 line, and what is its maximum throughput?",
      "options": [
        "16 E1 lines (512 channels); 34.368 Mbps",
        "28 E1 lines (672 channels); 44.736 Mbps",
        "24 E1 lines (768 channels); 49.152 Mbps",
        "32 E1 lines (1024 channels); 65.536 Mbps"
      ],
      "answer": "16 E1 lines (512 channels); 34.368 Mbps",
      "explanation": "An E3 line multiplexes 16 E1 circuits (E1x16) to provide 512 channels and 34.368 Mbps throughput in Europe.",
      "aliases": [
        "16 e1 lines; 34.368 mbps",
        "16 e1 lines (512 channels); 34.368 mbps"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-wan-ds0-isdn",
    "moduleId": "wan-technologies",
    "moduleName": "WAN Technologies",
    "category": "WAN Lines",
    "primary": {
      "prompt": "What is the standard data throughput of a single DS0 channel, and what is the maximum speed of an ISDN BRI line with two B-channels?",
      "options": [
        "64 Kbps per DS0 channel; 128 Kbps for ISDN BRI (2 channels)",
        "56 Kbps per DS0 channel; 1.544 Mbps for ISDN BRI",
        "128 Kbps per DS0 channel; 2.048 Mbps for ISDN BRI",
        "32 Kbps per DS0 channel; 64 Kbps for ISDN BRI"
      ],
      "answer": "64 Kbps per DS0 channel; 128 Kbps for ISDN BRI (2 channels)",
      "explanation": "A single DS0 channel is 64 Kbps. ISDN BRI combines two 64 Kbps B-channels for a total of 128 Kbps.",
      "aliases": [
        "64 kbps and 128 kbps",
        "64kbps and 128kbps",
        "64 kbps per ds0; 128 kbps for isdn"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "A single Digital Signal 0 (DS0) voice channel operates at what speed, and how many channels does basic ISDN combine?",
      "options": [
        "64 Kbps; 2 channels (128 Kbps total)",
        "56 Kbps; 1 channel (56 Kbps total)",
        "1.544 Mbps; 24 channels",
        "2.048 Mbps; 32 channels"
      ],
      "answer": "64 Kbps; 2 channels (128 Kbps total)",
      "explanation": "DS0 operates at 64 Kbps, and ISDN BRI bonds two channels to reach 128 Kbps.",
      "aliases": [
        "64 kbps; 2 channels",
        "64 kbps, 2 channels",
        "64 kbps; 2 channels (128 kbps total)"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-wan-t3-e3-channels",
    "moduleId": "wan-technologies",
    "moduleName": "WAN Technologies",
    "category": "Carrier Multiplexing",
    "primary": {
      "prompt": "How many total 64 Kbps voice channels are contained within a North American T3 line and a European E3 line respectively?",
      "options": [
        "672 channels in a T3 line, 512 channels in an E3 line",
        "24 channels in a T3 line, 32 channels in an E3 line",
        "512 channels in a T3 line, 672 channels in an E3 line",
        "28 channels in a T3 line, 16 channels in an E3 line"
      ],
      "answer": "672 channels in a T3 line, 512 channels in an E3 line",
      "explanation": "A T3 line bundles 28 T1s (28 x 24 = 672 channels); an E3 line bundles 16 E1s (16 x 32 = 512 channels).",
      "aliases": [
        "672 and 512",
        "672 channels in a t3 line, 512 channels in an e3 line",
        "672 t3, 512 e3",
        "672 and 512 channels"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "A North American T3 circuit carries 672 channels (28 T1s), while a European E3 circuit carries how many channels?",
      "options": [
        "512 channels (16 E1s)",
        "672 channels (28 E1s)",
        "32 channels (1 E1)",
        "1024 channels (32 E1s)"
      ],
      "answer": "512 channels (16 E1s)",
      "explanation": "A European E3 circuit multiplexes 16 E1 lines, providing 512 channels (16 x 32).",
      "aliases": [
        "512",
        "512 channels",
        "512 channels (16 e1s)"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-datalink-sublayers",
    "moduleId": "data-link-layer",
    "moduleName": "Data-Link Layer",
    "category": "Layer 2 Sublayers",
    "primary": {
      "prompt": "The Data-Link layer (Layer 2) is divided into which two sublayers?",
      "options": [
        "LLC (Logical Link Control) and MAC (Media Access Control)",
        "Network Interface and Physical Framing",
        "Session Control and Transport Sockets",
        "IP Routing and Subnet Masking"
      ],
      "answer": "LLC (Logical Link Control) and MAC (Media Access Control)",
      "explanation": "Layer 2 consists of LLC (Logical Link Control) on top and MAC (Media Access Control) on the bottom.",
      "aliases": [
        "llc and mac",
        "logical link control and media access control"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which sublayer of Layer 2 acts as the bridge between the hardware MAC sublayer and the Network layer (Layer 3)?",
      "options": [
        "LLC (Logical Link Control)",
        "Physical Layer",
        "Transport Layer",
        "Presentation Layer"
      ],
      "answer": "LLC (Logical Link Control)",
      "explanation": "LLC is the upper Layer 2 sublayer that binds hardware to logical Layer 3 protocols.",
      "aliases": [
        "llc",
        "logical link control"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-datalink-mac-structure",
    "moduleId": "data-link-layer",
    "moduleName": "Data-Link Layer",
    "category": "MAC Addressing",
    "primary": {
      "prompt": "What is the total length of a MAC address in bits and bytes, and what is the first 24-bit half called?",
      "options": [
        "48 bits (6 bytes); OUI (Organizationally Unique Identifier)",
        "32 bits (4 bytes); Network ID",
        "128 bits (16 bytes); Interface Identifier",
        "64 bits (8 bytes); GUID"
      ],
      "answer": "48 bits (6 bytes); OUI (Organizationally Unique Identifier)",
      "explanation": "A MAC address is 48 bits (6 bytes) long; the first 24 bits (3 bytes) are the vendor OUI.",
      "aliases": [
        "48 bits and oui",
        "48 bits, 6 bytes, oui"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which protocol resolves a destination device's Layer 2 MAC address when only its IPv4 address is known?",
      "options": [
        "ARP",
        "DNS",
        "DHCP",
        "NAT"
      ],
      "answer": "ARP",
      "explanation": "ARP resolves IPv4 addresses to hardware MAC addresses on local networks.",
      "aliases": [
        "arp",
        "address resolution protocol"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-datalink-arp",
    "moduleId": "data-link-layer",
    "moduleName": "Data-Link Layer",
    "category": "Protocols",
    "primary": {
      "prompt": "Which protocol resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment?",
      "options": [
        "ARP (Address Resolution Protocol)",
        "DNS (Domain Name System)",
        "DHCP (Dynamic Host Configuration Protocol)",
        "ICMP (Internet Control Message Protocol)"
      ],
      "answer": "ARP (Address Resolution Protocol)",
      "explanation": "ARP maps a known IP address to a physical MAC address on the local network.",
      "aliases": [
        "arp",
        "address resolution protocol"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "When a host knows the destination IPv4 address but needs the hardware MAC address to construct a Layer 2 frame, what protocol does it use?",
      "options": [
        "ARP (Address Resolution Protocol)",
        "RARP",
        "NAT",
        "BGP"
      ],
      "answer": "ARP (Address Resolution Protocol)",
      "explanation": "ARP broadcasts a request on the local segment to discover the target host's MAC address.",
      "aliases": [
        "arp",
        "address resolution protocol"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-datalink-broadcast-unicast",
    "moduleId": "data-link-layer",
    "moduleName": "Data-Link Layer",
    "category": "Addressing & Delivery",
    "primary": {
      "prompt": "What is the standard Layer 2 Ethernet broadcast MAC address used to deliver frames to all local network devices?",
      "options": [
        "FF:FF:FF:FF:FF:FF",
        "00:00:00:00:00:00",
        "255.255.255.255",
        "FF:00:00:00:00:FF"
      ],
      "answer": "FF:FF:FF:FF:FF:FF",
      "explanation": "The 48-bit all-ones hexadecimal address FF:FF:FF:FF:FF:FF is the Ethernet Layer 2 broadcast address.",
      "aliases": [
        "ff:ff:ff:ff:ff:ff",
        "ffff.ffff.ffff",
        "ff-ff-ff-ff-ff-ff",
        "ffffffffffff"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which 48-bit hexadecimal address is recognized by all network interface cards as the Layer 2 Ethernet broadcast address?",
      "options": [
        "FF:FF:FF:FF:FF:FF",
        "AA:BB:CC:DD:EE:FF",
        "01:00:5E:00:00:01",
        "127.0.0.1"
      ],
      "answer": "FF:FF:FF:FF:FF:FF",
      "explanation": "Every NIC processes frames destined for the broadcast MAC address FF:FF:FF:FF:FF:FF.",
      "aliases": [
        "ff:ff:ff:ff:ff:ff",
        "ffff.ffff.ffff",
        "ff-ff-ff-ff-ff-ff",
        "ffffffffffff"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-datalink-mac-formats",
    "moduleId": "data-link-layer",
    "moduleName": "Data-Link Layer",
    "category": "Addressing & Delivery",
    "primary": {
      "prompt": "How is a 48-bit MAC address typically formatted in Cisco networking notation versus standard IEEE colon-separated notation?",
      "options": [
        "Three groups of four hex digits with dots (e.g., 0014.2201.2345) in Cisco notation; six pairs of hex digits with colons (e.g., 00:14:22:01:23:45) in IEEE notation",
        "Four groups of three hex digits with dashes in Cisco notation",
        "Eight groups of two hex digits with colons in Cisco notation",
        "Single continuous 12-digit string without delimiters in Cisco notation"
      ],
      "answer": "Three groups of four hex digits with dots (e.g., 0014.2201.2345) in Cisco notation; six pairs of hex digits with colons (e.g., 00:14:22:01:23:45) in IEEE notation",
      "explanation": "Cisco uses xxxx.xxxx.xxxx dotted format, whereas IEEE uses xx:xx:xx:xx:xx:xx colon format.",
      "aliases": [
        "cisco dotted format",
        "xxxx.xxxx.xxxx"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Cisco equipment represents 48-bit MAC addresses using which delimiter format?",
      "options": [
        "Three groups of 4 hexadecimal characters separated by periods (e.g., 0014.2201.2345)",
        "Six groups of 2 hexadecimal characters separated by colons",
        "Six groups of 2 hexadecimal characters separated by hyphens",
        "Four groups of 3 decimal numbers separated by dots"
      ],
      "answer": "Three groups of 4 hexadecimal characters separated by periods (e.g., 0014.2201.2345)",
      "explanation": "Cisco IOS formats MAC addresses as 0014.2201.2345.",
      "aliases": [
        "three groups of 4 hex digits with dots",
        "xxxx.xxxx.xxxx",
        "dotted hex"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-hex-base",
    "moduleId": "hexadecimal",
    "moduleName": "Hexadecimal",
    "category": "Number Systems",
    "primary": {
      "prompt": "What base number system is Hexadecimal, and what character represents the decimal value 15?",
      "options": [
        "Base 16; F",
        "Base 10; 9",
        "Base 8; 7",
        "Base 16; E"
      ],
      "answer": "Base 16; F",
      "explanation": "Hexadecimal is Base 16 (0-9, A-F); F represents 15.",
      "aliases": [
        "base 16 and f",
        "base 16, f"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "How many binary bits are represented by a single hexadecimal character?",
      "options": [
        "4 bits (1 nibble)",
        "8 bits (1 byte)",
        "2 bits",
        "16 bits"
      ],
      "answer": "4 bits (1 nibble)",
      "explanation": "One hexadecimal digit represents exactly 4 bits (a nibble). Two hex digits represent one 8-bit byte.",
      "aliases": [
        "4 bits",
        "4",
        "4 bit",
        "one nibble",
        "1 nibble"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-hex-byte-nibble",
    "moduleId": "hexadecimal",
    "moduleName": "Hexadecimal System",
    "category": "Hex Values",
    "primary": {
      "prompt": "How many binary bits are represented by a single hexadecimal digit, and how many hex digits make up an 8-bit byte?",
      "options": [
        "4 bits per hex digit (1 nibble); 2 hex digits make up 1 byte",
        "8 bits per hex digit; 1 hex digit makes up 1 byte",
        "2 bits per hex digit; 4 hex digits make up 1 byte",
        "16 bits per hex digit; 2 hex digits make up 1 byte"
      ],
      "answer": "4 bits per hex digit (1 nibble); 2 hex digits make up 1 byte",
      "explanation": "Each hex digit represents 4 binary bits (one nibble). Two hex digits represent 8 bits (one byte), ranging from 0x00 (0) to 0xFF (255).",
      "aliases": [
        "4 bits and 2 hex digits",
        "4 bits, 2 hex digits",
        "4 bits per digit, 2 digits per byte"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Converting a single 8-bit byte (such as 11111111) into hexadecimal produces how many hex characters?",
      "options": [
        "2 hex characters (e.g., FF)",
        "1 hex character (e.g., F)",
        "4 hex characters (e.g., FFFF)",
        "8 hex characters (e.g., 11111111)"
      ],
      "answer": "2 hex characters (e.g., FF)",
      "explanation": "An 8-bit byte maps to 2 hexadecimal characters, where each character accounts for 4 bits.",
      "aliases": [
        "2",
        "two",
        "2 hex characters",
        "2 hex digits",
        "2 characters"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-switches-cam-table",
    "moduleId": "layer-2-switches",
    "moduleName": "Layer 2 Switches",
    "category": "Switch Operation",
    "primary": {
      "prompt": "What table does a Layer 2 switch build and maintain to map physical switch ports to device hardware addresses?",
      "options": [
        "MAC / CAM table",
        "Routing table",
        "ARP cache",
        "DNS host table"
      ],
      "answer": "MAC / CAM table",
      "explanation": "A switch uses a MAC address table (also called a CAM table) to map physical ports to learned MAC addresses.",
      "aliases": [
        "mac table",
        "cam table",
        "mac/cam table",
        "cam"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "When a Layer 2 switch receives a frame destined for an unknown MAC address not in its CAM table, what action does it take?",
      "options": [
        "Broadcasts (floods) the frame out all ports except the receiving port",
        "Drops the frame immediately and sends an error",
        "Forwards the frame exclusively to the default gateway router",
        "Broadcasts the frame out all ports including the ingress port"
      ],
      "answer": "Broadcasts (floods) the frame out all ports except the receiving port",
      "explanation": "When a destination MAC is unlearned, the switch floods the frame out all other ports.",
      "aliases": [
        "floods",
        "broadcasts to all ports except source"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-switches-mac-learning",
    "moduleId": "layer-2-switches",
    "moduleName": "Layer 2 Switches",
    "category": "Switch Operation",
    "primary": {
      "prompt": "How does a Layer 2 switch dynamically populate and learn entries for its CAM/MAC address table?",
      "options": [
        "By inspecting the Source MAC address of incoming frames on each physical port",
        "By inspecting the Destination MAC address of outgoing frames",
        "By querying the local default gateway router via ARP",
        "By broadcasting DHCP discovery probes across all ports"
      ],
      "answer": "By inspecting the Source MAC address of incoming frames on each physical port",
      "explanation": "Switches dynamically learn MAC addresses by reading the Source MAC address of every ingress frame received on a port.",
      "aliases": [
        "source mac address",
        "source mac",
        "inspecting source mac",
        "from source mac"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "A Layer 2 switch inspects which header field of incoming Ethernet frames to learn which port a device is connected to?",
      "options": [
        "Source MAC address",
        "Destination MAC address",
        "Source IP address",
        "EtherType field"
      ],
      "answer": "Source MAC address",
      "explanation": "The switch records the Source MAC address and the physical ingress port in its CAM table.",
      "aliases": [
        "source mac address",
        "source mac",
        "source physical address"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-switches-domains",
    "moduleId": "layer-2-switches",
    "moduleName": "Layer 2 Switches",
    "category": "Switch Operation",
    "primary": {
      "prompt": "What effect does a standard Layer 2 switch have on collision domains and broadcast domains?",
      "options": [
        "Each switch port is its own separate collision domain; all ports belong to one single broadcast domain",
        "Each switch port is its own separate broadcast domain and collision domain",
        "All switch ports share a single collision domain and single broadcast domain",
        "Switches create multiple broadcast domains but only one collision domain"
      ],
      "answer": "Each switch port is its own separate collision domain; all ports belong to one single broadcast domain",
      "explanation": "Switches break up collision domains per port, but forward broadcast frames to all ports within the same VLAN.",
      "aliases": [
        "each port is a collision domain, one broadcast domain",
        "separate collision domains per port, single broadcast domain"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "How does a standard Layer 2 Ethernet switch segment network collision domains and broadcast domains?",
      "options": [
        "Separates collision domains per port, but maintains a single shared broadcast domain",
        "Separates both collision domains and broadcast domains per port",
        "Merges all collision domains and broadcast domains into one",
        "Does not affect either collision or broadcast domains"
      ],
      "answer": "Separates collision domains per port, but maintains a single shared broadcast domain",
      "explanation": "Each port on a switch isolates collisions, while broadcasts propagate to all ports by default.",
      "aliases": [
        "separates collision domains per port, single broadcast domain",
        "collision domain per port"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-ip-structure",
    "moduleId": "network-layer-ip-addresses",
    "moduleName": "Network Layer - IP Addresses",
    "category": "IPv4 Architecture",
    "primary": {
      "prompt": "What is the total bit length and octet count of a standard IPv4 address?",
      "options": [
        "32 bits (4 octets)",
        "128 bits (16 octets)",
        "48 bits (6 octets)",
        "64 bits (8 octets)"
      ],
      "answer": "32 bits (4 octets)",
      "explanation": "IPv4 addresses are 32 bits divided into 4 octets (8 bits each), with values from 0 to 255.",
      "aliases": [
        "32 bits",
        "32 bits (4 octets)",
        "32"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which technology allows multiple internal devices with private IPv4 addresses to share a single public IPv4 address over the Internet?",
      "options": [
        "NAT (Network Address Translation)",
        "APIPA (Automatic Private IP Addressing)",
        "ARP (Address Resolution Protocol)",
        "CSMA/CA"
      ],
      "answer": "NAT (Network Address Translation)",
      "explanation": "NAT translates private local IP addresses to a public routable IP address.",
      "aliases": [
        "nat",
        "network address translation"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ip-apipa-loopback",
    "moduleId": "network-layer-ip-addresses",
    "moduleName": "Network Layer - IP Addresses",
    "category": "Special IPv4 Addresses",
    "primary": {
      "prompt": "What IP address range is automatically assigned by APIPA when a client computer fails to contact a DHCP server?",
      "options": [
        "169.254.0.1 - 169.254.255.254",
        "127.0.0.1 - 127.255.255.255",
        "192.168.1.1 - 192.168.1.254",
        "10.0.0.1 - 10.255.255.254"
      ],
      "answer": "169.254.0.1 - 169.254.255.254",
      "explanation": "APIPA auto-assigns an address in the 169.254.0.0/16 range when DHCP fails.",
      "aliases": [
        "169.254",
        "169.254.0.0",
        "169.254.x.x"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which special IPv4 address is universally reserved for local loopback internal host testing?",
      "options": [
        "127.0.0.1",
        "169.254.0.1",
        "192.168.0.1",
        "255.255.255.255"
      ],
      "answer": "127.0.0.1",
      "explanation": "127.0.0.1 (and the 127.0.0.0/8 block) is reserved for local loopback.",
      "aliases": [
        "127.0.0.1",
        "127.0.0.0"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ip-ipv6-structure",
    "moduleId": "network-layer-ip-addresses",
    "moduleName": "Network Layer & IP Addresses",
    "category": "IPv6 Architecture",
    "primary": {
      "prompt": "What is the total bit length of an IPv6 address, and how is it formatted?",
      "options": [
        "128 bits; formatted as 8 groups of 4 hexadecimal characters separated by colons",
        "64 bits; formatted as 4 groups of 4 hexadecimal characters",
        "32 bits; formatted as 4 decimal octets separated by dots",
        "256 bits; formatted as 16 groups of 2 hexadecimal characters"
      ],
      "answer": "128 bits; formatted as 8 groups of 4 hexadecimal characters separated by colons",
      "explanation": "IPv6 uses 128-bit addresses written in hexadecimal across 8 colon-separated groups (hextets).",
      "aliases": [
        "128 bits",
        "128-bit",
        "128 bits, 8 groups of 4 hex digits"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "How many bits make up an IPv6 address, and what character delimits its hexadecimal groups?",
      "options": [
        "128 bits delimited by colons (:)",
        "32 bits delimited by periods (.)",
        "64 bits delimited by dashes (-)",
        "256 bits delimited by slashes (/)"
      ],
      "answer": "128 bits delimited by colons (:)",
      "explanation": "IPv6 addresses are 128 bits long and grouped using colon delimiters.",
      "aliases": [
        "128 bits delimited by colons",
        "128 bits and colons",
        "128 bits"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ip-network-host-mask",
    "moduleId": "network-layer-ip-addresses",
    "moduleName": "Network Layer & IP Addresses",
    "category": "Subnetting Concepts",
    "primary": {
      "prompt": "What mechanism is used by IP routers and hosts to determine which part of an IP address is the Network ID and which is the Host ID?",
      "options": [
        "Subnet Mask",
        "Default Gateway",
        "MAC Address",
        "DNS Server"
      ],
      "answer": "Subnet Mask",
      "explanation": "The subnet mask defines the boundary between the Network ID bits and the Host ID bits.",
      "aliases": [
        "subnet mask",
        "mask",
        "netmask"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "In IPv4 networking, what determines the boundary dividing an IP address into its network and host portions?",
      "options": [
        "Subnet Mask",
        "MAC address table",
        "Routing metric",
        "Autonomous System number"
      ],
      "answer": "Subnet Mask",
      "explanation": "The subnet mask indicates how many bits identify the network versus individual host devices.",
      "aliases": [
        "subnet mask",
        "netmask",
        "mask"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ip-special-addresses",
    "moduleId": "network-layer-ip-addresses",
    "moduleName": "Network Layer & IP Addresses",
    "category": "Special IPv4 Addresses",
    "primary": {
      "prompt": "In IPv4 networking, what is the specific role of the IP address 255.255.255.255?",
      "options": [
        "Limited local broadcast address (sent to all hosts on the local network)",
        "Loopback address for host testing",
        "Default gateway route for Internet traffic",
        "APIPA auto-configuration fallback"
      ],
      "answer": "Limited local broadcast address (sent to all hosts on the local network)",
      "explanation": "255.255.255.255 is the IPv4 limited broadcast address targeting all devices on the local subnet.",
      "aliases": [
        "limited broadcast",
        "local broadcast",
        "broadcast address",
        "broadcast"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which IPv4 address represents the local limited broadcast address for sending packets to all hosts on the local subnet?",
      "options": [
        "255.255.255.255",
        "127.0.0.1",
        "0.0.0.0",
        "169.254.255.255"
      ],
      "answer": "255.255.255.255",
      "explanation": "255.255.255.255 is the all-ones limited broadcast address.",
      "aliases": [
        "255.255.255.255",
        "all 255s"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-private-classes",
    "moduleId": "private-ip-classes",
    "moduleName": "Private IP Address Classes",
    "category": "RFC 1918 Ranges",
    "primary": {
      "prompt": "What are the standard RFC 1918 private IPv4 address ranges for Class A, Class B, and Class C?",
      "options": [
        "Class A: 10.0.0.0 - 10.255.255.255; Class B: 172.16.0.0 - 172.31.255.255; Class C: 192.168.0.0 - 192.168.255.255",
        "Class A: 1.0.0.0 - 126.255.255.255; Class B: 128.0.0.0 - 191.255.255.255; Class C: 192.0.0.0 - 223.255.255.255",
        "Class A: 10.0.0.0 - 10.0.255.255; Class B: 172.0.0.0 - 172.255.255.255; Class C: 192.168.0.0 - 192.168.0.255",
        "Class A: 169.254.0.0 - 169.254.255.255; Class B: 127.0.0.0 - 127.255.255.255; Class C: 224.0.0.0 - 239.255.255.255"
      ],
      "answer": "Class A: 10.0.0.0 - 10.255.255.255; Class B: 172.16.0.0 - 172.31.255.255; Class C: 192.168.0.0 - 192.168.255.255",
      "explanation": "RFC 1918 private ranges are 10.0.0.0/8 (Class A), 172.16.0.0/12 (Class B), and 192.168.0.0/16 (Class C).",
      "aliases": [
        "10.0.0.0, 172.16.0.0, 192.168.0.0"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which private IP address range is allocated for Class C local networks?",
      "options": [
        "192.168.0.0 - 192.168.255.255",
        "10.0.0.0 - 10.255.255.255",
        "172.16.0.0 - 172.31.255.255",
        "169.254.0.0 - 169.254.255.255"
      ],
      "answer": "192.168.0.0 - 192.168.255.255",
      "explanation": "Class C private IP range is 192.168.0.0 - 192.168.255.255.",
      "aliases": [
        "192.168.0.0 - 192.168.255.255",
        "192.168.0.0"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-private-rfc1918-nat",
    "moduleId": "private-ip-classes",
    "moduleName": "Private IP Address Classes",
    "category": "RFC 1918 Concepts",
    "primary": {
      "prompt": "Why are RFC 1918 private IPv4 addresses non-routable across the public Internet, and what technology enables their Internet access?",
      "options": [
        "They are not globally unique and require Network Address Translation (NAT) to traverse public Internet routers",
        "They lack subnet masks and require DNS root delegation",
        "They operate exclusively at Layer 2 and require Layer 3 encapsulation",
        "They use 16-bit binary formatting instead of standard 32-bit formatting"
      ],
      "answer": "They are not globally unique and require Network Address Translation (NAT) to traverse public Internet routers",
      "explanation": "Private addresses can be duplicated on different private networks, so public Internet routers drop them unless translated by NAT.",
      "aliases": [
        "require nat",
        "not globally unique and require nat"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which RFC document specifies private IPv4 address allocations that cannot be routed across the public Internet without NAT?",
      "options": [
        "RFC 1918",
        "RFC 791",
        "RFC 826",
        "RFC 2131"
      ],
      "answer": "RFC 1918",
      "explanation": "RFC 1918 defines the private IPv4 address ranges for Class A (10.0.0.0/8), Class B (172.16.0.0/12), and Class C (192.168.0.0/16).",
      "aliases": [
        "rfc 1918",
        "rfc1918",
        "1918"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-private-class-ranges",
    "moduleId": "private-ip-classes",
    "moduleName": "Private IP Address Classes",
    "category": "RFC 1918 Ranges",
    "primary": {
      "prompt": "What are the default subnet masks assigned to Class A, Class B, and Class C private IP address spaces respectively?",
      "options": [
        "255.0.0.0 (Class A), 255.255.0.0 (Class B), and 255.255.255.0 (Class C)",
        "255.255.0.0 (Class A), 255.0.0.0 (Class B), and 255.255.255.0 (Class C)",
        "255.255.255.0 for all private IP classes",
        "255.0.0.0 for all private IP classes"
      ],
      "answer": "255.0.0.0 (Class A), 255.255.0.0 (Class B), and 255.255.255.0 (Class C)",
      "explanation": "Default classful masks are /8 (255.0.0.0) for Class A, /16 (255.255.0.0) for Class B, and /24 (255.255.255.0) for Class C.",
      "aliases": [
        "255.0.0.0, 255.255.0.0, 255.255.255.0",
        "/8, /16, /24"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "The RFC 1918 Class B private address space (172.16.0.0 - 172.31.255.255) uses which default subnet mask?",
      "options": [
        "255.255.0.0",
        "255.0.0.0",
        "255.255.255.0",
        "255.255.245.0"
      ],
      "answer": "255.255.0.0",
      "explanation": "Class B default subnet mask is 255.255.0.0.",
      "aliases": [
        "255.255.0.0",
        "/16"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ip-general-classes",
    "moduleId": "ip-address-classes",
    "moduleName": "General IP Address Classes",
    "category": "Class Ranges & Masks",
    "primary": {
      "prompt": "What are the first octet decimal ranges and default subnet masks for IPv4 Class A, Class B, and Class C networks?",
      "options": [
        "Class A: 1-126 (255.0.0.0); Class B: 128-191 (255.255.0.0); Class C: 192-223 (255.255.255.0)",
        "Class A: 1-127 (255.255.0.0); Class B: 128-192 (255.0.0.0); Class C: 193-224 (255.255.255.0)",
        "Class A: 0-128 (255.0.0.0); Class B: 129-192 (255.255.0.0); Class C: 193-240 (255.255.255.0)",
        "Class A: 10-100 (255.0.0.0); Class B: 172-192 (255.255.0.0); Class C: 192-255 (255.255.255.0)"
      ],
      "answer": "Class A: 1-126 (255.0.0.0); Class B: 128-191 (255.255.0.0); Class C: 192-223 (255.255.255.0)",
      "explanation": "Class A is 1-126 (/8), Class B is 128-191 (/16), Class C is 192-223 (/24).",
      "aliases": [
        "1-126, 128-191, 192-223"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "What purposes are designated for IPv4 Class D (224-239) and Class E (240-254) addresses?",
      "options": [
        "Class D: Multicasting; Class E: Research and Experimental",
        "Class D: Private LANs; Class E: Public WANs",
        "Class D: Loopback testing; Class E: APIPA fallback",
        "Class D: Default gateways; Class E: Broadcast addresses"
      ],
      "answer": "Class D: Multicasting; Class E: Research and Experimental",
      "explanation": "Class D (224-239) is reserved for Multicast; Class E (240-254) is reserved for Experimental/Research purposes.",
      "aliases": [
        "multicast and research",
        "multicast, experimental"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-ip-classes-d-e",
    "moduleId": "ip-address-classes",
    "moduleName": "General IP Address Classes",
    "category": "Class Allocations",
    "primary": {
      "prompt": "What are the designated purposes of IPv4 Class D (224-239) and Class E (240-254) addresses?",
      "options": [
        "Class D is reserved for Multicast; Class E is reserved for Experimental/Research purposes",
        "Class D is reserved for Public Internet; Class E is reserved for Private LANs",
        "Class D is reserved for APIPA; Class E is reserved for Loopback testing",
        "Class D is reserved for Default routing; Class E is reserved for Broadcast"
      ],
      "answer": "Class D is reserved for Multicast; Class E is reserved for Experimental/Research purposes",
      "explanation": "Class D (224.0.0.0 - 239.255.255.255) is for Multicast, and Class E (240.0.0.0 - 254.255.255.255) is for Experimental use.",
      "aliases": [
        "class d is multicast, class e is experimental",
        "multicast and experimental"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which IPv4 address classes are reserved for Multicast groups and Experimental/Research purposes respectively?",
      "options": [
        "Class D (Multicast) and Class E (Experimental)",
        "Class A (Multicast) and Class B (Experimental)",
        "Class B (Multicast) and Class C (Experimental)",
        "Class C (Multicast) and Class D (Experimental)"
      ],
      "answer": "Class D (Multicast) and Class E (Experimental)",
      "explanation": "Class D is allocated for Multicast traffic and Class E is reserved for experimental research.",
      "aliases": [
        "class d and class e",
        "class d and e",
        "d and e"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ip-classes-capacities",
    "moduleId": "ip-address-classes",
    "moduleName": "General IP Address Classes",
    "category": "Class Allocations",
    "primary": {
      "prompt": "What is the Net/Host structure and usable host capacity of a standard Class C IPv4 network?",
      "options": [
        "N.N.N.H (3 Network octets, 1 Host octet); 254 usable hosts",
        "N.N.H.H (2 Network octets, 2 Host octets); 65,534 usable hosts",
        "N.H.H.H (1 Network octet, 3 Host octets); 16,777,214 usable hosts",
        "H.H.H.N (3 Host octets, 1 Network octet); 256 usable hosts"
      ],
      "answer": "N.N.N.H (3 Network octets, 1 Host octet); 254 usable hosts",
      "explanation": "Class C has 24 network bits (N.N.N) and 8 host bits (H), yielding 2^8 - 2 = 254 usable hosts.",
      "aliases": [
        "n.n.n.h; 254 usable hosts",
        "n.n.n.h, 254 hosts",
        "nnnh 254"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "In standard Classful IPv4 networking, how many usable host addresses are supported by a Class C network with default N.N.N.H structure?",
      "options": [
        "254 usable hosts",
        "65,534 usable hosts",
        "16,777,214 usable hosts",
        "126 usable hosts"
      ],
      "answer": "254 usable hosts",
      "explanation": "A /24 Class C network supports 256 total IP addresses minus 2 (network and broadcast) = 254 usable hosts.",
      "aliases": [
        "254",
        "254 hosts",
        "254 usable hosts"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ip-classes-126-rule",
    "moduleId": "ip-address-classes",
    "moduleName": "General IP Address Classes",
    "category": "Class Allocations",
    "primary": {
      "prompt": "Why does IPv4 Class A only support 126 usable network numbers when the first octet range spans 0 to 127?",
      "options": [
        "Network 0 is reserved for default network routing and Network 127 is reserved for loopback testing",
        "Networks 126 and 127 are reserved for APIPA auto-configuration",
        "Networks 0 and 1 are reserved for multicast groups",
        "Class A networks are limited to 126 due to 7-bit binary hardware registers"
      ],
      "answer": "Network 0 is reserved for default network routing and Network 127 is reserved for loopback testing",
      "explanation": "Network 0.0.0.0 is used for default routes, and 127.0.0.0 is reserved for loopback (127.0.0.1), leaving 126 usable Class A networks (1-126).",
      "aliases": [
        "0 is default and 127 is loopback",
        "0 is reserved and 127 is loopback",
        "network 0 and network 127 reserved"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "In IPv4 classful addressing, which two network numbers in the 0-127 range are reserved and cannot be assigned to Class A networks?",
      "options": [
        "Network 0 (default/this network) and Network 127 (loopback testing)",
        "Network 10 (private) and Network 126 (broadcast)",
        "Network 1 (first host) and Network 128 (Class B start)",
        "Network 64 (halfway) and Network 127 (broadcast)"
      ],
      "answer": "Network 0 (default/this network) and Network 127 (loopback testing)",
      "explanation": "Network 0 is reserved as default route, and Network 127 is reserved for local host loopback testing.",
      "aliases": [
        "0 and 127",
        "network 0 and network 127",
        "0 and 127 reserved"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-port-ranges",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "Port Number Ranges",
    "primary": {
      "prompt": "According to standard transport layer port allocations, which port range is designated as System or Well-Known ports?",
      "options": [
        "0 to 1023",
        "1024 to 49151",
        "49152 to 65535",
        "1 to 255"
      ],
      "answer": "0 to 1023",
      "explanation": "Ports 0 through 1023 are classified as System / Well-known ports.",
      "aliases": [
        "0-1023",
        "0 to 1023",
        "0 through 1023",
        "0 - 1023"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "What classification is given to port numbers in the range 1024 to 49151?",
      "options": [
        "User / Registered ports",
        "System / Well-known ports",
        "Dynamic / Private ports",
        "Unregistered / Unknown ports"
      ],
      "answer": "User / Registered ports",
      "explanation": "The port range 1024 to 49151 is assigned for User / Registered ports.",
      "aliases": [
        "user / registered ports",
        "registered ports",
        "user ports",
        "user/registered"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-tcp-vs-udp",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "Transport Protocols",
    "primary": {
      "prompt": "What is a primary operational characteristic of the Transmission Control Protocol (TCP) compared to User Datagram Protocol (UDP)?",
      "options": [
        "TCP is connection-oriented and provides reliable delivery with flow control and error checking",
        "TCP is connectionless and does not verify whether packets arrive intact",
        "TCP operates exclusively at Layer 3 to route packets across networks",
        "TCP is faster than UDP because it eliminates delivery acknowledgments"
      ],
      "answer": "TCP is connection-oriented and provides reliable delivery with flow control and error checking",
      "explanation": "TCP is a reliable, connection-oriented protocol that ensures data is delivered, while UDP is connectionless and unreliable.",
      "aliases": [
        "tcp is connection-oriented and reliable",
        "connection-oriented and reliable",
        "connection-oriented",
        "reliable and connection-oriented"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which statement accurately describes the User Datagram Protocol (UDP) at Layer 4?",
      "options": [
        "It is a connectionless and unreliable protocol that prioritizes speed without verifying packet delivery",
        "It is a connection-oriented protocol that guarantees delivery through error correction",
        "It requires three-way handshakes to establish reliable sessions between hosts",
        "It manages physical MAC address mappings across local switch ports"
      ],
      "answer": "It is a connectionless and unreliable protocol that prioritizes speed without verifying packet delivery",
      "explanation": "UDP is connectionless and not reliable; it is faster than TCP and leaves delivery verification up to the application.",
      "aliases": [
        "connectionless and unreliable",
        "unreliable and connectionless"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-ports-web-secure",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "Standard Protocols",
    "primary": {
      "prompt": "Which standard TCP port numbers are utilized by unencrypted HTTP and encrypted HTTPS web traffic respectively?",
      "options": [
        "Port 80 for HTTP and Port 443 for HTTPS",
        "Port 20 for HTTP and Port 21 for HTTPS",
        "Port 25 for HTTP and Port 110 for HTTPS",
        "Port 53 for HTTP and Port 69 for HTTPS"
      ],
      "answer": "Port 80 for HTTP and Port 443 for HTTPS",
      "explanation": "HTTP operates over TCP port 80, whereas HTTPS uses TCP port 443.",
      "aliases": [
        "80 and 443",
        "80, 443",
        "port 80 and port 443",
        "80/443"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "An administrator is configuring firewall rules to allow encrypted Hypertext Transfer Protocol Secure (HTTPS) sessions. Which transport protocol and port must be permitted?",
      "options": [
        "TCP port 443",
        "UDP port 443",
        "TCP port 80",
        "UDP port 80"
      ],
      "answer": "TCP port 443",
      "explanation": "HTTPS communicates using TCP over port 443.",
      "aliases": [
        "tcp 443",
        "443",
        "tcp port 443",
        "port 443"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-remote-management",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "Remote Access Protocols",
    "primary": {
      "prompt": "Which secure CLI remote access protocol operates on TCP port 22, replacing the unencrypted Telnet protocol on TCP port 23?",
      "options": [
        "SSH (Secure Shell)",
        "RDP (Remote Desktop Protocol)",
        "LDAP (Lightweight Directory Access Protocol)",
        "SMTP (Simple Mail Transfer Protocol)"
      ],
      "answer": "SSH (Secure Shell)",
      "explanation": "SSH provides encrypted remote management over TCP port 22, whereas Telnet operates over TCP port 23 unencrypted.",
      "aliases": [
        "ssh",
        "secure shell",
        "ssh (secure shell)"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "What port number and transport protocol are utilized by Microsoft Remote Desktop Protocol (RDP) for graphical remote management sessions?",
      "options": [
        "TCP port 3389",
        "UDP port 1701",
        "TCP port 389",
        "TCP port 22"
      ],
      "answer": "TCP port 3389",
      "explanation": "RDP uses TCP port 3389 for remote desktop connections.",
      "aliases": [
        "3389",
        "tcp 3389",
        "port 3389",
        "tcp port 3389"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-email-protocols",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "Email Protocols",
    "primary": {
      "prompt": "Which email protocols use TCP ports 25, 110, and 143 respectively?",
      "options": [
        "SMTP (Port 25), POP3 (Port 110), and IMAP (Port 143)",
        "POP3 (Port 25), SMTP (Port 110), and IMAP (Port 143)",
        "IMAP (Port 25), POP3 (Port 110), and SMTP (Port 143)",
        "SMTP (Port 25), IMAP (Port 110), and POP3 (Port 143)"
      ],
      "answer": "SMTP (Port 25), POP3 (Port 110), and IMAP (Port 143)",
      "explanation": "Simple Mail Transfer Protocol uses port 25, Post Office Protocol 3 uses port 110, and Internet Message Access Protocol uses port 143, all over TCP.",
      "aliases": [
        "smtp, pop3, imap",
        "smtp, pop3, and imap"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which transport protocol and port number are used by SMTP to transmit mail between email servers?",
      "options": [
        "TCP port 25",
        "UDP port 25",
        "TCP port 110",
        "TCP port 143"
      ],
      "answer": "TCP port 25",
      "explanation": "SMTP relies on TCP port 25 for sending and relaying email.",
      "aliases": [
        "tcp 25",
        "tcp port 25",
        "port 25 tcp",
        "25 tcp",
        "25/tcp"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-udp-services",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "UDP Services",
    "primary": {
      "prompt": "Which of the following network services use UDP rather than TCP for their primary transport operations?",
      "options": [
        "DHCP (Ports 67, 68), TFTP (Port 69), and SNMP (Port 161)",
        "HTTP (Port 80), HTTPS (Port 443), and SSH (Port 22)",
        "SMTP (Port 25), POP3 (Port 110), and IMAP (Port 143)",
        "FTP Data (Port 20), FTP Control (Port 21), and Telnet (Port 23)"
      ],
      "answer": "DHCP (Ports 67, 68), TFTP (Port 69), and SNMP (Port 161)",
      "explanation": "DHCP (UDP 67/68), TFTP (UDP 69), SNMP (UDP 161), and L2TP (UDP 1701) all use UDP as their transport protocol.",
      "aliases": [
        "dhcp, tftp, snmp",
        "dhcp, tftp, and snmp"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which application protocol can operate using both TCP and UDP on port 53?",
      "options": [
        "DNS (Domain Name System)",
        "DHCP (Dynamic Host Configuration Protocol)",
        "TFTP (Trivial File Transfer Protocol)",
        "SNMP (Simple Network Management Protocol)"
      ],
      "answer": "DNS (Domain Name System)",
      "explanation": "DNS utilizes port 53 and can operate over both TCP and UDP.",
      "aliases": [
        "dns",
        "domain name system",
        "domain name service",
        "dns (domain name system)",
        "dns (domain name service)"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-ftp-operation",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "File Transfer Protocols",
    "primary": {
      "prompt": "How are TCP port numbers 20 and 21 allocated during standard File Transfer Protocol (FTP) operations?",
      "options": [
        "Port 20 is used for FTP Data transfer and Port 21 is used for FTP Control commands",
        "Port 20 is used for FTP Control commands and Port 21 is used for FTP Data transfer",
        "Port 20 is used for encrypted SFTP and Port 21 is used for unencrypted FTP",
        "Port 20 is used for TFTP UDP transfer and Port 21 is used for FTP TCP transfer"
      ],
      "answer": "Port 20 is used for FTP Data transfer and Port 21 is used for FTP Control commands",
      "explanation": "FTP uses two separate TCP connections: port 20 for data transmission and port 21 for command/control.",
      "aliases": [
        "20 for data and 21 for control",
        "20 is data and 21 is control",
        "20 data, 21 control",
        "port 20 data and port 21 control"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which port number does an FTP client connect to when establishing the command/control connection with an FTP server?",
      "options": [
        "TCP port 21",
        "TCP port 20",
        "UDP port 69",
        "TCP port 22"
      ],
      "answer": "TCP port 21",
      "explanation": "FTP Control commands are sent over TCP port 21, while data transfer uses TCP port 20.",
      "aliases": [
        "21",
        "tcp 21",
        "port 21",
        "tcp port 21"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-directory-vpn-shares",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "Directory & Sharing Protocols",
    "primary": {
      "prompt": "Which standard ports are used by LDAP (Lightweight Directory Access Protocol) and SMB (Server Message Block)?",
      "options": [
        "LDAP uses TCP port 389; SMB uses TCP port 139 or 445",
        "LDAP uses UDP port 1701; SMB uses TCP port 3389",
        "LDAP uses TCP port 22; SMB uses UDP port 161",
        "LDAP uses TCP port 110; SMB uses TCP port 143"
      ],
      "answer": "LDAP uses TCP port 389; SMB uses TCP port 139 or 445",
      "explanation": "LDAP uses TCP port 389, and SMB uses TCP ports 139 or 445 for file and printer sharing.",
      "aliases": [
        "ldap 389, smb 139 or 445",
        "389 and 139 or 445"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Which Layer 2 Tunneling Protocol (L2TP) port uses UDP for establishing VPN tunnels?",
      "options": [
        "UDP port 1701",
        "UDP port 161",
        "TCP port 389",
        "TCP port 443"
      ],
      "answer": "UDP port 1701",
      "explanation": "L2TP uses UDP port 1701.",
      "aliases": [
        "1701",
        "udp 1701",
        "port 1701",
        "udp port 1701"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-registered-dynamic-ranges",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "Port Number Ranges",
    "primary": {
      "prompt": "Which port number range is designated as User / Registered ports?",
      "options": [
        "1024 to 49151",
        "0 to 1023",
        "49152 to 65535",
        "1024 to 65535"
      ],
      "answer": "1024 to 49151",
      "explanation": "Ports 1024 through 49151 are designated as User / Registered ports.",
      "aliases": [
        "1024-49151",
        "1024 to 49151",
        "1024 - 49151"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which port number range is designated as Dynamic / Private ports?",
      "options": [
        "49152 to 65535",
        "0 to 1023",
        "1024 to 49151",
        "32768 to 65535"
      ],
      "answer": "49152 to 65535",
      "explanation": "Ports 49152 through 65535 are designated as Dynamic / Private ports.",
      "aliases": [
        "49152-65535",
        "49152 to 65535",
        "49512-65535"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-ports-rdp-and-snmp",
    "moduleId": "ports",
    "moduleName": "Transport Layer Ports",
    "category": "Remote & Management Protocols",
    "primary": {
      "prompt": "Which port number is utilized by Microsoft Remote Desktop Protocol (RDP) for administrative graphical sessions?",
      "options": [
        "TCP port 3389",
        "UDP port 1701",
        "TCP port 22",
        "TCP port 389"
      ],
      "answer": "TCP port 3389",
      "explanation": "RDP operates over TCP port 3389.",
      "aliases": [
        "3389",
        "tcp 3389",
        "port 3389",
        "tcp port 3389"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which transport protocol and port number are standardly utilized by SNMP for device monitoring queries?",
      "options": [
        "UDP port 161",
        "TCP port 161",
        "UDP port 69",
        "TCP port 143"
      ],
      "answer": "UDP port 161",
      "explanation": "SNMP utilizes UDP port 161 for querying device state and status metrics.",
      "aliases": [
        "udp 161",
        "udp port 161",
        "port 161 udp",
        "161 udp",
        "161/udp"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-nat-purpose",
    "moduleId": "nat",
    "moduleName": "Network Address Translation (NAT)",
    "category": "Core NAT Objectives",
    "primary": {
      "prompt": "What is the primary purpose of Network Address Translation (NAT)?",
      "options": [
        "Preserve public IP addresses",
        "Encrypt payload data during routing",
        "Assign Layer 2 MAC addresses",
        "Eliminate physical cabling requirements"
      ],
      "answer": "Preserve public IP addresses",
      "explanation": "The primary purpose of NAT is to preserve public IP addresses by allowing private networks to reuse private address space internally.",
      "aliases": [
        "preserve public ip addresses",
        "preserve public ips",
        "preserve public ip",
        "save public ip addresses",
        "preserve ip addresses"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Why was Network Address Translation (NAT) primarily developed and deployed in IPv4 networks?",
      "options": [
        "To conserve and preserve public IPv4 addresses",
        "To establish full-duplex CSMA/CD collision domains",
        "To modulate analog phone signals into digital data",
        "To replace dynamic routing protocols on the internet"
      ],
      "answer": "To conserve and preserve public IPv4 addresses",
      "explanation": "NAT was developed primarily to conserve and preserve limited public IPv4 addresses.",
      "aliases": [
        "to conserve and preserve public ipv4 addresses",
        "preserve public ip addresses",
        "preserve public ips",
        "preserve public ip",
        "conserve public ip addresses"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-nat-static",
    "moduleId": "nat",
    "moduleName": "Network Address Translation (NAT)",
    "category": "Static NAT",
    "primary": {
      "prompt": "Which type of NAT performs a 1-to-1 translation assigning one dedicated public IP address to one private IP address, most commonly used for servers?",
      "options": [
        "Static NAT",
        "Dynamic NAT",
        "PAT (Port Address Translation)",
        "Carrier Grade DNS"
      ],
      "answer": "Static NAT",
      "explanation": "Static NAT is a 1-to-1 translation that binds a single public IP to a single private IP, standard for web/mail servers.",
      "aliases": [
        "static nat",
        "static",
        "1:1 nat",
        "1 to 1 nat",
        "1:1"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "When an administrator assigns a permanent, dedicated public IP address to an internal web server's private IP, which NAT type is configured?",
      "options": [
        "Static NAT",
        "Dynamic NAT",
        "PAT (Port Address Translation)",
        "Anycast NAT"
      ],
      "answer": "Static NAT",
      "explanation": "Static NAT creates a fixed 1:1 mapping between one public IP and one private IP for dedicated host access.",
      "aliases": [
        "static nat",
        "static",
        "1:1 nat",
        "1 to 1 nat",
        "1:1"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-nat-dynamic",
    "moduleId": "nat",
    "moduleName": "Network Address Translation (NAT)",
    "category": "Dynamic NAT",
    "primary": {
      "prompt": "Which NAT mode provides a many-to-many translation by allocating public IP addresses from a shared pool to private hosts on a first-come, first-served basis?",
      "options": [
        "Dynamic NAT",
        "Static NAT",
        "PAT (Port Address Translation)",
        "Loopback NAT"
      ],
      "answer": "Dynamic NAT",
      "explanation": "Dynamic NAT translates many private IPs to many public IPs dynamically from an address pool on a first-come, first-served basis.",
      "aliases": [
        "dynamic nat",
        "dynamic",
        "dynamic pool"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "If 10 internal computers share a pool of 5 public IP addresses on a first-come, first-served basis, which translation method is being utilized?",
      "options": [
        "Dynamic NAT",
        "Static NAT",
        "PAT (Port Address Translation)",
        "Unicast Bridging"
      ],
      "answer": "Dynamic NAT",
      "explanation": "Leasing addresses dynamically from an IP pool on a first-come, first-served basis is Dynamic NAT.",
      "aliases": [
        "dynamic nat",
        "dynamic",
        "dynamic pool"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-nat-pat-overload",
    "moduleId": "nat",
    "moduleName": "Network Address Translation (NAT)",
    "category": "Port Address Translation",
    "primary": {
      "prompt": "Which NAT type allows many internal private client devices to share a single public IP address, and is also known as 'overload'?",
      "options": [
        "PAT (Port Address Translation)",
        "Static NAT",
        "Dynamic NAT",
        "Direct Routing"
      ],
      "answer": "PAT (Port Address Translation)",
      "explanation": "PAT (Port Address Translation) maps many private IPs to a single public IP, and is commonly called NAT Overload.",
      "aliases": [
        "pat",
        "port address translation",
        "overload",
        "nat overload",
        "pat (port address translation)"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "In networking terminology, the term 'overload' refers specifically to which implementation of NAT?",
      "options": [
        "PAT (Port Address Translation)",
        "Static NAT",
        "Dynamic NAT",
        "Classful Subnetting"
      ],
      "answer": "PAT (Port Address Translation)",
      "explanation": "The term 'overload' in router NAT configurations refers directly to Port Address Translation (PAT).",
      "aliases": [
        "pat",
        "port address translation",
        "pat (port address translation)"
      ],
      "canTypeInHardMode": true
    }
  },
  {
    "id": "q-nat-private-routable",
    "moduleId": "nat",
    "moduleName": "Network Address Translation (NAT)",
    "category": "Address Routability",
    "primary": {
      "prompt": "How do private IPv4 addresses behave regarding routing across the public internet?",
      "options": [
        "They are only used internally and are not routable to the internet",
        "They are globally unique and routable across internet backbones",
        "They can only route over satellite and microwave links",
        "They are automatically advertised via BGP to public DNS root servers"
      ],
      "answer": "They are only used internally and are not routable to the internet",
      "explanation": "Private IPv4 addresses are reserved strictly for internal private networks and cannot be routed across the public internet.",
      "aliases": [
        "not routable"
      ],
      "canTypeInHardMode": false
    },
    "alternate": {
      "prompt": "Why must internal network devices have their private IPv4 addresses translated before accessing internet resources?",
      "options": [
        "Private IPv4 addresses are not routable on the public internet",
        "Private IPv4 addresses lack Layer 3 IP headers",
        "Private IPv4 addresses only operate at 10 Mbps speed",
        "Private IPv4 addresses conflict with 802.11 Wi-Fi frames"
      ],
      "answer": "Private IPv4 addresses are not routable on the public internet",
      "explanation": "Private addresses cannot travel or be routed over the public internet, necessitating translation to a valid public IP.",
      "aliases": [
        "not routable"
      ],
      "canTypeInHardMode": false
    }
  },
  {
    "id": "q-nat-router-role",
    "moduleId": "nat",
    "moduleName": "Network Address Translation (NAT)",
    "category": "Network Translation Architecture",
    "primary": {
      "prompt": "When a PC with private IP 192.168.1.23 accesses the internet through a router with public IP 203.0.113.45, what address does the router's NAT place in the source IP field of the outbound packet?",
      "options": [
        "203.0.113.45",
        "192.168.1.23",
        "127.0.0.1",
        "255.255.255.255"
      ],
      "answer": "203.0.113.45",
      "explanation": "The router's NAT translates the private source IP (192.168.1.23) into the router's public IP (203.0.113.45).",
      "aliases": [
        "203.0.113.45",
        "the public ip",
        "public ip"
      ],
      "canTypeInHardMode": true
    },
    "alternate": {
      "prompt": "Which device on a home or enterprise edge network typically performs Network Address Translation between internal hosts and the ISP?",
      "options": [
        "Router",
        "TDR",
        "Passive Hub",
        "Switch"
      ],
      "answer": "Router",
      "explanation": "The router connects internal hosts to the ISP and performs NAT translation.",
      "aliases": [
        "router",
        "the router",
        "routers",
        "default gateway"
      ],
      "canTypeInHardMode": true
    }
  }
];
