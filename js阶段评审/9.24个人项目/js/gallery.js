$(function(){
		let lis = $('.port1 li');
		let mask = $('div.mask');
		let close = $('div.close');
		let btnl = $('div.btnL');
		let btnr = $('div.btnR');
		let mImg = $('img',mask);
		let num = 0;
		lis.on('click',function(){
			num = $(this).index();
			let src = $(this).find('img').attr('src');
			mImg.attr('src',src);
			mask.addClass('active');
		})
		btnl.click(function(){
			if(num<0){
				num = lis.length;
			}
			let src = $(lis[--num]).find('img').attr('src');
			mImg.attr('src',src); 
		})
		btnr.click(function(){
			++num;
			if(num>8){
				num = 0;
			}
			let src = $(lis[num]).find('img').attr('src');
			mImg.attr('src',src); 
		})
		close.click(function(){
			mask.removeClass('active');
		})
		$(document).mousedown(false);//阻止浏览器的默认行为
		// mask.on('click',function(e){
		// 	let lefts = e.clientX;
		// 	if(lefts<innerWidth/2){
		// 		btnl.trigger('click');
		// 	}
		// 	if(lefts>innerWidth/2){
		// 		btnr.trigger('click');
		// 	}
		// })

	})


