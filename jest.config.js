/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        module: 'commonjs',
        target: 'ES2022',
        resolveJsonModule: true,
        types: ['node', 'jest'],
      },
    }],
  },
  collectCoverageFrom: [
    '*.ts',
    '!index.ts',
    '!bot.ts',
    '!node_modules/**',
  ],
};
