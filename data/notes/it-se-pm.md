# Project Management, CPM/PERT and Risk

## Project management knowledge areas

Scope, schedule, cost, quality, resources, communication, **risk**, procurement, stakeholders, integration. The "iron triangle" of **scope, time and cost**, with quality in the middle — you cannot fix all three.

## Work Breakdown Structure

Decompose the project hierarchically into deliverables and then **work packages** small enough to estimate and assign. The WBS is the foundation of every schedule and budget.

## Network scheduling — CPM and PERT

Draw the activity network, then compute:

- **Forward pass** → **Earliest Start (ES)** and **Earliest Finish (EF)**: EF = ES + duration; ES of an activity = maximum EF of its predecessors.
- **Backward pass** → **Latest Finish (LF)** and **Latest Start (LS)**: LS = LF − duration; LF = minimum LS of successors.
- **Total float (slack) = LS − ES = LF − EF.**
- **Critical path** = the longest path through the network = the chain of activities with **zero float**. It determines the **minimum project duration**; any delay on it delays the project.

A network can have **more than one critical path**. **Free float** is the delay possible without affecting the *next* activity's early start, as opposed to total float which protects the project end.

**CPM vs PERT:**

| | CPM | PERT |
|---|---|---|
| Duration | **Deterministic** | **Probabilistic** |
| Orientation | Activity | Event |
| Origin | Construction/maintenance | R&D projects |
| Focus | Time-cost trade-off (**crashing**) | Uncertainty |

**PERT expected time = (O + 4M + P)/6**; **variance = ((P − O)/6)²**. Project variance = sum of variances **along the critical path**; use the normal distribution to compute the probability of finishing by a date.

**Crashing** — spending money to shorten critical activities, choosing the lowest **cost slope** (cost increase per unit time saved) first. **Fast tracking** — running activities in parallel, which adds risk.

**Gantt charts** show the schedule visually; **resource levelling** smooths over-allocation.

## Risk management

**Process:** identification → analysis (probability × impact) → prioritisation (**risk exposure = probability × loss**) → planning → mitigation → monitoring.

**Categories:** project risks (schedule, resources), product risks (technical, quality), business risks (market, regulatory).

**Responses:** **avoid, mitigate, transfer, accept** (and, for opportunities: exploit, enhance, share). Maintain a **risk register** with owners and triggers, plus **contingency reserves** for known risks and **management reserves** for unknown ones. **RMMM plan** = Risk Mitigation, Monitoring and Management.

## Configuration management

**SCM** controls change to work products: **configuration items**, **baselines**, **version control** (Git: branch, merge, pull request), **change control board**, **release management**, and **build reproducibility**. In a regulated entity, SCM is where **segregation of duties** and **change approval evidence** live.

**Quality management:** SQA (process-oriented, preventive) vs SQC (product-oriented, detective); **reviews, walkthroughs and formal inspections** (Fagan). Inspections find defects earlier and more cheaply than testing — an important point.

---

## Exam pointers

1. **Critical path = longest path = zero float**, and it sets the project duration.
2. **Float = LS − ES = LF − EF.**
3. **CPM deterministic, PERT probabilistic**; PERT variance = ((P−O)/6)².
4. **Crash the activity with the lowest cost slope** first.
5. **Risk exposure = probability × impact**; responses are avoid/mitigate/transfer/accept.
