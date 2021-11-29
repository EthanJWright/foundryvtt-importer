# foundryvtt-json-journal

Create Foundry elements from file structures.

## Journals

Journal entries can be created through a tree like JSON structure as seen
below.

```json
[
  {
    value: "Chapter 1",
    tag: "h2",
    notes: [
    {
      value: "Treasure: 200 gp",
      tag: "p"
      }, {
      value: "Description: A caravan of goblins descends on the party."
      tag: "p"
      }
    ]
    children: [
      {
        value: "NPCs"
        tag: "h3",
        notes: [
        {
          value: "Grib the Goblin : friendly, short, willing to bargin.",
          tag: "p"
          },{
          value: "Chadwick: captured by goblins, wants to be rescued but will betray the adventurers"
          tag: "p"
          }
        ]
      }
    ]
  }
]
```

The typescript interfaces for the JSON are as follows

```typescript
interface Note {
  value: string;
  tag: string;
}

interface JsonData {
  value: string;
  tag: string;
  notes: Array<Note>;
  children: Array<JsonData>;
  sortValue?: number;
}
```

### Sources for importing

The project [PDF Parse](https://github.com/EthanJWright/pdfparse) is an attempt
to scrub through PDFs and based on configured parameters output a JSON of the
format above. When combined this module should allow for PDFs to be read into
Foundry.

## Tables

Tables can be imported from a JSON file with a simple structure, a txt file, or
through a CSV file. Each method is documented below.

### JSON

A structure similar to Foundry's interface for tables is valid:

```json
{
  "name": "Goods",
  "formula": "1d12",
  "entries": [
    { "range": [1, 4], "text": "Backpacks or sacks" },
    { "range": [5, 6], "text": "Baskets" },
    { "range": [7, 8], "text": "Bricks" },
    { "range": [9, 10], "text": "Books" },
    { "range": [11, 12], "text": "Cloth" }
  ]
}
```

Or a simpler structure can be passed and the formula and ranges will be
automatically calculated and evenly distributed:

```json
{
  "name": "Goods",
  "entries": ["Backpacks or sacks", "Baskets", "Bricks", "Books", "Cloth"]
}
```

### Text Files

A .txt file can be used to create a rollable table, the importer will just
treat each new line as an item in the table. The filename will be used as the
table name.

goods.txt :

```txt
Backpacks or sacks
Baskets
Bricks
Books
Cloth
```

### CSVs

A .csv can be used for a rollable table. as commas are quite common in text
that will appear in rollable tables, the pipe is used as the delimiter instead
(|) The file name will be used for the table name.

goods.csv

```csv
01-04|Backpacks or sacks
05-06|Baskets
07-08|Bricks
09-10|Books
11-12|Cloth
```
