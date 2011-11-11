/**
 * @author kingfo  oicuicu@gmail.com
 */
var Array2Iterator = function(a){
	if(!a.TYPE && a.TYPE != 'ARRAY2')return;
	this._a = a;
	this._col = 0;
	this._row = 0;
}

Array2Iterator.prototype.getData = function(){
	return this._a.get(this._row,this._col);
}

Array2Iterator.prototype.setData = function(obj){
	this._a.set(this._row,this._col,obj);
}

Array2Iterator.prototype.start = function(){
	this._col = 0;
	this._row = 0;
}

Array2Iterator.prototype.hasNext = function(){
	return (this._row * this._a.getWidth() + this._col) < (this._a.size -1);
}

Array2Iterator.prototype.next = function(){
	var item = this.getData();
	if(++this._col == this._a.getWidth()){
		this._row++;
		this._col = 0;
	}
	return item;
}
