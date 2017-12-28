module.exports = input =>
  input.split('\r\n')
    .filter(line => {
      let bracket = false;
      let inside = [];
      let outside = [];
      
      for (let i = 0; i < line.length - 2; i++) {
        bracket = (line[i] == '[') ? true : (line[i] == ']') ? false : bracket;
                
        if (line[i] != line[i + 1] && line[i] == line[i + 2]) {
          if (bracket) {
            inside.push(line.substr(i, 3));
          } else {
            outside.push(line.substr(i, 3));
          }
        }
      }
      
      return inside.some(e => outside.includes(e[1] + e[0] + e[1])) || outside.some(e => inside.includes(e[1] + e[0] + e[1]));
    }).length;