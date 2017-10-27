// function getClass(classname){
// 	if(document.getElementsByClassName){  //换成flase
// 		return document.getElementsByClassName(classname);
// 	}else{
// 		var newarr = [];
// 		var all = document.getElementsByTagName('*');
// 		for(var i=0;i<all.length;i++){
// 			if(all[i].className == classname){
// 				newarr.push(all[i]);
// 			}
// 		}
// 		return newarr;
// 	}
// }

function getClass(classname,ranger){  //ranger是对象
	ranger = ranger ? ranger : document;
	if(document.getElementsByClassName){  //判断兼容性
		return ranger.getElementsByClassName(classname);
	}else{
		var newarr = [];
		var all = ranger.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
			if(checkClass(arr[i].className,classname)){ //当前元素的类名  要找的类名
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}
function checkClass(className,classname){
	var arr = className.split(' ');  //转换成数组
	for(var i=0;i<arr.length;i++){
		if(arr[i] == classname){
			return true;
		}
	}
	return false;
}


//$方便获取指定的元素
//$(select)   //字符串
//$('.one')  $('#one')  $('div')   //字符串
//参数说明
//select  字符串  类似于选择器
//1.  首字符是.      className  集合  
//2.          #      id         元素
//3.         标签名  tagName   正则(/^[a-z][a-z1-6]{0,7}$/.test(select))
//                              开头 首字符 第二个字符    出现次数 最少0次  最多7次
//规则：以字符开头[a-z]
//charAt

function $(select,ranger){
	if(typeof select == 'string'){
		ranger = ranger || document;
		var first = select.charAt(0);
		if(first == '.'){
			// class
			return getClass(select.substring(1),ranger);
		}else if(first == '#'){
			// id
			return document.getElementById(select.substring(1));
		}else if(/^[a-z][a-z1-6]{0,7}$/.test(select)){
			// tag
			return ranger.getElementsByTagName(select);
		}
	}else if(typeof select == 'function'){
		window.addEventListener('load',select);
	}
	
}


////////////////////////////////////////////////////////////////////
// 小广告
function Float(obj){
			this.obj = obj;
			this.maxX = window.innerWidth - this.obj.offsetWidth;
			this.maxY = window.innerHeight - this.obj.offsetHeight;
			// console.log(this.maxY);
			this.speedX = 10;
			this.speedY = 15;
		}
		Float.prototype.stop = function(){
			clearInterval(this.t);
		}
		Float.prototype.resize = function(){
			this.maxX = window.innerWidth - this.obj.offsetWidth;
			this.maxY = window.innerHeight - this.obj.offsetHeight;
		}
		Float.prototype.move = function(){
			let that = this;  //this指向box
			this.t = setInterval(function(){  //t是属性  用箭头函数就能用this
				let lefts = that.obj.offsetLeft + that.speedX;
				let rights = that.obj.offsetTop + that.speedY;
				// console.log(rights);
				if(lefts >= that.maxX){
					lefts = that.maxX;
					that.speedX *=-1;
				}
				else if(rights >= that.maxY){
					rights = that.maxY;
					that.speedY *= -1;
				}
				if(lefts <= 0){
					lefts = 0;
					that.speedX *=-1;
				}
				else if(rights <= 0){
					rights = 0;
					that.speedY *= -1;
				}
				that.obj.style.left = lefts + 'px';
				that.obj.style.top = rights + 'px';
			},60)
		}


//////////////////////////////////////////////////////////////////////
// Children(parent)
// 获取某一个元素的元素节点
function children(parent){
	let newarr = [];
	let childs = parent.childNodes;
	childs.forEach(element =>{
		if(element.nodeType==1){
			newarr.push(element);
		}
	})
	return newarr;
}


//////////////////////////////////////////////////////////////////////
// filter  筛选
function children(parent){
	let childs = parent.childNodes;
	let arr = Array.from(childs);
	let newarr = arr.filter(element =>element.nodeType==1);
	return newarr;
}

/////////////////////////////////////////////////////////////////////
//element 兄弟
//父元素  childs  截取 []
// function next(element,tagname){
// 	let parent = element.parentNode;
// 	let child = parent.children;
// 	let index = 0;
// 	for(let i=0;i<child.length;i++){
// 		if(child[i] == element){
// 			index = i;
// 			break;
// 		}
// 	}
// 	let nextAll = Array.from(child).slice(index+1);

// 	for(let i=0;i<nextAll.length;i++){
// 		if(nextAll[i].nodeName == tagname.toUpperCase()){
// 			return nextAll[i];
// 		}
// 	}
// 	return null;
// }


// element 相邻的下一个元素节点
//  san  while
function next(element,tagname){
	let child = element.nextElementSibling;
	if(child == null){
		return null;
	}
	while(child.nodeName != tagname.toUpperCase()){
		child = child.nextElementSibling;
		if(child == null){
			return null;
		}
		if(child.nodeName == tagname.toUpperCase()){
			return child;
		}
	}
}


// nextAll()
function nextAll(element,tagname){
	let arr = [];
	let childs = element.nextElementSibling;
	if(childs == null){
		return null;
	}

	while(childs != null){
		arr.push(child);
		child = childs.nextElementSibling;
	}
	return arr;
}

// 找父级元素
// function nextparent(element,tagname){
// 	let parent = element.parentNode;
// 	while(parent.nodeName !== tagname.toUpperCase() && element.nodeName == 'body'.toUpperCase()){
// 		parent = parent.parentNode;
// 	}
// 	return parent;

// }


// 找父级元素1
// function nextparent(element,tagname){
// 	let child = element.parentNode;
// 	while(child.nodeName != tagname.toUpperCase()){
// 		child = child.parentNode;
// 		if(child == null){
// 			return null;
// 		}
// 	}
// 	return child;
// }

// 找父级
function nextparent(element){
	if(element.nodeName == 'BODY' || element.nodeName == 'HTML'){
		return;
	}
	let arr = [];
	let parent = element.parentNode;
	while(parent.nodeName !='BODY'){
		arr.push(parent);
		parent = parent.parentNode;
	}
	return arr;
}
// 找父级元素2
// function nextparent(element,tagname){
// 	let parent = [];
// 	while(element.parentNode){
// 		parent.push(element.parentNode);
// 		element=element.parentNode;
// 	}
//     let i = 0;
//     while(parent[i].nodeName != tagname.toUpperCase()){
//     	i++;
//     }
    
// 	return parent[i];

// }


// insertAfter(element,position)  函数
// 将element插入到position
// element 要插入的元素  obj
// position 插入的位置 obj
function insertAfter(element,position){
	let next = position.nextElementSibling;
	let parent = position.parentNode;
	if(next){
		parent.insertBefore(element,next);
	}else{
		parent.appendChild(element);
	}
}

//所有元素节点的构造函数的原型对象  方法
// //插入到某一个元素的后面   兄弟关系
HTMLElement.prototype.insertAfter = function(element){
	let next = this.nextElementSibling;
	let parent = this.parentNode;
	if(next){
		parent.insertBefore(element,next);
	}else{
		parent.appendChild(element);
	}

}

//某一个元素的最前边插入
HTMLElement.prototype.prependChild = function(element){
	let first =this.firstElementChild;
	if(first){
		this.insertBefore(element,first);
	}else{
		this.appendChild(element);
	}
}

//子元素插入到父元素的最后面
HTMLElement.prototype.appendTo = function(element){
	element.appendChild(this);
}

//子元素插入到父元素的最前面
HTMLElement.prototype.prependTo = function(element){
	element.prependChild(this);
}

//清空掉所有的，包括注释元素、文本元素...
HTMLElement.prototype.empty = function(){
	this.innerHTML = '';
}

//滚轮事件的兼容性
function mousewheel(element,upfn,downfn){
	element.addEventListener('mousewheel',fn);
	element.addEventListener('DOMMouseScroll',fn);
	function fn(e){
		e.preventDefault();
		let dir = e.wheelDelta || e.detail;
		if(dir==-120||dir==3){
			downfn.call(element);
		}else if(dir==120||dir==-3){
			upfn.call(element);
		}
	}
}