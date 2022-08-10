import {
  Abilities,
  ActorType,
  ActorTypes,
  Alignment,
  ArmorClass,
  Biography,
  ConditionTypes,
  DamageTypes,
  Health,
  ImportActor,
  ImportActorParser,
  ImportItems,
  Languages,
  Rating,
  Senses,
  Size,
  Skill,
  Speed,
} from '../interfaces';
import { addSavingThrows } from './wtcTextBlock';

function damageTypeGuard(damageTypes: unknown): DamageTypes {
  if (Array.isArray(damageTypes)) {
    return damageTypes as DamageTypes;
  }
  throw new Error('Damage types must be an array');
}

export function trySingleActorParse(parser: ImportActorParser, lines: string[]): ImportActor {
  const abilities = tryParser<Abilities>(parser.parseAbilities, lines, (abilities) => {
    if ((abilities as Abilities).str) {
      const abilitiesWithSaves = addSavingThrows(lines, abilities as Abilities);
      return abilitiesWithSaves as Abilities;
    }
    throw new Error('Abilities must be of type Abilities');
  });
  return {
    name: tryParser<string>(parser.parseName, lines, (value) => {
      if (typeof value === 'string') {
        return value;
      } else throw new Error('Name must be string');
    }),
    rating: tryParser<Rating>(parser.parseRating, lines, (value) => {
      if ((value as Rating).xp) {
        return value as Rating;
      } else {
        const emptyRating: Rating = {
          xp: 0,
        };
        return emptyRating;
      }
    }),
    type: tryParser<ActorType>(parser.parseType, lines, (value) => {
      if (typeof value !== 'string') {
        throw new Error(`Could not parse type: ${value}`);
      }
      return value;
    }),
    alignment: tryParser<Alignment>(
      parser.parseAlignment,
      lines,
      (alignment) => {
        if (typeof alignment === 'string') {
          return alignment;
        }
        throw new Error('Alignment must be string');
      },
      {
        isOptional: true,
        defaultValue: '',
      },
    ),
    biography: tryParser<Biography>(
      parser.parseBiography,
      lines,
      (biography) => {
        if (typeof biography === 'string') {
          return biography;
        }
        throw new Error('Biography must be string');
      },
      {
        isOptional: true,
        defaultValue: '',
      },
    ),
    languages: tryParser<Languages>(parser.parseLanguages, lines, (languages) => {
      if (!Array.isArray(languages)) {
        throw new Error(`Could not parse languages: ${languages}`);
      }
      return languages as Languages;
    }),
    size: tryParser<Size>(parser.parseSize, lines, (size) => {
      if (typeof size !== 'string') {
        throw new Error(`Could not parse size: ${size}`);
      }
      return size as Size;
    }),
    health: tryParser(parser.parseHealth, lines, (health) => {
      if (!(health as Health).value) {
        throw new Error(`Could not parse health: ${health}`);
      }
      return health as Health;
    }),
    senses: tryParser(parser.parseSenses, lines, (senses) => {
      if (!(senses as Senses).units) {
        throw new Error(`Could not parse senses: ${senses}`);
      }
      return senses as Senses;
    }),
    armorClass: tryParser<ArmorClass>(parser.parseArmorClass, lines, (armorClass) => {
      if (!(armorClass as ArmorClass).value) {
        throw new Error(`Could not parse armor class: ${armorClass}`);
      }
      return armorClass as ArmorClass;
    }),
    damageImmunities: tryParser<DamageTypes>(parser.parseDamageImmunities, lines, damageTypeGuard, {
      isOptional: true,
      defaultValue: [],
    }),
    damageResistances: tryParser<DamageTypes>(parser.parseDamageResistances, lines, damageTypeGuard, {
      isOptional: true,
      defaultValue: [],
    }),
    conditionImmunities: tryParser<ConditionTypes>(
      parser.parseConditionImmunities,
      lines,
      (conditionImmunities) => {
        if (Array.isArray(conditionImmunities)) {
          // Condition immunities are optional
          return conditionImmunities as ConditionTypes;
        }
        throw new Error(`Could not parse condition immunities: ${conditionImmunities}`);
      },
      {
        isOptional: true,
        defaultValue: [],
      },
    ),
    damageVulnerabilities: tryParser<DamageTypes>(parser.parseDamageVulnerabilities, lines, damageTypeGuard, {
      isOptional: true,
      defaultValue: [],
    }),
    abilities,
    speed: tryParser<Speed>(parser.parseSpeed, lines, (speed) => {
      if (typeof speed === 'number') {
        return speed;
      }
      throw new Error('Speed must be number');
    }),
    skills: tryParser<Skill[]>(
      parser.parseSkills,
      lines,
      (skills) => {
        if (Array.isArray(skills)) {
          return skills as Skill[];
        }
        throw new Error('Skills must be array');
      },
      {
        isOptional: true,
        defaultValue: [],
      },
    ),
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
      return result;
    } catch (error) {
      parserErrors.push(`Parser error for [${parser.name}] -> ${error}`);
    }
  }
  throw new Error(`Could not parse element: ${JSON.stringify(parserErrors.join('\n'), null, 2)}`);
}

export function tryParser<T extends ActorTypes>(
  parsers: ActorParser[],
  lines: string[],
  typeGuard: (result: unknown) => T,
  optional?: { isOptional: true; defaultValue: T },
): T {
  const parserErrors = [];
  for (const parser of parsers) {
    try {
      const result = parser(lines);
      return typeGuard(result);
    } catch (error) {
      parserErrors.push(`Parser error for [${parser.name}] -> ${error}`);
    }
  }
  if (optional && optional.isOptional) {
    return optional.defaultValue;
  } else {
    throw new Error(`Could not parse element: ${JSON.stringify(parserErrors.join('\n'), null, 2)}`);
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
