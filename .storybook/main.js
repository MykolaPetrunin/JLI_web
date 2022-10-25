const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    'storybook-addon-material-ui5',
    'storybook-addon-react-router-v6',
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@modules': path.resolve(__dirname, '../src/modules'),
      '@navigation': path.resolve(__dirname, '../src/navigation'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@uikit': path.resolve(__dirname, '../src/uikit'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@widgets': path.resolve(__dirname, '../src/widgets'),
    };

    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
