# ENT Study Guide for TTC ENT 2026

## OSI Model
OSI Model stands for Open Systems Interconnection Model. It has 7 layers, normally referenced from 7 down to 1:
7. [Application](#application-layer)
6. [Presentation](#presentation-layer)
5. [Session](#session-layer)
4. [Transport](#transport-layer)
3. [Network](#network-layer)
2. [Data-Link](#data-link-layer)
1. [Physical](#physical-layer)

### Physical Layer
This layer is what happens physically - it's where raw bits of information are sent across a physical medium like a 
copper/fiber wire or a radio signal. This happens on cables, antennas, and hubs.

### Data-Link Layer
This layer handles communication between devices over a local network and connects the physical layer to the 
Network layer. Switches typically operate at this layer. This layer has 2 parts:
- LLC: Logical Link Control - More on this later.
- MAC - Media Access Control - Handles Layer 2 addressing using MAC addresses, AKA physical addresses; involves NIC cards, NIC drivers, and switches. NIC stands for Network Interface Card.

### Network Layer
This layer deals with routing and logical addresses. Involves routers and IP addresses (IPV4/IPV6). Routers perform 
routing and switches perform switching in this layer.

### Transport Layer
This layer provides reliable end-to-end flow control and error correction/detection. It manages communication between applications
running on different devices using TCP/UDP protocols.

### Session Layer
Manages (starts, stops, maintains) connections.

### Presentation Layer
This layer handles translation and encryption of the data.

### Application Layer
Provides network services directly to applications. This is the layer closest to the end user.

## Networking Tools
The following are the main tools used in networking:
- Cable Stripper
  - Strips the outer plastic of a cable
- Wire Crimper
  - Crimps ends of twisted pair cables
- Cable Tester
  - Tests netowrk cables by testing continuity across every pin on both ends
- Tone Generator
  - Finds the other end of a cable by generating a tone when near the other end of the cable plugged into it.
- TDR (Time Domain Reflectometer)
  - Finds breaks in copper cables by sending electrical pluses and measuring how far they go
- OTDR (Optical Time Domain Reflectometer)
  - Finds breaks in fiber optic cables by sending light pulses and measuring how far they go
- Light Meter
  - Measures light in optical cables. Requires a light source device on one end. Fiber optic cables only.
- Loopback Adapter
  - Tests physical ports
- Butt Set
  - Used to test and monitor phone lines
- Punch Down Tool 
  - Seats wires down into a block and cuts off excess wire automatically
- Multimeter
  - Measures electricity in a wire
