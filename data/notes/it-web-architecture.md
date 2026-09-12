# Web and System Architecture

## Tiers

| Architecture | Layers |
|---|---|
| **1-tier** | Everything on one machine |
| **2-tier** | Client ↔ database |
| **3-tier** | **Presentation ↔ Application/Business logic ↔ Data** |
| **N-tier** | Adds caching, messaging, integration layers |

The 3-tier split exists so that each layer can be **scaled, secured and changed independently** — the data tier never faces the internet, the presentation tier holds no business rules.

## Servers

- **Web server** (Nginx, Apache) — serves static content, terminates TLS, reverse proxies.
- **Application server** (Tomcat, JBoss, Gunicorn) — executes business logic.
- **Database server** — persistence.
- **Reverse proxy / load balancer** in front; **CDN** at the edge.

## Scaling

| | Vertical (scale up) | Horizontal (scale out) |
|---|---|---|
| Method | Bigger machine | More machines |
| Limit | Hardware ceiling | Practically unbounded |
| Complexity | Low | Needs statelessness, load balancing, distributed state |
| Failure | Single point | Redundant |

**Stateless application servers** are the precondition for horizontal scaling — session state moves to a shared store (Redis) or a signed token (JWT).

**Load balancing algorithms:** round robin, weighted round robin, least connections, IP hash (**sticky sessions**), least response time. **L4** (transport, fast) vs **L7** (application-aware routing, TLS termination, header-based rules).

## Caching

Layers: browser cache → CDN → reverse proxy → application cache (Redis/Memcached) → database query cache.

**Strategies:** cache-aside (lazy loading), read-through, write-through, write-behind. **Eviction:** LRU, LFU, TTL. **Cache invalidation** is genuinely one of the hard problems — stale prices in a market application are worse than slow ones, which is why financial UIs often push rather than cache.

**Cache stampede** — many requests miss simultaneously and hammer the origin; mitigated by request coalescing and jittered TTLs.

## Asynchronous processing

**Message queues** (RabbitMQ, SQS) and **event streams** (Kafka) decouple producers from consumers, absorb spikes, and allow retries. Patterns: work queue, publish-subscribe, dead-letter queue, **idempotent consumers** (because at-least-once delivery means duplicates will happen).

**Delivery guarantees:** at-most-once, **at-least-once** (the usual practical choice), exactly-once (hard, and usually achieved as at-least-once plus idempotency).

## Reliability patterns

**Timeout**, **retry with exponential backoff and jitter**, **circuit breaker** (stop calling a failing dependency and fail fast), **bulkhead** (isolate resource pools), **rate limiting**, **graceful degradation**, **idempotency keys**.

These matter in trading and payment systems specifically: a blind retry of an order submission without an idempotency key can place the order twice. That is a concrete, memorable example to use in an answer.

## Observability

**Logs** (discrete events), **metrics** (aggregated numbers, time series), **traces** (a request's path across services). Correlation IDs to stitch a request together across components. Alerting on **symptoms users feel** (error rate, latency) rather than on every internal anomaly.

---

## Exam pointers

1. **3-tier = presentation, application, data** — and why each is separated.
2. Horizontal scaling requires **stateless** application servers.
3. **L4 vs L7 load balancing** — transport vs application aware.
4. **Circuit breaker, retry with backoff, idempotency** — name these three in any resilience answer.
5. **At-least-once delivery + idempotent consumers** is the practical messaging design.
