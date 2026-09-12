# Incident Response, Forensics and Threat Intelligence

## Incident response lifecycle (NIST SP 800-61)

```
1. PREPARATION            policy, team, tooling, playbooks, training, contacts
2. DETECTION & ANALYSIS   validate, scope, classify severity, declare an incident
3. CONTAINMENT            short-term (isolate) then long-term (clean path back)
   ERADICATION            remove the root cause, close the vulnerability
   RECOVERY               restore, monitor closely, confirm normal operation
4. POST-INCIDENT ACTIVITY lessons learned, RCA, control improvements, reporting
```

(SANS splits it into six: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.)

**Severity classification** drives escalation and notification. In a regulated entity, **regulatory notification clocks start at detection**, so classification must happen fast and be documented.

## Incident response team

**CSIRT** roles: incident manager, technical lead, forensics, communications/PR, legal and compliance, HR (for insider cases), business owner, and an executive sponsor. **RACI** matrix agreed in advance; **out-of-band communication** (assume corporate email is compromised).

## Digital forensics

**Principles:** preserve the original, work on verified copies, document everything, maintain the **chain of custody**.

- **Order of volatility** (collect most volatile first): CPU registers and cache → **RAM** → network state and running processes → disk → logs on remote systems → archival media.
- **Imaging** with write blockers; **hash the image (SHA-256) before and after** to prove integrity.
- **Artefacts:** memory dump, disk image, event logs, browser history, registry hives, prefetch, **slack space**, deleted file recovery, timeline analysis.
- **Anti-forensics:** log deletion, timestomping, encryption, steganography, fileless techniques.
- **Legal:** in India, electronic evidence admissibility runs through the certificate requirement for electronic records (historically **Section 65B of the Indian Evidence Act**, now carried into the **Bharatiya Sakshya Adhiniyam, 2023**). Know that the certificate requirement exists — it is why chain of custody matters procedurally, not just technically.

## Threat intelligence

| Level | Audience | Content |
|---|---|---|
| **Strategic** | Board, management | Trends, actor motivations, risk posture |
| **Tactical** | Security architects | TTPs, ATT&CK techniques |
| **Operational** | SOC, IR | Campaigns, specific actor activity |
| **Technical** | Tooling | **IOCs** — hashes, IPs, domains, URLs |

**IOC vs IOA:** indicators of **compromise** (artefacts of a past/present breach) vs indicators of **attack** (behaviour in progress). Behaviour-based detection ages better because attackers change infrastructure easily and behaviour slowly — the **pyramid of pain**.

**Sharing:** **STIX/TAXII** formats; **ISACs** (sector sharing bodies); in India, **CERT-In** advisories and sectoral CERTs (**CERT-Fin** for the financial sector). Sector-wide sharing matters for markets: an attack on one broker is usually a campaign against many.

**Threat hunting** — proactively searching for compromise on the hypothesis that detection has already failed.

## Post-incident

**Root cause analysis** — five whys, fishbone; distinguish the **technical cause** from the **process cause** (the missing patch vs why patching slipped). **Blameless post-mortems** produce honest facts; blame produces hidden incidents.

**Regulatory reporting for a SEBI-regulated entity:** incident reporting to **SEBI** under its cyber framework, to **CERT-In within 6 hours** for specified incidents, and to the **Data Protection Board and affected individuals** under DPDP where personal data is breached. Being able to lay out those three parallel obligations cleanly is a strong interview answer.

---

## Exam pointers

1. NIST IR phases: **Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-incident**.
2. **Order of volatility: RAM before disk.**
3. Hash the forensic image **before and after** to prove integrity; maintain **chain of custody**.
4. **IOC = past artefact, IOA = behaviour in progress.**
5. Know the **three parallel reporting obligations** — SEBI, CERT-In (6 hours), DPDP Board.
