window.onload = function(){
	let canvas = document.querySelector('canvas');
	let ctx = canvas.getContext("2d");
	let eraser = document.querySelector('#eraser');
	let fonts = document.querySelector('#font');
	let cj = document.querySelector('#caijian');
	let clips = document.querySelector('.clip');
	let tc = document.querySelector('#tc');
	let mb = document.querySelector('#mb');
	let miao = document.querySelector('#miao');
	let tian = document.querySelector('#tian');
	let news = document.querySelector('#new');
	let saves = document.querySelector('#save');
	let clearAll = document.querySelector('#clear');
	let reverses = document.querySelector('#reverse');
	let linew = document.querySelector('#linew');
	let eraser1 = document.querySelector('.eraser');
	let opacity = document.querySelector('.opacity');
	let pal = new Palette(opacity,ctx,eraser1,tian,miao);
	let tools = document.querySelectorAll('.tool');
	console.log(linew);
	// pal.draw('line');//先触发画线
	tools.forEach(element=>{
		element.onclick = function(){
			let num = 0;
			document.querySelector('li[active=true]').setAttribute('active',false);
			this.setAttribute('active',true);
			if(this.id == 'pencel'){
				pal.pencel();
				return;
			}
			if(this.id == 'poly' || this.id == 'polyJ'){
				num = prompt('边数',5);
			}
			pal.draw(this.id,num);
		}
	})
	tools[0].onclick();//先触发画线
	
	cancel.onclick = function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		pal.cancel();
	}
	tc.onclick = function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		pal.tc();
	}
	mb.onclick = function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		pal.mb();
	}
	tian.onclick = function(){
		pal.tianc();
	}
	miao.onclick = function(){
		pal.miaob();
	}
	fonts.onclick = function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		pal.font();
	}
	eraser.onclick = function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		pal.eraser();
	}
	cj.onclick = function(){
		document.querySelector('li[active=true]').setAttribute('active',false);
		this.setAttribute('active',true);
		pal.clip(clips);
	}
	saves.onclick = function(){
		let data = canvas.toDataURL('image/png');
		saves.href = data;
		saves.download = 'tu.png';
	}
	clearAll.onclick = function(){
		pal.clearAll();
	}
	news.onclick = function(){
		let flag = confirm('是否需要保存');
		if(flag){
			saves.onclick();
		}
		clearAll.onclick();
		// location.href = canvas.toDataURL('image/png').replace('image/png','image/octct-stream');
	}
	reverses.onclick = function(){
		pal.reverse1();
	}
	linew.onclick = function(){
		ctx.lineWidth = Number(linew.value);
	}
}