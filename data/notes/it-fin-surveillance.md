# Market Surveillance and Data Analytics

> If you want one answer ready for "how would you use your IT skills at SEBI", make it this one.

## The surveillance stack

```
Exchanges (first-level surveillance)
   - real-time alerts, price/volume monitoring, ASM/GSM, trade-for-trade
Clearing corporations and depositories
   - settlement, position and holding data
SEBI (second-level surveillance)
   - integrated surveillance across exchanges and segments
   - data warehouse, pattern analytics, alert triage, referral to investigation
```

**Multi-exchange and cross-segment surveillance** matters because a manipulation can be split across venues and between cash and derivatives to stay under each venue's radar.

## Data sources

Order and trade data (with timestamps), **order book snapshots**, client/UCC data, **demat holdings and transfers**, bank flows where available, KYC and beneficial ownership, corporate announcements and filings, **social media and messaging channels**, news feeds.

## Patterns that alerts are built for

| Pattern | Signature |
|---|---|
| **Circular / wash trading** | Trades among a closed set of connected accounts with no real change in beneficial ownership — a **graph problem** |
| **Pump and dump** | Coordinated promotion, price and volume spike, promoter/operator exit |
| **Front running** | A broker or connected account trading ahead of a large client order — requires correlating order arrival with account activity |
| **Insider trading** | Trading in a window before a price-sensitive announcement by connected persons — correlate UPSI dates with trading records |
| **Spoofing / layering** | Large orders placed and cancelled near touch to move the price; high **order-to-cancel** ratio |
| **Synchronised trades** | Matching buy and sell orders entered within milliseconds at identical prices and quantities |
| **Price manipulation at close** | Concentrated activity in the closing session to set a reference price |

## Analytical techniques

- **Rule-based alerts** — thresholds and patterns. Transparent and explainable, but rigid and easy to game.
- **Statistical anomaly detection** — z-scores, seasonality-adjusted baselines, peer-group comparisons.
- **Machine learning** — unsupervised clustering and outlier detection (isolation forests, autoencoders) for unknown patterns; supervised models trained on confirmed cases, which are scarce — a **class-imbalance** problem.
- **Graph/network analytics** — the single best fit for market abuse: accounts as nodes, trades and fund transfers as edges, then look for **communities, cycles and unusual centrality**. Common beneficial ownership, shared addresses, shared IP or device fingerprints, and fund-flow chains all become edges.
- **NLP** — parsing filings, announcements and social media for manipulation signals and for **rumour verification** requirements.
- **Link analysis with KYC/CKYC data** to establish connectedness — which is the legal crux of most insider trading and PFUTP cases.

## The hard parts (say these in an interview — they show judgement)

1. **False positives.** Alert volume is the binding constraint; an analyst's time is the scarce resource. Precision matters more than recall at the alert stage.
2. **Explainability.** An enforcement order must survive appeal at SAT. A model that cannot explain *why* it flagged something is evidence-weak — so ML is best used for **triage and lead generation**, with rule-based and human analysis for the case itself.
3. **Data quality and identity resolution.** Everything depends on knowing that two accounts are the same person or connected persons.
4. **Adversarial adaptation.** Manipulators change behaviour once they learn the thresholds; static rules decay.
5. **Privacy and proportionality.** Surveillance of financial behaviour engages the DPDP Act and constitutional privacy considerations; powers must be exercised within the statute.

## Related SEBI initiatives

Integrated surveillance systems, **data warehousing and analytics projects**, the use of **AI/ML for alert generation**, social-media monitoring for unregistered advisory and manipulation, and the **rumour verification** requirement under LODR for large listed entities.

---

## Exam pointers

1. **Two-level surveillance:** exchange first, SEBI second.
2. **Circular trading is a graph problem**; say so, and explain why.
3. ML is best for **triage**; enforcement needs **explainable** evidence.
4. **False positive rate** is the practical constraint on any surveillance system.
5. Manipulative practices are actionable under **PFUTP**, and insider trading under **PIT + S.15G**.
