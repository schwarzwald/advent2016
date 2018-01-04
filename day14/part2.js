const md5 = require('md5');

module.exports = input => {
  let counter = found = 0;
  let hashes = new Map();
  
  const hash2017 = input => {
    let stored = hashes.get(input);
    if (!stored) {
      let counter = 2017;
      stored = input;
      while (counter--) {
        stored = md5(stored);
      }
      hashes.set(input, stored);
    }
    return stored;
  }
  
  while (found < 64) {
    let key = hash2017(input + counter);
    let matches = /(\w)\1\1/.exec(key);
    
    if (matches) {
      let symbols = matches[1].repeat(5);
      for (let i = counter + 1; i < counter + 1001; i++) {
        if (hash2017(input + i).includes(symbols)) {
          found++;
          break;
        }
      }

    }
    
    counter++;
  }
  
  return counter - 1;
}