import { buildDamageParts } from '../src/module/item/weapon';

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

  it.skip('should build damage for an attack with multiple parts', () => {
    const damageString =
      'Shortsword. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage plus 13 (3d8) poison damage.';
    const built = buildDamageParts(damageString);
    expect(built).toEqual([
      ['1d6 + 3', 'piercing'],
      ['3d8', 'poison'],
    ]);
  });
});
