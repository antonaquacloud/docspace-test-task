import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  timeout: 60000,
  testDir: 'tests',
  use: {
    actionTimeout: 10000,
    baseURL: process.env.DOCSPACE_URL,
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});