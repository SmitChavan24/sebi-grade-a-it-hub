# SDLC Models

## Phases

Requirement gathering → analysis → design → implementation → testing → deployment → maintenance. Every model rearranges these; none removes them.

## The models

| Model | How it works | Use when | Weakness |
|---|---|---|---|
| **Waterfall** | Strictly sequential; each phase completes before the next | Requirements fixed and well understood; regulatory/fixed-price projects | No feedback; late discovery of errors; working software appears very late |
| **V-model** | Waterfall bent into a V; **each development phase has a matching test phase** (requirements↔UAT, design↔integration testing, code↔unit testing) | Safety- and compliance-critical systems | Same rigidity as waterfall |
| **Incremental** | Deliver in functional increments | Core requirements clear, extras can follow | Needs good architecture up front |
| **Iterative** | Build a rough version, refine repeatedly | Requirements will evolve | Can drift without discipline |
| **Prototype** | Build a throwaway model to clarify requirements | Requirements unclear or UI-heavy | Users mistake the prototype for the product |
| **Spiral** | Iterative with an explicit **risk analysis** quadrant per loop: planning → risk analysis → engineering → evaluation | Large, expensive, high-risk projects | Costly; needs risk expertise |
| **RAD** | Rapid, component-based, heavy user involvement | Short timelines, modular systems | Needs skilled teams and committed users |
| **Big Bang** | No process | Tiny experiments only | Unpredictable |

**Boehm's spiral model** is the one to name when a question mentions **risk-driven** development.

**Cost of fixing a defect rises by roughly an order of magnitude at each later phase** — requirements → design → code → testing → production. This single fact justifies early reviews, prototyping and shift-left testing, and is worth quoting.

## Choosing a model

Ask four questions: how stable are the requirements; how large and distributed is the team; what is the cost of failure; and how often can you get feedback from real users? A stock exchange's core matching engine and a customer-facing investor app do not deserve the same process — a point worth making explicitly in a descriptive answer.

## Process models vs methodologies

**CMMI maturity levels:** 1 Initial → 2 Managed → 3 Defined → 4 Quantitatively Managed → 5 Optimising. **ISO 9001** for quality management systems. These describe **organisational maturity**, not a development model — a distinction examiners like.

---

## Exam pointers

1. **V-model pairs each development phase with a test phase.**
2. **Spiral = risk-driven**, with four quadrants per loop.
3. Prototype models are for **unclear requirements**.
4. **Defect cost rises ~10× per phase** — the argument for early detection.
5. **CMMI levels 1–5** in order; level 5 is "Optimising".
