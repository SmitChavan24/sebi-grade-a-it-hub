# Physical Layer, Media, Topologies and Switching

## Transmission media

| Medium | Notes |
|---|---|
| **Twisted pair (UTP/STP)** | Cat 5e (1 Gbps), Cat 6/6a (10 Gbps), 100 m limit; cheap, susceptible to EMI |
| **Coaxial** | Older LANs, cable TV |
| **Fibre optic** | **Single-mode** (long haul, laser, small core) vs **multi-mode** (short distance, LED). Immune to EMI, highest bandwidth, hardest to tap |
| **Wireless** | Radio, microwave, infrared, satellite (GEO ~35,786 km with ~250 ms one-way delay, MEO, LEO) |

## Topologies

| Topology | Cable need | Failure impact | Notes |
|---|---|---|---|
| **Bus** | Least | Backbone failure kills all | Obsolete |
| **Star** | Medium | Hub/switch is a single point of failure | The standard today |
| **Ring** | Medium | One break can kill the ring (dual ring helps) | Token passing |
| **Mesh** | **n(n−1)/2 links** for full mesh | Highest fault tolerance | Backbone/WAN |
| **Tree / hybrid** | — | — | Hierarchical enterprise design |

**Full mesh requires n(n−1)/2 links and n−1 ports per node** — a standard one-mark calculation.

## Transmission concepts

- **Bandwidth** (Hz or bps), **throughput**, **latency**, **jitter**, **attenuation**, **noise**, **distortion**.
- **Nyquist (noiseless):** C = 2B log₂(L) bits/s for L signal levels.
- **Shannon (noisy):** C = B log₂(1 + S/N) bits/s. SNR in dB = 10 log₁₀(S/N).
- **Total delay = transmission delay + propagation delay + queuing delay + processing delay.**
  - Transmission delay = **packet size ÷ bandwidth**
  - Propagation delay = **distance ÷ propagation speed**
- **Bandwidth-delay product** = bandwidth × RTT = the number of bits "in flight" — this is why long fat pipes need large TCP windows.

## Multiplexing

**FDM** (frequency), **TDM** (time — synchronous vs statistical), **WDM/DWDM** (wavelength, for fibre), **CDM/CDMA** (code). **Statistical TDM** allocates slots on demand and is more efficient than synchronous TDM.

## Transmission modes

**Simplex** (one way), **half-duplex** (both ways, one at a time — walkie-talkie), **full-duplex** (both simultaneously). **Serial vs parallel**; **synchronous vs asynchronous**.

## Switching

| Type | How |
|---|---|
| **Circuit switching** | Dedicated path reserved end to end (telephone). Setup delay, guaranteed bandwidth, wasteful when idle |
| **Packet switching — datagram** | Each packet routed independently; may arrive out of order (the Internet) |
| **Packet switching — virtual circuit** | Path set up once, all packets follow it (MPLS, Frame Relay, ATM) |
| **Message switching** | Store and forward whole messages; obsolete |

---

## Exam pointers

1. **Full mesh = n(n−1)/2 links.**
2. **Single-mode fibre for long distance**, multi-mode for short.
3. Transmission delay depends on **bandwidth**; propagation delay on **distance**.
4. Shannon gives the theoretical maximum with noise; Nyquist assumes no noise.
5. **Statistical TDM** beats synchronous TDM because idle slots are reused.
