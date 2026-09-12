# Cryptography

## Classification

```
Cryptography
├── Symmetric  (one shared key)   : DES, 3DES, AES, RC4, ChaCha20, Blowfish
├── Asymmetric (key pair)         : RSA, ECC, Diffie-Hellman, ElGamal, DSA
└── Hashing    (one way, no key)  : MD5, SHA-1, SHA-2, SHA-3, bcrypt/scrypt/Argon2
```

| | Symmetric | Asymmetric |
|---|---|---|
| Keys | One shared secret | Public + private |
| Speed | **Fast** | Slow (100–1000×) |
| Key distribution | **The hard problem** | Solved by publishing the public key |
| Number of keys for n users | **n(n−1)/2** | **2n** |
| Provides | Confidentiality | Confidentiality, authentication, **non-repudiation** |
| Use | Bulk data | Key exchange, signatures |

**Hybrid cryptosystem** — the real-world answer: use asymmetric crypto to exchange a symmetric **session key**, then encrypt the data symmetrically. This is exactly what TLS does.

## Symmetric algorithms

| Algorithm | Block | Key | Status |
|---|---|---|---|
| **DES** | 64 bits | **56 bits** effective | **Broken** — brute-forceable |
| **3DES** | 64 bits | 112/168 bits | Deprecated |
| **AES** | **128 bits** | **128 / 192 / 256** bits | **Current standard** (Rijndael); rounds: 10 / 12 / 14 |
| RC4 | Stream | Variable | Broken, removed from TLS |
| ChaCha20 | Stream | 256 bits | Modern, fast in software |

**Block cipher modes:**

| Mode | Property |
|---|---|
| **ECB** | Each block encrypted independently — **identical plaintext blocks give identical ciphertext**. Never use it; the "ECB penguin" is the standard illustration |
| **CBC** | Chained with an **IV**; needs padding; vulnerable to padding-oracle attacks if done carelessly |
| **CTR** | Turns a block cipher into a stream cipher; parallelisable |
| **GCM** | CTR + authentication tag → **AEAD**: confidentiality *and* integrity. The modern default |

**Confusion** (relationship between key and ciphertext obscured) and **diffusion** (one plaintext bit affects many ciphertext bits) — Shannon's two design goals. AES uses substitution (S-box) for confusion and permutation/mixing for diffusion; DES uses a **Feistel structure**.

## Asymmetric algorithms

- **RSA** — based on the difficulty of **factoring large integers**. Key generation: choose primes p, q; n = pq; φ(n) = (p−1)(q−1); choose e coprime to φ(n); d = e⁻¹ mod φ(n). Encrypt: c = mᵉ mod n. Decrypt: m = cᵈ mod n. Typical key size **2048 or 3072 bits**.
- **Diffie-Hellman** — key *exchange*, not encryption; based on the **discrete logarithm** problem; vulnerable to **man-in-the-middle without authentication**. **DHE/ECDHE** provide **forward secrecy**.
- **ECC** — elliptic curve discrete log; **much smaller keys for equivalent strength** (256-bit ECC ≈ 3072-bit RSA), which is why it dominates mobile and TLS.
- **DSA / ECDSA / EdDSA** — signature algorithms.

## Key management

Generation, distribution, storage, rotation, revocation, destruction. **HSM** (Hardware Security Module) — tamper-resistant hardware that generates and stores keys and performs crypto operations without exporting the key. **KMS** in cloud. **Key escrow**, **split knowledge / dual control**, **forward secrecy**.

## Attacks on cryptography

Brute force, **known-plaintext, chosen-plaintext, chosen-ciphertext**, birthday attack (on hashes), **side-channel** (timing, power, cache, acoustic), replay, **man-in-the-middle**, downgrade attacks, padding oracle, rainbow tables (defeated by **salting**).

## Post-quantum

**Shor's algorithm** would break RSA, DH and ECC on a sufficiently large quantum computer; **Grover's algorithm** halves effective symmetric key strength (so AES-256 remains adequate). NIST has standardised post-quantum algorithms — **ML-KEM (Kyber)** for key encapsulation and **ML-DSA (Dilithium)** / SLH-DSA (SPHINCS+) for signatures. **"Harvest now, decrypt later"** is why financial institutions are being asked to plan **crypto-agility** today.

---

## Exam pointers

1. **Symmetric n(n−1)/2 keys; asymmetric 2n.**
2. **AES block size is always 128 bits**, regardless of key length.
3. **Never ECB.** GCM gives confidentiality plus integrity.
4. RSA = factoring; DH/ECC = discrete log; **Shor breaks all three**.
5. TLS uses a **hybrid** scheme — asymmetric for key exchange, symmetric for data.
