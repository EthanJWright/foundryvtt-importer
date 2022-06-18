# Foundry VTT Content Parser

[![Checks](https://github.com/EthanJWright/foundryvtt-importer/workflows/Checks/badge.svg)](https://github.com/EthanJWright/foundryvtt-importer/actions)
![Latest Release Download Count](https://img.shields.io/github/downloads/EthanJWright/foundryvtt-importer/latest/module.zip)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U6U877XT1)

Create foundry elements from external sources.

## Usage

1. Press import button in tab you are trying to import
2. Copy text of entry you are trying to import
3. Paste in the clipboard text area
4. Press okay
5. Tweak and use imported data

## Demos

*Import a monster from a PDF*
(using Zathura as my PDF reader)

![Actor Importing from PDF](https://media0.giphy.com/media/0RYtEwdcfiB6zQURlK/giphy.gif?cid=790b7611c1b01d4886800fd3d18d238cb08b6d0b63bf3159&rid=giphy.gif&ct=g)

*Import a table from reddit.com/r/BehindTheTables*

![Table Importing from Reddit](https://media4.giphy.com/media/qeiKk0SSvOPngZpca0/giphy.gif?cid=790b761108da49b64336e28d589d0dd28259b61333b5f74e&rid=giphy.gif&ct=g)

*Import an item from a PDF*

![Item Importing from PDF](https://media3.giphy.com/media/geoyoPvqw6hSn3CJgQ/giphy.gif?cid=790b76113d7feb89632e00f526f0c16b20f63f8127036c60&rid=giphy.gif&ct=g)

*Import Journal Entries*
![Import Journal Entries](https://media0.giphy.com/media/8Qcl0KVgOfpnpHkY8I/giphy.gif?cid=790b76112d96f67469f7fb7f86bf6f92bfbdb9f64e05924d&rid=giphy.gif&ct=g)

## Support

Currently some features only support the 5e game system.

## Key Features

### Tables

Import tables from external sources, creating quick collections.

Import tables from:

- Create many tables all nested in a folder from [Reddit](https://www.reddit.com/r/BehindTheTables)
- Copy and paste data to be parsed (reddit, entries per line, csv, json, etc.)
- Import text files (new lines are table entries)
- Import CSV files (first column treated as roll hits)
- Import from JSON (a few different structures to suite needs, easy to generate from scripts)

Reddit.

---

**NOTE**

Importing Reddit table collections are great when paired with the [Table Ninja](https://github.com/Adriannom/fvtt-module-table-ninja) module.

---

### Actors (5e only)

Import actors from text based monster blocks. I currently either copy my pdf to
text, or use a pdf tool (like zathura) that allows me to copy blocks of text.

Paste the block of text into the clipboard utility, and a best effort monster
will be generated matching the text.

### Items (5e only)

Import items copied from text blocks from PDFs. Will best effort parse
and generate an item based on the elements.

### Journals

Copy and paste text from anywhere, toggle if you want this to convert to one or
multiple journal entries.

or

Import journals from a structured JSON created by some other tool, such as my [PDF Parse](https://github.com/EthanJWright/pdfparse)
tool which attempts to process modules that may be found in DMs guild.

## Have an issue?

Open an issue [here](https://github.com/EthanJWright/foundryvtt-importer/issues) and follow the template.

Sample data that I have for testing parsers is limited. If you have
sample data that is not working, please open an issue and I can add it
to my tests and update the parsers.

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

## Actors (5e only)

Actors can be created by copying the text of a mosnter block into the clipboard
tool.

The tool is designed to handle several standard formats of monster blocks, and
attempts to resolve as many elements as possible into Foundry Actor items.

An example monster block could look like the below Swashbuckler:


```txt
Swashbuckler
Armor Class 17 (leather armor)
Hit Points 66 (12d8 + 12)
Speed 30 ft.Armor Class 12 (15 with mage armor)
Hit Points 78 (12d8 + 24)
Speed 30 ft.
Medium humanoid (any race), any non-lawful alignment
STR
12 (+1)
DEX
18 (+4)
CON
12 (+1)
INT
14 (+2)
WIS
11 (+0)
Medium humanoid (any race), any alignment
CHA
15 (+2)
Skills Acrobatics +8, Athletics +5, Persuasion +6
Senses passive Perception 10
Languages any one language (usually Common)
Challenge 3 (700 XP)
Lightfooted. The swashbuckler can take the Dash or Disengage
action as a bonus action on each of its turns.
Suave Defense. While the swashbuckler is wearing light or no
armor and wielding no shield, its AC includes its Charisma
modifier.
Actions
Multiattack. The swashbuckler makes three attacks: one with
a dagger and two with its rapier.
Dagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5
ft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing
damage.
Rapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.
Hit: 8 (1d8 + 4) piercing damage.
```

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
      },
      {
        "value": "Description: A caravan of goblins descends on the party.",
        "tag": "p"
      }
    ],
    "children": [
      {
        "value": "NPCs",
        "tag": "h3",
        "notes": [
          {
            "value": "Grib the Goblin : friendly, short, willing to bargin.",
            "tag": "p"
          },
          {
            "value": "Chadwick: captured by goblins, wants to be rescued but will betray the adventurers",
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

## Plans for future implementation

- Import journals from markdown directories (such as Obsidian)
- Actor importing is basic, want to add fine tuning for Items & add Spells
- Make settings more configurable (to hide unused elements)
- Make parsers more modular to allow for easy extensibility
- Support for adding items/weapons/armor etc. Including from CSV.
- Export to compendium. I can see people using this to import work from larger datasets and wanting to share or add them to modules.

## Contributing to the codebase

Currently the actor API is flushed out and extensible for contributions. The
Item parsers are starting to be flushed out.

### Dev Environment

#### Dev Foundry Configuration

I recommend setting up a foundry dev environment. This should entail copying
your FoundryVTT folder and making a new folder, say `DevFoundryVTT`. Then modify
the `dataPath` located in the file `FoundryVTT/Config/options.json` to reflect
the new base folder `DevFoundryVTT`. Now when you launch Foundry, you should
have an environment free from your standard game sessions. I recommend removing
any extra modules and setting up a clean 'hello world' to test in.

#### Installing this module

Clone the repository to your system, and ensure you have NPM and Node installed
and up to date.

To install the dependencies, run the following from the project directory:

```sh
npm i
```

Ensure everything installed and the tests are passing, run:

```sh
npm run test
```

Ensure you can build the project into a distributable package for Foundry:

```sh
npm run build
```

The build command should generate a `dist` repo with the following contents:

```
drwxrwxr-x     - ubuntu  8 Feb 20:21   -I  lang
drwxrwxr-x     - ubuntu  8 Feb 20:21   -I  module
.rw-rw-r--  1.0k ubuntu  8 Feb 20:21   -I  module.json
drwxrwxr-x     - ubuntu  8 Feb 20:21   -I  styles
drwxrwxr-x     - ubuntu  8 Feb 20:21   -I  templates
```

You can now symlink this module into you DevFoundry addon repo with the
following command. Run the command from the modules directory of your dev
foundry installation:

```sh
ln -s <PROJECT-DIR>/dist foundry-vtt-content-parser
```

For example, the command on my system looks like so:

```sh
ln -s ~/codespace/foundryvtt-importer/dist foundry-vtt-content-parser
```

You should now be able to view, enable, and use the module from within Foundry.

### Testing Components

Most logic that doesn't directly interface with Foundry is easily testible, and
tests should be written for all additional logic.

If you add a function, there should be a test that corresponds.

Tests are located in the `test` directory, place your tests corresponding to
the structure for a file you are adding, for example a new parser for bulk markdowns
should have tests located at `test/actor/parsers/markDownBulk.test.ts`

To get test input, you can paste your data into the input box for the tool on
foundry, open up the 'developer tools', and then copy the data that is logged
in the console. This test data can be directly pasted as a string and used to
validate any logic that is added.

### Actor Parser Structure

The actor parsers are populated in the `src/module/actor/parsers/available.ts`
list. Each element of an actor will have a list of availble parsers to attempt
to parse that elment. 

Each parser is well typed and must either return the particular element, or
throw an error. When the module recieves input, it will hand that input to each
parser in the list for each field in the actor.

This system means that an actor can be built from many different forms of
input, and that input doesn't need to be routed to any specific parser. If a
parser cannot handle the input it will error, and the next parser will be run.


---

**NOTE**

Feats, actions, weapons, etc, are all represented as Items in Foundry. I'm
slowly flushing out the item parser, but currently the actor parser
itemsParsers expects a return of one of the types defined in the Item
interface. Look at the implementation of parseItemsWTC for an example of item
parsing.

---

### Adding a parser

The current parsers are wtcTextBlock parsers, which attempt to convert blocks
of text that resemble a Wizards of the Coast Monster Block into the discrete
actor elements.

To add a parser, create a file in `src/module/actor/parsers/yourNewParser.ts`
and a corresponding test file `test/actor/parsers/yourNewParser.test.ts`

Now you can define a parser, such as for parsing a name. You can find the list
of potential parsers and their expected types in the file `src/module/actor/parserTypes.ts`


Now you can create your new parser for a name:

```ts
export const nameParserHelloWorld: NameParser = (lines) => {
  if (lines[0] === 'Hello') return 'Hello, World!'
  throw new Error('Have not implemented parser yet!');
};
```

and add it to the list of availble name parsers parsers in `src/module/actor/parsers/available.ts`

and you can create your new test for your parser in `test/actor/parsers/yourNewParser.test.ts`

```ts
describe('nameParserHelloWorld', () => {
  it('should return hello world', () => {
    const testInput = ['Hello']
    expect(nameParserHelloWorld(testInput)).toEqual('Hello, World!')
  });
  it('should throw an error with invalid input', () => {
    const invalidInput = ['invalid']
    expect(() => nameParserHelloWorld(invalidInput)).toThrow();
  })
})
```

If you want to test all of the parsers  working together, or pass an entire
stat block to all parsers, you can import and pass your test to `textToActor`,
which is the top level function that is called when input is recieved by the
module.

### FAQ

Q: The project wont let me commit and is throwing errors, whats up?
A: The project uses eslint to validate the code style. Running `npm run lint -- --fix`
should fix your issues.

Q: The module isn't showing up in Foundry after I symlink the dist folder.
A: Make sure you can see the dist folder contents in your modules directory,
and make sure the name is an exact match. If the directory name doesn't match
the module.json it won't show up as a Foundry addon.
