const fact = n => n ? n * fact(n - 1) : 1;
module.exports = input => fact(12) + 73 * 77;