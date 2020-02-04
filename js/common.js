const random = (max,min) => Math.floor((Math.random()*(max-min+1))+(min));

function App(){
	let a = new canvas(500,500);
	document.body.append(a.canvas);
	a.Ogrape_animation(100);
}
class canvas{ // canvas 
	constructor(width,height){ // setting 
		this.count = random(6,3);
		this.canvas = document.createElement("canvas");
		this.arr = Array.from( Array(this.count) , (v,idx) => {
			return v = {
				num : random(1000,10),
				value : idx,
				color : `rgb(${random(255,0)},${random(255,0)},${random(255,0)},1)`
			};
		});
		this.mw = this.canvas.width = width;
		this.mh = this.canvas.height = height;
		this.ctx = this.canvas.getContext("2d");
	}
	Ogrape(size=0){
		let p = 0.5/25,
		max = this.arr.reduce( (acc,v,idx) => { return acc+v.num },0)/100;
		this.arr.reduce( (acc,v,idx) =>{
			let result = v.num/max;
			this.arc(this.mw/2,this.mh/2,size,Math.PI*(1.5+acc.result),Math.PI*(1.5+acc.result+result*p),v.color);
			acc.result += result*p;
			return acc;
		},{ result: 0 });
	}
	Ogrape2(size=0,max1=0,line=0.2){
		let p = 0.5/25,
		p2 = 90/0.5,
		p3 = Math.PI/2/90,
		ax = Math.max.apply(null,this.arr.map( v => v.num )),
		max = this.arr.reduce( (acc,v,idx) => { return acc+v.num },0)/100;
		let a = () =>{
			this.ctx.clearRect(0,0,this.mw,this.mh);
			this.arr.reduce( (acc,v,idx) =>{
				let result = v.num/max , x = 0, y = 0;
				if( ax ==v.num ){
					let q = acc.ra+(result*p*p2)/2;
					x = Math.cos( Math.PI/2 - q*p3 ) * line;
					y = Math.sin( Math.PI/2 - q*p3 ) * line;
					y =-y;				
				}
				this.arc(this.mw/2+x,this.mh/2+y,size,Math.PI*(1.5+acc.result),Math.PI*(1.5+acc.result+result*p),v.color);
				acc.result += result*p;
				acc.ra += result*p*p2;
				return acc;
			},{ result: 0 , ra : 0 });
			line += 0.2;
			// console.log(max,line);
			if( line < max1 ){
				window.requestAnimationFrame(a);
			}
		};
		a();
	}
	Ogrape_animation(size=0){
		let result = 0;
		let a = ()=>{
			this.ctx.clearRect(0,0,this.mw,this.mh);
			this.Ogrape(size);
			this.arc(this.mw/2,this.mh/2,size+2,Math.PI*(1.5+result+0.01),Math.PI*(1.5),"#fff");
			result += 0.01;
			if( result < 2 ) window.requestAnimationFrame(a);
			else this.Ogrape2(size,7);
		}
		a();
	}
	arc(x,y,size,first,last,color){
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.fillStyle = color;
		this.ctx.arc(x,y,size,first,last);
		this.ctx.fill();
	}
}
window.onload = function(){
	App();
}