const inverse = (a, n) => {
    let [t, t1] = [0, 1];
    let [r, r1] = [n, a];
    
    while (r1 != 0) {
        quotient = (r / r1) | 0;
        [t, t1] = [t1, t - quotient * t1];
        [r, r1] = [r1, r - quotient * r1];
    }
    
    return (t < 0) ? t + n: t;
}

module.exports = input => {
  let rules = input.split('\r\n').map(line => 
    /Disc #\d+ has (\d+) positions; at time=0, it is at position (\d+)/.exec(line)
  ).map(([, mod, x]) => [+mod, +x]);

  let n = rules.reduce((product, rule) => product * rule[0], 1);
  
  return rules.reduce((solution, rule, t) =>
    solution + ((rule[0] - (rule[1] + t + 1) % rule[0]) % rule[0]) * n / rule[0] * inverse(n / rule[0], rule[0]), 
  0) % n;
}