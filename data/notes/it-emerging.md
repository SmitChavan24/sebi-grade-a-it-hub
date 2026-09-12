# IoT, Edge and Quantum Computing

## Internet of Things

Networked physical devices with sensors and actuators. Architecture: **perception layer** (sensors) → **network layer** (connectivity) → **middleware/platform** → **application layer**.

**Protocols:** **MQTT** (lightweight publish-subscribe, the default for constrained devices), CoAP, Zigbee, **BLE**, LoRaWAN, NB-IoT, 6LoWPAN.

**Security problems:** default and hard-coded credentials, no update mechanism, weak or absent encryption, physical access, and enormous scale — which is why IoT devices are the standard building block for **DDoS botnets** (the well-known Mirai-class botnets recruited devices with default passwords). Defences: device identity and certificates, secure boot, signed OTA updates, network segmentation, and lifecycle management.

**Relevance to financial infrastructure:** mostly indirect — building management systems, CCTV, access control and UPS systems sit on the same corporate networks as critical systems, and are a common initial access vector. That is a good, non-obvious point to make.

## Edge and fog computing

Processing near the data source instead of in a distant data centre.

**Why:** latency, bandwidth cost, resilience when connectivity fails, and data-residency constraints. **Fog** is the intermediate layer between edge devices and cloud.

**Cloud vs edge trade-off:** cloud gives elastic compute and centralised management; edge gives **deterministic low latency** and local autonomy. Co-location in trading is, conceptually, edge computing for markets — compute placed as close to the event source as possible.

## Quantum computing

**Qubits** exploit **superposition** and **entanglement**; measurement collapses the state. Quantum computers are not "faster computers" — they are faster only for specific problem structures.

| Algorithm | Effect |
|---|---|
| **Shor's** | Factors integers and solves discrete logs in polynomial time → **breaks RSA, DH, ECC** |
| **Grover's** | Quadratic speedup for unstructured search → **halves effective symmetric key strength** (AES-256 stays adequate; AES-128 becomes marginal) |

**Current state:** noisy intermediate-scale devices; error correction remains the bottleneck; no cryptographically relevant quantum computer exists today.

**Why financial institutions care now — "harvest now, decrypt later":** an adversary can record encrypted traffic today and decrypt it when capability arrives. Long-lived confidential data (client records, contracts) is therefore already at risk.

**Response:**
- **Post-quantum cryptography** — NIST-standardised algorithms: **ML-KEM (Kyber)** for key establishment, **ML-DSA (Dilithium)** and SLH-DSA (SPHINCS+) for signatures.
- **Crypto-agility** — design systems so that algorithms can be replaced without re-architecting. This is the practical recommendation to give.
- **QKD** — quantum key distribution; physics-based key exchange, but requires special hardware and has limited range; not a general replacement for PQC.
- **Inventory your cryptography first** — you cannot migrate what you have not catalogued.

## Other technologies to recognise

**AR/VR/metaverse**, **digital twins**, **robotic process automation (RPA)** — heavily used for back-office reconciliation in financial firms, **5G network slicing**, **green computing** and data-centre energy efficiency.

---

## Exam pointers

1. **MQTT is the standard IoT protocol** — lightweight publish-subscribe.
2. IoT botnets exploit **default credentials**; segmentation is the practical control.
3. **Shor breaks asymmetric crypto; Grover halves symmetric strength.**
4. **"Harvest now, decrypt later"** is why PQC migration starts before quantum computers arrive.
5. The deliverable answer is **crypto-agility plus a cryptographic inventory**, not "buy QKD".
