import { formatList } from './pdfJson';

export interface TextBlock {
  name: string;
  content: string;
  sortValue?: number;
}

function newLineToHTML(content: string): string {
  return content.replace(/\n/g, '<br>');
}

function symbolToList(content: string, symbol: string): string {
  let lines = content.split('\n');
  let firstBulletLine = -1;
  let lastBulletLine = -1;
  lines = lines.map((line, index) => {
    if (line.includes(symbol) && firstBulletLine === -1) {
      firstBulletLine = index;
    }
    if (line.includes(symbol)) {
      lastBulletLine = index;
      line = line.replace(symbol, '');
      return `<li>${line}</li>`;
    } else {
      return line;
    }
  });
  if (firstBulletLine !== -1 && lastBulletLine !== -1) {
    lines[firstBulletLine] = `<ul>${lines[firstBulletLine]}`;
    lines[lastBulletLine] = `${lines[lastBulletLine]}</ul>`;
    const beforeList = lines.slice(0, firstBulletLine).join('\n');
    const list = lines.slice(firstBulletLine, lastBulletLine + 1).join('');
    const afterList = lines.slice(lastBulletLine + 1).join('\n');
    return `${beforeList}\n${list}\n${afterList}`;
  }
  return content;
}

function bulletToList(content: string): string {
  return symbolToList(content, '•');
}

function dashToList(content: string): string {
  return symbolToList(content, '-');
}

function allCapWordsToBold(content: string): string {
  return content.replace(/\b[A-Z]{2,}\b/g, (match) => `<b>${match}</b>`);
}

export function startsWithName(line: string) {
  const re = /\b[A-Z]{1}[a-z]{1,}\b\./g;
  const matches = line.match(re);
  if (matches === null) {
    return false;
  }
  const start = line.split('.')[0];
  if (start.split(' ').length > 3) {
    return false;
  }
  return true;
}

function namesToBold(content: string): string {
  let split = content.split('\n');
  split = split.filter((line) => line !== '');
  split = split.map((line) => {
    if (startsWithName(line)) {
      const name = line.split('.')[0];
      const bold = `<b>${name}</b>`;
      line = line.replace(name, bold);
    }
    return line;
  });
  return split.join('\n');
}

export function formatContent(content: string): string {
  const formatters = [formatList, allCapWordsToBold, namesToBold, bulletToList, dashToList, newLineToHTML];
  return formatters.reduce((acc, current) => {
    acc = current(acc);
    return acc;
  }, content);
}

export function parseTextBlock(input: string): TextBlock {
  const name = input.split('\n')[0];
  const content = input.split('\n').slice(1).join('\n');
  return { name, content: formatContent(content) };
}
