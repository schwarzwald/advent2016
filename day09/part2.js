const decompressedLength = input => {
  let position = totalLength = 0;
  while (position < input.length) {
    if (input[position] == '(') {
      let repetition = '';
      position++;
      while (input[position] != ')') {
        repetition += input[position];
        position++;
      }
      let [length, count] = repetition.split('x');
      totalLength += decompressedLength(input.substr(position + 1, length)) * count;
      position += +length + 1;
    } else {
      totalLength++;
      position++;
    }
  }
  return totalLength;
}

module.exports = input => decompressedLength(input);