# Software Design

## Levels

**Architectural (high-level)** — subsystems and their interactions. **Detailed (low-level)** — module internals, data structures, algorithms.

## The two measures that matter

| | Coupling | Cohesion |
|---|---|---|
| Meaning | Interdependence **between** modules | Focus **within** a module |
| Goal | **Low** | **High** |

**Coupling, worst to best:** **content** (one module modifies another's internals) → common (shared global data) → external → control (passing a flag that dictates behaviour) → stamp (passing a whole record when only a field is needed) → **data** (passing only what is needed — best).

**Cohesion, worst to best:** **coincidental** (unrelated things grouped) → logical → temporal → procedural → communicational → sequential → **functional** (everything contributes to one well-defined task — best).

"**High cohesion, low coupling**" is the single most quotable line in software design. Be ready to justify it: it localises change, enables independent testing, and limits the blast radius of a defect.

## Design principles

**Abstraction, modularity, information hiding (Parnas), separation of concerns, hierarchy, refinement**, and **SOLID** (see the OOP note). Plus **DRY**, **KISS**, **YAGNI**, and **composition over inheritance**.

## Architectural styles

| Style | Characteristic | Fits |
|---|---|---|
| **Layered (n-tier)** | Presentation / business / data layers | Enterprise applications |
| **Client-server** | Requests and responses | Almost everything |
| **Microservices** | Small, independently deployable services with their own data | Large teams, independent scaling |
| **Monolith** | One deployable unit | Small teams, simpler operations — and still the right default for many systems |
| **Event-driven** | Producers, brokers, consumers; asynchronous | **Market data, order flow, streaming surveillance** |
| **Pipe and filter** | Sequential transformations | Data processing, compilers |
| **Microkernel / plugin** | Core plus extensions | Products with varied deployments |
| **CQRS / event sourcing** | Separate read and write models; state as an event log | **Systems needing a complete audit trail** |
| **Serverless** | Functions on demand | Bursty, event-triggered workloads |

> **Event sourcing deserves a mention in a markets answer:** storing the ordered log of events and deriving state from it is exactly how a matching engine recovers deterministically and how a regulator reconstructs what happened at a point in time.

## Microservices trade-offs (a favourite discussion question)

**For:** independent deployment and scaling, technology choice per service, fault isolation, team autonomy.
**Against:** distributed-system complexity, network latency and partial failure, **distributed transactions** (hence the **saga** pattern instead of two-phase commit), data consistency, harder debugging (needs distributed tracing), operational overhead.

**The honest answer:** microservices trade in-process complexity for network complexity. Choose them for organisational scaling reasons, and start with a well-structured monolith unless you have those reasons.

## Design documentation

Component diagrams, deployment diagrams, sequence diagrams for key flows, **Architecture Decision Records (ADRs)** capturing why a choice was made, and interface contracts. In a regulated environment, design documentation is also **audit evidence** — an undocumented control effectively does not exist.

---

## Exam pointers

1. **Low coupling, high cohesion** — and be able to rank the types of each.
2. **Content coupling is worst; data coupling is best.**
3. **Functional cohesion is best; coincidental is worst.**
4. **Event-driven suits market data; event sourcing suits audit trails.**
5. Microservices buy **independent deployment** at the price of **distributed-systems complexity**.
