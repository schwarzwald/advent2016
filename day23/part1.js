const toggleMap = new Map([
  ['inc', 'dec'],
  ['dec', 'inc'],
  ['tgl', 'inc'],
  ['cpy', 'jnz'],
  ['jnz', 'cpy']
]);

const isLetter = str => str.length === 1 && str.match(/[a-z]/i);

module.exports = input => {
  let registers = new Map();
  let instructions = input.split('\r\n');
  let ip = 0;

  const getVal = value => isNaN(value) ? +registers.get(value) || 0: +value;
  const toggle = instr => {
    let [, type] = /(\w+)/.exec(instr);
    return instr ? instr.replace(type, toggleMap.get(type)): instr;
  }

  registers.set('a', 12);

  while(ip < instructions.length) {
    let instr = instructions[ip];
    let [,type, arg1, arg2] = /(\w+)\s([-\d\w]+)\s?(.*)?/.exec(instr);
    if (type == 'tgl') {
      console.log(instr, ip, registers)
    }
    switch (type) {
      case 'cpy': if (isLetter(arg2)) { registers.set(arg2, getVal(arg1));} break;
      case 'inc': if (isLetter(arg1)) {registers.set(arg1, +getVal(arg1) + 1);} break;
      case 'dec': if (isLetter(arg1)) {registers.set(arg1, +getVal(arg1) - 1);} break;
      case 'jnz': ip += (getVal(arg1) != 0)? getVal(arg2): 1;  continue;
      case 'tgl': if (instructions[ip + getVal(arg1)]) {
        instructions[ip + getVal(arg1)] = toggle(instructions[ip + getVal(arg1)]);
      } break;
    }
    //console.log(instr, ip, registers);
    ip++;
  }

  return registers.get('a');
}