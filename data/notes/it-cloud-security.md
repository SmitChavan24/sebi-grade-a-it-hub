# Cloud Security and the Shared Responsibility Model

## Shared responsibility

The provider is responsible for **security OF the cloud**; the customer for **security IN the cloud**.

| Layer | IaaS | PaaS | SaaS |
|---|---|---|---|
| Physical, host, hypervisor | Provider | Provider | Provider |
| Network controls | Shared | Provider | Provider |
| OS patching | **Customer** | Provider | Provider |
| Application code | Customer | Customer | Provider |
| **Identity and access config** | **Customer** | **Customer** | **Customer** |
| **Data and its classification** | **Customer** | **Customer** | **Customer** |

The two rows that **never** move are **identity configuration** and **data**. Almost every publicised "cloud breach" is in fact a **customer misconfiguration** — a public storage bucket, an over-permissive IAM role, an exposed management port — not a provider failure. Say that precisely; it signals you understand the model.

## Principal cloud risks

1. **Misconfiguration** — the dominant cause. Countered by **CSPM** tooling, IaC with policy-as-code, guardrails and secure baselines.
2. **Identity compromise** — over-permissive roles, long-lived keys, no MFA. Countered by least privilege, short-lived credentials, **just-in-time** access, key rotation, and **SCP/permission boundaries**.
3. **Data exposure** — encryption at rest (**customer-managed keys**, BYOK/HYOK) and in transit, tokenisation, DLP.
4. **Multi-tenancy risks** — noisy neighbours, side-channel attacks, hypervisor escape (rare but catastrophic).
5. **Supply chain** — compromised images, dependencies, and provider sub-processors.
6. **Concentration risk** — a handful of providers serve most of the financial sector; an outage or compromise is systemic. **This is the risk a regulator cares about most.**
7. **Vendor lock-in and exit** — the ability to actually leave, with data, within a defined time.
8. **Jurisdiction** — where data physically sits, and which government can compel access to it.
9. **Shared visibility gap** — you cannot deploy your own network taps in someone else's data centre; you depend on provider logs.

## Controls

- **IAM:** roles over users, no root/keys in code, MFA everywhere, federated identity, **service control policies**.
- **Network:** VPC design, private subnets, security groups and NACLs, **private endpoints** instead of public exposure, egress filtering, **no direct internet access for data-layer resources**.
- **Encryption:** at rest with **KMS/HSM-backed keys**, in transit with TLS, key rotation, separation between who can use a key and who can manage it.
- **Logging:** provider audit logs (CloudTrail-style) shipped to an **immutable, separate account**, integrated into the SIEM.
- **Workload:** hardened images, vulnerability scanning of images and registries, runtime protection, **admission control** for Kubernetes.
- **Backup:** cross-region, **immutable/object-locked**, restore-tested.
- **Resilience:** multi-AZ by default, multi-region for critical systems, chaos/failure testing.

## Compliance in the Indian context

- **MeitY empanelment** of cloud service providers for government workloads.
- **Data localisation** requirements vary by regulator — RBI's payment data localisation directive is the strictest well-known example; SEBI's cloud framework and CERT-In directions carry their own requirements on where logs and records are kept.
- **DPDP Act** obligations on the entity as a **Data Fiduciary**, regardless of who runs the infrastructure. Outsourcing the processing never outsources the accountability — a line worth using verbatim.
- **CERT-In empanelled auditors** for VAPT.
- **ISO 27017/27018**, **SOC 2 Type II** reports from providers as assurance artefacts.

---

## Exam pointers

1. **Provider: security OF the cloud. Customer: security IN the cloud.**
2. **Identity configuration and data are always the customer's** — in every service model.
3. Most cloud breaches are **customer misconfiguration**.
4. **Concentration risk** is the systemic concern for a financial regulator.
5. "Outsourcing processing does not outsource accountability" — use it.
