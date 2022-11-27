import { parseSpell, parseTypeFromActorFeature, parseWeapon } from '../../../src/module/item/parsers/textBlock';
import { parseItem } from '../../../src/module/item/parsers/available';
import { ItemParserInput } from '../../../src/module/item/typeGuardParserRunners';
describe('parseWeapon', () => {
  it('should parse a shortsword', () => {
    const name = 'Shortsword';
    const description =
      'Melee Weapon Attack: 7 to hit, reach 5 ft., one target. Hit: 6 (1d6  3) piercing damage plus 13 (3d8) poison damage.';
    const item = parseWeapon({ name, description, ability: 'str' });
    expect(item).toEqual({
      ability: 'str',
      actionType: 'mwak',
      activation: {
        cost: 1,
        type: 'action',
      },
      attackBonus: 0,
      damage: {
        parts: [
          ['1d6  3', 'piercing'],
          ['3d8', 'poison'],
        ],
      },
      description:
        'Melee Weapon Attack: 7 to hit, reach 5 ft., one target. Hit: 6 (1d6  3) piercing damage plus 13 (3d8) poison damage.',
      name: 'Shortsword',
      range: {
        value: 5,
        units: 'ft',
      },
      type: 'weapon',
    });
  });

  it('should throw an error if not passed a weapon', () => {
    const name = 'Shortsword';
    const description = 'Some feat that isnt a weapon.';
    expect(() => parseWeapon({ name, description, ability: 'str' })).toThrow();
  });
});

describe('parseSpell', () => {
  it('should parse a poison cloud spell', () => {
    const text =
      'Poison gas fills a 20-foot-radius sphere centered on a point Big Bara can see within 50 feet of her. The gas spreads around corners and remains until the start of Big Bara’s next turn. Each creature that starts its turn in the gas must succeed on a DC 16 Constitution saving throw or be poisoned for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.';
    const spell = parseSpell({ name: 'Poisonous Cloud (2/Day)', description: text, ability: 'wis' });
    expect(spell).toEqual({
      ability: 'con',
      actionType: 'save',
      hasSpellData: true,
      activation: {
        cost: 1,
        type: 'action',
      },
      attackBonus: 0,
      damage: undefined,
      description:
        'Poison gas fills a 20-foot-radius sphere centered on a point Big Bara can see within 50 feet of her. The gas spreads around corners and remains until the start of Big Bara’s next turn. Each creature that starts its turn in the gas must succeed on a DC 16 Constitution saving throw or be poisoned for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.',
      name: 'Poisonous Cloud (2/Day)',
      range: {
        value: 50,
        units: 'ft',
      },
      save: {
        ability: 'con',
        dc: 16,
        scaling: 'spell',
      },
      target: {
        type: 'sphere',
        units: 'ft',
        value: 20,
      },
      type: 'feat',
      uses: {
        max: 2,
        per: 'day',
        value: 2,
      },
    });
  });
  it('should throw an error if not passed a spell', () => {
    const text = 'Some feat that isnt a spell.';
    expect(() => parseSpell({ name: 'Not a spell', description: text, ability: 'wis' })).toThrow();
  });

  it('should parse a breath weapon with recharge', () => {
    const itemText =
      'The dragon exhales poisonous gas in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one.';
    const parsed = parseSpell({ name: 'Poison Breath (Recharge 5-6)', description: itemText, ability: 'con' });
    expect(parsed).toEqual({
      ability: 'con',
      actionType: 'save',
      hasSpellData: true,
      activation: {
        cost: 1,
        type: 'action',
      },
      attackBonus: 0,
      damage: {
        parts: [['16d6', 'poison']],
      },
      description:
        'The dragon exhales poisonous gas in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one.',
      name: 'Poison Breath (Recharge 5-6)',
      range: {
        value: 60,
        units: 'self',
      },
      save: {
        ability: 'con',
        dc: 18,
        scaling: 'spell',
      },
      target: {
        type: 'cone',
        units: 'ft',
        value: 60,
      },
      type: 'feat',
      recharge: {
        value: 5,
        charged: true,
      },
    });
  });

  it('should be able to parse toxic touch', () => {
    const description =
      'Melee or Ranged Spell Attack: +4 to hit, reach 5 ft. or range 30 ft., one target. Hit: 7 (2d6) poison damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute (save ends at end of turn).';
    const toxicSpell: ItemParserInput = {
      name: 'Toxic Touch',
      description,
      section: 'action',
    };
    const spell = parseSpell(toxicSpell);
    expect(spell).toEqual({
      activation: {
        cost: 1,
        type: 'action',
      },
      attackBonus: 0,
      damage: {
        parts: [['2d6', 'poison']],
      },
      description:
        'Melee or Ranged Spell Attack: +4 to hit, reach 5 ft. or range 30 ft., one target. Hit: 7 (2d6) poison damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute (save ends at end of turn).',
      hasSpellData: true,
      name: 'Toxic Touch',
      range: {
        units: 'ft',
        value: 5,
      },
      type: 'feat',
    });
  });
});

describe('tryParsers', () => {
  it('should parse magic resistance', () => {
    const item = 'The nimblewright has advantage on saving throws against spells and other magical effects.';
    const parsed = parseItem({ name: 'Magic Resistance', description: item, ability: 'wis' });
    expect(parsed).toEqual(
      expect.objectContaining({
        description: 'The nimblewright has advantage on saving throws against spells and other magical effects.',
        name: 'Magic Resistance',
        type: 'feat',
      }),
    );
  });
  it('should parse magic weapons', () => {
    const item = 'The nimblewright’s weapon attacks are magical.';
    const parsed = parseItem({ name: 'Magic Weapons', description: item, ability: 'str' });
    expect(parsed).toEqual(
      expect.objectContaining({
        description: 'The nimblewright’s weapon attacks are magical.',
        name: 'Magic Weapons',
        type: 'feat',
      }),
    );
  });
  it('should parse poison gas', () => {
    const item =
      'The dragon exhales poisonous gas in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one.';
    const parsed = parseItem({ name: 'Poison Breath (Recharge 5–6)', description: item });
    expect(parsed).toEqual({
      ability: 'con',
      actionType: 'save',
      activation: { cost: 1, type: 'action' },
      attackBonus: 0,
      damage: { parts: [['16d6', 'poison']] },
      description:
        'The dragon exhales poisonous gas in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one.',
      hasSpellData: true,
      name: 'Poison Breath (Recharge 5–6)',
      range: { units: 'self', value: 60 },
      recharge: { charged: true, value: 5 },
      save: { ability: 'con', dc: 18, scaling: 'spell' },
      target: { type: 'cone', units: 'ft', value: 60 },
      type: 'feat',
      uses: undefined,
    });
  });
  it('should parse legendary actions', () => {
    const item =
      "The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.";
    const parsed = parseItem({ name: 'Legendary Actions', description: item });
    expect(parsed).toEqual(
      expect.objectContaining({
        description:
          "The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.",
        name: 'Legendary Actions',
        type: 'feat',
      }),
    );
  });
});

describe('parseTypeFromActorFeature', () => {
  it('should parse text without a die formula as a feat', () => {
    const itemText =
      "When the bugbear hits with a melee weapon attack, the attack deals one extra die of the weapon's damage to the target (included below).";
    expect(parseTypeFromActorFeature(itemText)).toEqual('feat');
  });
});
