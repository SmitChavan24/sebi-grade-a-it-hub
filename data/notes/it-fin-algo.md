# Algorithmic and High-Frequency Trading

## Definitions

**Algorithmic trading** — any order generated using automated execution logic. **HFT** is a subset characterised by very high order rates, very short holding periods and latency sensitivity. **DMA (Direct Market Access)** lets a client's order reach the exchange through the broker's infrastructure without manual intervention.

## Common strategy families

| Strategy | Idea |
|---|---|
| **Execution algos** (TWAP, VWAP, POV, implementation shortfall) | Minimise market impact of a large order |
| **Market making** | Quote both sides, earn the spread, manage inventory |
| **Statistical arbitrage / pairs** | Mean reversion between related instruments |
| **Index arbitrage / cash-futures** | Exploit basis differences |
| **Momentum / trend following** | Directional |
| **Latency arbitrage** | Exploit stale prices across venues — the controversial one |

## Regulatory framework in India

SEBI's algorithmic trading framework has developed in stages. The consistent themes:

- **Approval and testing:** algorithms must be approved by the exchange; changes require re-approval; **mock/simulated environment testing** before deployment.
- **Unique identifiers** for algorithms so that every order can be traced to the algorithm that generated it.
- **Risk controls:** price checks, quantity limits, **order-per-second limits**, cumulative exposure checks, and an **automatic kill switch**.
- **Order-to-trade ratio penalties** to discourage excessive messaging.
- **Audit trail** of every algorithmic order, retained and reproducible.
- **System audit** of algorithmic trading systems.
- **Retail algo framework:** SEBI moved to bring **retail algorithmic trading and third-party algo providers** into a formal structure — broker responsibility for algos offered to clients, registration/tagging of algos, and restrictions on advertising assured returns from algos. This has been through consultation and phased implementation; **verify the current position** before quoting specifics.

## Why a regulator worries

1. **Systemic risk** — a runaway algorithm can move a market in seconds. International precedents (flash crashes, a firm losing hundreds of millions in under an hour through a faulty deployment) are the standard cautionary examples.
2. **Fairness** — unequal access to speed and data.
3. **Manipulation risk** — **spoofing** (placing orders without intent to execute), **layering**, **quote stuffing**, **momentum ignition**. These are manipulative practices under **PFUTP**, regardless of whether a human or an algorithm did them.
4. **Investor protection** — retail investors being sold "guaranteed return" algo strategies.
5. **Accountability** — if no one can say which algorithm produced an order, no one can be held responsible. Hence unique tagging.

## The technology controls that actually matter

- **Pre-trade risk checks in the order path**, not as an afterthought — fat-finger limits, price collars, max order value, max position.
- **Kill switch** at multiple levels: strategy, session, member, exchange.
- **Deterministic, replayable logs** — the ability to reconstruct exactly what the algorithm saw and did.
- **Change management and version control** on trading logic, with segregation between developer and deployer.
- **Simulation environment** that faithfully mirrors production.
- **Monitoring** of message rates, rejection rates, and abnormal behaviour in real time.

> This is a question a panel could reasonably ask an IT candidate: *"How would you supervise algorithmic trading?"* The answer is not "ban it" — it is **tagging, pre-trade controls, kill switches, audit-trail reproducibility, and surveillance for manipulative patterns**.

---

## Exam pointers

1. Algo orders need **exchange approval, unique tagging and an audit trail**.
2. **Spoofing and layering are PFUTP violations** — the algorithm is not a defence.
3. **Kill switch and pre-trade risk checks** are the two controls to name first.
4. **OTR penalties** discourage message flooding.
5. Retail algo regulation is recent and evolving — describe the direction, verify the details.
