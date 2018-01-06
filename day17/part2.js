const md5 = require('md5');

module.exports = input => {
  let queue = [[0, '']];
  let max = '';
  
  while (queue.length) {
    let [position, path] = queue.shift();
    
    if (position == 15) {
      max = Math.max(max, path.length);
      continue;
    }
    
    let x = position % 4;
    let y = (position / 4) | 0;
    
    let hash = md5(input + path);
    let open = 'bcdef';
    
    if (y > 0 && open.includes(hash[0])) {
      queue.push([position - 4, path + 'U']);
    }
    
    if (y < 3 && open.includes(hash[1])) {
      queue.push([position + 4, path + 'D']);
    }
    
    if (x > 0 && open.includes(hash[2])) {
      queue.push([position - 1, path + 'L']);
    }
    
    if (x < 3 && open.includes(hash[3])) {
      queue.push([position + 1, path + 'R']);
    }
  }
  
  return max;
}
