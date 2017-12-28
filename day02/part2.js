module.exports = input => {
  let moves = new Map();
  moves.set('U', [1, 2, 1, 4, 5, 2, 3, 4, 9, 6, 7, 8, 11]);
  moves.set('D', [3, 6, 7, 8, 5, 10, 11, 12, 9, 10, 13, 12, 13]);
  moves.set('L', [1, 2, 2, 3, 5, 5, 6, 7, 8, 10, 10, 11, 13]);
  moves.set('R', [1, 3, 4, 4, 6, 7, 8, 9, 9, 11, 12, 12, 13]);
  
  return input.split('\r\n').reduce(([code, number], line) => {
    let num = line.split('').reduce((position, dir) => moves.get(dir)[position - 1], number);
    return [`${code}${num.toString(16)}`, num];
  }, ['', 5])[0].toUpperCase();
}