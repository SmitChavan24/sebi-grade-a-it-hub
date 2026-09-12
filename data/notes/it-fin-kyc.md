# KYC Infrastructure in the Securities Market

## Why KYC matters technically

Every regulatory outcome — surveillance, connectedness analysis in insider trading, grievance redress, settlement of claims — depends on knowing **who** is behind an account. KYC is therefore an identity-infrastructure problem, not a paperwork problem.

## The players

| Entity | Role |
|---|---|
| **KRA — KYC Registration Agency** | SEBI-registered; holds KYC records centrally so that a client verified once can be onboarded by any intermediary |
| **CKYCR (CERSAI)** | **Central KYC Records Registry** across the whole financial sector — banking, insurance, securities |
| **Intermediary** | Does the verification and uploads the record |
| **UIDAI** | Aadhaar authentication and e-KYC |
| **Depositories/DPs** | Demat account opening, linked to the same KYC |

**Principle:** verify once, reuse across intermediaries. This is the securities-market instance of the India Stack pattern.

## Modes of verification

- **Aadhaar-based e-KYC** — OTP or biometric, with the constraints set by the Supreme Court's Aadhaar judgment and subsequent rules; only entities permitted to perform Aadhaar authentication may do so, and Aadhaar numbers must be stored in a compliant manner (**Aadhaar Vault**, virtual IDs, masking).
- **Video-based Customer Identification Process (V-CIP / IPV)** — live video verification with liveness checks, geotagging and recording.
- **Digital KYC** with OVD upload and verification.
- **In-person verification (IPV)** — the traditional route.
- **DigiLocker**-sourced documents.

**PAN** remains the unique identifier for securities market transactions, with **PAN-Aadhaar linkage** requirements. **UCC (Unique Client Code)** ties trades to a client at the exchange level. **Nomination** is mandatory or requires an explicit opt-out.

## Risk-based approach under PMLA

Every intermediary is a **reporting entity** under the **PMLA, 2002**:

- **Customer Due Diligence (CDD)** at onboarding; **Enhanced Due Diligence** for higher-risk clients; **simplified** for low risk.
- **Beneficial ownership** identification for non-individual clients — the threshold-based test for who ultimately controls an entity.
- **PEP (politically exposed person)** screening, **sanctions screening** (UN lists), adverse media screening.
- **Ongoing monitoring** of transactions against the client's profile.
- **STR / CTR reporting to FIU-IND**; **record retention for five years**.
- **Designated Director and Principal Officer** appointments.

## Technology issues worth discussing

- **Identity resolution and deduplication** — the same person with variations in name and address across records.
- **Fuzzy matching** for sanctions and PEP screening, and the **false positive** burden it creates.
- **Data minimisation and storage** obligations under **DPDP** versus retention obligations under **PMLA** — a genuine tension worth naming.
- **Deepfakes and injection attacks against V-CIP** — liveness detection is now an adversarial problem.
- **Security of KYC repositories** — a KRA or CKYCR breach would be a national-scale PII incident, which is exactly why they fall under the cyber framework.
- **Interoperability** — the reason a central registry beats every intermediary holding its own copy.

---

## Exam pointers

1. **KRA is securities-market specific; CKYCR (CERSAI) is sector-wide.**
2. **PAN is the unique identifier**; UCC ties trades to the client at the exchange.
3. PMLA: **STR/CTR to FIU-IND**, records for **five years**, Designated Director + Principal Officer.
4. **Beneficial ownership identification** is the heart of AML for non-individual clients.
5. Name the **DPDP vs PMLA retention tension** — it shows you think like a regulator, not a checklist.
