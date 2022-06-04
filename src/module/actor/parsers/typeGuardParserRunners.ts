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

export type ParserOutput = ActorTypes;
export type ActorParser = (input: string[]) => ParserOutput;

export function tryActorParse(parsers: ImportActorParser[], lines: string[]): ImportActor {
  const parserErrors = [];
  for (const parser of parsers) {
    try {
      const result = trySingleActorParse(parser, lines);
      return result;
    } catch (error) {
      parserErrors.push(error);
    }
  }
  throw new Error(`Could not parse actor, errors: [${parserErrors.join(', ')}]`);
}

export function tryParsers(parsers: ActorParser[], input: string[]): ParserOutput {
  const parserErrors = [];
  for (const parser of parsers) {
    try {
      const result = parser(input);
      console.log(`Returning result: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      parserErrors.push(`Parser error for [${parser.name}] -> ${error}`);
    }
  }
  throw new Error(`Could not parse element: ${JSON.stringify(parserErrors.join('\n'), null, 2)}`);
}

export function tryNameParse(parsers: ActorParser[], lines: string[]): Name {
  try {
    const name = tryParsers(parsers, lines);
    if (typeof name !== 'string') {
      throw new Error(`Could not parse name: ${name}`);
    }
    return name;
  } catch (error) {
    throw new Error(`Could not parse name: ${error}`);
  }
}

export function tryRatingParse(parsers: ActorParser[], lines: string[]): Rating {
  try {
    const rating = tryParsers(parsers, lines);
    if (!(rating as Rating).xp) {
      return {
        xp: 0,
      };
    }
    return rating as Rating;
  } catch (error) {
    throw new Error(`Could not parse rating: ${error}`);
  }
}

export function tryTypeParse(parsers: ActorParser[], lines: string[]): ActorType {
  try {
    const type = tryParsers(parsers, lines);
    if (typeof type !== 'string') {
      throw new Error(`Could not parse type: ${type}`);
    }
    return type;
  } catch (error) {
    throw new Error(`Could not parse type: ${error}`);
  }
}

export function tryAlignmentParse(parsers: ActorParser[], lines: string[]): Alignment {
  try {
    const alignment = tryParsers(parsers, lines);
    if (typeof alignment !== 'string') {
      // alignment is optional
      return '';
    }
    return alignment;
  } catch (error) {
    return '';
  }
}

export function tryBiographyParse(parsers: ActorParser[], lines: string[]): Biography {
  try {
    const biography = tryParsers(parsers, lines);
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

export function tryLanguageParse(parsers: ActorParser[], lines: string[]): Languages {
  try {
    const languages = tryParsers(parsers, lines);
    if (!Array.isArray(languages)) {
      throw new Error(`Could not parse languages: ${languages}`);
    }
    return languages as Languages;
  } catch (error) {
    throw new Error(`Could not parse languages: ${error}`);
  }
}

export function trySizeParse(parsers: ActorParser[], lines: string[]): Size {
  try {
    const size = tryParsers(parsers, lines);
    if (typeof size !== 'string') {
      throw new Error(`Could not parse size: ${size}`);
    }
    return size as Size;
  } catch (error) {
    throw new Error(`Could not parse size: ${error}`);
  }
}

export function tryHealthParse(parsers: ActorParser[], lines: string[]): Health {
  try {
    const health = tryParsers(parsers, lines);
    if (!(health as Health).value) {
      throw new Error(`Could not parse health: ${health}`);
    }
    return health as Health;
  } catch (error) {
    throw new Error(`Could not parse health: ${error}`);
  }
}

export function trySensesParse(parsers: ActorParser[], lines: string[]): Senses {
  try {
    const senses = tryParsers(parsers, lines);
    if (!(senses as Senses).units) {
      throw new Error(`Could not parse senses: ${senses}`);
    }
    return senses as Senses;
  } catch (error) {
    throw new Error(`Could not parse senses: ${error}`);
  }
}

export function tryParseArmorClass(parsers: ActorParser[], lines: string[]): ArmorClass {
  try {
    const armorClass = tryParsers(parsers, lines);
    if (!(armorClass as ArmorClass).value) {
      throw new Error(`Could not parse armor class: ${armorClass}`);
    }
    return armorClass as ArmorClass;
  } catch (error) {
    throw new Error(`Could not parse armor class: ${error}`);
  }
}

export function tryParseDamageImmunities(parsers: ActorParser[], lines: string[]): DamageType[] {
  try {
    const damageImmunities = tryParsers(parsers, lines);
    if (!Array.isArray(damageImmunities)) {
      return [];
    }
    return damageImmunities as DamageType[];
  } catch (_) {
    return [];
  }
}

export function tryParseDamageResistances(parsers: ActorParser[], lines: string[]): DamageType[] {
  try {
    const damageResistances = tryParsers(parsers, lines);
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

export function tryParseConditionImmunities(parsers: ActorParser[], lines: string[]): ConditionTypes {
  try {
    const conditionImmunities = tryParsers(parsers, lines);
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

export function tryParseDamageVulnerabilities(parsers: ActorParser[], lines: string[]): DamageType[] {
  try {
    const damageVulnerabilities = tryParsers(parsers, lines);
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

export function tryParseAbilities(parsers: ActorParser[], lines: string[]): Abilities {
  try {
    const stats = tryParsers(parsers, lines);
    if (!(stats as Abilities).str) {
      throw new Error(`Could not parse abilities: ${stats}`);
    }
    const statsWithSaves = addSavingThrows(lines, stats as Abilities);
    return statsWithSaves as Abilities;
  } catch (error) {
    throw new Error(`Could not parse abilities: ${error}`);
  }
}

export function tryParseSpeed(parsers: ActorParser[], lines: string[]): Speed {
  try {
    const speed = tryParsers(parsers, lines);
    if (typeof speed !== 'number') {
      throw new Error(`Could not parse speed: ${speed}`);
    }
    return speed;
  } catch (error) {
    throw new Error(`Could not parse speed: ${error}`);
  }
}

export function tryParseSkills(parsers: ActorParser[], lines: string[]): Skill[] {
  try {
    const skills = tryParsers(parsers, lines);

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

export function tryParseFeatures(parsers: ActorParser[], lines: string[]): Features {
  try {
    const features = tryParsers(parsers, lines);
    if (!Array.isArray(features)) {
      throw new Error(`Could not parse features: ${features}`);
    }
    return features as Feature[];
  } catch (error) {
    throw new Error(`Could not parse features: ${error}`);
  }
}

export function tryItemParsers(parsers: ItemParser[], input: string[], abilities: Abilities): ParserOutput {
  const parserErrors = [];
  for (const parser of parsers) {
    try {
      const result = parser(input, abilities);
      return result;
    } catch (error) {
      parserErrors.push(error);
    }
  }
  throw new Error(`Could not parse element: ${JSON.stringify(parserErrors.join('\n'), null, 2)}`);
}

export type ItemParser = (input: string[], abilities: Abilities) => ParserOutput;
export function tryParseItems(parsers: ItemParser[], lines: string[], abilities: Abilities): ImportItems {
  const items = tryItemParsers(parsers, lines, abilities);
  if (!Array.isArray(items)) {
    throw new Error(`Could not parse items: ${items}`);
  }
  return items as ImportItems;
}
