// type guard game
export const isGame = (game: unknown): game is Game => {
  return game !== {} && game !== null && game !== undefined;
};
