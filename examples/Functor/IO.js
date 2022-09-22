const fs = require('fs');
const path = require('path');
const R = require('ramda');

class IO {
  static of(val) {
    return new IO(val);
  }

  constructor(val) {
    this.val = val;
  }

  map(f) {
    return new IO(R.compose(f, this.val));
  }

  join() {
    return this.val();
  }

  flatMap(f) {
    return this.map(f).join();
  }
}

const readFile = function (filename) {
  return IO.of(function () {
    return fs.readFileSync(filename, 'utf-8');
  });
};

const print = function (x) {
  return IO.of(function () {
    console.log(x);
    return x;
  });
};

const split = function (x) {
  return IO.of(function () {
    return x.split('\n').filter((item) => item);
  });
};

const tail = function (x) {
  return IO.of(function () {
    console.log('tail: ', x[x.length - 1]);
    return x[x.length - 1];
  });
};

const a = readFile(path.join(__dirname, './Ap.js'))
  .flatMap(print)
  .flatMap(split)
  .flatMap(tail);

a.val();
