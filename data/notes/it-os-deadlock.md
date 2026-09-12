# Deadlock

## The four necessary conditions (Coffman)

All four must hold simultaneously:

1. **Mutual exclusion** — at least one resource is non-shareable.
2. **Hold and wait** — a process holding a resource waits for another.
3. **No preemption** — resources cannot be forcibly taken.
4. **Circular wait** — a cycle of processes each waiting for the next.

## The four handling strategies

| Strategy | Idea | Cost |
|---|---|---|
| **Prevention** | Structurally negate one of the four conditions | Low resource utilisation |
| **Avoidance** | Grant a request only if the system stays in a **safe state** (Banker's algorithm) | Needs maximum-need declared in advance |
| **Detection and recovery** | Let deadlock happen, detect with a wait-for graph, then recover | Recovery is disruptive |
| **Ignore (Ostrich algorithm)** | Assume it is rare; reboot if it happens | What Unix/Windows actually do |

### Prevention in practice
- Kill **hold and wait**: request all resources at once (poor utilisation) or release all before requesting more.
- Kill **no preemption**: preempt resources from a waiting process.
- Kill **circular wait**: impose a **total ordering** on resource types and require requests in increasing order. This is the practical one.

## Safe state and Banker's algorithm

A state is **safe** if there is a sequence in which every process can obtain its maximum need and finish. **Safe ⇒ no deadlock. Unsafe ≠ deadlock**, but deadlock is possible.

Data structures: **Available[m]**, **Max[n][m]**, **Allocation[n][m]**, **Need[n][m] = Max − Allocation**.

**Safety algorithm:** find a process whose **Need ≤ Available**; pretend it finishes, add its Allocation back to Available (Work), mark it finished; repeat. If all processes finish, the state is safe and the order found is the **safe sequence**.

**Resource-Request algorithm:** check Request ≤ Need, Request ≤ Available, then *pretend* to allocate and run the safety check. If the resulting state is safe, grant it; otherwise the process waits.

## Detection

- **Single instance per resource type:** build a **wait-for graph** (collapse the resource nodes); a **cycle means deadlock**.
- **Multiple instances:** use a detection algorithm similar to the Banker's safety check.
- In a **resource allocation graph** with multiple instances, a cycle is **necessary but not sufficient** for deadlock.

## Recovery

- **Process termination** — abort all deadlocked processes, or abort one at a time until the cycle breaks (choose by priority, time run, resources held).
- **Resource preemption** — select a victim, **rollback** to a safe state, and prevent **starvation** by including the number of rollbacks in the victim selection.

## Related concepts

**Starvation** — indefinite postponement without deadlock. **Livelock** — processes keep changing state in response to each other but make no progress. **Priority inversion** — a low-priority process holds a lock needed by a high-priority one; solved by **priority inheritance**.

---

## Exam pointers

1. All **four** Coffman conditions must hold; negating any one prevents deadlock.
2. **Safe ⇒ no deadlock; unsafe does not imply deadlock.**
3. Cycle in a single-instance RAG ⇒ deadlock. Cycle in a multi-instance RAG ⇒ *maybe*.
4. Banker's algorithm is **avoidance**, not prevention or detection.
5. Practical prevention = **ordering resources**; practical handling in real OSes = **ignore**.
