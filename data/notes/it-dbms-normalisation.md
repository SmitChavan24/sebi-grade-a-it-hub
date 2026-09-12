# Normalisation and Functional Dependencies

> The most reliably examined DBMS topic. Learn to find candidate keys mechanically and the rest follows.

## Functional dependency

**X → Y** means: for any two tuples with the same X value, the Y values must also be equal. X is the determinant.

**Armstrong's axioms (sound and complete):**
- **Reflexivity:** if Y ⊆ X then X → Y (trivial dependency)
- **Augmentation:** if X → Y then XZ → YZ
- **Transitivity:** if X → Y and Y → Z then X → Z

Derived: **union** (X→Y, X→Z ⇒ X→YZ), **decomposition** (X→YZ ⇒ X→Y and X→Z), **pseudo-transitivity**.

## Attribute closure — the workhorse

To find **X⁺**: start with X; repeatedly add the right-hand side of any FD whose left-hand side is already inside; stop when nothing changes.

**X is a candidate key if and only if X⁺ = all attributes and no proper subset of X has that property.**

**Finding candidate keys fast:**
1. Attributes that never appear on the **right** of any FD must be in **every** candidate key. Start there.
2. Attributes that appear on neither side are also in every key.
3. Take the closure of that essential set; if it is everything, it is the unique candidate key.
4. Otherwise, add the remaining attributes one at a time and test.

## Normal forms

| Form | Condition |
|---|---|
| **1NF** | All attributes atomic; no repeating groups |
| **2NF** | 1NF + **no partial dependency** — no non-prime attribute depends on part of a candidate key |
| **3NF** | 2NF + **no transitive dependency** — for every FD X → Y, either **X is a super key** or **Y is a prime attribute** |
| **BCNF** | For every non-trivial FD X → Y, **X must be a super key** |
| **4NF** | BCNF + no non-trivial **multivalued dependency** unless the determinant is a super key |
| **5NF (PJNF)** | No **join dependency** that is not implied by candidate keys |

**Prime attribute** = part of some candidate key. A **partial dependency** can only exist when the candidate key is composite — so a relation with all single-attribute candidate keys and in 1NF is automatically in 2NF.

## The two trade-offs

| Property | 3NF | BCNF |
|---|---|---|
| Lossless join decomposition | Always achievable | Always achievable |
| **Dependency preservation** | **Always achievable** | **Not always** |

This is the classic answer: **BCNF is stricter but may lose dependency preservation; 3NF always preserves dependencies.**

## Decomposition

- **Lossless join:** a decomposition of R into R1 and R2 is lossless if **R1 ∩ R2 → R1** or **R1 ∩ R2 → R2** — that is, the common attributes form a key of at least one fragment.
- **Dependency preserving:** the union of the FDs projected onto each fragment implies the original FD set.

## Worked example

R(A, B, C, D) with FDs: A → B, B → C, C → D.

- A⁺ = {A, B, C, D} → **A is the only candidate key**. Prime attribute: A.
- A → B: A is a key, fine.
- **B → C**: B is not a super key, and C is not prime → violates **3NF** (transitive dependency A → B → C).
- So R is in **2NF but not 3NF**. Decompose into R1(A, B), R2(B, C), R3(C, D) — all in BCNF, lossless and dependency-preserving.

## Denormalisation

Deliberately reintroducing redundancy for read performance — standard in **data warehouses** (star schema) and reporting systems. Normalise for OLTP, denormalise for OLAP.

---

## Exam pointers

1. **3NF: X is a super key OR Y is prime. BCNF: X must be a super key.**
2. Partial dependency requires a **composite** candidate key.
3. **BCNF may not preserve dependencies; 3NF always does.**
4. Lossless join test: **common attributes must be a key of one fragment**.
5. Always compute candidate keys **first** — every normal-form question collapses once you have them.
