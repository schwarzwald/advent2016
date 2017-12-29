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
  
  let wanted = null;
  do {
    var finished = true;
    
    [...endpoints.values()].forEach(e => {
      if (e.name[0] != 'o' && e.values.length == 2) {
        if (e.values.includes(61) && e.values.includes(17)) {
          wanted = e.name;
        }
        
        endpoint(e.low).values.push(Math.min(...e.values));
        endpoint(e.high).values.push(Math.max(...e.values));
        e.values = [];
        finished = false;
      }
    });
  } while (!finished);
   
  return wanted;
}