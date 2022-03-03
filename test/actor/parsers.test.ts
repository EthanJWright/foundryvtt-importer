import { textToActor } from '../../src/module/actor/parsers/index';
import { actorParsers } from '../../src/module/actor/parsers/available';
import { tryActorParse } from '../../src/module/actor/parsers/typeGuardParserRunners';

describe('WTC text block', () => {
  it('should parse a WTC text block', () => {
    const actorText =
      'Big Bara\nMedium humanoid (warforged), neutral evil\nArmor Class 18 (natural armor, Imposing Majesty)\nHit Points 117 (18d8 + 36)\nSpeed 30 ft.\nSTR\n DEX\n CON\n INT\n WIS\n CHA\n14 (+2)\n 17 (+3)\n 15 (+2)\n 13 (+1)\n 16 (+3)\n 18 (+4)\nSaving Throws Con +6, Wis +7\nSkills Perception +7, Survival +7\nDamage Immunities poison\nCondition Immunities charmed, frightened, poisoned\nSenses darkvision 60 ft., passive Perception 17\nLanguages Common\nChallenge 9 (5,000 XP)\nImposing Majesty. Big Bara adds her Charisma bonus to her AC\n(included above).\nWarforged Resilience. Big Bara is immune to disease and magic\ncan’t put her to sleep.\nActions\nMultiattack. Big Bara makes two attacks, either with her\nshortsword or armbow.\nShortsword. Melee Weapon Attack: +7 to hit, reach 5 ft., one\ntarget. Hit: 6 (1d6 + 3) piercing damage plus 13 (3d8) poi-\nson damage.\nArmbow. Ranged Weapon Attack: +7 to hit, range 30/120 ft.,\none target. Hit: 10 (2d6 +3) piercing damage plus 13 (3d8) poi-\nson damage.\nPoisonous Cloud (2/Day). Poison gas fills a 20-foot-radius\nsphere centered on a point Big Bara can see within 50 feet of\nher. The gas spreads around corners and remains until the start\nof Big Bara’s next turn. Each creature that starts its turn in the\ngas must succeed on a DC 16 Constitution saving throw or be\npoisoned for 1 minute. A creature can repeat the saving throw\nat the end of each of its turns, ending the effect on itself on\na success.';
    const actor = textToActor(actorText);
    expect(actor.biography).toBe('Medium humanoid (warforged), neutral evil');
  });
});

describe('tryActorParse', () => {
  it('should parse a WTC text block', () => {
    const actorText =
      'Big Bara\nMedium humanoid (warforged), neutral evil\nArmor Class 18 (natural armor, Imposing Majesty)\nHit Points 117 (18d8 + 36)\nSpeed 30 ft.\nSTR\n DEX\n CON\n INT\n WIS\n CHA\n14 (+2)\n 17 (+3)\n 15 (+2)\n 13 (+1)\n 16 (+3)\n 18 (+4)\nSaving Throws Con +6, Wis +7\nSkills Perception +7, Survival +7\nDamage Immunities poison\nCondition Immunities charmed, frightened, poisoned\nSenses darkvision 60 ft., passive Perception 17\nLanguages Common\nChallenge 9 (5,000 XP)\nImposing Majesty. Big Bara adds her Charisma bonus to her AC\n(included above).\nWarforged Resilience. Big Bara is immune to disease and magic\ncan’t put her to sleep.\nActions\nMultiattack. Big Bara makes two attacks, either with her\nshortsword or armbow.\nShortsword. Melee Weapon Attack: +7 to hit, reach 5 ft., one\ntarget. Hit: 6 (1d6 + 3) piercing damage plus 13 (3d8) poi-\nson damage.\nArmbow. Ranged Weapon Attack: +7 to hit, range 30/120 ft.,\none target. Hit: 10 (2d6 +3) piercing damage plus 13 (3d8) poi-\nson damage.\nPoisonous Cloud (2/Day). Poison gas fills a 20-foot-radius\nsphere centered on a point Big Bara can see within 50 feet of\nher. The gas spreads around corners and remains until the start\nof Big Bara’s next turn. Each creature that starts its turn in the\ngas must succeed on a DC 16 Constitution saving throw or be\npoisoned for 1 minute. A creature can repeat the saving throw\nat the end of each of its turns, ending the effect on itself on\na success.';
    const actor = tryActorParse(actorParsers, actorText.split('\n'));
    expect(actor.biography).toBe('Medium humanoid (warforged), neutral evil');
  });
});
