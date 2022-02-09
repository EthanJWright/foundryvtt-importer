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

export type NameParser = (lines: string[]) => Name;
export type RatingParser = (lines: string[]) => Rating;
export type TypeParser = (lines: string[]) => ActorType;
export type ArmorClassParser = (lines: string[]) => ArmorClass;
export type AlignmentParser = (lines: string[]) => Alignment;
export type BiographyParser = (lines: string[]) => Biography;
export type LanguagesParser = (lines: string[]) => Languages;
export type SizeParser = (lines: string[]) => Size;
export type HealthParser = (lines: string[]) => Health;
export type SensesParser = (lines: string[]) => Senses;
export type DamageImmunitiesParser = (lines: string[]) => DamageType[];
export type DamageResistancesParser = (lines: string[]) => DamageType[];
export type DamageVulnerabilitiesParser = (lines: string[]) => DamageType[];
export type ConditionImmunitiesParser = (lines: string[]) => Condition[];
export type StatsParser = (lines: string[]) => Abilities;
export type SpeedParser = (lines: string[]) => Speed;
export type SkillsParser = (lines: string[]) => Skill[];
export type FeaturesParser = (lines: string[]) => Feature[];
