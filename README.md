# tape-approximately

Adds `t.approximately()` to tape

## Install

`$ npm install --save-dev tape-approximately`

## Usage

```js
const test = require('tape');
require('tape-approximately')(test);

test('floating point math', function(t) {

  t.approximately(actual, expected, delta);

  // or

  t.approximately(actual, expected, delta, message);

});
```

## License

MIT
