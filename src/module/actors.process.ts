interface Ability {
  value: number;
  mod: number;
}

interface Abilities {
  str: Ability;
  dex: Ability;
  con: Ability;
  int: Ability;
  wis: Ability;
  cha: Ability;
}
interface Skill {
  name: string;
  bonus: number;
}

interface ArmorClass {
  value: number;
  type: string;
}

interface Feature {
  name: string;
  description: string;
}

export interface ImportActor {
  name: string;
  biography: string;
  health: {
    value: number;
    min: number;
    max: number;
  };

  armorClass: ArmorClass;
  stats: Abilities;
  speed: number;
  skills: Skill[];
}

export function parseHealth(line: string) {
  // line: Hit Points 66 (12d8 + 12)
  // get string from between parentheses
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

export function parseAC(acString: string): ArmorClass {
  // acString: Armor Class 17 (natural armor)
  // get string from between parentheses
  const acArray = acString.match(/\(([^)]+)\)/);
  if (!acArray || acArray.length < 2) {
    throw new Error(`Could not parse AC from string: ${acString}`);
  }
  // pull formula from match
  const ac = acArray[1];
  // find number in string
  const acNumber = acString.match(/\d+/);
  if (!acNumber || acNumber.length < 1) {
    throw new Error(`Could not parse AC from string: ${acString}`);
  }
  return {
    value: Number(acNumber[0]),
    type: ac,
  };
}

function parseAbilityScore(score: number, mod: string): Ability {
  // score: 12
  // mod: (+2)
  // get string from between parentheses
  const modNumberArray = mod.match(/\d+/);
  if (!modNumberArray || modNumberArray.length < 1) {
    throw new Error(`Could not parse ability score from string: ${mod}`);
  }
  let modNumber = modNumberArray[0];
  if (mod.includes('-')) {
    modNumber = '-' + modNumber;
  }

  return {
    value: score,
    mod: Number(modNumber),
  };
}

export function parseStats(inputList: string[]) {
  const abilityLine = inputList.find((line) => line.toUpperCase().includes('CHA'));
  if (!abilityLine) {
    throw new Error('Could not find ability line');
  }
  const abilityIndex = inputList.indexOf(abilityLine);
  const singleLine = abilityLine.includes('STR');
  if (singleLine) {
    // match 3 to 6 letters
    const abilityKeys = abilityLine.match(/\w{3,7}/g);
    if (!abilityKeys || abilityKeys.length < 6) {
      throw new Error('Could not find ability keys');
    }
    const valueLine = inputList[abilityIndex + 1];
    // match 1 to 2 numbers
    const abilityValuesWithMods = valueLine.match(/\d{1,2}/g);
    if (!abilityValuesWithMods || abilityValuesWithMods.length < 6) {
      throw new Error('Could not find ability values');
    }
    const abilityValues: number[] = [];
    abilityValuesWithMods.forEach((value, index) => {
      if (index % 2 === 0) {
        abilityValues.push(Number(value));
      }
    });
    // match + numbers in parentheses
    const abilityModifiers = valueLine.match(/\(([+-]\d+)\)/g);
    if (!abilityModifiers || abilityModifiers.length < 6) {
      throw new Error('Could not find ability modifiers');
    }
    if (!abilityValues || abilityValues.length < 6) {
      throw new Error('Could not find ability values');
    }
    const zipped = abilityKeys.reduce(
      (obj, k, i) => ({ ...obj, [k.toLowerCase()]: parseAbilityScore(abilityValues[i], abilityModifiers[i]) }),
      {},
    );
    return zipped as Abilities;
  }
  throw new Error('Could not parse ability line');
}

export function parseSpeed(lines: string[]) {
  const speedLine = lines.find((line) => line.toUpperCase().includes('SPEED'));
  if (!speedLine) {
    throw new Error('Could not find speed line');
  }
  const speed = speedLine.match(/\d+/);
  if (!speed || speed.length < 1) {
    throw new Error('Could not find speed');
  }
  return Number(speed[0]);
}

export function parseSkills(lines: string[]): Skill[] {
  let skillLine = lines.find((line) => line.toUpperCase().includes('SKILL'));
  if (!skillLine) {
    throw new Error('Could not find skill line');
  }
  skillLine = skillLine.replace(/skills/i, '');
  const skillKeys = skillLine.match(/\w{3,13}/g);
  if (!skillKeys || skillKeys.length < 1) {
    throw new Error('Could not find skill keys');
  }
  const skillValues = skillLine.match(/\d+/g);
  if (!skillValues || skillValues.length < 1) {
    throw new Error('Could not find skill values');
  }

  const skills = skillKeys.map((value, index) => {
    return {
      name: value.toLowerCase(),
      bonus: Number(skillValues[index]),
    };
  });
  return skills;
}

export function findFirstFeatureIndex(lines: string[]) {
  let firstMatch = 0;
  lines.forEach((test, index) => {
    // check to see if test has a . followed by 3 or more words
    if (test.match(/\.\s\w{3,}/) && firstMatch === 0) {
      // if so, this is the first match
      firstMatch = index;
    }
  });
  return firstMatch;
}

export function parseFeatures(lines: string[]): Feature[] {
  const startIndex = findFirstFeatureIndex(lines);
  const features: Feature[] = [];
  for (let i = startIndex; i < lines.length; i++) {
    const checking = lines[i];
    // see if checking has a . followed by 3 or more words
    if (checking.match(/\.\s\w{3,}/)) {
      const [name, ...rest] = checking.split('.');
      features.push({
        name: name.trim(),
        description: rest.join('').trim().replace(/\n/g, ' ') + '.',
      });
      continue;
    }
    return features;
  }
  return features;
}

export function findFirstActionIndex(lines: string[]): number {
  let firstMatch = 0;
  lines.forEach((line) => {
    if (line.toUpperCase().includes('ACTION') && line.split(' ').length < 3) {
      firstMatch = lines.indexOf(line);
    }
  });
  return firstMatch + 1;
}

export function textToActor(input: string): ImportActor {
  const lines = input.split('\n');
  const healthLine = lines.find((line) => line.includes('Hit Points')) || '(1d6 + 1)';
  const acLine = lines.find((line) => line.includes('Armor Class')) || 'Armor Class 12';
  if (!acLine || typeof acLine !== 'string') {
    throw new Error('Could not find AC line');
  }
  return {
    name: lines[0].trim(),
    biography: lines[1].trim(),
    health: parseHealth(healthLine),
    armorClass: parseAC(acLine),
    stats: parseStats(lines),
    speed: parseSpeed(lines),
    skills: parseSkills(lines),
  };
}
