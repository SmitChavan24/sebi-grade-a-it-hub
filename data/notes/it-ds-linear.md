# Arrays, Linked Lists, Stacks and Queues

## Arrays

Contiguous memory, **O(1) random access** by index, fixed size (unless dynamic).

**Address calculation** — a routine exam question.
- 1-D: `addr(A[i]) = base + (i − lower) × size`
- 2-D **row-major**: `base + ((i − lr) × total_cols + (j − lc)) × size`
- 2-D **column-major**: `base + ((j − lc) × total_rows + (i − lr)) × size`

| Operation | Array | Linked list |
|---|---|---|
| Access by index | **O(1)** | O(n) |
| Search | O(n) | O(n) |
| Insert/delete at front | O(n) | **O(1)** |
| Insert/delete at end | O(1) amortised | O(n), or O(1) with a tail pointer |
| Memory | Contiguous, cache-friendly | Scattered, pointer overhead |
| Size | Fixed / amortised growth | Dynamic |

## Linked lists

- **Singly** — one next pointer; cannot traverse backwards.
- **Doubly** — prev and next; deletion given only a node pointer is O(1).
- **Circular** — last points to the first; used in round-robin scheduling and buffers.

**Standard problems and techniques:**
- **Reverse a list** — iterative with three pointers (prev, curr, next).
- **Cycle detection** — **Floyd's tortoise and hare**: slow moves 1, fast moves 2; they meet inside the cycle. To find the cycle start, reset one pointer to the head and move both one step at a time.
- **Middle element** — slow/fast pointer in one pass.
- **Nth from end** — two pointers n apart.
- **Merge two sorted lists**, **detect intersection**, **remove duplicates**.

## Stack — LIFO

Operations: push, pop, peek, isEmpty — all **O(1)**. Overflow when full, **underflow when popping an empty stack**.

**Applications:**
- **Function call stack** and recursion.
- **Expression conversion and evaluation** — infix → postfix (**Shunting-yard**), postfix evaluation.
- **Balanced parentheses checking.**
- **Undo/redo**, browser back, **DFS**, backtracking.
- **Next greater element** and histogram problems, using a monotonic stack.

**Postfix evaluation:** scan left to right; push operands; on an operator pop **two** operands (second popped is the left operand), apply, push the result.

**Infix to postfix rules:** operands go straight to output; operators are pushed, but before pushing, pop all operators of **greater or equal precedence** (for left-associative operators); `(` is pushed; `)` pops until `(`.

## Queue — FIFO

Operations: enqueue (rear), dequeue (front) — O(1).

- **Circular queue** — avoids the false-full condition of a linear array queue. With array size n, one slot is usually left empty so that `full` and `empty` are distinguishable: **full when (rear + 1) % n == front**.
- **Deque** — insert/delete at both ends.
- **Priority queue** — served by priority, not arrival; implemented with a **heap** (O(log n) insert and extract).

**Applications:** CPU and disk scheduling, BFS, buffers, printer spooling, **order queues in a matching engine**.

**Classic conversions:** implement a queue using two stacks (amortised O(1) dequeue), and a stack using two queues.

---

## Exam pointers

1. Row-major vs column-major address calculation — read the question carefully.
2. Floyd's cycle detection: **slow 1, fast 2**, then reset one to the head.
3. Circular queue full condition: **(rear + 1) % size == front**.
4. In postfix evaluation the **second popped operand is the left one** — this is where most mistakes happen.
5. A priority queue is not a queue: **priority, not arrival order**.
