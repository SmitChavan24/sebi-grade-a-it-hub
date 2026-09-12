# How to Write the IT Descriptive Paper

> Phase II Paper 2 has a descriptive component, and most candidates lose marks here not from ignorance but from formless answers. This is a method note — use it every time you practise.

## The structure that always works

For a 10–15 mark question, in roughly 250–300 words:

```
1. DEFINITION   (1-2 lines)   What the thing is, precisely.
2. CONTEXT      (1-2 lines)   Where it sits / why it exists.
3. BODY         (main marks)  Structured points - a table, a labelled list, or a diagram.
4. EXAMPLE      (2-3 lines)   A concrete instance, ideally from financial markets.
5. LIMITATION / REGULATORY ANGLE (2-3 lines)
6. CONCLUSION   (1 line)      One sentence that answers the question asked.
```

The examiner is scanning for **structure and keywords**, not prose. Headings, numbered points and a diagram earn more than a beautifully written paragraph.

## Five rules

1. **Answer the verb.** "Explain" needs mechanism; "compare" needs a table; "discuss" needs both sides; "with reference to SEBI" means an example from the securities market is mandatory, not optional.
2. **Draw the diagram.** A three-way TCP handshake, an OSI stack, a DMZ layout, a Merkle tree — one diagram is worth a paragraph and takes 40 seconds.
3. **Use the correct technical vocabulary.** "Novation", "idempotent", "AIMD", "RPO/RTO", "defence in depth". Precise terms are what separate an IT specialist's answer from a generalist's.
4. **Always land the market angle.** Almost any IT topic can be tied back to markets: databases → audit trails and the Structured Digital Database; networks → co-location and latency fairness; security → CSCRF; AI → surveillance and model risk. SEBI is hiring an IT officer *for a regulator*.
5. **Time-box ruthlessly.** Allocate minutes = marks. Three-quarters of a good answer scores far more than one complete answer and one blank.

## Worked skeleton

> **Q. Explain the role of a Security Operations Centre in a market infrastructure institution.**

```
Def:       A SOC is a centralised function that monitors, detects, analyses and
           responds to cyber security incidents on a 24x7 basis.
Context:   Under SEBI's cyber resilience requirements, MIIs and larger regulated
           entities are expected to have SOC coverage.
Body:      People / Process / Technology
           - People: L1 monitoring, L2 analysis, L3 threat hunting, incident manager
           - Process: use cases, playbooks, escalation matrix, incident reporting timelines
           - Technology: SIEM, EDR, NDR, threat intelligence feeds, SOAR
           Metrics: MTTD, MTTR, false-positive rate
Example:   Detecting anomalous after-hours access to an order management system,
           correlated across VPN logs, EDR alerts and database audit logs.
Limits:    Alert fatigue, cost, skills shortage; a SOC detects but does not prevent -
           it must sit on top of hardening and segmentation.
Reg angle: Incident reporting obligations to SEBI/CERT-In; system audit; CSCRF
           expectations on continuous monitoring.
Conclusion: A SOC converts scattered telemetry into timely, accountable response -
           which is what "cyber resilience", as opposed to "cyber security", means.
```

## Practice protocol

One question a day from the roadmap's Phase B onwards:
1. Set a timer for the marks-proportional time.
2. Write by hand or type — whatever the exam uses.
3. Then score yourself out of 10: structure (3), technical accuracy (3), example (2), market angle (1), conclusion (1).
4. Log the score in your own note on this page and watch it move.

---

## Exam pointers

1. Structure first, content second — the marks live in the skeleton.
2. **Every IT answer gets a market angle.** Every one.
3. A diagram in 40 seconds beats a paragraph in three minutes.
4. Never leave a question blank; a structured half-answer still scores.
5. Practise under a clock from day one of Phase B — descriptive writing is a motor skill.
