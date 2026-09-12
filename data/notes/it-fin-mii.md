# Market Infrastructure Institutions and Their Technology

> This note is the bridge between your degree and the job. Most IT candidates can explain a load balancer; very few can explain what a clearing corporation does and why its uptime is a public-interest question.

## What an MII is

**Market Infrastructure Institutions** = **stock exchanges + clearing corporations + depositories**. They are systemically important: a failure in any of them is not a company problem, it is a **market** problem. Hence SEBI regulates their **ownership, governance, technology and resilience** more tightly than any other entity — through the **SECC Regulations, 2018**, the Depositories and Participants Regulations, and the cyber framework.

## What each one actually runs

| MII | Core system | The technology problem it solves |
|---|---|---|
| **Stock exchange** | **Order matching engine**, market data dissemination, surveillance, risk management | Deterministic, low-latency matching at very high message rates, with fair access |
| **Clearing corporation** | Clearing and settlement engine, **risk and margin computation**, collateral management | Computing exposure and margins in near real time; acting as CCP through **novation** |
| **Depository** | Beneficial owner database, **book-entry transfer**, corporate actions | An extremely high-integrity ledger with total auditability |

## Architecture of an exchange (how to describe it)

```
Members / brokers
   |  (leased lines, co-location, internet)
Trading Access Point / gateway  -> authentication, risk checks, order validation
   |
ORDER MATCHING ENGINE  -> price-time priority order book, in-memory, deterministic
   |            \
   |             -> Market data feed (broadcast/multicast: tick-by-tick, snapshots, depth)
   |
Trade file -> Clearing Corporation -> obligations, margins
                    |
                Depository (securities leg) + Clearing banks (funds leg)
   |
Surveillance systems, audit trail, regulatory reporting
```

**Design characteristics you should be able to name:**
- **Determinism over raw speed** — matching must be reproducible and auditable; two identical inputs must produce the same book.
- **In-memory order book**, with persistence for recovery.
- **Price-time priority** — the reason a **stable** sort matters (see the sorting note).
- **Sequenced, replayable message streams** — the standard way to rebuild state after failure.
- **Multicast for market data** — one publisher, thousands of subscribers, so UDP multicast rather than per-client TCP.
- **Capacity headroom** — sized for peak (event-day) volumes, not average.
- **Hot DR** in a different seismic zone, with drills.

## Governance requirements worth knowing

- MIIs must have **public interest directors**; the **Bimal Jalan Committee (2010)** shaped ownership and governance norms.
- Key managerial personnel, and specifically the roles responsible for **regulatory, compliance and technology** functions, have defined obligations.
- MIIs run **investor protection funds**, **core SGF**, and must maintain a minimum net worth.
- **System audit** by independent auditors, on SEBI's terms of reference, with findings reported to SEBI and the governing board.
- **Business continuity**: defined **RTO/RPO**, intraday recovery expectations, periodic **live DR drills**.
- **Technical glitch framework** — SEBI has prescribed reporting, root cause analysis and financial disincentives for major technical glitches at MIIs and large brokers, with defined recovery timelines. *Know this exists; verify the current parameters.*

## Why this matters for your interview

If asked "why SEBI for an IT person", the strongest available answer is here: the technology of MIIs is **critical national infrastructure operating under a public-interest mandate**, and the regulator's job is to supervise that infrastructure — which needs people who genuinely understand distributed systems, latency, capacity and resilience, not just policy.

---

## Exam pointers

1. **MII = exchange + clearing corporation + depository.** Governed largely by the **SECC Regulations, 2018**.
2. **Novation** is what makes a clearing corporation a CCP.
3. Matching engines are **deterministic and in-memory**, with **price-time priority**.
4. Market data is **multicast**; order entry is **TCP**.
5. **Bimal Jalan Committee** = MII ownership and governance.
