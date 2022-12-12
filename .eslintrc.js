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
    project: ['./projects/*/tsconfig.json'],
  },
  rules: {
    "prettier/prettier": 2
  },
  ignorePatterns: ['.eslintrc.js', '**/dist/**'],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  root: true,
};