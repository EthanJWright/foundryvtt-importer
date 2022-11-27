import { ImportActor } from '../interfaces';
import { ACTOR_PARSERS } from './available';

import { tryActorParse } from './typeGuardParserRunners';

export function textToActor(input: string): ImportActor {
  const lines = input.split('\n');
  return tryActorParse(ACTOR_PARSERS, lines);
}
