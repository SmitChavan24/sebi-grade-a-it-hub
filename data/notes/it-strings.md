# Strings, pattern matching, matrices and JSON

Strings are sequences; substring bounds and mutability depend on the language. Trace indices explicitly. Repeated concatenation of immutable strings can repeatedly copy existing content. For pattern search, a simple scan compares the pattern at each possible starting position; prefix-based algorithms can avoid repeating comparisons.

## Worked example
Text ABABA contains ABA at zero-based positions 0 and 2. A method that jumps by the entire pattern length after a match may miss the overlap. State whether overlaps are included before counting matches.

## Matrices and JSON
For an m by n matrix, check row and column bounds independently. In row-major storage, offset = row*n + column using zero-based indices. JSON has objects, arrays, strings, numbers, booleans and null; it does not support comments or trailing commas. A JSON object key is a string. Parse before accessing nested values and check whether a key exists.

## Drill
Trace a two-pointer palindrome check on an empty string, one character and abba. Trace the transpose of a 2 by 3 matrix. Count frequencies using a map, then compare the time complexity with a nested-loop solution.
