# Big Data

## The Vs

**Volume, Velocity, Variety** (the original three), plus **Veracity** (trustworthiness) and **Value**. Some add Variability.

Market data is a textbook case of all five: tick-by-tick feeds are enormous and fast (volume, velocity), combined with filings, KYC records, news and social media (variety), of uneven quality (veracity), and useful only if it yields actionable surveillance signals (value).

## The Hadoop ecosystem

| Component | Role |
|---|---|
| **HDFS** | Distributed file system; files split into blocks (default 128 MB), **replicated 3×**; **NameNode** holds metadata, **DataNodes** hold blocks |
| **MapReduce** | Batch processing: **Map** (transform into key-value pairs) → **Shuffle & Sort** → **Reduce** (aggregate) |
| **YARN** | Resource manager |
| **Hive** | SQL-like querying over HDFS |
| **Pig** | Dataflow scripting |
| **HBase** | Column-family NoSQL store on HDFS |
| **Sqoop / Flume / Kafka** | Ingestion (RDBMS / logs / streaming) |
| **Oozie** | Workflow scheduling |
| **ZooKeeper** | Coordination |

**NameNode is the single point of failure** in classic HDFS — hence the standby NameNode and high-availability configuration. Learn that; it is the standard question.

## Spark and modern processing

**Apache Spark** replaced MapReduce for most workloads: **in-memory** processing, **RDD/DataFrame** abstractions, lazy evaluation with a **DAG scheduler**, and 10–100× speedups on iterative work. Modules: Spark SQL, Spark Streaming (micro-batch), MLlib, GraphX.

**Batch vs stream:**

| | Batch | Stream |
|---|---|---|
| Latency | Minutes to hours | Milliseconds to seconds |
| Tools | MapReduce, Spark, Hive | **Kafka**, Flink, Spark Streaming |
| Use | Reports, end-of-day reconciliation | **Real-time surveillance alerts**, fraud detection |

**Kafka** — distributed, partitioned, replicated **commit log**; producers, topics, partitions, consumer groups, offsets. It is the standard backbone for **event-driven architectures**, and conceptually the same pattern as a sequenced exchange message stream.

**Lambda architecture** (batch layer + speed layer + serving layer) vs **Kappa architecture** (stream only). **Data lake** (raw, schema-on-read) vs **data warehouse** (curated, schema-on-write) vs **lakehouse** (both, with table formats like Delta/Iceberg).

## Data governance

Cataloguing, **lineage** (where did this number come from — essential for a regulator), quality rules, master data management, retention and deletion policies, access control, and **privacy by design** under DPDP.

## Application to markets

- Storing and querying **tick data** for surveillance replay and investigation.
- **Real-time alerting** on order/trade streams.
- Reconstructing the **order book at a point in time** to analyse an incident.
- Cross-referencing trading, KYC, holdings and fund-flow datasets for connectedness analysis.
- Capacity: an exchange can generate **billions of messages a day** — this is genuinely big data, not a buzzword.

---

## Exam pointers

1. **3 Vs core, 5 Vs full.**
2. **HDFS: 128 MB blocks, 3× replication, NameNode is the metadata SPOF.**
3. MapReduce phases: **Map → Shuffle & Sort → Reduce**.
4. **Spark is in-memory**, hence much faster than MapReduce for iterative jobs.
5. **Kafka is a distributed commit log** — the same idea as a replayable exchange message stream.
