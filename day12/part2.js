module.exports = input => {
  let registers = new Map();
  let instructions = input.split('\r\n');
  let ip = 0;
  registers.set('c', 1);
  
  const getVal = value => isNaN(value) ? +registers.get(value) || 0: +value;

  while(ip < instructions.length) {
    let instr = instructions[ip];
    let [,type, arg1, arg2] = /(\w+)\s([\d\w]+)\s?(.*)?/.exec(instr);

    switch (type) {
      case 'cpy': registers.set(arg2, getVal(arg1)); break;
      case 'inc': registers.set(arg1, +getVal(arg1) + 1); break;
      case 'dec': registers.set(arg1, +getVal(arg1) - 1); break;
      case 'jnz': ip += (getVal(arg1) != 0)? getVal(arg2): 1; continue;
    }

    ip++;
  }

  return registers.get('a');
}