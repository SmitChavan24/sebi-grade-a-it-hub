# CPU Organisation and Instruction Execution

## Components

**ALU** (arithmetic and logic), **control unit**, **registers** (PC, IR, MAR, MDR, accumulator, general purpose, stack pointer, status/flag register), and the **buses** connecting them: **address bus** (unidirectional, width determines addressable memory), **data bus** (bidirectional, width = word size transferred), **control bus**.

> If the address bus is **n bits wide**, the CPU can address **2ⁿ** locations. With a 32-bit address bus and byte addressing: **4 GB**. A standard question.

## Instruction cycle

```
FETCH    : MAR <- PC ; MDR <- Memory[MAR] ; IR <- MDR ; PC <- PC + 1
DECODE   : control unit interprets the opcode
EXECUTE  : ALU operation / memory access / branch
(INTERRUPT check at the end of each cycle)
```

**Machine cycle vs instruction cycle vs clock cycle:** one instruction takes several machine cycles; each machine cycle takes several clock cycles (in a non-pipelined design).

## Control unit design

- **Hardwired** — fixed logic; **fast**, hard to modify; suits RISC.
- **Microprogrammed** — a **control memory** holds microinstructions; **flexible and easier to modify**, but slower. Horizontal (wide, parallel, less decoding) vs vertical (narrow, encoded, needs decoding) microinstructions.

## Instruction formats

**3-address, 2-address, 1-address (accumulator), 0-address (stack-based, using postfix)**. Fewer addresses means shorter instructions but more instructions per task.

## Addressing modes

| Mode | Effective address | Example use |
|---|---|---|
| **Immediate** | Operand is in the instruction | Constants |
| **Register** | In a register | Fastest |
| **Direct/absolute** | Given in the instruction | Globals |
| **Indirect** | Address of the address | Pointers |
| **Register indirect** | Register holds the address | Pointer dereference |
| **Indexed** | Base + index register | **Arrays** |
| **Base + displacement** | Base register + offset | Struct fields, stack frames |
| **Relative (PC-relative)** | PC + offset | **Branches**, position-independent code |
| **Auto-increment/decrement** | Address register updated after use | Stacks, sequential access |

## RISC vs CISC

| | RISC | CISC |
|---|---|---|
| Instruction set | Small, simple, fixed length | Large, complex, variable length |
| Cycles per instruction | Mostly 1 (pipelined) | Many |
| Addressing modes | Few | Many |
| Registers | Many | Fewer |
| Memory access | **Load/store only** | Most instructions can access memory |
| Complexity in | **Compiler/software** | **Hardware/microcode** |
| Examples | ARM, RISC-V, MIPS | x86 |

Modern x86 processors decode CISC instructions into RISC-like micro-operations internally — so the distinction is now architectural rather than absolute.

## Performance

**CPU time = Instruction count × CPI × Clock cycle time**
**MIPS = clock rate / (CPI × 10⁶)**

**Amdahl's law:** speedup = 1 / ((1 − f) + f/s), where f is the fraction improved and s the speedup of that fraction. The lesson: the **unimproved portion sets the ceiling** — optimising 10% of runtime infinitely still gives at most 1.11× overall.

---

## Exam pointers

1. **n-bit address bus → 2ⁿ addressable locations.**
2. **Hardwired = fast/inflexible; microprogrammed = flexible/slower.**
3. **Indexed addressing is for arrays; PC-relative for branches.**
4. **RISC = load/store architecture**, complexity moved to the compiler.
5. **CPU time = IC × CPI × clock time**; Amdahl's law caps the benefit of partial optimisation.
