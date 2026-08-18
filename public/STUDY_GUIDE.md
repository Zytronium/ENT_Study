# ENT Study Guide for TTC ENT 2026

## OSI Model
OSI Model stands for Open Systems Interconnection Model. It has 7 layers, normally referenced from 7 down to 1:  
​7. [Application](#application-layer)  
​6. [Presentation](#presentation-layer)  
​5. [Session](#session-layer)  
​4. [Transport](#transport-layer)  
​3. [Network](#network-layer)  
​2. [Data-Link](#data-link-layer)  
​1. [Physical](#physical-layer)  

### Physical Layer
This layer is what happens physically - it's where raw bits of information are sent across a physical medium like a 
copper/fiber wire or a radio signal. This happens on cables, antennas, and hubs; remember that those are layer 1 devices.

### Data-Link Layer
This layer handles communication between devices over a local network and connects the physical layer to the 
Network layer. Switches typically operate at this layer. This layer has 2 parts:
- LLC: Logical Link Control - More on this later.
- MAC - Media Access Control - Handles Layer 2 addressing using MAC addresses, AKA physical addresses; involves NIC cards, NIC drivers, and switches. NIC stands for Network Interface Card.

Switches primarily perform switching at this layer. Remember that switches are layer 2 devices.

### Network Layer
This layer deals with routing and logical addresses. Involves routers and IP addresses (IPV4/IPV6). Routers perform 
routing in this layer. Remember that routers are layer 3 devices.

### Transport Layer
This layer provides reliable end-to-end flow control and error correction/detection. It manages communication between applications
running on different devices using TCP/UDP protocols. TCP provides reliable, ordered delivery, while UDP provides faster 
connectionless communication without TCP's reliability guarantees.

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

## Modems VS Routers

### Modems
Modems are devices that provide the **physical connection** to the ISP (Internet Service Provider). They demodulate
incoming analog signals into digital singals and modulate outgoing digital signals into analog signals.

There are 2 types of modems:
- Cable Modems - Use coaxial cables
- DSL Modems - Use phone lines

You can remember the difference this way: *Cable* modems use ***cables*** and DSL (Digital Subscriber _Line_) modems use 
**phone *lines***.

### Routers
Routers are devices that provide the **logical connection** to the ISP and connect all your devices on the network to 
the ISP.

## EIA/TIA 568B Standard Specification
The EIA/TIA 568B standard specifies the order of wires in a CAT5/CAT6 cable connector. This order is, from top to 
bottom, pins 1 to 8:

| Wire Color          | Mnemonic       |
|---------------------|----------------|
| Orange/white stripe | Sun rays       |
| Orange              | Sun            |
| Green/white stripe  | Aliens!!       |
| Blue                | Sky            |
| Blue/white stripe   | Water/rain     |
| Green               | Plants         |
| Brown/white         | Tilled dirt    |
| Brown               | Dirt           |

It should be noted that while we memorize it bottom to top, the top is pin 1 and bottom is pin 8.

## Physical Layer in depth - Bits, Nibbles, and Bytes

### Bits
Abbreviated as lowercase `b`, bits are a single 1 or 0 - on or off. Bits are what make up binary code. Data throughput,
or more simply but less accurately put, data speed, is measured in bits per second (or kilobits, megabits, etc.).
1,000 bits make up a kilobit (Kb).
1,000 kilobits make up a megabit (Mb).
After that is gigabits (Gb), then terrabits (Tb), petabits (Pb), exabits (Eb), and so on.

### Nibbles
Nibbles are made of 4 bits. There isn't a standard abbreviation for nibbles, but you may sometimes see "nib," "nybble", 
or "N" used informally. You won't normally see anything like kN or kilonibble ever used, and there's no standard for 
this.

### Bytes
Bytes are made of 8 bits or 2 nibbles. Abbreviated as uppercase `B`, bytes are what data storage is measured in.
1,024 bytes make a kilobyte (KB). 
1,024 kilobytes make a megabyte (MB).
After that is gigabytes (GB), then terabytes (TB), petabytes (PB), exabytes (EB), etc.

> **Fun Fact**:
> There's also kibibytes (KiB), mebibytes (MiB), etc. It is actually a common misconception (and often accepted as true, including in this class) that KB, MB, etc. are 1,024, but in reality they are actually 1,000, while KiB, MiB, etc. are 1,024. However, these distinctions are rarely used in everyday networking, and we don't care about them in this class. Therefore, for this class, you should ignore this fact and treat the above info as true instead.

> **Another Fun Fact**:
> A lowercase `k` for 'kilo' is technically more correct in "kb" and "kB" instead of "Kb" and "KB", but it doesn't matter much. This only applies to 'kilo.'

### Counting Bits / Calculating Binary

**IMPORTANT:** MEMORIZE THIS TABLE:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-----|----|----|----|---|---|---|---|

To calculate the value of a binary number, place the sequence of 1's and 0's at the right end of the table like so:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-----|----|----|----|---|---|---|---|
| 0   | 0  | 1  | 0  | 0 | 1 | 0 | 1 |

In this example, 00000101 is placed in the table. Start at the right side; for each 1 in the binary, add
the number at the top of the table in that digit's column to the total. In this example, that would be adding 1, 4, and 
32, which means 00100101 in binary has a value of 37. This also works for shorter binary sequences, like 1001:

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|-----|----|----|----|---|---|---|---|
|     |    |    |    | 1 | 0 | 0 | 1 |

1 + 8 = 9, so 1001 = 9.

Despite only having 2 on bits, this is still a 4-bit number. The number of bits don't change based on how many 1's there
are, only the value of the binary number does.

This table can also be expanded indefinitely. For every column you add to the left, you double the previous number, so
to have a 9-bit binary number, we would add 256 to the left of 128.

#### Calculation Tricks

What's the value of these 3 binary numbers?
- `0001`
- `0011`
- `0111`

You don't have to keep adding 4 + 2 + 1 here. If there's a line of solid 1's on the right side and all zeros elsewhere,
the value will always be 1 less than the next digit. For example, `0111` is going to be 1 less than `1000`. Because of
this, not only can you more quickly calculate these types of binary numbers, but you also know that if there's no `1`
bits to the left of a certain digit, you know the total will ALWAYS be less than that digit. (for example, the leftmost
`1` being in the 16's place means the total value must be 15 or fewer.) This helps you eliminate wrong answers on a test
faster.

The answer to the 3 numbers above is 1, 3, and 7.

Now apply the inverse; what's the value of these numbers?
- `1000`
- `1100`
- `1110`

If there's a line of solid 1's on the left followed by all zeros, the value will always be 1 less than the next digit,
minus the value of the trailing zeros if they were ones. For example, `11111000` is 1 less than `100000000` (256), minus
8, giving 248. You can also think of it as starting with all 1's (`255` for 8 bits) and subtracting the value of the 
trailing zeros if they were ones: `11111000 = 255 - 7 = 248`.

So the answer to the 3 numbers above is 8, 12, and 14.

Finally, if you have more random looking sequences like 01101001 on a test, you can eliminate the wrong answers quickly
because a binary sequence ending in a 1 will always be an odd number, and ending in a 0 will always be even. For example,
say you have to find which binary sequence equals 27. These are your choices:  
a. `00101110`  
b. `00011011`  
c. `00010110`  
d. `01001010`  

You know B has to be correct just from looking at the last digit because a, c, and d are all even numbers, and 27 is odd. 

## Connection Types

### Simplex
Simplex is a type of connection that only allows **one** direction of communication.   
Example: Radio stations, megaphone

### Half-Duplex
Half-Duplex is a type of connection that allows **both** directions of communication, but **only one at a time**.  
Example: Humans, CB Radio, Walkie talkies, hubs

### Full Duplex
Full Duplex is a type of connection that allows **both** directions of communication **at the same time**.  
Example: Computer networks, switches, phone lines

## Network Topologies
Topology is the layout of the network. There are four main wired network topologies:
- [Star](#star)
- [Ring](#ring)
- [Bus](#bus)
- [Mesh](#mesh)

### Star
In a Star topology, all computers are connected to a central point.  
Here's a couple examples of what a Star layout would look like:  
![star1](study_guide_images/topology_star_1.webp)  
![star2](study_guide_images/topology_star_2.webp)

A star topology uses hubs/switches at the center and uses twisted pair cables with RJ45 connectors.

### Ring
A ring topology is where all computers are connected in a ring. THey use a token to talk on the network.  
Here's an example of what a Ring layout would look like:  
![ring](study_guide_images/topology_ring.webp)

### Bus
The bus topology has its computers connected in a line with a single coaxial cable, terminated on both ends. They
use BNC connectors and terminators.  
Here's an example of what a Bus layout would look like:  
![bus](study_guide_images/topology_bus.webp)

A bus topology uses thicknet (10base5) and thinnet (10base2) cables.

### Mesh
A mesh topology is where all the computers are connected to all every other computer. This is the topology of the 
internet, and is extremely redundant (in a good way).  
Here's a couple examples of what a Mesh layout would look like:  
![mesh1](study_guide_images/topology_mesh_1.webp)
![mesh2](study_guide_images/topology_mesh_2.webp)

A mesh network can be either wired or wireless.

## Wired Ethernet Standards

![10base5 breakdown](study_guide_images/base_picture_thing.webp)

### Chart

| IEEE Standard | T-Standard | Max Distance                           | Speed    | Cable Type                    | Connectors                                | notes                                                |
|---------------|------------|----------------------------------------|----------|-------------------------------|-------------------------------------------|------------------------------------------------------|
| 802.3         | 10base2    | 200m                                   | 10 Mb/s  | Thinnet (thin coax)           | T-connectors, BNC connectors, terminators |                                                      |
| 802.3         | 10base5    | 500m                                   | 10 Mb/s  | Thicknet (thick coax)         | Vampire Taps                              |                                                      |
| 802.3i        | 10baseT    | 100m                                   | 10 Mb/s  | Twisted pair, Cat3 or better  | RJ45/RJ11                                 | cheaper, started being called ethernet at this point |
| 802.3u        | 100baseT   | 100m                                   | 100 Mb/s | Twisted pair, Cat5 or better  | RJ45                                      |                                                      |
| 802.3z        | 1000baseT  | 100m                                   | 1 Gb/s   | Twisted pair, Cat5e or better | RJ45                                      | also called Gigabit ethernet                         |
| 802.3an       | 10GbaseT   | Cat5e/Cat6: 55m; Cat6a or better: 100m | 10 Gb/s  | Twisted pair                  | RJ45                                      |                                                      |

## Patch Cables vs Crossover Cables

### Patch Cables
Also known as straight cables, these are ethernet cables that follow the same 568A or 568B standard on both terminated 
ends. They are used to connect two dissimilar devices, such as a PC and a router, router and switch, etc.

### Crossover Cables
These are ethernet cables that use both standards - 568A on one end and 568B on the other. These less common cables
are used to connect 2 similar devices, such as a PC to another PC.

Modern Ethernet equipment usually supports Auto-MDI/MDIX, which automatically detects and compensates for crossed pairs.
As a result, crossover cables are much less commonly needed today.

**Important miscellanous note**: Shielded twisted pair cables should be used in industrial areas, while unshielded
twisted pair cables belong everywhere else. The difference between the two is that shielded twisted pair cables have 
another layer of shielding around the twisted pair wires underneath the outer jacket plastic.

## Cable Ratings

PVC is the outer jacket plastic of a cable. 

Ethernet cable materials come in 3 forms:
- Plenum
- Riser
- CM (communications multipurpose)

### Plenum (CMP) Cables
These are used in plenum areas. Plenum areas are the spaces in buildings used for air circulation in HVAC systems, 
typically found above drop ceilings or below raised floors, where smoke and fire can spread rapidly through the building's 
air-handling space. Plenum-rated cables are made with fire-resistant materials that produce less smoke and toxic fumes 
when burned, meeting strict fire safety codes required for installation in plenum areas. Plenum cables are also known
as CMP: Communications Multipurpose Plenum. 

Non-plenum cables are not as fire-resistant and should not be used in plenum areas.

### Riser (CMR) Cables

Riser cables are designed to run vertically between floors in non-plenum spaces, such as within walls or elevator
shafts. These cables are specifically rated to prevent the vertical spread of fire from one floor to another. They have
flame-retardant properties that are less stringent than plenum cables but more robust than standard CM cables, making
them ideal for multi-story buildings where cables need to traverse between floors. Riser cables must meet certain fire
safety standards. You can remember that CMR is called "riser" because CMR cables run vertically up and between floors.

### CM (general use) Cables
Communications Multipurpose (or CM) cables have minimal fire restrictions and are the cheapest cables, but can produce
very toxic fumes when burnt. They are designed for general everyday use.

## ESD, EMI, & EMP

### ESD
ESD stands for electrostatic discharge. ESD is essentially a static electricity zap and can be destructive to electronics.

### EMI
EMI stands for electromagnetic interference. EMIs are (sometimes) temporary disturbances that may take out or interfere 
with your Wi-Fi or disrupt electronics briefly. They can be caused by things like storms, generators, power lines, etc.

### EMP
EMP stands for electromagnetic pulse. These are very destructive. They can be caused by lightning strikes (very small 
area of effect) or nuclear explosions (extremely large area of effect). 

## Wireless 802.11

Wireless uses radio frequencies to transmit without wires. They operate on 2.4 GHz and 5 GHz frequencies. Newer
WiFi standards (like WiFi 7) can also operate on 6 GHz, but those are new enough that you likely won't be tested on them.

### 2.4 GHz

* Has 11 channels total, but only 3 don't overlap.
* Channels 1, 6, and 11 do not overlap.
* Slower than 5 GHz 
* Goes farther than 5GHz and can more easily penetrate solid objects like walls.
* More interference than 5GHz due to many other devices operating on this frequency, such as microwaves, Bluetooth 
headphones, or cordless telephones.

### 5 GHz

* Has 25 **non-overlapping** channels.
* Generally faster than 2.4GHz
* Goes a shorter distance than 2.4GHz and can't easily penetrate solid objects.
* Less interference than 2.4GHz due to fewer devices operating on this frequency.

### Security
Wi-Fi networks can operate with different types of security:

* ⚠ **Open**
  * No password = no security.
  * Hackers can steal your data
  * Some open networks can be malicious honeypots
  * **Do not connect!**

* ⚠ **WEP - Wired Equivalent Privacy**
  * Easily hackable 
  * Not secure.

* ⚠ **WPA - Wi-Fi Protected Access**
  * Uses TKIP keys = not secure (anymore)
  * Easily hackable

* ✓ **WPA2**
  * Uses AES.
  * Used by the US Department of Defense.
  * Secure (for now).

* ✓ **WPA3**
  * New and cutting edge (2018).
  * Secure (for now).

* ⚠ **WPS**
  * Easy to set up
  * Very insecure

## Wireless WiFi St/ndards

Speeds and distances shown are advertized speed and distances under perfect lab conditions.

| Version | IEEE Standard | Frequency       | Speed    | Distance |
|---------|---------------|-----------------|----------|----------|
| Wi-Fi   | 802.11        | 2.4 GHz         | 2 Mb/s   | 100 ft   |
| Wi-Fi 1 | 802.11b       | 2.4 GHz         | 11 Mb/s  | 100 ft   |
| Wi-Fi 2 | 802.11a       | 5 GHz           | 54 Mb/s  | 100 ft   |
| Wi-Fi 3 | 802.11g       | 2.4 GHz         | 54 Mb/s  | 125 ft   |
| Wi-Fi 4 | 802.11n       | 2.4 GHz + 5 GHz | 600 Mb/s | 225 ft   |
| Wi-Fi 5 | 802.11ac      | 5 GHz           | 1 Gb/s   | 90 ft    |
| Wi-Fi 6 | 802.11ax      | 2.4 GHz + 5 GHz | 14 Gb/s  | 100 ft   |

Wi-Fi 7 will likely not be tested on but is under 802.11be, operates on 2.4 GHz, 5 GHz, AND 6 GHz, 
and can reach up to 46 Gb/s. Wi-Fi 8 will not eb tested on either as it is not planned to release 
until 2028; Wi-Fi 8 is under 802.11bn.

## Wired vs Wireless

### Wired
- Reliable
- Secure
- Not mobile

Contention Method (traffic control): CSMA/CD (Carrier Sense Multiple Access with Collision _Detection_)

### Wireless
- Unreliable
- Less secure
- Mobile

Contention method: CSMA/CA (Carrier Sense Multiple Acces with Collision _Avoidance_)
