const distance = ([x1, y1], [x2, y2], grid) => {
  let visited = new Set();
  let queue = [[x1, y1, 0]];
  
  while (queue.length) {
    let [x, y, distance] = queue.shift();
    let id = `${x}-${y}`;
    
    if (visited.has(id)) {
      continue;
    }
    
    if (x == x2 && y == y2) {
      return distance;
    }
    
    visited.add(id);
    
    [-1, 0, 1].forEach(dy =>
      [-1, 0, 1].forEach(dx => {
        if (dx * dx ^ dy * dy && grid[y + dy] && grid[y + dy][x + dx]) {
          queue.push([x + dx, y + dy, distance + 1]);
        }
      })
    );
  }
  
  return null;
}

const permutator = (arr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(arr)

  return result;
}

module.exports = input => {
  let rows = input.split('\r\n');
  let grid = [];
  let goals = new Map();
  
  rows.forEach((row, y) => {
    grid[y] = [];
    [...row].forEach((cell, x) => {
      grid[y][x] = cell != '#';
      if (cell != '.' && cell != '#') {
        goals.set(+cell, [x, y]);
      }
    });
  });
  
  let keys = [...goals.keys()];
  let distances = new Map();
  
  for (let i = 0; i < keys.length - 1; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      let a = keys[i];
      let b = keys[j];

      let dist = distance(goals.get(a), goals.get(b), grid);

      distances.set(a, distances.get(a) || new Map());
      distances.set(b, distances.get(b) || new Map());
      
      distances.get(a).set(b, dist); 
      distances.get(b).set(a, dist); 
    }
  }

  return permutator([...new Array(keys.length - 1)]
    .map((v, id) => id + 1))
    .reduce((min, permutation) => 
      Math.min(
        min, 
        [...permutation, 0].reduce(([sum, current], v) => [sum + distances.get(current).get(v), v], [0, 0])[0]
      ),
      Infinity
    );
}