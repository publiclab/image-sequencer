const test = require('tape');
const { convolve, compute } = require('../../../src/modules/_nomodule/gpuUtils');

test('convolve works with 1x1 array', t => {
  const array = [[1]],
    kernel = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ],
    expectedOut = [
      [9]
    ];

  const out = convolve([array], kernel);

  t.equal(out.length, 1, 'convolve returns a single output array');
  t.equal(out[0][0].length, 1, 'ouput array width is correct');
  t.equal(out[0].length, 1, 'ouput array height is correct');
  t.deepEqual(out[0], expectedOut, 'convolve outputs correct array');
  t.end();
});

test('convolve works with 3x4 array', t => {
  const array = [
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 3],
      [1, 2, 3]
    ],
    kernel = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ],
    expectedOut = [
      [12, 19, 26],
      [13, 20, 27],
      [13, 20, 27],
      [13, 19, 25]
    ];

  const out = convolve([array], kernel);

  t.equal(out.length, 1, 'convolve returns a single output array');
  t.equal(out[0][0].length, 3, 'ouput array width is correct');
  t.equal(out[0].length, 4, 'ouput array height is correct');
  t.deepEqual(out[0], expectedOut, 'convolve outputs correct array');
  t.end();
});

test('convolve works with multiple 3x4 arrays', t => {
  const array1 = [
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 3],
      [1, 2, 3]
    ],
    array2 = [
      [1, 2, 4],
      [2, 2, 1],
      [1, 0, 0],
      [2, 3, 1]
    ],
    kernel = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ],
    expectedOut1 = [
      [12, 19, 26],
      [13, 20, 27],
      [13, 20, 27],
      [13, 19, 25]
    ],
    expectedOut2 = [
      [14, 19, 24],
      [12, 13, 14],
      [15, 12,  9],
      [16, 13, 10]
    ];

  const out = convolve([array1, array2], kernel);

  t.equal(out.length, 2, 'convolve returns 2 output array');

  t.equal(out[0][0].length, 3, 'ouput array1 width is correct');
  t.equal(out[0].length, 4, 'ouput array1 height is correct');

  t.equal(out[1][0].length, 3, 'ouput array2 width is correct');
  t.equal(out[1].length, 4, 'ouput array2 height is correct');

  t.deepEqual(out[0], expectedOut1, 'convolve outputs correct array1');
  t.deepEqual(out[1], expectedOut2, 'convolve outputs correct array2');
  t.end();
});