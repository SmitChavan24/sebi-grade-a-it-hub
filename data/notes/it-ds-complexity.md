# Complexity Analysis

## Asymptotic notation

| Notation | Meaning | Bound |
|---|---|---|
| **O(g)** | f grows no faster than g | Upper |
| **Ω(g)** | f grows at least as fast as g | Lower |
| **Θ(g)** | Both | Tight |
| o(g) / ω(g) | Strictly slower / faster | Strict |

**Growth order:** 1 < log log n < log n < √n < n < n log n < n² < n³ < 2ⁿ < n! < nⁿ

Always analyse **worst, average and best** case separately. Quicksort is O(n²) worst but Θ(n log n) average — and the average is what matters in practice.

## Space complexity

Total space = input space + **auxiliary space**. When a question asks for "space complexity of merge sort", the answer usually means **auxiliary**: O(n) for merge sort, O(log n) for quicksort (recursion stack), O(1) for heap sort.

## Recurrence relations

**Master theorem** for T(n) = aT(n/b) + f(n), with a ≥ 1, b > 1:

Let c = log_b(a). Compare f(n) with n^c:

1. If f(n) = O(n^(c−ε)) → **T(n) = Θ(n^c)**  (work dominated by leaves)
2. If f(n) = Θ(n^c) → **T(n) = Θ(n^c · log n)**  (work evenly spread)
3. If f(n) = Ω(n^(c+ε)) **and** regularity holds → **T(n) = Θ(f(n))**  (root dominates)

**Standard results to memorise:**

| Recurrence | Solution | Example |
|---|---|---|
| T(n) = T(n/2) + O(1) | Θ(log n) | Binary search |
| T(n) = T(n/2) + O(n) | Θ(n) | Quickselect (average) |
| T(n) = 2T(n/2) + O(1) | Θ(n) | Tree traversal |
| **T(n) = 2T(n/2) + O(n)** | **Θ(n log n)** | Merge sort |
| T(n) = 2T(n/2) + O(n²) | Θ(n²) | |
| T(n) = T(n−1) + O(1) | Θ(n) | Linear recursion |
| T(n) = T(n−1) + O(n) | Θ(n²) | Selection/insertion sort worst |
| T(n) = 2T(n−1) + O(1) | Θ(2ⁿ) | Towers of Hanoi, naive subsets |

Other methods: **substitution** (guess and prove by induction) and the **recursion tree**.

## Amortised analysis

The average cost per operation over a worst-case sequence. **Dynamic array doubling**: a single push can cost O(n) when it resizes, but the **amortised cost is O(1)** because resizes are geometrically rare. Methods: aggregate, accounting (banker's), potential.

## Complexity classes

- **P** — solvable in polynomial time.
- **NP** — verifiable in polynomial time.
- **NP-complete** — in NP and every NP problem reduces to it (SAT, 3-SAT, clique, vertex cover, Hamiltonian cycle, subset sum, TSP decision version, graph colouring).
- **NP-hard** — at least as hard as NP-complete, need not be in NP (halting problem, TSP optimisation).
- **P vs NP** is open. If any NP-complete problem is in P, then P = NP.

---

## Exam pointers

1. Learn the **recurrence table** above by heart — it answers most complexity questions instantly.
2. Master theorem case 2 gives the **n log n** family.
3. Amortised O(1) for dynamic array append; do not confuse amortised with average.
4. **NP-complete ⊆ NP; NP-hard need not be.**
5. When asked "space complexity", clarify whether auxiliary space is meant — and say so in a descriptive answer.
