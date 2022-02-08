export function parseGenericFormula(line: string, regexStart: RegExp) {
  // line: Hit Points 66 (12d8 + 12)
  // get string from between parentheses
  // match = (12d8 + 12),12d8 + 12
  const formulaArray = line.match(/\(([^)]+)\)/);
  const regexSplit = line.split(regexStart);
  const beforeRegex = regexSplit[0];
  const afterRegex = regexSplit[1];
  let dieFormula = '';
  let change = '';
  let formula = undefined;
  if (!formulaArray || formulaArray.length < 2) {
    console.log(`Could not parse formula from string: ${line}`);
  } else {
    // pull formula from match
    formula = formulaArray[1];

    if (formula.includes('+')) {
      dieFormula = formula.split('+')[0];
      change = formula.split('+')[1];
    } else if (formula.includes('-')) {
      dieFormula = formula.split('-')[0];
      change = '-' + formula.split('-')[1];
    } else {
      dieFormula = formula;
      change = '0';
    }
  }

  const numOfDice = dieFormula.split('d')[0];
  const dieSize = dieFormula.split('d')[1];

  // get value after Hit Points string
  const hp = line.match(regexStart) || '10';
  let afterFormula: string | undefined;
  let beforeFormula: string | undefined;
  if (formula) {
    const formulaSplit: string[] = line.split(formula).map((item) => item.replace('(,', '').replace(')', ''));
    afterFormula = formulaSplit[1];
    beforeFormula = formulaSplit[0];
  }
  return {
    value: parseInt(hp[1]),
    min: Number(numOfDice) + Number(change),
    max: Number(numOfDice) * Number(dieSize) + Number(change),
    str: formula,
    afterRegex,
    beforeRegex,
    mod: Number(change),
    afterFormula,
    beforeFormula,
  };
}
