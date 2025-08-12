# Bus SeatMap JSON contract

This document explains the expected shape of the `seatMap` JSON used when creating or updating a `Bus`.

## Required fields

- `layout`: string[][] - 2D array of seat ids. Each inner array represents a row. Number of columns is inferred from the inner array length.

## Rules

- All rows in `layout` must have the same number of columns (i.e., equal inner array lengths).
- Seat id format: `/^[A-Z]\d+$/i` (e.g. `A1`, `B12`).
- Additional optional fields may be included but are not validated here.

## Example

```json
{
    "layout": [
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"]
    ],
    "columnPosition": { "leftSide": [1], "rightSide": [2, 3] }
}
```


