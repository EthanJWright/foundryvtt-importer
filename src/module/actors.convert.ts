import { Abilities, ArmorClass, Feature, Health, ImportActor, Senses, Size, Skill } from './actors.process';
import {
  FifthAbilities,
  FifthAttributes,
  FifthItem,
  FifthSkill,
  FifthSkills,
  FifthStat,
} from './fifthedition.actor.template';
import { featuresToItems } from './item/weapon';

export function convertAbilities({ str, dex, con, int, wis, cha }: Abilities): FifthAbilities {
  return {
    str: {
      value: str.value,
      proficient: 0,
    },
    dex: {
      value: dex.value,
      proficient: 0,
    },
    con: {
      value: con.value,
      proficient: 0,
    },
    int: {
      value: int.value,
      proficient: 0,
    },
    wis: {
      value: wis.value,
      proficient: 0,
    },
    cha: {
      value: cha.value,
      proficient: 0,
    },
  };
}

interface Attributes {
  armorClass: ArmorClass;
  health: Health;
  speed: number;
}
function convertAttributes({ armorClass, health, speed }: Attributes, senses: Senses): FifthAttributes {
  return {
    senses: {
      darkvision: senses?.darkvision,
      blindsight: senses?.blindsight,
      tremorsense: senses?.tremorsense,
      truesight: senses?.truesight,
      units: 'ft',
    },
    ac: {
      flat: armorClass.value,
      calc: 'flat',
    },
    hp: {
      value: health.value,
      max: health.value,
      min: 0,
    },
    movement: {
      units: 'ft',
      walk: speed,
    },
  };
}

function buildSkill(skill: Skill, ability: FifthStat): FifthSkill {
  const fifthSkill: FifthSkill = {
    value: skill.bonus ? 1 : 0,
    mod: skill.bonus,
    total: skill.bonus,
    ability,
  };
  return fifthSkill;
}

function convertSkills(skills: Skill[], senses: Senses): FifthSkills {
  const fifthSkills: FifthSkills = {};
  skills.forEach((skill) => {
    const skillName = skill.name.toLowerCase().trim();
    switch (skillName) {
      case 'acrobatics':
        fifthSkills.acr = buildSkill(skill, 'dex');
        break;
      case 'animal handling':
        fifthSkills.ani = buildSkill(skill, 'wis');
        break;
      case 'arcana':
        fifthSkills.arc = buildSkill(skill, 'int');
        break;
      case 'athletics':
        fifthSkills.ath = buildSkill(skill, 'str');
        break;
      case 'deception':
        fifthSkills.dec = buildSkill(skill, 'cha');
        break;
      case 'history':
        fifthSkills.his = buildSkill(skill, 'int');
        break;
      case 'insight':
        fifthSkills.ins = buildSkill(skill, 'wis');
        break;
      case 'intimidation':
        fifthSkills.itm = buildSkill(skill, 'str');
        break;
      case 'investigation':
        fifthSkills.inv = buildSkill(skill, 'int');
        break;
      case 'medicine':
        fifthSkills.med = buildSkill(skill, 'wis');
        break;
      case 'nature':
        fifthSkills.nat = buildSkill(skill, 'int');
        break;
      case 'perception':
        fifthSkills.prc = buildSkill(skill, 'wis');
        fifthSkills.prc.passive = senses.passivePerception;
        break;
      case 'performance':
        fifthSkills.prf = buildSkill(skill, 'cha');
        break;
      case 'persuasion':
        fifthSkills.per = buildSkill(skill, 'cha');
        break;
      case 'religion':
        fifthSkills.rel = buildSkill(skill, 'int');
        break;
      case 'sleight of hand':
        fifthSkills.slt = buildSkill(skill, 'dex');
        break;
      case 'stealth':
        fifthSkills.ste = buildSkill(skill, 'dex');
        break;
      case 'survival':
        fifthSkills.sur = buildSkill(skill, 'wis');
        break;
      default:
        break;
    }
  });
  return fifthSkills;
}

