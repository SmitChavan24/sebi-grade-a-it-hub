# DBMS Architecture and Data Modelling

## Why a DBMS over file systems

File systems suffer from **data redundancy and inconsistency, difficulty of access, data isolation, integrity problems, atomicity problems, concurrent-access anomalies and security problems**. A DBMS solves all seven.

## Three-schema architecture (ANSI/SPARC)

```
External level   -> many user views
   | logical data independence
Conceptual level -> the whole logical schema (tables, relationships, constraints)
   | physical data independence
Internal level   -> storage structures, files, indexes
```

- **Logical data independence** — change the conceptual schema without changing external views. Harder to achieve.
- **Physical data independence** — change storage/indexes without touching the logical schema. Easier, and the one usually achieved.

## Components

**Query processor** (DDL interpreter, DML compiler, query optimiser, execution engine) and **storage manager** (authorisation and integrity manager, transaction manager, file manager, buffer manager), plus the **data dictionary / system catalog**.

**Database users:** naive users, application programmers, sophisticated users, **DBA** (schema definition, access authorisation, performance tuning, backup and recovery).

## ER model

| Concept | Notation | Notes |
|---|---|---|
| Entity set | Rectangle | A thing; entity **instance** is one row |
| Attribute | Ellipse | Simple, composite, multivalued (double ellipse), derived (dashed) |
| Key attribute | Underlined | |
| Relationship | Diamond | Degree: unary, binary, ternary |
| Weak entity | Double rectangle | No key of its own; depends on an **identifying/owner entity** via a **double diamond** identifying relationship; has a **partial key** (dashed underline) |

**Cardinality:** 1:1, 1:N, M:N. **Participation:** total (double line, every entity must participate) vs partial.

## EER extensions

- **Specialisation / generalisation** — an ISA hierarchy.
- **Constraints:** **disjoint vs overlapping**, **total vs partial**.
- **Aggregation** — treating a relationship as an entity so it can participate in another relationship.

## ER to relational mapping — the rules that get tested

1. **Strong entity** → its own table with the key as primary key.
2. **Weak entity** → table with (owner's PK + partial key) as the composite primary key; the owner's PK is also a foreign key with ON DELETE CASCADE.
3. **1:N relationship** → put the **foreign key on the N side**. No extra table needed.
4. **M:N relationship** → **a separate table** with both keys as a composite primary key.
5. **1:1 relationship** → foreign key on either side, preferably the one with **total participation**.
6. **Multivalued attribute** → its own table.
7. **Ternary relationship** → its own table with all three keys.

**Minimum number of tables** questions follow directly from these rules: 1:1 with total participation on one side can collapse into a single table; M:N always needs three.

---

## Exam pointers

1. **Physical data independence is easier to achieve** than logical.
2. For **1:N**, the foreign key goes on the **many** side.
3. **M:N always needs a separate relation.**
4. A weak entity's PK = owner PK + partial key.
5. Total participation is drawn as a **double line**.
