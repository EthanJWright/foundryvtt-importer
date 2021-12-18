import {
  parseStats,
  parseFormula,
  textToActor,
  parseSkills,
  parseFeatures,
  findFirstSectionIndex,
  parseActions,
  parseStandardCSV,
  parseFeatureSections,
  featureFromSection,
} from '../src/module/actors.process';
describe('parseHealth', () => {
  it('should parse a valid health string', () => {
    const health = parseFormula('Hit Points 66 (12d8 + 12)', /Hit Points (.*)/);
    expect(health.value).toBe(66);
    expect(health.max).toBe(12 * 8 + 12);
    expect(health.min).toBe(12 + 12);
  });
});

describe('extractStats', () => {
  it('should extract stats from a valid string', () => {
    const actorText =
      'Swashbuckler\nMedium humanoid (any race), any non-lawful alignment\n\nArmor Class 17 (leather armor)\nHit Points 66 (12d8 + 12)\nSpeed 30 ft.\n\n   STR        DEX         CON        INT        WIS         CHA\n  12 (+1)    18 (+4)     12 (+1)    14 (+2)    11 (+0)     15 (+2)\n\nSkills Acrobatics +8, Athletics +5, Persuasion +6\nSenses passive Perception 10\nLanguages any one language (usually Common)\nChallenge 3 (700 XP)\n\nLightfooted. The swashbuckler can take the Dash or Disengage\naction as a bonus action on each of its turns.\n\nSuave Defense. While the swashbuckler is wearing light or no\narmor and wielding no shield, its AC includes its Charisma\nmod.\n\nActions\n\nMultiattack. The swashbuckler makes three attacks: one with\na dagger and two with its rapier.\nDagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5\nft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing\ndamage.\nRapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.\nHit: 8 (1d8 + 4) piercing damage.';
    const stats = parseStats(actorText.split('\n'));
    expect(stats).toEqual({
      str: {
        value: 12,
        mod: 1,
      },
      dex: {
        value: 18,
        mod: 4,
      },
      con: {
        value: 12,
        mod: 1,
      },
      int: {
        value: 14,
        mod: 2,
      },
      wis: {
        value: 11,
        mod: 0,
      },
      cha: {
        value: 15,
        mod: 2,
      },
    });
  });
});

describe('Parse Skills', () => {
  it('should parse a valid skill string', () => {
    const actorText =
      'Swashbuckler\nMedium humanoid (any race), any non-lawful alignment\n\nArmor Class 17 (leather armor)\nHit Points 66 (12d8 + 12)\nSpeed 30 ft.\n\n   STR        DEX         CON        INT        WIS         CHA\n  12 (+1)    18 (+4)     12 (+1)    14 (+2)    11 (+0)     15 (+2)\n\nSkills Acrobatics +8, Athletics +5, Persuasion +6\nSenses passive Perception 10\nLanguages any one language (usually Common)\nChallenge 3 (700 XP)\n\nLightfooted. The swashbuckler can take the Dash or Disengage\naction as a bonus action on each of its turns.\n\nSuave Defense. While the swashbuckler is wearing light or no\narmor and wielding no shield, its AC includes its Charisma\nmod.\n\nActions\n\nMultiattack. The swashbuckler makes three attacks: one with\na dagger and two with its rapier.\nDagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5\nft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing\ndamage.\nRapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.\nHit: 8 (1d8 + 4) piercing damage.';
    const skills = parseSkills(actorText.split('\n'));
    expect(skills).toEqual([
      { name: 'acrobatics', bonus: 8 },
      { name: 'athletics', bonus: 5 },
      { name: 'persuasion', bonus: 6 },
    ]);
  });
});

