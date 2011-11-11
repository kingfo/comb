/**
 * @author kingfo  oicuicu@gmail.com
 */
describe('array2',function(){
	var a2,i;
	describe("constructor overload",function(){
		
		it("create by side",function(){
			a2 = new Array2(3); // 3x3 matrix
			expect(a2.getWidth()).toEqual(3);
			expect(a2.getHeight()).toEqual(3);
			expect(a2.size).toEqual(3*3);
		});
		
		it("create by width and height",function(){
			a2 = new Array2(4,2); // 2x4 matrix
			expect(a2.getWidth()).toEqual(4);
			expect(a2.getHeight()).toEqual(2);
			expect(a2.size).toEqual(4*2);
		});
	});
	describe("array2 function",function(){
		it("fill",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.fill(32);
			/*
			 * like:
			 *  	[32][32][32]
			 *  	[32][32][32]
			 */
			expect(a2.dump()).toBe('[32][32][32]\n[32][32][32]');
		});
		
		it("contains",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.fill('32');
			
			expect(a2.contains('32')).toBeTruthy();
		});
		
		it("get/set",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			/*
			 * like:
			 *  	[00][01][02]
			 *  	[10][11][12]
			 */
			expect(a2.get(0,1)).toEqual('01');
			expect(a2.get(1,2)).toEqual('12');
			
			expect(a2.dump()).toBe('[00][01][02]\n[10][11][12]');
			
			expect(a2.get(1,3)).toBe(undefined); 
		});
		
		it("resize",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			
			/*
			 * like:
			 *  	[00][01][02]          [00][01][02]
			 *  	[10][11][12]     to   [10][11][12]
			 *                            [?][?][?]
			 */
			a2.resize(3); //// 3x3 matrix
			expect(a2.dump()).toBe('[00][01][02]\n[10][11][12]\n[?][?][?]');
			
			/*
			 * like:
			 *  	[00][01][02]          [00][01][02][?][?]
			 *  	[10][11][12]     to   [10][11][12][?][?]
			 *      [?][?][?]             [?][?][?][?][?]
			 *                            [?][?][?][?][?]
			 *                            [?][?][?][?][?]
			 */
			a2.resize(5);
			expect(a2.dump()).toBe('[00][01][02][?][?]\n[10][11][12][?][?]\n[?][?][?][?][?]\n[?][?][?][?][?]\n[?][?][?][?][?]');
			
			/*
			 * like:
			 *  	[00][01][02][?][?]        [00][01]
			 *  	[10][11][12][?][?]        [10][11]
			 *      [?][?][?][?][?]      to 
			 *      [?][?][?][?][?]
			 *      [?][?][?][?][?]
			 */
			a2.resize(2);
			expect(a2.dump()).toBe('[00][01]\n[10][11]');
			
			
			/*
			 * like:
			 *  	[00][01]                   [00][01][?]
			 *  	[10][11]         to        [10][11][?]
			 *                                 [?][?][?]
			 *                                 [?][?][?]
			 */
			a2.resize(3,4);
			expect(a2.dump()).toBe('[00][01][?]\n[10][11][?]\n[?][?][?]\n[?][?][?]');
			
		});
		
		it("getRow/setRow",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			
			/*
			 * like:
			 *  	[00][01][02]             [00][01][02]
			 *  	[10][11][12]    to       [10][11][12]
			 *                               [20][21][22]
			 */
			
			expect(function(){
				a2.setRow(2, ['20', '21', '22']);
			}).toThrow();  // index out of bounds
			expect(a2.getWidth()).toEqual(3);
			expect(a2.getHeight()).toEqual(2);
			expect(a2.size).toEqual(6);
			expect(a2.contains('20')).toBeFalsy();
			expect(a2.contains('21')).toBeFalsy();
			expect(a2.contains('22')).toBeFalsy();
			expect(a2.dump()).toBe('[00][01][02]\n[10][11][12]');
			
			a2.resize(3); // resize frist , see also <strong>appendRow</strong>
			expect(a2.getWidth()).toEqual(3);
			expect(a2.getHeight()).toEqual(3);
			expect(a2.size).toEqual(9);
			a2.setRow(2,['20','21','22']);
			expect(a2.contains('20')).toBeTruthy();
			expect(a2.contains('21')).toBeTruthy();
			expect(a2.contains('22')).toBeTruthy();
			expect(a2.dump()).toBe('[00][01][02]\n[10][11][12]\n[20][21][22]');
			
			a2.resize(3,2); // reset array2
			
			a2.resize(3);
			a2.setRow(2,['20','21','22','23','24']); //The new row is truncated if it exceeds the existing width.
			expect(a2.contains('20')).toBeTruthy();
			expect(a2.contains('21')).toBeTruthy();
			expect(a2.contains('22')).toBeTruthy();
			expect(a2.contains('23')).toBeFalsy();
			expect(a2.contains('24')).toBeFalsy();
			expect(a2.dump()).toBe('[00][01][02]\n[10][11][12]\n[20][21][22]');
		});
		
		it("appendRow",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			
			/*
			 * like:
			 *  	[00][01][02]             [00][01][02]
			 *  	[10][11][12]    to       [10][11][12]
			 *                               [20][21][22]
			 */
			a2.appendRow(['20','21','22','23','24']);//The new row is truncated if it exceeds the existing width.
			expect(a2.getWidth()).toEqual(3);
			expect(a2.getHeight()).toEqual(3);
			expect(a2.size).toEqual(9);
			expect(a2.contains('20')).toBeTruthy();
			expect(a2.contains('21')).toBeTruthy();
			expect(a2.contains('22')).toBeTruthy();
			expect(a2.contains('23')).toBeFalsy();
			expect(a2.contains('24')).toBeFalsy();
			expect(a2.dump()).toBe('[00][01][02]\n[10][11][12]\n[20][21][22]');
			
			
		});
		
		it("prependRow",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'10');
			a2.set(0,1,'11');
			a2.set(0,2,'12');
			a2.set(1,0,'20');
			a2.set(1,1,'21');
			a2.set(1,2,'22');
			
			/*
			 * like:
			 *  	[10][11][12]             [00][01][02]
			 *  	[20][21][22]    to       [10][11][12]
			 *                               [20][21][22]
			 */
			a2.prependRow(['00','01','02','03','04']);//The new row is truncated if it exceeds the existing width.
			expect(a2.getWidth()).toEqual(3);
			expect(a2.getHeight()).toEqual(3);
			expect(a2.size).toEqual(9);
			expect(a2.contains('00')).toBeTruthy();
			expect(a2.contains('01')).toBeTruthy();
			expect(a2.contains('02')).toBeTruthy();
			expect(a2.contains('03')).toBeFalsy();
			expect(a2.contains('04')).toBeFalsy();
			expect(a2.dump()).toBe('[00][01][02]\n[10][11][12]\n[20][21][22]');
		});
		
		it("getCol/setCol",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			
			/*
			 * like:
			 *  	[00][01][02]             [00][01][02][03]
			 *  	[10][11][12]    to       [10][11][12][13]
			 */
			expect(function(){
				a2.setCol(3,['03','13']);  // index out of bounds
			}).toThrow(); 
			expect(a2.getWidth()).toEqual(3);
			expect(a2.getHeight()).toEqual(2);
			expect(a2.size).toEqual(6);
			expect(a2.contains('03')).toBeFalsy();
			expect(a2.contains('13')).toBeFalsy();
			expect(a2.dump()).toBe('[00][01][02]\n[10][11][12]');
			
			
			a2.resize(4,2); // resize frist
			expect(a2.getWidth()).toEqual(4);
			expect(a2.getHeight()).toEqual(2);
			expect(a2.size).toEqual(8);
			a2.setCol(3,['03','13']); 
			expect(a2.contains('03')).toBeTruthy();
			expect(a2.contains('13')).toBeTruthy();
			expect(a2.dump()).toBe('[00][01][02][03]\n[10][11][12][13]');
			
			a2.resize(3,2); // reset array2
			a2.resize(4,2);
			a2.setCol(3,['03','13','23','33']);  //The new row is truncated if it exceeds the existing width.
			expect(a2.contains('03')).toBeTruthy();
			expect(a2.contains('13')).toBeTruthy();
			expect(a2.contains('23')).toBeFalsy();
			expect(a2.contains('33')).toBeFalsy();
			expect(a2.dump()).toBe('[00][01][02][03]\n[10][11][12][13]');
			
		});
		
		it("appendCol",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			
			/*
			 * like:
			 *  	[00][01][02]             [00][01][02][03]
			 *  	[10][11][12]    to       [10][11][12][13]
			 */
			a2.appendCol(['03','13','23','33']); //The new row is truncated if it exceeds the existing width.
			expect(a2.getWidth()).toEqual(4);
			expect(a2.getHeight()).toEqual(2);
			expect(a2.size).toEqual(8);
			expect(a2.contains('03')).toBeTruthy();
			expect(a2.contains('13')).toBeTruthy();
			expect(a2.dump()).toBe('[00][01][02][03]\n[10][11][12][13]');
			
		});
		
		
		it("prependCol",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			
			/*
			 * like:
			 *  	[00][01][02]             [03][00][01][02]
			 *  	[10][11][12]    to       [13][10][11][12]
			 */
			a2.prependCol(['03','13','23','33']); //The new row is truncated if it exceeds the existing width.
			expect(a2.getWidth()).toEqual(4);
			expect(a2.getHeight()).toEqual(2);
			expect(a2.size).toEqual(8);
			expect(a2.contains('03')).toBeTruthy();
			expect(a2.contains('13')).toBeTruthy();
			expect(a2.dump()).toBe('[03][00][01][02]\n[13][10][11][12]');
		});
		
		it("shiftLeft/shiftRight",function(){
			a2 = new Array2(5,4); // 4x5 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(0,3,'03');
			a2.set(0,4,'04');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			a2.set(1,3,'13');
			a2.set(1,4,'14');
			a2.set(2,0,'20');
			a2.set(2,1,'21');
			a2.set(2,2,'22');
			a2.set(2,3,'23');
			a2.set(2,4,'24');
			a2.set(3,0,'30');
			a2.set(3,1,'31');
			a2.set(3,2,'32');
			a2.set(3,3,'33');
			a2.set(3,4,'34');
			
			/*
			 * like:
			 * 		[00][01][02][03][04]               [01][02][03][04][00]
			 * 		[10][11][12][13][14]     to        [11][12][13][14][10]
			 * 		[20][21][22][23][24]               [21][22][23][24][20]
			 * 		[30][31][32][33][34]               [31][32][33][34][30]
			 */
			a2.shiftLeft();
			expect(a2.dump()).toBe('[01][02][03][04][00]\n[11][12][13][14][10]\n[21][22][23][24][20]\n[31][32][33][34][30]');
			
			/*
			 * like:
			 * 		[01][02][03][04][00]               [00][01][02][03][04]
			 * 		[11][12][13][14][10]      to       [10][11][12][13][14]
			 * 		[21][22][23][24][20]               [20][21][22][23][24]
			 * 		[31][32][33][34][30]               [30][31][32][33][34]
			 */
			a2.shiftRight();
			expect(a2.dump()).toBe('[00][01][02][03][04]\n[10][11][12][13][14]\n[20][21][22][23][24]\n[30][31][32][33][34]');
		});
		
		it("shiftUp/shiftDown",function(){
			a2 = new Array2(5,4); // 4x5 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(0,3,'03');
			a2.set(0,4,'04');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			a2.set(1,3,'13');
			a2.set(1,4,'14');
			a2.set(2,0,'20');
			a2.set(2,1,'21');
			a2.set(2,2,'22');
			a2.set(2,3,'23');
			a2.set(2,4,'24');
			a2.set(3,0,'30');
			a2.set(3,1,'31');
			a2.set(3,2,'32');
			a2.set(3,3,'33');
			a2.set(3,4,'34');
			
			/*
			 * like:
			 * 		[00][01][02][03][04]               [10][11][12][13][14]
			 * 		[10][11][12][13][14]     to        [20][21][22][23][24]
			 * 		[20][21][22][23][24]               [30][31][32][33][34]
			 * 		[30][31][32][33][34]               [00][01][02][03][04]
			 */
			a2.shiftUp();
			expect(a2.dump()).toBe('[10][11][12][13][14]\n[20][21][22][23][24]\n[30][31][32][33][34]\n[00][01][02][03][04]');
			
			/*
			 * like:
			 * 		[10][11][12][13][14]               [00][01][02][03][04]
			 * 		[20][21][22][23][24]      to       [10][11][12][13][14]
			 * 		[30][31][32][33][34]               [20][21][22][23][24]
			 * 		[00][01][02][03][04]               [30][31][32][33][34]
			 */
			a2.shiftDown();
			expect(a2.dump()).toBe('[00][01][02][03][04]\n[10][11][12][13][14]\n[20][21][22][23][24]\n[30][31][32][33][34]');
			
		});
		
		it("transpose",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			
			/*
			 * like:
			 *  	[00][01][02]             [00][10][02]
			 *  	[10][11][12]    to       [01][11][12]
			 */
			a2.transpose();
			expect(a2.dump()).toBe('[00][10][02]\n[01][11][12]');
		});
		
		it("getArray",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.set(0,0,'00');
			a2.set(0,1,'01');
			a2.set(0,2,'02');
			a2.set(1,0,'10');
			a2.set(1,1,'11');
			a2.set(1,2,'12');
			
			
			expect(a2.getArray().join(',')).toBe("00,01,02,10,11,12");
		});
		
		it("clear",function(){
			a2 = new Array2(3,2); // 2x3 matrix
			a2.fill(32);
			expect(a2.dump()).toBe('[32][32][32]\n[32][32][32]');
			a2.clear();
			expect(a2.dump()).toBe('[?][?][?]\n[?][?][?]');
		});
		
		it("setArray",function(){
			a2 = new Array2(2,6); // 2x6 matrix
			/*
			 * [1][2]
			 * [3][4]
			 * [5][6]
			 * [7][8]
			 * [9][10]
			 * [11][12]
			 */
			a2.setArray([1,2,3,4,5,6,7,8,9,10,11,12]);
			expect(a2.dump()).toBe('[1][2]\n[3][4]\n[5][6]\n[7][8]\n[9][10]\n[11][12]');
			/*
			 * [1][2][3][4][5][6]
			 * [7][8][9][10][11][12]			  
			 */
			a2.setArray([1,2,3,4,5,6,7,8,9,10,11,12],6,2);	
			expect(a2.dump()).toBe('[1][2][3][4][5][6]\n[7][8][9][10][11][12]');
			/*
			 * [1][2][3]
			 * [4][5][6]
			 * [7][8][9]
			 */
			a2.setArray([1,2,3,4,5,6,7,8,9,10,11,12],3,3);
			a2.setArray([1,2,3,4,5,6,7,8,9,10,11,12],6,2);	
			expect(a2.dump()).toBe('[1][2][3][4][5][6]\n[7][8][9][10][11][12]');
			
		});
		
	});
	
});
