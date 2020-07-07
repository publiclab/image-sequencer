const testModule = require('../templates/gif-module-test.js'),
  gif = require('../images/test.gif.js'),
  benchmark = 'data:image/gif;base64,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04uMA5rjU0YZu8oQaAZMYMD0aFMDOr6zjm8ZoMDqS8lKkDnKwhTneutbd3GUtogCF/9YKF3rKgvEyEKvelXGwAa2ttgNlgXqKKwp0IrYyjZypupQRsAUG9bKjk8d5HhsQb7q2dLuTLSQA6tnsXda1A4EqarVKyu5wY1xJLjSta/lRmxJpY3b4vYg5MDebx3SM98O97jITa5yl8vc5g4mIAAh+QQACgAAACwAAAAAoABsAIf+96L++KL++q3+/L7+/cz+/dD+/dD+/dD+/dH+/dL+/db+/dn+/dv+/d7+/eX+/e7+/fT+/fv+/fz+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+/f3+8/7+6/7+4P7/2v7+1v7+0/7+0f7+0P7+z/7+zv7+zP3+y/3+yvz+yvr+x/X+xO3+web+vuL+vd7+u9r+vNf9vNT9vdP9vtH9v9H9wNH9ws/9wM38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';

testModule('convolution', {constantFactor:1.005}, benchmark, gif, 'gif');