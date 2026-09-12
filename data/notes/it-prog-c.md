# C Programming — Fundamentals

## Data types and sizes (typical 64-bit Linux)

| Type | Size | Range / note |
|---|---|---|
| char | 1 byte | −128 to 127 (signed) |
| int | 4 bytes | −2³¹ to 2³¹−1 |
| long | 8 bytes | |
| float | 4 bytes | ~6-7 significant digits |
| double | 8 bytes | ~15-16 digits |
| pointer | 8 bytes | |

Sizes are **implementation-defined**; only `sizeof(char) == 1` is guaranteed. Use `<stdint.h>` types (`int32_t`, `uint64_t`) when size matters.

## Operators and precedence traps

- **Precedence (high → low):** `()` `[]` `->` `.` → unary `! ~ ++ -- + - * & sizeof` → `* / %` → `+ -` → `<< >>` → relational → `== !=` → `&` → `^` → `|` → `&&` → `||` → `?:` → assignment → `,`
- **`++i` vs `i++`:** pre-increment yields the new value, post-increment the old one.
- Expressions like `i = i++ + ++i` are **undefined behaviour** — the standard answer in an exam is "undefined", not a number.
- Integer division truncates: `5/2 == 2`, `-5/2` is implementation-defined before C99 and truncates toward zero from C99.
- `%` works only on integers.
- **Short-circuit:** `&&` and `||` do not evaluate the right side if the result is already determined — so `if (p != NULL && p->x)` is safe and idiomatic.

## Control flow

`if/else`, `switch` (integral types only; **fall-through without break** is a classic exam trick; `default` can be anywhere), `for`, `while`, `do-while` (**body executes at least once**), `break`, `continue`, `goto`.

## Storage classes

| Class | Scope | Lifetime | Default value |
|---|---|---|---|
| **auto** | Block | Block | Garbage |
| **register** | Block | Block | Garbage (hint to keep in a register; `&` not allowed) |
| **static** (local) | Block | **Whole program** | 0 |
| **static** (global/function) | **File only** (internal linkage) | Whole program | 0 |
| **extern** | Global | Whole program | 0 |

A `static` local variable **retains its value between calls** — a guaranteed output question.

## Functions and parameter passing

C is **strictly call by value**. "Call by reference" is simulated by passing a **pointer**:

```c
void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }
swap(&x, &y);
```

Arrays "decay" to a pointer to the first element when passed, which is why `sizeof(arr)` inside a function gives the pointer size, not the array size.

## Recursion

Every recursive function needs a **base case** and progress toward it. Each call consumes a stack frame; too deep → **stack overflow**.

```c
int fact(int n) { return (n <= 1) ? 1 : n * fact(n - 1); }
```

**Tail recursion** can be optimised into a loop by the compiler. Classic problems: factorial, Fibonacci (exponential without memoisation), **Towers of Hanoi (2ⁿ − 1 moves)**, GCD by Euclid, Ackermann.

## Preprocessor

`#include`, `#define` (textual substitution — always parenthesise macro arguments: `#define SQR(x) ((x)*(x))`), `#ifdef`/`#ifndef`/`#endif` include guards, `#pragma`.

**Macro vs function:** macros are expanded inline with no type checking and can evaluate arguments more than once (`SQR(i++)` is a bug); functions are type-checked and evaluated once.

## Compilation stages

```
Preprocessing (.i) -> Compilation (.s assembly) -> Assembly (.o object) -> Linking (executable)
```

---

## Exam pointers

1. **static locals keep their value between calls** and are initialised to 0.
2. `do-while` runs the body **at least once**.
3. `i = i++ + ++i` is **undefined behaviour**.
4. C is always **call by value**; pointers only simulate reference semantics.
5. `switch` without `break` **falls through** — check every option in output questions.
