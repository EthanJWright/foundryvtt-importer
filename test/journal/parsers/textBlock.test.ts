import { parseTextBlock, startsWithName } from '../../../src/module/journal/parsers/textBlock';

describe('parseTextBlock', () => {
  it('should parse PC raid test', () => {
    const input =
      'The PCs Raid the Villa\nIf the PCs arrive during the day and raid the mansion before Floxin shows up, what happens?\nOBSERVATION TEAMS: Check to see if they spot the PCs’ infiltration. If they don’t, then nothing happens until they do. Then, broadly speaking:\nThe Zhentarim will send their flying snake to Urstul, who will hastily assemble his team and rush over. He still won’t arrive for 10+2d6 minutes, though, so it’s quite possible the PCs will complete their raid and leave. If that happens and the Zhentarim think they have the Stone, they’ll leave a message drop for Urstul and attempt to follow the PCs to see where they take it. If they don’t think the PCs have the Stone, one of the Zhentarim will follow them (to identify who the new players in the Grand Game are) and the other will maintain observation of the villa.\nXanathar’s Gazers will continue monitoring the situation, with one or more of the gazers following the PCs when they leave.\nJarlaxle’s Team will wait for an opportunity to present itself and then strike at the Stone. That might mean attempting to send a team into the compound (probably heading over the roof and entering through Area 17 – The Balcony), or it might mean waiting until the PCs have the Stone and then attacking them as they leave.\nGRALHUND GUARDS: If the alarm is raised, then\n    • 2 of the guards from Area G8 – Great Hall will move towards the alarm.\n    • 1d4 rounds later, 4 armored guards from G4 – The Barracks will mobilize. 2 will head towards the alarm; two will move towards Lord Gralhund.\n    • 1d4 rounds later, the unarmored guards from G4 – Barracks who were NOT asleep will mobilize with weapons but no armor.\n    • 1d4 rounds later, the unarmored guards from G4 – Barracks who WERE sleeping will mobilize with weapons but no armor.\n(It would take unarmored guards 5 minutes to don their chain shirts. They’re not going to wait on it if the villa is under attack.)\nBeyond that general response procedure, though, simply use the adversary roster and play the characters appropriately based on the information they have.\nOTHER APPROACHES: What about other approaches? For example, what if the PCs knock on the front door? Or bring the City Watch? Broadly speaking, if the compound seems threatened by armed force, similar responses will be taken. If a peaceful approach is being taken, successful Charisma checks may allow PCs to meet with Lord Orond. (Lady Yalah will not put in an appearance; she stays with the Stone upstairs.)';
    expect(parseTextBlock(input)).toEqual(
      expect.objectContaining({
        name: 'The PCs Raid the Villa',
      }),
    );
  });
});

describe('startsWithName', () => {
  it('should flag the sentence as starting with a name', () => {
    const input = 'Treasure. There is treasure in the room.';
    expect(startsWithName(input)).toEqual(true);
  });
  it('should flag a string with a two word name', () => {
    const input =
      'Treasure Chests. The padlocks on the chests are illusory but feel real to the touch. A detect magic spell or similar magic reveals an aura of illusion magic around each one. Attempts to pick or break the locks fail, but a knock spell or similar magic causes a lock to open. did not start with a name';
    expect(startsWithName(input)).toEqual(true);
  });
});
