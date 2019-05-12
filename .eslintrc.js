module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': ['error',2],
        'linebreak-style': ['error','unix'],
        'quotes': ['error','single'],
        'semi': ['error','always'],
        'no-undef': 0,
        'no-console': 'off',
        'no-unused-vars': 'off',
        'no-redeclare': 'off',
        'no-inner-declarations':'off',
        'no-empty':'off',
        'no-mixed-spaces-and-tabs':'off',
        'no-self-assign':'off',
        'no-constant-condition':'off',
        'no-dupe-keys':'off'
    }
};