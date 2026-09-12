# Sorting and Searching

## Comparison sorts

| Algorithm | Best | Average | Worst | Space | Stable | In-place |
|---|---|---|---|---|---|---|
| **Bubble** | O(n)* | O(n²) | O(n²) | O(1) | **Yes** | Yes |
| **Selection** | O(n²) | O(n²) | O(n²) | O(1) | No | Yes |
| **Insertion** | **O(n)** | O(n²) | O(n²) | O(1) | **Yes** | Yes |
| **Merge** | O(n log n) | O(n log n) | **O(n log n)** | **O(n)** | **Yes** | No |
| **Quick** | O(n log n) | **O(n log n)** | **O(n²)** | O(log n) | No | Yes |
| **Heap** | O(n log n) | O(n log n) | **O(n log n)** | O(1) | No | Yes |
| **Shell** | O(n log n) | depends on gaps | O(n²) | O(1) | No | Yes |

\* Bubble sort is O(n) in the best case only with the "swapped" flag optimisation.

**Lower bound:** any comparison-based sort needs **Ω(n log n)** comparisons in the worst case (decision-tree argument: n! leaves, height ≥ log₂(n!) = Θ(n log n)).

## Choosing one

- **Nearly sorted data** → insertion sort (genuinely O(n)).
- **Guaranteed O(n log n) and stability required** → merge sort.
- **Fastest in practice, memory tight** → quicksort (with a randomised or median-of-three pivot).
- **Guaranteed O(n log n) and O(1) space** → heap sort.
- **Real libraries** use hybrids: **Timsort** (merge + insertion, stable — Python, Java objects) and **Introsort** (quick → heap on deep recursion — C++ STL).

**Quicksort worst case** is an already-sorted array with a first/last-element pivot — fixed by randomising the pivot or using median-of-three.

## Non-comparison sorts

| Algorithm | Complexity | Condition |
|---|---|---|
| **Counting sort** | O(n + k) | Integer keys in a small range k. **Stable** |
| **Radix sort** | O(d(n + k)) | Fixed-width keys; uses a stable sort (usually counting) per digit, **least significant digit first** |
| **Bucket sort** | O(n) average | Input uniformly distributed |

These beat the Ω(n log n) bound because they **do not compare elements**.

## Stability — why it matters

A stable sort preserves the relative order of equal keys. It matters when sorting on multiple fields in sequence — sort by price, then stably by time, and you get **price-time priority**, which is exactly how an exchange order book is ordered.

## Searching

- **Linear search** — O(n), unsorted data.
- **Binary search** — **O(log n)**, requires a **sorted array with random access**. Recurrence T(n) = T(n/2) + O(1).
  - Overflow-safe midpoint: `mid = low + (high − low) / 2`.
  - Variants: first/last occurrence, lower/upper bound, search in a rotated sorted array, binary search on the answer.
- **Ternary search** — for unimodal functions; not better than binary for sorted arrays.
- **Interpolation search** — O(log log n) for uniformly distributed data, O(n) worst.
- **Exponential search** — for unbounded/infinite lists.

---

## Exam pointers

1. **Stable: bubble, insertion, merge, counting. Not stable: selection, quick, heap.**
2. **Merge sort needs O(n) auxiliary space; heap sort needs O(1).**
3. **Quicksort worst case O(n²)** — on sorted input with a bad pivot.
4. Counting/radix/bucket beat n log n because they **do not compare**.
5. Binary search requires **sorted + random access** — it cannot be used on a linked list efficiently.
