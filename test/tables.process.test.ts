import { isCSVTable, isJSONTable } from '../src/module/table.process';
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
});
