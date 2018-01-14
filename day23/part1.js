const toggleMap = new Map([
  ['inc', 'dec'],
  ['dec', 'inc'],
  ['tgl', 'inc'],
  ['cpy', 'jnz'],
  ['jnz', 'cpy']
]);

module.exports = input => {
  let registers = new Map();
  let instructions = input.split('\r\n');
  let ip = 0;

  const getVal = value => isNaN(value) ? +registers.get(value) || 0: +value;
  const toggle = instr => instr.replace(/(\w+)/.exec(instr)[1], toggleMap.get(/(\w+)/.exec(instr)[1]));

  registers.set('a', 7);

  while(ip < instructions.length) {
    let instr = instructions[ip];
    let [,type, arg1, arg2] = /(\w+)\s([-\d\w]+)\s?(.*)?/.exec(instr);

    switch (type) {
      case 'cpy': registers.set(arg2, getVal(arg1)); break;
      case 'inc': registers.set(arg1, getVal(arg1) + 1); break;
      case 'dec': registers.set(arg1, getVal(arg1) - 1); break;
      case 'jnz': ip += (getVal(arg1) != 0)? getVal(arg2): 1;  continue;
      case 'tgl': instructions[ip + getVal(arg1)] ? instructions[ip + getVal(arg1)] = toggle(instructions[ip + getVal(arg1)]): null; break;
    }

    ip++;
  }

  return registers.get('a');
}