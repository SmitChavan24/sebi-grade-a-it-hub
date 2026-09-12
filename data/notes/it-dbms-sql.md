# SQL — The Core You Must Be Able to Write

> The descriptive paper can ask you to *write* a query. Practise on paper, not just by reading.

## Sub-languages

- **DDL** — CREATE, ALTER, DROP, TRUNCATE, RENAME (auto-commit).
- **DML** — SELECT, INSERT, UPDATE, DELETE.
- **DCL** — GRANT, REVOKE.
- **TCL** — COMMIT, ROLLBACK, SAVEPOINT.

**DELETE vs TRUNCATE vs DROP** — the single most-asked SQL question:

| | DELETE | TRUNCATE | DROP |
|---|---|---|---|
| Type | DML | DDL | DDL |
| WHERE clause | Yes | No | No |
| Rollback | Yes | No (auto-commit) | No |
| Triggers fired | Yes | No | No |
| Structure kept | Yes | Yes | **No** |
| Speed | Slow | Fast | Fast |

## Query execution order (not the written order)

```
FROM -> ON -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT
```

This explains two classic rules: you **cannot use a column alias in WHERE** (SELECT runs later), and **WHERE filters rows while HAVING filters groups**.

## Essential syntax

```sql
SELECT d.dept_name, COUNT(*) AS staff, AVG(e.salary) AS avg_sal
FROM   employee e
JOIN   department d ON e.dept_id = d.dept_id
WHERE  e.status = 'ACTIVE'
GROUP BY d.dept_name
HAVING COUNT(*) > 5
ORDER BY avg_sal DESC
LIMIT 10;
```

**Aggregates:** COUNT, SUM, AVG, MIN, MAX. **COUNT(*) counts rows including NULLs; COUNT(col) ignores NULLs** — a guaranteed exam point.

**NULL handling:** any arithmetic with NULL is NULL; comparisons use **IS NULL / IS NOT NULL**, never `= NULL`. `COALESCE(a, b, c)` returns the first non-null; `NULLIF(a, b)` returns NULL if a = b.

## Subqueries

```sql
-- scalar
SELECT name FROM employee WHERE salary > (SELECT AVG(salary) FROM employee);

-- IN
SELECT name FROM employee WHERE dept_id IN (SELECT dept_id FROM department WHERE location = 'Mumbai');

-- correlated: runs once per outer row
SELECT e.name FROM employee e
WHERE e.salary > (SELECT AVG(x.salary) FROM employee x WHERE x.dept_id = e.dept_id);

-- EXISTS
SELECT d.dept_name FROM department d
WHERE EXISTS (SELECT 1 FROM employee e WHERE e.dept_id = d.dept_id);
```

**NOT IN vs NOT EXISTS:** if the subquery returns any NULL, **NOT IN returns no rows at all**. NOT EXISTS is the safe choice.

## The classic problems

**Nth highest salary:**

```sql
-- using a window function (preferred)
SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employee
) t WHERE rnk = 3;

-- using a correlated subquery
SELECT DISTINCT e.salary FROM employee e
WHERE 3 = (SELECT COUNT(DISTINCT s.salary) FROM employee s WHERE s.salary >= e.salary);
```

**Find duplicates:**

```sql
SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;
```

**Employees earning more than their manager:**

```sql
SELECT e.name FROM employee e JOIN employee m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;
```

## Set operations

UNION (removes duplicates, sorts) vs **UNION ALL** (keeps duplicates, faster), INTERSECT, EXCEPT/MINUS. All require the same number of columns with compatible types.

## Constraints and joins in DDL

```sql
CREATE TABLE trade (
  trade_id    BIGINT PRIMARY KEY,
  client_id   INT NOT NULL REFERENCES client(client_id) ON DELETE RESTRICT,
  symbol      VARCHAR(20) NOT NULL,
  qty         INT CHECK (qty > 0),
  price       DECIMAL(12,2) NOT NULL,
  traded_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_trade UNIQUE (client_id, symbol, traded_at)
);
```

---

## Exam pointers

1. **WHERE filters rows, HAVING filters groups**; aliases are unavailable in WHERE.
2. **COUNT(*) includes NULLs, COUNT(col) does not.**
3. **NOT IN with NULLs returns nothing** — use NOT EXISTS.
4. **TRUNCATE is DDL and cannot be rolled back**; DELETE is DML and can.
5. UNION removes duplicates; **UNION ALL is faster** because it does not.
