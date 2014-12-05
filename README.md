DUNITJS
=======

A unit testing framework.
Right now it has an equal() and a notEqual() method in its testSuite, some config options, a callback function for when a unit test has finished running and a logging function that adds callbacks to each assertion in a Unit test. Super simple stuff.  I wanted to build this to show myself how "I would build it", and try to make an architecture that makes some sense.  I plan to compare with other frameworks to make improvements and see all the ways they do it better.

Include dunitjs in your project, implement like:

    //Functions available:
    //DUNITJS.done(), DUNITJS.log(), DUNITJS.test()
    //in the testSuite:
    //testSuite.equal(), testSuite.notEqual()

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