describe('parseFeatures', () => {
  it('should parse both features', () => {
    const actorText =
      'Swashbuckler\nMedium humanoid (any race), any non-lawful alignment\n\nArmor Class 17 (leather armor)\nHit Points 66 (12d8 + 12)\nSpeed 30 ft.\n\n   STR        DEX         CON        INT        WIS         CHA\n  12 (+1)    18 (+4)     12 (+1)    14 (+2)    11 (+0)     15 (+2)\n\nSkills Acrobatics +8, Athletics +5, Persuasion +6\nSenses passive Perception 10\nLanguages any one language (usually Common)\nChallenge 3 (700 XP)\n\nLightfooted. The swashbuckler can take the Dash or Disengage\naction as a bonus action on each of its turns.\n\nSuave Defense. While the swashbuckler is wearing light or no\narmor and wielding no shield, its AC includes its Charisma\nmod.\n\nActions\n\nMultiattack. The swashbuckler makes three attacks: one with\na dagger and two with its rapier.\nDagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5\nft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing\ndamage.\nRapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.\nHit: 8 (1d8 + 4) piercing damage.';
    const featureSplit = actorText.split('\n\n');
    const features = parseFeatures(featureSplit, 4);
    expect(features).toEqual([
      {
        name: 'Lightfooted',
        description: 'The swashbuckler can take the Dash or Disengage action as a bonus action on each of its turns.',
      },
      {
        name: 'Suave Defense',
        description:
          'While the swashbuckler is wearing light or no armor and wielding no shield, its AC includes its Charisma mod.',
      },
    ]);
  });

  it('should parse a different monster', () => {
    const actorText =
      'Nimblewright                                                   \n     Medium construct, unaligned                                      \n\n     Armor Class 18 (natural armor)                                   \n     Hit Points 45 (6d8 + 18)                                         \n     Speed 60 ft.                                                     \n\n        STR        DEX        CON          INT       WIS        CHA   \n       12 (+1)    18 (+4)    17 (+3)      8 (-1)    10 (+0)     6 (-2)\n\n     Saving Throws Dex +6                                             \n     Skills Acrobatics +8, Perception +2                              \n     Damage Resistances bludgeoning, piercing and slashing from       \n     nonmagical effects\n     Condition Immunities exhaustion, frightened, petrified, poisoned \n     Senses darkvision 60 ft., passive Perception 12                  \n     Languages understands one language known to its creator but      \n     can’t speak\n     Challenge 4 (1,100 XP)                                           \n                                                                      \n     Magic Resistance. The nimblewright has advantage on saving       \n     throws against spells and other magical effects.\n                                                                      \n     Magic Weapons. The nimblewright’s weapon attacks are             \n     magical.\n                                                                      \n     Repairable. As long as it has at least 1 hit point remaining, the\n     nimblewright regains 1 hit point when a mending spell is cast    \n     on it.\n                                                                      \n     Sure Footed. The nimblewright has advantage on Strength and      \n     Dexterity saving throws made against effects that would knock\n     it prone.                                                        \n                                                                      \n     Actions                                                          \n                                                                      \n     Multiattack. The nimblewright makes three attacks: two with      \n     its rapier and one with its dagger..                             \n     Rapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target. \n     Hit: 8 (1d8 + 4) piercing damage.                                \n                                                                      \n     Dagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5ft. or\n                                                                      \n     range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing damage.\n                                                                      \n     Reactions\n     Parry. The nimblewright adds 2 to its AC against one melee\n     attack that would hit it. To do so, the nimblewright must see\n     the attacker and be wielding a melee weapon.';
    const sections = parseFeatureSections(actorText);
    const { features } = featureFromSection(sections, 'features');
    expect(features).toBeDefined();
    expect(sections.length).toBe(3);
    expect(features).toHaveLength(4);
    expect(features[0].name).toBe('Magic Resistance');
    expect(features[1].name).toBe('Magic Weapons');
    const { features: actions } = featureFromSection(sections, 'actions');
    expect(actions).toHaveLength(3);
    expect(actions[0].name).toBe('Multiattack');
  });
});

describe('parseActions', () => {
  it('should parse three actions', () => {
    const actorText =
      'Swashbuckler\nMedium humanoid (any race), any non-lawful alignment\n\nArmor Class 17 (leather armor)\nHit Points 66 (12d8 + 12)\nSpeed 30 ft.\n\n   STR        DEX         CON        INT        WIS         CHA\n  12 (+1)    18 (+4)     12 (+1)    14 (+2)    11 (+0)     15 (+2)\n\nSkills Acrobatics +8, Athletics +5, Persuasion +6\nSenses passive Perception 10\nLanguages any one language (usually Common)\nChallenge 3 (700 XP)\n\nLightfooted. The swashbuckler can take the Dash or Disengage\naction as a bonus action on each of its turns.\n\nSuave Defense. While the swashbuckler is wearing light or no\narmor and wielding no shield, its AC includes its Charisma\nmod.\n\nActions\n\nMultiattack. The swashbuckler makes three attacks: one with\na dagger and two with its rapier.\nDagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5\nft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing\ndamage.\nRapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.\nHit: 8 (1d8 + 4) piercing damage.';
    const featureSplit = actorText.split('\n\n');
    const features = parseActions(featureSplit, findFirstSectionIndex(featureSplit, 'actions'));
    expect(features).toEqual([
      {
        name: 'Multiattack',
        description: 'The swashbuckler makes three attacks: one with a dagger and two with its rapier.',
      },
      {
        name: 'Dagger',
        description:
          'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing damage.',
      },
      {
        name: 'Rapier',
        description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.',
      },
    ]);
  });
});

