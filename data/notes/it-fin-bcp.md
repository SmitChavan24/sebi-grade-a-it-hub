# Business Continuity for Market Infrastructure

## Why the standard is higher here

For an ordinary company, an outage is a commercial loss. For an exchange or clearing corporation, an outage during market hours means **price discovery stops**, positions cannot be closed, margins cannot be met, and the effects propagate across every participant. Continuity is therefore a **regulatory obligation**, not a business decision.

## The obligations (know the shape, verify the numbers)

- **Disaster Recovery site in a different seismic zone** from the primary data centre, with sufficient separation.
- Defined **RTO and RPO** for critical systems — for market systems the expectation is **intraday recovery**, measured in minutes, with near-zero data loss.
- **Periodic live DR drills**, including running live trading from the DR site, not merely a failover test.
- **BCP policy approved by the governing board**, with a designated owner.
- **Technical glitch framework**: reporting of glitches to SEBI within defined timelines, **root cause analysis** submission, and financial disincentives for MIIs and large brokers where recovery timelines are missed. *Verify current parameters.*
- **Capacity planning** — systems sized for peak load with headroom, with periodic capacity assessment and stress testing against event-day volumes.
- **System audit** covering continuity arrangements.

## How to design for it (a good descriptive answer)

```
Primary DC  <--- synchronous replication --->  Near-site (same region, zero RPO)
     \
      \--- asynchronous replication --->  DR site (different seismic zone)

Controls: active-active where feasible; automated health checks and failover;
sequenced, replayable message logs so state can be rebuilt deterministically;
tested runbooks; out-of-band communication; participant notification protocol.
```

**Key design ideas to name:**
- **RPO near zero** requires **synchronous replication**, which constrains distance (latency); hence the near-site plus far-site pattern.
- **Deterministic replay** from a sequenced message log is how a matching engine rebuilds its book after failure — far more reliable than restoring a database snapshot.
- **Failover must be tested in production conditions**, because untested failover usually fails.
- **Participant readiness** matters: if the exchange fails over but members cannot connect to the DR environment, the drill is meaningless — hence member participation in drills.
- **Communication plan**: participants and the public must be told promptly. A silent outage is worse than a disclosed one.

## Cyber-resilience overlap

Modern BCP must assume **ransomware**, not just fire and flood. That changes the design:
- Backups must be **immutable/offline**, or the attacker encrypts them too.
- DR that replicates continuously will faithfully replicate the corruption — so you need **point-in-time recovery** and known-good restore points.
- **Recovery must be practised against a scenario where the primary environment is untrusted**, requiring rebuild rather than failover.

This distinction — **disaster recovery assumes the infrastructure is intact; cyber recovery assumes it is compromised** — is a genuinely sophisticated point and very quotable.

---

## Exam pointers

1. **DR site in a different seismic zone**; live drills, not paper tests.
2. **RTO = time to restore; RPO = tolerable data loss.** Market systems need intraday RTO and near-zero RPO.
3. Synchronous replication for near-zero RPO, asynchronous for distance.
4. **Deterministic replay of a sequenced log** is how trading state is rebuilt.
5. **Cyber recovery ≠ disaster recovery** — immutable backups and rebuild, not failover.
