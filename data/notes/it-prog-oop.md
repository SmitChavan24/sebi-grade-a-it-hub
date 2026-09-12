# Object-Oriented Programming

## The four pillars

| Pillar | Meaning | Mechanism |
|---|---|---|
| **Encapsulation** | Bundle data with the methods that act on it, and hide internals | private fields + public methods |
| **Abstraction** | Expose what, hide how | abstract classes, interfaces |
| **Inheritance** | Reuse and specialise | `extends`, base/derived classes |
| **Polymorphism** | One interface, many implementations | overloading and overriding |

Encapsulation hides **data**; abstraction hides **implementation**. Examiners like that distinction.

## Class concepts

- **Class** = blueprint; **object** = instance.
- **Constructor** — same name as the class, no return type; **default, parameterised, copy**. Constructors can be overloaded; **constructors are not inherited**.
- **Destructor** (C++) / **finalizer / garbage collection** (Java) — cleanup.
- **`this`** — reference to the current object.
- **`static`** members belong to the class, not an instance; static methods cannot use `this` or access instance members directly.

## Inheritance

Types: single, multiple (C++ yes, **Java no for classes** — interfaces instead), multilevel, hierarchical, hybrid.

**Diamond problem** — with multiple inheritance, an ambiguous base copy. C++ resolves it with **virtual inheritance**; Java sidesteps it by disallowing multiple class inheritance, and resolves interface default-method conflicts by requiring an explicit override.

**Access specifiers:**

| Specifier | Same class | Same package | Subclass | Anywhere |
|---|---|---|---|---|
| private | Yes | No | No | No |
| default (package-private) | Yes | Yes | No | No |
| protected | Yes | Yes | **Yes** | No |
| public | Yes | Yes | Yes | Yes |

## Polymorphism

| | Overloading (compile-time) | Overriding (run-time) |
|---|---|---|
| Also called | Static / early binding | **Dynamic / late binding** |
| Signature | **Must differ** (parameters) | **Must be the same** |
| Return type | Can differ | Must be same or covariant |
| Scope | Same class | Base and derived class |
| Access | — | Cannot **reduce** visibility |
| Mechanism | Compiler resolves | **vtable / virtual dispatch** |

**Return type alone cannot distinguish overloads.** A C++ `virtual` function (or any non-static Java method) enables run-time dispatch through the **vtable**; a **pure virtual function** (`= 0`) makes the class **abstract**.

## Abstract class vs interface (Java)

| | Abstract class | Interface |
|---|---|---|
| Methods | Abstract + concrete | Abstract; **default and static since Java 8**; private since 9 |
| Fields | Any | **public static final** only |
| Inheritance | One only | **Many** |
| Constructor | Yes | No |
| Use when | Shared state and behaviour | A capability/contract |

## SOLID principles

- **S**ingle responsibility — one reason to change.
- **O**pen/closed — open for extension, closed for modification.
- **L**iskov substitution — a subtype must be usable wherever the base type is.
- **I**nterface segregation — many small interfaces beat one fat one.
- **D**ependency inversion — depend on abstractions, not concretions.

Also: **composition over inheritance**, **DRY**, **YAGNI**, **law of Demeter**.

## Common design patterns

| Category | Patterns |
|---|---|
| **Creational** | Singleton, Factory, Abstract Factory, Builder, Prototype |
| **Structural** | Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight |
| **Behavioural** | Observer, Strategy, Command, Iterator, State, Template Method, Chain of Responsibility, Mediator |

Know **Singleton** (one instance, global access; thread safety via double-checked locking or an enum in Java), **Factory** (creation without naming the concrete class), **Observer** (publish-subscribe — the model behind market data feeds), and **Strategy** (swap algorithms at run time).

---

## Exam pointers

1. **Overloading = compile time, overriding = run time.**
2. Return type alone **cannot** overload a method.
3. Java has no multiple **class** inheritance; interfaces provide it safely.
4. Interface fields are implicitly **public static final**.
5. Learn SOLID by name — it appears in descriptive software-engineering answers.
