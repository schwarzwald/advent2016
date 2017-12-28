const real = (name, checksum) =>
  [...[...name].filter(l => l != '-').reduce((result, letter) => {
    result.set(letter, (result.get(letter) || 0) + 1);
    return result;
  }, new Map()).entries()]
    .sort((a, b) => a[1] == b[1]? a[0].localeCompare(b[0]): b[1] - a[1])
    .map(e => e[0])
    .join('')
    .substr(0, 5) == checksum;

module.exports = input =>
  input.split('\r\n')
    .map(line => /([a-z-]+)-(\d+)\[(\w+)\]/.exec(line))
    .filter(([,letters, id, checksum]) => real(letters, checksum))
    .reduce((total, [,letters, id, checksum]) => total + +id, 0);