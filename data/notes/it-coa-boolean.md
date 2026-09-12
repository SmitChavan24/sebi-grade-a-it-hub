# Boolean Algebra and Logic Minimisation

## Laws

| Law | Form |
|---|---|
| Identity | A + 0 = A; A · 1 = A |
| Null | A + 1 = 1; A · 0 = 0 |
| Idempotent | A + A = A; A · A = A |
| Complement | A + A' = 1; A · A' = 0 |
| Involution | (A')' = A |
| Commutative | A + B = B + A |
| Associative | (A+B)+C = A+(B+C) |
| Distributive | A(B+C) = AB + AC; **A + BC = (A+B)(A+C)** |
| **Absorption** | **A + AB = A**; A(A+B) = A |
| Consensus | AB + A'C + BC = AB + A'C |
| **De Morgan** | **(A+B)' = A'B'**; **(AB)' = A' + B'** |

De Morgan's laws are the most-used identities in the paper — know both directions instantly.

## Gates

| Gate | Output |
|---|---|
| AND | 1 only if all inputs are 1 |
| OR | 1 if any input is 1 |
| NOT | Inverts |
| **NAND** | NOT(AND) — **universal gate** |
| **NOR** | NOT(OR) — **universal gate** |
| **XOR** | 1 if inputs **differ** (odd number of 1s) |
| XNOR | 1 if inputs are **equal** |

**NAND and NOR are functionally complete** — any circuit can be built from either alone. NOT from NAND: tie both inputs together.

**XOR properties:** A ⊕ 0 = A; **A ⊕ A = 0**; A ⊕ 1 = A'; commutative and associative. Used in parity, checksums, swapping without a temporary, and toggle logic.

## Canonical forms

- **SOP (sum of products)** — sum of **minterms**; a minterm is 1 for exactly one input combination. Written **Σm(…)**.
- **POS (product of sums)** — product of **maxterms**. Written **ΠM(…)**.
- For n variables there are 2ⁿ minterms; minterm i and maxterm i are complements.

## Karnaugh maps

Minimisation by grouping adjacent 1s.

**Rules:**
1. Groups must be **powers of two** in size (1, 2, 4, 8, 16).
2. Groups must be **rectangular**, and may **wrap around** edges and corners.
3. Make groups **as large as possible** and use **as few as possible**.
4. Overlapping is allowed.
5. **Don't-care (X)** terms may be included when they help make a bigger group, and ignored otherwise.

A group of 2^k cells eliminates **k** variables. Cell ordering follows **Gray code** (00, 01, 11, 10) so that adjacent cells differ in one variable.

**Prime implicant** — a group that cannot be made larger. **Essential prime implicant** — one that covers a minterm covered by no other prime implicant; these must all appear in the minimal expression.

For more than 4–5 variables, use the **Quine-McCluskey** tabular method — systematic and machine-implementable, unlike visual K-maps.

## Worked pattern

> F(A,B,C,D) = Σm(0,1,2,5,8,9,10) — draw the 4×4 map, group the four corners (0,2,8,10) → **B'D'**, group (0,1,8,9) → **B'C'**, group (1,5) → **A'C'D**. Result: **F = B'D' + B'C' + A'C'D**.

Always verify a minimised expression by spot-checking two or three input combinations against the original.

---

## Exam pointers

1. **De Morgan both directions** — the single most-used law.
2. **NAND and NOR are universal**; XOR is not.
3. K-map groups are **powers of two**, may wrap, and should be as **few and as large** as possible.
4. **Essential prime implicants must be in the answer.**
5. K-map cell order is **Gray code**, not binary counting order.
