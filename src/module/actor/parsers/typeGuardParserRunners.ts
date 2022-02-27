import {
  Abilities,
  ActorType,
  ActorTypes,
  Alignment,
  ArmorClass,
  Biography,
  ConditionTypes,
  DamageType,
  Feature,
  Features,
  Health,
  ImportActor,
  ImportActorParser,
  ImportItems,
  Languages,
  Name,
  Rating,
  Senses,
  Size,
  Skill,
  Speed,
} from '../interfaces';
import { addSavingThrows } from './wtcTextBlock';

export function trySingleActorParse(parser: ImportActorParser, lines: string[]): ImportActor {
  const abilities = tryParseAbilities(parser.parseAbilities, lines);
  return {
    name: tryNameParse(parser.parseName, lines),
    rating: tryRatingParse(parser.parseRating, lines),
    type: tryTypeParse(parser.parseType, lines),
    alignment: tryAlignmentParse(parser.parseAlignment, lines),
    biography: tryBiographyParse(parser.parseBiography, lines),
    languages: tryLanguageParse(parser.parseLanguages, lines),
    size: trySizeParse(parser.parseSize, lines),
    health: tryHealthParse(parser.parseHealth, lines),
    senses: trySensesParse(parser.parseSenses, lines),
    armorClass: tryParseArmorClass(parser.parseArmorClass, lines),
    damageImmunities: tryParseDamageImmunities(parser.parseDamageImmunities, lines),
    damageResistances: tryParseDamageResistances(parser.parseDamageResistances, lines),
    conditionImmunities: tryParseConditionImmunities(parser.parseConditionImmunities, lines),
    damageVulnerabilities: tryParseDamageVulnerabilities(parser.parseDamageVulnerabilities, lines),
    abilities,
    speed: tryParseSpeed(parser.parseSpeed, lines),
    skills: tryParseSkills(parser.parseSkills, lines),
    items: tryParseItems(parser.parseItems, lines, abilities),
  };
}

export function tryActorParse(parsers: ImportActorParser[], lines: string[]): ImportActor {
  const parserErrors = [];
  for (const parser of parsers) {
    try {
      return trySingleActorParse(parser, lines);
    } catch (error) {
      parserErrors.push(error);
    }
  }
  throw new Error(`Could not parse element: ${JSON.stringify(parserErrors.join('\n'), null, 2)}`);
}

export type ParserOutput = ActorTypes;
export type ActorParser = (input: string[]) => ParserOutput;

export function tryNameParse(parser: ActorParser, lines: string[]): Name {
  const name = parser(lines);
  if (typeof name !== 'string') {
    throw new Error(`Could not parse name: ${name}`);
  }
  return name;
}

export function tryRatingParse(parser: ActorParser, lines: string[]): Rating {
  const rating = parser(lines);
  if (!(rating as Rating).xp) {
    return {
      xp: 0,
    };
  }
  return rating as Rating;
}

export function tryTypeParse(parser: ActorParser, lines: string[]): ActorType {
  const type = parser(lines);
  if (typeof type !== 'string') {
    throw new Error(`Could not parse type: ${type}`);
  }
  return type;
}

export function tryAlignmentParse(parser: ActorParser, lines: string[]): Alignment {
  const alignment = parser(lines);
  if (typeof alignment !== 'string') {
    throw new Error(`Could not parse alignment: ${alignment}`);
  }
  return alignment;
}

export function tryBiographyParse(parser: ActorParser, lines: string[]): Biography {
  try {
    const biography = parser(lines);
    if (typeof biography !== 'string') {
      // Biography is optional
      return '';
    }
    return biography;
  } catch (_) {
    // Biography is optional
    return '';
  }
}

export function tryLanguageParse(parser: ActorParser, lines: string[]): Languages {
  const languages = parser(lines);
  if (!Array.isArray(languages)) {
    throw new Error(`Could not parse languages: ${languages}`);
  }
  return languages as Languages;
}

