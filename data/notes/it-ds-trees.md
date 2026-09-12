# Trees, BSTs, Heaps and Balanced Trees

## Terminology

Root, parent, child, leaf, sibling, **degree**, **height** (longest path root→leaf, edges), **depth/level**, subtree, forest.

**Binary tree facts:**
- Maximum nodes at level l = **2^l** (root at level 0).
- Maximum nodes in a tree of height h = **2^(h+1) − 1**.
- Minimum height for n nodes = **⌊log₂ n⌋**.
- In a tree with n₀ leaves and n₂ nodes of degree 2: **n₀ = n₂ + 1**.
- A **full/strict** binary tree has 0 or 2 children per node; a **complete** binary tree is filled left to right; a **perfect** tree has all leaves at the same level.

## Traversals

| Traversal | Order | Use |
|---|---|---|
| **Preorder** | Root, Left, Right | Copy a tree, prefix expression |
| **Inorder** | Left, Root, Right | **Sorted output of a BST** |
| **Postorder** | Left, Right, Root | Delete a tree, postfix expression |
| **Level order** | BFS using a queue | Shortest path in an unweighted tree |

**Reconstruction:** inorder + preorder, or inorder + postorder, uniquely determines a binary tree. **Preorder + postorder does not** (unless the tree is full).

## Binary Search Tree

Invariant: left subtree < node < right subtree, for all nodes.

| Operation | Average | Worst (skewed) |
|---|---|---|
| Search / insert / delete | O(log n) | **O(n)** |

**Deletion cases:** leaf → remove; one child → splice; **two children → replace with inorder successor (smallest in the right subtree) or predecessor**, then delete that node.

Number of distinct BSTs with n keys = the **nth Catalan number** = C(2n, n)/(n+1). For n = 3 it is 5; for n = 4 it is 14.

## Balanced trees

- **AVL tree** — for every node, **balance factor = height(left) − height(right) ∈ {−1, 0, 1}**. Rebalanced by **LL, RR, LR, RL rotations**. Strictly balanced → faster lookups, more rotations on write.
- **Red-Black tree** — looser balance (longest path ≤ 2 × shortest), fewer rotations, used in `std::map` and Linux's scheduler. Properties: root black, no two consecutive reds, every root-to-NULL path has the same number of black nodes.
- **B tree / B+ tree** — high branching factor for **disk-based** storage; see the DBMS indexing note.
- **Trie** — prefix tree for strings; search is O(length of key), independent of the number of keys. Used in autocomplete, IP routing tables, dictionary lookups.
- **Segment tree / Fenwick (BIT)** — range queries with point updates in O(log n).

## Heaps

A **complete binary tree** stored in an array, satisfying the heap property: parent ≥ children (**max heap**) or parent ≤ children (**min heap**).

- Array indices (0-based): parent of i = **(i−1)/2**; children = **2i+1** and **2i+2**.
- Insert: append at the end, **sift up** → O(log n).
- Extract root: swap with the last element, remove, **sift down** → O(log n).
- **Build heap from an unsorted array: O(n)**, not O(n log n) — a classic exam trap.
- **Heap sort:** build heap O(n), then extract n times → **O(n log n)**, in-place, **not stable**.

Applications: priority queues, **top-K** problems, Dijkstra and Prim, median maintenance with two heaps, **order books by price-time priority**.

---

## Exam pointers

1. **Inorder traversal of a BST gives sorted order.**
2. Preorder + postorder does **not** uniquely determine a tree.
3. **Build-heap is O(n)**; heapsort is O(n log n).
4. BST worst case is O(n) — which is exactly why AVL and Red-Black trees exist.
5. Number of BSTs with n distinct keys = **Catalan(n)**.
