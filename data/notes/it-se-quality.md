# Maintenance, Quality and Reverse Engineering

## Software maintenance

Typically **60–80% of total lifetime cost** — more than development. Four types:

| Type | Trigger | Share (typical) |
|---|---|---|
| **Corrective** | Fixing defects | ~20% |
| **Adaptive** | Environment changes — new OS, new regulation | ~25% |
| **Perfective** | New or improved functionality, performance | **~50%, the largest** |
| **Preventive** | Improving maintainability before problems occur | ~5% |

The counter-intuitive fact examiners like: **perfective maintenance (enhancement) dominates**, not bug fixing.

**Maintainability** is improved by modularity, documentation, coding standards, tests, and low coupling. It is degraded by **software ageing** — accumulated patches, lost knowledge, and drift between documentation and code.

**Legacy system strategies:** scrap, keep maintaining, **re-engineer**, or **replace incrementally (strangler pattern)**. A regulated entity rarely gets to do a big-bang replacement of a core system; incremental strangulation with parallel running is the realistic path.

## Re-engineering and reverse engineering

- **Reverse engineering** — analysing an existing system to recover its design and specification. Legitimate uses: documentation recovery, interoperability, security analysis.
- **Restructuring** — improving code without changing functionality.
- **Refactoring** — small, behaviour-preserving improvements, backed by tests.
- **Forward engineering** — rebuilding from the recovered design.
- **Re-engineering** = reverse engineering + restructuring + forward engineering.

## Technical debt

The implied cost of choosing an easy solution now over a better one later. Deliberate debt (a considered trade-off with a repayment plan) is legitimate; accidental debt is not. It accrues **interest** as slower future changes and more defects. Track it explicitly rather than pretending it does not exist.

## Quality models and standards

- **McCall's quality factors** — product operation (correctness, reliability, efficiency, integrity, usability), product revision (maintainability, flexibility, testability), product transition (portability, reusability, interoperability).
- **ISO/IEC 25010 (SQuaRE)** — the modern model: functional suitability, performance efficiency, compatibility, usability, **reliability**, **security**, maintainability, portability.
- **ISO 9001**, **CMMI**, **Six Sigma (DMAIC)**, **TQM**, **Kaizen**.

**SQA vs SQC:** assurance is **process-oriented and preventive**; control is **product-oriented and detective**. Verification and validation sit inside both.

## Reviews

**Walkthrough** (informal, author-led), **technical review**, **formal inspection** (Fagan: planning, overview, preparation, inspection meeting, rework, follow-up, with defined roles — moderator, author, reader, recorder). Inspections consistently find defects **earlier and more cheaply** than testing, because they catch design and requirement defects before code exists.

## Documentation

**User documentation** (guides, help), **system documentation** (architecture, design, interfaces, ADRs), **process documentation** (plans, standards, procedures). In a SEBI-regulated context add: **system audit reports**, **change records**, **incident and RCA reports**, **BCP/DR plans and drill evidence**, and **access review records** — all of which are audit artefacts, not internal niceties.

---

## Exam pointers

1. **Perfective maintenance is the largest category**, not corrective.
2. Maintenance is **60–80% of lifetime cost**.
3. **Re-engineering = reverse + restructure + forward.**
4. **SQA is preventive and process-focused; SQC is detective and product-focused.**
5. **Formal inspection (Fagan) has defined roles** and outperforms testing on early defect detection.
