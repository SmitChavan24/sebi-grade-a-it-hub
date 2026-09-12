# Software Testing

## Levels

```
Unit  -> Integration -> System -> Acceptance (UAT)
```

**Unit** (a single module, by developers, usually automated) → **Integration** (module interactions; **big bang**, **top-down** with stubs, **bottom-up** with drivers, **sandwich/hybrid**) → **System** (the whole system against requirements, including non-functional) → **Acceptance** (by the customer; **alpha** at the developer's site, **beta** at the user's site).

**Regression testing** — re-running tests after a change to confirm nothing previously working has broken. **Smoke testing** — a quick check that the build is stable enough to test at all. **Sanity testing** — narrow checks after a small change.

## Black box vs white box

| | Black box (functional) | White box (structural) |
|---|---|---|
| Knowledge of internals | No | Yes |
| Basis | Requirements | Code paths |
| Techniques | **Equivalence partitioning, boundary value analysis, decision tables, state transition, error guessing, pairwise** | **Statement, branch, path, condition coverage; basis path testing; cyclomatic complexity** |
| Done by | Testers | Developers |

**Grey box** combines both.

**Boundary Value Analysis:** defects cluster at boundaries. For a valid range of 1–100, test **0, 1, 2, 99, 100, 101**. **Equivalence partitioning** reduces cases by treating each class as equivalent — one valid class and the invalid classes on either side.

**Cyclomatic complexity** = **E − N + 2P** (edges, nodes, connected components), or simply **number of decision points + 1**. It gives the number of independent paths and hence a lower bound on basis-path test cases. A value above roughly 10 suggests a module that should be split.

## Coverage hierarchy

**Statement coverage** (every line executed) < **branch/decision coverage** (every branch taken both ways) < **condition coverage** < **MC/DC** (each condition independently affects the outcome — required in safety-critical standards) < **path coverage** (every path; usually infeasible because loops explode the count).

100% statement coverage does **not** imply 100% branch coverage — a standard exam trap.

## Non-functional testing

**Performance** (response time, throughput), **load** (expected peak), **stress** (beyond peak, to find the breaking point), **soak/endurance** (memory leaks over time), **spike**, **volume**, **scalability**, **security** (VAPT, SAST/DAST), **usability**, **compatibility**, **recovery/failover**, **installation**.

For trading systems, the important ones are **latency percentiles (p99, not average)**, **capacity at peak event-day volumes**, and **failover testing** — because the average case is never what fails.

## Test artefacts and process

Test plan, test scenarios, **test cases** (ID, precondition, steps, expected result), test data, **defect report** (severity vs **priority** — severity is technical impact, priority is business urgency; they are independent), **traceability matrix**, test summary report.

**Defect life cycle:** New → Assigned → Open → Fixed → **Retest** → Closed, with branches to Deferred, Rejected, Duplicate, Reopened.

**Verification vs validation:** verification asks "are we **building the product right**" (reviews, inspections, static analysis); validation asks "are we **building the right product**" (actual execution against user needs).

**Test automation:** unit frameworks (JUnit, pytest), API testing, UI automation (Selenium), performance tools (JMeter). The **test pyramid** — many unit tests, fewer integration tests, fewest UI tests — because UI tests are slow and brittle.

---

## Exam pointers

1. **Verification = building it right; validation = building the right thing.**
2. **Cyclomatic complexity = E − N + 2P = decision points + 1.**
3. **Severity ≠ priority**, and they are independent.
4. **Top-down integration uses stubs; bottom-up uses drivers.**
5. 100% statement coverage does **not** give 100% branch coverage.
