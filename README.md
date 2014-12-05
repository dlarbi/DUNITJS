DUNITJS
=======

A unit testing framework.
Right now it has an equal() and a notEqual() method. Super simple stuff.  I wanted to build this to show myself how "I would build it", and try to make an architecture that made some sense.  I plan to compare with other frameworks to make improvements and see all the ways they did it better.

Include dunitjs in your project, implement like:

    DUNITJS.test('Test Name', function(assert) { 
      assert.equal(x, y);
      assert.notEqual(x, y);
    });

Open your console to see your results.  
