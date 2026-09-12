# Java Essentials

## Platform

**JDK** (development kit: compiler + tools + JRE) ⊃ **JRE** (runtime: libraries + JVM) ⊃ **JVM** (executes bytecode).

`javac` compiles `.java` → **bytecode `.class`** → the JVM interprets and **JIT-compiles** hot paths to native code. This is what "write once, run anywhere" means — the bytecode is portable, the JVM is not.

**JVM memory areas:** method area (class metadata), **heap** (objects; shared), **stack** (per thread, frames), PC register, native method stack.

**Garbage collection:** generational — **young (eden + survivor)** and **old** generations; minor vs major/full GC; **mark-and-sweep** with compaction. Collectors: Serial, Parallel, **G1**, ZGC. `finalize()` is deprecated; use try-with-resources.

## Language features

- Everything lives in a class; entry point `public static void main(String[] args)`.
- **Primitives** (byte, short, int, long, float, double, char, boolean) vs **wrapper classes** with **autoboxing**.
- **Strings are immutable**; the **string pool** interns literals. Use **StringBuilder** (not thread safe, faster) or **StringBuffer** (synchronised) for repeated concatenation.
- `==` compares **references** for objects; **`.equals()`** compares content. Override `equals()` and `hashCode()` **together** — unequal hashCodes for equal objects break HashMap.
- `final` (constant / no override / no subclass), `finally` (always executes), `finalize()` (deprecated GC hook) — a classic three-way question.
- **Pass by value always** — object references are themselves passed by value.

## Collections framework

```
Collection
├── List  : ArrayList, LinkedList, Vector (synchronised), Stack
├── Set   : HashSet, LinkedHashSet, TreeSet (sorted)
└── Queue : PriorityQueue, ArrayDeque, LinkedList
Map (separate): HashMap, LinkedHashMap, TreeMap, Hashtable, ConcurrentHashMap
```

| | ArrayList | LinkedList |
|---|---|---|
| Access | O(1) | O(n) |
| Insert/delete middle | O(n) | O(1) given the node |
| Memory | Compact | Node overhead |

| | HashMap | Hashtable | ConcurrentHashMap |
|---|---|---|---|
| Thread safe | No | Yes (whole-map lock) | Yes (bucket-level) |
| Null key/value | One null key allowed | None | None |
| Performance | Best single-threaded | Poor | Best concurrent |

**HashMap internals:** array of buckets, each a linked list that **converts to a red-black tree** when it exceeds a threshold (Java 8+); default capacity 16, load factor 0.75, resize doubles capacity and rehashes.

## Exceptions

```
Throwable
├── Error            (OutOfMemoryError, StackOverflowError — do not catch)
└── Exception
    ├── Checked      (IOException, SQLException — must be handled or declared)
    └── RuntimeException (unchecked: NullPointer, ArrayIndexOutOfBounds,
                          ArithmeticException, ClassCast, NumberFormat)
```

`try / catch / finally / throw / throws`, multi-catch, **try-with-resources** for AutoCloseable. `finally` runs even when the try block returns (except on `System.exit()`).

## Multithreading

- Create by **extending Thread** or, preferably, **implementing Runnable / Callable**.
- States: NEW → RUNNABLE → RUNNING → BLOCKED/WAITING/TIMED_WAITING → TERMINATED.
- `synchronized` methods and blocks; **`volatile`** guarantees visibility (not atomicity); `wait()`, `notify()`, `notifyAll()` must be called inside a synchronized block.
- **ExecutorService** and thread pools; `Future`; `CompletableFuture`; `java.util.concurrent` — `AtomicInteger`, `ConcurrentHashMap`, `CountDownLatch`, `BlockingQueue`.
- **`sleep()` does not release the lock; `wait()` does.** A guaranteed exam question.

## Modern Java

Lambdas `(a, b) -> a + b`, functional interfaces (`Function`, `Predicate`, `Supplier`, `Consumer`), **Streams** (`list.stream().filter(...).map(...).collect(...)` — lazy, with intermediate and terminal operations), `Optional`, `var`, records, sealed classes, virtual threads.

---

## Exam pointers

1. **JDK ⊃ JRE ⊃ JVM.**
2. **`sleep()` holds the lock, `wait()` releases it.**
3. Strings are **immutable**; StringBuffer is synchronised, StringBuilder is not.
4. Checked exceptions must be handled or declared; **RuntimeExceptions need not be**.
5. Override `equals()` and `hashCode()` **together**.
