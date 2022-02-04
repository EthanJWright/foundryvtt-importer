interface ItemData {
  description: {
    value: string;
  };
}

export interface Item {
  name: string;
  type: string;
  data: ItemData;
}

function parseName(input: string): string {
  return input.split('\n')[0].trim();
}

export function processItem(input: string): Item {
  return {
    name: parseName(input),
    type: 'item',
    data: {
      description: {
        value: '',
      },
    },
  };
}
