# Application Layer Protocols

## DNS

Hierarchical, distributed name-to-address database. Runs on **UDP port 53** (TCP for zone transfers and large responses).

**Hierarchy:** root (13 logical root server clusters, anycast) → **TLD** (.com, .in) → authoritative → local resolver.

**Resolution:** **recursive** (the resolver does the work and returns the final answer) vs **iterative** (each server returns a referral).

**Record types:** **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (mail), **NS** (name server), **PTR** (reverse), **SOA**, **TXT** (SPF, DKIM, domain verification), **SRV**.

**Caching** with **TTL**. **DNSSEC** signs records to prevent **DNS spoofing / cache poisoning**. **DoH/DoT** encrypt DNS queries.

## HTTP

Stateless request-response over TCP 80 (HTTPS 443).

**Methods:** **GET** (safe, idempotent), **POST** (not idempotent), **PUT** (idempotent, replaces), **PATCH**, **DELETE** (idempotent), HEAD, OPTIONS.

**Status codes:**

| Range | Meaning | Examples |
|---|---|---|
| 1xx | Informational | 101 Switching Protocols |
| 2xx | Success | **200 OK**, 201 Created, 204 No Content |
| 3xx | Redirection | **301 Moved Permanently**, 302 Found, 304 Not Modified |
| 4xx | **Client error** | 400 Bad Request, **401 Unauthorized**, **403 Forbidden**, **404 Not Found**, 405, 409, **429 Too Many Requests** |
| 5xx | **Server error** | **500 Internal Server Error**, 502 Bad Gateway, **503 Service Unavailable**, 504 Gateway Timeout |

**401 vs 403:** 401 means *not authenticated*; 403 means *authenticated but not allowed*. Asked constantly.

**Versions:** HTTP/1.1 (persistent connections, pipelining), **HTTP/2** (binary framing, multiplexing over one connection, header compression, server push), **HTTP/3** (over **QUIC/UDP**, eliminates head-of-line blocking).

**State:** cookies, sessions, tokens; **CORS** for cross-origin requests.

## Email

- **SMTP (25, 587)** — sending; push protocol.
- **POP3 (110)** — downloads and usually deletes from the server; single device.
- **IMAP (143)** — keeps mail on the server, syncs folders across devices.
- **MIME** — allows non-ASCII content and attachments.
- Anti-spoofing: **SPF, DKIM, DMARC** — worth knowing, since email spoofing is the delivery mechanism for most financial fraud.

## File transfer and remote access

- **FTP** — control on **21**, data on **20**; active vs passive mode; plaintext. **FTPS** (TLS) and **SFTP** (over SSH, port 22) are the secure options.
- **TFTP** — UDP 69, no authentication, used for device boot images.
- **SSH (22)** — encrypted remote shell, key-based authentication, tunnelling/port forwarding. **Telnet (23)** is its insecure predecessor and should never be used.

## Other

- **DHCP** — **DORA**: Discover, Offer, Request, Acknowledge. Ports 67 (server) / 68 (client). Provides IP, mask, gateway, DNS, lease time.
- **SNMP** — 161/162; manager, agent, **MIB**, OID; v3 adds authentication and encryption. The backbone of network monitoring.
- **NTP** — port 123; time synchronisation. **Clock synchronisation is a regulatory requirement in trading systems** — exchanges and brokers must sync to a common reference so that order timestamps and audit trails are comparable.
- **WebSocket** — full-duplex over one TCP connection after an HTTP upgrade; how live price tickers work in a browser.

---

## Exam pointers

1. **DNS = UDP 53**, TCP for zone transfer. **DORA** for DHCP.
2. **401 = not authenticated, 403 = forbidden.**
3. **POP3 downloads, IMAP synchronises.**
4. HTTP/3 runs over **QUIC, which runs over UDP**.
5. NTP and time-stamping matter in market systems — a good IT-stream talking point.
