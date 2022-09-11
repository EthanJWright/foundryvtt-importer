import { TextBlock } from '.';
import { formatContent } from './textBlock';

export interface MultipleTextBlocks {
  entries: TextBlock[];
}

export function isTitle(line: string) {
  const shortEnough = line.split(' ').length < 7;
  const endsWithColon = line.endsWith(':');
  // first character and last character are parens
  const hasParens = line.trim().startsWith('(') && line.trim().endsWith(')');
  return (
    shortEnough &&
    !line.includes('•') &&
    line.length > 0 &&
    !endsWithColon &&
    !hasParens &&
    !line.endsWith(',') &&
    !line.startsWith('-') &&
    !line.endsWith('-') &&
    !line.startsWith('–') &&
    !line.endsWith('–')
  );
}

export const parseMultipleTextBlocks = (input: string): MultipleTextBlocks => {
  const lines = input.split('\n');
  let entries: TextBlock[] = [];
  lines.forEach((line) => {
    if (isTitle(line)) {
      const name = line.trim();
      entries.push({ name, content: '' });
    } else {
      if (entries[entries.length - 1] === undefined) {
        const name = line.trim();
        entries.push({ name, content: '' });
      }
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

export const parseMultipleTextPages = (input: string) => {
  const lines = input.split('\n');
  let entries: TextBlock[] = [];
  lines.forEach((line) => {
    if (isTitle(line)) {
      const name = line.trim();
      entries.push({ name, content: '' });
    } else {
      if (entries[entries.length - 1] === undefined) {
        const name = line.trim();
        entries.push({ name, content: '' });
      }
      entries[entries.length - 1].content += `\n${line}`;
    }
  });
  entries = entries.filter(({ name, content }) => name !== '' && content !== '');
  let index = 0;
  return {
    pages: entries.map((entry) => {
      return {
        title: { show: true },
        name: entry.name,
        type: 'text',
        text: {
          content: formatContent(entry.content),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          format: (CONST as unknown as any).JOURNAL_ENTRY_PAGE_FORMATS.HTML,
        },
        sortValue: index++,
      };
    }),
  };
};
