const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  devServer: {
    port: 3000,
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      setupFilesAfterEnv: ['<rootDir>/src/__test__/config/setup.ts'],
      moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
          prefix: '<rootDir>/',
        }),
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/src/__test__/mocks/fileMock.js',
      },
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
      transformIgnorePatterns: ['<rootDir>/node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@templates': path.resolve(__dirname, 'src/components/templates'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
    rules: [
      // snip
      {
        test: /\.svg$/i,
        type: 'asset/resource',
      },
    ],
  },
};
