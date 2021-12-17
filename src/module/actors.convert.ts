import { Abilities, ImportActor } from './actors.process';
import { FifthAbilities, FifthEditionActor } from './fithedition.actor.template';

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

export function actorToFifth({ stats }: ImportActor) {
  return {
    abilities: convertAbilities(stats),
  };
}
