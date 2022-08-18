export function hasDieNumber(line: string) {
  // match d4, d6, d8, d10, d12, d20, d100
  return /^d[0-9]{1,4}/.test(line.trim());
}
