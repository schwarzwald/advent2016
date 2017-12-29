module.exports = input => {
  let endpoints = new Map();
  
  const endpoint = (name) => {
    let e = endpoints.get(name) || { name : name, values: [], low: null, high: null };
    endpoints.set(name, e);
    return e;
  }

  input.split('\n').forEach(line => {
    if (line.startsWith('value')) {
      let [, value, name] = /value (\d+) goes to bot (\d+)/.exec(line);
      endpoint(name).values.push(value);
    } else {
      let [, name, lowType, low, highType, high] = /bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/.exec(line);
      endpoint(name).low = (lowType == 'bot')? low: 'o' + low;
      endpoint(name).high = (highType == 'bot')? high: 'o' + high;
    }
  });
  
  do {
    var finished = true;

    [...endpoints.values()].forEach(e => {
      if (e.name[0] != 'o' && e.values.length == 2) {
        endpoint(e.low).values.push(Math.min(...e.values));
        endpoint(e.high).values.push(Math.max(...e.values));
        e.values = [];
        finished = false;
      }
    });
  } while (!finished);
   
  return [...endpoints.values()]
    .filter(e => ['o0', 'o1', 'o2'].includes(e.name))
    .reduce((product, output) => product * output.values[0], 1);
}