(function($) {
	 'use strict';
	 var DUnitJS = function() {
				 
		 //We create assert objects with a build function to enforce 
		 //that each test instance gets its own properties (ie. failure counters).
		 //Multiple tests can take place at the same time, and their results wont interfere.
		 var buildAssert = function() {
			 //The assert object contains all the testing options a user has.
			 //Its properties and methods are only available inside the testRoutine defined by a user.  
			 var assert = {};
			 assert.testCount =  assert.failCount =  assert.warningCount = 0;
			 
			 //assert.equal(x,y) usage -> DUNITJS.test('test_name', function() { assert.equal(x,y) });
			 //checks if x and y are equal: 
			 assert.equal = function(x,y) {			 
				 if(x === y) {
					 console.log('PASS: ' + x + ' and ' + y + ' are identical. They are the same object.');
				 } else if (x == y) {
					 console.log('WARNING: ' + x + ' and ' + y + ' fail strict comparison.  They are not of the same type.');
					 assert.warningCount++;
				 } else {
					 console.log('FAIL: ' + x + ' is not equal to ' + y);
					 assert.failCount++;
				 }
				 assert.testCount++;			 
			 };
			 
			 assert.notEqual = function(x, y) {
				 if(x != y) {
					 console.log('PASS: ' + x + ' is not equal to ' + y);
				 } else {
					 console.log('FAIL: ' + x + ' and ' + y + ' are equal.');
					 assert.failCount++;
				 }				 
				 assert.testCount++;			 
			 };
			 return assert;
		 };
		 
		 //DUNITJS.test(test_name, testRoutine)
		 //We build a new assert object and pass it to to the testRoutine function.
		 //The testRoutine function is defined by the user in their implementation of DUNITJS.test().
		 //The assert object and its tests are available to the user inside of DUNITJS.test().
		 this.test = function(testName, testRoutine) {	
			 var assert = buildAssert();
			 console.log('You are running: ' + testName);
			 testRoutine(assert);
			 console.log('////////REPORT: ' + assert.failCount + ' fails out of ' + assert.testCount + ' tests. Oops.////////');			 
		 };
		 
	 };
	 	 
	 window.DUNITJS = new DUnitJS();
	 return;
})(jQuery);



$(window).click(function() {
	DUNITJS.test('////////DUNITJS EXAMPLE TESTS/////////', function(assert){
		assert.equal(1, 2);
		assert.equal(1, 1);
		assert.equal(0, 1);
		assert.notEqual('meep', 'moop');
	});
});
