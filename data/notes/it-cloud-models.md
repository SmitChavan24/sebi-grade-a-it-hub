# Cloud Computing — Models and Virtualisation

## NIST definition (SP 800-145) — five essential characteristics

1. **On-demand self-service**
2. **Broad network access**
3. **Resource pooling** (multi-tenancy)
4. **Rapid elasticity**
5. **Measured service** (pay per use)

## Service models

| Model | You manage | Provider manages | Example |
|---|---|---|---|
| **IaaS** | OS, runtime, apps, data | Virtualisation, servers, storage, network | EC2, Azure VM |
| **PaaS** | Apps and data | + OS, runtime, middleware | App Engine, Elastic Beanstalk, RDS |
| **SaaS** | Configuration and your data | Everything else | Salesforce, Microsoft 365 |
| **FaaS / Serverless** | Function code | Everything, including scaling to zero | AWS Lambda |

Memorise the split by asking **"who patches the OS?"** — you in IaaS, the provider in PaaS and SaaS.

## Deployment models

- **Public** — shared infrastructure, greatest elasticity, least control.
- **Private** — single organisation; on-premises or hosted.
- **Hybrid** — both, with portability between them.
- **Community** — shared by organisations with common concerns (a plausible model for a **regulated financial community cloud**).
- **Multi-cloud** — more than one provider; reduces concentration risk, raises complexity.

## Virtualisation

**Hypervisor types:**
- **Type 1 (bare metal)** — runs directly on hardware (ESXi, Hyper-V, KVM, Xen). Better performance and isolation; used in data centres.
- **Type 2 (hosted)** — runs on a host OS (VirtualBox, VMware Workstation). For desktops and labs.

**VM vs container:**

| | Virtual machine | Container |
|---|---|---|
| Isolation | Full OS per VM, hardware-level | Shared kernel, namespace/cgroup isolation |
| Size | GBs | MBs |
| Boot | Minutes | Seconds |
| Density | Lower | Higher |
| Security boundary | **Stronger** | Weaker (kernel is shared) |

Containers are **not** a security boundary equivalent to a VM — which matters when regulators ask about tenant isolation.

Other forms: storage virtualisation, **network virtualisation (SDN, VXLAN)**, desktop virtualisation (**VDI**), application virtualisation.

## Cloud economics and operations

- **CapEx → OpEx**, elasticity, pay-per-use, and the hidden costs: **egress charges**, over-provisioning, idle resources, and licensing.
- **Auto-scaling** (horizontal vs vertical), **load balancing**, **availability zones and regions**, **fault domains**.
- **Well-Architected pillars** (AWS): operational excellence, security, reliability, performance efficiency, cost optimisation, sustainability.
- **IaC** — Terraform, CloudFormation; **immutable infrastructure**; **GitOps**.

## Storage types

**Block** (raw volumes — EBS), **File** (shared filesystem — EFS/NFS), **Object** (HTTP-addressed, immutable, metadata-rich — S3). Object storage with **versioning and object lock** is the standard ransomware-resistant backup target.

---

## Exam pointers

1. **Five NIST characteristics** — learn them as a list; they get asked directly.
2. "Who patches the OS" distinguishes **IaaS from PaaS**.
3. **Type 1 hypervisor = bare metal.**
4. Containers share the **kernel** — a weaker isolation boundary than VMs.
5. **Object storage with object lock** is the backup answer for ransomware resilience.
