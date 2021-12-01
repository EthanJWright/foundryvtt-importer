/* {
  "Actor": {
    "types": ["character", "npc"],
    "templates": {
      "base": {
        "health": {
          "value": 10,
          "min": 0,
          "max": 10
        },
        "power": {
          "value": 5,
          "min": 0,
          "max": 5
        },
        "biography": ""
      }
    },
    "character": {
      "templates": ["base"],
      "attributes": {
        "level": {
          "value": 1
        }
      },
      "abilities": {
        "str": {
          "value": 10
        },
        "dex": {
          "value": 10
        },
        "con": {
          "value": 10
        },
        "int": {
          "value": 10
        },
        "wis": {
          "value": 10
        },
        "cha": {
          "value": 10
        }
      }
    },
    "npc": {
      "templates": ["base"],
      "cr": 0
    }
  },
  "Item": {
    "types": ["item", "feature", "spell"],
    "templates": {
      "base": {
        "description": ""
      }
    },
    "item": {
      "templates": ["base"],
      "quantity": 1,
      "weight": 0,
      "formula": "d20 + @str.mod + ceil(@lvl / 2)"
    },
    "feature": {
      "templates": ["base"]
    },
    "spell": {
      "templates": ["base"],
      "spellLevel": 1
    }
  }
} */

export interface ImportActor {
  name: string;
  biography: string;
  health: {
    value: number;
    min: number;
    max: number;
  };
}

export function parseHealth(line: string) {
  // line: Hit Points 66 (12d8 + 12)
  // get string from between parentheses
  console.log(`line: ${line}`);
  // match = (12d8 + 12),12d8 + 12
  const formulaArray = line.match(/\(([^)]+)\)/);
  if (!formulaArray || formulaArray.length < 2) {
    throw new Error(`Could not parse health from line: ${line}`);
  }
  // pull formula from match
  const formula = formulaArray[1];

  let dieFormula = '';
  let change = '';
  if (formula.includes('+')) {
    dieFormula = formula.split('+')[0];
    change = formula.split('+')[1];
  } else if (formula.includes('-')) {
    dieFormula = formula.split('-')[0];
    change = '-' + formula.split('-')[1];
  } else {
    dieFormula = formula;
    change = '0';
  }

  const numOfDice = dieFormula.split('d')[0];
  const dieSize = dieFormula.split('d')[1];

  // get value after Hit Points string
  const hp = line.match(/Hit Points (.*)/) || '10';
  return {
    value: parseInt(hp[1], 10),
    min: Number(numOfDice) + Number(change),
    max: Number(numOfDice) * Number(dieSize) + Number(change),
  };
}

export function textToActor(input: string): ImportActor {
  const lines = input.split('\n');
  const healthLine = lines.find((line) => line.includes('Hit Points')) || '(1d6 + 1)';
  return {
    name: lines[0].trim(),
    biography: lines[1].trim(),
    health: parseHealth(healthLine),
  };
}
