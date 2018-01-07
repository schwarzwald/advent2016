module.exports = input => {
  let order = 3 ** (Math.log2(input) / Math.log2(3) | 0);
  let quotient = input / order / 2 | 0;
  return (1 + quotient) * input - (1 + 2 * quotient) * order || input;
}