# Derivatives — Futures, Options and Regulation

> Derivatives are ~99% of Indian equity market turnover by notional value. SEBI's recent regulatory attention to the segment makes this a very likely interview topic.

## 1. What a derivative is

A contract whose value is **derived** from an underlying asset (equity, index, currency, commodity, interest rate). Under SCRA **2(ac)** derivatives are securities. Four types: **forwards, futures, options, swaps**.

| | Forward | Future |
|---|---|---|
| Traded | OTC, bilateral | Exchange |
| Terms | Customised | Standardised |
| Counterparty risk | Yes | No — CCP novation |
| Settlement | On maturity | Daily mark-to-market |

## 2. Options — the core vocabulary

- **Call option** — right (not obligation) to **buy** at the strike price.
- **Put option** — right to **sell** at the strike price.
- **Buyer** pays the **premium** and has limited loss / unlimited (or large) profit. **Writer/seller** receives the premium and carries the large risk — which is why only sellers pay margin.
- **European** options can be exercised only at expiry; **American** any time. **Indian index and stock options are European style**; futures are cash or physically settled depending on the contract (stock derivatives are **physically settled**).

**Payoffs at expiry (S = spot, K = strike, P = premium):**

| Position | Payoff |
|---|---|
| Long call | max(S − K, 0) − P |
| Short call | P − max(S − K, 0) |
| Long put | max(K − S, 0) − P |
| Short put | P − max(K − S, 0) |

**Moneyness:** a call is **ITM** if S > K, **ATM** if S = K, **OTM** if S < K (reverse for a put).

**Option premium = intrinsic value + time value.** Intrinsic value can never be negative.

**The Greeks:** **Delta** (sensitivity to the underlying), **Gamma** (rate of change of delta), **Theta** (time decay), **Vega** (sensitivity to volatility), **Rho** (interest rate).

## 3. Margins and risk management

**SPAN + Exposure margin** is the framework; add **mark-to-market**, **peak margin** reporting and **upfront margin collection**. Positions are subject to **position limits** at client, member and market level. The **Market Wide Position Limit (MWPL)** applies to stock derivatives, with a ban period when open interest crosses 95%.

## 4. Regulatory developments to have an answer on

- **Physical settlement** of stock derivatives (from 2018-19) to link the cash and derivatives markets.
- **Peak margin norms** and **upfront margin collection** to curb excessive intraday leverage.
- SEBI's studies showing that a large majority of individual traders in equity F&O make **net losses**, and the consequent **tightening measures** — higher contract sizes, rationalised weekly expiries, upfront premium collection, intraday position monitoring. Know the *direction* of policy: reduce retail speculation, preserve genuine hedging.
- **Investor risk disclosure** requirements on brokers' platforms.

> ⚠ Specific numerical limits in this area changed during 2024-25. Quote the *policy direction* confidently and the exact figures only if you have verified them recently.

## 5. Uses

**Hedging** (reduce existing risk), **speculation** (take a view), **arbitrage** (exploit price differences — cash-futures basis, calendar spread). SEBI's concern is not derivatives themselves but retail speculation mis-sold as investment.

---

## Exam pointers

1. Indian **index and stock options are European**; stock F&O is **physically settled**.
2. Only **option sellers** pay margin; buyers pay premium.
3. Intrinsic value is never negative; premium = intrinsic + time value.
4. **SPAN + exposure margin**; **MWPL** triggers a ban period at 95% of open interest.
5. Derivatives are **securities** under SCRA 2(ac) — they are SEBI's jurisdiction, not RBI's (except OTC rupee derivatives).
