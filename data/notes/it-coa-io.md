# I/O Organisation and Buses

## I/O techniques

| Technique | CPU involvement | When used |
|---|---|---|
| **Programmed I/O (polling)** | CPU busy-waits on a status flag | Simple, low-rate devices |
| **Interrupt-driven** | Device signals when ready; CPU services it | Moderate rate, unpredictable timing |
| **DMA** | Controller moves data directly to/from memory; CPU interrupted **once at completion** | **High-volume transfers** (disk, network) |

**DMA transfer modes:** **burst** (holds the bus until done — fastest, starves the CPU), **cycle stealing** (one word at a time, using cycles the CPU does not need), **transparent** (only when the CPU is idle).

## Interrupts

**Classification:** hardware vs software; **maskable vs non-maskable (NMI)**; vectored (device supplies the vector) vs non-vectored (fixed address); internal (traps/exceptions) vs external.

**Handling:** finish the current instruction → save PC and status → disable lower-priority interrupts → fetch the vector → execute the **ISR** → restore context → return.

**Priority resolution:** **daisy chaining** (hardware priority by physical position), **polling**, or a **programmable interrupt controller** with a **priority encoder**.

**Interrupt latency** — time from the request to the first ISR instruction; critical in real-time systems.

## Memory-mapped vs isolated I/O

| | Memory-mapped I/O | Isolated (port-mapped) I/O |
|---|---|---|
| Address space | Shares the memory address space | Separate I/O address space |
| Instructions | Ordinary load/store | Special IN/OUT instructions |
| Address space cost | Consumes memory addresses | None |
| Typical of | ARM, RISC-V, most modern designs | x86 (which supports both) |

## Buses

- **Types:** address, data, control. **Synchronous** (clocked, simple, limited by the slowest device) vs **asynchronous** (handshaking, flexible).
- **Bus arbitration:** centralised (daisy chain, polling, independent request/grant) vs distributed. Concepts: bus master, bus grant, bus request.
- **Standards to recognise:** PCI → **PCIe** (serial, point-to-point lanes), **USB** (host-controlled, tiered star), SATA/NVMe, Thunderbolt, SCSI/SAS, and in embedded systems **I²C**, **SPI**, **UART**, **CAN**.

**Bus bandwidth** = bus width (bytes) × bus clock frequency. Modern high-speed interconnects are **serial with multiple lanes** rather than wide parallel buses, because parallel skew limits clock rates.

## Storage interfaces and RAID

Covered in the OS note — but remember the **RAID levels** and that RAID is **availability, not backup**: it protects against disk failure, not against deletion, corruption or ransomware.

---

## Exam pointers

1. **DMA interrupts the CPU once**, at completion.
2. **Cycle stealing** takes single bus cycles; burst mode holds the bus.
3. **NMI cannot be masked** — used for critical faults like power failure.
4. **Memory-mapped I/O uses ordinary load/store instructions.**
5. **RAID is not backup** — a one-line answer worth having ready.
