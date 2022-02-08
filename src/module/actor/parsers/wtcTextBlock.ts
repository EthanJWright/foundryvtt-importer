import {
  Abilities,
  Ability,
  ActorType,
  Alignment,
  ArmorClass,
  Biography,
  Condition,
  DamageType,
  Feature,
  Group,
  Health,
  Languages,
  Name,
  Rating,
  Senses,
  Size,
  Skill,
} from '../interfaces';

const FEATURE_HEADERS = ['Actions', 'Reactions'];

export function parseGenericFormula(line: string, regexStart: RegExp) {
  // line: Hit Points 66 (12d8 + 12)
  // get string from between parentheses
  // match = (12d8 + 12),12d8 + 12
  const formulaArray = line.match(/\(([^)]+)\)/);
  const regexSplit = line.split(regexStart);
  const beforeRegex = regexSplit[0];
  const afterRegex = regexSplit[1];
  let dieFormula = '';
  let change = '';
  let formula = undefined;
  if (!formulaArray || formulaArray.length < 2) {
    console.log(`Could not parse formula from string: ${line}`);
  } else {
    // pull formula from match
    formula = formulaArray[1];

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
  }

  const numOfDice = dieFormula.split('d')[0];
  const dieSize = dieFormula.split('d')[1];

  // get value after Hit Points string
  const hp = line.match(regexStart) || '10';
  let afterFormula: string | undefined;
  let beforeFormula: string | undefined;
  if (formula) {
    const formulaSplit: string[] = line.split(formula).map((item) => item.replace('(,', '').replace(')', ''));
    afterFormula = formulaSplit[1];
    beforeFormula = formulaSplit[0];
  }
  return {
    value: parseInt(hp[1]),
    min: Number(numOfDice) + Number(change),
    max: Number(numOfDice) * Number(dieSize) + Number(change),
    str: formula,
    afterRegex,
    beforeRegex,
    mod: Number(change),
    afterFormula,
    beforeFormula,
  };
}

export function parseHealthWTC(lines: string[]) {
  const healthLine = lines.find((line) => line.includes('Hit Points')) || '(1d6 + 1)';
  const health = parseGenericFormula(healthLine, /Hit Points (.*)/);
  if (!(health as Health).value) {
    throw new Error('Could not parse health from line: ' + healthLine);
  }
  return health;
}

export function parseNameWTC(lines: string[]): Name {
  return lines[0].trim();
}

export function parseACWTC(lines: string[]): ArmorClass {
  const acString = lines.find((line) => line.includes('Armor Class')) || 'Armor Class 12';
  if (!acString || typeof acString !== 'string') {
    throw new Error('Could not find AC line');
  }
  // acString: Armor Class 17 (natural armor)
  // get string from between parentheses
  let ac = 'Natural Armor';
  if (acString.includes('(')) {
    const acArray = acString.match(/\(([^)]+)\)/);
    if (!acArray || acArray.length < 1) {
      throw new Error(`Could not parse armor type from string: ${acString} | array was: ${acArray}`);
    }
    // pull formula from match
    ac = acArray.length > 1 ? acArray[1] : 'Natural Armor';
  }
  // find number in string
  const acNumber = acString.match(/\d+/);
  if (!acNumber || acNumber.length < 1) {
    throw new Error(`Could not parse AC from string: ${acString} | number was: ${acNumber}`);
  }
  return {
    value: Number(acNumber[0]),
    type: ac,
  };
}

function parseAbilityScore(score: number, mod: string): Ability {
  let modNumber = 0;
  if (mod.includes('-') || mod.includes('–')) {
    // extract number from the string
    const modNumberString = mod.match(/\d+/) || '0';
    modNumber = -1 * Number(modNumberString[0]);
  } else {
    modNumber = Number(mod);
  }
  return {
    value: score,
    mod: modNumber,
    savingThrow: 0,
  };
}

