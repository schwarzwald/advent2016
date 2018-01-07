module.exports = input =>
  input.split('\r\n')
    .map(line => line.split('-').map(Number))
    .reduce((result, r, id, ranges) =>
      [
        ...result.filter(q => q[1] < r[0] || q[0] > r[1]),
        result.filter(q => q[1] >= r[0] && q[0] <= r[1])
          .reduce(([min, max], r) =>
            [Math.min(min, r[0]), Math.max(max, r[1])], [r[0], r[1]])
      ], [])
    .sort((a, b) => a[0] - b[0])
    .reduce((min, r) => r[0] <= min ? r[1] + 1 : min, 0);