export function buildAttackBonus(description: string, mod: number): number | undefined {
  // regex for + followed by one or two digits
  const attackMatch = description.match(/\+\d{1,2}/);
  if (attackMatch) {
    const attackBonus = parseInt(attackMatch[0].substring(1), 0);
    return attackBonus - mod;
  }
}

export function buildReach(description: string) {
  if (!description.includes('reach')) return undefined;
  const typeSplit = description.split('reach');
  let type = 'ft';
  let value = '5';
  if (typeSplit) {
    const raw = typeSplit[1].split(',');
    if (raw) {
      const reachString = raw[0].trim();
      // pull out the number
      const number = reachString.match(/\d+/);
      // pull out the units
      const units = reachString.match(/[a-zA-Z]+/);
      if (number && units) {
        value = number[0];
        type = units[0];
      }
    }
  }
  return {
    value: Number(value),
    units: type,
  };
}

export interface FeatureCollection {
  features: Feature[];
  actions: Feature[];
  reactions?: Feature[];
}

interface ActorData {
  abilities: Abilities;
}
export function featureCollectionToItems(allFeatures: Feature[], { abilities }: ActorData): FifthItem[] {
  return featuresToItems(allFeatures, abilities);
}

function convertSize(size: Size) {
  if (size === 'Tiny') return 'tiny';
  if (size === 'Small') return 'sm';
  if (size === 'Medium') return 'med';
  if (size === 'Large') return 'lg';
  if (size === 'Huge') return 'huge';
  if (size === 'Gargantuan') return 'grg';
  return 'med';
}

function convertType(input: string) {
  const type = input.toLowerCase();
  let monsterType = 'unknown';
  if (type === 'aberration') monsterType = 'aberration';
  if (type === 'beast') monsterType = 'beast';
  if (type === 'celestial') monsterType = 'celestial';
  if (type === 'construct') monsterType = 'construct';
  if (type === 'dragon') monsterType = 'dragon';
  if (type === 'elemental') monsterType = 'elemental';
  if (type === 'fey') monsterType = 'fey';
  if (type === 'fiend') monsterType = 'fiend';
  if (type === 'giant') monsterType = 'giant';
  if (type === 'humanoid') monsterType = 'humanoid';
  if (type === 'monstrosity') monsterType = 'monstrosity';
  if (type === 'ooze') monsterType = 'ooze';
  if (type === 'plant') monsterType = 'plant';
  if (type === 'undead') monsterType = 'undead';
  if (monsterType === 'unknown') {
    return {
      value: '',
      subtype: '',
      swarm: '',
      custom: type.toLowerCase(),
    };
  } else {
    return {
      value: monsterType.toLowerCase(),
      subtype: '',
      swarm: '',
      custom: '',
    };
  }
}

function convertLanguage(language: string) {
  if (language === "thieves' cant") return 'cant';
  if (language === 'deep speech') return 'deep';
  return language;
}

export function actorToFifth({
  stats,
  armorClass,
  health,
  speed,
  biography,
  skills,
  rating,
  damageImmunities,
  damageResistances,
  conditionImmunities,
  conditionResistances,
  size,
  senses,
  languages,
  alignment,
  type,
}: ImportActor) {
  return {
    abilities: convertAbilities(stats),
    attributes: convertAttributes({ armorClass, health, speed }, senses),
    details: {
      race: type,
      alignment,
      type: convertType(type),
      biography: {
        value: biography,
      },
      cr: rating?.cr,
      xp: {
        value: rating?.xp,
      },
    },
    traits: {
      size: convertSize(size),
      languages: {
        value: languages.map(convertLanguage),
      },
      di: {
        value: damageImmunities,
      },
      ci: {
        value: conditionImmunities,
      },
      dr: {
        value: damageResistances,
      },
      cr: {
        value: conditionResistances,
      },
    },
    skills: convertSkills(skills, senses),
  };
}
