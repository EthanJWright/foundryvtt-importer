# foundryvtt-importer

Create Foundry elements from file structures.

## Key Features

### Tables

Import tables from external sources, creating quick collections.

Import tables from:

- [Reddit](https://www.reddit.com/r/BehindTheTables)
- txt file
- CSV
- JSON

### Journals

Import journals from a structured JSON created by some other tool, such as my [PDF Parse](https://github.com/EthanJWright/pdfparse)
tool which attempts to process modules that may be found in DMs guild.

## Journals

Journal entries can be created through a tree like JSON structure as seen
below.

```json
[
  {
    "value": "Chapter 1",
    "tag": "h2",
    "notes": [
    {
      "value": "Treasure: 200 gp",
      "tag": "p"
      }, {
      "value": "Description: A caravan of goblins descends on the party."
      "tag": "p"
      }
    ]
    "children": [
      {
        "value": "NPCs"
        "tag": "h3",
        "notes": [
        {
          "value": "Grib the Goblin : friendly, short, willing to bargin.",
          "tag": "p"
          },{
          "value": "Chadwick: captured by goblins, wants to be rescued but will betray the adventurers"
          "tag": "p"
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

### Reddit

The table tool comes with a text box where you can copy/paste tables from the
[Behind the Tables subreddit.](https://www.reddit.com/r/BehindTheTables)

A single table can be created:

```txt
d10 This place is (or was) a...

    A stronghold.

    A temple.

    A tomb.

    A prison.

    A mine.

    A lair.

    A palace.

    A storage vault.

    A sewer.

    A maze.
```

Or multiple tables can be part of a collection, which will be placed in a
folder:

```txt
Random Dungeons

d10 This place is (or was) a...

    A stronghold.

    A temple.

    A tomb.

    A prison.

    A mine.

    A lair.

    A palace.

    A storage vault.

    A sewer.

    A maze.

d12 ...built by...

    An ancient dwarvish clan.

    An ancient elf prince.

    A powerful wizard.

    A dark sorceress.

    A foreign empire.

    An ambitious queen of old.

    Prosperous merchants.

    A powerful noble family.

    Religious zealots.

    An ancient race of giants.

    A tyrannical king of old.

    No one; it's a natural cave.

d12 ...and located...

    Beneath a cold mountain.

    Beneath a fiery mountain.

    Near a well-traveled mountain pass.

    Deep within a forest.

    Deep within a desert.

    Beside the sea.

    On an island.

    Beneath a bustling city.

    Beneath the ruin of an ancient city.

    Beneath a well-known castle or monastery.

    Beneath a the ruin of an old castle or monastery.

    In a place reachable only by magic.

d12 The place is currently occupied by...

    A dangerous outlaw.

    An elemental lord.

    A vampire.

    A lich.

    A demon.

    A devil.

    An orc warlord.

    A hobgoblin commander.

    An aberrant presence.

    A witch.

    A giant.

    A dragon.
```

### JSON

A structure similar to Foundry's interface for tables is valid:

```json
{
  "name": "Goods",
  "formula": "1d12",
  "results": [
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
  "results": ["Backpacks or sacks", "Baskets", "Bricks", "Books", "Cloth"]
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
