module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  rules: {
    semi: [1, 'always'],
    'quote-props': 'warn',
    'no-unused-vars': 'warn'
  }
};
