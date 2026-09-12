# Agile, Scrum, DevOps and CI/CD

## The Agile Manifesto (2001) — four values

> **Individuals and interactions** over processes and tools
> **Working software** over comprehensive documentation
> **Customer collaboration** over contract negotiation
> **Responding to change** over following a plan
>
> "…while there is value in the items on the right, we value the items on the left more."

That last clause matters — Agile does not mean "no documentation". Twelve supporting principles include early and continuous delivery, welcoming changing requirements, delivering frequently, sustainable pace, technical excellence and self-organising teams.

## Scrum

**Roles (accountabilities):**
- **Product Owner** — owns the Product Backlog and maximises value.
- **Scrum Master** — serves the team, removes impediments; **not a project manager**.
- **Developers** — the cross-functional team that builds the increment.

**Events:** **Sprint** (a fixed timebox, typically 2–4 weeks) containing **Sprint Planning**, **Daily Scrum** (15 minutes), **Sprint Review** (demonstrate the increment to stakeholders), **Sprint Retrospective** (improve the process).

**Artefacts:** **Product Backlog**, **Sprint Backlog**, **Increment**, each with a commitment — Product Goal, Sprint Goal, and **Definition of Done**.

**Practices:** user stories ("As a <role>, I want <goal>, so that <benefit>"), **story points** and relative estimation, **planning poker**, **velocity**, **burndown/burnup charts**, backlog refinement.

## Kanban

Visualise the workflow on a board, **limit work in progress (WIP)**, manage flow, make policies explicit, improve continuously. Measured by **lead time**, **cycle time** and **throughput**. Continuous flow rather than fixed sprints; often better than Scrum for support and operations work.

**Scrum vs Kanban:** timeboxed iterations and fixed roles versus continuous flow and WIP limits.

**Scaling frameworks:** SAFe, LeSS, Spotify model — recognise the names.

## DevOps

A culture and practice set that unites development and operations to shorten the delivery cycle while improving reliability. **CALMS**: Culture, Automation, Lean, Measurement, Sharing.

**DORA metrics** — the four that matter:
1. **Deployment frequency**
2. **Lead time for changes**
3. **Change failure rate**
4. **Mean time to restore (MTTR)**

High performers are better on all four simultaneously — speed and stability are not a trade-off. That finding is worth quoting.

## CI/CD

```
Commit -> CI: build, unit tests, static analysis, security scan (SAST/SCA)
       -> artefact build and signing
       -> CD: deploy to staging, integration and acceptance tests
       -> deploy to production (manual approval = continuous DELIVERY,
                               automatic        = continuous DEPLOYMENT)
       -> monitor, alert, roll back if needed
```

**Deployment strategies:** blue-green (two environments, switch traffic), **canary** (small percentage first), rolling, feature flags (deploy without releasing).

**Infrastructure as Code** (Terraform, Ansible), **immutable infrastructure**, **GitOps**. **Observability** = logs + metrics + traces. **SRE concepts:** SLI, SLO, SLA, **error budget**, toil reduction, blameless post-mortems.

**DevSecOps** — shift security left: SAST, DAST, SCA/dependency scanning, secrets scanning, container image scanning, **SBOM** generation, policy-as-code. For a SEBI-regulated entity this is where **change management and segregation of duties** must be preserved even while automating: the pipeline must enforce approvals, not bypass them.

## Where Agile meets regulation

A regulated entity can be agile, but must retain: documented **change approval**, **segregation between who writes and who deploys**, **traceability from requirement to test to release**, and **auditable records**. The practical answer is to encode those controls **into the pipeline** rather than running a manual process alongside it.

---

## Exam pointers

1. Manifesto: **four values**, and the "items on the right still have value" clause.
2. **Scrum Master is not a project manager**; the Product Owner owns the backlog.
3. **Kanban limits WIP**; Scrum timeboxes sprints.
4. **DORA's four metrics** — know them by name.
5. Continuous **delivery** needs approval to release; continuous **deployment** does not.
