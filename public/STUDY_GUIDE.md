# ENT Study Guide for TTC ENT 2026

[< Back to Hub](/)

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
bottom, 8 to 1:

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

## Physical Layer in depth - Bits, Nibbles, and Bytes

### Bits
Abbreviated as lowercase `b`, bits are a single 1 or 0 - on or off. Bits are what make up binary code. Data throughput,
or more simply but less accurately put, data speed, is measured in bits per second (or kilobits, megabits, etc.).
1,000 bits make up a kilobit (Kb).
1,000 kilobits make up a megabit (Mb).
After that is gigabits (Gb), then terrabits (Tb), petabits (Pb), exabits (Eb), and so on.

### Nibbles
Nibbles are made of 4 bits.

### Bytes
Bytes are made of 8 bits or 2 nibbles. Abbreviated as uppercase `B`, bytes are what data storage is measured in.
1,024 bytes make a kilobyte (KB). 
1,024 kilobytes make a megabyte (MB).
After that is gigabytes (GB), then terabytes (TB), petabytes (PB), exabytes (EB), etc.

> **Fun Fact**:
> There's also kibibytes, mebibytes, etc, which are 1,000 instead of 1,024, but these are rarely used and we don't care about them in this class.

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
