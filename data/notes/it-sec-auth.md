# Authentication, Authorisation and Identity

## Authentication factors

| Factor | Examples |
|---|---|
| **Something you know** | Password, PIN, security question |
| **Something you have** | OTP token, smart card, phone, **FIDO2 security key** |
| **Something you are** | Fingerprint, face, iris, voice — **biometrics** |
| Somewhere you are | Geolocation, IP |
| Something you do | Behavioural biometrics, keystroke dynamics |

**MFA** = two or more **different** factors. A password plus a security question is **not** MFA — both are "something you know". SMS OTP is MFA but the weakest form (SIM swap, SS7 interception); app-based TOTP and **FIDO2/WebAuthn** (phishing-resistant, since the credential is bound to the origin) are stronger.

**Biometric metrics:** **FAR** (false acceptance — a security failure), **FRR** (false rejection — a usability failure), **CER/EER** (the crossover point where FAR = FRR; **lower CER = better system**). Biometrics cannot be revoked, which is why templates must be stored as irreversible representations, never as raw images.

## Password security

Policy: length over complexity, block breached passwords, no forced rotation without cause (current NIST guidance), no password hints, rate limiting and lockout. Storage: **salted, slow KDF** (Argon2/bcrypt/scrypt/PBKDF2). Attacks: brute force, dictionary, **credential stuffing** (reusing leaked pairs), password spraying, rainbow tables, keylogging, shoulder surfing.

## Authorisation models

| Model | Basis |
|---|---|
| **DAC** | Owner decides (file permissions) |
| **MAC** | System-enforced labels (classified/secret) — military, SELinux |
| **RBAC** | **Roles** — the standard in enterprises |
| **ABAC** | Attributes of user, resource, environment (time, location, device posture) |
| **Rule-based** | ACL conditions |

**Principle of least privilege** plus **periodic access review (recertification)** and **privileged access management (PAM)** for admin accounts — including **just-in-time** elevation and session recording.

## Federated identity and SSO

- **SSO** — one authentication, many applications.
- **SAML 2.0** — XML-based; **Identity Provider (IdP)** ↔ **Service Provider (SP)**; common in enterprise web SSO.
- **OAuth 2.0** — an **authorisation** framework (delegated access via tokens), **not** authentication.
- **OpenID Connect (OIDC)** — an **authentication** layer on top of OAuth 2.0, adding the **ID token** (a JWT).
- **JWT** — header.payload.signature, base64url-encoded; signed (JWS) and optionally encrypted (JWE). Validate the signature, issuer, audience and expiry; never accept `alg: none`.
- **Kerberos** — ticket-based, symmetric; **KDC = Authentication Server + Ticket Granting Server**; TGT then service tickets; requires **synchronised clocks** (typically within 5 minutes) and is the basis of Active Directory authentication.
- **LDAP / Active Directory** — directory services; **LDAPS** for encryption.

> **OAuth vs OIDC is a favourite interview question:** OAuth answers "may this app access that resource on my behalf"; OIDC answers "who is this user".

## Indian identity infrastructure

**Aadhaar-based e-KYC and e-Sign**, **DigiLocker**, **CKYC**, and in the securities market the **KRA (KYC Registration Agency)** system. Relevant constraints: the Supreme Court's Aadhaar judgment restricting mandatory use, **Aadhaar Vault** requirements for storing numbers, **virtual IDs**, and the DPDP Act's consent obligations.

---

## Exam pointers

1. **MFA needs different factor types**, not two of the same.
2. **Lower CER means a better biometric system.**
3. **OAuth = authorisation; OIDC = authentication.**
4. Kerberos needs **clock synchronisation** and uses a **TGT**.
5. RBAC is roles; ABAC is attributes; MAC is system-enforced labels.
