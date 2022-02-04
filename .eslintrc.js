module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'no-console': 'error',
    semi: 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 0,
    'implicit-arrow-linebreak': 'off',
  },
};