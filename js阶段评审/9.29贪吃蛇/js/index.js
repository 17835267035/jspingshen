//属性：长度  速度  方向  边界
//   蛇  arr[位置或者坐标]
//方法：画线  画蛇
//      动画  加头  去尾
//      加头：
//         新头(x+1,y)
//         旧头(x,y)  方向
//      this指向  .bind()
function Snake(){
	this.sence = document.querySelector('div.sence');
	this.snake = ['6_0','7_0','8_0'];
	this.direction = 40;
	this.food = '';
	this.flag = {'6_0':true,'7_0':true,'8_0':true};
}
Snake.prototype = {
	start:function(){
		this.drawLine();	
		this.drawSnake();
		this.move();
		this.key();
		this.dropFood();
	},
	//画线
	drawLine:function(){
		for(let i=0;i<20;i++){
			for(let j=0;j<20;j++){
				this.sence.innerHTML +=`<div class ="block" id="${i}_${j}"></div>`;
			}
		}
	},
	//画蛇
	drawSnake:function(){
		this.snake.forEach(element=>{
			document.getElementById(element).classList.add('hot');
		})
	},
	//移动
	move:function(){
		//加头  去尾
		let that = this;
		that.t = setInterval(function(){
			let oldt = that.snake[that.snake.length-1];
			let arr = oldt.split('_');
			let newt = '';
			if(that.direction == 37){
				newt = `${arr[0]*1}_${arr[1]*1-1}`;
			}else if(that.direction == 38){
				newt = `${arr[0]*1-1}_${arr[1]*1}`;
			}
			else if(that.direction == 39){
				newt = `${arr[0]*1}_${arr[1]*1+1}`;
			}
			else if(that.direction == 40){
				newt = `${arr[0]*1+1}_${arr[1]*1}`;
			}
			//判断边界
			let arr1 = newt.split('_');
			if(arr1[1]<0 || arr1[1]>19 || arr1[0]<0 || arr1[0]>19 || that.flag[newt]){
				clearInterval(that.t);
				alert('Gameover');
				return;
				
			}
			//自己咬自己本身
			// if(that.flag[newt]){
			// 	alert('Gameover');
			// 	return;
			// }
			//新头坐标 == 食物  新头加进去  食物消失  再投一次食物  去掉样式
			that.snake.push(newt);
			that.flag[newt] = true;
			if(newt == that.food){
				document.getElementById(that.food).style.background = '';
				that.dropFood();
			}else{
				let weiba = that.snake.shift();
				delete that.flag[weiba];
				document.getElementById(weiba).classList.remove('hot');
			}
			
			that.drawSnake();
		},1000)
	},
	//改变方向
	key:function(){
		document.onkeydown = function(e){
			let keyCode = e.keyCode;
			if(Math.abs(keyCode-this.direction)==2){
				return;
			}
			this.direction = keyCode;
		}.bind(this);   //改变this指向
	},
	//投食   x_y
	dropFood:function(){
		let x = Math.floor(Math.random()*20);
		let y = Math.floor(Math.random()*20);
		//x_y
		do{
			x = Math.floor(Math.random()*20);
			y = Math.floor(Math.random()*20);
		}while(this.flag[`${x}_${y}`])

		this.food = `${x}_${y}`;
		document.getElementById(this.food).style.background = 'red';
	}

}