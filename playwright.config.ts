import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    webServer: {
        command: 'npm run start:local',
        url: 'http://localhost:4200',
        reuseExistingServer: true,
        timeout: 120_000,
    },
    use: {
        baseURL: 'http://localhost:4200',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
