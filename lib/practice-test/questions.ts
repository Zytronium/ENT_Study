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
      "explanation": "The Physical layer (Layer 1) deals with transmitting raw bits over physical mediums including copper, fiber, and wireless frequencies."
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
      "explanation": "Physical cables, hubs, and antennas operate at Layer 1 (Physical layer)."
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
      "explanation": "Layer 2 (Data-Link) handles local frame delivery, MAC addressing, and switch operations."
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
      "explanation": "Switches and NIC hardware operate at Layer 2 (Data-Link layer)."
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
      "explanation": "The Network layer (Layer 3) handles IP addressing and router packet forwarding."
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
      "explanation": "Routers and logical IP addressing operate at Layer 3 (Network layer)."
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
      "explanation": "The Transport layer (Layer 4) handles reliable end-to-end flow control and segment delivery via TCP and UDP."
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
      "explanation": "TCP and UDP protocols operate at Layer 4 (Transport layer)."
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
      "explanation": "Layer 6 (Presentation layer) handles translation, data formatting, and encryption."
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
      "explanation": "Presentation layer (Layer 6) handles encryption and translation."
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
      "explanation": "The Session layer (Layer 5) manages, starts, stops, and maintains communication connections between endpoints."
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
      "explanation": "Layer 5 (Session layer) maintains session persistence and coordinates dialogs between systems."
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
      "explanation": "The Application layer (Layer 7) interfaces directly with end-user software applications and network services."
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
      "explanation": "Layer 7 (Application layer) provides network services directly to end users and applications."
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
      "explanation": "A wire crimper permanently secures RJ45/RJ11 connectors onto cable ends."
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
      "explanation": "Wire crimpers terminate connectors onto twisted pair cables."
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
      "explanation": "A tone generator (and probe) emits and detects an audible tone to trace hidden or unlabeled cable runs."
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
      "explanation": "Tone generators locate the opposite end of cable runs across rooms or racks."
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
      "explanation": "TDR sends electrical pulses through copper cables to detect faults and measure distance to breaks."
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
      "explanation": "OTDR uses light pulses to locate breaks and attenuation points in optical fiber cables."
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
      "explanation": "A punch down tool seats wire pairs into termination blocks and automatically cuts off excess wire."
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
      "explanation": "Punch down tools seat and trim wires in punch blocks and keystone jacks."
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
      "explanation": "A loopback adapter redirects transmit signals back to receive pins to test physical port circuitry."
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
      "explanation": "Loopback adapters test transceiver ports by looping signals directly back."
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
      "explanation": "A light meter measures optical light loss and requires a light source device on the other end of the fiber cable."
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
      "explanation": "Light meters measure optical power in fiber cables when paired with a light source."
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
      "explanation": "Modems provide the physical connection to the ISP by translating physical carrier signals."
    },
    "alternate": {
      "prompt": "Which hardware unit handles logical IP routing and connects all local client devices together across a subnet?",
      "options": [
        "Router",
        "Modem"
      ],
      "answer": "Router",
      "explanation": "Routers provide the logical connection to the ISP and route packets among local devices."
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
      "explanation": "Modems DE-modulate incoming analog signals to digital signals, and modulate outgoing digital signals to analog."
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
      "explanation": "Modulation converts outgoing digital signals into analog format for transmission over ISP carrier lines."
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
      "explanation": "DSL modems connect over traditional copper telephone lines."
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
      "explanation": "Cable modems connect to broadband providers over coaxial cables."
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
      "explanation": "Routers provide logical network layer routing and packet forwarding between distinct IP subnets."
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
      "explanation": "A router forwards IP packets across different logical networks and subnets."
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
      "explanation": "Pin 1 of the EIA/TIA 568B standard is Orange/white stripe."
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
      "explanation": "Pin 1 is Orange/white stripe in 568B."
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
      "explanation": "Pin 8 is solid Brown in 568B."
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
      "explanation": "Pin 8 is Brown."
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
      "explanation": "Pins 4 and 5 in 568B are Blue and Blue/white stripe respectively."
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
      "explanation": "Pin 3 is Green/white stripe in 568B (mnemonic: Aliens!!)."
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
      "explanation": "The difference between 568A and 568B is that the orange and green wire pairs swap positions on Pins 1/2 and 3/6."
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
      "explanation": "The Green pair (568A pins 1, 2, 3, 6) and Orange pair (568B pins 1, 2, 3, 6) swap between standards."
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
      "explanation": "Pins 4 (Blue), 5 (White/Blue), 7 (White/Brown), and 8 (Brown) are identical in both 568A and 568B."
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
      "explanation": "Both EIA/TIA 568A and 568B have identical pinouts for pins 4, 5, 7, and 8."
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
      "explanation": "A nibble is exactly 4 bits; a byte is 8 bits (2 nibbles)."
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
      "explanation": "A nibble consists of 4 bits."
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
      "explanation": "Kilobits (Kb) are base-10 (1,000 bits), while Kilobytes (KB) are base-2 (1,024 bytes)."
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
      "explanation": "A kilobit (Kb) equals 1,000 bits."
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
      "explanation": "Throughput is measured in bits per second (b/s, Mb/s, Gb/s), whereas storage is measured in Bytes (KB, MB, GB)."
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
      "explanation": "b = bits, B = bytes."
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
      "explanation": "Since a byte is 8 bits and a nibble is 4 bits, there are exactly 2 nibbles in one byte."
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
      "explanation": "Each byte contains 2 nibbles (4 bits each)."
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
      "explanation": "Standard abbreviation uses lowercase 'b' for bits (e.g., Mb/s) and uppercase 'B' for bytes (e.g., MB)."
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
      "explanation": "Lowercase 'b' stands for bits and uppercase 'B' stands for bytes."
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
      "explanation": "128 + 64 = 192."
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
      "explanation": "128 + 64 = 192."
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
      "explanation": "128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255."
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
      "explanation": "8 ones equals 255."
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
      "explanation": "The 8 bit positions in an octet represent powers of 2 from 2^7 (128) down to 2^0 (1)."
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
      "explanation": "The leftmost bit (bit 7) represents 2^7 = 128 in base 10."
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
      "explanation": "128 + 64 + 32 + 16 = 240."
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
      "explanation": "Binary 11110000 = 128 + 64 + 32 + 16 = 240."
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
      "explanation": "Simplex communication allows transmission in only one single direction (e.g., radio broadcast, megaphone)."
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
      "explanation": "Radio broadcasts are one-way only (Simplex)."
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
      "explanation": "Half-Duplex allows bidirectional communication, but stations must take turns (e.g. walkie-talkies, legacy hubs)."
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
      "explanation": "Push-to-talk radios alternate transmission turns (Half-Duplex)."
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
      "explanation": "Full Duplex allows simultaneous two-way transmission over dedicated channels without collisions."
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
      "explanation": "Modern Ethernet switch links run in Full Duplex."
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
      "explanation": "FM radio is strictly one-way (Simplex), while walkie-talkies allow two-way communication but only one party at a time (Half-Duplex)."
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
      "explanation": "Radio broadcasting is one-way (Simplex), whereas walkie-talkies are bidirectional non-simultaneous (Half-Duplex)."
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
      "explanation": "A Star topology connects all hosts to a central hub or switch using twisted pair cables and RJ45 connectors."
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
      "explanation": "Star is the standard centralized topology."
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
      "explanation": "Bus topology uses a single coaxial trunk cable, BNC connectors, and terminating resistors at both ends."
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
      "explanation": "Coaxial cabling with end terminators forms a Bus topology."
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
      "explanation": "Mesh topology interconnects nodes with redundant paths, offering high fault tolerance."
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
      "explanation": "Ring networks use token passing around the loop to coordinate communication."
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
      "explanation": "Star topologies use twisted pair Ethernet cables (UTP/STP Cat5e/Cat6) connecting each host to a central switch."
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
      "explanation": "Endpoints in a Star topology connect individually to the switch using twisted pair Ethernet patch cables."
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
      "explanation": "10base2 (Thinnet) has a maximum distance of 200m and uses BNC T-connectors with terminators."
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
      "explanation": "10base5 (Thicknet) supports 500m and uses Vampire Taps."
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
      "explanation": "Standard twisted pair Ethernet standards (10baseT, 100baseT, 1000baseT) have a maximum distance of 100 meters."
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
      "explanation": "1000baseT requires at least Cat5e cabling."
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
      "explanation": "10GbaseT can reach up to 55m over Cat6, and the full standard distance of 100m over Cat6a."
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
      "explanation": "Cat6 supports 10 Gbps up to 55 meters; Cat6a supports 10 Gbps up to 100 meters."
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
      "explanation": "IEEE 802.3u defines 100baseT Fast Ethernet, and IEEE 802.3an defines 10GbaseT."
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
      "explanation": "802.3u specifies 100 Mb/s Fast Ethernet, while 802.3an specifies 10 Gb/s 10GbaseT."
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
      "explanation": "A Patch (straight-through) cable uses the same pinout on both ends to connect dissimilar devices."
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
      "explanation": "568A on one end and 568B on the other forms a Crossover cable (used for similar devices like PC to PC or Switch to Switch)."
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
      "explanation": "STP (Shielded Twisted Pair) adds protective foil shielding to guard against electromagnetic noise in industrial settings."
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
      "explanation": "UTP is unshielded twisted pair used in standard non-industrial installations."
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
      "explanation": "Auto-MDIX senses whether a connected cable is straight-through or crossover and configures the port internally."
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
      "explanation": "Auto-MDIX allows standard patch cables to connect any two devices regardless of device type."
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
      "explanation": "Connecting like devices directly (PC-to-PC, switch-to-switch, router-to-router) without Auto-MDIX requires a crossover cable."
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
      "explanation": "A crossover cable crosses the transmit and receive pairs so like devices can communicate directly."
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
      "explanation": "CMP (Communications Plenum) cables emit minimal toxic smoke and are fire-resistant for air-handling spaces."
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
      "explanation": "CMP prevents dangerous smoke and toxic gas distribution via HVAC air returns."
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
      "explanation": "CMR (Communications Riser) is rated for vertical shafts to stop fire climbing between floors."
    },
    "alternate": {
      "prompt": "How do the fire-retardant properties of Riser (CMR) cables compare to Plenum (CMP) and CM cables?",
      "options": [
        "Less stringent than Plenum but more robust than standard CM cables",
        "More stringent than Plenum but less robust than CM cables",
        "Identical to Plenum cables in every respect",
        "Riser cables have no fire-retardant properties at all"
      ],
      "answer": "Less stringent than Plenum but more robust than standard CM cables",
      "explanation": "Riser (CMR) cables have flame-retardant properties less stringent than plenum-rated cables but more robust than standard CM cables."
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
      "explanation": "Standard CM cabling generates heavy toxic smoke and flammable fumes when ignited, making it illegal for plenum and riser spaces."
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
      "explanation": "CM (General Use) cable is only permitted for basic workstation patch runs and standard horizontal drops."
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
      "explanation": "ESD (Electrostatic Discharge) is a static electricity spark that damages silicon chips."
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
      "explanation": "Static electricity transfer is Electrostatic Discharge (ESD)."
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
      "explanation": "EMI (Electromagnetic Interference) causes temporary noise and signal disruptions from motors, power lines, and storms."
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
      "explanation": "EMP (Electromagnetic Pulse) is a destructive burst from lightning (localized) or nuclear blasts (wide area)."
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
      "explanation": "The 2.4 GHz band provides greater range through obstacles but has only 3 non-overlapping 20MHz channels (1, 6, 11)."
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
      "explanation": "5 GHz offers higher speeds and 24 non-overlapping channels at the cost of shorter transmission distance."
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
      "explanation": "WPA2 (using AES) and WPA3 are the secure standards; WEP, WPA (TKIP), and WPS are deprecated/insecure."
    },
    "alternate": {
      "prompt": "Why does the study guide recommend against connecting to Open Wi-Fi networks?",
      "options": [
        "They have no password protection, exposing users to data theft and potential malicious honeypots",
        "They only broadcast on the 6 GHz band",
        "They are restricted to Simplex communication only",
        "They require WPA3 certification to join"
      ],
      "answer": "They have no password protection, exposing users to data theft and potential malicious honeypots",
      "explanation": "Open networks have no password, so hackers can steal data, and some open networks are malicious honeypots."
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
      "explanation": "The 2.4 GHz band in North America has 11 channels, with channels 1, 6, and 11 being the only non-overlapping channels."
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
      "explanation": "Channels 1, 6, and 11 have 25 MHz channel separation, preventing co-channel RF interference."
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
      "explanation": "The 5 GHz frequency band offers 25 non-overlapping 20 MHz channels, vastly reducing interference compared to 2.4 GHz."
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
      "explanation": "5 GHz provides 25 non-overlapping channels in the standard regulatory domain."
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
      "explanation": "2.4 GHz is an unlicensed band heavily congested by microwaves, Bluetooth peripherals, and baby monitors."
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
      "explanation": "Microwave ovens, Bluetooth devices, and cordless phones all emit RF energy in the 2.4 GHz spectrum."
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
      "explanation": "802.11ac (Wi-Fi 5) operates exclusively on 5 GHz and delivers gigabit wireless speeds."
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
      "explanation": "802.11ax is Wi-Fi 6 and operates on both 2.4 GHz and 5 GHz (up to 14 Gb/s)."
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
      "explanation": "802.11n (Wi-Fi 4) introduced simultaneous dual-band 2.4 GHz/5 GHz operation and speeds up to 600 Mb/s."
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
      "explanation": "802.11n operates across both 2.4 GHz and 5 GHz bands with a maximum speed of 600 Mb/s."
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
      "explanation": "802.11g is Wi-Fi 3, providing 54 Mb/s in the 2.4 GHz frequency band."
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
      "explanation": "802.11g delivers up to 54 Mb/s throughput on 2.4 GHz."
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
      "explanation": "Wired Ethernet uses CSMA/CD (Collision Detection); Wireless uses CSMA/CA (Collision Avoidance)."
    },
    "alternate": {
      "prompt": "Which set of characteristics correctly describes traditional Wireless networking compared to Wired networking?",
      "options": [
        "Unreliable, less secure, but mobile",
        "Reliable, secure, but not mobile",
        "Unreliable, more secure, and not mobile",
        "Reliable, less secure, and mobile"
      ],
      "answer": "Unreliable, less secure, but mobile",
      "explanation": "Wireless networks are unreliable and less secure than wired networks, but offer mobility."
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
      "explanation": "CD stands for Collision Detection (used in CSMA/CD wired Ethernet), and CA stands for Collision Avoidance (used in CSMA/CA wireless)."
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
      "explanation": "CSMA/CD = Carrier Sense Multiple Access with Collision Detection; CSMA/CA = Carrier Sense Multiple Access with Collision Avoidance."
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
      "explanation": "A T1 line provides 1.544 Mbps throughput across 24 channels of 64 Kbps each."
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
      "explanation": "An E1 line delivers 2.048 Mbps across 32 channels."
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
      "explanation": "POTS stands for Plain Old Telephone Service, transmitting analog voice signals over copper wire pairs."
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
      "explanation": "Dial-up modem speeds ranged from early 300 bps modems up to 54 Kbps (or 56 Kbps standard)."
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
      "explanation": "A T3 line multiplexes 28 T1 circuits (T1x28) to provide 672 channels and 44.736 Mbps throughput in North America."
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
      "explanation": "An E3 line multiplexes 16 E1 circuits (E1x16) to provide 512 channels and 34.368 Mbps throughput in Europe."
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
      "explanation": "A single DS0 channel is 64 Kbps. ISDN BRI combines two 64 Kbps B-channels for a total of 128 Kbps."
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
      "explanation": "DS0 operates at 64 Kbps, and ISDN BRI bonds two channels to reach 128 Kbps."
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
      "explanation": "A T3 line bundles 28 T1s (28 x 24 = 672 channels); an E3 line bundles 16 E1s (16 x 32 = 512 channels)."
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
      "explanation": "A European E3 circuit multiplexes 16 E1 lines, providing 512 channels (16 x 32)."
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
      "explanation": "Layer 2 consists of LLC (Logical Link Control) on top and MAC (Media Access Control) on the bottom."
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
      "explanation": "LLC is the upper Layer 2 sublayer that binds hardware to logical Layer 3 protocols."
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
      "explanation": "A MAC address is 48 bits (6 bytes) long; the first 24 bits (3 bytes) are the vendor OUI."
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
      "explanation": "ARP resolves IPv4 addresses to hardware MAC addresses on local networks."
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
      "explanation": "ARP maps a known IP address to a physical MAC address on the local network."
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
      "explanation": "ARP broadcasts a request on the local segment to discover the target host's MAC address."
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
      "explanation": "The 48-bit all-ones hexadecimal address FF:FF:FF:FF:FF:FF is the Ethernet Layer 2 broadcast address."
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
      "explanation": "Every NIC processes frames destined for the broadcast MAC address FF:FF:FF:FF:FF:FF."
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
      "explanation": "Hexadecimal is Base 16 (0-9, A-F); F represents 15."
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
      "explanation": "One hexadecimal digit represents exactly 4 bits (a nibble). Two hex digits represent one 8-bit byte."
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
      "explanation": "Each hex digit represents 4 binary bits (one nibble). Two hex digits represent 8 bits (one byte), ranging from 0x00 (0) to 0xFF (255)."
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
      "explanation": "An 8-bit byte maps to 2 hexadecimal characters, where each character accounts for 4 bits."
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
      "explanation": "A switch uses a MAC address table (also called a CAM table) to map physical ports to learned MAC addresses."
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
      "explanation": "When a destination MAC is unlearned, the switch floods the frame out all other ports."
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
      "explanation": "Switches dynamically learn MAC addresses by reading the Source MAC address of every ingress frame received on a port."
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
      "explanation": "The switch records the Source MAC address and the physical ingress port in its CAM table."
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
      "explanation": "Switches break up collision domains per port, but forward broadcast frames to all ports within the same VLAN."
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
      "explanation": "Each port on a switch isolates collisions, while broadcasts propagate to all ports by default."
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
      "explanation": "IPv4 addresses are 32 bits divided into 4 octets (8 bits each), with values from 0 to 255."
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
      "explanation": "NAT translates private local IP addresses to a public routable IP address."
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
      "explanation": "APIPA auto-assigns an address in the 169.254.0.0/16 range when DHCP fails."
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
      "explanation": "127.0.0.1 (and the 127.0.0.0/8 block) is reserved for local loopback."
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
      "explanation": "IPv6 uses 128-bit addresses written in hexadecimal across 8 colon-separated groups (hextets)."
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
      "explanation": "IPv6 addresses are 128 bits long and grouped using colon delimiters."
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
      "explanation": "The subnet mask defines the boundary between the Network ID bits and the Host ID bits."
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
      "explanation": "The subnet mask indicates how many bits identify the network versus individual host devices."
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
      "explanation": "255.255.255.255 is the IPv4 limited broadcast address targeting all devices on the local subnet."
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
      "explanation": "255.255.255.255 is the all-ones limited broadcast address."
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
      "explanation": "RFC 1918 private ranges are 10.0.0.0/8 (Class A), 172.16.0.0/12 (Class B), and 192.168.0.0/16 (Class C)."
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
      "explanation": "Class C private IP range is 192.168.0.0 - 192.168.255.255."
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
      "explanation": "Private addresses can be duplicated on different private networks, so public Internet routers drop them unless translated by NAT."
    },
    "alternate": {
      "prompt": "What is responsible for assigning private IPv4 addresses to devices on a local network?",
      "options": [
        "A DHCP server",
        "The ISP's public DNS root server",
        "A static ARP table",
        "The network's OTDR"
      ],
      "answer": "A DHCP server",
      "explanation": "A DHCP server assigns private IP addresses to devices on a network."
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
      "explanation": "Default classful masks are /8 (255.0.0.0) for Class A, /16 (255.255.0.0) for Class B, and /24 (255.255.255.0) for Class C."
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
      "explanation": "Class B default subnet mask is 255.255.0.0."
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
      "explanation": "Class A is 1-126 (/8), Class B is 128-191 (/16), Class C is 192-223 (/24)."
    },
    "alternate": {
      "prompt": "What purposes are designated for IPv4 Class D (224-239) and Class E (240-254) addresses in this course?",
      "options": [
        "Class D: Documentation/labs; Class E: Experimental",
        "Class D: Multicasting; Class E: Broadcast",
        "Class D: Loopback; Class E: APIPA",
        "Class D: Public Internet; Class E: Private LANs"
      ],
      "answer": "Class D: Documentation/labs; Class E: Experimental",
      "explanation": "Per the course material, Class D (224-239) is used for documentation/labs, and Class E (240-254) is experimental."
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
        "Class D is reserved for documentation/labs; Class E is reserved for experimental purposes",
        "Class D is reserved for Public Internet; Class E is reserved for Private LANs",
        "Class D is reserved for APIPA; Class E is reserved for Loopback testing",
        "Class D is reserved for Default routing; Class E is reserved for Broadcast"
      ],
      "answer": "Class D is reserved for documentation/labs; Class E is reserved for experimental purposes",
      "explanation": "Class D (224-239) is used for documentation/labs, and Class E (240-254) is reserved for experimental purposes."
    },
    "alternate": {
      "prompt": "Which IPv4 address classes are reserved for documentation/lab use and experimental purposes respectively?",
      "options": [
        "Class D (documentation/labs) and Class E (experimental)",
        "Class A (documentation/labs) and Class B (experimental)",
        "Class B (documentation/labs) and Class C (experimental)",
        "Class C (documentation/labs) and Class D (experimental)"
      ],
      "answer": "Class D (documentation/labs) and Class E (experimental)",
      "explanation": "Class D is allocated for documentation/lab use, and Class E is reserved for experimental purposes."
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
      "explanation": "Class C has 24 network bits (N.N.N) and 8 host bits (H), yielding 2^8 - 2 = 254 usable hosts."
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
      "explanation": "A /24 Class C network supports 256 total IP addresses minus 2 (network and broadcast) = 254 usable hosts."
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
      "explanation": "Ports 0 through 1023 are classified as System / Well-known ports."
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
      "explanation": "The port range 1024 to 49151 is assigned for User / Registered ports."
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
      "explanation": "TCP is a reliable, connection-oriented protocol that ensures data is delivered, while UDP is connectionless and unreliable."
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
      "explanation": "UDP is connectionless and not reliable; it is faster than TCP and leaves delivery verification up to the application."
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
      "explanation": "HTTP operates over TCP port 80, whereas HTTPS uses TCP port 443."
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
      "explanation": "HTTPS communicates using TCP over port 443."
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
      "explanation": "SSH provides encrypted remote management over TCP port 22, whereas Telnet operates over TCP port 23 unencrypted."
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
      "explanation": "RDP uses TCP port 3389 for remote desktop connections."
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
      "explanation": "Simple Mail Transfer Protocol uses port 25, Post Office Protocol 3 uses port 110, and Internet Message Access Protocol uses port 143, all over TCP."
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
      "explanation": "SMTP relies on TCP port 25 for sending and relaying email."
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
      "explanation": "DHCP (UDP 67/68), TFTP (UDP 69), SNMP (UDP 161), and L2TP (UDP 1701) all use UDP as their transport protocol."
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
      "explanation": "DNS utilizes port 53 and can operate over both TCP and UDP."
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
      "explanation": "FTP uses two separate TCP connections: port 20 for data transmission and port 21 for command/control."
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
      "explanation": "FTP Control commands are sent over TCP port 21, while data transfer uses TCP port 20."
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
      "explanation": "LDAP uses TCP port 389, and SMB uses TCP ports 139 or 445 for file and printer sharing."
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
      "explanation": "L2TP uses UDP port 1701."
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
      "explanation": "Ports 1024 through 49151 are designated as User / Registered ports."
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
      "explanation": "Ports 49152 through 65535 are designated as Dynamic / Private ports."
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
      "explanation": "RDP operates over TCP port 3389."
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
      "explanation": "SNMP utilizes UDP port 161 for querying device state and status metrics."
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
      "explanation": "The primary purpose of NAT is to preserve public IP addresses by allowing private networks to reuse private address space internally."
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
      "explanation": "NAT was developed primarily to conserve and preserve limited public IPv4 addresses."
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
      "explanation": "Static NAT is a 1-to-1 translation that binds a single public IP to a single private IP, standard for web/mail servers."
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
      "explanation": "Static NAT creates a fixed 1:1 mapping between one public IP and one private IP for dedicated host access."
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
      "explanation": "Dynamic NAT translates many private IPs to many public IPs dynamically from an address pool on a first-come, first-served basis."
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
      "explanation": "Leasing addresses dynamically from an IP pool on a first-come, first-served basis is Dynamic NAT."
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
      "explanation": "PAT (Port Address Translation) maps many private IPs to a single public IP, and is commonly called NAT Overload."
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
      "explanation": "The term 'overload' in router NAT configurations refers directly to Port Address Translation (PAT)."
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
      "explanation": "Private IPv4 addresses are reserved strictly for internal private networks and cannot be routed across the public internet."
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
      "explanation": "Private addresses cannot travel or be routed over the public internet, necessitating translation to a valid public IP."
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
      "explanation": "The router's NAT translates the private source IP (192.168.1.23) into the router's public IP (203.0.113.45)."
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
      "explanation": "The router connects internal hosts to the ISP and performs NAT translation."
    }
  },
  {
    "id": "q-ftp-security",
    "moduleId": "ftp",
    "moduleName": "FTP, SFTP, & TFTP",
    "category": "FTP Characteristics",
    "primary": {
      "prompt": "Which statement accurately describes standard FTP?",
      "options": [
        "It is unsecured, uses usernames and passwords, and operates over TCP",
        "It is secured, uses anonymous access, and operates over UDP",
        "It is secured, uses usernames and passwords, and shares TCP port 22 with SSH",
        "It is unsecured, uses anonymous access, and operates over UDP port 69"
      ],
      "answer": "It is unsecured, uses usernames and passwords, and operates over TCP",
      "explanation": "FTP is unsecured, uses usernames and passwords, and operates over TCP."
    },
    "alternate": {
      "prompt": "Which file-transfer protocol uses TCP and credentials but is not secured?",
      "options": [
        "FTP",
        "SFTP",
        "TFTP",
        "SSH"
      ],
      "answer": "FTP",
      "explanation": "Standard FTP uses usernames and passwords over TCP but is unsecured."
    }
  },
  {
    "id": "q-ftp-sftp-port",
    "moduleId": "ftp",
    "moduleName": "FTP, SFTP, & TFTP",
    "category": "SFTP Characteristics",
    "primary": {
      "prompt": "SFTP shares which TCP port with SSH?",
      "options": [
        "TCP port 20",
        "TCP port 21",
        "TCP port 22",
        "UDP port 69"
      ],
      "answer": "TCP port 22",
      "explanation": "SFTP uses TCP and shares port 22 with SSH."
    },
    "alternate": {
      "prompt": "Which port number is associated with both SFTP and SSH?",
      "options": [
        "20",
        "21",
        "22",
        "69"
      ],
      "answer": "22",
      "explanation": "Both SFTP and SSH use TCP port 22."
    }
  },
  {
    "id": "q-tftp-characteristics",
    "moduleId": "ftp",
    "moduleName": "FTP, SFTP, & TFTP",
    "category": "TFTP Characteristics",
    "primary": {
      "prompt": "Which combination describes TFTP?",
      "options": [
        "TCP, usernames and passwords, ports 20 and 21",
        "TCP, usernames and passwords, port 22",
        "UDP, anonymous access, port 69",
        "UDP, usernames and passwords, port 21"
      ],
      "answer": "UDP, anonymous access, port 69",
      "explanation": "TFTP uses UDP, is anonymous, and operates on port 69."
    },
    "alternate": {
      "prompt": "Which file-transfer protocol operates on UDP port 69 and does not require user credentials?",
      "options": [
        "FTP",
        "SFTP",
        "TFTP",
        "SSH"
      ],
      "answer": "TFTP",
      "explanation": "TFTP is anonymous and uses UDP port 69."
    }
  },
  {
    "id": "q-ftp-protocol-comparison",
    "moduleId": "ftp",
    "moduleName": "FTP, SFTP, & TFTP",
    "category": "Protocol Comparison",
    "primary": {
      "prompt": "Which protocol is anonymous and uses UDP for file transfer?",
      "options": [
        "FTP",
        "SFTP",
        "TFTP",
        "SSH"
      ],
      "answer": "TFTP",
      "explanation": "TFTP is the anonymous file-transfer protocol in this set and uses UDP."
    },
    "alternate": {
      "prompt": "A file transfer requires UDP and anonymous access. Which protocol matches these requirements?",
      "options": [
        "FTP",
        "SFTP",
        "TFTP",
        "SSH"
      ],
      "answer": "TFTP",
      "explanation": "TFTP uses UDP and anonymous access."
    }
  },
  {
    "id": "q-ftp-flashcard-definition",
    "moduleId": "ftp",
    "moduleName": "FTP, SFTP, & TFTP",
    "category": "FTP Characteristics",
    "primary": {
      "prompt": "Which protocol is an unsecured, credential-based file-transfer protocol that uses TCP?",
      "options": ["FTP", "SFTP", "TFTP", "SCP"],
      "answer": "FTP",
      "explanation": "FTP uses usernames and passwords over TCP but is unsecured."
    },
    "alternate": {
      "prompt": "A file-transfer service uses TCP and usernames and passwords without security. Which protocol is it?",
      "options": ["FTP", "SFTP", "TFTP", "SCP"],
      "answer": "FTP",
      "explanation": "Standard FTP is unsecured, credential-based, and uses TCP."
    }
  },
  {
    "id": "q-sftp-flashcard-definition",
    "moduleId": "ftp",
    "moduleName": "FTP, SFTP, & TFTP",
    "category": "SFTP Characteristics",
    "primary": {
      "prompt": "Which secured file-transfer protocol uses TCP, usernames and passwords, and shares port 22 with SSH?",
      "options": ["FTP", "SFTP", "TFTP", "SCP"],
      "answer": "SFTP",
      "explanation": "SFTP is secured, uses TCP and credentials, and shares TCP port 22 with SSH."
    },
    "alternate": {
      "prompt": "Which protocol matches secured TCP file transfer with credentials and SSH's port?",
      "options": ["FTP", "SFTP", "TFTP", "SCP"],
      "answer": "SFTP",
      "explanation": "SFTP uses TCP, usernames and passwords, and TCP port 22."
    }
  },
  {
    "id": "q-tftp-flashcard-definition",
    "moduleId": "ftp",
    "moduleName": "FTP, SFTP, & TFTP",
    "category": "TFTP Characteristics",
    "primary": {
      "prompt": "Which anonymous file-transfer protocol uses UDP and operates on port 69?",
      "options": ["FTP", "SFTP", "TFTP", "SCP"],
      "answer": "TFTP",
      "explanation": "TFTP uses UDP, is anonymous, and operates on UDP port 69."
    },
    "alternate": {
      "prompt": "Which protocol provides anonymous file transfer over UDP port 69?",
      "options": ["FTP", "SFTP", "TFTP", "SCP"],
      "answer": "TFTP",
      "explanation": "TFTP is anonymous and uses UDP port 69."
    }
  },
];
