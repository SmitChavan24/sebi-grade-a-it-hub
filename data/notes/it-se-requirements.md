# Requirement Engineering and SRS

## The process

**Elicitation** (interviews, workshops, observation, questionnaires, document analysis, prototyping) → **Analysis** (resolve conflicts, prioritise, model) → **Specification** (write the SRS) → **Validation** (reviews, walkthroughs, prototypes) → **Management** (baselines, change control, traceability).

## Types of requirement

- **Functional** — what the system does. "The system shall block an order that breaches the client's margin limit."
- **Non-functional (quality attributes)** — how well it does it: performance, **latency**, throughput, availability, scalability, security, usability, maintainability, portability, **auditability**.
- **Domain requirements** — imposed by the business area.
- **Constraints** — technology, regulatory, budget, timeline.

> In financial systems, non-functional requirements often dominate. "Match orders correctly" is easy; "match them deterministically, in microseconds, with a reproducible audit trail, at peak volumes, with intraday recovery" is the actual engineering problem. Saying that shows you understand the domain.

## Characteristics of a good requirement

**Correct, unambiguous, complete, consistent, ranked for importance and stability, verifiable, modifiable, traceable.** "The system should be fast" fails on unambiguous and verifiable; "99th percentile order acknowledgement under 5 ms at 50,000 messages/second" passes.

## SRS structure (IEEE 830 style)

1. **Introduction** — purpose, scope, definitions, references, overview.
2. **Overall description** — product perspective and functions, user characteristics, constraints, assumptions and dependencies.
3. **Specific requirements** — functional requirements, external interfaces, performance, design constraints, **quality attributes**, other requirements.
4. Appendices, index.

## Feasibility study

**TELOS**: **Technical** (can it be built with available technology and skills), **Economic** (cost-benefit, ROI, payback), **Legal** (regulatory and contractual), **Operational** (will it fit the organisation's processes), **Schedule** (can it be delivered in time).

## Modelling tools

**Use case diagrams** (actors, use cases, include/extend), **DFD** (level 0 context diagram → level 1 → level 2; processes, data stores, external entities, data flows — **DFDs show no control flow or timing**), **ER diagrams**, **state diagrams**, **sequence diagrams**, **class diagrams**, **activity diagrams**. **Data dictionary** defines every element precisely.

**UML diagram families:** structural (class, object, component, deployment, package) vs behavioural (use case, sequence, activity, state, communication).

## Requirement management

**Baselining**, **change control board**, **impact analysis**, **version control of the SRS**, and a **traceability matrix** linking each requirement to its design element, code module and test case — forwards and backwards. Traceability is not bureaucracy in a regulated environment; it is how you demonstrate that a control exists and was tested.

**Requirement volatility** and **scope creep** are the standard project killers; the defence is a baseline plus a disciplined change process, not refusing change.

---

## Exam pointers

1. **Functional = what; non-functional = how well.**
2. A good requirement is above all **verifiable and unambiguous**.
3. **DFDs show data flow, not control flow or sequence.**
4. **TELOS** for feasibility.
5. The **traceability matrix** links requirement → design → code → test.
