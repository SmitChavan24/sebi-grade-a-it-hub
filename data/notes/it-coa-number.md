# Number Systems and Computer Arithmetic

## Bases and conversion

| Base | Digits |
|---|---|
| Binary (2) | 0–1 |
| Octal (8) | 0–7 |
| Decimal (10) | 0–9 |
| Hexadecimal (16) | 0–9, A–F |

- **Binary → octal:** group bits in **3s** from the right. **Binary → hex:** group in **4s**.
- **Decimal → binary:** repeated division by 2, reading remainders **bottom-up**. For fractions, repeatedly multiply by 2 and read the integer parts **top-down**.

## Signed representations (n bits)

| Representation | Range | Zero |
|---|---|---|
| **Sign-magnitude** | −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1) | **Two zeros** |
| **1's complement** | −(2ⁿ⁻¹−1) to +(2ⁿ⁻¹−1) | **Two zeros** |
| **2's complement** | **−2ⁿ⁻¹ to +2ⁿ⁻¹−1** | **One zero** |

**2's complement** = invert all bits and add 1. It wins because addition and subtraction use the same circuit and there is a single zero. For 8 bits: **−128 to +127**.

**Overflow rule (2's complement addition):** overflow occurs when adding two numbers of the **same sign** produces a result of the **opposite sign**. Equivalently, carry-in to the sign bit ≠ carry-out.

Subtraction: A − B = A + (2's complement of B).

## Floating point — IEEE 754

| Format | Total | Sign | Exponent | Mantissa | Bias |
|---|---|---|---|---|---|
| **Single** | 32 | 1 | **8** | **23** | **127** |
| **Double** | 64 | 1 | **11** | **52** | **1023** |

Value = (−1)^sign × 1.mantissa × 2^(exponent − bias), with an **implicit leading 1** for normalised numbers.

Special values: exponent all 0s with mantissa 0 → **±zero**; exponent all 0s with non-zero mantissa → **denormalised**; exponent all 1s with mantissa 0 → **±infinity**; exponent all 1s with non-zero mantissa → **NaN**.

**Why 0.1 + 0.2 ≠ 0.3:** 0.1 and 0.2 have no exact binary representation. Never compare floats with `==`; compare within an epsilon. In financial systems, use **integer paise/cents or a decimal type** — a genuinely relevant point for a market IT role.

## Codes

- **BCD** — each decimal digit in 4 bits; wastes range but simplifies decimal display.
- **Gray code** — successive values differ in exactly **one bit**; used in position encoders and K-maps to avoid transition errors.
- **ASCII** — 7 bits, 128 characters ('A' = 65, 'a' = 97, '0' = 48). **Unicode/UTF-8** — variable width, 1–4 bytes, backwards compatible with ASCII.
- **Parity, Hamming code** — see the data link note.

## Multiplication and division algorithms

**Booth's algorithm** for signed multiplication (handles runs of 1s efficiently), **restoring** and **non-restoring** division. Know that they exist and what problem each solves.

---

## Exam pointers

1. **2's complement has one zero** and an asymmetric range (−128 to +127 for 8 bits).
2. **Overflow: same signs in, opposite sign out.**
3. IEEE 754 single: **1 + 8 + 23, bias 127**. Double: **1 + 11 + 52, bias 1023**.
4. Binary→hex groups of **4**, binary→octal groups of **3**.
5. **Gray code changes one bit at a time** — that is the whole point of it.
