//有没有class
export function hasClass(el,className){
	//正则有没有className,前面和后面可能会有空格
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
	
	return reg.test(el.className)
}

//添加class--如果没有添加class！可能是通过组件加载的时候父组件里面的slot还没有加载！添加个数据判断给点时间
export function addClass(el,className){
	if(hasClass(el,className)){
		return 
	}
	//获取的el.className都是有空格的
	let newClass = el.className.split(' ');
	newClass.push(className)
	
	el.className = newClass.join(' ')
}
