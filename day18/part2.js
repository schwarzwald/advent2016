module.exports = input => {
  input = [...input].map(t => t == '^');
  let sum = 0;
  let rows = 400000;

  while (rows--) {
    sum += input.filter(b => !b).length;
    input = input.map((bit, i) => input[i - 1] ^ input[i + 1]);
  }

  return sum;
}