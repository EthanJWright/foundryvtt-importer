import { isGame } from '../guards/game';

export const supportsJournalPages = () => {
  if (isGame(game)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const release = (game as any).release;
    return release.generation >= 10;
  }
  return false;
};
