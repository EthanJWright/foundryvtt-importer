import { parseActorWTC } from './wtcTextBlock';
import { parseActorHB } from './homebreweryTextBlock';

export const actorParsers = [parseActorWTC(), parseActorHB()];
