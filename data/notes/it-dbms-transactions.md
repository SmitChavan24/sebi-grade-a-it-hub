# Transactions, ACID and Recovery

## ACID

| Property | Meaning | Ensured by |
|---|---|---|
| **Atomicity** | All or nothing | Transaction manager / recovery (undo) |
| **Consistency** | Takes the DB from one valid state to another | Application + integrity constraints |
| **Isolation** | Concurrent execution appears serial | Concurrency control |
| **Durability** | Committed changes survive crashes | Recovery manager (logs, redo) |

## Transaction states

```
active -> partially committed -> committed
   |              |
   v              v
 failed  ->  aborted (rollback)
```

## Concurrency problems

| Problem | Pattern |
|---|---|
| **Dirty read** (WR conflict) | T2 reads data written by uncommitted T1; T1 then aborts |
| **Lost update** (WW) | Two writes; one overwrites the other |
| **Unrepeatable read** (RW) | T1 reads the same row twice and gets different values |
| **Phantom read** | T1 re-runs a range query and sees **new rows** inserted by T2 |

## Isolation levels (SQL standard)

| Level | Dirty read | Unrepeatable read | Phantom |
|---|---|---|---|
| Read Uncommitted | Possible | Possible | Possible |
| **Read Committed** | No | Possible | Possible |
| **Repeatable Read** | No | No | Possible |
| **Serializable** | No | No | No |

Higher isolation = lower concurrency. Most databases default to Read Committed; MySQL/InnoDB defaults to Repeatable Read.

## Schedules and serialisability

A **schedule** is an interleaving of operations. It is **serialisable** if it is equivalent to some serial schedule.

**Conflict serialisability** — two operations conflict if they are from **different transactions**, on the **same data item**, and **at least one is a write**. Build a **precedence graph**: a node per transaction, an edge Ti → Tj for each conflicting pair where Ti's operation comes first. The schedule is **conflict serialisable if and only if the graph is acyclic**; topological order gives the equivalent serial schedule.

**View serialisability** is weaker (every conflict-serialisable schedule is view-serialisable, not conversely) and is NP-hard to test.

**Recoverability:**
- **Recoverable schedule** — Tj commits only after every Ti it read from has committed.
- **Cascadeless (ACA)** — a transaction reads only committed data; avoids cascading rollback.
- **Strict** — no read or write of an uncommitted written value. Strict ⊂ cascadeless ⊂ recoverable.

## Recovery

**Log-based recovery** with **write-ahead logging (WAL)**: the log record must reach stable storage **before** the data page. Log record: `<Tn, X, old_value, new_value>`.

- **Deferred update (NO-UNDO/REDO)** — writes applied only after commit; recovery needs only redo.
- **Immediate update (UNDO/REDO)** — writes may reach disk before commit; recovery needs both.

**Checkpointing** limits how far back recovery must scan. **ARIES** is the standard algorithm: three phases — **Analysis, Redo, Undo** — using the LSN, dirty page table and transaction table, with **compensation log records (CLRs)** so that undo is itself recoverable.

**Shadow paging** is an alternative with no log, but poor concurrency and fragmentation.

---

## Exam pointers

1. **Only Serializable prevents phantoms**; Repeatable Read does not (in the standard).
2. Conflict serialisable ⇔ **acyclic precedence graph**.
3. **WAL: log first, data later.** This is what makes durability possible.
4. Cascading rollback is avoided by **cascadeless** schedules.
5. ARIES phases in order: **Analysis, Redo, Undo**.
