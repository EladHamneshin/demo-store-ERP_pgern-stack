module.exports = {
    // Specifies that Jest should use ts-jest for TypeScript files
    preset: 'ts-jest',
  
    // Defines the environment in which the tests are run
    testEnvironment: 'node',
  
    // Path to a module which exports an async function that is triggered once before all test suites
    globalSetup: './tests/setup.js', // Optional: Adjust or remove if you have global setup requirements
  
    // Path to a module which exports an async function that is triggered once after all test suites
    globalTeardown: './tests/teardown.js', // Optional: Adjust or remove if you have global teardown requirements
  
    // The directory where Jest should output its coverage files
    coverageDirectory: './coverage',
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
    // An array of file extensions your modules use
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/src/components/$1', // Adjust according to your path aliases
      '^@/utils/(.*)$': '<rootDir>/src/utils/$1'
    },
  
    // Indicates whether each individual test should be reported during the run
    verbose: true
  };
  
  