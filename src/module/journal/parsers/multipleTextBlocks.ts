import { TextBlock } from '.';
import { formatContent } from './textBlock';

export interface MultipleTextBlocks {
  entries: TextBlock[];
}

function isSizeOfTitle(line: string) {
  const shortEnough = line.split(' ').length < 7;
  const hasBullet = line.includes('•');
  const endsWithColon = line.endsWith(':');
  // first character and last character are parens
  const hasParens = line.trim().startsWith('(') && line.trim().endsWith(')');
  return shortEnough && !hasBullet && line.length > 0 && !endsWithColon && !hasParens;
}

export const parseMultipleTextBlocks = (input: string): MultipleTextBlocks => {
  const lines = input.split('\n');
  let entries: TextBlock[] = [];
  lines.forEach((line) => {
    if (isSizeOfTitle(line)) {
      const name = line.trim();
      entries.push({ name, content: '' });
    } else {
      entries[entries.length - 1].content += `\n${line}`;
    }
  });
  entries = entries.filter(({ name, content }) => name !== '' && content !== '');
  let index = 0;
  return {
    entries: entries.map((entry) => {
      return {
        name: entry.name,
        content: formatContent(entry.content),
        sortValue: index++,
      };
    }),
  };
};
