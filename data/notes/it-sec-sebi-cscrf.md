# SEBI's Cyber Security & Cyber Resilience Framework (CSCRF)

> If there is one topic where an IT-stream candidate must be stronger than everyone else in the room, it is this one. It is SEBI's own framework, for SEBI's own regulated entities, written for exactly the job you are applying for.
>
> ⚠ This is a recent and actively evolving framework, with phased compliance dates and periodic clarifications. Read the **current circular on sebi.gov.in** before your interview and update the specifics below.

## Background

Before CSCRF, SEBI's cyber requirements were spread across many circulars issued separately for **MIIs, brokers, depository participants, mutual funds, KRAs, AIFs** and others — similar in substance but inconsistent in detail. The **Cybersecurity and Cyber Resilience Framework (CSCRF)**, issued in **August 2024**, consolidated them into one framework for **all SEBI Regulated Entities (REs)**, with a phased implementation through 2025.

## Core design

**Structured around five (plus one) functions**, aligned with the NIST Cybersecurity Framework, moving from "cyber security" to **cyber resilience**:

```
GOVERNANCE  (anchoring function)
IDENTIFY -> PROTECT -> DETECT -> RESPOND -> RECOVER
```

The addition of **Recover** — and the emphasis on resilience — is the conceptual heart of it: a market regulator's concern is not only preventing incidents but ensuring that critical market functions continue and recover within defined timelines.

## Graded, proportionate application

REs are **categorised by size and systemic importance**, with obligations scaled accordingly — broadly:

| Category | Nature |
|---|---|
| **MIIs** | Stock exchanges, clearing corporations, depositories — the strictest obligations |
| **Qualified REs** | Large intermediaries above defined thresholds |
| **Mid-size REs** | Moderate obligations |
| **Small-size REs** | Lighter obligations |
| **Self-certification REs** | Smallest entities; simplified compliance |

Thresholds are based on parameters such as number of clients, trading volume, assets under management or custody. **Verify the current thresholds and category names in the live circular.**

## Notable requirements to be able to discuss

- **Cyber Capability Index (CCI)** — a scoring mechanism for measuring and reporting cyber maturity, applicable to MIIs and Qualified REs, with periodic assessment.
- **SOC requirements** — own SOC, group SOC, or a **market SOC** offered for smaller entities; continuous monitoring expectations.
- **VAPT** — vulnerability assessment and penetration testing at defined intervals, by CERT-In empanelled auditors, with closure timelines for findings.
- **ISO 27001 alignment** and **security audits**.
- **SBOM — Software Bill of Materials** for critical systems: supply-chain transparency, a genuinely modern requirement.
- **Data localisation / data classification**, encryption standards, **API security**.
- **Incident reporting** to SEBI and CERT-In within defined timelines, and **root cause analysis** submission.
- **BCP/DR**: defined **RTO and RPO** for critical systems, DR drills, and — for MIIs — the long-standing requirement of a **disaster recovery site in a different seismic zone**.
- **Board/management accountability**, a designated **CISO**, and periodic reporting to the board's technology/risk committee.
- **Third-party and vendor risk management**, including cloud service providers.

## Related SEBI technology requirements you should know alongside it

- **System audit** requirements for MIIs and brokers, with SEBI-prescribed terms of reference.
- **Cyber security and cyber resilience audit** reports submitted periodically.
- **Framework for Adoption of Cloud Services** by REs (2023) — see the cloud note.
- **Algorithmic trading** and **API-based trading** controls.
- **Business continuity for MIIs**, including intraday recovery expectations.
- **Structured Digital Database (SDD)** under the PIT Regulations — non-tamperable, time-stamped records of UPSI sharing.

## How to talk about it in the interview

A strong answer connects three things:
1. **Why a market regulator cares** — an outage or manipulation at an MII is systemic, not just commercial.
2. **What the framework actually does** — consolidation, graded obligations, resilience and measurable maturity rather than a checklist.
3. **What is hard about it** — smaller intermediaries lack the skills and budget, which is why market SOCs and self-certification tiers exist; and the overlap with CERT-In and DPDP creates a reporting burden that needs rationalising.

That third point — naming a genuine tension rather than reciting the circular — is what distinguishes a candidate who has read it from one who has memorised a summary.

---

## Exam pointers

1. **CSCRF (August 2024)** consolidated SEBI's earlier cyber circulars for **all REs**, phased through 2025.
2. Functions: **Governance + Identify, Protect, Detect, Respond, Recover** — NIST-aligned.
3. Know **CCI, SBOM, VAPT, SOC options, RTO/RPO** by name.
4. MIIs sit at the top of the graded structure; self-certification REs at the bottom.
5. **Verify the specifics on sebi.gov.in before the interview** — and say so if asked about a detail you are unsure of. Honesty about a moving target reads better than a confidently wrong number.
