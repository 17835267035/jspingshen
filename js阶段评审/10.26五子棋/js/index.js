$(function(){
	let hei = {};
	let bai = {};
	let kongbai = {};//0_0:{x:0,y:0}
	let isAi = true;//机器人白
	for(let i=0;i<15;i++){
		$('<div>').addClass('shu').appendTo('.qipan');
		$('<span>').addClass('hang').appendTo('.qipan');
		for(let j=0;j<15;j++){
			kongbai[i+'_'+j] = {x:i,y:j};
			$('<li>').addClass('qizi').attr('id',i+'_'+j).data('pos',{x:i,y:j}).appendTo('.qipan');
		}
	}
	let start = $('.start');
	start.on('click',function(){
	let flag = true;
	$('.qipan .qizi').on('click',function(){
		if($(this).hasClass('hei') || $(this).hasClass('bai')){
			return;
		}
		let data = $(this).data('pos');
		if(flag){
			$(this).addClass('hei');
			hei[data.x+"_"+data.y] = true;
			delete kongbai[data.x+"_"+data.y];
			if(pd(data,hei)>=5){
				alert('黑棋胜利!');
				$('.qipan .qizi').off();
				isAi = false;
			}
			if(isAi){
				let pos = ai();
				$(`#${pos.x}_${pos.y}`).addClass('bai');
				bai[pos.x+"_"+pos.y] = true;
				delete kongbai[pos.x+"_"+pos.y];
				if(pd(pos,bai)>=5){
					alert('白棋胜利!');
					$('.qipan .qizi').off();					
				}	
			}
		}else{
			$(this).addClass('bai');
			bai[data.x+"_"+data.y] = true;
			delete kongbai[data.x+"_"+data.y];
			if(pd(data,bai)>=5){
				$('.qipan .qizi').off();
				alert('白棋胜利!');
			}
		}
	})
})

	function ai(){
		let max = -Infinity , max1 = -Infinity;//无穷小的
		let zb = null , zb1 = null;//坐标
		//白子最大能得多少分
		for(let i in kongbai){
			let score = pd(kongbai[i],bai);
			if(score > max){
				max = score;
				zb = kongbai[i];
			}
		}

		for(let i in kongbai){
			let score = pd(kongbai[i],hei);
			if(score > max1){
				max1 = score;
				zb1 = kongbai[i];
			}
		}

		return (max > max1) ? zb : zb1;//bai>hei  进攻
	}

	//判断棋子位置  颜色
	function pd(pos,obj){
		let rows=1,cols=1,zx=1,yx=1;//上  下  左斜  右斜
		let i = pos.x,j = pos.y+1;
		//hang
		while(obj[i+'_'+j]){
			rows++;
			j++;
		}
		j = pos.y-1;//归原位
		while(obj[i+'_'+j]){
			rows++;
			j--;
		}
		//shu
		i = pos.x+1,j = pos.y;
		while(obj[i+'_'+j]){
			cols++;
			i++;
		}
		i = pos.x-1;//归原位
		while(obj[i+'_'+j]){
			cols++;
			i--;
		}

		//zuoxie
		i = pos.x+1,j = pos.y+1;
		while(obj[i+'_'+j]){
			zx++;
			i++;
			j++;
		}
		i = pos.x-1,j = pos.y-1;
		while(obj[i+'_'+j]){
			zx++;
			i--;
			j--;
		}

		//youxie
		i = pos.x-1,j = pos.y+1;
		while(obj[i+'_'+j]){
			yx++;
			i--;
			j++;
		}
		i = pos.x+1,j = pos.y-1;
		while(obj[i+'_'+j]){
			yx++;
			i++;
			j--;
		}
		// console.log(rows,cols,zx,yx);
		return Math.max(rows,cols,zx,yx);//取最大值
	}

})
