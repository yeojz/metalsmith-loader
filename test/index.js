
describe('metalsmith-loader', function(){


  it('shoud return an object with module name as key', function(done){
    var config = require('..')({
      moduleLocation: 'test/fixtures/fake_modules',
      config: 'test/fixtures/fakepackage1.json'
    });

    if (config.test1.test() === 'OK' &&
        config.test2.test() === 'OK' &&
        config.test3.test() === 'OK')
    {
      done();
    } else {
      done(new Error("Some modules may not have been imported"));
    }

  });



  it('shoud assign modules into global object', function(done){
    var config = require('..')({
      moduleLocation: 'test/fixtures/fake_modules',
      config: 'test/fixtures/fakepackage1.json',
      global: true
    });

    if (test1.test() === 'OK' &&
        test2.test() === 'OK' &&
        test3.test() === 'OK')
    {
      done();
    } else {
      done(new Error("Some modules may not have been imported."));
    }

  });



  it('shoud take in other prefixes', function(done){
    var config = require('..')({
      moduleLocation: 'test/fixtures/fake_modules',
      config: 'test/fixtures/fakepackage2.json',
      pattern: 'notasmith-*'
    });

    if (config.test1.test() === 'Wanna be different'){
      done();
    } else {
      done(new Error("Module not imported properly"));
    }

  });



});
