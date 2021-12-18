import { Abilities, ArmorClass, Health, ImportActor, Skill } from './actors.process';
import { FifthAbilities, FifthAttributes, FifthSkill, FifthSkills, FifthStat } from './fifthedition.actor.template';

export function convertAbilities({ str, dex, con, int, wis, cha }: Abilities): FifthAbilities {
  return {
    str: {
      value: str.value,
      proficient: str.mod,
    },
    dex: {
      value: dex.value,
      proficient: dex.mod,
    },
    con: {
      value: con.value,
      proficient: con.mod,
    },
    int: {
      value: int.value,
      proficient: int.mod,
    },
    wis: {
      value: wis.value,
      proficient: wis.mod,
    },
    cha: {
      value: cha.value,
      proficient: cha.mod,
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
      formula: armorClass.type,
    },
    hp: {
      value: health.value,
      min: health.min,
      max: health.max,
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

function convertSkills(skills: Skill[]) {
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
