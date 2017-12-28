module.exports = input =>
  input.split('\r\n')
    .reduce((counts, line) => { 
      [...line].forEach((c, id) => 
        (counts[id] = counts[id] || new Map()).set(c, (counts[id].get(c) || 0) + 1));
      return counts;
    }, [])
    .map(count => [...count.entries()].sort((a, b) => a[1] - b[1])[0])
    .map(e => e[0])
    .join('')