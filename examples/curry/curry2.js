// https://github.com/ramda/ramda/blob/master/source/internal/_arity.js
function _arity(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    //...
  }
}

function curry(length, received, fn) {
  return function (...args) {
    const combined = received.concat(args);
    if (combined.length < fn.length) {
      return _arity(length - combined.length, curry(length, combined, fn));
    } else {
      return fn.apply(this, combined);
    }
  };
}

const sum = (a, b, c) => a + b + c;
const fn = curry(sum.length, [], sum);

console.log(fn(1)(2).length);
console.log(fn(1, 2)(3));
console.log(fn(1)(2, 3));
