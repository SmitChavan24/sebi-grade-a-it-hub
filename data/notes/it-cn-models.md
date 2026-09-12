# OSI and TCP/IP Models

## OSI — seven layers (top to bottom)

| # | Layer | Job | PDU | Devices / protocols |
|---|---|---|---|---|
| 7 | **Application** | Services to the user | Data | HTTP, FTP, SMTP, DNS, DHCP, SNMP |
| 6 | **Presentation** | Translation, **encryption**, **compression** | Data | SSL/TLS (arguably), JPEG, ASCII |
| 5 | **Session** | Establish, manage, terminate sessions; **synchronisation, dialog control, checkpointing** | Data | NetBIOS, RPC, PPTP |
| 4 | **Transport** | **End-to-end** delivery, segmentation, flow and error control | **Segment** (TCP) / Datagram (UDP) | TCP, UDP, SCTP |
| 3 | **Network** | **Logical addressing and routing** across networks | **Packet** | IP, ICMP, IGMP, routers, L3 switches |
| 2 | **Data link** | Node-to-node delivery, **framing, MAC addressing, error detection** | **Frame** | Ethernet, PPP, switches, bridges, NIC |
| 1 | **Physical** | Bits on the medium | **Bit** | Cables, hubs, repeaters, modems |

Mnemonic (top-down): **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.

## TCP/IP model

| TCP/IP layer | Maps to OSI |
|---|---|
| **Application** | Application + Presentation + Session |
| **Transport** | Transport |
| **Internet** | Network |
| **Network Access / Link** | Data link + Physical |

The TCP/IP model is what the internet actually runs on; OSI is the teaching and troubleshooting reference. TCP/IP was **built first and modelled after**; OSI was modelled first and largely not implemented.

## Encapsulation

```
Application data
  + TCP header      -> Segment
  + IP header       -> Packet / Datagram
  + Frame header and trailer -> Frame
  -> bits on the wire
```

Each layer adds its own header (and the data link layer adds a trailer with the FCS). The receiving side strips them in reverse — **de-encapsulation**.

## Which device works at which layer

| Device | Layer |
|---|---|
| Hub, repeater, cable | 1 |
| Switch, bridge, NIC, access point | 2 |
| Router, L3 switch | 3 |
| Firewall | 3/4 (stateful), 7 for next-gen |
| Gateway, proxy, load balancer | up to 7 |

## Key distinctions

- **Connection-oriented vs connectionless** — TCP vs UDP; virtual circuit vs datagram at the network layer.
- **Flow control** (protect the receiver from being overrun) vs **congestion control** (protect the network) vs **error control**.
- **Node-to-node** (data link) vs **host-to-host** (network) vs **process-to-process / end-to-end** (transport).
- **Reliability** appears at both layer 2 (hop by hop) and layer 4 (end to end) — the **end-to-end argument** says the real guarantee must be at layer 4.

---

## Exam pointers

1. PDU names: **bit, frame, packet, segment**. Asked every single year.
2. **Encryption and compression → Presentation layer**; dialog control → Session layer.
3. **Transport is process-to-process**; Network is host-to-host.
4. A switch is layer 2, a router layer 3, a hub layer 1.
5. TCP/IP has **four** layers (five if you split the link layer); OSI has seven.
