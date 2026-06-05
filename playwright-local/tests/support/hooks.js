require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, webkit, devices } = require('@playwright/test'); // imports playwright browsers and devices
const { Commands } = require('../utils/commands');

setDefaultTimeout(300 * 1000); // 5 mins

// Runs before each scenario
Before(async function () {
  const browserName = process.env.BROWSER || 'chromium';
  const isMobileSafari = browserName === 'mobile-safari';
  
  this.browser = isMobileSafari // Launches WebKit for mobile Safari
    ? await webkit.launch({
      headless: process.env.HEADED !== 'true', // Checks whether to run mobile Safari mode
    })
    : await chromium.launch({
      channel: 'chrome',
      headless: process.env.HEADED !== 'true', // Runs headless by default
    });
  
  // Creates a fresh isolated browser session for each scenario
  this.context = await this.browser.newContext(
    isMobileSafari
      ? {
        ...devices['iPhone 12'],
        serviceWorkers: 'block',
        recordVideo: process.env.CI ? { dir: 'test-results/videos/' } : undefined,
      }
      : {
        viewport: {
          width: 1300,
          height: 1000,
        },
        serviceWorkers: 'block',
        recordVideo: process.env.CI ? { dir: 'test-results/videos/' } : undefined,
      }
  );
  
  if (process.env.CI) {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });
  }
  
  this.page = await this.context.newPage();
  
  // Increase navigation timeout for slower redirects/page loads
  this.page.setDefaultNavigationTimeout(45000);
  
  this.commands = new Commands(this.page); // Creates a new browser tab
});

// Runs after each scenario
After(async function (scenario) {
  const isFailed = scenario.result?.status !== Status.PASSED;
  const scenarioFileName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  
  if (process.env.CI && this.context) {
    const tracesDir = 'test-results/traces';
    
    if (isFailed) {
      fs.mkdirSync(tracesDir, { recursive: true });
      
      await this.context.tracing.stop({
        path: `${tracesDir}/${scenarioFileName}.zip`,
      });
    } else {
      await this.context.tracing.stop();
    }
  }
  
  let video;
  let videoPath;
  
  if (this.page) {
    video = process.env.CI ? this.page.video() : null;
    await this.page.close();
  }
  
  if (this.context) {
    await this.context.close();
  }
  
  if (video) {
    videoPath = await video.path();
  }
  
  if (process.env.CI && videoPath) {
    if (isFailed) {
      const failedVideosDir = 'test-results/failed-videos';
      fs.mkdirSync(failedVideosDir, { recursive: true });
      
      const failedVideoPath = path.join(failedVideosDir, `${scenarioFileName}.webm`);
      fs.copyFileSync(videoPath, failedVideoPath);
    }
    
    fs.unlinkSync(videoPath);
  }
  
  if (this.browser) {
    await this.browser.close();
  }
});
