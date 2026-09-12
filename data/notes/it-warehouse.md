# Data warehousing, ETL and analytical models

An operational database supports individual transactions; a warehouse combines historical data for analysis. Extract obtains source data, transform standardises and validates it, and load writes the target. ELT loads before performing transformations. Neither acronym alone guarantees data quality.

## Model example
A trade fact table contains measures such as quantity and value plus keys to date, instrument and venue dimensions. Declare its grain: one row per executed trade. A daily aggregate has a different grain and cannot be mixed without care. A star schema connects facts directly to dimensions; a snowflake normalises dimension structures.

## Analytical operations
Roll-up aggregates daily values into months. Drill-down moves to finer detail. Slice selects one dimension value; dice selects a subcube. A data mart focuses on one subject area. Metadata records definitions, provenance and transformations.

## Quality drill
Ten source rows include a duplicated transaction, one missing key and two inconsistent date formats. State which rows you would quarantine and why. Reconcile row counts and totals after each stage; preserve raw data so transformations can be audited. Slowly changing dimension type 1 overwrites history; type 2 retains versions with validity intervals.
