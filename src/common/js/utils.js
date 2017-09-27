// 打乱数组！
function getRandom(min, max) { //返回min到max之间的整数！包含min或max
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) { //重新洗牌！打乱数组顺序
  console.log('打乱',arr)
  let list = arr.slice();
  for (let i = 0; i < list.length; i++) {

    let j = getRandom(0, i);
    let t = list[i];
    list[i] = list[j]
    list[j] = t;
  }
  return list
}