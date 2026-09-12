# Indexing, B+ Trees and File Organisation

## File organisation

| Organisation | Insert | Search | Notes |
|---|---|---|---|
| **Heap (unordered)** | Fast (append) | Linear scan | Good for bulk loads |
| **Sequential (ordered)** | Expensive | Binary search possible | Needs overflow handling |
| **Hashed** | O(1) average | O(1) for equality; **useless for ranges** | Static vs dynamic hashing |
| **Clustered** | — | Fast on the clustering key | Rows physically ordered |

## Index classification

- **Primary index** — on the ordering key field of an ordered file; **sparse** (one entry per block).
- **Clustering index** — on a non-key ordering field.
- **Secondary index** — on a non-ordering field; must be **dense**.

**Dense index:** one entry per record. **Sparse index:** one entry per block — smaller, but requires the file to be ordered on that field.

**Multi-level index:** treat the index itself as a file and index it — which converges on the B+ tree.

## B+ tree — the structure every DBMS uses

- All **data pointers are in the leaf nodes**; internal nodes hold only keys for routing.
- **Leaves are linked** in a list, which makes **range queries** efficient — the main reason B+ trees beat B trees for databases.
- **Balanced**: all leaves at the same level, so every search costs the same **O(log n)**.
- A node of order n holds at most n−1 keys and n pointers; internal nodes must be at least half full (except the root).

| | B tree | B+ tree |
|---|---|---|
| Data in internal nodes | Yes | **No** |
| Sequential access | Harder | **Easy — linked leaves** |
| Height | Can be taller (keys spread out) | Shorter (more keys per internal node) |
| Search cost | Can terminate early | Always reaches a leaf |

**Insertion:** insert into the leaf; if it overflows, **split** and push the middle key up; splits can cascade to the root, which is how the tree grows in height (upwards).
**Deletion:** remove; if underflow, **borrow from a sibling** or **merge**, possibly shrinking the height.

## Hashing

- **Static hashing** — fixed number of buckets; **overflow chains** degrade performance as the file grows.
- **Extendible hashing** — a directory of 2^d entries with a **global depth** and per-bucket **local depth**; on overflow, split just that bucket and double the directory only when local depth = global depth.
- **Linear hashing** — splits buckets in a fixed order, avoiding a directory.

**Hash index:** excellent for equality (`=`), **useless for `<`, `>`, `BETWEEN`, `ORDER BY` and prefix LIKE**. This is the standard comparison question against B+ trees.

## Query processing and optimisation

Parse → translate to relational algebra → **optimise** → execute.

- **Cost-based optimisation** using statistics (cardinality, selectivity, histograms).
- **Heuristic rules:** push **selection** down, push **projection** down, do the most restrictive selection first, avoid Cartesian products.
- **Join algorithms:** nested loop, **block nested loop**, **index nested loop**, **sort-merge join**, **hash join**. Cost is measured in **disk block transfers and seeks**.
- Reading an **EXPLAIN plan** and spotting a full table scan where an index should be used is a genuinely useful practical skill.

---

## Exam pointers

1. In a **B+ tree, all records are in the leaves**, and the leaves are **linked**.
2. Secondary index must be **dense**; primary index can be **sparse**.
3. **Hash indexes cannot do range queries.**
4. B+ tree height grows by **root split**, upwards, not downwards.
5. The first heuristic of query optimisation is always: **push selections down**.
