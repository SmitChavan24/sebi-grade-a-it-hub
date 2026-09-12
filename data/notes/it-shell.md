# UNIX commands and shell scripting

A shell starts programs, expands variables and connects input/output streams. Know pwd, cd, ls, cp, mv, mkdir, cat, head, tail, wc, sort, uniq, grep, find and chmod. A pipe sends standard output of one command to standard input of the next. Quote expansions to preserve spaces.

## Worked script

```sh
name="study hub"
printf '%s\n' "$name"
for n in 1 2 3; do
  printf '%s\n' "$n"
done
if [ "$#" -gt 0 ]; then
  printf '%s\n' "$1"
fi
```

$0 is the script name, $1 the first argument, $# the argument count and $? the previous exit status. Zero normally means success. A function's return communicates status; output is written separately. Use grep -E for extended regular expressions and distinguish globbing from regex.

## Drill
Trace a loop with a counter; predict the result of a conditional; explain sort names.txt | uniq -c. Repeated values must be adjacent for uniq to combine them. Practise only on disposable example files.

[GNU Bash manual](https://www.gnu.org/software/bash/manual/bash.html)
