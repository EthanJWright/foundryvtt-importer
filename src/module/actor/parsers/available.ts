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
  parseMultilineStatsWTC,
  parseRatingWTC,
  parseSensesWTC,
  parseSizeWTC,
  parseSkillsWTC,
  parseSpeedWTC,
  parseStatsWTC,
  parseTypeWTC,
  parseVerticalKeyValueStats,
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
export const statsParsers = [parseStatsWTC, parseMultilineStatsWTC, parseVerticalKeyValueStats];
export const speedParsers = [parseSpeedWTC];
export const skillsParsers = [parseSkillsWTC];
export const featuresParsers = [parseFeaturesWTC];
