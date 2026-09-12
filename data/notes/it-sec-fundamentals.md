# Information Security — Fundamentals

## The CIA triad

| Property | Meaning | Threat | Control |
|---|---|---|---|
| **Confidentiality** | Only authorised parties can read | Disclosure, eavesdropping | Encryption, access control, classification |
| **Integrity** | Data is not altered without authorisation | Tampering | Hashing, digital signatures, checksums, WORM storage |
| **Availability** | Systems are usable when needed | DoS, outage, ransomware | Redundancy, DR, backups, DDoS protection |

Extended with **Authenticity**, **Non-repudiation** (you cannot deny having sent it — provided by digital signatures) and **Accountability** (actions traced to an identity, via logging).

> For a market regulator, **integrity and availability** often outrank confidentiality: a trading platform that is down, or an audit trail that can be altered, is a systemic problem.

## AAA

**Authentication** (who are you) → **Authorisation** (what may you do) → **Accounting/Auditing** (what did you do). Protocols: RADIUS, TACACS+, Diameter.

## Core vocabulary

| Term | Definition |
|---|---|
| **Asset** | Anything of value — data, system, reputation |
| **Vulnerability** | A weakness |
| **Threat** | A potential cause of harm |
| **Threat actor** | Who might exploit it — insider, criminal, hacktivist, nation state |
| **Exploit** | The means of using a vulnerability |
| **Risk** | **Threat × Vulnerability × Impact** (or likelihood × impact) |
| **Attack surface** | Sum of all exposure points |
| **Attack vector** | The path used |
| **Zero day** | A vulnerability with no patch available |
| **Residual risk** | What remains after controls |

## Risk management

```
Identify assets -> Identify threats & vulnerabilities -> Assess likelihood and impact
-> Treat: AVOID / MITIGATE / TRANSFER (insurance) / ACCEPT
-> Monitor and review
```

**Quantitative:** **SLE** (single loss expectancy) = asset value × exposure factor; **ALE** = SLE × **ARO** (annual rate of occurrence). Spend on a control only if it costs less than the ALE reduction.
**Qualitative:** risk matrices (likelihood × impact), heat maps.

## Control types

| By function | By nature |
|---|---|
| **Preventive** (firewall, MFA) | **Administrative** (policy, training) |
| **Detective** (IDS, SIEM, audit logs) | **Technical/logical** (encryption, ACLs) |
| **Corrective** (backups, patching) | **Physical** (locks, guards, CCTV) |
| **Deterrent**, **Compensating** | |

## Security principles

- **Defence in depth** — layered controls; no single point of failure.
- **Least privilege** — the minimum access needed, for the minimum time.
- **Separation of duties** — no one person controls an entire critical process. (In market systems: whoever can place a trade should not be able to alter the trade log.)
- **Need to know**, **fail secure**, **complete mediation**, **open design** (Kerckhoffs's principle — security must rest on the key, not on the secrecy of the algorithm), **economy of mechanism**, **psychological acceptability**.
- **Zero trust** — never trust, always verify; assume breach; verify explicitly; least-privilege access. See the defence note.

## Governance

**Policy** (what and why, mandatory) → **Standard** (mandatory specifics) → **Guideline** (recommended) → **Procedure** (step by step). Supported by **data classification**, **asset inventory**, **acceptable use**, **security awareness training** — and note that awareness training is the control with the best return, because phishing is the dominant initial access vector.

---

## Exam pointers

1. CIA triad, plus **non-repudiation** which comes from **digital signatures**.
2. **Risk = threat × vulnerability × impact**; treatment = avoid / mitigate / transfer / accept.
3. **ALE = SLE × ARO** — a standard numerical.
4. **Kerckhoffs's principle:** the algorithm may be public; only the key is secret.
5. Least privilege + separation of duties is the answer to most "how would you secure X" questions.
