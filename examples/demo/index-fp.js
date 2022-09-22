const R = require('ramda');

const arr = ['jay-chou', 'eason-chan', 'jackie-chan'];

const capitalize = (x) => x[0].toUpperCase() + x.slice(1);

const genObj = R.curry((key, x) => {
  let obj = {};
  obj[key] = x;
  return obj;
});

const handleName = R.compose(R.join(' '), R.map(capitalize), R.split('-'));

const convertObj = R.compose(genObj('name'), handleName);

const convertName = R.map(convertObj);

const res = convertName(arr);
