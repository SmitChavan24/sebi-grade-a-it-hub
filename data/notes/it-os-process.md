# Processes and Threads

## Process

A program **in execution** — an active entity with a program counter, stack, data section and heap. A program is passive (a file on disk); a process is active.

## Process states

```
new -> ready -> running -> terminated
            ^        |
            |        v
          waiting (I/O or event)
```

Plus **suspended-ready** and **suspended-blocked** when swapped out.

## PCB — Process Control Block

The kernel's record for a process: **PID, process state, program counter, CPU registers, scheduling information (priority, pointers to queues), memory-management information (page/segment tables), accounting information, I/O status (open files, devices)**.

**Context switching** = saving the PCB of the running process and loading another's. It is **pure overhead** — no useful work is done during a switch. Time depends on hardware support (register sets).

## Schedulers

| Scheduler | Also called | Job |
|---|---|---|
| **Long-term** | Job scheduler | Admits jobs from the job pool to the ready queue; controls the **degree of multiprogramming** |
| **Short-term** | CPU scheduler | Picks the next process to run; invoked very frequently (ms) |
| **Medium-term** | Swapper | Swaps processes out of memory and back to reduce the degree of multiprogramming |

**Dispatcher** — the module that actually gives the CPU to the selected process; **dispatch latency** is the time it takes.

## Threads

A thread is a **lightweight process**: its own **program counter, register set and stack**, but it **shares code, data and open files** with other threads of the same process.

| | Process | Thread |
|---|---|---|
| Address space | Own | Shared |
| Creation cost | High | Low |
| Context switch | Expensive (memory map change) | Cheap |
| Communication | IPC required | Shared memory (needs synchronisation) |
| Fault isolation | One crash does not kill others | One thread crashing can kill the process |

**Multithreading models:** many-to-one (user threads on one kernel thread; one blocking call blocks all), one-to-one (Windows, Linux), many-to-many.

**User-level threads** — fast, managed by a library, but the kernel cannot schedule them individually. **Kernel-level threads** — slower to create but truly parallel on multiple cores.

## Inter-process communication

- **Shared memory** — fastest; the processes must synchronise themselves.
- **Message passing** — send/receive; easier in distributed systems; blocking vs non-blocking; direct vs indirect (mailboxes).
- Unix mechanisms: **pipes** (unidirectional, related processes), **named pipes/FIFO**, **message queues**, **shared memory segments**, **sockets**, **signals**.

## Special process states

- **Zombie** — the child has terminated but the parent has not yet called wait(); the entry stays in the process table.
- **Orphan** — the parent terminated first; the child is adopted by **init/systemd** (PID 1).

---

## Exam pointers

1. Threads share **code, data, files**; they do **not** share stack and registers.
2. **Long-term scheduler controls the degree of multiprogramming.**
3. Context switch time is overhead and depends on hardware register support.
4. Zombie = terminated but not reaped; orphan = parent died first.
5. Shared memory is faster than message passing but needs explicit synchronisation.
