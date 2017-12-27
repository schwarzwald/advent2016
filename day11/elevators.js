const minSteps = (floors) => {
  let elevator = target = steps = 0;
  let top = floors.length - 1;
  
  do {
    target = elevator + 1;
    
    let free = floors[elevator].filter(n => n[1] == 'G' || !floors[target].some(e => e[1] == 'G') || floors[target].some(e => e[0] == n[0]) || floors[elevator].some(e => e[0] == n[0] && e[1] == 'G'));
    steps += Math.max(free.length - 2, 0) * 2 + 1;
    
    floors[target].push(...free);
    floors[elevator] = floors[elevator].filter(e => !free.includes(e));
   
    elevator = target;
    
    if (target == top) {
      steps += floors.reduce((sum, floor, idx) => sum + 2 * (floor.length) * (top - idx), 0);
    }
  } while (target != top);
  
  return steps;
}

const parse = input => {
  let names = new Map();
  let code = 'A';
  let floors = [];
  
  input.split('\r\n').forEach(line => {
    let floor = [];
    let genRegex = /(\w+) generator/g;
    let chipRegex = /(\w+)-compatible/g;
    let match;
    
    while (match = genRegex.exec(line)) {
      if (!names.get(match[1])) {
        names.set(match[1], code);
        code = String.fromCharCode(code.charCodeAt(0) + 1);
      }
      floor.push(names.get(match[1]) + 'G');
    }
    
    while (match = chipRegex.exec(line)) {
      if (!names.get(match[1])) {
        names.set(match[1], code);
        code = String.fromCharCode(code.charCodeAt(0) + 1);
      }
      floor.push(names.get(match[1]) + 'M');
    }
    
    floors.push(floor);
  });
  
  return floors;
}

module.exports = { parse, minSteps }