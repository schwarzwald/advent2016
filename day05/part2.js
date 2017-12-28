const md5 = require('md5');

module.exports = input => {
  let counter = 0;
  let password = new Array(8).fill('_');
  let found = 0;
  
  while (found != 8) {
    let hash = md5(input + counter);
    
    if (hash.startsWith('00000')) {
      if (+hash[5] < 8 && password[hash[5]] == '_') {
        password[hash[5]] = hash[6];
      }
      
      found = password.filter(e => e != '_').length;
    }
    
    counter++;
  }
  
  return password;
}