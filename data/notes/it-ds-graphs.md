# Graphs

## Representation

| | Adjacency matrix | Adjacency list |
|---|---|---|
| Space | **O(V²)** | **O(V + E)** |
| Edge lookup | **O(1)** | O(degree) |
| Iterate neighbours | O(V) | O(degree) |
| Best for | Dense graphs | **Sparse graphs** (most real graphs) |

Terms: directed/undirected, weighted, **degree** (in-degree/out-degree), path, cycle, connected, **strongly connected** (directed), DAG, tree (connected acyclic, **V − 1 edges**), complete graph (**V(V−1)/2 edges**), bipartite (2-colourable ⇔ no odd cycle).

## Traversals

| | BFS | DFS |
|---|---|---|
| Data structure | **Queue** | **Stack / recursion** |
| Complexity | O(V + E) | O(V + E) |
| Finds | **Shortest path in an unweighted graph** | Cycles, topological order, connectivity, SCC |
| Space | O(V) for the queue | O(V) recursion depth |

**DFS edge types** (directed): tree, **back** (indicates a cycle), forward, cross.

## Core algorithms

| Algorithm | Problem | Complexity | Notes |
|---|---|---|---|
| **Dijkstra** | Single-source shortest path | O((V+E) log V) with a heap | **Greedy**; **no negative weights** |
| **Bellman-Ford** | Single-source shortest path | O(V·E) | **Handles negative weights**; detects negative cycles; DP |
| **Floyd-Warshall** | All-pairs shortest paths | **O(V³)** | DP; simple triple loop; handles negative edges, not negative cycles |
| **Prim** | Minimum spanning tree | O(E log V) | Greedy, grows one tree; good for dense graphs |
| **Kruskal** | Minimum spanning tree | O(E log E) | Greedy on sorted edges + **union-find**; good for sparse graphs |
| **Topological sort** | Ordering of a DAG | O(V + E) | **Kahn's algorithm** (in-degrees + queue) or DFS finish times reversed |
| **Tarjan / Kosaraju** | Strongly connected components | O(V + E) | Kosaraju = two DFS passes with a transposed graph |
| **Union-Find (DSU)** | Connectivity, cycle detection | ~O(α(n)) | With **path compression + union by rank** |

**Floyd-Warshall core:**
```
for k in V:
  for i in V:
    for j in V:
      dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
```
The **k loop must be outermost** — a favourite trick question.

**MST facts:** an MST has **V − 1** edges; it is unique if all edge weights are distinct; the **cut property** (the lightest edge crossing any cut is in some MST) is what makes both greedy algorithms correct.

## Cycle detection

- **Undirected:** DFS finding an already-visited vertex that is not the parent, or union-find.
- **Directed:** DFS with a recursion stack (a **back edge** means a cycle), or Kahn's algorithm — if the topological sort output has fewer than V vertices, there is a cycle.

## Applications worth naming in an answer

Routing (OSPF uses Dijkstra), dependency resolution (topological sort), social and ownership networks, **detecting circular trading and related-party rings in market surveillance**, deadlock detection (wait-for graph), PageRank, network flow (max-flow min-cut, Ford-Fulkerson / Edmonds-Karp).

---

## Exam pointers

1. **Dijkstra fails with negative edges; Bellman-Ford does not.**
2. **BFS gives the shortest path only in unweighted graphs.**
3. Floyd-Warshall is **O(V³)** with **k outermost**.
4. MST has exactly **V − 1** edges; Kruskal needs union-find.
5. A **back edge in DFS means a cycle** — both for directed and (with the parent check) undirected graphs.
