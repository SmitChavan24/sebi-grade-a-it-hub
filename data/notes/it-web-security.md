# Web Application Security — OWASP

## OWASP Top 10 themes (know these by name and fix)

| Risk | What it is | Fix |
|---|---|---|
| **Broken access control** | Users acting outside intended permissions; **IDOR** | Deny by default; **server-side** authorisation checks on every object |
| **Cryptographic failures** | Weak or missing encryption, secrets in code | TLS everywhere, strong algorithms, proper key management |
| **Injection (SQLi, command, LDAP)** | Untrusted input interpreted as code | **Parameterised queries**, ORMs, input validation, least-privilege DB accounts |
| **Insecure design** | Missing controls by design | Threat modelling, secure design patterns |
| **Security misconfiguration** | Defaults, verbose errors, open cloud storage | Hardening baselines, automated configuration checks |
| **Vulnerable components** | Outdated libraries | **SCA/dependency scanning, SBOM**, patching |
| **Identification and authentication failures** | Weak passwords, session flaws | MFA, secure session management, lockouts |
| **Software and data integrity failures** | Unsigned updates, insecure CI/CD | Code signing, pipeline hardening, verify dependencies |
| **Security logging and monitoring failures** | No detection | Centralised logging, alerting, tested response |
| **SSRF** | Server coerced into requesting internal resources | Allow-lists, block link-local/metadata addresses, network egress control |

## The attacks you must be able to explain

### SQL injection
```sql
-- vulnerable
"SELECT * FROM users WHERE name = '" + input + "'"
-- input: ' OR '1'='1
```
**Fix: parameterised/prepared statements.** Input escaping and WAFs are secondary. Also limit DB account privileges and avoid dynamic SQL entirely where possible. **Blind SQLi** (boolean and time-based) extracts data without visible output.

### Cross-Site Scripting (XSS)
Injecting script that runs in another user's browser.
- **Stored** — persisted on the server (a comment field) and served to everyone.
- **Reflected** — echoed back from the request (a search term in a URL).
- **DOM-based** — entirely client-side, via unsafe `innerHTML` or URL fragment handling.

**Fixes:** context-aware **output encoding**, **Content-Security-Policy**, `HttpOnly` cookies, safe DOM APIs (`textContent`, not `innerHTML`), framework auto-escaping, input validation.

### Cross-Site Request Forgery (CSRF)
The victim's browser is tricked into sending an authenticated request (transfer funds, change email) to a site where they are logged in.
**Fixes:** **anti-CSRF tokens** (synchroniser pattern), **`SameSite` cookies**, re-authentication for sensitive actions, and checking `Origin`/`Referer`.

**XSS vs CSRF:** XSS exploits the **user's trust in the site**; CSRF exploits the **site's trust in the user's browser**. Memorise that line.

### Others
**Clickjacking** (invisible iframe — fixed by `frame-ancestors`), **session fixation** (regenerate the session ID on login), **directory traversal** (`../../etc/passwd` — canonicalise and allow-list paths), **file upload attacks** (validate type by content, store outside the web root, never execute), **insecure deserialisation**, **XXE** (disable external entities in XML parsers), **open redirect**, **business logic flaws** (negative quantities, price manipulation in the request body — a genuinely relevant class for trading applications).

## Secure development

**Threat modelling** with **STRIDE**: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. **DREAD** for rating. Secure SDLC: requirements → threat model → secure coding standards → **SAST** (static, in the pipeline) → **DAST** (running application) → **IAST/RASP** → penetration test → monitoring.

**Secrets management:** never in source control; use a vault, rotate regularly, scan repositories for leaked keys.

---

## Exam pointers

1. **Parameterised queries** are the SQL injection fix — say it first.
2. **XSS = trust in the site; CSRF = trust in the browser.**
3. **CSP is the strongest XSS mitigation**; `SameSite` is the CSRF one.
4. **STRIDE** for threat modelling — know all six letters.
5. **SAST is static, DAST is dynamic**; both belong in the pipeline.
