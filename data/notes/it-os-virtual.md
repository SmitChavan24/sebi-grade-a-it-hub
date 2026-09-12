# Virtual Memory and Page Replacement

## Idea

Execute a process that is **not entirely in memory**. Benefits: larger logical address space than physical memory, higher degree of multiprogramming, faster process start, and easy sharing via **copy-on-write**.

Implemented by **demand paging**: a page is brought in only when referenced. A reference to a page marked invalid causes a **page fault**.

## Page fault handling

```
1. Trap to the OS
2. Check whether the reference is legal; if not, terminate
3. Find a free frame (or select a victim via the replacement algorithm)
4. If the victim is dirty, write it out
5. Read the required page from disk into the frame
6. Update the page table (valid bit, frame number)
7. Restart the instruction that faulted
```

**Effective Access Time = (1 − p) × memory access + p × page-fault service time**, where p is the page fault rate. Because page fault service time is in milliseconds and memory access in nanoseconds, even p = 0.001 degrades performance dramatically — a favourite numerical.

## Page replacement algorithms

| Algorithm | Rule | Note |
|---|---|---|
| **FIFO** | Replace the oldest page | Suffers **Belady's anomaly** — more frames can mean more faults |
| **Optimal (OPT/MIN)** | Replace the page not used for the longest time in future | Theoretical benchmark only |
| **LRU** | Replace the least recently used | Good approximation of OPT; needs counters or a stack; a **stack algorithm**, so no Belady's anomaly |
| **LRU approximations** | Reference-bit, **second chance (clock)**, enhanced second chance (reference + dirty bit) | What real systems use |
| **LFU / MFU** | By frequency of use | Poor performers in practice |

**Belady's anomaly** occurs in **FIFO** (and can in second-chance), never in **stack algorithms** like LRU and OPT.

## Frame allocation

- **Equal, proportional (by process size), and priority-based** allocation.
- **Global replacement** — a process may take a frame from another; **local replacement** — only from its own set. Global gives better throughput but unpredictable per-process behaviour.

## Thrashing

A process spends more time paging than executing. Cause: **too few frames for its active working set**, usually because the degree of multiprogramming is too high. Symptom: CPU utilisation collapses while disk activity saturates — and a naive scheduler responds by admitting *more* processes, making it worse.

**Solutions:**
- **Working set model** — track the set of pages referenced in the last Δ references; allocate enough frames for it; suspend processes if the sum of working sets exceeds available frames.
- **Page fault frequency (PFF)** — set an upper and lower bound on the fault rate; give frames when above, take frames away when below.

**Locality of reference** — temporal and spatial — is what makes all of this work.

## Related

**Copy-on-write** in `fork()`; **memory-mapped files**; **page buffering**; **prepaging**; **TLB shootdown** in multiprocessors.

---

## Exam pointers

1. **Belady's anomaly: FIFO yes, LRU/OPT no.**
2. OPT is not implementable — it is the yardstick.
3. Thrashing is a **frame-allocation** problem, not a disk problem.
4. Learn the EAT formula with page faults and practise with p = 10⁻³ style numbers.
5. Second chance = FIFO + reference bit; enhanced second chance also uses the **dirty** bit.
