import { Abilities, ArmorClass, Feature, Health, ImportActor, Skill } from './actors.process';
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
function convertAttributes({ armorClass, health, speed }: Attributes): FifthAttributes {
  return {
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
    value: skill.bonus,
    ability,
  };
  return fifthSkill;
}

function convertSkills(skills: Skill[]): FifthSkills {
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

export function actorToFifth({ stats, armorClass, health, speed, biography, skills, rating }: ImportActor) {
  return {
    abilities: convertAbilities(stats),
    attributes: convertAttributes({ armorClass, health, speed }),
    details: {
      biography: {
        value: biography,
      },
      cr: rating?.cr,
      xp: {
        value: rating?.xp,
      },
    },
    skills: convertSkills(skills),
  };
}
