const _ = {
  '@@functional/placeholder': true,
};

const _isPlaceholder = function (a) {
  return a !== null && typeof a === 'object' && a['@@functional/placeholder'];
};

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
    const combined = [];
    let argsIdx = 0;
    let combinedIdx = 0;
    let len = length;

    while (combinedIdx < received.length || argsIdx < args.length) {
      let res;
      // 遍历received，如果存在占位符，替换成对应的args
      if (
        combinedIdx < received.length &&
        (!_isPlaceholder(received[combinedIdx]) || argsIdx >= args.length)
      ) {
        res = received[combinedIdx];
      } else {
        res = args[argsIdx++];
      }

      combined[combinedIdx++] = res;
      if (!_isPlaceholder(res)) {
        len--;
      }
    }

    return len > 0
      ? _arity(len, curry(length, combined, fn))
      : fn.apply(this, combined);
  };
}

const sum = (a, b, c) => a + b + c;
const fn = curry(sum.length, [], sum);

// console.log(fn('1', _, '2')('3'));
console.log(fn('1', _, '2')(_)('3'));
