module.exports = {
  extends: ['airbnb-typescript-prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
    sourceType: 'module',
    ecmaVersion: '2020',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  plugins: ['@typescript-eslint', 'import'],
  ignorePatterns: [
    '**/*.snap',
    'frontend/custom.d.ts',
    'frontend/src/assets/*.*',
    '**/*stories.tsx',
  ],
  rules: {
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-props-no-spreading': [0],
    'react-hooks/exhaustive-deps': [0],
    'react/jsx-no-useless-fragment': [0],
    'react/no-array-index-key': [0],
    'react/require-default-props': [
      2,
      {
        forbidDefaultForRequired: false,
        ignoreFunctionalComponents: true,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'no-plusplus': 0,
    'no-nested-ternary': 0,
    'react/destructuring-assignment': 0,
    semi: ['warn', 'always'],
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  env: {
    browser: true,
    jest: true,
  },
};
