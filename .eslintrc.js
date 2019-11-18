module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es6': true
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
        'indent': [
            'warn',
            2
        ],
        'linebreak-style': [
            'warn',
            'unix'
        ],
        'semi': [
            'warn',
            'always'
        ], 
        'no-unused-vars': [
            0
        ], 
        'yoda': [
            'warn'
        ], 
        'comma-dangle': [
            'warn',
            {
                arrays: 'always-multiline', 
                objects: 'always-multiline', 
                imports: 'always-multiline', 
                exports: 'always-multiline', 
                functions: 'never'
            }
        ], 
        'eol-last': [
            'warn'
        ]
    }
};
