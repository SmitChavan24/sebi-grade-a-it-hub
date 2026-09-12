# SEBI's Framework for Adoption of Cloud Services

> ⚠ Verify current details on sebi.gov.in — this framework has been issued and clarified in phases.

## Why SEBI issued it

Regulated entities were already adopting cloud, but with inconsistent contracts, unclear accountability and no common standard for exit or oversight. SEBI issued a **Framework for Adoption of Cloud Services by SEBI Regulated Entities** (2023) to set baseline expectations. It applies across REs — MIIs, brokers, mutual funds, and other intermediaries.

## The principles it establishes

1. **Accountability stays with the RE.** Using a cloud service provider (CSP) does not dilute any regulatory obligation. The board and management remain answerable.
2. **Risk assessment before adoption** — criticality of the workload, data classification, and the consequences of unavailability or compromise.
3. **Due diligence on the CSP** — security posture, certifications, financial stability, sub-contracting, track record, and incident history.
4. **Contractual clarity** — right to audit (by the RE, its auditors, and by SEBI), access to logs, incident notification timelines, service levels, liability, confidentiality, and data ownership.
5. **Regulatory access** — SEBI and its authorised persons must be able to access data and systems relating to the RE's regulated activity.
6. **Data localisation and jurisdiction** — data and logs relating to Indian operations kept within India, with clarity on where processing occurs.
7. **Security controls** — encryption with appropriate key management, identity and access management, network segregation, logging and monitoring, vulnerability management.
8. **Business continuity** — the CSP's resilience does not replace the RE's own BCP/DR obligations; the RE must plan for CSP outage.
9. **Concentration risk** — awareness at both entity and system level, including the possibility that many REs depend on the same provider or region.
10. **Exit strategy** — a documented, tested plan to migrate away, including data extraction in a usable format and a defined transition period. This is the requirement entities most often under-plan.
11. **Governance** — board-approved cloud policy, defined ownership, periodic review and reporting.

## How it interacts with other requirements

An RE adopting cloud is simultaneously bound by:
- **CSCRF** — the cyber security and resilience framework, which applies to cloud-hosted systems as much as on-premises ones;
- **CERT-In directions** — six-hour incident reporting, **log retention within Indian jurisdiction**;
- **DPDP Act** — obligations as a Data Fiduciary over personal data, with the CSP typically a Data Processor;
- **System audit** requirements, now covering cloud configuration;
- Sector-specific requirements where the RE is also regulated by another authority.

## How to discuss this well

A good answer moves past listing requirements to the actual tension:

> Cloud genuinely improves the security posture of **small and mid-size intermediaries**, who cannot staff a 24×7 SOC or patch reliably on their own. But at the **system level**, mass migration to two or three providers creates a new concentration risk that no individual entity can manage, and that only the regulator can see. The framework therefore has to do two things at once — enable adoption, and keep visibility of the aggregate dependency.

That is the kind of answer that distinguishes an IT officer candidate from a compliance-checklist recital.

---

## Exam pointers

1. **Accountability is non-delegable** — the RE remains responsible for everything the CSP does.
2. **Right to audit and regulatory access** must be contractual.
3. **Exit strategy** is an explicit requirement, and the most neglected one.
4. **Concentration risk** is the systemic angle to raise.
5. Cloud adoption does not displace **CSCRF, CERT-In or DPDP** obligations.
