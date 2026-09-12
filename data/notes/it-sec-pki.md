# Hashing, Digital Signatures and PKI

## Cryptographic hash functions

A one-way function producing a fixed-size digest. Required properties:

1. **Deterministic** and fast.
2. **Pre-image resistance** — given h(x), you cannot find x.
3. **Second pre-image resistance** — given x, you cannot find y ≠ x with h(x) = h(y).
4. **Collision resistance** — you cannot find any pair x, y with the same hash.
5. **Avalanche effect** — one input bit change flips about half the output bits.

| Algorithm | Digest | Status |
|---|---|---|
| MD5 | 128 bits | **Broken** (collisions trivial) |
| SHA-1 | 160 bits | **Broken** (SHAttered, 2017) |
| **SHA-256 / SHA-512** | 256 / 512 bits | **Current standard** |
| SHA-3 (Keccak) | Variable | Different internal design (sponge) |
| **bcrypt, scrypt, Argon2, PBKDF2** | — | **Deliberately slow** — for passwords |

**Birthday attack:** a collision is expected after about **2^(n/2)** hashes, which is why a 128-bit digest gives only 64 bits of collision resistance.

**Never store passwords as a plain hash.** Store `slow_kdf(password + unique salt)` — a **salt** defeats rainbow tables; a **pepper** (a secret stored separately) adds another layer; **work factor** must be tuned upward over time.

## MAC and HMAC

A **MAC** proves integrity **and** authenticity using a shared secret key. **HMAC** = H((K ⊕ opad) || H((K ⊕ ipad) || message)) — a construction that is secure even with hash functions that have length-extension weaknesses.

**MAC vs digital signature:** a MAC uses a **shared** key, so either party could have produced it → **no non-repudiation**. A signature uses the sender's **private** key → non-repudiation.

## Digital signatures

```
Signing:      hash the message -> encrypt the hash with the SENDER'S PRIVATE key -> signature
Verification: decrypt the signature with the SENDER'S PUBLIC key -> compare to a fresh hash
```

This provides **integrity, authentication and non-repudiation** — but **not confidentiality**. To get confidentiality as well, encrypt the message with the **recipient's public key** (in practice, with a symmetric session key that is itself encrypted to the recipient).

> **Remember the direction:** encrypt for privacy with the *recipient's public* key; sign for authenticity with the *sender's private* key. Nearly every exam question here tests that one sentence.

**Indian legal context:** the **IT Act, 2000** gives legal recognition to **digital signatures** (and, after the 2008 amendment, **electronic signatures**). **Certifying Authorities** are licensed by the **Controller of Certifying Authorities (CCA)** under the Act. DSCs are used for filings with MCA, income tax and SEBI systems.

## PKI — Public Key Infrastructure

Components:
- **CA (Certifying Authority)** — issues and signs certificates.
- **RA (Registration Authority)** — verifies identity before issuance.
- **Digital certificate (X.509)** — binds a public key to an identity. Fields: version, serial number, signature algorithm, **issuer**, **validity period**, **subject**, subject public key, extensions (SAN, key usage), **CA's signature**.
- **CRL** (certificate revocation list) and **OCSP** (online status check; **OCSP stapling** improves privacy and performance).
- **Root CA → intermediate CA → end-entity certificate** = the **chain of trust**, with the root in the client's **trust store**.

**Certificate types:** DV, OV, **EV**, wildcard, SAN, code-signing, client certificates. **Self-signed** certificates are fine internally, never for public services.

## TLS handshake (simplified, TLS 1.2)

```
Client Hello (versions, cipher suites, random)
Server Hello (chosen suite, random) + Certificate [+ Server Key Exchange]
Client verifies the certificate chain and validity
Key exchange (ECDHE) -> both derive the same pre-master -> master secret -> session keys
Change Cipher Spec + Finished (both sides)
Encrypted application data
```

**TLS 1.3** removes obsolete algorithms (RSA key transport, static DH, RC4, MD5), mandates **forward secrecy**, and completes the handshake in **1-RTT** (0-RTT for resumption, with replay caveats).

---

## Exam pointers

1. **Sign with the private key, verify with the public key.**
2. **MAC gives no non-repudiation**; a digital signature does.
3. Birthday attack → collisions at about **2^(n/2)**.
4. Passwords need **salt + a deliberately slow KDF**, never plain SHA-256.
5. In India, DSCs are issued by CAs licensed by the **CCA** under the **IT Act, 2000**.
