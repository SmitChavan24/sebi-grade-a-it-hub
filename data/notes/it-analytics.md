# Data Analytics and Visualisation

## Types of analytics

| Type | Question | Example |
|---|---|---|
| **Descriptive** | What happened? | Turnover by segment last month |
| **Diagnostic** | Why did it happen? | Which client group drove the spike |
| **Predictive** | What will happen? | Likelihood that an alert becomes a confirmed case |
| **Prescriptive** | What should we do? | Which alerts to assign to which analyst first |

Regulatory analytics rarely needs to be prescriptive; **descriptive and diagnostic done reliably** beat a speculative predictive model.

## Statistics you must not fumble

- **Mean, median, mode**; median is robust to outliers — and financial data is full of outliers.
- **Variance, standard deviation, IQR**; **skewness** and **kurtosis** (fat tails are the norm in market returns).
- **Correlation vs causation**; **Simpson's paradox** — an aggregate trend can reverse within subgroups.
- **Hypothesis testing:** null and alternative, p-value, significance level, **Type I error (false positive)** vs **Type II error (false negative)**, power.
- **Confidence intervals**; **Central Limit Theorem**; sampling bias, survivorship bias.
- **z-score** for outlier detection: (x − μ)/σ.

## Visualisation

**Chart choice:**

| Purpose | Chart |
|---|---|
| Comparison across categories | Bar |
| Trend over time | Line |
| Distribution | Histogram, box plot |
| Relationship | Scatter |
| Composition | Stacked bar (**not** a pie chart with many slices) |
| Density over two dimensions | Heatmap |
| Networks | Node-link graph |

**Principles:** start bar-chart axes at zero, avoid dual axes where they imply false correlation, label directly rather than relying on legends, use colour for meaning rather than decoration, and design for colour-blind readers. **Chartjunk** and **the lie factor** (Tufte) are worth naming.

**Tools:** Tableau, Power BI, Qlik; Python (matplotlib, seaborn, plotly), R (ggplot2), Grafana/Kibana for operational dashboards, D3 for custom work.

## Dashboards for supervision

A supervisory dashboard should answer, at a glance: **what is unusual today**, **what is overdue**, and **where is risk concentrating**. Practical design rules:
- One screen, no scrolling, for the primary view.
- **Alert volume, ageing and closure rate** — a rising backlog is itself a supervisory signal.
- Drill-through from every aggregate to the underlying records, because supervisors must be able to see the evidence.
- **Data freshness indicators** — a dashboard that silently shows stale data is worse than no dashboard.

## Data quality

Dimensions: **accuracy, completeness, consistency, timeliness, validity, uniqueness**. Techniques: validation at ingestion, reconciliation against a control total, deduplication and **identity resolution**, **lineage** tracking so any number can be traced to its source.

For a regulator, **lineage and reproducibility are not optional** — a figure used in an order must be reconstructible months later, from the same inputs, with the same result.

---

## Exam pointers

1. **Type I = false positive, Type II = false negative.** Know which one a surveillance system fears more, and why the answer depends on cost.
2. **Median over mean** for skewed financial data.
3. **Simpson's paradox** — a good, quotable caution about aggregate statistics.
4. Pick charts by **purpose**; bar axes start at zero.
5. **Lineage and reproducibility** are regulatory requirements, not engineering niceties.
