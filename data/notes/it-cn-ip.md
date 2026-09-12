# Network Layer — IP Addressing and Subnetting

> Subnetting is pure marks. Anyone can get these right with practice, and many candidates lose them by not practising.

## IPv4 addressing

32 bits, written as four dotted decimal octets. Address = **network portion + host portion**, split by the **subnet mask**.

| Class | First octet range | Default mask | Networks / Hosts |
|---|---|---|---|
| A | 1–126 | /8 (255.0.0.0) | 2⁷−2 networks, 2²⁴−2 hosts |
| B | 128–191 | /16 (255.255.0.0) | 2¹⁴ networks, 2¹⁶−2 hosts |
| C | 192–223 | /24 (255.255.255.0) | 2²¹ networks, 2⁸−2 = 254 hosts |
| D | 224–239 | — | **Multicast** |
| E | 240–255 | — | Reserved / experimental |

**127.x.x.x** is loopback. **169.254.x.x** is APIPA/link-local.

**Private ranges (RFC 1918):**
- **10.0.0.0/8**
- **172.16.0.0 – 172.31.255.255 (/12)**
- **192.168.0.0/16**

## Subnetting method

For a /n network:
- **Host bits** = 32 − n; **usable hosts** = 2^(32−n) − 2 (subtract network and broadcast addresses).
- **Block size** = 256 − (the mask octet value) in the "interesting" octet.

**Worked example: 192.168.10.0/26**
- Mask = 255.255.255.192, block size = 256 − 192 = **64**.
- Subnets: .0, .64, .128, .192 → **4 subnets**, each with **62 usable hosts**.
- For the .64 subnet: network **192.168.10.64**, first host **.65**, last host **.126**, broadcast **.127**.

**Handy table:**

| CIDR | Mask | Block | Usable hosts |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | .128 | 128 | 126 |
| /26 | .192 | 64 | 62 |
| /27 | .224 | 32 | 30 |
| /28 | .240 | 16 | 14 |
| /29 | .248 | 8 | 6 |
| /30 | .252 | 4 | **2** (point-to-point links) |

**VLSM** — using different mask lengths inside one network, allocating largest subnets first. **Supernetting/CIDR** — aggregating routes (e.g. four /24s into one /22) to shrink routing tables.

## IPv4 header (20 bytes minimum)

Version · IHL · **DSCP/ECN** · Total length · **Identification, Flags, Fragment offset** · **TTL** · Protocol · Header checksum · Source IP · Destination IP · Options.

**Fragmentation:** fragment offset is measured in **units of 8 bytes**; the **MF** (more fragments) flag is 1 on all but the last fragment; **DF** means do not fragment. TTL is decremented by each router and the packet is discarded at 0 (which is how **traceroute** works). Note: **IPv6 routers do not fragment** — the source must do path MTU discovery.

## NAT

Maps private addresses to public ones. **Static NAT**, **dynamic NAT**, and **PAT/NAT overload** (many private hosts behind one public IP, distinguished by port). Solves address exhaustion; breaks end-to-end addressing and complicates peer-to-peer.

## ICMP

Error reporting and diagnostics: **echo request/reply (ping)**, destination unreachable, time exceeded (used by **traceroute**), redirect, source quench. ICMP has no ports and is not reliable.

## IPv6

- **128 bits**, written as eight groups of four hex digits; `::` compresses one run of zero groups.
- **No broadcast** — replaced by **multicast and anycast**. No header checksum. Fixed **40-byte header** with **extension headers**.
- Address types: global unicast (2000::/3), link-local (**fe80::/10**), unique local, multicast (ff00::/8), loopback (::1).
- Transition: **dual stack**, **tunnelling** (6to4, Teredo), **NAT64/DNS64**.
- **SLAAC** — stateless address autoconfiguration with **NDP** (which replaces ARP).

---

## Exam pointers

1. **Usable hosts = 2^(host bits) − 2**; /30 gives exactly 2.
2. Memorise the private ranges — **172.16–172.31**, not 172.x generally.
3. **Fragment offset is in 8-byte units.**
4. IPv6 has **no broadcast and no router fragmentation**.
5. Practise five subnetting questions a day for a week; then they are free marks forever.
