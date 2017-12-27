const { minSteps, parse } = require('./elevators');

module.exports = input => { 
  let floors = parse(input);
  floors[0].push('YG', 'YM', 'ZG', 'ZM');
  
  return minSteps(floors);
}
