module.exports = input =>
  input.split(', ').reduce(([[x, y], [dx, dy]], curr) => {
    [dx, dy] = (curr[0] == 'L')? [-dy, dx]: [dy, -dx];
    
    let [, mag] = /(\d+)/.exec(curr);
    
    return [[x + dx * mag, y + dy * mag], [dx, dy]];
  }, [[0, 0],[0, 1]])[0].reduce((distance, curr) => distance + Math.abs(curr), 0);
