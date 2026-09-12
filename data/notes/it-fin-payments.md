# Payment Rails Behind the Securities Market

## Why an IT officer should know this

Every trade has a **funds leg** and a **securities leg**. The securities leg runs through depositories; the funds leg runs through the banking system. Most settlement failures and most investor complaints about money are, underneath, payment-system problems.

## The rails

| Rail | Operator | Characteristic |
|---|---|---|
| **RTGS** | RBI | **Real-time gross settlement**, high value (₹2 lakh minimum), **24×7 since December 2020**, irrevocable |
| **NEFT** | RBI | Deferred net settlement in half-hourly batches, **24×7 since December 2019**, no minimum |
| **IMPS** | NPCI | Instant, 24×7, retail, mobile-first |
| **UPI** | NPCI | Instant, interoperable, VPA-addressed, 24×7; underpins IPO applications and the block mechanism |
| **NACH** | NPCI | Bulk mandates — SIP debits, dividends, refunds |
| **AePS / BBPS / FASTag / RuPay** | NPCI | Aadhaar-enabled, bill payments, tolls, cards |

**Gross vs net settlement** is a key distinction: RTGS settles each transaction individually (no netting, no settlement risk, high liquidity need); NEFT nets within a batch (efficient, small residual risk).

## Where they touch the securities market

- **IPO applications:** **ASBA** blocks funds in the investor's own bank account; the **UPI mandate** is the retail block mechanism, routed through a **Sponsor Bank** to the **SCSB**, with the **Registrar** reconciling.
- **Secondary market block mechanism (ASBA-like):** funds stay in the client's bank account, blocked in favour of the clearing corporation, debited only on settlement — reducing the amount of client money sitting with brokers.
- **Upstreaming of client funds:** brokers must move client funds to clearing corporations rather than retaining them, in specified instruments. This is a direct response to broker-default episodes.
- **Mutual fund SIPs** run on **NACH mandates** and increasingly **UPI Autopay**.
- **Dividends, redemptions and refunds** are paid electronically to the registered bank account.
- **Payouts:** direct payout of securities to client demat accounts, and funds to the client's registered account.

## CBDC (e-Rupee)

RBI's **central bank digital currency**, piloted in **wholesale** (settlement of secondary-market G-sec transactions) and **retail** (token-based wallets) forms since 2022. Relevance to securities markets: **atomic delivery-versus-payment (DvP)** — settling the securities leg and the funds leg simultaneously and irrevocably, which removes principal risk. Being able to explain **DvP and why atomic settlement matters** is a strong, specific answer.

## Risk vocabulary

**Settlement risk**, **Herstatt risk** (time-zone settlement risk in FX), **principal risk**, **liquidity risk**, **DvP models (DvP-1 gross/gross, DvP-2 gross securities/net funds, DvP-3 net/net)**, **finality of settlement**, **payment versus payment**.

---

## Exam pointers

1. **RTGS = gross, high value, real-time; NEFT = net, batched.** Both 24×7 now.
2. **ASBA blocks funds in the investor's own account**; UPI is the retail block mechanism.
3. **Upstreaming** keeps client money out of broker accounts.
4. **DvP = simultaneous exchange of securities and funds**; CBDC enables atomic settlement.
5. NPCI runs UPI/IMPS/NACH; **RBI runs RTGS and NEFT**.
