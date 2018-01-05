const dragonBit = (input, n) => {
  let offset = n % (input.length + 1);
  let segment = (n / (input.length + 1)) | 0; 
  
  if (n % (input.length + 1) == input.length) {
    return dragonBit([0], segment);
  }
  
  return !(segment & 1) ? input[offset] : input[input.length - offset - 1] ^ 1;
}

const checksum = (input, length) => {
  let groupSize = length & -length;
  let groups = length / groupSize;
  
  let result = new Array(groups).fill(1);
  
  for (let i = 0; i < groups; i++) {
    for (let j = 0; j < groupSize; j++) {
      result[i] ^= dragonBit(input, i * groupSize + j);
    }
  }
  
  return result;
}

module.exports = input => checksum([...input].map(Number), 35651584).join('');