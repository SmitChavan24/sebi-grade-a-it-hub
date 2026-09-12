# Python Essentials

## Nature of the language

Interpreted, dynamically typed, garbage collected, multi-paradigm. **CPython** compiles to bytecode (`.pyc`) executed by a virtual machine. The **GIL (Global Interpreter Lock)** allows only one thread to execute Python bytecode at a time — so threads help with **I/O-bound** work and **multiprocessing** is needed for CPU-bound parallelism. That distinction is a common interview question.

## Built-in data structures

| Type | Mutable | Ordered | Notes |
|---|---|---|---|
| **list** | Yes | Yes | Dynamic array; O(1) append, O(n) insert |
| **tuple** | **No** | Yes | Hashable, usable as a dict key |
| **set** | Yes | No | Hash-based; O(1) membership; no duplicates |
| **dict** | Yes | **Insertion-ordered (3.7+)** | Hash map; O(1) average lookup |
| **str** | **No** | Yes | Immutable sequence of characters |

```python
squares   = [x*x for x in range(10) if x % 2 == 0]      # list comprehension
by_symbol = {t['sym']: t['qty'] for t in trades}        # dict comprehension
lazy      = (x*x for x in range(10**9))                 # generator — O(1) memory
```

## Functions

- Default arguments are evaluated **once at definition time** — the classic mutable-default bug: `def f(x, acc=[])` shares one list across calls. Use `None` as the default instead.
- `*args` and `**kwargs`; keyword-only arguments.
- **Closures** and **decorators**:

```python
def timed(fn):
    def wrapper(*a, **kw):
        t0 = time.time()
        r = fn(*a, **kw)
        print(f"{fn.__name__} took {time.time()-t0:.3f}s")
        return r
    return wrapper

@timed
def slow(): ...
```

- `lambda`, `map`, `filter`, `reduce` (from functools), `zip`, `enumerate`, `any`, `all`, `sorted(key=...)`.

## OOP in Python

```python
class Order:
    exchange = "NSE"                    # class attribute
    def __init__(self, sym, qty):       # constructor
        self.sym, self.qty = sym, qty   # instance attributes
    def __repr__(self):
        return f"Order({self.sym}, {self.qty})"
```

**Dunder methods:** `__init__`, `__str__`, `__repr__`, `__len__`, `__eq__`, `__hash__`, `__iter__`, `__enter__`/`__exit__` (context managers). No true access modifiers — `_x` is a convention, `__x` triggers name mangling.

**MRO** — method resolution order for multiple inheritance, computed by the **C3 linearisation** algorithm; inspect with `Class.__mro__`.

## Mutability trap

```python
a = [1, 2, 3]
b = a           # same object
b.append(4)     # a is now [1, 2, 3, 4]
c = a[:]        # shallow copy
import copy; d = copy.deepcopy(a)   # independent
```

Python is **pass by object reference**: rebinding inside a function does not affect the caller, but mutating does.

## Standard library worth knowing

`os`, `sys`, `re`, `json`, `csv`, `datetime`, `collections` (**Counter, defaultdict, deque, namedtuple, OrderedDict**), `itertools`, `functools` (lru_cache), `math`, `random`, `sqlite3`, `logging`, `unittest`/`pytest`, `threading`, `multiprocessing`, `asyncio`.

**Data stack:** NumPy (ndarray, vectorised operations), **pandas** (DataFrame, groupby, merge, time series), matplotlib, scikit-learn. For a SEBI IT role, pandas over trade data is a genuinely relevant skill to mention.

## Error handling and files

```python
try:
    with open("trades.csv") as f:       # context manager closes the file
        data = f.read()
except FileNotFoundError as e:
    log.error("missing file: %s", e)
except (ValueError, TypeError):
    raise
else:
    process(data)
finally:
    cleanup()
```

---

## Exam pointers

1. **Tuples are immutable and hashable; lists are not.**
2. **Mutable default arguments** are evaluated once — a favourite trick.
3. The **GIL** limits CPU-bound threading; use multiprocessing.
4. Dicts preserve **insertion order from Python 3.7**.
5. `is` compares identity, `==` compares value.
