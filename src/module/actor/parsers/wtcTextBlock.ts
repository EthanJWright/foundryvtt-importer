import { parseItem } from '../../item/parsers';
import { getMaxAbility } from '../convert';
import {
  Abilities,
  Ability,
  ActorType,
  Alignment,
  ArmorClass,
  Biography,
  ConditionTypes,
  DamageType,
  DamageTypes,
  Feature,
  Features,
  Group,
  Health,
  ImportActorParser,
  ImportItems,
  isAbilities,
  Languages,
  Name,
  Rating,
  Senses,
  Size,
  Skill,
} from '../interfaces';
import { parseGenericFormula } from './generic';

const FEATURE_SECTIONS = ['Actions', 'Features'];

export const ParseActorWTC: ImportActorParser = {
  parseName: [parseNameWTC],
  parseRating: [parseRatingWTC],
  parseType: [parseTypeWTC],
  parseAlignment: [parseAlignmentWTC],
  parseBiography: [parseBiographyWTC],
  parseLanguages: [parseLanguagesWTC],
  parseSize: [parseSizeWTC],
  parseHealth: [parseHealthWTC],
  parseSenses: [parseSensesWTC],
  parseArmorClass: [parseACWTC],
  parseDamageImmunities: [parseDamageImmunitiesWTC],
  parseDamageResistances: [parseDamageResistancesWTC],
  parseConditionImmunities: [parseConditionImmunitiesWTC],
  parseDamageVulnerabilities: [parseDamageVulnerabilitiesWTC],
  parseAbilities: [
    parseAbilitiesWTC,
    parseMultilineAbilitiesWTC,
    parseVerticalKeyValueAbilitiesWTC,
    parseVerticalNameValModFormatWTC,
  ],
  parseSpeed: [parseSpeedWTC],
  parseSkills: [parseSkillsWTC],
  parseItems: [parseItemsWTC],
};

export function parseHealthWTC(lines: string[]) {
  const healthLine = lines.find((line) => line.includes('Hit Points')) || '(1d6 + 1)';
  const { min, max, str, value } = parseGenericFormula(healthLine, /Hit Points (.*)/);
  const health = {
    min,
    max,
    value,
    formula: str,
  };
  if (!(health as Health).value) {
    throw new Error('Could not parse health from line: ' + healthLine);
  }
  return health;
}

export function parseNameWTC(lines: string[]): Name {
  return lines[0].trim();
}

export function parseACWTC(lines: string[]): ArmorClass {
  const acString = lines.find((line) => line.includes('Armor Class'));
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
  if (!line) return false;
  const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  return (
    abilities.findIndex((ability) => {
      return line.trim().toUpperCase() === ability;
    }) !== -1
  );
}