describe('findFirstActionIndex', () => {
  it('should return the first action index', () => {
    const actorText =
      'Swashbuckler\nMedium humanoid (any race), any non-lawful alignment\n\nArmor Class 17 (leather armor)\nHit Points 66 (12d8 + 12)\nSpeed 30 ft.\n\n   STR        DEX         CON        INT        WIS         CHA\n  12 (+1)    18 (+4)     12 (+1)    14 (+2)    11 (+0)     15 (+2)\n\nSkills Acrobatics +8, Athletics +5, Persuasion +6\nSenses passive Perception 10\nLanguages any one language (usually Common)\nChallenge 3 (700 XP)\n\nLightfooted. The swashbuckler can take the Dash or Disengage\naction as a bonus action on each of its turns.\n\nSuave Defense. While the swashbuckler is wearing light or no\narmor and wielding no shield, its AC includes its Charisma\nmod.\n\nActions\n\nMultiattack. The swashbuckler makes three attacks: one with\na dagger and two with its rapier.\nDagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5\nft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing\ndamage.\nRapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.\nHit: 8 (1d8 + 4) piercing damage.';
    const featureSplit = actorText.split('\n\n');
    const index = findFirstSectionIndex(featureSplit, 'actions');
    expect(featureSplit[index]).toContain('Multiattack');
  });
});

describe('parseStandardCSV', () => {
  it('should parse condition immunities', () => {
    const actorText =
      'Nimblewright                                                   \n     Medium construct, unaligned                                      \n\n     Armor Class 18 (natural armor)                                   \n     Hit Points 45 (6d8 + 18)                                         \n     Speed 60 ft.                                                     \n\n        STR        DEX        CON          INT       WIS        CHA   \n       12 (+1)    18 (+4)    17 (+3)      8 (-1)    10 (+0)     6 (-2)\n\n     Saving Throws Dex +6                                             \n     Skills Acrobatics +8, Perception +2                              \n     Damage Resistances bludgeoning, piercing and slashing from       \n     nonmagical effects\n     Condition Immunities exhaustion, frightened, petrified, poisoned \n     Senses darkvision 60 ft., passive Perception 12                  \n     Languages understands one language known to its creator but      \n     can’t speak\n     Challenge 4 (1,100 XP)                                           \n                                                                      \n     Magic Resistance. The nimblewright has advantage on saving       \n     throws against spells and other magical effects.\n                                                                      \n     Magic Weapons. The nimblewright’s weapon attacks are             \n     magical.\n                                                                      \n     Repairable. As long as it has at least 1 hit point remaining, the\n     nimblewright regains 1 hit point when a mending spell is cast    \n     on it.\n                                                                      \n     Sure Footed. The nimblewright has advantage on Strength and      \n     Dexterity saving throws made against effects that would knock\n     it prone.                                                        \n                                                                      \n     Actions                                                          \n                                                                      \n     Multiattack. The nimblewright makes three attacks: two with      \n     its rapier and one with its dagger..                             \n     Rapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target. \n     Hit: 8 (1d8 + 4) piercing damage.                                \n                                                                      \n     Dagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5ft. or\n                                                                      \n     range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing damage.\n                                                                      \n     Reactions\n     Parry. The nimblewright adds 2 to its AC against one melee\n     attack that would hit it. To do so, the nimblewright must see\n     the attacker and be wielding a melee weapon.';
    const immunities = parseStandardCSV(actorText.split('\n'), 'condition immunities');
    expect(immunities.collection).toEqual(['exhaustion', 'frightened', 'petrified', 'poisoned']);
  });
});

