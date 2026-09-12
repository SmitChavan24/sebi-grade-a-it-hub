# Standards, Frameworks, Audit and BCP

## ISO/IEC 27001

The international standard for an **Information Security Management System (ISMS)**. Certifiable. Built on **Plan-Do-Check-Act**, requiring: scope definition, leadership commitment, **risk assessment and treatment**, a **Statement of Applicability**, controls from **Annex A**, internal audit, management review and continual improvement.

The **2022 revision** reorganised Annex A into **93 controls in four themes** — **Organisational, People, Physical, Technological** — replacing the older 14 domains, and added controls for threat intelligence, cloud security, data leakage prevention and secure coding.

Related: **27002** (implementation guidance), **27005** (risk management), **27017/27018** (cloud, cloud PII), **27701** (privacy), **22301** (business continuity).

## NIST

- **Cybersecurity Framework (CSF) 2.0** — **Govern, Identify, Protect, Detect, Respond, Recover**. Voluntary, outcome-based, widely adopted; **SEBI's CSCRF is aligned to it**.
- **SP 800-53** — control catalogue. **SP 800-61** — incident handling. **SP 800-37** — Risk Management Framework. **SP 800-207** — zero trust. **SP 800-145** — cloud definition.
- **NIST is free**, which is why it has become the global default vocabulary.

## Other frameworks

| Framework | Focus |
|---|---|
| **COBIT** | IT **governance** and management — the "are we doing the right things" layer |
| **ITIL** | IT **service management** — incident, problem, change, release |
| **CIS Controls / Benchmarks** | Prioritised, prescriptive hardening |
| **PCI DSS** | Card data security — contractual, not statutory |
| **SOC 1 / SOC 2** | Assurance reports for service organisations (SOC 2 = trust services criteria) |
| **CMMI** | Process maturity, levels 1–5 |
| **COSO** | Enterprise risk management |
| **Basel / RBI IT frameworks** | Financial-sector specific |

**COBIT vs ITIL vs ISO 27001** is a standard question: **governance** vs **service management** vs **security management**.

## Audit

- **Types:** internal, external, **system audit** (SEBI-mandated for MIIs and brokers), **statutory**, **concurrent**.
- **Process:** planning and scoping → control testing (design and operating effectiveness) → evidence gathering → findings and risk rating → management response → **remediation tracking** → follow-up audit.
- **IS audit concepts:** audit trail, **segregation of duties**, change management evidence, access recertification, **sampling**, compensating controls, **materiality**.
- **VAPT** — vulnerability assessment (breadth, automated) vs penetration testing (depth, manual, exploitation). **Red team** (adversary simulation), **blue team** (defence), **purple team** (both, collaboratively). Bug bounty programmes as continuous testing.

## Business continuity and disaster recovery

| Term | Meaning |
|---|---|
| **BIA** | Business Impact Analysis — identifies critical processes and their tolerable downtime |
| **RTO** | **Recovery Time Objective** — how fast you must be back |
| **RPO** | **Recovery Point Objective** — how much data you can afford to lose |
| **MTD / MTPD** | Maximum tolerable downtime |
| **MTTR / MTBF** | Mean time to repair / between failures |

**Recovery site options:**

| Site | Readiness | Cost | Typical RTO |
|---|---|---|---|
| **Cold** | Space and power only | Low | Days |
| **Warm** | Hardware and some data | Medium | Hours |
| **Hot** | Fully mirrored, ready | High | Minutes |
| **Active-active** | Both sites live | Highest | Near zero |

**Testing:** checklist review → **tabletop exercise** → simulation → parallel test → **full interruption test**. A plan that has never been tested is not a plan.

For MIIs, SEBI has long required a **DR site in a different seismic zone**, periodic **live DR drills**, and defined recovery timelines for market systems — because the systemic requirement is that the market reopens, not merely that the company survives.

---

## Exam pointers

1. **ISO 27001:2022 → 93 controls, 4 themes.**
2. **NIST CSF 2.0 adds "Govern"** to the original five functions.
3. **RTO = time, RPO = data.** Never mix them up.
4. COBIT = governance, ITIL = service management, ISO 27001 = security management.
5. Hot site = minutes; cold site = days. DR plans must be **tested**, and the exercise ladder is a quotable structure.
