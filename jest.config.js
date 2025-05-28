import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './src/',  
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Support des imports alias @/ (ex: @/components/MyComponent)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(customJestConfig);
