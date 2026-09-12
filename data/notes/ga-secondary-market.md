# Secondary Market — Exchanges, Indices, Trading and Settlement

> One question here is nearly guaranteed, and the vocabulary in this note is what you will use for the rest of your career at SEBI.

## 1. The exchanges

| Exchange | Set up | Notes |
|---|---|---|
| **BSE** | **1875**, as the Native Share and Stock Brokers' Association | Oldest exchange in Asia; benchmark **SENSEX** (30 stocks, base 1978-79 = 100) |
| **NSE** | **1992**, began trading 1994 | Introduced screen-based nationwide trading; benchmark **NIFTY 50** (base 3 Nov 1995 = 1000) |
| **MSEI** | Metropolitan Stock Exchange | Smaller third exchange |
| **NCDEX / MCX** | Commodity derivatives exchanges | Under SEBI since the FMC merger in 2015 |

**Index methodology:** both SENSEX and NIFTY use **free-float market capitalisation** weighting. Free float excludes promoter and locked-in holdings.

## 2. Trading mechanics

- **Order-driven market** with an **electronic limit order book**; orders match on **price-time priority**.
- **Order types:** market, limit, stop-loss, immediate-or-cancel (IOC), good-till-cancelled, disclosed quantity, after-market orders.
- **Trading hours:** equity 9:15 to 15:30, with a **pre-open session 9:00 to 9:08** (order entry 9:00–9:07, matching and price discovery 9:08–9:12).
- **Circuit breakers (market-wide):** index movement of **10%, 15% and 20%** triggers a market halt, with the halt duration depending on the level and time of day. Individual scrips have **price bands** (2%, 5%, 10%, 20%) and **dynamic price bands** for F&O scrips.
- **Rolling settlement:** currently **T+1**, with an optional **T+0** beta segment introduced in 2024.

## 3. Clearing and settlement

**Clearing corporations** act as the **central counterparty (CCP)**: through **novation** they become the buyer to every seller and the seller to every buyer, which is what removes counterparty risk.

Risk management toolkit: **VaR margin**, **extreme loss margin (ELM)**, **mark-to-market margin**, **peak margin reporting**, **upfront margin collection**, **Settlement Guarantee Fund (core SGF)**, **auction** in case of short delivery, and **default waterfall**.

**Upstreaming of client funds** and the **ASBA-like block mechanism for the secondary market** are recent investor-protection developments — know at least the principle: client money should not sit with brokers.

## 4. Surveillance measures (high-yield for the IT stream)

- **ASM** — Additional Surveillance Measure; **GSM** — Graded Surveillance Measure. Both impose higher margins or trade-for-trade settlement on stocks showing abnormal price behaviour.
- **Trade-for-trade segment** — compulsory delivery, no intraday netting.
- **Integrated market surveillance system** at SEBI plus exchange-level surveillance; alerts feed into investigation. *If you are asked in the interview how you would use technology at SEBI, this is the most natural answer: pattern detection over order and trade data.*

## 5. Market participants and accounts

- **Trading member, clearing member, professional clearing member, custodian.**
- **FPI** — Foreign Portfolio Investors, categorised and registered with SEBI through Designated Depository Participants (DDPs).
- **Retail direct access:** brokers, and for G-secs the **RBI Retail Direct** portal.
- **Client-level requirements:** PAN, KYC through a KRA, demat account, Unique Client Code, nomination, **running account settlement** of funds.

## 6. Corporate actions

Dividend, bonus, split, rights, buyback, merger/demerger. **Ex-date vs record date:** to be eligible, you must own the share **before the ex-date**; under T+1 settlement the ex-date and record date are effectively the same day. Price adjusts on the ex-date for bonus, split and dividend.

## 7. Other segments

- **Derivatives:** index and stock futures/options, currency derivatives, commodity derivatives, interest rate futures.
- **Debt segment:** corporate bonds, G-sec (NDS-OM for wholesale), **Request for Quote (RFQ)** platform, **Online Bond Platform Providers (OBPPs)** for retail.
- **SLB** — securities lending and borrowing through the clearing corporation.
- **Municipal bonds**, **InvIT/REIT units**, **ETFs** and **REITs** trade in the cash segment.

---

## Exam pointers

1. BSE **1875** (Asia's oldest), NSE **1992/1994**. SENSEX base **1978-79 = 100**; NIFTY base **3 Nov 1995 = 1000**.
2. Both indices are **free-float market-cap weighted**.
3. Market-wide circuit breakers at **10 / 15 / 20 per cent**.
4. **Novation** is what makes a clearing corporation a CCP.
5. **ASM and GSM** are surveillance measures, not punishments — they raise the cost of speculation in a stock.
