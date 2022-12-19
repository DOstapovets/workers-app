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
    "prettier/prettier": 2
  },
  ignorePatterns: ['.eslintrc.js', '**/dist/**'],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  root: true,
};