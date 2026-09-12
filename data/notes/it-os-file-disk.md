# File Systems and Disk Scheduling

## File concepts

A **file** is a named collection of related information. Attributes: name, identifier, type, location, size, protection, timestamps.

**Access methods:** sequential, direct/relative, indexed.

**Directory structures:** single-level, two-level, tree, **acyclic graph** (sharing via links), general graph (needs garbage collection to handle cycles).

**Links:** a **hard link** is another directory entry pointing to the same inode (same file, reference counted, cannot cross file systems); a **soft/symbolic link** stores a path (can dangle, can cross file systems).

## Allocation methods

| Method | How | Pros | Cons |
|---|---|---|---|
| **Contiguous** | Consecutive blocks | Fast sequential and direct access | External fragmentation; file growth problem |
| **Linked** | Each block points to the next | No external fragmentation | **No direct access**; pointer overhead; reliability risk. **FAT** is a variant with the links in a table |
| **Indexed** | An index block holds all block pointers | Direct access, no external fragmentation | Index block overhead; needs multi-level/linked index for large files |

**Unix inode:** direct blocks + **single indirect** + **double indirect** + **triple indirect**. A standard numerical asks for the **maximum file size** given block size and pointer size:

> Block size 4 KB, pointer 4 bytes → 1024 pointers per block.
> Max size = 12 direct + 1024 single + 1024² double + 1024³ triple, all × 4 KB.

**Free space management:** bit vector (bitmap), linked list, grouping, counting.

## Disk structure and performance

**Access time = seek time + rotational latency + transfer time.** Seek time dominates, which is why scheduling exists. Average rotational latency = **half a rotation** (at 7200 rpm, one rotation = 8.33 ms, so ≈ 4.17 ms).

## Disk scheduling algorithms

Given a request queue and a current head position:

| Algorithm | Movement |
|---|---|
| **FCFS** | In arrival order — fair, potentially terrible |
| **SSTF** | Shortest seek time first — can **starve** far requests |
| **SCAN (elevator)** | Sweep to one end servicing requests, then reverse |
| **C-SCAN** | Sweep in one direction only, then jump back without servicing — **more uniform waiting time** |
| **LOOK / C-LOOK** | Like SCAN/C-SCAN but reverse at the **last request**, not at the end of the disk |

Always draw the head-movement diagram and **sum the absolute differences** to get total head movement.

## RAID

| Level | Technique | Notes |
|---|---|---|
| **RAID 0** | Striping | Performance, **no redundancy** |
| **RAID 1** | Mirroring | 50% capacity, best read performance |
| **RAID 2/3/4** | Bit/byte/block-level with a dedicated parity disk | Parity disk is a bottleneck |
| **RAID 5** | Block-level striping with **distributed parity** | Survives 1 disk failure; usable capacity (n−1)/n |
| **RAID 6** | Dual distributed parity | Survives **2** failures |
| **RAID 10** | Mirror then stripe | High performance and redundancy; expensive |

## File systems to recognise

FAT32, NTFS (journaling, ACLs), ext2/3/4 (ext3+ journaling), XFS, Btrfs, ZFS (copy-on-write, checksums), NFS (network), and **journaling** as the general technique for crash consistency.

---

## Exam pointers

1. **Linked allocation cannot do direct access.**
2. Learn the **inode maximum file size** calculation — it is asked constantly.
3. **C-SCAN gives more uniform wait times** than SCAN.
4. RAID 5 survives **one** failure, RAID 6 **two**. RAID 0 survives none.
5. Average rotational latency is **half** a rotation.
