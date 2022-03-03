import { ImportActor } from '../interfaces';
import { actorParsers } from './available';

import { tryActorParse } from './typeGuardParserRunners';

export function textToActor(input: string): ImportActor {
  const lines = input.split('\n');
  return tryActorParse(actorParsers, lines);
}
