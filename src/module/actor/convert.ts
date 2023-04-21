import {
  Abilities,
  ArmorClass,
  ConditionTypes,
  DamageType,
  Feature,
  Health,
  ImportActor,
  Senses,
  Skill,
  Size,
  DamageTypes,
  ImportSpells,
} from './interfaces';
import {
  FifthAbilities,
  FifthAttributes,
  FifthItem,
  FifthSkill,
  FifthSkills,
  FifthStat,
  getDefaultSpellSlots,
  isSpellSlotKey,
  SpellSlots,
} from './templates/fifthedition';

export function convertAbilities({ str, dex, con, int, wis, cha }: Abilities): FifthAbilities {
  return {
    str: {
      value: str.value,
      proficient: 0,
      bonuses: {
        save: `${str.savingThrow}`,
      },
    },
    dex: {
      value: dex.value,
      proficient: 0,
      saveBonus: dex.savingThrow,
      bonuses: {
        save: `${dex.savingThrow}`,
      },
    },
    con: {
      value: con.value,
      proficient: 0,
      saveBonus: con.savingThrow,
      bonuses: {
        save: `${con.savingThrow}`,
      },
    },
    int: {
      value: int.value,
      proficient: 0,
      saveBonus: int.savingThrow,
      bonuses: {
        save: `${int.savingThrow}`,
      },
    },
    wis: {
      value: wis.value,
      proficient: 0,
      saveBonus: wis.savingThrow,
      bonuses: {
        save: `${wis.savingThrow}`,
      },
    },
    cha: {
      value: cha.value,
      proficient: 0,
      saveBonus: cha.savingThrow,
      bonuses: {
        save: `${cha.savingThrow}`,
      },
    },
  };
}

function acToFifth({ value, type }: ArmorClass) {
  const flat = value;
  let calc = 'flat';
  if (type.match(/natural armor/i)) {
    calc = 'natural';
  } else if (type.match(/leather armor/i)) {
    calc = 'equipped';
  } else if (type.match(/plate armor/i)) {
    calc = 'equipped';
  } else if (type.match(/mail armor/i)) {
    calc = 'equipped';
  }
  return {
    calc,
    flat,
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
      special: senses?.special,
      units: 'ft',
    },
    ac: acToFifth(armorClass),
    hp: {
      value: health.value,
      max: health.value,
      min: 0,
      formula: health?.formula,
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

export function getMaxAbility(abilities: Abilities): FifthStat {
  if (abilities.str.mod > abilities.dex.mod) return 'str';
  return 'dex';
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
  if (/aberration/i.test(type)) monsterType = 'aberration';
  if (/beast/i.test(type)) monsterType = 'beast';
  if (/celestial/i.test(type)) monsterType = 'celestial';
  if (/construct/i.test(type)) monsterType = 'construct';
  if (/dragon/i.test(type)) monsterType = 'dragon';
  if (/elemental/i.test(type)) monsterType = 'elemental';
  if (/fey/i.test(type)) monsterType = 'fey';
  if (/fiend/i.test(type)) monsterType = 'fiend';
  if (/giant/i.test(type)) monsterType = 'giant';
  if (/humanoid/i.test(type)) monsterType = 'humanoid';
  if (/monstrosity/i.test(type)) monsterType = 'monstrosity';
  if (/ooze/i.test(type)) monsterType = 'ooze';
  if (/plant/i.test(type)) monsterType = 'plant';
  if (/undead/i.test(type)) monsterType = 'undead';
  if (monsterType === 'unknown') {
    if (/warforged/i.test(type)) monsterType = 'humanoid';
    return {
      value: monsterType,
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

function buildResistances(
  damageImmunities: DamageType[],
  conditionImmunities: ConditionTypes,
  damageResistances: DamageTypes,
  damageVulnerabilities: DamageTypes,
) {
  let resistances = {};
  if (damageImmunities.length > 0) {
    resistances = {
      ...resistances,
      di: { value: damageImmunities },
    };
  }

  if (conditionImmunities.length > 0) {
    resistances = {
      ...resistances,
      ci: { value: conditionImmunities },
    };
  }
  if (damageResistances.length > 0) {
    resistances = {
      ...resistances,
      dr: { value: damageResistances },
    };
  }
  if (damageVulnerabilities.length > 0) {
    resistances = {
      ...resistances,
      dv: { value: damageVulnerabilities },
    };
  }
  return resistances;
}

export function actorToFifth({
  abilities,
  armorClass,
  health,
  speed,
  biography,
  skills,
  rating,
  damageImmunities,
  damageResistances,
  conditionImmunities,
  damageVulnerabilities,
  size,
  senses,
  languages,
  alignment,
  type,
  spellcasting,
}: ImportActor) {
  return {
    abilities: convertAbilities(abilities),
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
      ...buildResistances(damageImmunities, conditionImmunities, damageResistances, damageVulnerabilities),
    },
    skills: convertSkills(skills, senses),
    spellcasting,
    spells: {},
  };
}

export function spellsToSpellSlots(spells: ImportSpells, fifthSpells: FifthItem[]): SpellSlots {
  const defaultSlots: SpellSlots = getDefaultSpellSlots();

  // remove atWill spells from the list as they dont count towards slots
  const spellsToCount = spells.filter((s) => !s.uses?.atWill);

  spellsToCount.forEach((spell) => {
    const spellLevel = fifthSpells.find((s) => s.name === spell.name)?.data.level;
    const spellSlotKey = `spell${spellLevel}`;
    if (!spellLevel || !isSpellSlotKey(spellSlotKey) || !defaultSlots[spellSlotKey]) return;

    // spells are 1/day each etc, so we need to sum the uses
    const oldValue = defaultSlots[spellSlotKey].value ?? '0';
    const newValue = spell.uses?.value?.toString() || '0';
    const addedValue = Number(newValue) + Number(oldValue);
    const value = addedValue.toString() || '0';
    defaultSlots[spellSlotKey] = {
      value,
      max: value,
      override: value,
    };
  });

  return defaultSlots;
}
