import { TableJSON } from './table';

export type TableData = ConstructorParameters<typeof foundry.documents.BaseRollTable>[0];

export function parseFoundryJSON({ title, formula, entries }: TableJSON) {
  return {
    name: title,
    formula,
    results: [...entries],
  };
}
