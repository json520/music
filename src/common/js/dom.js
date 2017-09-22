// 添加class
export function addClass(el,className){
    if(hasClass(el,className)){
        return 
    }else{
        
        let newClass = el.className.split(' ');  //分割成数组
        newClass.push(className); //把新的clasName添加进去
        el.className = newClass.join(' '); //拼接后赋值给元素  
    }

}

// 判断在这个dom里面有没有class
export function hasClass(el,className){
    // 设置一个正则，因为el.className是字符串所以可以用test进行正则验证
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}


/*
获取属性值
el:元素
key:属性
value:属性值
当有value的时候则是赋值的意思
*/ 
export function getAttr(el,key,value){
    const name = 'data-' + key
    if(value){
        return el.setAttribute(name,value)
       
    }else{
        return el.getAttribute(name)
    }
}

/*
js监测浏览器给css添加前缀
传入参数css

1.创建一个div的style
2.创建一个立即执行函数！里面有浏览器厂商的前缀
3.判断有没有
4. 向外释放一个方法！
如果没有！则返回false!如果为standard返回正常！如果有则第二个首字母大写！

*/ 

let elementStyle = document.createElement('div').style;
let vendor = (() =>{
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

   for (let key in transformNames){
       if(elementStyle[transformNames[key]] !== undefined){
           return key
       }
   }

   return false;
})()

export function prefixStyle(style) {
    if(vendor === false){
        return false
    }

    if(vendor === 'standard'){
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

