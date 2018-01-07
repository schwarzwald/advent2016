module.exports = input =>
  4294967296 - input.split('\r\n')
      .map(line => line.split('-').map(Number))
      .reduce((result, r, id, ranges) =>
        [
          ...result.filter(q => q[1] < r[0] || q[0] > r[1]),
          result.filter(q => q[1] >= r[0] && q[0] <= r[1])
            .reduce(([min, max], r) =>
              [Math.min(min, r[0]), Math.max(max, r[1])], [r[0], r[1]])
        ], [])
      .reduce((sum, range) => sum + range[1] - range[0] + 1, 0)