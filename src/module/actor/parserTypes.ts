import {
  Abilities,
  ActorType,
  Alignment,
  ArmorClass,
  Biography,
  Condition,
  DamageType,
  Feature,
  Health,
  Languages,
  Name,
  Rating,
  Senses,
  Size,
  Skill,
  Speed,
} from './interfaces';

export type ParserName = (lines: string[]) => Name;
export type ParserRating = (lines: string[]) => Rating;
export type ParserType = (lines: string[]) => ActorType;
export type ParserArmorClass = (lines: string[]) => ArmorClass;
export type ParserAlignment = (lines: string[]) => Alignment;
export type ParserBiography = (lines: string[]) => Biography;
export type ParserLanguages = (lines: string[]) => Languages;
export type ParserSize = (lines: string[]) => Size;
export type ParserHealth = (lines: string[]) => Health;
export type ParserSenses = (lines: string[]) => Senses;
export type ParserDamageImmunities = (lines: string[]) => DamageType[];
export type ParserDamageResistances = (lines: string[]) => DamageType[];
export type ParserDamageVulnerabilities = (lines: string[]) => DamageType[];
export type ParserConditionImmunities = (lines: string[]) => Condition[];
export type ParserStats = (lines: string[]) => Abilities;
export type ParserSpeed = (lines: string[]) => Speed;
export type ParserSkills = (lines: string[]) => Skill[];
export type ParserFeatures = (lines: string[]) => Feature[];
