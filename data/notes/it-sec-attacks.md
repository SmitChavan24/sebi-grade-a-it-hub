# Attacks, Malware and Threats

## Malware taxonomy

| Type | Defining behaviour |
|---|---|
| **Virus** | Attaches to a host file; needs user action to spread |
| **Worm** | **Self-replicating across a network**; no host file needed |
| **Trojan** | Disguised as legitimate software |
| **Ransomware** | Encrypts data and demands payment; modern variants also **exfiltrate and threaten publication** (double extortion) |
| **Spyware / Keylogger / Infostealer** | Covert collection of data and credentials |
| **Rootkit** | Hides at OS or kernel level; **bootkit** below the OS |
| **Backdoor** | Persistent unauthorised access |
| **Botnet** | Network of compromised hosts under a C2 server |
| **Logic bomb** | Triggers on a condition or date |
| **Fileless malware** | Lives in memory / uses legitimate tools (**living off the land**: PowerShell, WMI) |
| **Cryptojacking** | Steals compute for mining |
| **Adware, scareware, PUP** | Nuisance to fraud |

## Social engineering

**Phishing** (mass email), **spear phishing** (targeted), **whaling** (executives), **BEC / CEO fraud** (invoice and payment redirection — the most financially damaging category in practice), **vishing** (voice), **smishing** (SMS), **quishing** (QR codes), **pretexting**, **baiting**, **tailgating**, **watering hole**, **deepfake voice/video fraud**.

Defences: awareness training, simulated phishing, DMARC/SPF/DKIM, out-of-band verification for payment changes, and **a culture where verifying an instruction from a senior person is never penalised**.

## Network and application attacks

| Attack | Mechanism | Defence |
|---|---|---|
| **DoS / DDoS** | Volumetric (UDP flood, amplification via DNS/NTP/memcached), protocol (SYN flood), application (HTTP flood, slowloris) | Rate limiting, anycast scrubbing, SYN cookies, CDN, upstream filtering |
| **MITM** | Intercepting traffic | TLS with certificate validation, HSTS, certificate pinning |
| **ARP spoofing** | Poisoning the ARP cache on a LAN | Dynamic ARP inspection, static entries, segmentation |
| **DNS spoofing / cache poisoning** | Forged DNS responses | DNSSEC, DoH/DoT |
| **Session hijacking** | Stealing a session token | Secure/HttpOnly/SameSite cookies, rotation on privilege change, short expiry |
| **Replay** | Re-sending a captured valid message | Nonces, timestamps, sequence numbers |
| **Privilege escalation** | Vertical (to admin) / horizontal (to a peer account) | Patching, least privilege, hardening |
| **Supply chain** | Compromise a vendor, library or update channel | SBOM, code signing, vendor due diligence, dependency pinning |
| **Insider threat** | Malicious or negligent employee | Separation of duties, monitoring, DLP, exit process |
| **APT** | Long-dwell, targeted, well-resourced intrusion | Detection engineering, threat hunting, assume-breach |

## The attack lifecycle

**Cyber Kill Chain (Lockheed Martin):** Reconnaissance → Weaponisation → Delivery → Exploitation → Installation → Command & Control → **Actions on Objectives**.

**MITRE ATT&CK** — a matrix of real-world tactics (initial access, execution, persistence, privilege escalation, defence evasion, credential access, discovery, lateral movement, collection, exfiltration, impact) and the techniques under each. It is the common language of modern SOC work and worth naming explicitly.

## Threats specific to securities markets

- **Compromise of a broker's trading terminal or OMS** → unauthorised orders placed in client accounts.
- **Ransomware at an intermediary or MII** → availability failure during market hours, with settlement consequences.
- **Data theft of client KYC/PII** → identity fraud, regulatory breach under DPDP.
- **Market manipulation via hacked social media or fake corporate announcements.**
- **DDoS against a broker's order gateway** at a market-sensitive moment.
- **Insider misuse of UPSI** — a security control problem as much as a legal one, which is why the **Structured Digital Database** requirement exists.
- **Third-party/vendor compromise** — the reason SEBI pushes vendor risk management and SBOM.

---

## Exam pointers

1. **Worm self-replicates without a host file; a virus needs one.**
2. **BEC is the costliest social engineering category**, not mass phishing.
3. Kill chain order — and that **detection should aim left of "actions on objectives"**.
4. **MITRE ATT&CK** = tactics and techniques; know the name and what it is.
5. For any market-specific answer, tie the attack to **availability during market hours** and **settlement risk**.
