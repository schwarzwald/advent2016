const { minSteps, parse } = require('./elevators');

module.exports = input => minSteps(parse(input));
