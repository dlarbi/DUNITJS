(function($) {
	 'use strict';
	 var DUnitJS = function() {
		  
		 this.config = {
			 alterTitle:false //Changes page title to 'PASSED TESTS' if passed
		 };
		 
		 //We create testSuite objects with a build function to enforce 
		 //that each test instance gets its own properties (ie. failure counters).
		 //Multiple tests can take place at the same time, and their results wont interfere.
		 var buildTestSuite = function(testName) {
			 //The testSuite object contains all the testing options a user has.
			 //Its properties and methods are only available inside the testRoutine defined by a user.  
			 var testSuite = {};
			 testSuite.testCount =  testSuite.failCount =  testSuite.warningCount = 0;
			 
			 //testSuite.equal(x,y) usage -> DUNITJS.test('test_name', function() { testSuite.equal(x,y) });
			 //checks if x and y are equal: 
			 testSuite.equal = function(x,y) {			 
				 if(x === y) {
					 console.log('PASS: ' + x + ' and ' + y + ' are identical. They are the same object.');
				 } else if (x == y) {
					 console.log('WARNING: ' + x + ' and ' + y + ' fail strict comparison.  They are not of the same type.');
					 testSuite.warningCount++;
				 } else {
					 console.log('FAIL: ' + x + ' is not equal to ' + y);
					 testSuite.failCount++;
				 }
				 testSuite.testCount++;
				 $(document).trigger('assertComplete', {testName: testName, arg1:x, arg2:y, total: testSuite.testCount, fails:testSuite.failCount, warnings: testSuite.warningCount, pass: testSuite.testCount - testSuite.failCount})
			 };
			 
			 testSuite.notEqual = function(x, y) {
				 if(x != y) {
					 console.log('PASS: ' + x + ' is not equal to ' + y);
				 } else {
					 console.log('FAIL: ' + x + ' and ' + y + ' are equal.');
					 testSuite.failCount++;
				 }				 
				 testSuite.testCount++;
				 $(document).trigger('assertComplete', {testName: testName, arg1:x, arg2:y, total: testSuite.testCount, fails:testSuite.failCount, warnings: testSuite.warningCount, pass: testSuite.testCount - testSuite.failCount})
			 };
			 return testSuite;
		 };
		 
		 	 
		 //DUNITJS.test(test_name, testRoutine)
		 //We build a new testSuite object and pass it to to the testRoutine function.
		 //The testRoutine function is implemented by the user in DUNITJS.test().
		 //The testSuite object and its tests are available to the user inside of DUNITJS.test()'s callback.
		 this.test = function(testName, testRoutine) {			
			 var testSuite = buildTestSuite(testName);
			 console.log('You are running: ' + testName);
			 testRoutine(testSuite);
			 //If config.alterTitle is true we alert the user of results on their test's tab.
			 this.config.alterTitle && testSuite.failCount === 0 ? document.title = 'PASSED ALL TESTS' : document.title = 'FAILED ' + testSuite.failCount;
			 $(document).trigger('testComplete', {testName: testName, total: testSuite.testCount, fails:testSuite.failCount, warnings: testSuite.warningCount, pass: testSuite.testCount - testSuite.failCount});
		 };
		 
		 //The test results are available in this callback
		 //results = {testName, pass, total, fails, warnings }
		 //The callback will only fire if the done method's argument
		 //matches the name of the test that triggered the event.
		 this.done = function(testName, doneCallback) {
			 $(document).off('testComplete').on('testComplete', function(e, results) {
				 if(testName == results.testName) {
					 doneCallback(results);
				 }				 
			 });
		 };
		 
		 //If the user uses DUNITJS.log(), The log callback function 
		 //will be triggered each time a testSuite.test() is executed.
		 //Results for the individual test are available. User could write them 
		 //in a log or store them in a database to track more micro test details.
		 this.log = function(testName, logCallback) {
			 $(document).off('assertComplete').on('assertComplete', function(e, results) {		
				 if(testName == results.testName) {
					 logCallback(results);
				 }	
			 });
		 };
		 
	 };
	 	 
	 window.DUNITJS = new DUnitJS();
	 return;
})(jQuery);
