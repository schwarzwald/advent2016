module.exports = input => input.split(', ').reduce(([[x, y], [dx, dy], visited, found], curr) => {
    if (found) {
      return [[x, y], [0, 0], visited, true];
    }
    
    [dx, dy] = (curr[0] == 'L')? [-dy, dx]: [dy, -dx];
    
    let [, mag] = /(\d+)/.exec(curr);
    
    for (let i = 1; i <= mag; i++) {
      let id = `${x + dx * i},${y + dy * i}`;
      if (visited.has(id)) {
        return [[x + dx * i, y + dy * i], [0, 0], visited, true];
      }
      visited.add(id);
    }
    
    return [[x + dx * mag, y + dy * mag], [dx, dy], visited, false];
  }, [[0, 0],[0, 1], new Set(), false])[0].reduce((distance, curr) => distance + Math.abs(curr), 0);