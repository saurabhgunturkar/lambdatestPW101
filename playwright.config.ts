import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 300000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://www.lambdatest.com',
  },
    // connectOptions: {
    //   wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    //     JSON.stringify({
    //       browserName: 'Chrome',
    //       browserVersion: 'latest',
    //       'LT:Options': {
    //         platform: 'Windows 10',
    //         build: 'Playwright Sample Build 1.0',
    //         name: 'Playwright Sample Test',
    //         user: process.env.LT_USERNAME, // Use environment variables for credentials
    //         accessKey: process.env.LT_ACCESS_KEY,
    //         network: true,
    //         video: true,
    //         console: true,
    //       },
    //     })
    //   )}`,
    // },
  
  projects: [

    // Test against desktop browsers
    // {
    //   name: 'Desktop Chrome',
    //   use: { ...devices['Desktop Chrome'] },
    // }
  


    // Project 1: Windows 10, Chromium
    {
      name: 'Windows 10 - Chromium',
      use: {
        // ...devices['Desktop Chrome'],
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'pw-chromium',
              browserVersion: '130.0',
              'LT:Options': {
                platform: 'Windows 10',
                build: 'PW101-BUILD-2.0',
                name: 'PW-WIN10-CHROMIUM-130.0.0',
                user: 'Saurabh.Gunturkar',
                accessKey: 'PcN3wxNR9r7MWclm4mWeRXQm97OiMqjFfeWEUa2E2jQNCLHl1W',
                network: true,
                video: true,
                console: true,
              },
            })
          )}`,
        },
      },
    },

    // // Project 2: macOS Catalina, Firefox
    {
      name: 'macOS Catalina - Firefox',
      use: {
        // ...devices['Desktop Firefox'],
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'pw-firefox',
              browserVersion: '132.0',
              'LT:Options': {
                platform: 'macOS Catalina',
                build: 'PW101-BUILD-2.0',
                name: 'PW-MACOS-CATALINA-FIREFOX-132.0.0',
                user: 'Saurabh.Gunturkar',
                accessKey: 'PcN3wxNR9r7MWclm4mWeRXQm97OiMqjFfeWEUa2E2jQNCLHl1W',
                network: true,
                video: true,
                console: true,
              },
            })
          )}`,
        },
      },
    },
  ],
});