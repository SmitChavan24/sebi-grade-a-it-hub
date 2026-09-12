# Depositories Act, 1996 — Dematerialisation and Settlement

> India dematerialised faster than most markets, and it is a genuine success story. For an IT-stream candidate this note is doubly important: a depository is, in the end, a very large, very well-audited database.

## 1. Why the Act exists

Before 1996, shares were **physical certificates**. That meant forged transfers, lost certificates, bad deliveries, stamp duty on every transfer and settlement cycles measured in weeks. The **Depositories Act, 1996** created the legal basis for holding securities in **electronic (dematerialised) form** and transferring them by **book entry**.

## 2. The two depositories

| | NSDL | CDSL |
|---|---|---|
| Established | 1996 | 1999 |
| Promoters | IDBI, UTI, NSE | BSE and banks |
| Status | First depository in India | First listed depository (listed 2017) |

Both are **Market Infrastructure Institutions** and are regulated by SEBI under the Depositories Act and the **SEBI (Depositories and Participants) Regulations, 2018**.

## 3. Key concepts

- **Depository Participant (DP)** — the agent through which an investor accesses the depository (banks, brokers, financial institutions). You open a **demat account** with a DP, not with the depository directly.
- **Section 9 — Fungibility:** securities held in a depository are **fungible**; they bear no distinctive numbers. This is the legal foundation of electronic settlement.
- **Section 10 — Registered owner vs beneficial owner:** the **depository is the registered owner** in the issuer's register, but has **no voting or economic rights**. The **investor is the beneficial owner** and holds all rights.
- **Section 7 — Issuer's obligation** to give the depository details of the allotment.
- **Section 16 — Liability** for loss due to depository or DP negligence; the depository indemnifies the beneficial owner.
- **Section 19** onwards — penalties; appeals go to **SAT**.

## 4. Dematerialisation flow

```
Investor -> DP: Demat Request Form (DRF) + physical certificates
DP -> Depository: electronic Demat Request Number (DRN)
Depository -> Issuer / RTA: confirm
RTA verifies and confirms -> Depository credits the investor's demat account
```

**Rematerialisation** is the reverse — converting electronic holdings back to physical certificates (rare, and largely blocked for transfers since 2019).

## 5. Milestones you should be able to quote

- **2019:** transfer of securities of listed companies in **physical form was disallowed** — transfers must be in demat form (transmission and transposition remain exceptions).
- **T+2 → T+1:** India moved to a **T+1 rolling settlement** cycle in phases, completed in **January 2023**, making it one of the first major markets to do so.
- **T+0 (optional, same-day) settlement** was introduced in a **beta phase in March 2024** for a limited set of scrips, with a roadmap towards optional instant settlement. Verify the current status before the exam — this is an actively evolving area and a very likely interview question.
- **ASBA-like facility for the secondary market (UPI block mechanism)** — funds remain in the investor's bank account, blocked, until settlement.

## 6. Clearing and settlement — who does what

```
Trade on exchange
  -> Clearing Corporation (NSE Clearing / Indian Clearing Corporation)
       novation: becomes the counterparty to both sides (CCP)
       computes obligations, collects margins, manages the SGF
  -> Depository (NSDL/CDSL): securities leg by book entry
  -> Clearing banks: funds leg
  -> Settlement complete
```

Key terms: **novation**, **central counterparty (CCP)**, **netting**, **Settlement Guarantee Fund (SGF)**, **core SGF**, **auction for short delivery**.

## 7. Investor-facing services worth knowing

- **CAS** — Consolidated Account Statement, showing all holdings across both depositories and mutual funds.
- **e-DIS / DDPI** — electronic delivery instructions replacing paper slips and the old Power of Attorney model.
- **SPEED-e (NSDL)** and **easiest (CDSL)** — internet-based instruction platforms.
- **Nomination** — mandatory to nominate or explicitly opt out for demat accounts.
- **Demat account freezing** and the **Investor Protection Fund** maintained by depositories.

---

## Exam pointers

1. NSDL **1996**, CDSL **1999**; CDSL is the **listed** one.
2. **S.9 fungibility · S.10 registered vs beneficial owner · S.16 liability**.
3. The depository is the **registered owner with no voting rights**; the investor is the **beneficial owner**.
4. You open a demat account with a **DP**, never directly with the depository.
5. **T+1 completed January 2023**; optional **T+0 beta from March 2024**.
