# I/O Management, Linux Basics and Commands

## I/O hardware and methods

| Method | How the CPU is involved |
|---|---|
| **Programmed I/O (polling)** | CPU busy-waits on a status bit — wastes cycles |
| **Interrupt-driven I/O** | Device raises an interrupt when ready; CPU handles it |
| **DMA** | A **DMA controller** transfers directly between device and memory; the CPU is interrupted **only at completion** — best for bulk transfers |

**Cycle stealing** — the DMA controller takes the memory bus for a cycle while the CPU is not using it.

**Device categories:** block (disks), character (keyboards, serial), network. **Device drivers** present a uniform interface to the kernel. **Spooling** (e.g. printing) and **buffering / caching** smooth speed mismatches.

## Linux essentials for the exam

**Filesystem hierarchy:** `/bin` `/sbin` `/etc` (config) `/var` (logs) `/tmp` `/home` `/usr` `/proc` (kernel/process info as files) `/dev` (device files) `/opt`.

**Permissions:** `rwx` for user, group, other. Numeric: r=4, w=2, x=1.
- `chmod 755 file` → rwxr-xr-x
- `chmod 644 file` → rw-r--r--
- `umask` subtracts from the default (666 for files, 777 for directories).
- Special bits: **SUID (4)**, **SGID (2)**, **sticky bit (1)** — the sticky bit on `/tmp` stops users deleting each other's files.

**Commands worth memorising:**

| Command | Use |
|---|---|
| `ls -la`, `cd`, `pwd`, `mkdir -p`, `rm -rf`, `cp -r`, `mv` | Navigation and files |
| `cat`, `less`, `head -n`, `tail -f` | Viewing (tail -f for live logs) |
| `grep -r "x" .`, `find / -name f`, `awk`, `sed -i 's/a/b/g'` | Search and transform |
| `ps aux`, `top`, `htop`, `kill -9 PID`, `nice`, `jobs`, `bg`, `fg` | Processes |
| `df -h`, `du -sh`, `free -m`, `mount`, `lsof` | Storage and memory |
| `chmod`, `chown`, `useradd`, `passwd`, `sudo`, `su` | Permissions and users |
| `tar -czvf a.tar.gz dir`, `gzip`, `zip` | Archiving |
| `ping`, `netstat -tulnp`, `ss`, `ifconfig/ip a`, `traceroute`, `dig`, `curl`, `wget`, `ssh`, `scp` | Networking |
| `systemctl status/start/enable`, `journalctl -u svc`, `crontab -e` | Services and scheduling |

**Cron format:** `minute hour day-of-month month day-of-week command`. `0 2 * * *` = every day at 02:00.

**Signals:** SIGHUP(1), SIGINT(2, Ctrl+C), SIGKILL(9, cannot be caught), SIGTERM(15, the polite default), SIGSTOP.

**Pipes and redirection:** `|`, `>`, `>>`, `2>`, `&>`, `tee`.

## Windows equivalents worth recognising

Task Manager, Event Viewer, Registry (HKLM/HKCU), Services (services.msc), PowerShell cmdlets (Get-Process, Get-Service), NTFS permissions and Active Directory / Group Policy.

---

## Exam pointers

1. **DMA interrupts the CPU only once**, at transfer completion.
2. `chmod 755` = rwxr-xr-x; compute permissions from 4/2/1 quickly.
3. **SIGKILL (9) cannot be caught or ignored**; SIGTERM (15) can.
4. `/proc` is a **virtual** filesystem exposing kernel and process state.
5. The sticky bit matters on shared directories such as `/tmp`.
