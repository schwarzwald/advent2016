const triangle = (a, b, c) => (a + b > c) && (b + c > a) && (a + c > b);

module.exports = input =>
  input.split('\r\n')
    .map(line => /\s*(\d+)\s+(\d+)\s+(\d+)/.exec(line).map(Number))
    .reduce((total, cols, idx, rows) =>
      total + (((idx + 1) % 3 == 0) ? [
        triangle(rows[idx][1], rows[idx - 1][1], rows[idx - 2][1]), 
        triangle(rows[idx][2], rows[idx - 1][2], rows[idx - 2][2]), 
        triangle(rows[idx][3], rows[idx - 1][3], rows[idx - 2][3])
      ].filter(b => b).length : 0), 0);