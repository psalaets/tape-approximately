var test = require('tape');
require('.')(test);

test('makes approximately() available on t', function(t) {
  t.plan(1);

  t.equal(typeof t.approximately, 'function');
});

test('equals upper bound', function(t) {
  t.plan(1);

  t.approximately(1, 0, 1);
});

test('equals lower bound', function(t) {
  t.plan(1);

  t.approximately(-1, 0, 1);
});

test('between bounds', function(t) {
  t.plan(1);

  t.approximately(0.1, 0, 1);
});

test('delta is required', function(t) {
  t.plan(1);

  t.throws(function() {
    t.approximately(0, 0);
  });
});

test('above upper bound', function(t) {
  const fake = fakeTape();
  require('.')(fake);

  t.plan(2);

  const fakeT = new fake.Test();
  fakeT.approximately(1, 0, 0.5);

  t.equal(fakeT.value, false);
  t.deepEqual(fakeT.others, {
    message: 'should be within 0.5',
    expected: '<number in [-0.5, 0.5]>',
    actual: 1,
    operator: 'approximately'
  });
});

test('below lower bound', function(t) {
  const fake = fakeTape();
  require('.')(fake);

  t.plan(2);

  const fakeT = new fake.Test();
  fakeT.approximately(-1, 0, 0.5);

  t.equal(fakeT.value, false);
  t.deepEqual(fakeT.others, {
    message: 'should be within 0.5',
    expected: '<number in [-0.5, 0.5]>',
    actual: -1,
    operator: 'approximately'
  });
});

test('out of bounds with message', function(t) {
  const fake = fakeTape();
  require('.')(fake);

  t.plan(2);

  const fakeT = new fake.Test();
  fakeT.approximately(-1, 0, 0.5, 'asdf');

  t.equal(fakeT.value, false);
  t.deepEqual(fakeT.others, {
    message: 'asdf',
    expected: '<number in [-0.5, 0.5]>',
    actual: -1,
    operator: 'approximately'
  });
});

function fakeTape() {
  function Test() {}
  Test.prototype._assert = function(value, others) {
    this.value = value;
    this.others = others;
  };

  return {
    Test
  };
}
