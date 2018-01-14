const transformations = [
  [/swap position (\d+) with position (\d+)/, (arr, p1, p2) => arr.map((c, id) => id == p1 ? arr[p2] : id == p2 ? arr[p1] : c)],
  [/swap letter (\w) with letter (\w)/, (arr, c1, c2) => arr.map(c => c == c1 ? c2 : c == c2 ? c1 : c)],
  [/reverse positions (\d+) through (\d+)/, (arr, p1, p2) => arr.map((c, id) => id >= p1 && id <= p2 ? arr[+p1 + +p2 - id] : c)],
  [/rotate left (\d+) step/, (arr, s) => arr.map((c, id) => arr[(arr.length + id - +s) % arr.length])],
  [/rotate right (\d+) step/, (arr, s) => arr.map((c, id) => arr[(arr.length + id + +s) % arr.length])],
  [/move position (\d+) to position (\d+)/, (arr, p2, p1) => p1 < p2 ? [...arr.slice(0, p1), ...arr.slice(+p1 + 1, +p2 + 1), arr[p1], ...arr.slice(+p2 + 1)]: [...arr.slice(0, p2), arr[p1], ...arr.slice(p2, p1), ...arr.slice(+p1 + 1)]],
  [/rotate based on position of letter (\w)/, (arr, s) =>
    [...new Array(arr.length)].reduce(orig =>
      orig.map((c, id) => 
        orig[(2 * orig.length + id - (1 + orig.indexOf(s) + (orig.indexOf(s) >= 4? 1: 0))) % orig.length]).reduce((result, val, id) => 
          result && val == arr[id], true)? 
            orig: 
            orig.map((c, id) => orig[(arr.length + id + 1) % arr.length]), 
          arr)]
];

module.exports = input =>
  input.split('\r\n')
    .reverse()
    .reduce((result, instruction) =>
      transformations.reduce((result, [pattern, transformation]) => 
        pattern.exec(instruction) ? transformation(result, ...pattern.exec(instruction).slice(1)): result, 
        result), 
      [...'fbgdceah'])
    .join('');