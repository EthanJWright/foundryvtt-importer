# foundryvtt-json-journal

Create a nested folder structure from a simple json structure.

The JSON should be formatted like so:

```
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

The typescrip interfaces for the JSON are as follows

```
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

## Sources for importing

The project [PDF Parse](https://github.com/EthanJWright/pdfparse) is an attempt
to scrub through PDFs and based on configured parameters output a JSON of the
format above. When combined this module should allow for PDFs to be read into
Foundry.
