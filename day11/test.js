const minSteps = require('./elevators').minSteps;

console.assert(minSteps([['LM'], ['HM'], ['LG'], ['HG']]) == 7);
console.assert(minSteps([['LG'], ['HG'], ['LM'], ['HM']]) == 5);
console.assert(minSteps([['HM', 'LM'], ['HG'], ['LG'], []]) == 11);
console.assert(minSteps([['PG', 'TG', 'TM', 'XG', 'RG', 'RM', 'CG', 'CM'], ['PM', 'XM'], [], []]) == 47);
console.assert(minSteps([['PG', 'TG', 'TM', 'XG', 'RG', 'RM', 'CG', 'CM', 'YG', 'YM', 'ZG', 'ZM'], ['PM', 'XM'], [], []]) == 71);
