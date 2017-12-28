module.exports = input =>
  input.split('\r\n')
    .map(line => /\s*(\d+)\s+(\d+)\s+(\d+)/.exec(line).map(Number))
    .filter(([,a, b, c]) => (a + b > c) && (b + c > a) && (a + c > b)).length;