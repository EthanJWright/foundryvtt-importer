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
  Languages,
  Name,
  Rating,
  Senses,
  Size,
  Skill,
  Speed,
} from '../interfaces';
import { addSavingThrows } from './wtcTextBlock';

export type ParserOutput = ActorTypes;
export type ActorParser = (input: string[]) => ParserOutput;

export function tryParsers(parsers: ActorParser[], input: string[]): ParserOutput {
  const parserErrors = [];
  for (const parser of parsers) {
    try {
      const result = parser(input);
      return result;
    } catch (error) {
      parserErrors.push(error);
    }
  }
  throw new Error(`Could not parse element: ${JSON.stringify(parserErrors.join('\n'), null, 2)}`);
}

export function tryNameParse(parsers: ActorParser[], lines: string[]): Name {
  const name = tryParsers(parsers, lines);
  if (typeof name !== 'string') {
    throw new Error(`Could not parse name: ${name}`);
  }
  return name;
}

export function tryRatingParse(parsers: ActorParser[], lines: string[]): Rating {
  const rating = tryParsers(parsers, lines);
  if (!(rating as Rating).xp) {
    return {
      xp: 0,
    };
  }
  return rating as Rating;
}

export function tryTypeParse(parsers: ActorParser[], lines: string[]): ActorType {
  const type = tryParsers(parsers, lines);
  if (typeof type !== 'string') {
    throw new Error(`Could not parse type: ${type}`);
  }
  return type;
}

export function tryAlignmentParse(parsers: ActorParser[], lines: string[]): Alignment {
  const alignment = tryParsers(parsers, lines);
  if (typeof alignment !== 'string') {
    throw new Error(`Could not parse alignment: ${alignment}`);
  }
  return alignment;
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
  const languages = tryParsers(parsers, lines);
  if (!Array.isArray(languages)) {
    throw new Error(`Could not parse languages: ${languages}`);
  }
  return languages as Languages;
}

export function trySizeParse(parsers: ActorParser[], lines: string[]): Size {
  const size = tryParsers(parsers, lines);
  if (typeof size !== 'string') {
    throw new Error(`Could not parse size: ${size}`);
  }
  return size as Size;
}

export function tryHealthParse(parsers: ActorParser[], lines: string[]): Health {
  const health = tryParsers(parsers, lines);
  if (!(health as Health).value) {
    throw new Error(`Could not parse health: ${health}`);
  }
  return health as Health;
}

export function trySensesParse(parsers: ActorParser[], lines: string[]): Senses {
  const senses = tryParsers(parsers, lines);
  if (!(senses as Senses).units) {
    throw new Error(`Could not parse senses: ${senses}`);
  }
  return senses as Senses;
}

export function tryParseArmorClass(parsers: ActorParser[], lines: string[]): ArmorClass {
  const armorClass = tryParsers(parsers, lines);
  if (!(armorClass as ArmorClass).value) {
    throw new Error(`Could not parse armor class: ${armorClass}`);
  }
  return armorClass as ArmorClass;
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
  const stats = tryParsers(parsers, lines);
  if (!(stats as Abilities).str) {
    throw new Error(`Could not parse stats: ${stats}`);
  }
  const statsWithSaves = addSavingThrows(lines, stats as Abilities);
  return statsWithSaves as Abilities;
}

export function tryParseSpeed(parsers: ActorParser[], lines: string[]): Speed {
  const speed = tryParsers(parsers, lines);
  if (typeof speed !== 'number') {
    throw new Error(`Could not parse speed: ${speed}`);
  }
  return speed;
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
  const features = tryParsers(parsers, lines);
  if (!Array.isArray(features)) {
    throw new Error(`Could not parse features: ${features}`);
  }
  return features as Feature[];
}
