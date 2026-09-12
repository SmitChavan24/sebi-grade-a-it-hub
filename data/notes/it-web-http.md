# HTTP, Sessions and Web Protocols

## Request and response

**Request:** method, path, HTTP version, headers, optional body.
**Response:** status line, headers, body.

**Common headers:** `Host`, `User-Agent`, `Accept`, `Content-Type`, `Content-Length`, `Authorization`, `Cookie`/`Set-Cookie`, `Cache-Control`, `ETag`, `Origin`, `Referer`, and the security headers below.

## Methods and properties

| Method | Safe | Idempotent | Body |
|---|---|---|---|
| GET | Yes | Yes | No |
| HEAD | Yes | Yes | No |
| **POST** | **No** | **No** | Yes |
| PUT | No | **Yes** | Yes |
| PATCH | No | **No** | Yes |
| DELETE | No | **Yes** | No |
| OPTIONS | Yes | Yes | No |

**Safe** = no server state change. **Idempotent** = repeating it has the same effect as doing it once. POST is neither, which is exactly why double-submitting a form can create two orders.

## Status codes

**1xx** informational · **2xx** success (200 OK, 201 Created, 204 No Content) · **3xx** redirection (301 permanent, 302 found, **304 Not Modified**) · **4xx** client error (400, **401 unauthenticated**, **403 forbidden**, 404, 409 conflict, **429 too many requests**) · **5xx** server error (500, 502, 503, 504).

## State management

HTTP is **stateless**. State is added by:

- **Cookies** — `Set-Cookie` with attributes: **`HttpOnly`** (not readable by JavaScript — blunts XSS theft), **`Secure`** (HTTPS only), **`SameSite`** (Strict/Lax/None — the main CSRF defence), `Domain`, `Path`, `Expires`/`Max-Age`.
- **Server-side sessions** — a session ID in a cookie, data on the server (or in Redis for horizontal scaling).
- **Tokens (JWT)** — stateless, self-contained; easy to scale, harder to revoke. Store carefully; a JWT in `localStorage` is readable by any injected script.
- **Hidden form fields, URL parameters** — legacy and leaky.

## Security headers

| Header | Effect |
|---|---|
| **HSTS** (`Strict-Transport-Security`) | Force HTTPS for a period |
| **CSP** (`Content-Security-Policy`) | Restrict which sources may load scripts, styles and frames — the strongest XSS mitigation |
| `X-Content-Type-Options: nosniff` | Stop MIME sniffing |
| `X-Frame-Options` / CSP `frame-ancestors` | Prevent **clickjacking** |
| `Referrer-Policy` | Limit referrer leakage |
| `Permissions-Policy` | Restrict browser features |

## CORS

The **same-origin policy** blocks cross-origin reads by default. **CORS** relaxes it explicitly: the server sends `Access-Control-Allow-Origin` and related headers; non-simple requests are preceded by an **OPTIONS preflight**. CORS is a **browser-enforced relaxation**, not a server security control — a common misunderstanding worth stating correctly.

## HTTP versions

- **HTTP/1.1** — persistent connections, pipelining (rarely used), head-of-line blocking.
- **HTTP/2** — binary framing, **multiplexing** many streams over one TCP connection, header compression (HPACK), server push. Still suffers TCP-level head-of-line blocking.
- **HTTP/3** — over **QUIC (UDP)**, independent streams, faster connection setup, better on lossy mobile networks.

## WebSocket

Full-duplex over a single TCP connection, established via an HTTP **Upgrade** handshake (`ws://`, `wss://`). The right choice for **live price tickers, order updates and dashboards** — the alternatives being long polling and Server-Sent Events (one-way, simpler, auto-reconnecting).

---

## Exam pointers

1. **PUT and DELETE are idempotent; POST and PATCH are not.**
2. **401 = not authenticated, 403 = authenticated but forbidden.**
3. **HttpOnly** blunts XSS cookie theft; **SameSite** is the CSRF defence.
4. **CORS is browser-enforced**, and relaxes the same-origin policy rather than tightening security.
5. **HTTP/3 runs on QUIC over UDP.**