function isAbilityLine(line: string) {
  let isAbilityLine = true;
  isAbilityLine = isAbilityLine && line.toUpperCase().includes('STR');
  isAbilityLine = isAbilityLine && line.toUpperCase().includes('DEX');
  isAbilityLine = isAbilityLine && line.toUpperCase().includes('CON');
  isAbilityLine = isAbilityLine && line.toUpperCase().includes('INT');
  isAbilityLine = isAbilityLine && line.toUpperCase().includes('WIS');
  isAbilityLine = isAbilityLine && line.toUpperCase().includes('CHA');
  return isAbilityLine;
}

function containsAbility(line: string) {
  const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  return (
    abilities.findIndex((ability) => {
      return line.trim().toUpperCase() === ability;
    }) !== -1
  );
}

function extractAbilityValues(valueLine: string): { abilities: number[]; modifiers: string[] } {
  const abilityValuesWithSpaces = valueLine.split(' ');
  const abilityValues = abilityValuesWithSpaces.filter((item) => item.length > 0);
  const abilities: number[] = [];
  const modifiers: string[] = [];
  abilityValues.forEach((value) => {
    if (value.includes('(')) {
      modifiers.push(value.replace('(', '').replace(')', '').trim());
    } else {
      abilities.push(parseInt(value));
    }
    while (abilities.length > modifiers.length + 1) {
      modifiers.push('(+0)');
    }
  });
  return { abilities, modifiers };
}

function zipStats(abilityKeys: string[], abilities: number[], modifiers: string[]): Abilities {
  return abilityKeys.reduce(
    (obj, k, i) => ({ ...obj, [k.toLowerCase()]: parseAbilityScore(abilities[i], modifiers[i]) }),
    {},
  ) as Abilities;
}

export function parseStatsWTC(inputList: string[]) {
  const abilityLine = inputList.find(isAbilityLine);
  if (!abilityLine) {
    throw new Error('Could not find ability line');
  }
  const abilityIndex = inputList.indexOf(abilityLine);
  const singleLine = /str/i.test(abilityLine);
  if (singleLine) {
    // match 3 to 6 letters
    const abilityKeys = abilityLine.match(/\w{3,7}/g);
    if (!abilityKeys || abilityKeys.length < 6) {
      throw new Error('Could not find ability keys');
    }
    const valueLine = inputList[abilityIndex + 1];
    const { abilities, modifiers } = extractAbilityValues(valueLine);
    return zipStats(abilityKeys, abilities, modifiers);
  }
  throw new Error('Could not parse ability line');
}

function indexOfAbility(lines: string[], ability: string): number {
  let firstIndex = 0;
  lines.forEach((line, index) => {
    if (line.trim().toLowerCase() === ability.trim().toLowerCase()) firstIndex = index;
  });
  return firstIndex;
}

function parseMod(line: string) {
  const components = line.split(' ');
  return {
    value: Number(components[0]),
    mod: Number(components[1].replace('(', '').replace(')', '')),
    savingThrow: 0,
  };
}

export function findStatBounds(input: string[]): { lastLine: number; firstLine: number } {
  const lines = new Array(...input);
  const firstLine = lines.findIndex((line) => {
    return line.trim().toLowerCase() === 'str';
  });
  if (!firstLine) {
    throw new Error('Could not find first line');
  }
  const remainingLines = lines.splice(firstLine, lines.length);
  const lastLine =
    remainingLines.findIndex((line) => {
      const trimArray = line.trim().split(' ');
      return trimArray.length > 3;
    }) + firstLine;
  if (!lastLine) {
    throw new Error('Could not find last line');
  }
  return { firstLine, lastLine };
}

export function parseMultilineStats(lines: string[]): Abilities {
  if (lines[indexOfAbility(lines, 'STR') + 1].trim().toUpperCase() === 'DEX') {
    throw new Error('Invalid format for multi line stat parsing.');
  }
  return {
    str: parseMod(lines[indexOfAbility(lines, 'STR') + 1]),
    dex: parseMod(lines[indexOfAbility(lines, 'DEX') + 1]),
    con: parseMod(lines[indexOfAbility(lines, 'CON') + 1]),
    int: parseMod(lines[indexOfAbility(lines, 'INT') + 1]),
    wis: parseMod(lines[indexOfAbility(lines, 'WIS') + 1]),
    cha: parseMod(lines[indexOfAbility(lines, 'CHA') + 1]),
  };
}

