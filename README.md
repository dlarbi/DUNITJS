DUNITJS
=======

A unit testing framework.
Right now it has an equal() and a notEqual() method, some config options, a callback function for when a unit test has finished running. Super simple stuff.  I wanted to build this to show myself how "I would build it", and try to make an architecture that makes some sense.  I plan to compare with other frameworks to make improvements and see all the ways they do it better.

Include dunitjs in your project, implement like:

    //Some configuration options
    DUNITJS.config.alterTitle = true; //Browser tab will change to 'PASSED' or 'FAILED #' on completion

    //You can setup a done callback function with the test summary
    DUNITJS.done('Test Name', function(results) {
		 console.log('////////REPORT FOR ' + results.testName + ': ' + results.fails + ' fails out of ' + results.total + ' tests. Oops.////////');
    });
    
    DUNITJS.test('Test Name', function(assert) { 
        assert.equal(1, 2);
        assert.equal(1, 1);
        assert.equal(0, 1);
        assert.notEqual('meep', 'moop');
    });

Open your console to see your results.  

    You are running: Test Name
    FAIL: 1 is not equal to 2
    PASS: 1 and 1 are identical. They are the same object.
    FAIL: 0 is not equal to 1
    PASS: meep is not equal to moop
    ////////REPORT FOR Test Name: 2 fails out of 4 tests. Oops.////////
