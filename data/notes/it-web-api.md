# APIs, REST, Microservices and Integration

## REST constraints (Fielding)

1. **Client-server** separation
2. **Stateless** — each request carries all context
3. **Cacheable**
4. **Uniform interface** — resources, representations, self-descriptive messages, HATEOAS
5. **Layered system**
6. Code on demand (optional)

**Resource-oriented design:**

```
GET    /api/v1/trades?symbol=INFY&from=2026-01-01   list, filtered
GET    /api/v1/trades/12345                          one
POST   /api/v1/trades                                create
PUT    /api/v1/trades/12345                          replace
PATCH  /api/v1/trades/12345                          partial update
DELETE /api/v1/trades/12345                          remove
```

Nouns not verbs, plural collections, versioning in the path or a header, consistent error bodies, pagination (`limit`/`offset` or cursor), filtering and sorting as query parameters.

## REST vs SOAP vs GraphQL vs gRPC

| | REST | SOAP | GraphQL | gRPC |
|---|---|---|---|---|
| Format | Usually JSON | **XML only** | JSON over a query language | **Protocol Buffers (binary)** |
| Transport | HTTP | HTTP, SMTP, others | HTTP | **HTTP/2** |
| Contract | OpenAPI (optional) | **WSDL (strict)** | Schema | `.proto` |
| Strengths | Simple, cacheable, ubiquitous | Formal contracts, **WS-Security**, ACID via WS-AT | Client fetches exactly what it needs; no over/under-fetching | Fast, streaming, strongly typed |
| Weaknesses | Over/under-fetching | Verbose, heavy | Caching is harder; query cost control needed | Not browser-native without a proxy |

SOAP still appears in banking and older regulatory integrations, which is why it is worth knowing rather than dismissing.

## API security

- **Authentication:** API keys (weak alone), OAuth 2.0 / OIDC, mTLS for server-to-server.
- **Authorisation:** scopes, RBAC/ABAC — and check it on **every** request, per object (**broken object level authorisation** is the top API vulnerability).
- **Transport:** TLS everywhere; certificate pinning for mobile.
- **Input validation and schema enforcement**; reject unknown fields.
- **Rate limiting and quotas** per client; **429** responses with `Retry-After`.
- **Logging and monitoring** of API usage; anomaly detection on access patterns.
- **API gateway** — a single entry point handling authentication, rate limiting, routing, transformation and observability.
- **OWASP API Security Top 10** — know it exists and that **BOLA/IDOR** heads the list.

> For a market context: broker APIs that let clients place orders programmatically need authentication, per-client throttling, **order-rate limits**, and full audit trails — and SEBI has been tightening expectations around API-based and algorithmic access precisely for these reasons.

## Integration patterns

**Synchronous** request-response (simple, coupled, fails together) vs **asynchronous** messaging (decoupled, resilient, eventually consistent). **Webhooks** for server-to-server callbacks — secure them with signatures and replay protection. **File-based batch integration** (still the backbone of much regulatory reporting), **ETL**, and **ESB** in older enterprise architectures.

**Distributed transactions:** two-phase commit is usually impractical across services; use the **saga pattern** (a sequence of local transactions with compensating actions) and **idempotency keys**.

## Documentation and contracts

**OpenAPI/Swagger** for REST, **WSDL** for SOAP, **.proto** for gRPC, **AsyncAPI** for event-driven systems. **Contract testing** (consumer-driven) prevents a provider change from silently breaking consumers — important where regulated entities integrate with exchange and depository APIs.

---

## Exam pointers

1. **REST is stateless**; that is the constraint most often violated in practice.
2. **SOAP uses XML and WSDL**; REST is an architectural style, not a protocol.
3. **GraphQL solves over-fetching**, at the cost of caching and query-cost control.
4. **BOLA/IDOR is the top API vulnerability** — authorise per object, every time.
5. **Sagas with compensating transactions** replace 2PC across services.
