# Pipelining and Parallel Processing

## The idea

Overlap instruction execution like an assembly line. Classic 5-stage RISC pipeline:

```
IF (fetch) -> ID (decode/register read) -> EX (execute/ALU) -> MEM (memory) -> WB (write back)
```

**Performance:** for n instructions in a k-stage pipeline with cycle time t:
- Non-pipelined time = **n × k × t**
- Pipelined time = **(k + n − 1) × t**
- **Speedup = nk / (k + n − 1)** → approaches **k** for large n.
- **Throughput** ideally becomes one instruction per cycle.

The clock period is set by the **slowest stage** (plus register overhead) — which is why stages are balanced.

## Hazards

### 1. Structural hazard
Two instructions need the same hardware resource in the same cycle. Fixed by duplicating resources — the classic case is **separate instruction and data caches (Harvard-style)** so IF and MEM do not collide.

### 2. Data hazard
An instruction needs a result that is not ready.
- **RAW (read after write)** — the true dependency, and the common one.
- **WAR (write after read)** and **WAW (write after write)** — name dependencies, appearing with out-of-order execution; fixed by **register renaming**.

**Solutions:** **forwarding/bypassing** (route the ALU result directly to the next instruction), **stalling (pipeline bubbles)**, compiler **instruction scheduling**. A load followed immediately by a use of its result still needs **one stall cycle** even with forwarding — the **load-use hazard**.

### 3. Control hazard
A branch changes the PC, and instructions already fetched may be wrong.
**Solutions:** stall, **branch prediction** (static: always-taken/not-taken; dynamic: 1-bit and 2-bit saturating counters, branch history tables, branch target buffers, correlating predictors), **delayed branch** (fill the slot with a useful instruction), and **speculative execution** (which, incidentally, is the root of the Spectre/Meltdown class of vulnerabilities — a good cross-topic point).

## Beyond simple pipelining

- **Superscalar** — multiple instructions issued per cycle using duplicated functional units.
- **Superpipelined** — more, shorter stages and a faster clock.
- **VLIW** — the compiler packs independent operations into one long instruction.
- **Out-of-order execution** with **Tomasulo's algorithm** (reservation stations, register renaming, common data bus) and a **reorder buffer** for in-order commit.
- **SIMD** (vector instructions: SSE, AVX, NEON) and **MIMD**.
- **Multicore** and **SMT/hyper-threading** — sharing one core's resources between threads.

## Flynn's taxonomy

| | Single instruction | Multiple instruction |
|---|---|---|
| **Single data** | SISD (classic uniprocessor) | MISD (rare, fault-tolerant systems) |
| **Multiple data** | **SIMD** (vector, GPU) | **MIMD** (multicore, clusters) |

**Amdahl's law** caps parallel speedup by the serial fraction; **Gustafson's law** counters that larger problems have proportionally more parallel work, so scaling is more useful than Amdahl suggests.

---

## Exam pointers

1. **Speedup = nk / (k + n − 1)**, approaching **k**.
2. **RAW is the true dependency**; WAR/WAW are fixed by renaming.
3. **Forwarding does not eliminate the load-use stall.**
4. **Flynn: SISD, SIMD, MISD, MIMD.**
5. Separate I-cache and D-cache exist to remove a **structural hazard**.
