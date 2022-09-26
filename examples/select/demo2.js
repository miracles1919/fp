/**
 * 1. 获取全部的列表
 * 2. 获取一个或多个类型的列表
 * 3. 获取否定类型的列表
 * 4. 获取指定状态的列表
 * 5. 获取指定状态，指定类型的列表
 */
const R = require('ramda');

const data = [
  {
    type: 1,
    flag: true,
  },
  {
    type: 2,
    flag: false,
  },
  {
    type: 3,
    flag: true,
  },
];

/**
 * all list
 */
const all = () => true;
const getList = R.filter(all);
const dataAll = getList(data);
console.log(dataAll);

/**
 * pick type
 */
const typeEq1 = R.propEq('type', 1);
const typeEq2 = R.propEq('type', 2);
const getType1 = R.filter(typeEq1);
const getType2 = R.filter(typeEq2);
const dataType1 = getType1(data);
const dataType2 = getType2(data);
console.log(dataType1, dataType2);

/**
 * not
 */
const typeNotEq1 = R.compose(R.not, typeEq1);
const getTypeNotEq1 = R.filter(typeNotEq1);
const dataTypeFilter1 = getTypeNotEq1(data);
console.log(dataTypeFilter1);

/**
 * both、either
 */
const flagEqTrue = R.propEq('flag', true);
const getTypeNotEq1AndFlagTrue = R.filter(R.both(flagEqTrue, typeEq1));
const dataTypeNotEq1AndFlagTrue = getTypeNotEq1AndFlagTrue(data);
console.log(dataTypeNotEq1AndFlagTrue);

const getTypeNotEq2EitherFlagTrue = R.filter(
  R.either(flagEqTrue, R.filter(R.compose(R.not, typeEq2)))
);
const dataTypeNotEq2EitherFlagTrue = getTypeNotEq2EitherFlagTrue(data);
console.log(dataTypeNotEq2EitherFlagTrue);
