// module.exports = {
//   env: {
//     browser: true,
//     commonjs: true,
//     es6: true,
//     node: true,
//   },
//   extends: 'eslint:recommended',
//   parserOptions: {
//     sourceType: 'module',
//   },
//   rules: {
//     'comma-dangle': ['error', 'always-multiline'],
//     indent: ['error', 2],
//     'linebreak-style': ['error', 'unix'],
//     quotes: ['error', 'single'],
//     semi: ['error', 'always'],
//     'no-unused-vars': ['warn'],
//     'no-console': 0,
//     'no-extra-semi':1,
//     "indent": ["error", 4]
//   },
// };
// npm i -g babel-eslint eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-import


module.exports = {
  parser: "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "no-unused-vars": 0,
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "prop-types": [2]
  }
}