# Routing Algorithms and Protocols

## Classification

| Basis | Types |
|---|---|
| Information source | **Static** (manual) vs **Dynamic** (learned) |
| Algorithm | **Distance vector**, **Link state**, **Path vector** |
| Scope | **IGP** (within an AS) vs **EGP** (between AS) |
| Behaviour | Classful vs **classless** (supports VLSM) |

## Distance vector (Bellman-Ford)

Each router shares its **whole routing table with its neighbours**, periodically. Metric: **hop count**.

- **RIP** — max hop count **15** (16 = unreachable), updates every **30 s**, uses **UDP port 520**. RIPv2 is classless with authentication.
- Problem: **count-to-infinity** and slow convergence. Fixes: **split horizon** (do not advertise a route back on the interface you learned it from), **split horizon with poison reverse**, **hold-down timers**, **triggered updates**.

## Link state (Dijkstra)

Each router floods **link-state advertisements** about its own links to **everyone**, builds an identical topology map, then runs **Dijkstra's shortest path first** locally.

- **OSPF** — IGP, classless, metric is **cost = reference bandwidth / interface bandwidth**, uses **areas** (area 0 is the backbone) to scale, runs directly on **IP protocol 89**, forms adjacencies with DR/BDR on broadcast segments. Faster convergence, more CPU and memory.
- **IS-IS** — similar, common in service-provider networks.

| | Distance vector | Link state |
|---|---|---|
| Knowledge | Neighbours only | Entire topology |
| Shared with | Neighbours | All routers (flooding) |
| Update | Periodic, full table | Triggered, only changes |
| Convergence | Slow | Fast |
| Resource use | Low | High |
| Loops | Count-to-infinity | Rare |

## Path vector

**BGP** — the routing protocol **between autonomous systems**, and therefore the routing protocol of the Internet.

- Runs over **TCP port 179**; eBGP between AS, iBGP within.
- Advertises the **AS_PATH**, which both prevents loops and enables **policy-based routing** — BGP chooses on policy, not shortest path.
- Attributes in decision order (simplified): **weight → local preference → locally originated → AS_PATH length → origin → MED → eBGP over iBGP → lowest IGP metric**.
- **Route hijacking / route leaks** happen because BGP trusts announcements. Mitigations: **RPKI**, route filtering, **BGPsec**. *Worth knowing: a BGP hijack affecting an exchange or a broker is a realistic market-infrastructure risk.*

## Dijkstra vs Bellman-Ford

| | Dijkstra | Bellman-Ford |
|---|---|---|
| Negative weights | Not allowed | Allowed (detects negative cycles) |
| Complexity | O(E log V) with a heap | O(V·E) |
| Approach | Greedy | Dynamic programming |

## Other routing concepts

- **Routing table entries:** destination network, mask, next hop, interface, metric, administrative distance.
- **Longest prefix match** decides which route wins when several match.
- **Administrative distance** — preference between protocols (connected 0, static 1, eBGP 20, OSPF 110, RIP 120).
- **Default route** 0.0.0.0/0. **Floating static route** as a backup.
- **Unicast, broadcast, multicast (IGMP, PIM), anycast** (used by DNS root servers and CDNs).
- **MPLS** — label switching, faster forwarding and traffic engineering; often used for **leased-line quality links between brokers, exchanges and clearing corporations**.

---

## Exam pointers

1. **RIP hop limit 15**; OSPF metric is **cost based on bandwidth**; BGP uses **AS_PATH**.
2. **OSPF area 0 is the backbone.**
3. BGP runs on **TCP 179** — the only routing protocol using TCP.
4. **Longest prefix match** always wins, regardless of metric.
5. Bellman-Ford handles negative weights; **Dijkstra does not**.
