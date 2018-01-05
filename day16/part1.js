const dragon = input => [...input, 0, ...input.reverse().map(b => b ^ 1)]

const checksum = input => {
  let result = input.reduce((result, bit, idx, arr) => idx & 1 ? [...result, arr[idx] ^ arr[idx - 1] ^ 1] : result, []); 
  return result.length & 1 ? result : checksum(result); 
}

module.exports = input => {
  let target = 272;
  input = [...input].map(Number);
  
  while (input.length < target) {
    input = dragon(input);
  }
  
  return checksum(input.slice(0, target)).join('');
}