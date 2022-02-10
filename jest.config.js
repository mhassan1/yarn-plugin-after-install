module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  ...(process.env.CI && { maxWorkers: 1 }),
  testRegex: '(/__tests__/.*\\.test)\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  coverageReporters: ['text']
}
