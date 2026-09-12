# Trading Systems, Latency and Co-location

## The order lifecycle

```
Client -> broker's OMS/RMS -> risk checks (margin, limits, price band)
      -> exchange gateway -> matching engine -> order book
      -> execution -> trade confirmation -> clearing -> settlement (T+1)
```

**OMS** (order management) and **RMS** (risk management) sit at the broker. SEBI requires **broker-level risk checks before an order reaches the exchange** — margin availability, price bands, quantity limits, and order-per-second throttles.

## Matching engine mechanics

- **Continuous double auction** with **price-time priority**: better price wins; at the same price, the earlier order wins.
- **Order types:** market, limit, stop-loss, IOC, disclosed quantity, iceberg, GTC/GTD, auction orders.
- **Pre-open session** uses **call auction** price discovery: orders collected, then an equilibrium price computed that maximises executable volume.
- **Price bands and circuit filters** are enforced at the engine level.
- **Order-to-trade ratio (OTR)** penalties discourage excessive order flooding.

## Latency

**End-to-end latency** = network + gateway + risk checks + matching + response. Measured in microseconds at the exchange level.

Techniques used by low-latency participants: **kernel bypass** (DPDK, Solarflare/onload), **FPGA**-based order handling, busy-polling, NUMA pinning, pre-allocated memory, **binary protocols** rather than text, and co-location.

**Jitter** (variance in latency) often matters more than mean latency, because strategies must be predictable.

## Co-location

Exchanges offer rack space in their own data centre so that a member's servers sit metres from the matching engine. SEBI's concerns are **fairness and equal access**, not speed itself:

- **Equal-length cabling** within the co-location facility so no rack is physically advantaged.
- **Randomisation** of order entry in some contexts, and **tick-by-tick data** access arrangements.
- A **level-playing-field** requirement between co-located and non-co-located participants, including **managed co-location services through third parties** so that smaller members can access it.
- Transparent, non-discriminatory **pricing and allocation** of co-location facilities.
- The well-known co-location matter of the past decade — where preferential access to a tick-by-tick data dissemination architecture became an enforcement issue — is the reason this is regulated so specifically. Understand the *principle* (equal access to the same information at the same time); avoid asserting case specifics you have not verified.

## Market data

- **Tick-by-tick (TBT)** feeds vs **snapshot** feeds; **market depth** (best 5/20 levels).
- Dissemination architecture matters: a **broadcast/multicast** model treats all subscribers equally, whereas a sequential **TCP push** to subscribers in order creates an advantage for whoever is served first. That distinction is the technical heart of the fairness debate.
- **Time stamping and clock synchronisation** (PTP/NTP to a national reference) so that order and trade times are comparable across systems — the foundation of any audit trail or surveillance replay.

## Connectivity

Leased lines and **MPLS** to the exchange, **VSAT** historically for remote locations, internet-based trading (IBT) and **securities trading using wireless technology (STWT)** for retail, with **two-factor authentication** mandated for client logins.

---

## Exam pointers

1. **Price-time priority** is the matching rule; the pre-open uses a **call auction**.
2. Broker-level **risk checks are mandatory before order entry** to the exchange.
3. Co-location regulation is about **fair and equal access**, not banning speed.
4. **Multicast dissemination is inherently fairer** than sequential unicast push.
5. **Clock synchronisation** underpins audit trails, surveillance and glitch investigation.
