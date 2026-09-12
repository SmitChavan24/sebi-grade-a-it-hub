# Data Link Layer — Framing, Error Control and Flow Control

## Responsibilities

Framing · physical (MAC) addressing · error detection and control · flow control · access control. Split into **LLC** (logical link control) and **MAC** sublayers.

## Framing

- **Character/byte stuffing** — a flag byte marks boundaries; an escape byte (ESC) is inserted before any accidental flag or ESC in the payload.
- **Bit stuffing** — after **five consecutive 1s**, the sender inserts a **0**; the receiver removes it. The flag `01111110` therefore never appears inside data. *This is a guaranteed exam question — practise stuffing and de-stuffing a given bit string.*

## Error detection

| Technique | How it works | Detects |
|---|---|---|
| **Parity** | One bit making the count of 1s even/odd | All odd numbers of bit errors; misses even |
| **2-D parity** | Parity per row and column | All 1, 2, 3-bit errors; can correct single-bit |
| **Checksum** | 1's complement sum of segments, complemented | Used by IP/TCP/UDP; weaker than CRC |
| **CRC** | Treat data as a polynomial; divide by a generator using modulo-2 (XOR) division; append the remainder | All single-bit errors, all burst errors shorter than the CRC length, and most others |

**CRC procedure:** append (degree of generator) zeros to the data, do modulo-2 division by the generator, append the remainder as the CRC. The receiver divides the whole received frame by the same generator — a **zero remainder means no detected error**.

## Error correction

- **Hamming code** — for m data bits, choose r parity bits with **2^r ≥ m + r + 1**. Parity bits sit at positions 1, 2, 4, 8, … Each parity bit covers the positions whose binary representation has that bit set. The XOR of the failing parity checks gives the **position of the erroneous bit**.
- **Hamming distance** — minimum distance d detects **d − 1** errors and corrects **⌊(d − 1)/2⌋** errors.
- **FEC vs ARQ** — forward error correction (add redundancy, no retransmission, used for satellite/wireless) vs automatic repeat request (retransmit).

## Flow control / ARQ protocols

| Protocol | Sender window | Receiver window | Efficiency |
|---|---|---|---|
| **Stop and Wait** | 1 | 1 | 1/(1 + 2a) where a = Tp/Tt |
| **Go-Back-N** | N | **1** | N/(1 + 2a) capped at 1. Discards all frames after an error |
| **Selective Repeat** | N | **N** | N/(1 + 2a). Buffers out-of-order frames; retransmits only the lost one |

**Sequence number bits:**
- Go-Back-N: window size ≤ **2^k − 1**
- Selective Repeat: window size ≤ **2^(k−1)**

**Efficiency formula:** with a = Tp/Tt, throughput = (window size) / (1 + 2a), and utilisation cannot exceed 1.

**Piggybacking** — carrying an acknowledgement inside a data frame going the other way.

---

## Exam pointers

1. **Bit stuffing: insert 0 after five 1s.**
2. CRC: remainder appended; **zero remainder at the receiver = accepted**.
3. Hamming: **2^r ≥ m + r + 1**; distance d corrects ⌊(d−1)/2⌋ errors.
4. **GBN window ≤ 2^k − 1; SR window ≤ 2^(k−1).**
5. Selective Repeat needs buffering **and** sorting at the receiver — which is its real cost.
