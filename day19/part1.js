module.exports = input => ((input ^ (1 << (Math.log2(input) | 0))) << 1) + 1