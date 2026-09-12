# High Availability, Disaster Recovery and Reliability

## Availability arithmetic

| Availability | Downtime per year |
|---|---|
| 99% ("two nines") | ~3.65 days |
| 99.9% | ~8.77 hours |
| 99.99% | ~52.6 minutes |
| 99.999% ("five nines") | ~5.26 minutes |

**Availability = MTBF / (MTBF + MTTR)** — so you can improve availability by failing less often *or* by recovering faster. In distributed systems, **reducing MTTR is usually the cheaper lever**, which is why automated failover and good runbooks matter more than heroic hardware.

**Components in series** multiply availability (each dependency drags the total down); **components in parallel** with redundancy improve it: combined failure probability = product of individual failure probabilities.

## Redundancy patterns

- **Active-passive** — a standby takes over on failure; simpler, wasted capacity, failover time.
- **Active-active** — all nodes serve traffic; better utilisation and instant failover, but needs state coordination.
- **N+1 / N+M** redundancy; **hot / warm / cold** standby.
- **Multi-AZ** (within a region) and **multi-region** (across geography). **Multi-cloud** for provider-level risk.

**Single points of failure** to hunt for: one load balancer, one database primary, one DNS provider, one identity provider, one power feed, one network path, **one person who knows how it works**.

## Database availability

**Replication:** synchronous (zero RPO, latency-bound distance) vs asynchronous (distance-tolerant, potential data loss). **Primary-replica** vs **multi-primary**. **Automatic failover** with a quorum to avoid **split brain**. **Read replicas** for scaling reads. **Sharding** for write scaling.

## RTO, RPO and the plan

- **RTO** — how quickly service must be restored.
- **RPO** — how much data loss is tolerable.
- **BIA** determines both, per system, from business impact rather than engineering preference.

**Backup discipline:** the **3-2-1 rule** — three copies, two media types, one off-site — extended today to **3-2-1-1-0**: one **immutable/offline** copy and **zero errors on a verified restore test**. An untested backup is a hypothesis, not a backup.

## Reliability engineering

**SLI** (a measured indicator: latency, error rate) → **SLO** (an internal target) → **SLA** (an external commitment with consequences). **Error budget** = 1 − SLO; if you have budget left, ship faster; if you have burned it, stop and stabilise. This reframes reliability as a resource rather than an absolute.

**Chaos engineering** — deliberately injecting failure to verify resilience assumptions. **Game days** and **DR drills** — the organisational equivalent.

**Graceful degradation** — shed non-essential features to keep the core running. For a trading platform: keep order entry and position view alive even if charting, research and analytics are dropped. Deciding that hierarchy **in advance** is the design work.

## In the market context

MIIs must meet **SEBI's continuity expectations**: DR in a different seismic zone, defined recovery timelines, live drills with member participation, and reporting of technical glitches with root cause analysis. The engineering vocabulary above is exactly what those obligations translate into — being able to speak both languages in one answer is the point of this note.

---

## Exam pointers

1. Memorise the **nines table** — 99.9% ≈ 8.8 hours a year.
2. **Availability = MTBF / (MTBF + MTTR)**; cutting MTTR is usually cheaper.
3. **Synchronous replication = RPO 0 but distance-limited.**
4. **3-2-1-1-0 backup rule**, with a **tested restore**.
5. **Error budget = 1 − SLO** — the cleanest way to express the speed/stability trade-off.
