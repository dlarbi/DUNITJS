DUNITJS
=======

A unit testing framework.
Right now it has an equal() and a notEqual() method. Super simple stuff.  I wanted to build this to show myself how "I would build it", and try to make an architecture that makes some sense.  I plan to compare with other frameworks to make improvements and see all the ways they do it better.

Include dunitjs in your project, implement like:

    DUNITJS.test('Test Name', function(assert) { 
        assert.equal(1, 2);
        assert.equal(1, 1);
        assert.equal(0, 1);
        assert.notEqual('meep', 'moop');
    });

Open your console to see your results.  
