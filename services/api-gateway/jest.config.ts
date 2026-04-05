export default {
  preset: 'ts-jest', // or use 'babel-jest' if strictly following Babel flow
  testEnvironment: 'node',
  // Automatically maps aliases from tsconfig.json
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|js)$': ['babel-jest', { configFile: './babel.config.ts' }],
  },
};
