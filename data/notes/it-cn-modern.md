# Wireless, Mobile, SDN and Troubleshooting

## Wireless standards (802.11)

| Standard | Common name | Band | Max rate (theoretical) |
|---|---|---|---|
| 802.11a | — | 5 GHz | 54 Mbps |
| 802.11b | — | 2.4 GHz | 11 Mbps |
| 802.11g | — | 2.4 GHz | 54 Mbps |
| 802.11n | Wi-Fi 4 | Both | 600 Mbps (MIMO) |
| 802.11ac | Wi-Fi 5 | 5 GHz | Gbps range (MU-MIMO) |
| 802.11ax | **Wi-Fi 6 / 6E** | 2.4/5/6 GHz | OFDMA, higher density |
| 802.11be | Wi-Fi 7 | Multi-band | Multi-link operation |

**2.4 GHz** — longer range, more interference, 3 non-overlapping channels (1, 6, 11). **5 GHz** — shorter range, more channels, higher throughput.

Other 802 standards to recognise: **802.3 Ethernet**, **802.1Q VLAN**, **802.1X port-based access control**, **802.15.1 Bluetooth**, **802.15.4 Zigbee**, **802.16 WiMAX**.

## Mobile generations

| Gen | Technology | Characteristic |
|---|---|---|
| 1G | Analog | Voice only |
| 2G | GSM/CDMA, **digital** | SMS, GPRS/EDGE (2.5G) |
| 3G | UMTS/HSPA | Mobile data |
| 4G | **LTE**, all-IP | Broadband, VoLTE |
| **5G** | NR | **eMBB, URLLC, mMTC**; network slicing, edge computing, sub-6 GHz and mmWave |

**Handoff/handover**, cell structure, frequency reuse, MIMO, beamforming.

## SDN and NFV

**Software Defined Networking** separates the **control plane** (decides where traffic goes) from the **data plane** (forwards it), with a **centralised controller** programming switches through a southbound API (**OpenFlow**) and exposing a northbound API to applications.

Benefits: central policy, automation, vendor independence, rapid reconfiguration. Risks: **the controller is a single point of failure and a high-value target**.

**NFV** — running network functions (firewall, load balancer, router) as software on commodity hardware rather than dedicated appliances. **VNF**, service chaining.

Related: **intent-based networking**, **SD-WAN**, **network automation** (Ansible, NETCONF/YANG).

## Cloud and data centre networking

**Leaf-spine** topology, **east-west vs north-south traffic**, **overlay networks (VXLAN)**, **container networking (CNI)**, **service mesh (Envoy/Istio)** for service-to-service traffic, **load balancers** (L4 vs L7, round robin, least connections, IP hash), **CDN** for edge caching.

## Troubleshooting toolkit

| Tool | Use |
|---|---|
| `ping` | Reachability and RTT (ICMP echo) |
| `traceroute` / `tracert` | Path and per-hop latency (TTL expiry) |
| `nslookup` / `dig` | DNS resolution |
| `netstat -tulnp` / `ss` | Listening ports and connections |
| `ipconfig` / `ip a` | Interface configuration |
| `arp -a` | ARP cache |
| `tcpdump` / **Wireshark** | Packet capture and analysis |
| `iperf` | Throughput measurement |
| `mtr` | Continuous traceroute + ping |

**A structured method:** check physical → IP configuration → gateway → DNS → application. Or work the OSI layers bottom-up; either way, be systematic rather than random.

## Latency in trading networks (stream-relevant)

Every microsecond matters in low-latency trading: **co-location** puts the member's server in the exchange data centre; **kernel bypass** (DPDK, solarflare), **FPGA** based order handling, **multicast market data**, **precision time protocol (PTP)** for sub-microsecond clock sync. SEBI's concern is **fair and equal access** — which is why co-location, tick-by-tick data dissemination and latency measurement are regulated subjects rather than purely technical ones.

---

## Exam pointers

1. **2.4 GHz non-overlapping channels: 1, 6, 11.**
2. **802.1X = port-based network access control** (not a wireless standard as such).
3. 5G's three pillars: **eMBB, URLLC, mMTC**.
4. SDN separates **control plane from data plane**; OpenFlow is the southbound protocol.
5. Traceroute works by **incrementing TTL** and reading ICMP time-exceeded messages.
