# Relational Model, Keys and Relational Algebra

## Terminology

**Relation** (table), **tuple** (row), **attribute** (column), **domain** (allowed values), **degree** (number of attributes), **cardinality** (number of tuples). A relation is a **set** of tuples — so duplicates do not exist in the pure model, though SQL allows them.

## Keys

| Key | Definition |
|---|---|
| **Super key** | Any set of attributes that uniquely identifies a tuple |
| **Candidate key** | A **minimal** super key (no proper subset is a super key) |
| **Primary key** | The chosen candidate key; **NOT NULL and unique** |
| **Alternate key** | Candidate keys not chosen as primary |
| **Composite key** | A key of more than one attribute |
| **Foreign key** | Attribute(s) referencing the primary key of another (or the same) relation |
| **Surrogate key** | System-generated identifier with no business meaning |

## Integrity constraints

- **Domain** — values come from the declared domain.
- **Entity integrity** — the primary key cannot be NULL.
- **Referential integrity** — a foreign key value must either match an existing primary key or be NULL. Violations handled by **CASCADE, SET NULL, SET DEFAULT, RESTRICT/NO ACTION**.
- **Key constraint**, **check constraint**, **not null**, **unique**.

## Relational algebra — the six basic operators

| Operator | Symbol | Meaning |
|---|---|---|
| Selection | σ | Choose **rows** matching a predicate |
| Projection | π | Choose **columns** (and eliminate duplicates) |
| Union | ∪ | Requires **union compatibility** (same degree, same domains) |
| Set difference | − | Union compatible |
| Cartesian product | × | Every row with every row |
| Rename | ρ | |

**Derived operators:** intersection (A ∩ B = A − (A − B)), **join** (θ-join, equijoin, **natural join ⋈**), **division (÷)** — used for "for all" queries, **outer joins** (left, right, full).

> **Division** is the answer to questions like *"find suppliers who supply **all** parts"*. Recognise the pattern.

## Relational calculus

**Tuple relational calculus (TRC)** — `{ t | P(t) }`; **Domain relational calculus (DRC)** — `{ <x, y> | P(x, y) }`. Both are **non-procedural** (say *what*, not *how*) whereas algebra is **procedural**. All three are **equivalent in expressive power** (relationally complete). A calculus expression may be **unsafe** if it produces an infinite result.

## Joins

| Join | Result |
|---|---|
| Inner / equi | Matching rows only |
| Natural | Equi-join on common attributes, with the duplicate column removed |
| Left outer | All left rows + matching right (NULLs otherwise) |
| Right outer | Mirror image |
| Full outer | All rows from both |
| Self join | A table joined to itself (employee–manager) |
| Semi / anti join | Rows of one relation that have / do not have a match |

**Cardinality bounds** are a favourite: for R (m tuples) and S (n tuples),
- **R × S** → exactly m × n rows.
- **Natural join** → between **0** and **m × n** rows, depending on the common attribute.
- **Left outer join** → at least m rows.

---

## Exam pointers

1. Candidate key = **minimal** super key. Every candidate key is a super key; the converse is false.
2. **Projection eliminates duplicates** in relational algebra (SQL's SELECT does not, unless DISTINCT).
3. Union and set difference need **union compatibility**.
4. **Division answers "for all"** queries.
5. Algebra is procedural; calculus is declarative; both are equally expressive.
