module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
      babelConfig: true,
      diagnostics: false,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/*.(test|spec).(js|jsx|ts|tsx)'],
}
