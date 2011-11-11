/**
 * @author kingfo  oicuicu@gmail.com
 */
describe('array2iterator',function(){
	var a2 = new Array2(3,2), // 2x3 matrix
		ai = new Array2Iterator(a2);
	
	a2.set(0,0,'10');
	a2.set(0,1,'11');
	a2.set(0,2,'12');
	a2.set(1,0,'20');
	a2.set(1,1,'21');
	a2.set(1,2,'22');

	
	it("getData",function(){
		expect(ai.getData()).toEqual('10');
	});
	
	it("next",function(){
		ai.next();
		expect(ai.getData()).toEqual('11');
		ai.next();
		expect(ai.getData()).toEqual('12');
		ai.next();
		expect(ai.getData()).toEqual('20');
		ai.next();
		expect(ai.getData()).toEqual('21');
		ai.next();
		expect(ai.getData()).toEqual('22');
		ai.next();
		expect(ai.getData()).toBeUndefined();
	});
	
	it("start",function(){
		ai.start();
		expect(ai.getData()).toEqual('10');
	});
	
	it("hasNext",function(){
		ai.next();
		expect(ai.getData()).toEqual('11');
		expect(ai.hasNext()).toBeTruthy();
		
		ai.next();
		expect(ai.getData()).toEqual('12');
		expect(ai.hasNext()).toBeTruthy();
		
		ai.next();
		expect(ai.getData()).toEqual('20');
		expect(ai.hasNext()).toBeTruthy();
		
		ai.next();
		expect(ai.getData()).toEqual('21');
		expect(ai.hasNext()).toBeTruthy();
		
		ai.next();
		expect(ai.getData()).toEqual('22');
		
		expect(ai.hasNext()).toBeFalsy();
		ai.next();
		
		expect(ai.hasNext()).toBeFalsy();
		expect(ai.getData()).toBeUndefined();
	});
	
	it("setData",function(){
		ai.start();
		var len = a2.size,i;
		for(i = 0; i < len; i++){
			ai.setData('x');
			ai.next();
		}
		expect(a2.dump()).toBe('[x][x][x]\n[x][x][x]');
	});
	
});
