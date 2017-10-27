//通讯录
window.addEventListener('load',function(){
	let dl = document.querySelector('dl');
	let zimu = document.querySelector('.zimu');
	let tips = document.querySelector('#tips');
	let info = [
        {name:'陈旭',tell:'17335082851',pinyin:'chenxu'},
        {name:'高敏',tell:'17335082852',pinyin:'gaomin'},
        {name:'吴瑞霞',tell:'17335082853',pinyin:'wuruixia'},
        {name:'申彩玉',tell:'17335082854',pinyin:'shencaiyu'},
        {name:'李淑敏',tell:'18835306824',pinyin:'lishumin'},
        {name:'何瑶瑶',tell:'17335082856',pinyin:'heyaoyao'},
        {name:'何健',tell:'17335082858',pinyin:'hejian'},
        {name:'白鹏',tell:'17335082859',pinyin:'baipeng'},
        {name:'安鹏飞',tell:'17335082860',pinyin:'anpengfei'},
        {name:'丁磊',tell:'17335082861',pinyin:'dinglei'},
        {name:'冯敏',tell:'17335082862',pinyin:'fengmin'},
        {name:'郭世威',tell:'17335082863',pinyin:'guoshiwei'},
        {name:'杜晓红',tell:'17335082864',pinyin:'duxiaohong'},
        {name:'黑狗',tell:'17335082865',pinyin:'heigou'},
        {name:'黑狗',tell:'17335082865',pinyin:'heigou'},
        {name:'黑狗',tell:'17335082865',pinyin:'heigou'},
        {name:'黑狗',tell:'17335082865',pinyin:'heigou'},
        {name:'黑狗',tell:'17335082865',pinyin:'heigou'},
        {name:'黑狗',tell:'17335082865',pinyin:'heigou'},
        {name:'黑狗',tell:'17335082865',pinyin:'heigou'},
        {name:'黑狗',tell:'17335082865',pinyin:'heigou'}
	];

	
	    //搜索方法
		let search = document.querySelector('main input');
		// console.log(search);
		search.oninput = function(){
			// let zimu = document.querySelector('.zimu');
			let name = this.value.trim();	
			let arr = info.filter(function(ele){
				return ele.name.includes(name) || ele.tell.includes(name) || ele.pinyin.includes(name);									
			});	
			render(arr);
		}

	render(info);

	//滑动
	//scrolltop+height>=offsettop
	let dts = document.querySelectorAll('dt');
	// let tips = document.querySelector('#tips');
	let arr1 = [];
	let heights = document.querySelector('main').offsetHeight+tips.offsetHeight;
	dts.forEach(element=>arr1.push(element.offsetTop));
	window.onscroll = function(){
		let scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
		arr1.forEach((value,index)=>{
			if(scrolltop+heights>=value){
				tips.innerText = dts[index].innerText;
			}
		})
	}
	    //按照首字母排序
		//{'c':[{name:'陈旭',tell:17335082856,pinyin:'chenxu'}]
		//
		//}
	//渲染显示通讯录界面方法
	function render(data){
		dl.innerHTML = '';
		let obj = [];
		data.forEach(function(element){
			let first = element.pinyin.charAt(0).toUpperCase();
			if(!obj[first]){
				obj[first] = [];
			}
			obj[first].push(element);

		})
		let char = Object.keys(obj).sort();//获取键名
		tips.innerText = char[0];
		char.forEach(element=>{
			dl.innerHTML += `<dt>${element}</dt>`;
			obj[element].forEach(value=>{
				dl.innerHTML += `
				<dd><a href="tel:${value.tell}">${value.name}</a></dd>
				`;
			})
		})
		
	}
})
