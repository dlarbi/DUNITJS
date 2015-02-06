DUNITJS
=======

A super simple unit testing framework.  Limited in functionality, but ideally it will continue to scale well.  I plan to compare with other frameworks to make improvements over time.

#####Methods available for logging, callbacks, setting up tests:

A callback to occur after testName is complete

	DUNITJS.done(testName, function)

A callback to occur each time a test within testName is complete

	DUNITJS.log(testName, function())

Setup a unit test named testName

	DUNITJS.test(testName, function(testSuite))

#####Methods for comparisons in the testSuite:

	testSuite.equal()

	testSuite.notEqual()

Include dunitjs in your project, implement like:



    //You can setup some configuration options
    DUNITJS.config.alterTitle = true; //Browser tab will change to 'PASSED' or 'FAILED #' on completion

    //You can setup a done callback function with the test summary after the Unit test is complete
    DUNITJS.done('Test Name', function(results) {
		 console.log('////////REPORT FOR ' + results.testName + ': ' + results.fails + ' fails out of ' + results.total + ' tests. Oops.////////');
    });
    
    //You can use log(), and now each of the assertions in your Unit test return their results to this callback
    DUNITJS.log('Example Test Name', function(results){
	 //We could write these results to a text file!
	 $('body').append('ARGUMENT1 WAS ' + results.arg1 + ', ARGUMENT 2 WAS ' + results.arg2 + ',<br>');
    });
    
    DUNITJS.test('Test Name', function(testSuite) { 
        testSuite.equal(1, 2);
        testSuite.equal(1, 1);
        testSuite.equal(0, 1);
        testSuite.notEqual('meep', 'moop');
    });

Open your console to see your results.  Something like this, depending on your options. 

    You are running: Test Name
    FAIL: 1 is not equal to 2
    PASS: 1 and 1 are identical. They are the same object.
    FAIL: 0 is not equal to 1
    PASS: meep is not equal to moop
    ////////REPORT FOR Test Name: 2 fails out of 4 tests. Oops.////////
