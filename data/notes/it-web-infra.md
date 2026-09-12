# Containers, Orchestration and Delivery Infrastructure

## Containers

A container packages an application with its dependencies, sharing the host kernel through **namespaces** (isolation of PID, network, mount, user) and **cgroups** (resource limits).

**Docker concepts:** `Dockerfile` → **image** (layered, immutable) → **container** (a running instance) → **registry** (Docker Hub, ECR, private). Layer caching, multi-stage builds (compile in one stage, copy only the artefact into a minimal runtime image), `.dockerignore`, volumes for persistence, bridge/host/overlay networking.

**Container security:** run as a **non-root user**, minimal base images (distroless/alpine), scan images for CVEs, sign images, read-only root filesystem, drop Linux capabilities, never bake secrets into images, and remember that **a container is not a security boundary as strong as a VM**.

## Kubernetes

| Object | Purpose |
|---|---|
| **Pod** | Smallest deployable unit; one or more containers sharing network and storage |
| **ReplicaSet** | Maintains a desired number of pod replicas |
| **Deployment** | Declarative updates and **rolling deployments/rollbacks** |
| **Service** | Stable virtual IP and DNS name for a set of pods (ClusterIP, NodePort, LoadBalancer) |
| **Ingress** | HTTP routing into the cluster |
| **ConfigMap / Secret** | Configuration and sensitive values |
| **StatefulSet** | Stable identities and storage for stateful workloads |
| **DaemonSet** | One pod per node (log shippers, agents) |
| **Job / CronJob** | Batch and scheduled work |
| **Namespace** | Logical partitioning |
| **PV / PVC** | Persistent storage |

**Control plane:** API server, **etcd** (the cluster's state store — back it up, secure it, it is the crown jewel), scheduler, controller manager. **Node components:** kubelet, kube-proxy, container runtime.

**Kubernetes security:** RBAC, network policies (default-deny between namespaces), pod security standards, admission controllers (OPA/Gatekeeper), secrets encryption at rest, image provenance.

## Delivery infrastructure

- **Load balancers and reverse proxies** — Nginx, HAProxy, cloud LBs.
- **CDN** — caches static assets at the edge; also absorbs DDoS.
- **Service mesh** (Istio, Linkerd) — sidecar proxies providing **mTLS between services**, traffic shaping, retries and observability without changing application code.
- **API gateway** — authentication, rate limiting, routing at the edge of the service estate.
- **Message brokers** — Kafka, RabbitMQ for asynchronous decoupling.

## Deployment patterns

**Blue-green** (two full environments, instant switch and rollback), **canary** (a small share of traffic first, monitored), **rolling** (replace instances gradually), **feature flags** (deploy dark, release later). Each has a different rollback story — which is the criterion that matters in a regulated environment where a bad release during market hours is a reportable event.

---

## Exam pointers

1. Containers isolate with **namespaces + cgroups**, sharing the **host kernel**.
2. **Pod is the smallest deployable unit** in Kubernetes; Deployment manages ReplicaSets.
3. **etcd holds cluster state** — securing and backing it up is essential.
4. **Service mesh gives mTLS and observability** without code changes.
5. **Blue-green switches instantly; canary exposes a small percentage first.**
