const width = 50;
const height = 6;

module.exports = input =>
  input.split('\r\n').reduce((grid, transform) => {
    if (transform.startsWith('rect')) {
      let [, cols, rows] = /rect (\d+)x(\d+)/.exec(transform);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          grid[width * y + x] = '#'; 
        }
      }
    } else if (transform.startsWith('rotate row')) {
      let [, y, amount] = /rotate row y=(\d+) by (\d+)/.exec(transform);
      let row = grid.slice(width * y, width * (+y + 1));
      [...row.slice(width - amount), ...row.slice(0, width - amount)].forEach((cell, x) => 
        grid[width * y + +x] = cell);
    } else if (transform.startsWith('rotate column')) {
      let [, x, amount] = /rotate column x=(\d+) by (\d+)/.exec(transform);
      let col = grid.filter((cell, id) => id % width == x);
      [...col.slice(height - amount), ...col.slice(0, height - amount)].forEach((cell, y) => 
        grid[width * y + +x] = cell);
    }
    
    return grid;
  }, new Array(height*width).fill('.'))
  .reduce((rows, cell, id) => { 
    rows[(id / width) | 0] += cell; 
    return rows
  }, new Array(height).fill(''))
  .join('\n');