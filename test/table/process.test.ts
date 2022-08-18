import { parseFromTxt, parseMultiLineWeighted } from '../../src/module/table/parse';
import { txtToFoundry } from '../../src/module/table/process';
import { parseWeightedTable } from '../../src/module/table/reddit';
import { isCSVTable, isJSONTable } from '../../src/module/table/parse';
import { isRedditCollection } from '../../src/module/table/reddit';

describe('txtToFoundry', () => {
  it('should convert a txt file to a foundry file', () => {
    const txt = `test table\noil\nflour\nwater`;
    expect(txtToFoundry(txt)).toEqual({
      name: 'Test Table',
      formula: '1d3',
      results: [
        {
          range: [1, 1],
          text: 'oil',
        },
        {
          range: [2, 2],
          text: 'flour',
        },
        {
          range: [3, 3],
          text: 'water',
        },
      ],
    });
  });
});

describe('parseFromTxt', () => {
  it('should parse a valid txt table', () => {
    const txt = `test table\noil\nflour\nwater`;
    expect(parseFromTxt(txt)).toEqual({
      name: 'Test Table',
      formula: '1d3',
      results: [
        {
          range: [1, 1],
          text: 'oil',
        },
        {
          range: [2, 2],
          text: 'flour',
        },
        {
          range: [3, 3],
          text: 'water',
        },
      ],
    });
  });

  it('should process a table with weights in the entry', () => {
    const text =
      "Political Region\n1-50 Lords' Alliance\n51-60 Dwarfholds of the North\n71-95 Independent Realms\n96-100 Underdark";
    const table = parseFromTxt(text);
    expect(table.name).toEqual('Political Region');
    expect(table.formula).toEqual('1d100');
  });
});

describe('parseMultiLineWeighted', () => {
  it('should process a table with multi line weights', () => {
    const text =
      "Political Region\n1-50\nLords' Alliance\n51-60\nDwarfholds of the North\n71-95\nIndependent Realms\n96-100\nUnderdark";
    expect(parseMultiLineWeighted(text)).toEqual({
      name: 'Political Region',
      formula: '1d100',
      results: [
        {
          range: [1, 50],
          text: "Lords' Alliance",
        },
        {
          range: [51, 60],
          text: 'Dwarfholds of the North',
        },
        {
          range: [71, 95],
          text: 'Independent Realms',
        },
        {
          range: [96, 100],
          text: 'Underdark',
        },
      ],
    });
  });
});

describe('parseWeightedTable', () => {
  it('should process a table with multi line weights', () => {
    const text =
      "Political Region\n1-50\tLords' Alliance\n51-60\tDwarfholds of the North\n71-95\tIndependent Realms\n96-100\tUnderdark";
    expect(parseWeightedTable(text)).toEqual({
      name: 'Political Region',
      formula: '1d100',
      results: [
        {
          range: [1, 50],
          text: "Lords' Alliance",
        },
        {
          range: [51, 60],
          text: 'Dwarfholds of the North',
        },
        {
          range: [71, 95],
          text: 'Independent Realms',
        },
        {
          range: [96, 100],
          text: 'Underdark',
        },
      ],
    });
  });
});

