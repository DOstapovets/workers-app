/* eslint-disable */

module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
  },
  rules: {
    "prettier/prettier": 2,
    "class-methods-use-this": 0,
    "consistent-return": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0
  },
  ignorePatterns: ['.eslintrc.js', '**/dist/**'],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  root: true,
};