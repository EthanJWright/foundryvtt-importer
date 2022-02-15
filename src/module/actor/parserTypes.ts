import {
  Abilities,
  ActorType,
  Alignment,
  ArmorClass,
  Biography,
  ConditionTypes,
  DamageTypes,
  Health,
  Languages,
  Name,
  Rating,
  Senses,
  Size,
  Skill,
  Speed,
  ImportItems,
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
export type DamageImmunitiesParser = (lines: string[]) => DamageTypes;
export type DamageResistancesParser = (lines: string[]) => DamageTypes;
export type DamageVulnerabilitiesParser = (lines: string[]) => DamageTypes;
export type ConditionImmunitiesParser = (lines: string[]) => ConditionTypes;
export type StatsParser = (lines: string[]) => Abilities;
export type SpeedParser = (lines: string[]) => Speed;
export type SkillsParser = (lines: string[]) => Skill[];
export type ItemsParser = (lines: string[]) => ImportItems;
