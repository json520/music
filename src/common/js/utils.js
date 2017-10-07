// 打乱数组！
function getRandom(min, max) { //返回min到max之间的整数！包含min或max
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) { //重新洗牌！打乱数组顺序
  let list = arr.slice();
  for (let i = 0; i < list.length; i++) {

    let j = getRandom(0, i);
    let t = list[i];
    list[i] = list[j]
    list[j] = t;
  }
  return list
}

/** 
 * 
 / 节流函数！解决search输入框的多余请求
 func： 函数
 delay: 延迟的时间！毫秒
*/
export function getBounce(func, delay) {
  let timer = null;

  return function (...args) { //此处不能写arguments！会报错
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}