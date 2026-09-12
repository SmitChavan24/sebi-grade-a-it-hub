# Blockchain and Distributed Ledger Technology

## What it is

A **distributed, append-only ledger** replicated across nodes, where blocks are chained by **cryptographic hashes** and agreement is reached by a **consensus mechanism** rather than a central operator.

**Block structure:** previous block hash, timestamp, nonce, **Merkle root** of the transactions, plus the transaction list. Changing any transaction changes the Merkle root, which changes the block hash, which breaks every subsequent block — that is where immutability comes from.

**Merkle tree** — a binary tree of hashes allowing **O(log n)** proof that a transaction is included without downloading the whole block (**SPV proofs**).

## Consensus mechanisms

| Mechanism | Basis | Trade-off |
|---|---|---|
| **PoW** | Computational work | Secure, **energy intensive**, slow |
| **PoS** | Staked value | Efficient; concerns about wealth concentration |
| **DPoS** | Delegated voting | Fast, more centralised |
| **PBFT / RAFT** | Voting among known nodes | Fast and final; needs **known participants** — hence the choice for permissioned ledgers |
| **PoA** | Trusted validators | Enterprise and consortium chains |

**Byzantine Fault Tolerance:** a system tolerating up to **f faulty nodes out of 3f+1** total. **Finality** — probabilistic in PoW, deterministic in BFT systems. For settlement in financial markets, **deterministic finality matters more than throughput**.

## Public vs permissioned

| | Public (Bitcoin, Ethereum) | Permissioned (Hyperledger Fabric, Corda, Quorum) |
|---|---|---|
| Access | Anyone | Known, vetted participants |
| Consensus | PoW/PoS | BFT/RAFT |
| Throughput | Low | High |
| Privacy | Pseudonymous, public | Configurable, private channels |
| Fit for regulated markets | Poor | **Good** |

**For securities markets, the realistic technology is permissioned DLT**, not a public chain. Say that explicitly — it shows you can tell hype from architecture.

## Smart contracts

Code deployed on-chain that executes deterministically when conditions are met. Enables **atomic DvP**: the securities leg and the funds leg either both complete or neither does, removing principal risk.

Risks: bugs are **immutable** once deployed (the standard cautionary tale is a large DAO exploit leading to a chain fork), **oracle risk** (on-chain code depends on off-chain data), gas/cost models, and the legal question of whether code alone constitutes a contract.

## Applications in securities markets

- **Settlement and clearing** — atomic DvP, shorter cycles, reduced reconciliation. This is the strongest genuine use case.
- **Tokenised securities** — fractional ownership, programmable corporate actions.
- **Security and Covenant Monitoring** — SEBI has explored DLT for **monitoring security and covenants of corporate bonds**, shared between issuers, debenture trustees, credit rating agencies and depositories. A concrete, quotable Indian example.
- **KYC sharing** with consent and auditability.
- **Corporate actions** automation.
- **Proxy voting** and shareholder records.

## What blockchain does *not* solve

Garbage in is still garbage in — immutability preserves errors as faithfully as truth. It does not remove the need for identity, legal enforceability, or governance. For a single trusted operator with a well-run database, a ledger is usually a worse engineering choice. The honest framing: DLT is valuable where **multiple mutually distrusting parties must share one authoritative record without a central operator** — which is a narrower set of problems than the hype suggests, but includes several real ones in post-trade infrastructure.

## Crypto assets in India

Not legal tender; taxed (a flat rate on gains plus TDS on transfers since 2022); **VASPs are reporting entities under PMLA**, with CERT-In record-keeping obligations. **CBDC (e-Rupee)** is the central bank's own digital currency and is entirely distinct from private crypto assets — do not conflate them in an answer.

---

## Exam pointers

1. **Merkle root** is what makes tampering detectable and SPV proofs possible.
2. **BFT tolerates f faults in 3f+1 nodes**; finality is deterministic in BFT, probabilistic in PoW.
3. **Permissioned DLT** is the realistic choice for regulated markets.
4. **Atomic DvP** is the strongest financial use case.
5. Know SEBI's **DLT for bond security and covenant monitoring** as a concrete Indian example.
