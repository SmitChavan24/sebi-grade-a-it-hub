# Concurrency Control

## Lock-based protocols

**Shared (S)** locks for reading, **Exclusive (X)** locks for writing.

| | S requested | X requested |
|---|---|---|
| S held | Compatible | Conflict |
| X held | Conflict | Conflict |

### Two-Phase Locking (2PL)

Every transaction has a **growing phase** (only acquires locks) and a **shrinking phase** (only releases). Once it releases any lock, it may not acquire another.

- **2PL guarantees conflict serialisability** but **not** freedom from deadlock, and not recoverability.
- **Strict 2PL** — all **exclusive** locks held until commit/abort. Avoids cascading rollback. This is what real systems use.
- **Rigorous 2PL** — **all** locks held until commit. Simplest to reason about.
- **Conservative 2PL** — acquire all locks up front; **deadlock free**, but poor concurrency and requires knowing the lock set in advance.

**Lock granularity:** database → table → page → row. Finer granularity gives more concurrency and more locking overhead. **Intention locks (IS, IX, SIX)** in **multiple-granularity locking** let the system lock a table while row locks exist beneath it.

## Deadlock in databases

- **Prevention by timestamps** (older transaction = higher priority):
  - **Wait-Die** — an **older** transaction **waits** for a younger one; a **younger** one **dies** (rolls back and restarts). Non-preemptive.
  - **Wound-Wait** — an **older** transaction **wounds** (preempts) the younger; a younger one **waits**. Preemptive.
  Both avoid cycles because waiting always goes in one direction along timestamps.
- **Detection** — **wait-for graph**; a cycle means deadlock; choose a **victim** by cost, and beware **starvation**.
- **Timeouts** — crude but common in practice.

## Timestamp ordering protocol

Each transaction gets a timestamp TS(T) at start. Each item X has **R-timestamp(X)** and **W-timestamp(X)**.

- **Read(X)** by T: if TS(T) < W-TS(X), the value is already too new → **reject and roll back T**; else read and set R-TS(X) = max(R-TS(X), TS(T)).
- **Write(X)** by T: if TS(T) < R-TS(X) or TS(T) < W-TS(X) → **reject and roll back**; else write and set W-TS(X) = TS(T).

**Thomas's Write Rule** relaxes the second case: an obsolete write (TS(T) < W-TS(X)) can simply be **ignored** rather than causing a rollback, which allows some view-serialisable schedules.

Timestamp ordering is **deadlock free** (no waiting) but can cause **starvation** through repeated restarts.

## Optimistic concurrency control (validation-based)

Three phases: **Read** (work on a private copy), **Validation** (check for conflicts with concurrent transactions), **Write** (apply if validation succeeds). Good when conflicts are rare — typical of read-heavy workloads.

## MVCC — Multiversion Concurrency Control

Each write creates a **new version** with a timestamp; readers are given the version consistent with their snapshot. **Readers never block writers and writers never block readers**, which is why PostgreSQL, Oracle and InnoDB all use it. Cost: version storage and **vacuum/garbage collection**. **Snapshot isolation** is the common level built on MVCC, and it permits the **write skew** anomaly, which is why "serializable snapshot isolation" exists.

---

## Exam pointers

1. **2PL ⇒ conflict serialisable, but deadlock is still possible.**
2. **Strict 2PL** holds X locks to commit → avoids cascading aborts.
3. **Wait-Die: old waits, young dies. Wound-Wait: old wounds, young waits.** Remember "older is privileged in both".
4. Timestamp ordering is deadlock-free but starvation-prone.
5. MVCC: **readers do not block writers**; snapshot isolation allows **write skew**.
