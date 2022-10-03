function curry(fn) {
  return (...args) => {
    if (args.length < fn.length) {
      return curry(fn.bind(null, ...args));
    } else {
      return fn(...args);
    }
  };
}

const sum = (a, b, c) => a + b + c;
const fn = curry(sum);

console.log(fn(1)(2)(3));
console.log(fn(1, 2)(3));
console.log(fn(1)(2, 3));
