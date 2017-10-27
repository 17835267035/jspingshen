window.onload = function(){
	//banner
	let banner = $('#banner');
	let bimg = document.getElementsByClassName('banner-img')[0];
	let lis = bimg.getElementsByTagName('li');
	let btn = document.getElementsByClassName('banner-btn')[0];
	let lis1 = btn.getElementsByTagName('li');
	// console.log(lis1);
	for(let i=0;i<lis1.length;i++){
		lis1[i].onclick = function(){
			for(let j=0;j<lis.length;j++){
				animate(lis[j],{opacity:0});
				lis1[j].style.background = '#98979b';
			}
			animate(lis[i],{opacity:1});
			lis1[i].style.background = '#fff';
			num = i;
		}
	}
	let num = 0;
	let t;
	t = setInterval(move,2000);
	banner.onmouseover = function(){
		clearInterval(t);
	}
	banner.onmouseout = function(){
		t = setInterval(move,2000);
	}
	function move(){
		num++;
		if(num == lis.length){
			num = 0;
		}
		for(let i=0;i<lis.length;i++){
			animate(lis[i],{opacity:0});
			lis1[i].style.background = '#98979b';
		}
		animate(lis[num],{opacity:1});
		lis1[num].style.background = '#fff';
	}

	//对戒
	let dj = document.querySelector('.pict-section');
	let djul = document.querySelector('#owl-demo');
	let djli = djul.querySelectorAll('.item');
	console.log(djli);
	function djmove(){
		djul.style.transform = `translateX(-${1140}px)`;
		djul.style.transition = `all ${1}s`;
	}
	function djmoveL(){
		djul.style.transform = `translateX(${0}px)`;
		djul.style.transition = `all ${1}s`;
	}
	let start1 = setInterval(djmoveL,4000);
	let start = setInterval(djmove,8000);

}