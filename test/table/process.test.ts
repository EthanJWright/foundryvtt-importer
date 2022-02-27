import { parseFromTxt, parseMultiLineWeighted } from '../../src/module/table/parse';
import { txtToFoundry } from '../../src/module/table/process';

describe('txtToFoundry', () => {
  it('should convert a txt file to a foundry file', () => {
    const txt = `oil\nflour\nwater`;
    expect(txtToFoundry('test table', txt)).toEqual({
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
    const txt = `oil\nflour\nwater`;
    expect(parseFromTxt({ name: 'test table', entries: txt.split('\n') })).toEqual({
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

  it('should not process a table with weights in the entry', () => {
    const text = "1-50\tLords' Alliance\n51-60\tDwarfholds of the North\n71-95\tIndependent Realms\n96-100\tUnderdark";
    expect(() => parseFromTxt({ name: 'Political Region', entries: text.split('\n') })).toThrow();
  });
});

describe('parseMultiLineWeighted', () => {
  it('should process a table with multi line weights', () => {
    const text = "1-50\nLords' Alliance\n51-60\nDwarfholds of the North\n71-95\nIndependent Realms\n96-100\nUnderdark";
    expect(parseMultiLineWeighted({ name: 'Political Region', entries: text.split('\n') })).toEqual({
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