describe('Input type checkers', () => {
  it('should return true for isCSV if the table is a csv', () => {
    const table =
      '1|Raining Heavy Rain, Windy\n2|Raining Heavy Rain\n3|Drizzle Light Rain\n4|Drizzle Light Rain\n5|Overcast Windy\n6|Overcast Light Fog\n7|Overcast Heavy Fog\n8|Raining Heavy Rain\n9|Raining Heavy Rain, Windy\n10|Raining Heavy Rain, Strong Wind\n11|Partly Cloudy None\n12|Partly Cloudy Windy\n13|Partly Cloudy Light Fog\n14|Clear None\n15|Clear None\n16|Clear Windy\n17|Hailstorm Hail, Ice\n18|Heat Wave Hot\n19|Sea Gale Strong Wind\n20|Thunderstorm Heavy Rain, Lightning, Strong Wind';
    expect(isCSVTable(table)).toBe(true);
  });
  it('should return true if the table is JSON', () => {
    const table =
      '{"title": "Autumn weather", "formula": "1d20", "entries": [{"range": [2, 2], "text": "Raining Heavy Rain"}, {"range": [3, 3], "text": "Drizzle Light Rain"}, {"range": [4, 4], "text": "Drizzle Light Rain"}, {"range": [5, 5], "text": "Overcast Windy"}, {"range": [6, 6], "text": "Overcast Light Fog"}, {"range": [7, 7], "text": "Overcast Heavy Fog"}, {"range": [8, 8], "text": "Raining Heavy Rain"}, {"range": [9, 9], "text": "Raining Heavy Rain, Windy"}, {"range": [10, 10], "text": "Raining Heavy Rain, Strong Wind"}, {"range": [11, 11], "text": "Partly Cloudy None"}, {"range": [12, 12], "text": "Partly Cloudy Windy"}, {"range": [13, 13], "text": "Partly Cloudy Light Fog"}, {"range": [14, 14], "text": "Clear None"}, {"range": [15, 15], "text": "Clear None"}, {"range": [16, 16], "text": "Clear Windy"}, {"range": [17, 17], "text": "Hailstorm Hail, Ice"}, {"range": [18, 18], "text": "Heat Wave Hot"}, {"range": [19, 19], "text": "Sea Gale Strong Wind"}, {"range": [20, 20], "text": "Thunderstorm Heavy Rain, Lightning, Strong Wind"}]}';
    expect(isJSONTable(table)).toBe(true);
  });
  it('should not return isRedditCollection for a csv', () => {
    const table =
      '1|Raining Heavy Rain, Windy\n2|Raining Heavy Rain\n3|Drizzle Light Rain\n4|Drizzle Light Rain\n5|Overcast Windy\n6|Overcast Light Fog\n7|Overcast Heavy Fog\n8|Raining Heavy Rain\n9|Raining Heavy Rain, Windy\n10|Raining Heavy Rain, Strong Wind\n11|Partly Cloudy None\n12|Partly Cloudy Windy\n13|Partly Cloudy Light Fog\n14|Clear None\n15|Clear None\n16|Clear Windy\n17|Hailstorm Hail, Ice\n18|Heat Wave Hot\n19|Sea Gale Strong Wind\n20|Thunderstorm Heavy Rain, Lightning, Strong Wind';
    expect(isRedditCollection(table)).toBe(false);
  });
});

describe('DND 5e Table format', () => {
  it('should parse a table in the DND 5e format', () => {
    const table =
      'Alien Devices\nd8 Device\n1 A hollow cylinder with a purple crystal embedded inside \nand a sliding switch. When activated, it emits a 3-foot�long beam of warm light for a fraction of a second \nbefore shorting out.\n2 A fist-sized metal orb with three jagged blades \nfixed to one side. It vibrates with a soft humming \nwhen touched.\n3 A green glass statuette of a dragonborn woman in \nrobes, with a tentacle where her head should be. There’s \na place to insert a Far Realm battery crystal, but the \nstatuette has no obvious function.\n4 A seven-inch-wide, green metal disk with a handle. The \ndisk has a magnet-like attraction to stone, but can’t \nsupport more than half a pound of weight.\n5 A lidded box with a crank. A number of blades inside \nthe box whirl and chop when the crank is turned.\n6 A blank book made of thin sheets of the glassy, green \nstone. A dragonborn with faceted eyes is embossed on \nthe cover.\n7 A coil of copper wire wrapped around a metal rod with \nan upside-down bell at one end and two prongs at \nthe other.\n8 A thin box embedded with pieces of colored glass and a \ndozen buttons. The box fits easily in one hand, but has \nno discernable function.';
    const parsed = parseFromTxt(table);
    expect(parsed.name).toBe('Alien Devices');
    expect(parsed.formula).toBe('1d8');
    expect(parsed.results.length).toBe(8);
  });
});
