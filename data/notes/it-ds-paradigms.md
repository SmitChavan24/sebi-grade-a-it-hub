# Algorithm Design Paradigms

## 1. Divide and conquer

**Divide → conquer (recurse) → combine.** Examples: merge sort, quicksort, binary search, Strassen's matrix multiplication, closest pair of points, **Karatsuba** multiplication, FFT.

Analysis is by recurrence, usually solved with the Master theorem.

## 2. Greedy

Make the **locally optimal choice** at each step and never reconsider. Correct only when the problem has **greedy-choice property** and **optimal substructure**.

**Works:** Dijkstra, Prim, Kruskal, Huffman coding, **activity selection** (sort by finish time), fractional knapsack (sort by value/weight), job sequencing with deadlines, coin change **with canonical coin systems**.

**Fails:** **0/1 knapsack**, coin change with arbitrary denominations (e.g. coins {1, 3, 4} for 6: greedy gives 4+1+1 = 3 coins, optimal is 3+3 = 2 coins), longest path.

## 3. Dynamic programming

For problems with **overlapping subproblems** and **optimal substructure**. Two styles: **memoisation** (top-down recursion + cache) and **tabulation** (bottom-up table).

| Problem | Recurrence | Complexity |
|---|---|---|
| **Fibonacci** | f(n) = f(n−1) + f(n−2) | O(n) |
| **0/1 Knapsack** | dp[i][w] = max(dp[i−1][w], v[i] + dp[i−1][w−w[i]]) | O(nW) — **pseudo-polynomial** |
| **LCS** | if equal: 1 + dp[i−1][j−1]; else max(dp[i−1][j], dp[i][j−1]) | O(mn) |
| **Edit distance** | min(insert, delete, replace) + 1 | O(mn) |
| **LIS** | O(n²) DP, or **O(n log n)** with patience/binary search | |
| **Matrix chain multiplication** | dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + cost | O(n³) |
| **Coin change** | min coins / number of ways | O(n·amount) |
| **Subset sum / partition** | boolean DP over sums | O(n·sum) |
| **Floyd-Warshall** | all-pairs shortest paths | O(V³) |
| **Bellman-Ford** | relax all edges V−1 times | O(VE) |

**DP vs divide and conquer:** DP's subproblems **overlap** and are therefore stored; D&C subproblems are disjoint and recomputed freely.

**DP vs greedy:** DP explores all choices and keeps the best; greedy commits immediately. Every greedy-solvable problem can be solved by DP, more slowly.

## 4. Backtracking

Systematic search that **prunes** branches that cannot lead to a solution: N-Queens, Sudoku, graph colouring, Hamiltonian path, subset generation, rat in a maze, word search.

## 5. Branch and bound

Backtracking plus a **bound** on the best achievable solution, used to prune aggressively in optimisation problems: 0/1 knapsack, TSP, job assignment.

## 6. Others worth naming

- **Randomised algorithms** — randomised quicksort, Monte Carlo (fast, possibly wrong) vs Las Vegas (always right, time varies).
- **Approximation algorithms** — when exact is NP-hard: vertex cover 2-approximation, TSP with triangle inequality.
- **Two pointers / sliding window** — O(n) solutions for subarray and string problems.
- **Bit manipulation** — subsets via bitmasks, XOR tricks (`a ^ a = 0` gives the single non-repeating element), `n & (n−1)` clears the lowest set bit.

---

## Exam pointers

1. **DP needs overlapping subproblems + optimal substructure.** Say both in a descriptive answer.
2. **0/1 knapsack is DP; fractional knapsack is greedy.** Know why.
3. Knapsack's O(nW) is **pseudo-polynomial**, not polynomial in the input size.
4. **LIS in O(n log n)** using binary search — worth remembering as the non-obvious one.
5. Greedy needs a **proof**; in a descriptive answer, give the exchange argument or the counterexample.
