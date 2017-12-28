module.exports = input =>
  input.split('\r\n').reduce(([code, number], line) => {
    let num = line.split('').reduce((position, dir) => {
      switch (dir) {
        case 'U': return position > 3 ? position - 3: position;
        case 'D': return position < 7 ? position + 3: position;
        case 'L': return (position - 1) % 3 > 0 ? position - 1: position;
        case 'R': return (position - 1) % 3 < 2 ? position + 1: position;
      }
    }, number);
    return [`${code}${num}`, num];
  }, ['', 5])[0];