export function cleanName(name: string): string {
  // replace all underscores with spaces
  // and capitalize the first letter of each word
  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .replace(/%20/g, ' ')
    .trim();
}
