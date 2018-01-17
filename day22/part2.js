module.exports = input => {
    let lines = input.split('\r\n')
    .slice(2)
    .map(line => /node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T/.exec(line))
    .map(([, x, y, size, used, avail]) => [+x, +y, +size, +used, +avail]);

  let [width, height] = lines.reduce(([width, height], [x, y]) => [Math.max(+x + 1, width), Math.max(+y + 1, height)], [0, 0]);

  let carrier = [];
  let grid = [...new Array(height)].map(r => []);

  lines.forEach(([x, y, size, used, avail]) => {
    if (lines.some(([x2, y2, size2, used2, avail2]) => (x2 != x || y2 != y) && avail2 >= used && used2 != 0)) {
      carrier = [x, y];
    }

    grid[y][x] = lines.some(([x2, y2, size2, used2, avail2]) => avail2 >= used);
  });

  let goal = [width - 1, 0];
  let queue = [[...carrier, 0]];
  let visited = new Set();

  while (queue.length) {
    let [x, y, distance] = queue.shift();
    let id = `${x}-${y}`;

    if (visited.has(id)) {
      continue;
    }

    visited.add(id);

    if (x == goal[0] - 1 && y == goal[1]) {
      return distance + 5 * (width - 2) + 1;
    }

    [-1, 0, 1].forEach(dy =>
      [-1, 0, 1].forEach(dx => {
        if (dx * dx ^ dy * dy && grid[y + dy] && grid[y + dy][x + dx]) {
          queue.push([x + dx, y + dy, distance + 1]);
        }
      })
    );
  }
}