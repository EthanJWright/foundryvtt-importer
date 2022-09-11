import { isGame } from './guards/game';

export function toPages(folderName: string) {
  if (!isGame(game)) {
    throw new Error('Game not found');
  }
  const folder = game?.folders?.find((f: Folder) => {
    return f.name === folderName && f.type === 'JournalEntry';
  });
  if (!folder) return;
  const sort = folder.sorting === 'm' ? SidebarDirectory._sortStandard : SidebarDirectory._sortAlphabetical;
  const contents = folder.contents.sort(sort);
  const pages = contents.flatMap((entry, i) => {
    const pages = [];
    // Preserve sort order in the folder.
    let sort = (i + 1) * 200_000;
    const textPage = entry.pages.find((p) => p.type === 'text')?.toObject();
    const imagePage = entry.pages.find((p) => p.type === 'image')?.toObject();
    if (textPage) {
      textPage.title.show = true;
      textPage.sort = sort;
      pages.push(textPage);
      sort -= 100_000;
    }
    if (imagePage) {
      imagePage.sort = sort;
      pages.push(imagePage);
    }
    return pages;
  });
  JournalEntry.implementation.create({
    pages,
    name: folder.name,
    folder: folder.folder?.id,
  });
}
