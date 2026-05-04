import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',

  testIgnore: [
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/src/**'
  ],
});