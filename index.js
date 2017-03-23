module.exports = extend;

function extend(tape) {
  const {Test} = tape;

  if (!Test.prototype.approximately) {
    Test.prototype.approximately = approximately;
  }
}

function approximately(actual, expected, delta, message) {
  if (delta == undefined) {
    throw new Error('delta must be provided');
  }

  const low = expected - delta;
  const high = expected + delta;
  const value = actual >= low && actual <= high;

  // living dangerously
  this._assert(value, {
    message: message || `should be within ${delta}`,
    expected: `<number in [${low}, ${high}]>`,
    actual,
    operator: 'approximately'
  });
}