export function trySizeParse(parser: ActorParser, lines: string[]): Size {
  const size = parser(lines);
  if (typeof size !== 'string') {
    throw new Error(`Could not parse size: ${size}`);
  }
  return size as Size;
}

export function tryHealthParse(parser: ActorParser, lines: string[]): Health {
  const health = parser(lines);
  if (!(health as Health).value) {
    throw new Error(`Could not parse health: ${health}`);
  }
  return health as Health;
}

export function trySensesParse(parser: ActorParser, lines: string[]): Senses {
  const senses = parser(lines);
  if (!(senses as Senses).units) {
    throw new Error(`Could not parse senses: ${senses}`);
  }
  return senses as Senses;
}

export function tryParseArmorClass(parser: ActorParser, lines: string[]): ArmorClass {
  const armorClass = parser(lines);
  if (!(armorClass as ArmorClass).value) {
    throw new Error(`Could not parse armor class: ${armorClass}`);
  }
  return armorClass as ArmorClass;
}

export function tryParseDamageImmunities(parser: ActorParser, lines: string[]): DamageType[] {
  try {
    const damageImmunities = parser(lines);
    if (!Array.isArray(damageImmunities)) {
      return [];
    }
    return damageImmunities as DamageType[];
  } catch (_) {
    return [];
  }
}

export function tryParseDamageResistances(parser: ActorParser, lines: string[]): DamageType[] {
  try {
    const damageResistances = parser(lines);
    if (!Array.isArray(damageResistances)) {
      // Damage resistances are optional
      return [];
    }
    return damageResistances as DamageType[];
  } catch (_) {
    // Damage resistances are optional
    return [];
  }
}

export function tryParseConditionImmunities(parser: ActorParser, lines: string[]): ConditionTypes {
  try {
    const conditionImmunities = parser(lines);
    if (!Array.isArray(conditionImmunities)) {
      // Condition immunities are optional
      return [];
    }
    return conditionImmunities as ConditionTypes;
  } catch (_) {
    // Condition immunities are optional
    return [];
  }
}

export function tryParseDamageVulnerabilities(parser: ActorParser, lines: string[]): DamageType[] {
  try {
    const damageVulnerabilities = parser(lines);
    if (!Array.isArray(damageVulnerabilities)) {
      // Damage vulnerabilities are optional
      return [];
    }
    return damageVulnerabilities as DamageType[];
  } catch (_) {
    // Damage vulnerabilities are optional
    return [];
  }
}

export function tryParseAbilities(parser: ActorParser, lines: string[]): Abilities {
  const stats = parser(lines);
  if (!(stats as Abilities).str) {
    throw new Error(`Could not parse stats: ${stats}`);
  }
  const statsWithSaves = addSavingThrows(lines, stats as Abilities);
  return statsWithSaves as Abilities;
}

export function tryParseSpeed(parser: ActorParser, lines: string[]): Speed {
  const speed = parser(lines);
  if (typeof speed !== 'number') {
    throw new Error(`Could not parse speed: ${speed}`);
  }
  return speed;
}

export function tryParseSkills(parser: ActorParser, lines: string[]): Skill[] {
  try {
    const skills = parser(lines);

    if (!Array.isArray(skills)) {
      // Skills are optional
      return [];
    }
    return skills as Skill[];
  } catch (_) {
    // Skills are optional
    return [];
  }
}

export function tryParseFeatures(parser: ActorParser, lines: string[]): Features {
  const features = parser(lines);
  if (!Array.isArray(features)) {
    throw new Error(`Could not parse features: ${features}`);
  }
  return features as Feature[];
}

export type ItemParser = (input: string[], abilities: Abilities) => ParserOutput;
export function tryParseItems(parser: ItemParser, lines: string[], abilities: Abilities): ImportItems {
  const items = parser(lines, abilities);
  if (!Array.isArray(items)) {
    throw new Error(`Could not parse items: ${items}`);
  }
  return items as ImportItems;
}
