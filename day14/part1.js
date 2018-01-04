const md5 = require('md5');

module.exports = input => {
  let counter = 0;
  let found = 0;

  while (found < 64) {
    let hash = md5(input + counter);
    let matches = /(\w)\1\1/.exec(hash);
    
    if (matches) {
      let symbols = matches[1].repeat(5);
      for (let i = counter + 1; i < counter + 1001; i++) {
        if (md5(input + i).includes(symbols)) {
          found++;
          break;
        }
      }

    }
    
    counter++;
  }
  
  return counter - 1;
}