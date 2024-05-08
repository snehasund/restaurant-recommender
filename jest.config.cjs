module.exports = {
    extensionsToTreatAsEsm: ['.ts'],
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    transform: {
      '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }]
    },
    testPathIgnorePatterns: ['./dist']
  };