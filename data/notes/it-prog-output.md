# Output-Based and Code-Tracing Questions

> A large share of the IT objective paper is "what does this print". These are skills you can improve with practice, because the traps repeat.

## The recurring traps

### 1. Pre vs post increment
```c
int i = 5;
printf("%d %d", i++, ++i);   // undefined behaviour - do not guess a value
int a = 5, b = a++ + ++a;    // b depends on sequencing; also UB in C
```
In a well-formed question: `i = 5; j = i++;` → j = 5, i = 6. `j = ++i;` → j = 6, i = 6.

### 2. Integer division and promotion
```c
printf("%d", 5/2);        // 2
printf("%f", 5/2.0);      // 2.500000
printf("%d", 'A' + 1);    // 66
printf("%c", 'A' + 1);    // B
float f = 0.1 + 0.2;      // never exactly 0.3 - floating point
```

### 3. sizeof
```c
char s[] = "hello";  sizeof(s)  // 6  (includes '\0')
char *p  = "hello";  sizeof(p)  // implementation-dependent pointer size; often 8 on 64-bit
strlen(s)                        // 5
int a[10]; sizeof(a)/sizeof(a[0])  // 10 here; invalid element-count formula for a pointer parameter
```

### 4. static and scope
```c
void f() { static int c = 0; c++; printf("%d ", c); }
f(); f(); f();   // 1 2 3
```

### 5. Loop boundaries and fall-through
```c
for (i = 0; i < 5; i++);   // note the semicolon - empty body, i ends at 5
switch (2) { case 1: printf("a"); case 2: printf("b"); case 3: printf("c"); }
// prints "bc" - no break
```

### 6. Pointer arithmetic
```c
int a[] = {10, 20, 30, 40};
int *p = a;
printf("%d", *(p + 2));   // 30
printf("%d", *p + 2);     // 12
printf("%d", *(p++));     // 10, then p points to 20
```

### 7. Java string identity
```java
String a = "hi", b = "hi";              // both from the pool
String c = new String("hi");
a == b      // true  (same interned object)
a == c      // false (different object)
a.equals(c) // true
```

### 8. Java integer caching
```java
Integer x = 127, y = 127;   // x == y is true  (cached -128..127)
Integer p = 128, q = 128;   // p == q is FALSE
```

### 9. Python mutable defaults and closures
```python
def f(x, acc=[]):
    acc.append(x); return acc
f(1)  # [1]
f(2)  # [1, 2]  - the same list

fns = [lambda: i for i in range(3)]
[g() for g in fns]   # [2, 2, 2] - late binding of i
```

### 10. Short-circuit evaluation
```c
int i = 0;
if (0 && i++) ;   // i++ never runs, i stays 0
if (1 || i++) ;   // i++ never runs
```

## Method

1. **Write down the state** of every variable after each line. Do not trace in your head.
2. Mark the **exact print format** (`%d` vs `%c` vs `%f`) — many "wrong" answers are formatting, not logic.
3. Check for **missing break, stray semicolon, `=` instead of `==`**, and off-by-one loop bounds.
4. If the code is genuinely **undefined behaviour**, the intended answer is usually "undefined / compiler-dependent".
5. Budget 60–90 seconds. If the trace is not converging, mark it and move on — in a 40-minute, 100-question paper, one traced question is worth the same as one one-liner.

---

## Exam pointers

1. `sizeof` an array **inside a function** gives pointer size — the array has decayed.
2. Java `Integer` caching breaks `==` above **127**.
3. Python lambdas in a loop capture the **variable**, not its value.
4. A stray `;` after `for(...)` is the most common planted bug.
5. When in doubt between "undefined" and a specific number, **undefined** is usually the intended answer in C questions.
