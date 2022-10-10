module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    ignorePatterns: ['node_modules/*'],
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'prettier'
    ],
};