//属性
//  哪些字母  个数   速度  位置  生命值  分数
//方法
//  产生字符  下落   消除  重新开始  下一关  重复  重叠
//构造函数
//产生字符  页面元素  个数  
//产生随机的下标
//confirm('确定');
//this.classList.add('hot');添加类名
//this.classList.remove('hot');移除类名
//this.classList.toggle('hot');切换类名  原来有删除，原来没有添加
function Game(){
	this.charArr = [
	  ["Q",'img/Q.jpg'],
	  ["W",'img/W.jpg'],
	  ["E",'img/E.jpg'],
	  ["R",'img/R.jpg'],
	  ["T",'img/T.jpg'],
	  ["Y",'img/Y.jpg'],
	  ["U",'img/U.jpg'],
	  ["I",'img/I.jpg'],
	  ["O",'img/O.jpg'],
	  ["P",'img/P.jpg'],
	  ["A",'img/A.jpg'],
	  ["S",'img/S.jpg'],
	  ["D",'img/D.jpg'],
	  ["F",'img/F.jpg'],
	  ["G",'img/G.jpg'],
	  ["H",'img/H.jpg'],
	  ["J",'img/J.jpg'],
	  ["K",'img/K.jpg'],
	  ["L",'img/L.jpg'],
	  ["Z",'img/Z.jpg'],
	  ["X",'img/X.jpg'],
	  ["C",'img/C.jpg'],
	  ["V",'img/V.jpg'],
	  ["B",'img/B.jpg'],
	  ["N",'img/N.jpg'],
	  ["M",'img/M.jpg']
	];
	//页面元素
	this.current = [];
	//个数
	this.number = 5;
	//速度
	this.speed = 10;
	//位置
	this.position = [];
	this.gk = 1;
	this.score = 0;
	this.hp = 10;
	// this.words=[];
	this.guan=document.querySelector('.guan');
	this.fen=document.querySelector('.fen');
}
Game.prototype = {
	start:function(){
		this.getchars();
		this.drop();
		this.key();
	},
	getchars:function(){
		for(let i=0;i<this.number;i++){
			this.getchar();
		}
	},
	//元素去重叠
	checkposition:function(lefts){
		let flag = this.position.some(function(value){
			return Math.abs(value-lefts)<80;
		})
		return flag;
		
	},
	//元素去重复
	delRepeat:function(word){
		let flag=this.current.some(function(value){
			return value.innerText==word;
		})
		return flag;
	},
	getchar:function(){
		let index = Math.floor(Math.random()*this.charArr.length); //下标
		//this.charArr[index]  this.current[i].innerText  some  //去重复位置
		let divs = document.createElement('div');
		divs.innerText = this.charArr[index];
		while(this.delRepeat(divs.innerText)){
			index = Math.floor(Math.random()*this.charArr.length);
			divs.innerText = this.charArr[index]; 
		}
		divs.classList.add('char');
		//top  left 
		let tops = Math.random()*100;
		let lefts = (innerWidth-400)*Math.random()+200;
		//元素去重叠
		while(this.checkposition(lefts)){
			lefts = (innerWidth-400)*Math.random()+200;
		}
		divs.style.cssText = `
			top:${tops}px;
			left:${lefts}px;
			background-image:url(${this.charArr[index][1]});
			font-size:0;
		`;
		document.body.appendChild(divs);
		this.current.push(divs);//添加到current
		this.position.push(lefts);
	},
	
	drop:function(){
		let that = this;
		this.t = setInterval(function(){
			for(let i=0;i<that.current.length;i++){
				let tops = that.current[i].offsetTop+that.speed;
				that.current[i].style.top = `${tops}px`;
				if(tops>=600){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					let hps=document.getElementsByTagName('span')[2];
					that.hp--;
					hps.innerText = that.hp;
					that.getchar();
					if(that.hp<=0){
						let flag = confirm('是否重新开始?');
						if(flag){
							that.restart();
						}else{
							close();
						}
					}

				}
			}
		},500)
	},
	//按下键盘码
	key:function(){
		let that = this;
		document.onkeydown = function(e){
			// e.keyCode  与divs.innerText 进行对比；
			for(let i=0;i<that.current.length;i++){
				if(that.current[i].innerText.includes(String.fromCharCode(e.keyCode))){
					document.body.removeChild(that.current[i]);
					that.score +=2;
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getchar();
					that.fen.innerHTML=that.score;
					if(that.score%10==0){
						that.next();
					}
				}
			}	
		}	
	},
	next:function(){
		clearInterval(this.t);
		for(let i=0;i<this.current.length;i++){
			document.body.removeChild(this.current[i]);
		}
		this.current.length = 0;
		this.position.length = 0;
		this.number ++;
		this.gk++;
		this.guan.innerHTML=this.gk;
    	this.fen.innerHTML=this.score;
    	if(this.number>=12){
			this.speed++;
			this.number = 10;
		}
		this.start();

	},
	restart:function(){
		clearInterval(this.t);
		for(let i=0;i<this.current.length;i++){
			document.body.removeChild(this.current[i]);
		}
		this.current.length = 0;
		this.position.length = 0;
		this.number =5;
		this.gk = 1;
	    this.guan.innerHTML=this.gk;
    	this.fen.innerHTML=0;
    	this.start();
	},
	end:function(){
     clearInterval(this.t);
		for(let i=0;i<this.current.length;i++){
			document.body.removeChild(this.current[i]);
		}
		this.current.length=0;
		this.position.length=0;
		this.score=0;
		this.number=5;
		this.gk=0;
		this.guan.innerHTML=this.gk;
    	this.fen.innerHTML=this.score;
	},
	stop:function(){
		clearInterval(this.t);
	},
	cons:function(){
		this.drop();
	}

}