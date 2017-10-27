//属性：线宽、线端点样式、填充、描边、样式、边数
//方法：画线、虚线、矩形、多边形、多角形、圆、铅笔、文字
//      橡皮
//      撤销
//      裁切
//      新建
//      保存
class Palette{
	constructor(opacity,ctx,eraser1,tian,miao){
		this.canvas = opacity;
		this.ctx = ctx;
		this.cw = 1371;
		this.ch = 1371;
		//样式
		this.ctx.lineWidth = 1;
		this.lineCap = 'butt';
		//颜色
		this.ctx.strokeStyle = '#fff';
		this.ctx.fillStyle = '#000';
		//描边  填充
		this.style = 'stroke';
		//历史记录
		this.arr = [];
		this.temp = null;//裁切

		this.eraser1 = eraser1;
		this.tian = tian;
		this.miao = miao;
		
	};
	init(){
		this.ctx.strokeStyle = this.strokeStyle;
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.lineCap = this.lineCap;
		this.ctx[this.style]();
	};
	//画直线
	line(cx,cy,ox,oy){
		this.ctx.beginPath();
		this.ctx.moveTo(cx, cy);
		this.ctx.lineTo(ox, oy);
		this.ctx.stroke();
	};
	//画矩形
	rect(cx,cy,ox,oy){
		for(let i=0;i<4;i++){
			this.ctx.beginPath();
			this.ctx.moveTo(cx, cy);
			let w = cx-ox,
				h = cy-oy;
			this.ctx.rect(cx,cy,-w,-h);
			this.ctx[this.style]();
		}
	}
	//撤销
	cancel(){
		if(!this.arr.length){return};
			this.arr.pop();
			this.ctx.clearRect(0,0,this.cw,this.ch);
			if(this.arr.length){
				this.ctx.putImageData(this.arr[this.arr.length-1],0,0);
			}
	};
	//画虚线
	dash(){
		this.canvas.onmousedown = function(e){
			let cx = e.offsetX,cy = e.offsetY;
			this.canvas.onmousemove = function(e){
				let ox = e.offsetX,oy = e.offsetY;				
				this.ctx.clearRect(0,0,this.cw,this.ch);
				if(this.arr.length){
					this.ctx.putImageData(this.arr[this.arr.length-1],0,0);
				}
				this.ctx.beginPath();
				this.ctx.moveTo(cx, cy);
				this.ctx.setLineDash([3,10]); 
				this.ctx.lineTo(ox, oy);
				this.ctx.stroke();
			}.bind(this);
			this.canvas.onmouseup = function(){
				this.arr.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.ctx.setLineDash([3,0]);
				this.canvas.onmouseup = null;
				this.canvas.onmousemove = null;
			}.bind(this);
		}.bind(this);
	};
	//画圆
	circle(cx,cy,ox,oy){
		let r = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
		this.ctx.beginPath();
		this.ctx.arc(cx,cy,r,0,Math.PI*2);
		this.ctx.closePath();
		this.ctx[this.style]();
	};
	//铅笔画
	pencel(){
		this.canvas.onmousedown = function(e){
			let cx = e.offsetX,cy = e.offsetY;
			this.ctx.beginPath();
			this.ctx.moveTo(cx, cy);
			this.canvas.onmousemove = function(e){
				let ox = e.offsetX,oy = e.offsetY;
				this.ctx.strokeStyle = this.strokeStyle;
				this.ctx.lineWidth = this.lineWidth;
				this.ctx.clearRect(0,0,this.cw,this.ch);
				if(this.arr.length){
					this.ctx.putImageData(this.arr[this.arr.length-1],0,0);
				}
				
				this.ctx.lineTo(ox, oy);
				this.ctx.stroke();
			}.bind(this);
			this.canvas.onmouseup = function(){
				this.arr.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.canvas.onmouseup = null;
				this.canvas.onmousemove = null;
			}.bind(this);
		}.bind(this);
	};
	//多边形
	poly(cx,cy,ox,oy,n){
		let rad = Math.PI*2/n;
		let r = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
		this.ctx.beginPath();
    	this.ctx.moveTo(cx+r,cy);			
		for(let i=0;i<n;i++){					
			let x = cx+r*Math.cos(rad*i),
		    	y = cy+r*Math.sin(rad*i);				    
		    this.ctx.lineTo(x,y);
		}
		this.ctx.closePath();
		this.ctx[this.style]();
	};
	//多角形
	polyJ(cx,cy,ox,oy,n){
		let rad = Math.PI/n;
		// this[type]();
		let r = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
		this.ctx.beginPath();
    	this.ctx.moveTo(cx+r,cy);			
		for(let i=0;i<2*n;i++){
			let r1;
			r1 = i%2 == 0 ? r : r/2;
			let x = cx+r1*Math.cos(rad*i),
			    y = cy+r1*Math.sin(rad*i);
			    this.ctx.lineTo(x,y);
		}
		this.ctx.closePath();
		this.ctx[this.style]();
	};
	//橡皮
	eraser(){
		this.canvas.onmousedown = function(){
		// this.eraser1.style.display = 'block';	
			this.canvas.onmousemove = function(e){
				let mw = this.canvas.offsetWidth, 
					mh = this.canvas.offsetHeight, 
					sw=this.eraser1.offsetWidth,
					sh=this.eraser1.offsetHeight
					;
				let ox = e.offsetX-25,oy = e.offsetY-25;
				if(ox>=mw-sw){
					ox = mw-sw;
				}
				if(ox<=0){
					ox = 0;
				}
				if(oy>=mh-sh){
					oy = mh-sh;
				}
				if(oy<=0){
					oy = 0;
				}
				this.eraser1.style.left = `${ox}px`;
				this.eraser1.style.top = `${oy}px`;
				this.eraser1.style.display = 'block';
				this.ctx.clearRect(ox,oy,50,50);	
			}.bind(this);
				this.eraser1.onmouseup = function(){
				this.eraser1.style.display = 'none';
				this.arr.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.canvas.onmouseup = null;
				this.canvas.onmousemove = null;
			}.bind(this);
		}.bind(this);
	};
	//填充
	tc(){
		this.style = 'fill';
	};
	//描边
	mb(){
		this.style = 'stroke';
	};
	tianc(){
		this.tian.onblur = function(){
			this.ctx.fillStyle = this.tian.value;
		}.bind(this);
	};
	miaob(){
		this.miao.onblur = function(){
			this.ctx.strokeStyle = this.miao.value;
		}.bind(this);
	};
	draw(type,n){
		this.canvas.onmousedown = function(e){
			let cx = e.offsetX,cy = e.offsetY;
			this.canvas.onmousemove = function(e){
				//样式
				// this.init();
				let ox = e.offsetX,oy = e.offsetY;
				this.ctx.clearRect(0,0,this.cw,this.ch);
				if(this.arr.length){
					this.ctx.putImageData(this.arr[this.arr.length-1],0,0);
				}
				this[type](cx,cy,ox,oy,n);
				// this.init();
			}.bind(this);
			this.canvas.onmouseup = function(){
				this.arr.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.canvas.onmouseup = null;
				this.canvas.onmousemove = null;
			}.bind(this);	
		}.bind(this);
	};
	//字体
	font(){
		let that = this;
		let lefts = 0,tops = 0;
		this.canvas.onmousedown = function(e){
			that.canvas.onmousedown = null;
			let cx = e.offsetX,cy = e.offsetY;  //当前点击的位置
			let divs = document.createElement('div');
			divs.contentEditable = true;
			divs.style.cssText = `
			width:150px;height:30px;border:1px dashed #ccc;
			position:absolute;top:${cy}px;left:${cx}px;
			cursor:move;
			`;
			this.appendChild(divs); //把元素插进去

			//拖拽
			divs.onmousedown = function(e){
				let cx = e.clientX,cy = e.clientY;
				let left = divs.offsetLeft,top = divs.offsetTop;
					that.canvas.onmousemove = function(e){
						let ox = e.clientX,oy = e.clientY;
						lefts = left + ox-cx;
						tops = top + oy-cy;
						if(lefts<=0){
							lefts = 0;
						}
						if(lefts>=that.cw - 150){
							lefts = that.cw - 150;
						}
						divs.style.left = `${lefts}px`;
						divs.style.top = `${tops}px`;
					}
					divs.onmouseup = function(){
						that.arr.push(that.ctx.getImageData(0,0,that.cw,that.ch));
						that.canvas.onmousemove = null;
						this.onmouseup = null;
					}
			}
			//失去焦点
			divs.onblur = function(){
				let value = this.innerText;//保存内容
				that.canvas.removeChild(divs);
				// divs = null;
				that.ctx.font = 'bold 20px sans-serif';
				that.ctx.textAlign = 'center';
				that.ctx.textBaseLine = 'middle';
				that.ctx.fillText(value,lefts,tops);
				that.arr.push(that.ctx.getImageData(0,0,that.cw,that.ch));
			}
		}
	};
	//裁剪
	clip(obj){
		let that = this;
		let minX,minY,w,h;
		this.canvas.onmousedown = function(e){
			let cx = e.offsetX,cy = e.offsetY;
			obj.style.display = 'block';
			obj.style.width = 0;
			obj.style.height = 0;
			that.canvas.onmousemove = function(e){
				let ox = e.offsetX,oy = e.offsetY;
				w = Math.abs(cx-ox),h = Math.abs(cy-oy);//选区的尺寸
				minX = ox >= cx ? cx:ox; 
				minY = oy >= cy ? cy:oy; 
				obj.style.left = `${minX}px`;
				obj.style.top = `${minY}px`;
				obj.style.width = `${w}px`;
				obj.style.height = `${h}px`;
			}
			that.canvas.onmouseup = function(){
				that.temp = that.ctx.getImageData(minX,minY,w,h);
				that.ctx.clearRect(minX,minY,w,h);
				that.arr.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.ctx.putImageData(that.temp,minX,minY);//放回原来的位置
				obj.style.display = 'none';
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
				that.drag(minX,minY,obj);
			}
		}
	};
	//裁剪拖拽
	drag(x,y,obj){
		let that = this;
		this.canvas.onmousedown = function(e){
			let cx = e.offsetX,cy = e.offsetY;
			e.preventDefault();
			that.canvas.onmousemove = function(e){
				let ox = e.offsetX,oy = e.offsetY;
				let lefts = x+ox-cx,
					tops = y+oy-cy;
				obj.style.left = `${lefts}px`;
				obj.style.top = `${tops}px`;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if(that.arr.length){
					that.ctx.putImageData(that.arr[that.arr.length-1],0,0);
						
				}
				that.ctx.putImageData(that.temp,lefts,tops);
			}
			that.canvas.onmouseup = function(){
				that.arr.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.temp = null;
				obj.style.display = 'none';
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
			}
		}
	};
	//清空
	clearAll(){
		this.ctx.clearRect(0,0,this.cw,this.ch);
		this.arr.push(this.ctx.getImageData(0,0,this.cw,this.ch));
	};
	//反向
	reverse1(){
		let imagedata = this.ctx.getImageData(0,0,this.cw,this.ch);
		for(let i=0;i<imagedata.data.length;i+=4){
			//变成彩色
			imagedata.data[i] = 255-imagedata.data[i];
			imagedata.data[i+1] = 255-imagedata.data[i+1];
			imagedata.data[i+2] = 255-imagedata.data[i+2];

			// 变成灰色
			// imagedata.data[i] = imagedata.data[i+1] = imagedata.data[i+2] = (imagedata.data[i]+imagedata.data[i+1]+imagedata.data[i+2])/3;
		}
		this.ctx.putImageData(imagedata,0,0);
	};

}

