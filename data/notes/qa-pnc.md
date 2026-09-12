# Permutation, Combination and Probability

## Fundamental principles

- **Multiplication (AND):** if one task can be done in m ways and another in n ways, both together can be done in **m × n** ways.
- **Addition (OR):** either one or the other → **m + n** ways.

## Permutation vs combination

| | Permutation | Combination |
|---|---|---|
| Order | **Matters** | Does **not** matter |
| Formula | **nPr = n!/(n−r)!** | **nCr = n!/[r!(n−r)!]** |
| Example | Arranging, ranking, seating, forming numbers | Selecting a team, choosing items |

**nPr = nCr × r!** — the relationship to remember.

**Useful identities:** nC0 = nCn = 1 · nC1 = n · **nCr = nC(n−r)** · nCr + nC(r−1) = (n+1)Cr · Σ nCr from r=0 to n = **2ⁿ** (the number of subsets).

## Standard patterns

| Situation | Formula |
|---|---|
| Arrangements of n distinct objects | n! |
| With repetitions (p alike, q alike) | **n!/(p! q!)** |
| Circular arrangement of n | **(n−1)!** |
| Circular where clockwise = anticlockwise (necklace) | **(n−1)!/2** |
| r objects from n, with repetition allowed | nʳ |
| Selecting at least one from n | **2ⁿ − 1** |
| Two particular people always together | Treat as one unit: **(n−1)! × 2!** |
| Two particular people never together | Total − together |
| Distributing n identical items into r groups (each ≥ 1) | (n−1)C(r−1) |

## Probability

**P(E) = favourable outcomes / total outcomes**, between 0 and 1.

```
P(A or B)  = P(A) + P(B) − P(A and B)
           = P(A) + P(B)          if mutually exclusive
P(A and B) = P(A) × P(B)          if independent
           = P(A) × P(B|A)        in general
P(not A)   = 1 − P(A)
```

**Conditional probability:** P(A|B) = P(A ∩ B)/P(B).
**Bayes' theorem:** P(A|B) = P(B|A)·P(A) / P(B). Worth knowing conceptually — it is also the basis of the false-positive problem in fraud detection, which makes it a nice cross-link to your IT paper.

**Standard setups:**
- A pack of cards: 52 cards, 4 suits of 13, **26 red / 26 black**, 12 face cards, 4 aces.
- Two dice: 36 outcomes; sum 7 is the most likely (6 ways).
- Coins: n coins → 2ⁿ outcomes.
- **Without replacement** changes the denominator each draw — the most common error.

**Complement technique:** "at least one" problems are almost always faster as **1 − P(none)**.

---

## Exam pointers

1. **Order matters → permutation; selection only → combination.**
2. **Circular arrangement = (n−1)!**, necklace = (n−1)!/2.
3. **Repetitions divide by the factorial of each repeated group.**
4. **"At least one" = 1 − P(none).**
5. In "without replacement" problems, **update both numerator and denominator**.
