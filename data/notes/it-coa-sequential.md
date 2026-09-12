# Sequential Circuits

Output depends on **current inputs and stored state**. Requires memory and (usually) a clock.

## Latches vs flip-flops

- **Latch** — **level triggered**; transparent while the enable is active.
- **Flip-flop** — **edge triggered**; changes state only on a clock edge. This is what makes synchronous design possible.

## Flip-flop types

| Type | Characteristic equation | Behaviour |
|---|---|---|
| **SR** | Q(next) = S + R'Q | **S = R = 1 is forbidden** |
| **D** | **Q(next) = D** | Data/delay; the workhorse of real design |
| **JK** | Q(next) = JQ' + K'Q | Like SR but **J = K = 1 toggles** |
| **T** | Q(next) = T ⊕ Q | Toggle when T = 1 |

**Excitation tables** (what inputs are needed for a given transition) are the tool for designing counters — learn to derive them rather than memorise them.

**Timing:** **setup time** (data stable before the edge), **hold time** (stable after the edge), **propagation delay**. A violation causes **metastability**, resolved in practice by **synchroniser chains** (two flip-flops in series) when crossing clock domains.

## Registers

- **Parallel-in parallel-out (PIPO)**, **SISO**, **SIPO**, **PISO**.
- **Shift register** — shifts data one position per clock; used for serial-parallel conversion, delay lines and **LFSRs** (pseudorandom sequence generation, CRC).
- **Universal shift register** — load, shift left, shift right, hold.

## Counters

| Type | Nature |
|---|---|
| **Asynchronous (ripple)** | Each flip-flop clocked by the previous output. Simple; **cumulative delay**, glitches |
| **Synchronous** | All flip-flops share one clock. Faster, cleaner; more combinational logic |
| **Mod-N** | Counts 0 to N−1; needs **⌈log₂ N⌉ flip-flops** |
| Up/down, ring, **Johnson (twisted ring)** | Ring counter: n states with n flip-flops; Johnson: **2n states** with n flip-flops |

**n flip-flops give 2ⁿ states** — the most common one-mark question here.

## State machines

- **Moore machine** — output depends **only on the state**; output changes are synchronous with state transitions, hence glitch-free.
- **Mealy machine** — output depends on **state and input**; reacts one cycle earlier and usually needs **fewer states**, but can glitch.

**Design procedure:** state diagram → state table → state assignment → **state minimisation** (merge equivalent states) → choose flip-flops → excitation table → K-map for each flip-flop input and output → circuit.

---

## Exam pointers

1. **Latch = level triggered, flip-flop = edge triggered.**
2. **SR: S=R=1 forbidden; JK: J=K=1 toggles.**
3. **Mod-N counter needs ⌈log₂N⌉ flip-flops**; n flip-flops give 2ⁿ states.
4. **Johnson counter gives 2n states with n flip-flops**; ring counter gives n.
5. **Moore = output from state only; Mealy = state + input**, fewer states.
