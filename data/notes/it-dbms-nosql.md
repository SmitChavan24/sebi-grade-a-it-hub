# NoSQL, Data Warehousing and Distributed Databases

## Why NoSQL

Relational systems struggle with **horizontal scale**, **schema flexibility** and **very high write throughput**. NoSQL trades some of ACID for those.

| Family | Model | Examples | Fits |
|---|---|---|---|
| **Key-value** | Hash map | Redis, DynamoDB | Caching, sessions, counters |
| **Document** | JSON/BSON documents | MongoDB, CouchDB | Semi-structured content, catalogues |
| **Column-family** | Sparse, wide rows | Cassandra, HBase | Time series, huge write volume |
| **Graph** | Nodes and edges | Neo4j, JanusGraph | Relationships, **fraud rings, ownership networks** |

> A graph database detecting **circular trading** or linked beneficial owners is a good, concrete example to give in a SEBI interview.

## CAP theorem (Brewer)

In the presence of a network **Partition**, a distributed system must choose between **Consistency** and **Availability**. You cannot have all three simultaneously.

- **CP** — MongoDB (default), HBase: refuse writes rather than diverge.
- **AP** — Cassandra, DynamoDB: accept writes, reconcile later.
- **CA** — only meaningful for a single-node or non-partitioned system.

**PACELC** extends it: *if Partition then A or C, Else Latency or Consistency* — the everyday trade-off even when nothing is broken.

**BASE** (Basically Available, Soft state, Eventual consistency) is the NoSQL counterpart to ACID. **Eventual consistency** means replicas converge if writes stop.

## Distributed database concepts

- **Fragmentation** — horizontal (rows), vertical (columns), mixed. **Replication** — full or partial; improves availability and read performance at the cost of update complexity.
- **Transparency** — location, fragmentation, replication transparency.
- **Two-Phase Commit (2PC)** — prepare then commit, with a coordinator. **Blocking** if the coordinator fails. **3PC** adds a phase to reduce blocking.
- **Consensus:** **Paxos**, **Raft** — how replicas agree on a log. **Quorum** rule: **R + W > N** guarantees a read sees the latest write.
- **Sharding** — partition by key (range, hash, directory). A bad shard key creates **hot spots**.

## Data warehousing

| | OLTP | OLAP |
|---|---|---|
| Purpose | Run the business | Analyse the business |
| Queries | Short, many, write-heavy | Long, few, read-heavy |
| Design | **Normalised (3NF)** | **Denormalised (star/snowflake)** |
| Data | Current, detailed | Historical, aggregated |

**Schemas:** **star** (one fact table, denormalised dimensions) · **snowflake** (normalised dimensions) · **fact constellation / galaxy** (multiple fact tables sharing dimensions).

**ETL vs ELT**, **data mart** (a subject-specific subset), **data lake** (raw, schema-on-read), **lakehouse**, **slowly changing dimensions (Type 1 overwrite, Type 2 new row with validity dates, Type 3 new column)**.

**OLAP operations:** **roll-up** (aggregate up a hierarchy), **drill-down**, **slice** (one dimension fixed), **dice** (sub-cube), **pivot**.

**Architectures:** ROLAP (relational), MOLAP (multidimensional cube), HOLAP (hybrid).

## Data mining, briefly

Classification, clustering, **association rule mining** (support, confidence, lift; the **Apriori** algorithm), regression, anomaly detection. **Anomaly detection on trade data is exactly what a market surveillance system does** — connect the two in any descriptive answer.

---

## Exam pointers

1. CAP: under a partition you choose **C or A**; "CA" systems are not distributed.
2. Quorum consistency requires **R + W > N**.
3. **Star schema = denormalised dimensions; snowflake = normalised.**
4. OLTP normalised, OLAP denormalised.
5. **2PC blocks if the coordinator fails** — this is the standard criticism, and why Raft/Paxos matter.
