# Transport Layer — TCP and UDP

## TCP vs UDP

| | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (**3-way handshake**) | Connectionless |
| Reliability | Acknowledged, retransmitted, ordered | **Best effort**, no ordering |
| Header size | **20 bytes** minimum | **8 bytes** |
| Flow control | Yes (sliding window) | No |
| Congestion control | Yes | No |
| Speed / overhead | Slower, heavier | Faster, lighter |
| Uses | HTTP, FTP, SMTP, SSH, **trading order entry** | DNS, DHCP, TFTP, SNMP, VoIP, video streaming, **market data multicast** |

> In markets, **order entry is TCP** (you cannot lose an order) while **market data feeds are frequently UDP multicast** (stale prices are worse than missing ones, and one sender must reach thousands of subscribers). This contrast is an excellent interview answer.

## TCP header fields to know

Source port · Destination port · **Sequence number** · **Acknowledgement number** · Data offset · Flags (**URG, ACK, PSH, RST, SYN, FIN**) · **Window size** · Checksum · Urgent pointer · Options (MSS, window scaling, SACK, timestamps).

## Three-way handshake

```
Client -> SYN (seq = x)                 -> Server
Client <- SYN-ACK (seq = y, ack = x+1)  <- Server
Client -> ACK (seq = x+1, ack = y+1)    -> Server
```

**Connection termination is four-way** (FIN, ACK, FIN, ACK) because each direction closes independently — **half-close** is legal. The closing side then waits in **TIME_WAIT** for 2×MSL.

**SYN flood** attacks exploit the half-open state; **SYN cookies** are the defence.

## Flow control

**Sliding window**, advertised by the receiver in the **window size** field. Problems and fixes:
- **Silly window syndrome** — tiny segments; fixed by **Nagle's algorithm** (sender side) and **Clark's solution / delayed ACK** (receiver side).
- **Zero window probe** keeps the connection from deadlocking when the advertised window is 0.

## Congestion control

**Congestion window (cwnd)**; the sender is limited by **min(cwnd, receiver window)**.

1. **Slow start** — cwnd starts at 1 MSS and **doubles every RTT** (exponential) until it reaches **ssthresh**.
2. **Congestion avoidance** — cwnd increases by **1 MSS per RTT** (linear, additive increase).
3. **Congestion detection:**
   - **Timeout** (severe): ssthresh = cwnd/2, **cwnd = 1**, back to slow start. (**TCP Tahoe**)
   - **Three duplicate ACKs** (mild): **fast retransmit** the missing segment, then **fast recovery** — ssthresh = cwnd/2 and cwnd = ssthresh, continue in congestion avoidance. (**TCP Reno**)

This is **AIMD** — additive increase, multiplicative decrease — and it is what keeps the Internet stable.

Variants: NewReno, **CUBIC** (Linux default), **BBR** (models bandwidth and RTT rather than reacting to loss).

**Retransmission timeout** uses a smoothed RTT estimate: **EstimatedRTT = (1−α)·EstimatedRTT + α·SampleRTT** (α typically 0.125), with a deviation term; **Karn's algorithm** says do not use retransmitted segments for RTT samples.

## Ports

Well-known **0–1023**, registered **1024–49151**, dynamic/ephemeral **49152–65535**.

| Port | Service |
|---|---|
| 20/21 | FTP data / control |
| 22 | SSH, SCP, SFTP |
| 23 | Telnet |
| 25 | SMTP |
| 53 | DNS (UDP, TCP for zone transfer and large responses) |
| 67/68 | DHCP server / client |
| 69 | TFTP |
| 80 | HTTP |
| 110 | POP3 |
| 143 | IMAP |
| 161/162 | SNMP / SNMP trap |
| 179 | BGP |
| 389 / 636 | LDAP / LDAPS |
| 443 | HTTPS |
| 445 | SMB |
| 3306 | MySQL |
| 3389 | RDP |
| 5432 | PostgreSQL |

A **socket** = IP address + port. A TCP connection is identified by the **4-tuple** (source IP, source port, destination IP, destination port).

---

## Exam pointers

1. TCP header **20 bytes**, UDP **8 bytes**.
2. Handshake is **3-way**, termination is **4-way**.
3. **Three duplicate ACKs → fast retransmit**; timeout → back to slow start.
4. Slow start is **exponential**, congestion avoidance is **linear**.
5. Memorise the port table — it is free marks, and it comes up in security questions too.
