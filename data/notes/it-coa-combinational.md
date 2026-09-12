# Combinational Circuits

Output depends **only on the current inputs** — no memory, no clock.

## Adders

- **Half adder:** Sum = A ⊕ B; Carry = A·B. Two inputs, no carry-in.
- **Full adder:** Sum = A ⊕ B ⊕ Cin; Carry = AB + Cin(A ⊕ B). Built from **two half adders and an OR gate**.
- **Ripple carry adder:** n full adders chained; simple but **slow — delay grows linearly with n**, because each stage waits for the previous carry.
- **Carry look-ahead adder:** computes carries in parallel using **generate G = A·B** and **propagate P = A ⊕ B**, with C(i+1) = G(i) + P(i)·C(i). Delay becomes roughly **O(log n)** at the cost of more gates — the classic speed-versus-area trade-off.
- **Subtractor** — use a full adder with B inverted and Cin = 1 (2's complement).

## Multiplexer (MUX)

**2ⁿ data inputs, n select lines, 1 output.** "Data selector."

- A **2ⁿ-to-1 MUX** can implement **any Boolean function of n variables** directly (connect minterms to inputs), and any function of **n+1** variables using one extra inverter.
- Building bigger from smaller: a 4:1 MUX needs **three 2:1 MUXes**; an 8:1 needs **seven 2:1**. In general a 2ⁿ:1 MUX needs **2ⁿ − 1** 2:1 MUXes.

**Demultiplexer (DEMUX)** — one input, n select lines, 2ⁿ outputs. The inverse of a MUX.

## Decoder and encoder

- **Decoder:** n inputs → **2ⁿ outputs**, exactly one active. An n:2ⁿ decoder plus OR gates implements any SOP function (each output is a minterm). Used for memory address decoding.
- **Encoder:** 2ⁿ inputs → n outputs. A plain encoder fails if two inputs are active; a **priority encoder** resolves this by encoding the highest-priority active input — which is how interrupt controllers work.

## Comparator

Compares two n-bit numbers producing A > B, A = B, A < B. Equality uses **XNOR** on each bit position, ANDed together.

## Code converters and parity

Binary↔Gray, binary↔BCD, seven-segment decoder. **Parity generator/checker** built from XOR trees: the XOR of all bits gives odd/even parity.

## Timing concerns

**Propagation delay** limits the maximum clock frequency. **Glitches/hazards** occur when different paths through a circuit have different delays:
- **Static-1 hazard** — output should stay 1 but momentarily dips to 0.
- **Static-0 hazard** — the reverse.
- **Dynamic hazard** — output changes more than once during a single transition.
Removed by adding **redundant (consensus) terms** to the expression.

---

## Exam pointers

1. Full adder = **two half adders + OR**.
2. **Carry look-ahead is faster than ripple carry** — generate and propagate.
3. A **2ⁿ:1 MUX implements any n-variable function**, and needs **2ⁿ − 1** 2:1 MUXes to build.
4. **Decoder outputs are minterms.**
5. Hazards are removed with **redundant consensus terms**.
