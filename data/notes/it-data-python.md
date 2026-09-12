# Python analytics: slicing, regex, files and dataframes

Lists preserve order; sets remove duplicate values; dictionaries map keys to values. A slice a[start:stop:step] excludes stop. A shallow copy creates a new outer collection while retaining references to nested objects.

## Worked examples

```python
a = [10, 20, 30, 40, 50]
print(a[1:4:2])  # [20, 40]
print(a[::-1])   # [50, 40, 30, 20, 10]
counts = {}
for x in ['A', 'B', 'A']:
    counts[x] = counts.get(x, 0) + 1
# {'A': 2, 'B': 1}
```

In pandas, loc selects labels and iloc selects integer positions. Filter with a boolean mask; combine masks with parenthesised & and |. groupby splits rows into groups before aggregation. pivot reshapes unique index-column pairs; pivot_table can aggregate duplicates. merge performs relational joins; verify key uniqueness to avoid multiplying rows unexpectedly.

## Files and cleaning
Use a context manager for files. Choose encodings explicitly. Distinguish missing values from zeros, validate types and document how duplicates are handled. Regex anchors ^ and $ constrain boundaries; search finds a match anywhere, while fullmatch covers the entire input. Practise predicting shapes and row counts before running code.

[Python tutorial](https://docs.python.org/3/tutorial/) · [pandas user guide](https://pandas.pydata.org/docs/user_guide/index.html)
