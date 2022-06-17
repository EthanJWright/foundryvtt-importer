import { FoundryApi } from '../../../src/module/journal/builder';
import {
  CreateFolderParams,
  createFoldersRecursive,
  formatList,
  getRootName,
  mergeParagraphs,
  normalizeHeaders,
  Note,
} from '../../../src/module/journal/parsers/pdfJson';
import { Config } from '../../../src/module/settings';

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

describe('createFolderRecursive', () => {
  it('should create a folder recursively', async () => {
    const mockFoundryApi: FoundryApi = {
      foundryFolder: {
        create: jest.fn().mockResolvedValue({ data: { _id: 4 } }),
      },
      foundryJournalEntry: {
        create: jest.fn().mockResolvedValue({}),
      },
    };
    const createFolderParams: CreateFolderParams = {
      node: {
        value: 'Some Big Adventure',
        tag: 'p',
        notes: [{ tag: 'p', value: 'Introduction to adventure.' }],
        children: [
          {
            value: 'Chapter 1',
            tag: 'h3',
            notes: [{ tag: 'p', value: 'Chapter 1 notes' }],
            children: [],
          },
        ],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rootFolder: { data: { _id: 3 } } as any,
      currentDepth: 0,
      settings: { folderDepth: 3 } as Config,
    };
    await createFoldersRecursive(createFolderParams, mockFoundryApi);
    expect(mockFoundryApi.foundryFolder.create).toHaveBeenCalledTimes(1);
    expect(mockFoundryApi.foundryFolder.create).toHaveBeenCalledWith({
      name: 'Some Big Adventure',
      type: 'JournalEntry',
      parent: 3,
      sorting: 'm',
    });
    expect(mockFoundryApi.foundryJournalEntry.create).toHaveBeenCalledTimes(2);
    expect(mockFoundryApi.foundryJournalEntry.create).toHaveBeenNthCalledWith(1, {
      name: 'Some Big Adventure',
      content: '<div><p>Introduction to adventure.</p></div>',
      collectionName: 'Some Big Adventure',
      folder: 4,
      sort: 0,
    });
    expect(mockFoundryApi.foundryJournalEntry.create).toHaveBeenNthCalledWith(2, {
      name: 'Chapter 1',
      content: '<div><p>Chapter 1 notes</p></div>',
      collectionName: 'Chapter 1',
      folder: 4,
      sort: 67,
    });
  });
});
