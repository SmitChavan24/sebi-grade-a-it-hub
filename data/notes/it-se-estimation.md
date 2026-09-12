# Estimation and Software Metrics

## Why estimate

To plan, price and staff — and to know when a project has gone off course. All estimation models are wrong; the useful ones are **calibrated with your own historical data**.

## Lines of Code (LOC)

Simple and objective, but language-dependent, measurable only after the fact, and it rewards verbose code. Productivity as **LOC per person-month** is the classic bad metric.

## Function Point Analysis

Measures **functionality delivered**, independent of language.

Count five components, each weighted simple/average/complex:
1. **External Inputs (EI)**
2. **External Outputs (EO)**
3. **External Inquiries (EQ)**
4. **Internal Logical Files (ILF)**
5. **External Interface Files (EIF)**

**Unadjusted Function Points (UFP)** = weighted sum.
**Value Adjustment Factor (VAF)** = 0.65 + 0.01 × Σ(14 general system characteristics, each rated 0–5).
**FP = UFP × VAF.**

FP can be converted to LOC using language-specific multipliers, which is how FP feeds into COCOMO.

## COCOMO (Boehm)

**Basic COCOMO:** **Effort = a × (KLOC)^b** person-months; **Time = c × (Effort)^d** months.

| Project mode | a | b | c | d |
|---|---|---|---|---|
| **Organic** (small team, familiar problem) | 2.4 | 1.05 | 2.5 | 0.38 |
| **Semi-detached** (medium, mixed experience) | 3.0 | 1.12 | 2.5 | 0.35 |
| **Embedded** (tight constraints, complex) | 3.6 | 1.20 | 2.5 | 0.32 |

**Average staff = Effort / Time.**

**Intermediate COCOMO** multiplies by 15 **cost drivers** (product, hardware, personnel, project attributes). **Detailed COCOMO** applies them phase by phase. **COCOMO II** modernises the model for reuse, prototyping and off-the-shelf components.

> Note the exponent **b > 1** in every mode: effort grows **faster than linearly** with size. That is the quantitative form of **Brooks's law** — "adding manpower to a late software project makes it later", because communication paths grow as **n(n−1)/2**.

## Other estimation techniques

**Expert judgement**, **Delphi / wideband Delphi**, **analogy** (similar past projects), **three-point estimation** (PERT: **(O + 4M + P)/6**), **planning poker** and story points in Agile, **bottom-up** work breakdown.

## Quality metrics

- **Defect density** = defects / size (KLOC or FP).
- **Defect Removal Efficiency (DRE)** = defects found before release / total defects × 100.
- **MTBF, MTTR, availability** = MTBF / (MTBF + MTTR).
- **Halstead metrics** — derived from operators and operands: program length, vocabulary, volume, difficulty, effort.
- **Maintainability index**, **code churn**, **technical debt ratio**, **test coverage**.

**Goodhart's law applies:** when a metric becomes a target, it stops being a good measure. Any answer that recommends metrics should also note this.

---

## Exam pointers

1. **COCOMO modes: organic, semi-detached, embedded** — and that the exponent exceeds 1.
2. **Effort = a(KLOC)^b; Time = c(Effort)^d.**
3. **Function points: EI, EO, EQ, ILF, EIF** — five components.
4. **PERT three-point estimate = (O + 4M + P)/6.**
5. **Brooks's law** and communication paths **n(n−1)/2**.
