/**
 * 1. 获取所有年龄小于 18 岁的对象，并返回他们的名称和年龄
 * 2. 查找所有男性用户
 * 3. 更新一个指定名称用户的成绩（不影响原数组）
 * 4. 取出成绩最高的 10 名，并返回他们的名称和分数
 */
const R = require('ramda');

const data = [
  {
    name: 'Mike1',
    sex: 'male',
    age: 20,
    score: 80,
  },
  {
    name: 'Mike2',
    sex: 'male',
    age: 16,
    score: 85,
  },
  {
    name: 'Mike3',
    sex: 'female',
    age: 18,
    score: 95,
  },
  // ...
];

/**
 * lt18
 */

// :: String -> Number -> Object -> Boolean
const propLt = R.curry((p, n) => R.pipe(R.prop(p), R.lt(R.__, n)));

// :: Object -> Boolean
const ageLt18 = propLt('age', 18);

// :: [a] -> [a]
const getAgeLt18 = R.pipe(R.filter(ageLt18), R.map(R.pick(['name', 'age'])));

const dataAgeLt18 = getAgeLt18(data);
console.log(dataAgeLt18);

/**
 * male
 */
// :: String -> [a] -> [a]
const getSex = (sex) => R.filter(R.propEq('sex', sex));

// :: [a] -> [a]
const getMales = getSex('male');
const dataMales = getMales(data);
console.log(dataMales);

/**
 * update score
 */
const updatePropBy = R.curry((byProp, updateProp, byPropVal, updateVal) =>
  R.when(R.propEq(byProp, byPropVal), R.assoc(updateProp, updateVal))
);

const updatePropByName = updatePropBy('name');
const updatePropScoreByName = updatePropByName('grade');
const updateScoreByName = R.curry((name, score) =>
  R.map(updatePropScoreByName(name)(score), data)
);
const updateData = updateScoreByName('Mike1', 99);
console.log(updateData);

/**
 * top
 */
const descendBy = (p) => R.sort(R.descend(R.prop(p)));
const descendByScore = descendBy('score');
const getScoreTop2 = R.pipe(
  descendByScore,
  R.take(2),
  R.map(R.pick(['name', 'score']))
);
const topData = getScoreTop2(data);
console.log(topData);
