import { actorToFifth, buildAttackBonus, buildDamageParts, buildReach } from '../src/module/actors.convert';
import { swashbuckler } from './mock.swashbuckler';

describe('Parsed Actor to 5th Structure', () => {
  it('should convert a swashbuckler', () => {
    const fifthSwashbuckler = actorToFifth(swashbuckler);
    expect(fifthSwashbuckler.attributes.hp.value).toEqual(66);
    expect(fifthSwashbuckler.attributes.ac.flat).toEqual(17);
    if (!fifthSwashbuckler.skills.acr) throw new Error('Missing ACR');
    expect(fifthSwashbuckler.skills.acr.value).toEqual(8);
  });
});

describe('buildDamage', () => {
  it('should build damage from a melee weapon', () => {
    const rapier = 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.';
    const built = buildDamageParts(rapier);
    expect(built).toEqual([['1d8 + 4', 'piercing']]);
  });
});

describe('buildAttackBonus', () => {
  it('should build attack bonus from a melee weapon', () => {
    const rapier = 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.';
    const built = buildAttackBonus(rapier, 0);
    expect(built).toEqual(6);
  });
});

describe('buildReach', () => {
  it('should build reach from a melee weapon', () => {
    const rapier = 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.';
    const built = buildReach(rapier);
    if (!built) throw new Error('Missing reach');
    expect(built.value).toEqual(5);
    expect(built.units).toBe('ft');
  });

  it('should build a reach when a space is missing', () => {
    const rapier = 'Melee Weapon Attack: +6 to hit, reach 5ft., one target.Hit: 8 (1d8 + 4) piercing damage.';
    const built = buildReach(rapier);
    if (!built) throw new Error('Missing reach');
    expect(built.value).toEqual(5);
    expect(built.units).toBe('ft');
  });
});
