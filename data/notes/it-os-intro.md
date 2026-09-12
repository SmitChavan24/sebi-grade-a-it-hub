# Operating Systems — Fundamentals

## What an OS is

A program that acts as an **intermediary between the user and the hardware**, managing resources (CPU, memory, I/O, files) and providing an execution environment. Two views: **resource manager** and **extended/virtual machine**.

## Types of OS

| Type | Characteristic |
|---|---|
| Batch | Jobs grouped; no interaction; poor CPU utilisation |
| Multiprogramming | Several jobs in memory; CPU switches on I/O wait |
| Multitasking / time-sharing | CPU time sliced among users; response time matters |
| Multiprocessing | More than one CPU; symmetric (SMP) or asymmetric |
| Real-time | Deadline-bound. **Hard RTOS** — missing a deadline is a failure; **soft RTOS** — degraded quality |
| Distributed | Independent machines presented as one system |
| Network | Each machine has its own OS; sharing over a network |
| Embedded | Fixed function, small footprint |

## Kernel

The always-resident core. Architectures:

- **Monolithic** — all services in kernel space; fast, but a fault anywhere can crash the system (classic Unix, Linux).
- **Microkernel** — minimal kernel (IPC, scheduling, basic memory); drivers and file systems in user space; more reliable, more context-switch overhead (Minix, QNX).
- **Hybrid** — Windows NT, macOS.
- **Exokernel**, **nanokernel** — research/lightweight variants.

## Dual mode operation

The CPU runs in **user mode** or **kernel (supervisor) mode**, distinguished by a **mode bit**. Privileged instructions (I/O, halt, setting timers, modifying page tables) execute **only in kernel mode**. This is the hardware support that makes protection possible.

## System calls

The controlled entry point from user mode to kernel mode, triggered by a **software interrupt / trap**.

| Category | Examples (Unix) |
|---|---|
| Process control | fork, exec, exit, wait |
| File management | open, read, write, close, lseek |
| Device management | ioctl, read, write |
| Information | getpid, alarm, sleep |
| Communication | pipe, shmget, mmap, socket |
| Protection | chmod, umask, chown |

**fork()** returns **0 in the child** and the **child's PID in the parent** — a classic output question. `fork(); fork(); fork();` creates **2³ − 1 = 7** child processes.

## Interrupts vs traps

- **Interrupt** — asynchronous, hardware-generated (I/O completion, timer).
- **Trap / exception** — synchronous, software-generated (system call, divide by zero, page fault).

Both transfer control through the **interrupt vector table** to a handler.

## Booting

Power on → **BIOS/UEFI** POST → bootloader (**GRUB**, Windows Boot Manager) → kernel loaded into memory → init/systemd → user space.

---

## Exam pointers

1. Mode bit: **0 = kernel, 1 = user** in most textbook conventions.
2. A system call is a **trap**, not a hardware interrupt.
3. Microkernel = more reliable, more overhead; monolithic = faster, less isolated.
4. `fork()` called n times in sequence creates **2^n − 1** children.
5. Hard real-time is about **guaranteed deadlines**, not about being fast.
