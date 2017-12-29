const ones = number => {
  let count = 0;
  while (number != 0) {
    count += number & 1 ? 1: 0;
    number >>= 1;
  }
  return count;
}

const generate = (seed, size) => {
  let maze = new Array(size * size).fill(false);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      maze[y * size + x] = (ones(x*x + 3*x + 2*x*y + y + y*y + seed) % 2) != 0;
    }
  }
  return maze;
}

module.exports = input => {
  let size = 50;
  let maze = generate(+input, size);
  let target =39 * size + 31;
  let visited = new Set();
  let queue = [[1 * size + 1, 0]];
  while (queue.length && position != target) {
    var [position, steps] = queue.shift();
    let x = position % size;
    let y = (position / size) | 0;
    
    if (visited.has(position)) {
      continue;
    }
    
    visited.add(position);
    
    [-1, 0, 1].forEach(dx => 
      [-1, 0, 1].forEach(dy => {
        if (Math.abs(dx) ^ Math.abs(dy) && x + dx >= 0 && x + dx <= size - 1 && y + dy >= 0 && y + dy <= size - 1) {
          if (!maze[position + dy * size + dx]) {
            queue.push([position + dy * size + dx, steps + 1]);
          }
        }
      })
    );
  } 

  return steps;
}