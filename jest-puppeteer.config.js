module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
    headless: process.env.HEADLESS !== 'false',
  },
  server: {
    command: 'grunt serve',
    port:3000,
    launchTimeout: 5000000,
  },
  
};