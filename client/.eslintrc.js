module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'react/button-has-type': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'react/no-array-index-key': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
