import { formatList } from './pdfJson';

export interface TextBlock {
  name: string;
  content: string;
}

function newLineToHTML(content: string): string {
  return content.replace(/\n/g, '<br>');
}

function dashListToHTLML(content: string): string {
  return content.replace(/\n-/g, '<li>').replace(/\n/g, '\n</li>');
}

function bulletToList(content: string): string {
  return content.replace(/• /g, '<li>').replace(/\n/g, '\n</li>');
}

function allCapWordsToBold(content: string): string {
  return content.replace(/\b[A-Z]{2,}\b/g, (match) => `<b>${match}</b>`);
}

export function formatContent(content: string): string {
  const formatters = [formatList, bulletToList, dashListToHTLML, allCapWordsToBold, newLineToHTML];
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
