# C++ fundamentals and object behaviour

C++ supports value semantics, references, classes and deterministic destruction. A reference aliases an existing object; a pointer holds an address and can be null. std::vector manages a dynamic array, but growth may invalidate pointers and iterators into its storage.

## Worked trace

```cpp
int a = 4;
int& b = a;
b += 3;  // a is now 7
int c = a;
c += 1;  // c is 8; a remains 7
```

Constructors establish an object's state; destructors release resources owned by it. RAII binds resource lifetime to object lifetime. A virtual function can dispatch according to the dynamic object type through a base reference or pointer. Overloading chooses among signatures; overriding supplies derived behaviour for an inherited virtual function.

## Pitfalls and drills
Do not infer a numeric result from undefined behaviour such as reading out of bounds or using an object after its lifetime ends. Trace one constructor/destructor sequence, one virtual dispatch example and one exception path. Compare pass-by-value and const-reference parameters. Understand strings, loops, arrays and functions before memorising library details.
