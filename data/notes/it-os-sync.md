# Process Synchronisation

## The problem

When multiple processes access shared data concurrently, the outcome depends on the **order of execution** — a **race condition**. Classic example: two threads both doing `counter++` on a shared counter can lose one increment, because `counter++` is really load, increment, store.

## Critical section

The section of code accessing shared resources. A correct solution must satisfy:

1. **Mutual exclusion** — at most one process in its critical section.
2. **Progress** — if no process is in the CS, selection of the next entrant cannot be postponed indefinitely by processes not wanting to enter.
3. **Bounded waiting** — a bound exists on how many times others enter before a waiting process gets in.

(Assumptions about relative speed must not be made.)

## Software solutions

- **Peterson's solution** — two processes, uses `flag[2]` and `turn`. Satisfies all three conditions. Modern CPUs with instruction reordering can break it without memory barriers.
- **Dekker's algorithm** — the original two-process solution.
- **Bakery algorithm (Lamport)** — n processes, "take a ticket".

## Hardware support

**TestAndSet**, **CompareAndSwap (CAS)**, **Swap/Exchange** — atomic instructions. A **spinlock** built on these busy-waits, which is fine for very short critical sections on multiprocessors and wasteful otherwise.

## Semaphores

An integer variable accessed only through two atomic operations:

```
wait(S) / P(S):   while (S <= 0) ; S--;
signal(S) / V(S): S++;
```

- **Binary semaphore (mutex)** — value 0 or 1.
- **Counting semaphore** — counts available instances of a resource.
- A proper implementation uses a **waiting queue** and block/wakeup rather than busy waiting.

**Mutex vs semaphore:** a mutex has **ownership** — only the locking thread may unlock it. A semaphore is a signalling mechanism and may be signalled by any thread.

## Classic problems

| Problem | Point it teaches |
|---|---|
| **Producer–Consumer (bounded buffer)** | Uses `full`, `empty` counting semaphores and a `mutex`; wrong ordering of wait() calls causes deadlock |
| **Readers–Writers** | Multiple readers may share; writers need exclusive access; first/second variants cause reader or writer starvation |
| **Dining Philosophers** | Deadlock and starvation; solutions: allow at most n−1 to sit, pick up both forks atomically, or make one philosopher left-handed |
| **Sleeping Barber** | Synchronising a limited waiting room |

## Monitors

A high-level construct: shared data plus procedures, with **only one process active inside the monitor at a time**, enforced by the compiler/runtime. **Condition variables** support `wait()` and `signal()`. Signalling disciplines: **signal-and-wait** (Hoare) vs **signal-and-continue** (Mesa — used by Java, which is why you loop on the condition rather than using `if`).

Java's `synchronized` keyword and `wait()/notify()` are a monitor implementation.

---

## Exam pointers

1. The three requirements: **mutual exclusion, progress, bounded waiting**.
2. Peterson's solution works for **two** processes.
3. A mutex has **ownership**; a semaphore does not.
4. In producer-consumer, always `wait(empty)` then `wait(mutex)` — reversing them deadlocks.
5. Monitors put mutual exclusion in the **compiler/language**, not in the programmer's hands.
