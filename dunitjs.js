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
		 //The assert object and its tests are available to the user inside of DUNITJS.test()'s callback.
		 this.test = function(testName, testRoutine) {	
			 var assert = buildAssert();
			 console.log('You are running: ' + testName);
			 testRoutine(assert);
			 console.log('////////REPORT: ' + assert.failCount + ' fails out of ' + assert.testCount + ' tests. Oops.////////');
			 $(document).trigger('testComplete', {testName: testName, total: assert.testCount, fails:assert.failCount, warnings: assert.warningCount, pass: assert.testCount - assert.failCount})
		 };
		 
		 //The test results are available in this callback
		 //results = {testName, pass, total, fails, warnings }
		 //The callback will only fire if the done method's argument
		 //matches the name of the test that triggered the event.
		 this.done = function(testName, doneCallback) {
			 $(document).on('testComplete', function(e, results) {
				 if(testName == results.testName) {
					 doneCallback(results);
				 }				 
			 });
		 };
		 
	 };
	 	 
	 window.DUNITJS = new DUnitJS();
	 return;
})(jQuery);



$(window).click(function() {
	
	DUNITJS.done('EXAMPLE TESTS', function(results) {
		console.log(results.testName, results.total, results.pass, results.fails, results.warnings)
	});
	
	DUNITJS.test('EXAMPLE TESTS', function(assert){
		for(var i = 0; i < 5; i++) {
			assert.equal(Math.floor((Math.random() * 5) + 1), Math.floor((Math.random() * 5) + 1))
		}
		for(var i = 0; i < 5; i++) {
			assert.notEqual(Math.floor((Math.random() * 5) + 1), Math.floor((Math.random() * 5) + 1))
		}
	});	
	
});
