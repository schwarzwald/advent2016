module.exports = input =>
  input.split('\r\n')
    .slice(2)
    .map(line => /node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T/.exec(line))
    .map(([, x, y, size, used, avail]) => [x, y, +size, +used, +avail])
    .reduce((viable, [x, y, size, used, avail], id, lines) =>
      viable + lines.filter(([x2, y2, size2, used2, avail2]) =>
        (x != x2 || y != y2) && used != 0 && avail2 >= used).length, 0);