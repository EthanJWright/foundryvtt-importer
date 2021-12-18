import { Abilities, ArmorClass, Feature, Health, ImportActor, Skill } from './actors.process';
import {
  FifthAbilities,
  FifthAttributes,
  FifthFeatureCost,
  FifthItem,
  FifthSkill,
  FifthSkills,
  FifthStat,
} from './fifthedition.actor.template';

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

export function featuresToItems(type: FifthFeatureCost, features: Feature[]): FifthItem[] {
  return features.map((feature) => {
    let activationType = type;
    if (feature.description.includes('bonus action')) activationType = 'bonus action';
    return {
      name: feature.name,
      type: 'feat',
      data: {
        description: {
          value: feature.description,
        },
        activation: {
          type: activationType,
        },
      },
    };
  });
}

export interface FeatureCollection {
  features: Feature[];
  actions: Feature[];
  reactions?: Feature[];
}
export function featureCollectionToItems({ features, actions, reactions }: FeatureCollection): FifthItem[] {
  const items = [...featuresToItems('none', features), ...featuresToItems('action', actions)];
  if (reactions) {
    items.push(...featuresToItems('reaction', reactions));
  }
  return items;
}

export function actorToFifth({ stats, armorClass, health, speed, biography, skills }: ImportActor) {
  return {
    abilities: convertAbilities(stats),
    attributes: convertAttributes({ armorClass, health, speed }),
    details: {
      biography: {
        value: biography,
      },
    },
    skills: convertSkills(skills),
  };
}
