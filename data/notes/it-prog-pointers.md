# Pointers, Arrays, Strings and Memory

## Pointer basics

```c
int x = 10;
int *p = &x;     // p holds the address of x
printf("%d", *p); // 10 — dereference
```

- `&` = address-of, `*` = dereference.
- **Pointer arithmetic scales by the pointed-to type**: if `p` is `int*` and `sizeof(int) == 4`, then `p + 1` advances **4 bytes**. This is the single most-tested pointer fact.
- `void*` is a generic pointer; it cannot be dereferenced or incremented without a cast.
- **NULL pointer** vs **dangling pointer** (points to freed memory) vs **wild pointer** (uninitialised).

## Arrays and pointers

For `int a[5]`:
- `a` decays to `&a[0]`; `a[i]` is exactly `*(a + i)`, which is why `a[i] == i[a]` compiles.
- **`a` and `&a` have the same value but different types**: `a + 1` moves one int, `&a + 1` moves the whole array.
- 2-D arrays are stored **row-major**: `a[i][j]` is `*(*(a + i) + j)`.
- An array **cannot** be assigned or returned; a pointer can.

## Strings

A C string is a `char` array terminated by **`'\0'`**. `"hello"` occupies **6 bytes**.

```c
char s1[] = "hello";   // modifiable array, 6 bytes on the stack
char *s2  = "hello";   // pointer to a string literal — modifying it is UB
```

| Function | Job | Danger |
|---|---|---|
| `strlen` | Length excluding `'\0'` | Reads until it finds a terminator |
| `strcpy` / `strcat` | Copy / concatenate | **Buffer overflow** — use `strncpy`/`strncat`/`snprintf` |
| `strcmp` | Lexicographic compare; 0 if equal | Comparing pointers with `==` compares addresses, not content |
| `sprintf` | Format into a buffer | Overflow — prefer `snprintf` |

`gets()` was **removed from the C standard** because it cannot be used safely — a common security question.

## Dynamic memory

| Function | Behaviour |
|---|---|
| `malloc(n)` | n bytes, **uninitialised** |
| `calloc(n, size)` | n × size bytes, **zero-initialised** |
| `realloc(p, n)` | Resize; may move the block; returns NULL on failure (do not assign directly to p) |
| `free(p)` | Release; **double free and use-after-free are undefined behaviour** |

Always check the return value for NULL, and free exactly once. Set the pointer to NULL after freeing to avoid dangling use.

**Memory layout of a C program (low → high):**

```
Text / code segment        (read-only instructions)
Initialised data segment   (globals and statics with values)
BSS                        (uninitialised globals/statics -> zeroed)
Heap                       (grows upwards; malloc)
...
Stack                      (grows downwards; locals, call frames)
Command-line args / env
```

**Stack vs heap:**

| | Stack | Heap |
|---|---|---|
| Allocation | Automatic | Manual (malloc/free) |
| Speed | Fast | Slower |
| Size | Limited | Large |
| Lifetime | Scope | Until freed |
| Problem | Stack overflow | **Memory leak**, fragmentation |

## Function pointers

```c
int add(int a, int b) { return a + b; }
int (*op)(int, int) = add;
printf("%d", op(2, 3));  // 5
```

Used for callbacks, dispatch tables, `qsort`'s comparator — and, conceptually, for how C++ virtual functions work (the vtable).

## Structures and unions

- `struct` — members laid out sequentially with **padding** for alignment; `sizeof` is usually more than the sum of members.
- `union` — all members share the same memory; **size = size of the largest member**; only one member is valid at a time.
- **Bit fields** pack members into a specified number of bits.
- `typedef` for readability; `->` to access through a pointer.

---

## Exam pointers

1. **Pointer arithmetic scales by type size.**
2. `sizeof("hello")` is **6**; `strlen("hello")` is **5**.
3. **union size = largest member**; struct size includes **padding**.
4. `calloc` zeroes memory, `malloc` does not.
5. `a` vs `&a`: same address, **different pointer arithmetic**.
