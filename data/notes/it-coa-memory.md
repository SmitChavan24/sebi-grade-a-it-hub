# Memory Hierarchy and Cache

## The hierarchy

```
Registers      (fastest, smallest, most expensive per bit)
L1 / L2 / L3 cache (SRAM)
Main memory    (DRAM)
SSD / Disk
Tape / archival (slowest, largest, cheapest)
```

As you go down: **capacity and cost-efficiency increase; speed decreases**. The hierarchy works because of **locality of reference** — **temporal** (recently used data will be used again) and **spatial** (nearby addresses will be used soon).

**SRAM vs DRAM:** SRAM uses flip-flops (6 transistors), is fast, expensive, and needs no refresh — used for cache. DRAM uses a capacitor per bit, is dense and cheap, and **must be refreshed** periodically — used for main memory.

**ROM family:** ROM, PROM (one-time), EPROM (UV erase), EEPROM (electrical erase), **Flash** (block erase; NAND vs NOR).

## Cache mapping

| Mapping | Placement | Comparators | Flexibility |
|---|---|---|---|
| **Direct mapped** | Block goes to exactly one line: (block number) mod (number of lines) | 1 | Least; conflict misses |
| **Fully associative** | Anywhere | One per line (expensive) | Most |
| **k-way set associative** | Anywhere within one set | k | Practical compromise |

**Address breakdown:**
- Direct mapped: **Tag | Line (index) | Block offset**
- Set associative: **Tag | Set index | Block offset**
- Fully associative: **Tag | Block offset**

> **Worked example.** 32-bit address, cache 64 KB, block size 16 bytes, 4-way set associative.
> Block offset = log₂16 = **4 bits**. Number of blocks = 64 KB/16 B = 4096. Sets = 4096/4 = 1024 → set index = log₂1024 = **10 bits**. Tag = 32 − 10 − 4 = **18 bits**.

**Replacement policies:** LRU, FIFO, random, LFU. Direct-mapped caches need **no replacement policy** — there is only one candidate line.

**Write policies:**
- **Write-through** — write to cache and memory simultaneously; simple, consistent, more traffic. Often paired with a **write buffer**.
- **Write-back** — write only to cache, mark the line **dirty**, write to memory on eviction; less traffic, more complex, risk on power failure.
- On a write miss: **write-allocate** (fetch then write) vs **no-write-allocate** (write straight to memory).

## Performance

**Average Memory Access Time (AMAT) = Hit time + Miss rate × Miss penalty**

For multiple levels: AMAT = H₁ + M₁ × (H₂ + M₂ × (H₃ + M₃ × memory time)).

**The three Cs of misses:**
- **Compulsory** (cold start) — first access; reduced by prefetching or larger blocks.
- **Capacity** — cache too small; reduced by a bigger cache.
- **Conflict** — too many blocks mapping to the same set; reduced by **higher associativity**. Fully associative caches have no conflict misses.

**Cache coherence** in multiprocessors: the **MESI protocol** (Modified, Exclusive, Shared, Invalid), snooping vs directory-based schemes. **False sharing** — two cores updating different variables in the same cache line, causing needless invalidation traffic.

---

## Exam pointers

1. Practise the **address-split calculation** until it is automatic; it appears every year.
2. **Direct mapped needs no replacement policy.**
3. **AMAT = hit time + miss rate × miss penalty.**
4. **Three Cs: compulsory, capacity, conflict** — and which cache change fixes each.
5. **Write-back marks lines dirty**; write-through keeps memory always current.
