# Defence — SOC, SIEM, Zero Trust and Hardening

## Defence in depth

Layered controls so that no single failure is fatal:

```
Governance & policy
  Physical security
    Network perimeter (firewall, IPS, DDoS protection)
      Segmentation / micro-segmentation / DMZ
        Host hardening (patching, EDR, baseline config)
          Application security (SDLC, WAF, input validation)
            Data (encryption at rest and in transit, DLP, tokenisation)
              Identity (MFA, least privilege, PAM)
                Monitoring (SIEM, SOC, threat hunting)
                  Response (IR plan, backups, BCP/DR)
```

## SOC — Security Operations Centre

**People:** L1 triage, L2 analysis, L3 threat hunting and forensics, incident manager, SOC manager.
**Process:** use cases, detection rules, **playbooks**, escalation matrix, shift handover, reporting obligations.
**Technology:** SIEM, **EDR/XDR**, NDR, threat intelligence, **SOAR**, case management.

**Metrics:** **MTTD** (mean time to detect), **MTTR** (mean time to respond), dwell time, false positive rate, coverage against ATT&CK.

Models: in-house, **MSSP** (managed), hybrid, follow-the-sun. Regulated entities commonly use a **hybrid** model, keeping accountability in-house.

## SIEM

Collects logs from firewalls, endpoints, servers, applications, databases, identity systems; **normalises, correlates, alerts**. Needs **time synchronisation (NTP/PTP)** across sources or correlation is meaningless.

**Log sources that matter for a financial entity:** authentication and privileged access, database audit logs, application transaction logs, network flow, DNS, email gateway, and change management. **Log retention** must meet regulatory requirements (CERT-In's directions specify retention within India — verify the current period).

**SOAR** adds automated enrichment and response: isolate a host, disable an account, block an IOC.

## Endpoint and network controls

- **EDR/XDR** — behavioural detection, isolation, rollback.
- **Application allow-listing**, disk encryption, **secure baseline (CIS Benchmarks)**, USB control.
- **Patch management** — risk-based, with defined SLAs by severity; **virtual patching** via WAF/IPS where a patch is not yet possible.
- **Network segmentation** — separate the trading core, corporate IT, and internet-facing zones. **Micro-segmentation** applies policy per workload.
- **Email security** — SPF/DKIM/DMARC, attachment sandboxing, link rewriting.
- **DLP** — classification-driven prevention of data exfiltration.

## Zero trust

**Never trust, always verify.** Principles (NIST SP 800-207):
1. Verify explicitly — authenticate and authorise on every request, using identity, device posture and context.
2. Least-privilege access — just-enough, just-in-time.
3. **Assume breach** — segment, encrypt everywhere, monitor continuously.

Components: strong identity (MFA/FIDO2), device trust, **micro-segmentation**, **ZTNA** replacing VPN, continuous evaluation. It replaces the idea of a trusted internal network — which matters because most damaging incidents involve **lateral movement** after an ordinary initial compromise.

## Secure architecture for a regulated entity

- **Segregate** the trading/matching core from corporate IT, with tightly controlled interfaces.
- **No internet access** from critical servers; jump hosts with session recording for administration.
- **Immutable, WORM audit logs**, shipped off-host in real time.
- **Encrypted backups** with at least one **offline/immutable** copy — the only reliable ransomware control.
- **DR site** with tested RPO/RTO, and **live drills**, not paper plans.
- **Change management** with rollback, and **segregation of duties** between developer, approver and deployer.

---

## Exam pointers

1. **MTTD and MTTR** are the two SOC metrics to quote.
2. SIEM correlation fails without **time synchronisation**.
3. Zero trust = **verify explicitly, least privilege, assume breach** (NIST SP 800-207).
4. The only dependable ransomware control is an **offline/immutable backup that has been restore-tested**.
5. Defence in depth is a structure — in a descriptive answer, draw the layers.
