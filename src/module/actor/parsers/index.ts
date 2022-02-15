import { ImportActor } from '../interfaces';
import {
  nameParsers,
  ratingParsers,
  typeParsers,
  alignmentParsers,
  biographyParsers,
  languagesParsers,
  sizeParsers,
  healthParsers,
  sensesParsers,
  acParsers,
  damageImmunitiesParsers,
  damageResistancesParsers,
  conditionImmunitiesParsers,
  damageVulnerabilitiesParsers,
  abilitiesParsers,
  speedParsers,
  skillsParsers,
  itemsParsers,
} from './available';

import {
  tryAlignmentParse,
  tryBiographyParse,
  tryHealthParse,
  tryLanguageParse,
  tryNameParse,
  tryParseArmorClass,
  tryParseConditionImmunities,
  tryParseDamageImmunities,
  tryParseDamageResistances,
  tryParseDamageVulnerabilities,
  tryParseSkills,
  tryParseSpeed,
  tryParseAbilities,
  tryRatingParse,
  trySensesParse,
  trySizeParse,
  tryTypeParse,
  tryParseItems,
} from './typeGuardParserRunners';

export function textToActor(input: string): ImportActor {
  const lines = input.split('\n');
  const abilities = tryParseAbilities(abilitiesParsers, lines);
  return {
    name: tryNameParse(nameParsers, lines),
    rating: tryRatingParse(ratingParsers, lines),
    type: tryTypeParse(typeParsers, lines),
    alignment: tryAlignmentParse(alignmentParsers, lines),
    biography: tryBiographyParse(biographyParsers, lines),
    languages: tryLanguageParse(languagesParsers, lines),
    size: trySizeParse(sizeParsers, lines),
    health: tryHealthParse(healthParsers, lines),
    senses: trySensesParse(sensesParsers, lines),
    armorClass: tryParseArmorClass(acParsers, lines),
    damageImmunities: tryParseDamageImmunities(damageImmunitiesParsers, lines),
    damageResistances: tryParseDamageResistances(damageResistancesParsers, lines),
    conditionImmunities: tryParseConditionImmunities(conditionImmunitiesParsers, lines),
    damageVulnerabilities: tryParseDamageVulnerabilities(damageVulnerabilitiesParsers, lines),
    abilities,
    speed: tryParseSpeed(speedParsers, lines),
    skills: tryParseSkills(skillsParsers, lines),
    items: tryParseItems(itemsParsers, lines, abilities),
  };
}
