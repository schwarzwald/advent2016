module.exports = input =>
  input.split('\r\n')
    .filter(line => {
      let bracket = outside = inside = false;

      for (let i = 0; i < line.length - 3; i++) {
        bracket = (line[i] == '[') ? true : (line[i] == ']') ? false : bracket;
          
        if (line[i] != line[i + 1] && line[i + 1] == line[i + 2] && line[i] == line[i + 3]) {
          if (bracket) {
            inside = true;
          } else {
            outside = true;
          }
        }
      }

      return !inside && outside;
    }).length;