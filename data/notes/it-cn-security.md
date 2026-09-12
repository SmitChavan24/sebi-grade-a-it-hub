# Network Security Devices and Controls

## Firewalls

| Generation | How it decides |
|---|---|
| **Packet filter (stateless)** | ACLs on IP, port, protocol. Fast, no context |
| **Stateful inspection** | Tracks connection state; allows return traffic for established sessions |
| **Application/proxy firewall** | Terminates and inspects at layer 7 |
| **NGFW** | Adds application awareness, user identity, IPS, TLS inspection, threat intelligence |
| **WAF** | Specifically protects web applications — SQLi, XSS, OWASP rules |

**Default-deny** is the correct posture: permit what is required, deny everything else.

**DMZ** — a screened subnet holding internet-facing services (web, mail, DNS) between two firewalls, so that a compromise there does not reach the internal network. In a broker or exchange architecture, the trading core sits several zones deep, never in the DMZ.

## IDS and IPS

| | IDS | IPS |
|---|---|---|
| Position | Out of band (span port) | **In line** |
| Action | Alerts | **Blocks** |
| Risk | Missed attacks | False positives can drop legitimate traffic |

**Detection methods:** **signature-based** (known patterns, cannot catch zero-days) vs **anomaly/behaviour-based** (baseline deviation, more false positives) vs **heuristic**. Types: **NIDS** (network) and **HIDS** (host).

Know the four outcomes: **true positive, true negative, false positive (false alarm), false negative (missed attack)**. In a regulated environment, false negatives are the dangerous ones.

## VPN

Creates an encrypted tunnel over a public network.

- **IPsec** — layer 3. **AH** (authentication and integrity only) vs **ESP** (**encryption** plus authentication). **Transport mode** (payload only, host to host) vs **tunnel mode** (whole packet encapsulated, site to site). **IKE** for key exchange.
- **SSL/TLS VPN** — layer 7, clientless browser access.
- **Site-to-site** vs **remote access** VPN. **Split tunnelling** (and why security teams disable it).
- Modern successors: **SASE**, **ZTNA** — identity-based access replacing network-perimeter trust.

## Other controls

- **Proxy** (forward: controls outbound user access; reverse: fronts servers, load balancing and TLS termination).
- **NAC** — network access control, posture checking before admitting a device.
- **Network segmentation and micro-segmentation**; **air-gapped** networks for the most critical systems.
- **DDoS protection** — rate limiting, anycast scrubbing centres, upstream filtering. **Volumetric vs protocol vs application-layer** attacks.
- **Honeypot / honeynet** — decoy systems to study attackers.
- **SIEM** — aggregates logs from everything, correlates, alerts; the heart of a **SOC**. **SOAR** adds automated response.
- **Network taps, span ports, NetFlow, packet capture (Wireshark, tcpdump)** for visibility.

## Wireless security

WEP (broken) → WPA (TKIP) → **WPA2 (AES-CCMP)** → **WPA3 (SAE, forward secrecy, protection against offline dictionary attacks)**. Enterprise mode uses **802.1X with RADIUS** and EAP; personal mode uses a pre-shared key. **Evil twin**, **deauthentication** and **rogue AP** are the standard attacks.

---

## Exam pointers

1. **Stateless filters cannot track sessions**; stateful firewalls can.
2. **IDS detects, IPS prevents**; IPS is **in line**.
3. IPsec: **AH = integrity only, ESP = encryption + integrity**; tunnel mode encapsulates the whole packet.
4. **WPA2 = AES-CCMP; WPA3 = SAE.**
5. A **DMZ** exists so that a compromised public service does not equal a compromised internal network.
