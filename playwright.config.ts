import { defineConfig, devices } from '@playwright/test';

// I've added this to use in a script that runs tests headless
const isHeadless = process.env.HEADLESS !== 'false'; 

const playwrightTest = {
  testDir: './tests',
  reporter: [['html', { open: 'never' }]],
  use: {
    headless: isHeadless,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'safari',   use: { ...devices['Desktop Safari'] } },
  ],
  retries: 1
}

export default playwrightTest;