describe('Parse Text', () => {
  it('should parse the text into an actor', () => {
    const actorText =
      'Swashbuckler\nMedium humanoid (any race), any non-lawful alignment\n\nArmor Class 17 (leather armor)\nHit Points 66 (12d8 + 12)\nSpeed 30 ft.\n\n   STR        DEX         CON        INT        WIS         CHA\n  12 (+1)    18 (+4)     12 (+1)    14 (+2)    11 (+0)     15 (+2)\n\nSkills Acrobatics +8, Athletics +5, Persuasion +6\nSenses passive Perception 10\nLanguages any one language (usually Common)\nChallenge 3 (700 XP)\n\nLightfooted. The swashbuckler can take the Dash or Disengage\naction as a bonus action on each of its turns.\n\nSuave Defense. While the swashbuckler is wearing light or no\narmor and wielding no shield, its AC includes its Charisma\nmod.\n\nActions\n\nMultiattack. The swashbuckler makes three attacks: one with\na dagger and two with its rapier.\nDagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5\nft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing\ndamage.\nRapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.\nHit: 8 (1d8 + 4) piercing damage.';
    const actor = textToActor(actorText);
    expect(actor.name).toBe('Swashbuckler');
    expect(actor.biography).toBe('Medium humanoid (any race), any non-lawful alignment');
    expect(actor.health.value).toEqual(66);
    expect(actor.health.min).toEqual(12 + 12);
    expect(actor.health.max).toEqual(12 * 8 + 12);
    expect(actor.armorClass.value).toEqual(17);
    expect(actor.armorClass.type).toBe('leather armor');
    expect(actor.speed).toEqual(30);
    expect(actor.skills.length).toEqual(3);
    expect(actor.features.length).toEqual(2);
    expect(actor.features[0].description).toBe(
      'The swashbuckler can take the Dash or Disengageaction as a bonus action on each of its turns.',
    );
    expect(actor.actions.length).toEqual(3);
  });

  it('should parse a nimblewright into an actor', () => {
    const actorText =
      'Nimblewright                                                   \n     Medium construct, unaligned                                      \n\n     Armor Class 18 (natural armor)                                   \n     Hit Points 45 (6d8 + 18)                                         \n     Speed 60 ft.                                                     \n\n        STR        DEX        CON          INT       WIS        CHA   \n       12 (+1)    18 (+4)    17 (+3)      8 (-1)    10 (+0)     6 (-2)\n\n     Saving Throws Dex +6                                             \n     Skills Acrobatics +8, Perception +2                              \n     Damage Resistances bludgeoning, piercing and slashing from       \n     nonmagical effects\n     Condition Immunities exhaustion, frightened, petrified, poisoned \n     Senses darkvision 60 ft., passive Perception 12                  \n     Languages understands one language known to its creator but      \n     can’t speak\n     Challenge 4 (1,100 XP)                                           \n                                                                      \n     Magic Resistance. The nimblewright has advantage on saving       \n     throws against spells and other magical effects.\n                                                                      \n     Magic Weapons. The nimblewright’s weapon attacks are             \n     magical.\n                                                                      \n     Repairable. As long as it has at least 1 hit point remaining, the\n     nimblewright regains 1 hit point when a mending spell is cast    \n     on it.\n                                                                      \n     Sure Footed. The nimblewright has advantage on Strength and      \n     Dexterity saving throws made against effects that would knock\n     it prone.                                                        \n                                                                      \n     Actions                                                          \n                                                                      \n     Multiattack. The nimblewright makes three attacks: two with      \n     its rapier and one with its dagger..                             \n     Rapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target. \n     Hit: 8 (1d8 + 4) piercing damage.                                \n                                                                      \n     Dagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5ft. or\n                                                                      \n     range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing damage.\n                                                                      \n     Reactions\n     Parry. The nimblewright adds 2 to its AC against one melee\n     attack that would hit it. To do so, the nimblewright must see\n     the attacker and be wielding a melee weapon.';
    const actor = textToActor(actorText);
    expect(actor.name).toBe('Nimblewright');
    expect(actor.health.value).toEqual(45);
    expect(actor.health.min).toEqual(6 + 18);
    expect(actor.health.max).toEqual(6 * 8 + 18);
    expect(actor.armorClass.value).toEqual(18);
    expect(actor.armorClass.type).toBe('natural armor');
    expect(actor.speed).toEqual(60);
    expect(actor.skills.length).toEqual(2);
    expect(actor.features.length).toEqual(4);
    expect(actor.features[0].name).toBe('Magic Resistance');
    expect(actor.features[0].description).toBe(
      'The nimblewright has advantage on savingthrows against spells and other magical effects.',
    );
    expect(actor.actions[0].name).toBe('Multiattack');
  });
});