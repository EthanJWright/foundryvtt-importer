import { processItem } from '../src/module/item/process';

describe('processItem', () => {
  it('should handle a wonderous figurine', () => {
    const itemText =
      'Figurine of Wondrous Power - Jingles\nWondrous item, uncommon\nThis figurine of a black horse can become a horse\nwearing a white saddle adorned with jingle bells,\nwhich cannot be removed. Once it has been used, it\ncan’t be used again until the following dawn. While in\nhorse form, the figurine allows you to cast the animal\nmessenger spell on it at will.\nFor more information, please refer to the 5th edition\nDungeon Master’s Guide.';
    const parsed = processItem(itemText);
    expect(parsed.name).toBe('Figurine of Wondrous Power - Jingles');
  });
});
