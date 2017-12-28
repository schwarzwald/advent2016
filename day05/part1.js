const md5 = require('md5');

module.exports = input => {
  let counter = 0;
  let password = '';

  while (password.length < 8) {
    let hash = md5(input + counter);
    
    if (hash.startsWith('00000')) {
      console.log(counter, hash);
      password += hash[5];
    }
    
    counter++;
  }
  
  return password;
}