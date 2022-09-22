['jay-chou', 'eason-chan', 'jackie-chan'];

[{ name: 'Jay Chou' }, { name: 'Eason Chan' }, { name: 'Jackie Chan' }];

const arr = ['jay-chou', 'eason-chan', 'jackie-chan'];

const newArr = [];
for (let i = 0; i < arr.length; i++) {
  const names = arr[i].split('-');
  const newName = [];

  names.forEach((item) => {
    newName.push(item[0].toUpperCase() + item.slice(1));
  });

  newArr.push({
    name: newName.join(' '),
  });
}
