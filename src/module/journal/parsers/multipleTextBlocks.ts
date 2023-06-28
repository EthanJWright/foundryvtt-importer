import { TextBlock } from '.';
import { formatContent } from './textBlock';

export interface MultipleTextBlocks {
  entries: TextBlock[];
}

interface Page {
  title: { show: true };
  name: string;
  type: 'text';
  text: {
    content: string;
    format: any; // Replace 'any' with the appropriate type for format
  };
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

interface CONSTANTS {
  JOURNAL_ENTRY_PAGE_FORMATS: {
    HTML: 'html';
  };
}

export const parseHTMLIntoMultiplePages = (input: string, constants: CONSTANTS = CONST as unknown as CONSTANTS) => {
  const sections = input.split(/(?=<h1>)/);

  const pages = sections.map((section) => {
    const h1Regex = /<h1>(.*?)<\/h1>/g;

    const title = h1Regex.exec(section)?.[1] ?? 'Parsed Page';
    const content = section.replace(h1Regex, '').trim();

    if (title && content) {
      return {
        title: { show: true },
        name: title,
        type: 'text',
        text: {
          content,
          format: constants.JOURNAL_ENTRY_PAGE_FORMATS.HTML,
        },
      };
    }
    return undefined;
  });

  const filteredPages = pages.filter((page) => page !== undefined) as Page[];

  return { pages: filteredPages };
};
