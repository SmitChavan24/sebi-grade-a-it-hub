# Advanced SQL — Views, Indexes, Triggers, Window Functions

## Views

A **virtual table** defined by a query. Benefits: security (expose only some columns), simplicity, logical data independence.

- **Updatable view** conditions: based on a single table, includes the primary key, no aggregates, no DISTINCT, no GROUP BY/HAVING, no set operators.
- **Materialised view** — the result is **physically stored** and refreshed (on commit, on demand, or scheduled). Used for expensive aggregations in reporting/warehouse workloads.
- `WITH CHECK OPTION` prevents updates through the view that would make the row invisible to the view.

## Indexes

An index trades **write cost and storage** for **read speed**.

| Type | Meaning |
|---|---|
| **Clustered** | Determines the **physical order** of rows; **one per table** |
| **Non-clustered / secondary** | Separate structure with pointers; many allowed |
| **Dense** | One index entry **per record** |
| **Sparse** | One entry **per block/page** — only possible on a clustered/ordered field |
| **Composite** | Multiple columns; useful only left-to-right (**leftmost prefix rule**) |
| **Covering** | Contains every column the query needs, so the table is never touched |
| **Unique, partial, function-based, bitmap** (low-cardinality columns), **full-text** | Specialised |

**When an index is *not* used:** a function applied to the column (`WHERE YEAR(dt) = 2024`), a leading wildcard (`LIKE '%x'`), implicit type conversion, or when the optimiser estimates that a large fraction of rows will match.

## Stored procedures and functions

| | Procedure | Function |
|---|---|---|
| Returns | Zero or more values via OUT parameters | Exactly one value |
| Called from SQL | No (CALL / EXEC) | Yes, inside a SELECT |
| DML allowed | Yes | Usually restricted |

Benefits: reduced network traffic, precompiled plans, centralised business logic, permission granularity.

## Triggers

Code that fires automatically on an event.

- Timing: **BEFORE, AFTER, INSTEAD OF** (for views).
- Event: INSERT, UPDATE, DELETE.
- Granularity: **row-level** (FOR EACH ROW) vs **statement-level**.
- Pseudo-tables: `NEW`/`OLD` (MySQL, Oracle `:NEW`, `:OLD`), `inserted`/`deleted` (SQL Server).

Typical uses: **audit trails**, enforcing complex constraints, maintaining derived values. Risks: hidden control flow, cascading triggers, performance.

> An **audit trigger writing to an immutable audit table** is exactly what a regulator expects in a financial system — worth mentioning in the descriptive paper.

## Window (analytic) functions

Compute across a set of rows **without collapsing them** — the key difference from GROUP BY.

```sql
SELECT trader_id, trade_date, pnl,
       SUM(pnl)      OVER (PARTITION BY trader_id ORDER BY trade_date) AS running_pnl,
       ROW_NUMBER()  OVER (PARTITION BY trader_id ORDER BY pnl DESC)   AS rn,
       RANK()        OVER (ORDER BY pnl DESC)                          AS rnk,
       DENSE_RANK()  OVER (ORDER BY pnl DESC)                          AS drnk,
       LAG(pnl, 1)   OVER (PARTITION BY trader_id ORDER BY trade_date) AS prev_pnl,
       AVG(pnl)      OVER (PARTITION BY trader_id
                           ORDER BY trade_date
                           ROWS BETWEEN 4 PRECEDING AND CURRENT ROW)   AS moving_avg_5
FROM   daily_pnl;
```

**ROW_NUMBER vs RANK vs DENSE_RANK** on values 100, 90, 90, 80:
- ROW_NUMBER → 1, 2, 3, 4
- RANK → 1, 2, 2, **4**
- DENSE_RANK → 1, 2, 2, **3**

**CTEs** (`WITH x AS (...)`) improve readability; **recursive CTEs** traverse hierarchies (org charts, bill of materials).

---

## Exam pointers

1. **One clustered index per table**; sparse indexes need ordered data.
2. **Leftmost prefix rule** for composite indexes.
3. RANK leaves gaps; DENSE_RANK does not; ROW_NUMBER is always distinct.
4. INSTEAD OF triggers exist for **views**.
5. Window functions **do not reduce the number of rows**; GROUP BY does.
