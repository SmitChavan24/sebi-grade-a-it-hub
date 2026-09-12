# Hashing

## Idea

Map a key to an index with a **hash function**, giving average **O(1)** insert, search and delete. Worst case degrades to O(n) when everything collides.

## Hash functions

- **Division method:** h(k) = k mod m. Choose **m prime**, and not close to a power of 2.
- **Multiplication method:** h(k) = ⌊m(kA mod 1)⌋, A ≈ 0.618 (golden ratio).
- **Universal hashing** — pick randomly from a family to defeat adversarial inputs. Relevant to **hash-collision DoS attacks**.
- **Cryptographic hashes** (SHA-256) are a different thing entirely — see the security notes.

A good hash function is **deterministic, uniform, fast, and avalanche-sensitive**.

## Collision resolution

### 1. Separate chaining
Each bucket holds a linked list (or tree, in Java 8+ HashMap once a bucket gets long).

- **Load factor α = n/m** can exceed 1.
- Average search: **unsuccessful ≈ α**, **successful ≈ 1 + α/2**.
- Simple deletion; extra pointer memory.

### 2. Open addressing
All elements live in the table itself; on collision, **probe** for another slot.

| Probing | Formula | Problem |
|---|---|---|
| **Linear** | (h(k) + i) mod m | **Primary clustering** |
| **Quadratic** | (h(k) + c₁i + c₂i²) mod m | **Secondary clustering**; may not find an empty slot unless m is prime and α < 0.5 |
| **Double hashing** | (h₁(k) + i·h₂(k)) mod m | Best distribution; h₂ must never return 0 and should be coprime with m |

- Load factor **α < 1** always; performance degrades sharply above ~0.7, which is when **rehashing** (usually doubling m) happens.
- Average probes for unsuccessful search ≈ **1/(1 − α)**; for successful ≈ **(1/α)·ln(1/(1 − α))**.
- **Deletion needs a tombstone** marker; otherwise probe chains break. This is the most-asked open-addressing subtlety.

## Applications

Dictionaries and symbol tables, database indexing, caches, **de-duplication**, set membership, **Bloom filters** (probabilistic, no false negatives but possible false positives, used for "have I seen this before" at huge scale), **consistent hashing** (distributes keys across nodes so that adding or removing a node moves only ~1/n of the keys — the basis of distributed caches and sharded databases).

---

## Exam pointers

1. **Separate chaining allows α > 1; open addressing does not.**
2. Linear probing → **primary clustering**; quadratic → secondary; double hashing is best.
3. **Deletion in open addressing requires tombstones.**
4. Probes for unsuccessful search under open addressing ≈ **1/(1 − α)**.
5. A **Bloom filter** can give false positives but never false negatives.
