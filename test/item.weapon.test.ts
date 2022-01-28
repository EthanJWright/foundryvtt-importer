import { buildDamageParts, getRange, parseSpellSphere } from '../src/module/item/weapon';

describe('buildDamage', () => {
  it('should build damage from a melee weapon', () => {
    const rapier = 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.';
    const built = buildDamageParts(rapier);
    expect(built).toEqual([['1d8 + 4', 'piercing']]);
  });

  it('should build damage for a bite attack', () => {
    const bite = 'Bite. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) piercing damage.';
    const built = buildDamageParts(bite);
    expect(built).toEqual([['2d4 + 3', 'piercing']]);
  });

  it('should build damage for an attack with multiple parts', () => {
    const damageString =
      'Shortsword. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage plus 13 (3d8) poison damage.';
    const built = buildDamageParts(damageString);
    expect(built).toEqual([
      ['1d6 + 3', 'piercing'],
      ['3d8', 'poison'],
    ]);
  });
});

describe('parseSpellSphere', () => {
  it('should parse poison sphere text', () => {
    const text =
      'Poison gas fills a 20-foot-radius sphere centered on a point Big Bara can see within 50 feet of her. The gas spreads around corners and remains until the start of Big Bara’s next turn. Each creature that starts its turn in the gas must succeed on a DC 16 Constitution saving throw or be poisoned for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.';
    expect(parseSpellSphere(text)).toEqual(20);
  });
});

describe('getRange', () => {
  it('should get the range of a spell', () => {
    const text =
      'Poison gas fills a 20-foot-radius sphere centered on a point Big Bara can see within 50 feet of her. The gas spreads around corners and remains until the start of Big Bara’s next turn. Each creature that starts its turn in the gas must succeed on a DC 16 Constitution saving throw or be poisoned for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.';
    const range = getRange(text);
    expect(range).toBeDefined();
    expect(range?.value).toEqual(50);
  });
});
