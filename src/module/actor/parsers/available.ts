import {
  parseNameWTC,
  parseACWTC,
  parseAlignmentWTC,
  parseBiographyWTC,
  parseConditionImmunitiesWTC,
  parseDamageImmunitiesWTC,
  parseDamageResistancesWTC,
  parseDamageVulnerabilitiesWTC,
  parseFeaturesWTC,
  parseHealthWTC,
  parseLanguagesWTC,
  parseMultilineAbilitiesWTC,
  parseRatingWTC,
  parseSensesWTC,
  parseSizeWTC,
  parseSkillsWTC,
  parseSpeedWTC,
  parseAbilitiesWTC,
  parseTypeWTC,
  parseVerticalKeyValueAbilitiesWTC,
} from './wtcTextBlock';

export const nameParsers = [parseNameWTC];
export const ratingParsers = [parseRatingWTC];
export const typeParsers = [parseTypeWTC];
export const alignmentParsers = [parseAlignmentWTC];
export const biographyParsers = [parseBiographyWTC];
export const languagesParsers = [parseLanguagesWTC];
export const sizeParsers = [parseSizeWTC];
export const healthParsers = [parseHealthWTC];
export const sensesParsers = [parseSensesWTC];
export const acParsers = [parseACWTC];
export const damageImmunitiesParsers = [parseDamageImmunitiesWTC];
export const damageResistancesParsers = [parseDamageResistancesWTC];
export const conditionImmunitiesParsers = [parseConditionImmunitiesWTC];
export const damageVulnerabilitiesParsers = [parseDamageVulnerabilitiesWTC];
export const abilitiesParsers = [parseAbilitiesWTC, parseMultilineAbilitiesWTC, parseVerticalKeyValueAbilitiesWTC];
export const speedParsers = [parseSpeedWTC];
export const skillsParsers = [parseSkillsWTC];
export const featuresParsers = [parseFeaturesWTC];
