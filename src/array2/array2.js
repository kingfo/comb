/**
 * A two-dimensonal array.
 * @author kingfo  oicuicu@gmail.com
 */


var Array2 = function(/* side<Number> | width<Number>,height<Number>,[obj<any>,inst<Boolean>] */){
	var o = this._getSize(arguments);
	if(!o)return;
	
	this.TYPE = 'ARRAY2';
	
	this._w = o.w;
	this._h = o.h;
	
	this.size = this._w * this._h;
	
	this._a = [];
	this._a.length = this.size;
	
	this.fill(arguments[2]||null,arguments[3]);
	
};

Array2.prototype._getSize = function (args){
	var len = args.length,side,w,h;
	
	switch(len){
		case 0:
			return {w:0, h:0};
		case 1:
			side = args[0];
			if(side < 0) return null;
			return {w:side, h:side};
		default:
			w = args[0] || -1;
			h = args[1] || -1;
			if(w < 0 || h < 0) return null;
			return {w:w, h:h};
	}
}

Array2.prototype.getWidth = function(){
	return this._w;
}

Array2.prototype.getHeight = function(){
	return this._h;
}

Array2.prototype.fill = function (obj,inst){
	var len = this.size,i;
	if(inst){
		for (i = 0; i < len; i++){
			this._a[i] = new obj();
		}
		return;
	}
	for(i = 0; i < len; i++){
		this._a[i] = obj;
	}
}

Array2.prototype.get = function (row,col){
	return this._a[row * this._w + col];
}

Array2.prototype.set = function (row,col,obj){
	this._a[row * this._w + col] = obj;
}

Array2.prototype.resize = function (/* side<Number> | width<Number>,height<Number>*/){
	var o = this._getSize(arguments),
		copy = this._a.concat(),
		minw,minh,col,row,t1,t2,
		sw = this._w,
		sh = this._h,
		ts;
	if(!o)return;
	
	ts = o.w * o.h;
	this._a.length = 0;
	this._a.length = ts;
	
	minw = o.w < sw ? o.w : sw;
	minh = o.h < sh ? o.h : sh;
	
	for(row = 0; row < minh; row++){
		t1 = row * o.w;
		t2 = row * sw;
		for (col = 0; col < minw; col++){
			
			this._a[t1 + col] = copy[t2 + col];
		}
	}
	
	this._w = o.w;
	this._h = o.h; 
	this.size = ts;
}

Array2.prototype.getRow = function (row){
	var offset = row * this._w;
	return this._a.slice(offset,offset + this._w);
}

Array2.prototype.setRow = function (row,a){
	if (row < 0 || row >= this._h) throw new Error("row index out of bounds");
	var col,
		sw = this._w,
		offset = row * sw;
		
	for(col = 0; col  < sw; col++){
		this._a[offset + col] = a[col]; 
	}
}

Array2.prototype.getCol = function (col){
	var t = [],i;
	for (i = 0; i < this._h; i++){
		t[i] = _a[i * this._w + col];
	}
	return t;
}

Array2.prototype.setCol = function (col,a){
	var row,
		sw = this._w;
		
	if (col < 0 || col >= sw) throw new Error("column index out of bounds");
		
	for (row = 0; row < this._h; row++){
		this._a[row * sw + col] = a[row];	
	}
}

Array2.prototype.shiftLeft = function ( ){
	var sw = this._w,
		sh = this._h,
		i,j,k,o,
		a = [];
		
	if (sw == 1) return;
			
	j = sw - 1;
	for ( i = 0; i < sh; i++){
		k = i * sw + j;
		o = this._a.splice(k - j, 1);
		this._a.splice(k, 0, o);
		a.push(o);
	}
	
	return a;
}

Array2.prototype.shiftRight = function (){
	var sw = this._w,
		sh = this._h,
		i,j,k,o,
		a = [];
		
	if (sw == 1) return;
			
	j = sw - 1;
	for (i = 0; i < sh; i++){
		k = i * sw + j;
		o = this._a.splice(k, 1)
		this._a.splice(k - j, 0, o);
		a.push(o);
	}
	
	return a;
}

Array2.prototype.shiftUp = function (){
	var sw = this._w,
		sh = this._h,
		a;
	
	a = this._a.splice(0, sw);
	this._a = this._a.concat(a);
	
	return a;
}

Array2.prototype.shiftDown = function (){
	var sw = this._w,
		sh = this._h,
		a,offset;
	if (sh == 1) return;
			
	offset = (sh - 1) * sw;
	a = this._a.splice(offset, offset + sw);
	this._a = a.concat(this._a);
	return a;
}

Array2.prototype.appendRow = function (a){
	a.length = this._w;
	this._a = this._a.concat(a);
	this._h++;
	this.size = this._w * this._h;
}

Array2.prototype.prependRow = function (a){
	a.length = this._w;
	this._a = a.concat(this._a);
	this._h++;
	this.size = this._w * this._h;
}

Array2.prototype.appendCol = function (a){
	var sw = this._w,
		sh = this._h,
		row;
	a.length = sh;
	for (row = 0; row < sh; row++){
		this._a.splice(row * sw + sw + row, 0, a[row]);
	}
	this._w++;
	this.size = this._w * this._h;
}

Array2.prototype.prependCol = function (a){
	var sw = this._w,
		sh = this._h,
		row;
	a.length = sh;
	for (row = 0; row < sh; row++){
		this._a.splice(row * sw + row, 0, a[row]);
	}
	this._w++;
	this.size = this._w * this._h;
}

Array2.prototype.transpose = function (){
	var sw = this._w,
		sh = this._h,
		a = this._a.concat(),
		row,col;
	for (row = 0; row < sh; row++)	{
		for ( col = 0; col < sw; col++){
			this._a[col * sw + row] = a[row * sw + col];
		}
	}
}

Array2.prototype.getArray = function (){
	return this._a;
}

Array2.prototype.contains = function (o){
	var len = this.size,
		i;
	for (i = 0; i < len; i++){
		if (this._a[i] === o)	return true;
	}
	return false;
}

Array2.prototype.clear = function (){
	this._a = [];
	this._a.length = this.size;
}

Array2.prototype.setArray = function( /* list<Array | Array-Like>,[width<Number>,height<Number>] */ ){
	var a = arguments[0], 
		w = arguments[1],
		h = arguments[2],
		i,len,
		ta = [];
	if(!a && !a.length )return false;
	
	len = a.length;
	for(i = 0; i < len; i++){
		ta[i] = a[i];
	}
	
	this.resize(w,h);
	
	this._a = ta;
	
	return true;
}

/*debug only*/
Array2.prototype.dump = function(){
	var a = [],
		offset,value,row;
	for (row = 0; row < this._h; row++){
		if(row>0)a.push("\n");
		offset = row * this._w;
		for (col = 0; col < this._w; col++){
			value = this._a[offset + col];
			a.push("[" + (value != undefined ? value : "?") + "]");
		}
	}
	return a.join('');
}

if(!exports){
	 var exports = {};
}
exports.Array2 = Array2;