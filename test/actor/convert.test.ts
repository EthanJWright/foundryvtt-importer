import { actorToFifth, buildAttackBonus, buildReach, spellsToSpellSlots } from '../../src/module/actor/convert';
import { swashbuckler } from '../mock.swashbuckler';
import { spythronar } from '../mock.spythronarsac';
import { ABOLETH_SPELLS_FROM_BLOCK, ABOLETH_SPELLS_FROM_COMPENDIUM } from './__fixtures__/abolethSpells';

describe('Parsed Actor to 5th Structure', () => {
  it('should convert a swashbuckler', () => {
    const fifthSwashbuckler = actorToFifth(swashbuckler);
    expect(fifthSwashbuckler.attributes.hp.value).toEqual(66);
    expect(fifthSwashbuckler.attributes.ac.flat).toEqual(17);
    if (!fifthSwashbuckler?.skills?.acr) throw new Error('Missing ACR');
    expect(fifthSwashbuckler.skills.acr.value).toEqual(1);
    expect(fifthSwashbuckler.attributes.hp.formula).toEqual('10d6+3');
  });

  it('should convert a spythronar sac', () => {
    const fifthSpy = actorToFifth(spythronar);
    expect(fifthSpy.attributes.hp.value).toEqual(1);
    expect(fifthSpy.attributes.senses.special).toEqual('blind beyond this radius');
  });
});

describe('buildAttackBonus', () => {
  it('should build attack bonus from a melee weapon', () => {
    const rapier = 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.';
    const built = buildAttackBonus(rapier, 0);
    expect(built).toEqual(6);
  });

  it('should build attack bonus for a bite', () => {
    const bite = 'Bite. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) piercing damage.';
    const built = buildAttackBonus(bite, 0);
    expect(built).toEqual(5);
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

describe('addSpellsToActor', () => {
  it('should build the actors spell slots based on their spell list', () => {
    const spells = ABOLETH_SPELLS_FROM_BLOCK;
    const compendiumSpells = ABOLETH_SPELLS_FROM_COMPENDIUM;
    const slots = spellsToSpellSlots(spells, compendiumSpells);
    expect(slots.spell3.value).toEqual('3');
  });
});
