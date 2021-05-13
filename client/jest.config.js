module.exports = {
  testEnvironment: 'node',
  // uncomment the roots attribute if the tests folder is to be put into src folder
  // "roots": [
  //   "<rootDir>/src"
  // ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}