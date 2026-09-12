# Quant Foundations — Number System and Algebra

## Number classification

Natural → Whole → Integers → Rational → Real. **Prime numbers** have exactly two factors (**1 is not prime; 2 is the only even prime**). Composite, co-prime, perfect numbers.

## Divisibility rules

| Divisor | Rule |
|---|---|
| 2 | Last digit even |
| 3 | **Digit sum divisible by 3** |
| 4 | Last **two** digits divisible by 4 |
| 5 | Ends in 0 or 5 |
| 6 | Divisible by 2 **and** 3 |
| 8 | Last **three** digits divisible by 8 |
| 9 | **Digit sum divisible by 9** |
| 11 | **Difference of alternate digit sums** divisible by 11 |

## Factors, HCF and LCM

For N = aᵖ × bᑫ × cʳ (prime factorisation):
- **Number of factors = (p+1)(q+1)(r+1)**
- Sum of factors = [(aᵖ⁺¹−1)/(a−1)] × … for each prime
- **HCF × LCM = product of the two numbers** (for two numbers only)
- HCF = product of **common primes with the lowest** powers; LCM = **all primes with the highest** powers

## Remainder theorems

- **Remainder of a product = product of remainders** (then reduce).
- **Fermat's little theorem:** if p is prime and a is not divisible by p, then a^(p−1) ≡ 1 (mod p).
- **Cyclicity of unit digits:** most digits repeat with a cycle of 4 (2: 2,4,8,6; 3: 3,9,7,1; 7: 7,9,3,1; 8: 8,4,2,6), while 0, 1, 5, 6 are constant and 4, 9 have cycles of 2. **To find the unit digit of a^b, reduce b mod 4.**

## Essential algebra identities

```
(a + b)² = a² + 2ab + b²
(a − b)² = a² − 2ab + b²
a² − b² = (a + b)(a − b)
(a + b)³ = a³ + b³ + 3ab(a + b)
a³ + b³ = (a + b)(a² − ab + b²)
a³ − b³ = (a − b)(a² + ab + b²)
a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca)
If a + b + c = 0, then a³ + b³ + c³ = 3abc
```

## Quadratic equations

For ax² + bx + c = 0:
- Roots = **(−b ± √(b² − 4ac)) / 2a**
- **Sum of roots = −b/a**, **product = c/a**
- **Discriminant D = b² − 4ac:** D > 0 real and distinct; D = 0 real and equal; D < 0 complex.

## Progressions

- **AP:** nth term = a + (n−1)d; **Sum = n/2 [2a + (n−1)d] = n/2 (first + last)**
- **GP:** nth term = ar^(n−1); Sum = a(rⁿ − 1)/(r − 1); **infinite GP sum = a/(1 − r)** when |r| < 1
- Sum of first n naturals = **n(n+1)/2**; squares = **n(n+1)(2n+1)/6**; cubes = **[n(n+1)/2]²**

## Mensuration essentials

| Shape | Formula |
|---|---|
| Circle | Area πr², circumference 2πr |
| Triangle | Area ½ × base × height; Heron's √(s(s−a)(s−b)(s−c)) |
| Equilateral triangle | (√3/4)a² |
| Cube | Volume a³, surface area 6a² |
| Cuboid | lbh; surface 2(lb + bh + hl) |
| Cylinder | πr²h; curved surface 2πrh |
| Cone | (1/3)πr²h; curved surface πrl, where l = √(r² + h²) |
| Sphere | (4/3)πr³; surface 4πr² |

---

## Exam pointers

1. **Number of factors = product of (power + 1).**
2. **HCF × LCM = product of the two numbers** — only for two numbers.
3. **Unit digit: reduce the exponent mod 4.**
4. **Sum of roots = −b/a; product = c/a.**
5. **AP sum = n/2 × (first + last)** is faster than the standard form when you know both ends.
