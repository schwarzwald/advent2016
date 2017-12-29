module.exports = input => {
  let decompressed = '';
  let position = 0;
  while (position < input.length) {
    if (input[position] == '(') {
      let repetition = '';
      position++;
      while (input[position] != ')') {
        repetition += input[position];
        position++;
      }
      let [length, count] = repetition.split('x');
      decompressed += input.substr(position + 1, length).repeat(count);
      position += +length + 1;
    } else {
      decompressed += input[position];
      position++;
    }
  }
  
  return decompressed.length;
}