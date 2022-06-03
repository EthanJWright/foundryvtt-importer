import {
  formatList,
  getRootName,
  mergeParagraphs,
  normalizeHeaders,
  Note,
} from '../../../src/module/journal/parsers/pdfJson';

describe('getRootName', () => {
  it('should get the root name from a file name', () => {
    expect(getRootName('/path/to/File.pdf')).toEqual('File');
  });
  it('should get root name and capitalize it', () => {
    expect(getRootName('/path/to/file.pdf')).toEqual('File');
  });
});

describe('formatList', () => {
  it('should format a 1. 2. style list to an html list', () => {
    expect(formatList('1. Item 1\n2. Item 2\n3. Item 3')).toEqual(
      `<ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>`,
    );
  });
});

describe('normalizeHeaders', () => {
  it('should ensure note tags above 10 are replaced with a paragraph tag', () => {
    const note: Note = {
      tag: 'h12',
      value: 'This is a note',
    };
    expect(normalizeHeaders(note)).toEqual('<p>This is a note</p>');
  });
});

describe('mergeParagraphs', () => {
  it('should merge paragraphs', () => {
    const noteList: Note[] = [
      {
        tag: 'p',
        value: 'This is a paragraph',
      },
    ];
    const currentNote: Note = {
      tag: 'p',
      value: 'This is another paragraph',
    };
    expect(mergeParagraphs(noteList, currentNote)).toEqual([
      {
        tag: 'p',
        value: 'This is a paragraph\nThis is another paragraph',
      },
    ]);
  });
});