function extractAbilityValues(valueLine: string): { abilities: number[]; modifiers: string[] } {
  let abilityValuesWithSpaces = valueLine.split(' ');
  // if there is weird formatting such as no space between the value and parens
  // like 7(-2), split using parens as well
  if (abilityValuesWithSpaces.length < 12) {
    abilityValuesWithSpaces = abilityValuesWithSpaces.flatMap((value) => value.split(/(?=\()/));
  }
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

export function parseAbilitiesWTC(inputList: string[]): Abilities {
  const abilityLine = inputList.find(isAbilityLine);
  if (!abilityLine) {
    throw new Error('Could not find ability line');
  }
  const abilityIndex = inputList.indexOf(abilityLine);
  const singleLine = /str/i.test(abilityLine);
  if (!singleLine) {
    throw new Error('Could not parse abilities from parseAbilitiesWTC');
  }

  // match 3 to 6 letters
  const abilityKeys = abilityLine.match(/\w{3,7}/g);
  if (!abilityKeys || abilityKeys.length < 6) {
    throw new Error('Could not find ability keys');
  }
  const valueLine = inputList[abilityIndex + 1];
  const { abilities, modifiers } = extractAbilityValues(valueLine);
  const finalAbilities = zipStats(abilityKeys, abilities, modifiers);
  if (!isAbilities(finalAbilities)) {
    throw new Error('Could not parse abilities from parseAbilitiesWTC');
  }
  return finalAbilities;
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

export function findAbilityBounds(input: string[]): { lastLine: number; firstLine: number } {
  const lines = new Array(...input);
  const firstLine = lines.findIndex((line) => {
    return line.trim().toLowerCase() === 'str';
  });
  if (firstLine === undefined) {
    throw new Error('Could not find first line');
  }
  const remainingLines = lines.slice(firstLine, lines.length);
  let lastLine =
    remainingLines.findIndex((line) => {
      const trimArray = line.trim().split(' ');
      return trimArray.length > 3;
    }) + firstLine;
  if (lastLine === -1) {
    lastLine = lines.length;
  }
  return { firstLine, lastLine };
}

export function parseMultilineAbilitiesWTC(lines: string[]): Abilities {
  if (lines[indexOfAbility(lines, 'STR') + 1].trim().toUpperCase() === 'DEX') {
    throw new Error('Invalid format for multi line stat parsing.');
  }
  const parsed = {
    str: parseMod(lines[indexOfAbility(lines, 'STR') + 1]),
    dex: parseMod(lines[indexOfAbility(lines, 'DEX') + 1]),
    con: parseMod(lines[indexOfAbility(lines, 'CON') + 1]),
    int: parseMod(lines[indexOfAbility(lines, 'INT') + 1]),
    wis: parseMod(lines[indexOfAbility(lines, 'WIS') + 1]),
    cha: parseMod(lines[indexOfAbility(lines, 'CHA') + 1]),
  };
  if (!isAbilities(parsed)) {
    throw new Error('Could not parse abilities from parseMultilineAbilitiesWTC');
  }
  return parsed;
}

export function getVerticalKeyValueAbilities(input: string[]) {
  const { firstLine, lastLine } = findAbilityBounds(input);
  const lines = input.slice(firstLine, lastLine);
  const keyEndIndex = lines.findIndex((line) => {
    return !containsAbility(line);
  });
  const keys = lines.slice(0, keyEndIndex).map((line) => line.trim().toLowerCase());
  const values = lines.slice(keyEndIndex, keyEndIndex + 6).map((line) => line.trim().toLowerCase());
  return { keys, values };
}

export function parseVerticalKeyValueAbilitiesWTC(input: string[]): Abilities {
  const { keys, values } = getVerticalKeyValueAbilities(input);
  const { abilities, modifiers } = extractAbilityValues(values.join(' '));
  const zipped = zipStats(keys, abilities, modifiers);
  if (!isAbilities(zipped)) {
    throw new Error('Could not parse abilities with parseVerticalKeyValueAbilitiesWTC');
  }
  return zipped;
}

const ABILITIES_WTC = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
export function parseVerticalNameValModFormatWTC(input: string[]): Abilities {
  const { firstLine, lastLine } = findAbilityBounds(input);
  const lines = input.slice(firstLine, lastLine);
  const removedAbilities = lines.filter((line) => !containsAbility(line));
  const { abilities, modifiers } = extractAbilityValues(removedAbilities.join(' '));
  const parsed = zipStats(ABILITIES_WTC, abilities, modifiers);
  if (!isAbilities(parsed)) {
    throw new Error('Could not parse abilities with parseVerticalNameValModFormatWTC');
  }
  return parsed;
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

export function getFeatureName(line: string): string | undefined {
  // match 1 or 2 words in a row that start with a capital letters and ending
  // in a period
  const re = /\b[A-Z]{1}[a-z]{1,}\b\./g;
  // Remove parens and content inside, and leading space
  // Poison Recharge (5-6). Some text -> Poison Recharge. Some text
  const parenRegex = / \(([^)]+)\)/;
  const lineWithoutParens = line.replace(parenRegex, '');
  const matches = lineWithoutParens.replace(')', '').match(re);
  if (matches) {
    const name = line.split('.')[0];
    // If our regex didn't grab a match at the beginning of the line, return
    if (name.replace(parenRegex, '').trim().split(' ').length > 3) {
      return;
    }
    return name;
  }

  return undefined;
}

interface Section {
  name: string;
  description?: string;
  features: Feature[];
}

function reduceToFeatures(acc: string[], curr: string) {
  if (curr === 'Legendary Actions') {
    acc.push('Legendary Actions.');
    return acc;
  }
  if (FEATURE_SECTIONS.includes(curr)) {
    return acc;
  }
  const names = getFeatureName(curr);
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

function featureStringsToFeatures(line: string, sectionName: string) {
  const fetchedName = getFeatureName(line);
  let name;
  if (!fetchedName) name = sectionName;
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

export function featureFromSection(sections: Section[], match: string): Section {
  return (
    sections.find(({ name }) => {
      return name.toUpperCase() === match.toUpperCase();
    }) || { features: [], name: 'No matching feature' }
  );
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
  const conditionImmunityLineIndex = inStrings.findIndex((line) => line.toLowerCase().includes(to));
  if (conditionImmunityLineIndex === -1) return;
  let conditionImmunityLine = inStrings[conditionImmunityLineIndex];
  let remaining = inStrings;
  if (inStrings.length > conditionImmunityLineIndex) {
    remaining = inStrings.slice(conditionImmunityLineIndex + 1);
  }
  let iter = 0;
  while (containsMoreItems(remaining[iter])) {
    conditionImmunityLine = conditionImmunityLine + ' ' + remaining[iter];
    iter++;
  }
  return conditionImmunityLine;
}

/*
 * List name, i.e. 'damage immunities'
 */
function parseNamedList(lines: string[], listName: string): DamageTypes | ConditionTypes {
  const nameWithWordsCapitalized = listName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const listDataLine = getListRelated(listName, lines);
  if (!listDataLine) throw new Error(`could not parse ${listName}`);
  return listDataLine
    .replace(nameWithWordsCapitalized, '')
    .replace('and', '')
    .trim()
    .split(',')
    .map((value) => value.trim())
    .filter((line) => line !== '') as DamageType[];
}

export function parseDamageImmunitiesWTC(lines: string[]) {
  return parseNamedList(lines, 'damage immunities') as DamageTypes;
}

export function parseDamageResistancesWTC(lines: string[]) {
  return parseNamedList(lines, 'damage resistances') as DamageTypes;
}

function containsMoreItems(line: string) {
  if (!line) return false;
  return line.split(',').length > 1 && line.split(',')[0].trim().split(' ').length === 1;
}

export function parseConditionImmunitiesWTC(lines: string[]) {
  return parseNamedList(lines, 'condition immunities') as ConditionTypes;
}

export function parseDamageVulnerabilitiesWTC(lines: string[]) {
  return parseNamedList(lines, 'damage vulnerabilities') as DamageTypes;
}

export function parseFeaturesWTC(lines: string[]): Features {
  const firstFeatureLine = lines.findIndex((line) => getFeatureName(line) !== undefined);
  if (firstFeatureLine === -1) throw new Error('Could not find a valid feature');
  const featureLines = lines.slice(firstFeatureLine);
  const featureStrings: string[] = featureLines.reduce(reduceToFeatures, []);
  return featureStrings.map((line) => featureStringsToFeatures(line, 'Feature'));
}

export function parseItemsWTC(lines: string[], abilities: Abilities): ImportItems {
  const features = parseFeaturesWTC(lines);
  return features.map(({ name, description }) => parseItem(name, description, getMaxAbility(abilities)));
}

export function parseSensesWTC(lines: string[]): Senses {
  const sensesLine = lines.find((line) => line.toLowerCase().includes('senses')) || '';
  if (!sensesLine) throw new Error('Could not find senses');
  const rawSenses = sensesLine.replace('Senses', '').replace('and', '').trim().split(',');
  const senses: Senses = { units: 'ft' };
  rawSenses.forEach((sense) => {
    if (sense === '') return;
    let [text, special] = [sense, ''];
    // remove parens and get text inside
    if (sense.includes('(')) {
      [text, special] = sense.split('(');
      senses.special = special.replace(')', '');
    }
    // get number from string of form darkvision 60ft
    // get regex for number in text
    const numberRegex = /\d+/;
    const matches = text.match(numberRegex);
    let number = 0;
    if (!matches) {
      return;
    } else {
      number = Number(matches[0]);
    }
    if (/darkvision/.test(sense)) {
      senses.darkvision = number;
    } else if (/blindsignt/i.test(sense)) {
      senses.blindsight = number;
    } else if (/tremorsense/i.test(sense)) {
      senses.tremorsense = number;
    } else if (/truesight/i.test(sense)) {
      senses.truesight = number;
    } else if (/passive/i.test(sense)) {
      senses.passivePerception = number;
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
