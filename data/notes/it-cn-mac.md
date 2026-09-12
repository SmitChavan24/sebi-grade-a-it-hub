# MAC Sublayer, Ethernet and LAN Devices

## Multiple access protocols

```
Random access:   ALOHA, Slotted ALOHA, CSMA, CSMA/CD, CSMA/CA
Controlled:      Reservation, Polling, Token passing
Channelisation:  FDMA, TDMA, CDMA
```

**Efficiency:** Pure ALOHA maximum throughput **18.4%** (S = G·e^(−2G)); Slotted ALOHA **36.8%** (S = G·e^(−G)). These two numbers are asked directly.

## CSMA variants

- **1-persistent** — transmit as soon as the channel is idle (high collision chance).
- **Non-persistent** — wait a random time, then sense again.
- **p-persistent** — for slotted channels; transmit with probability p.

**CSMA/CD (Ethernet):** sense, transmit, and keep listening; on collision send a **jam signal** and back off using **binary exponential backoff** (wait a random number of slot times in [0, 2^n − 1], n capped at 10, give up after 16 attempts).

**Minimum frame size** for collision detection: transmission time must be at least **2 × propagation delay**, which is why Ethernet has a **64-byte minimum frame** and a maximum segment length.

**CSMA/CA (Wi-Fi):** collisions cannot be detected on a half-duplex radio, so they are **avoided** — IFS, contention window, **RTS/CTS** handshake, and ACKs. Solves the **hidden terminal** problem (**exposed terminal** is the mirror problem).

## Ethernet

- **MAC address** — 48 bits, written as 6 hex pairs. First 24 bits = **OUI** (manufacturer). A broadcast address is `FF:FF:FF:FF:FF:FF`. **Unicast/multicast** is indicated by the least significant bit of the first byte.
- **Frame format:** Preamble (7B) + SFD (1B) + Destination (6B) + Source (6B) + Type/Length (2B) + Data (46–1500B) + FCS (4B). Minimum frame **64 bytes**, maximum **1518 bytes**; **MTU = 1500 bytes**.
- Standards: 10Base5, 10Base2, **10BaseT**, 100BaseTX (Fast Ethernet), 1000BaseT (Gigabit), 10GBase.

## Switches vs hubs vs bridges

| | Hub | Switch |
|---|---|---|
| Layer | 1 | 2 |
| Collision domains | **One** for all ports | **One per port** |
| Broadcast domains | One | One (unless VLANs) |
| Forwarding | Flood everything | **MAC address table**, forward selectively |
| Duplex | Half | Full |

**Switch operation:** learn source MAC → port mapping; forward if known, **flood** if unknown; **filter** if the destination is on the same port. **Switching methods:** store-and-forward, cut-through, fragment-free.

**STP — Spanning Tree Protocol (802.1D)** prevents loops (and therefore broadcast storms) by blocking redundant links; **RSTP** converges faster.

## VLAN

A **VLAN** creates separate **broadcast domains** on one physical switch. Inter-VLAN traffic must go through a **router or L3 switch**. **802.1Q** adds a 4-byte tag to the Ethernet frame; a **trunk** port carries multiple VLANs, an **access** port carries one.

## ARP and friends

- **ARP** — IP → MAC, within a LAN; broadcast request, unicast reply; cached in the ARP table. **Gratuitous ARP**, **proxy ARP**, and **ARP spoofing/poisoning** as the attack.
- **RARP / BOOTP / DHCP** — MAC → IP (DHCP has replaced the older two).

---

## Exam pointers

1. **Pure ALOHA 18.4%, Slotted ALOHA 36.8%.**
2. Ethernet minimum frame **64 bytes**, MTU **1500 bytes**.
3. A switch gives **one collision domain per port**, but **one broadcast domain** unless VLANs are used.
4. Binary exponential backoff: random wait in **[0, 2^n − 1]** slots, up to 16 attempts.
5. **ARP maps IP to MAC** — and ARP spoofing is the classic LAN attack because ARP has no authentication.