export function getVerticalKeyValueStats(input: string[]) {
  const { firstLine, lastLine } = findStatBounds(input);
  const lines = input.slice(firstLine, lastLine);
  const keyEndIndex = lines.findIndex((line) => {
    return !containsAbility(line);
  });
  const keys = lines.slice(0, keyEndIndex).map((line) => line.trim().toLowerCase());
  const values = lines.slice(keyEndIndex, keyEndIndex + 7).map((line) => line.trim().toLowerCase());
  return { keys, values };
}

export function parseVerticalKeyValueStats(input: string[]): Abilities {
  const { keys, values } = getVerticalKeyValueStats(input);
  const { abilities, modifiers } = extractAbilityValues(values.join(' '));
  return zipStats(keys, abilities, modifiers);
}

export function parseSpeedWTC(lines: string[]) {
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

export function parseSkillsWTC(lines: string[]): Skill[] {
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

export function addSavingThrows(lines: string[], abilities: Abilities): Abilities {
  const savingThrowsLine = lines.find((line) => line.toUpperCase().includes('SAVING THROWS'));
  if (!savingThrowsLine) {
    return abilities;
  }
  const savingThrowsArray = savingThrowsLine.replace('Saving Throws', '').trim().split(' ');
  const abilityList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  savingThrowsArray.forEach((check, index) => {
    if (abilityList.includes(check.toLowerCase())) {
      const strNumber = savingThrowsArray[index + 1].replace('+', '');
      const parsedNumber = parseInt(strNumber);
      if (check.toLowerCase() === 'str') {
        abilities.str.savingThrow = parsedNumber - abilities.str.mod;
      } else if (check.toLowerCase() === 'dex') {
        abilities.dex.savingThrow = parsedNumber - abilities.dex.mod;
      } else if (check.toLowerCase() === 'con') {
        abilities.con.savingThrow = parsedNumber - abilities.con.mod;
      } else if (check.toLowerCase() === 'int') {
        abilities.int.savingThrow = parsedNumber - abilities.int.mod;
      } else if (check.toLowerCase() === 'wis') {
        abilities.wis.savingThrow = parsedNumber - abilities.wis.mod;
      } else if (check.toLowerCase() === 'cha') {
        abilities.cha.savingThrow = parsedNumber - abilities.cha.mod;
      }
    }
  });
  return abilities;
}

export function parseStandardCSV(lines: string[], name: string): Group {
  let standardLine = lines.find((line) => line.toUpperCase().includes(name.toUpperCase()));
  if (!standardLine) {
    throw new Error(`${name} not found`);
  }
  const rePattern = new RegExp(`${name}`, 'gi');
  standardLine = standardLine.replace(rePattern, '');
  return {
    name,
    collection: standardLine.split(',').map((value) => value.trim()),
  };
}

function extractFeature(checking: string): Feature | undefined {
  if (checking.match(/\.\s\w{3,}/)) {
    const [name, ...rest] = checking.split(/(?=\.)/);
    return {
      name: name.trim(),
      description: rest.join('').trim().replace(/\n/g, ' ').replace(/^\. /, ''),
    };
  }
  return undefined;
}

export function parseFeaturesFromBlock(lines: string[], startIndex: number): Feature[] {
  const features: Feature[] = [];
  for (let i = startIndex; i < lines.length; i++) {
    const checking = lines[i];
    // see if checking has a . followed by 3 or more words
    const feature = extractFeature(checking);
    if (feature) {
      features.push(feature);
      continue;
    }
    return features;
  }
  return features;
}

function isFeatureHeader(check: string) {
  return FEATURE_HEADERS.reduce(
    (acc, feature) => acc || feature.toUpperCase().trim() === check.trim().toUpperCase(),
    false,
  );
}

function getFeatureLines(lines: string[]): number[] {
  return lines.reduce((acc: number[], curr: string, index: number) => {
    if (isFeatureHeader(curr)) acc.push(index);
    return acc;
  }, []);
}

export function getFeatureNames(line: string): string | undefined {
  // match 1 or 2 words in a row that start with a capital letters and ending
  // in a period
  const re = /\b[A-Z]{1}[a-z]{1,}\b\./g;
  // pull out any () as sometimes the name will end with (2/day). and throw off
  // regex
  const matches = line.replace(')', '').match(re);
  if (matches) {
    const name = line.split('.')[0];
    // If our regex didn't grab a match at the beginning of the line, return
    if (name.trim().split(' ').length > 3) {
      return;
    }
    return name;
  }

  return undefined;
}

interface Section {
  name: string;
  features: Feature[];
}

function reduceToFeatures(acc: string[], curr: string) {
  const names = getFeatureNames(curr);
  if (names || acc.length === 0) {
    acc.push(curr.trim());
  } else {
    // if the line was a continuation, dont add a space
    const bindWith = acc[acc.length - 1].endsWith('-') ? '' : ' ';
    // if line ended with a - for a continuation, remove it
    if (acc[acc.length - 1].endsWith('-')) {
      acc[acc.length - 1] = acc[acc.length - 1].slice(0, -1);
    }
    acc[acc.length - 1] = acc[acc.length - 1].trim() + bindWith + curr.trim();
  }
  acc[acc.length - 1] = acc[acc.length - 1].trim();
  return acc;
}

function featureStringsToFeatures(line: string) {
  const fetchedName = getFeatureNames(line);
  let name;
  if (!fetchedName) name = 'Unknown Name';
  else name = fetchedName.trim();

  let cleanLine = line.replace(name, '').trim();
  if (cleanLine.startsWith('.')) cleanLine = cleanLine.substring(1);
  if (cleanLine.startsWith(' ')) cleanLine = cleanLine.substring(1);
  const feature: Feature = {
    name,
    description: cleanLine,
  };
  return feature;
}
function cleanSectionElements(section: string[], sectionTitle: string): Feature[] {
  const formatted: string[] = section.map((line: string) => line.replace(sectionTitle, '').trim()).filter((n) => n);
  const preparedLines = formatted.reduce(reduceToFeatures, []);
  return preparedLines.map(featureStringsToFeatures);
}

function buildSections(featureLine: number[], featureSections: string[][], lines: string[]): Section[] {
  const sections: Section[] = [];
  featureLine.forEach((value: number, index: number) => {
    sections.push({
      name: lines[value].trim(),
      features: cleanSectionElements(featureSections[index], lines[value]),
    });
  });
  return sections;
}

function parseFeatureSection(lines: string[]) {
  let firstFeatureIndex = 0;
  lines.forEach((line, index) => {
    const name = getFeatureNames(line);
    if (name && firstFeatureIndex === 0) firstFeatureIndex = index;
  });
  const validFeatures = lines.slice(firstFeatureIndex);
  const features: Feature[] = cleanSectionElements(validFeatures, 'Features');
  const featureSection: Section = {
    name: 'Features',
    features,
  };
  return featureSection;
}

export function featureFromSection(sections: Section[], match: string): Section {
  return (
    sections.find(({ name }) => {
      return name.toUpperCase() === match.toUpperCase();
    }) || { features: [], name: 'No matching feature' }
  );
}

export function parseFeatureSections(text: string): Section[] {
  const lines = text.split('\n');
  const featureLine = getFeatureLines(lines);
  // create start and end indexes for each featureLine
  const featureSections = featureLine.reduce((acc: string[][], value, index) => {
    if (index === 0) {
      acc.push(lines.slice(0, featureLine[index]));
    }

    if (featureLine.length >= index + 1) {
      if (lines.length >= featureLine[index + 1]) {
        acc.push(lines.slice(value, featureLine[index + 1]));
      } else {
        acc.push(lines.slice(value, lines.length));
      }
    }
    return acc;
  }, []);
  const features = featureSections.shift();
  if (!features) throw new Error('Could not parse first feature section');
  const featureSection = parseFeatureSection(features);
  const sections = buildSections(featureLine, featureSections, lines);
  return [featureSection, ...sections];
}

export function findFirstSectionIndex(lines: string[], term: string): number {
  let firstMatch = 0;
  lines.forEach((line) => {
    if (line.toUpperCase().includes(term.toUpperCase()) && line.split(' ').length < 3) {
      firstMatch = lines.indexOf(line);
    }
  });
  if (firstMatch === 0) {
    return -1;
  }
  return firstMatch + 1;
}

export function tryStatParsers(lines: string[]): Abilities {
  let stats: Abilities | undefined;
  try {
    stats = parseStatsWTC(lines);
  } catch (error) {
    try {
      stats = parseMultilineStats(lines);
    } catch {
      stats = parseVerticalKeyValueStats(lines);
    }
  }
  if (!stats) throw new Error('could not parse stats.');
  return stats;
}
export function parseBiographyWTC(lines: string[]): Biography {
  let firstBioIndex = -1;
  lines.forEach((line: string, index: number) => {
    if (firstBioIndex === -1 && line.toUpperCase().includes('MEDIUM' || 'LARGE' || 'TINY')) {
      firstBioIndex = index;
    }
  });
  if (firstBioIndex === -1) {
    throw new Error('Could not find a valid biography');
  }
  return lines[firstBioIndex].trim();
}

export function parseRatingWTC(lines: string[]): Rating {
  const challengeLine = lines.find((line) => line.includes('Challenge'));
  if (!challengeLine) throw new Error('could not parse challenge');
  // challengeLine : Challenge 1 (200 XP)
  // get the first number in the line
  const ratingString = challengeLine.split(' ')[1];
  let cr = 0;
  if (ratingString.includes('/')) {
    const [num, denom] = ratingString.split('/');
    cr = Number(num) / Number(denom);
  } else {
    cr = Number(ratingString);
  }
  // get the number in the parentheses
  const xp = Number(challengeLine.split('(')[1].split(')')[0].replace('xp', '').replace('XP', '').replace(',', ''));
  return {
    cr,
    xp,
  };
}

function getListRelated(to: string, inStrings: string[]) {
  const conditionImmunityLineIndex = inStrings.findIndex((line) => line.toLowerCase().includes(to)) || -1;
  if (conditionImmunityLineIndex === -1) return;
  let conditionImmunityLine = inStrings[conditionImmunityLineIndex];
  const remainingLines = inStrings.slice(conditionImmunityLineIndex + 1);
  let iter = 0;
  while (containsMoreItems(remainingLines[iter])) {
    conditionImmunityLine = conditionImmunityLine + ' ' + remainingLines[iter];
    iter++;
  }
  return conditionImmunityLine;
}

export function parseDamageImmunitiesWTC(lines: string[]) {
  const damageImmunityLine = getListRelated('damage immunities', lines);
  if (!damageImmunityLine) return [];
  return damageImmunityLine
    .replace('Damage Immunities', '')
    .replace('and', '')
    .trim()
    .split(',')
    .map((immunity) => immunity.trim())
    .filter((line) => line !== '') as DamageType[];
}

export function parseDamageResistancesWTC(lines: string[]) {
  const damageLine = getListRelated('damage resistances', lines);
  if (!damageLine) return [];
  return damageLine
    .replace('Damage Resistances', '')
    .replace('and', '')
    .trim()
    .split(',')
    .map((immunity) => immunity.trim())
    .filter((line) => line !== '') as DamageType[];
}

function containsMoreItems(line: string) {
  return line.split(',').length > 1 && line.split(',')[0].trim().split(' ').length === 1;
}

export function parseConditionImmunitiesWTC(lines: string[]) {
  const conditionImmunityLine = getListRelated('condition immunities', lines);
  if (!conditionImmunityLine) return [];
  return conditionImmunityLine
    .replace('Condition Immunities', '')
    .replace('and', '')
    .trim()
    .split(',')
    .map((condition) => condition.trim())
    .filter((line) => line !== '') as Condition[];
}

export function parseDamageVulnerabilitiesWTC(lines: string[]) {
  const damage = getListRelated('damage vulnerabilities', lines);
  if (!damage) return [];
  return damage
    .replace('Damage Vulnerabilities', '')
    .replace('and', '')
    .trim()
    .split(',')
    .map((condition) => condition.trim())
    .filter((line) => line !== '') as DamageType[];
}

export function parseFeaturesWTC(lines: string[]): Feature[] {
  const firstFeatureLine = lines.findIndex((line) => getFeatureNames(line) !== undefined);
  const featureLines = lines.slice(firstFeatureLine);
  const featureStrings: string[] = featureLines.reduce(reduceToFeatures, []);
  return featureStrings.map(featureStringsToFeatures);
}

export function parseSensesWTC(lines: string[]): Senses {
  const sensesLine = lines.find((line) => line.toLowerCase().includes('senses')) || '';
  const rawSenses = sensesLine.replace('Senses', '').replace('and', '').trim().split(',');
  const senses: Senses = { units: 'ft' };
  rawSenses.forEach((sense) => {
    if (sense === '') return;
    try {
      let [text, special] = [sense, ''];
      // remove parens and get text inside
      if (sense.includes('(')) {
        [text, special] = sense.split('(');
        senses.special = special.replace(')', '');
      }
      // get number from string of form darkvision 60ft
      const number = text.split(' ')[1].replace('ft', '');
      const senseText = sense.split(' ')[0];
      switch (senseText) {
        case 'darkvision':
          senses.darkvision = Number(number);
          break;
        case 'blindsight':
          senses.blindsight = Number(number);
          break;
        case 'tremorsense':
          senses.tremorsense = Number(number);
          break;
        case 'truesight':
          senses.truesight = Number(number);
          break;
        case 'passive perception':
          senses.passivePerception = Number(number);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(`Could not parse senses line: ${sense} | error ${error}`);
    }
  });
  senses.units = 'ft';
  return senses;
}

function getDescriptionLine(lines: string[]): string {
  const candidateLines = lines.slice(0, 8);
  const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
  let descriptionLine = '';
  sizes.forEach((size) => {
    const potentialMatch =
      candidateLines.find((line) => {
        return line.toLowerCase().includes(size.toLowerCase());
      }) || '';
    if (potentialMatch !== '') {
      descriptionLine = potentialMatch;
    }
  });
  return descriptionLine;
}

export function parseSizeWTC(lines: string[]): Size {
  const candidateLines = lines.slice(0, 8);
  const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
  const size = sizes.find((size) => {
    const sizeInLine =
      candidateLines.findIndex((line) => {
        const includes = line.toLowerCase().includes(size.toLowerCase());
        return includes;
      }) !== -1;
    if (sizeInLine) {
    }
    return sizeInLine;
  });
  if (!size) throw new Error('Could not parse size');
  return size as Size;
}

export function parseTypeWTC(lines: string[]): ActorType {
  const descriptionLine = getDescriptionLine(lines);
  // type is in string before parens and before comma
  if (descriptionLine.includes('(')) {
    const type = descriptionLine.split('(')[0].trim().split(' ').pop();
    if (!type) throw new Error(`Could not parse type from ${descriptionLine}`);
    return type as ActorType;
  }
  const type = descriptionLine.split(',')[0].trim().split(' ').pop();
  if (!type) throw new Error(`Could not parse type from ${descriptionLine}`);
  return type;
}

function capitalizeBeginings(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

export function parseAlignmentWTC(lines: string[]): Alignment {
  const descriptionLine = getDescriptionLine(lines);
  return capitalizeBeginings(descriptionLine.split(',')[1].trim().toLowerCase());
}

export function parseLanguagesWTC(lines: string[]): Languages {
  const languageLine = lines.find((line) => line.toLowerCase().includes('languages')) || '';
  if (!languageLine) throw new Error(`Could not find language line in ${lines}`);
  const languages = languageLine.replace('Languages', '').replace('and', '').trim().split(',');
  return languages.map((language) => language.trim().toLowerCase());
}
