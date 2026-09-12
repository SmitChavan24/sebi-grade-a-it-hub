# R essentials for data analysis

R vectors are normally one-indexed. c(2,4,6)[2] gives 4. A negative index excludes a position. Vector operations are elementwise; shorter vectors may be recycled, so check lengths. NA represents missingness and is tested with is.na, not equality.

## Worked example

```r
x <- c(2, NA, 6)
mean(x)                 # NA
mean(x, na.rm = TRUE)   # 4
d <- data.frame(team=c("A","A","B"), value=c(2,4,9))
aggregate(value ~ team, data=d, FUN=sum)
# A: 6, B: 9
```

Use read.csv and write.csv for tabular files; inspect str, head and summary after import. A data.frame can hold columns of different types. Matrix elements share a type. Lists can contain heterogeneous objects. A factor encodes categories and levels, not arbitrary numeric magnitudes.

## Drill
Predict x[c(TRUE,FALSE,TRUE)], compare list indexing with [ and [[, and reshape a small table from wide to long. Practise missing-value handling, functions and regular expressions. Compare with Python explicitly to avoid confusing zero-based and one-based positions.

[Official R manuals](https://cran.r-project.org/manuals.html)
