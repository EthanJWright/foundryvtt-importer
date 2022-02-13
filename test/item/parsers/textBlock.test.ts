import { parseWeapon } from '../../../src/module/item/parsers/textBlock';
describe('parseWeapon', () => {
  it('should parse a shortsword', () => {
    const name = 'Shortsword';
    const description =
      'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage plus 13 (3d8) poison damage.';
    const item = parseWeapon(name, description, 'str');
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
          ['1d6 + 3', 'piercing'],
          ['3d8', 'poison'],
        ],
      },
      description:
        'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage plus 13 (3d8) poison damage.',
      name: 'Shortsword',
      range: {
        value: 5,
      },
      type: 'weapon',
    });
  });

  it('should throw an error if not passed a weapon', () => {
    const name = 'Shortsword';
    const description = 'Some feat that isnt a weapon.';
    expect(() => parseWeapon(name, description, 'str')).toThrow();
  });
});
