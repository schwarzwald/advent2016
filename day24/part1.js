const distance = ([x1, y1], [x2, y2], grid) => {
  const manhattan = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1);
  
  let visited = [];
  let queue = [{ x: x1, y: y1, fScore: manhattan([x1, y1], [x2, y2]), gScore: 0 }];
  
  while (queue.length) {
    let current = queue.shift();
    if (current.x == x2 && current.y == y2) {
      return current.gScore;
    }
    
    visited.push(current);
    
    [-1, 0, 1].forEach(dy =>
      [-1, 0, 1].forEach(dx => {
        if ((dx * dx) ^ (dy * dy) && grid[current.y + dy] && grid[current.y + dy][current.x + dx]) {
          if (grid[current.y + dy][current.x + dx] != '#') {
            if (visited.some(({x, y}) => x == current.x + dx && y == current.y + dy)) {
              return;
            }
            
            if (!queue.some(({x, y}) => x == current.x + dx && y == current.y + dy)) {
              queue.push({ x : current.x + dx, y : current.y + dy, fScore: Infinity, gScore: current.gScore + 1}); 
            }
            
            let neighbor = queue.find(({x, y}) => x == current.x + dx && y == current.y + dy);
            
            if (neighbor.gScore < current.gScore + 1) {
              return;
            }
            
            neighbor.gScore = current.gScore + 1;
            neighbor.fScore = neighbor.gScore + manhattan([neighbor.x, neighbor.y], [x2, y2]);
          }
        }
      })
    );
    
    queue.sort((a, b) => a.fScore - b.fScore);
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
        permutation.reduce(([sum, current], v) => [sum + distances.get(current).get(v), v], [0, 0])[0]
      ),
      Infinity
    );
}