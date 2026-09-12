# CPU Scheduling — Algorithms and Numericals

> This is the highest-frequency numerical topic in OS. Practise until Gantt charts are automatic.

## Criteria

| Criterion | Direction |
|---|---|
| CPU utilisation | Maximise |
| Throughput (processes/unit time) | Maximise |
| **Turnaround time** = completion − arrival | Minimise |
| **Waiting time** = turnaround − burst | Minimise |
| **Response time** = first CPU allocation − arrival | Minimise |

**Preemptive** scheduling can take the CPU away from a running process; **non-preemptive** cannot.

## Algorithms

| Algorithm | Preemptive? | Key property | Weakness |
|---|---|---|---|
| **FCFS** | No | Simplest, fair in arrival order | **Convoy effect**; bad average waiting time |
| **SJF** | No | **Provably optimal** average waiting time | Needs burst-time knowledge; starves long jobs |
| **SRTF** | Yes | Preemptive SJF | Higher context-switch overhead; starvation |
| **Priority** | Both | Flexible | **Starvation** — fixed by **ageing** |
| **Round Robin** | Yes | Time quantum q; good **response time** | q too large → FCFS; q too small → thrashing on context switches |
| **Multilevel Queue** | — | Separate queues by process type, fixed assignment | Inflexible |
| **Multilevel Feedback Queue** | Yes | Processes move between queues; approximates SJF without knowing bursts | Complex tuning |

## Worked example

Processes (arrival, burst): P1(0, 5), P2(1, 3), P3(2, 8), P4(3, 6)

**FCFS** order P1→P2→P3→P4:

| P | AT | BT | CT | TAT = CT−AT | WT = TAT−BT |
|---|---|---|---|---|---|
| P1 | 0 | 5 | 5 | 5 | 0 |
| P2 | 1 | 3 | 8 | 7 | 4 |
| P3 | 2 | 8 | 16 | 14 | 6 |
| P4 | 3 | 6 | 22 | 19 | 13 |

Average TAT = (5+7+14+19)/4 = **11.25**; average WT = (0+4+6+13)/4 = **5.75**.

**SRTF** on the same set gives a lower average waiting time — always verify by drawing the Gantt chart rather than guessing.

## Round Robin notes

With n processes and quantum q, no process waits more than **(n−1)q** time units. Every context switch costs overhead s, so effective CPU utilisation is **q/(q+s)**.

## Multiprocessor scheduling

**Load balancing** (push and pull migration), **processor affinity** (soft and hard), **gang scheduling**, and **NUMA** awareness.

## Real-time scheduling

- **Rate Monotonic (RMS)** — static priority, shorter period gets higher priority. Schedulable if utilisation ≤ n(2^(1/n) − 1); for large n this tends to **ln 2 ≈ 0.693**.
- **EDF — Earliest Deadline First** — dynamic priority; schedulable if **total utilisation ≤ 1**; optimal for uniprocessors.

---

## Exam pointers

1. **SJF is optimal** for average waiting time — but only in theory, since burst times are unknown.
2. Round Robin is chosen for **response time**, not throughput.
3. Starvation is fixed by **ageing**.
4. RMS bound ≈ **0.693** for large n; EDF bound is **1**.
5. Always compute TAT first, then WT = TAT − BT. Most errors come from skipping the Gantt chart.
