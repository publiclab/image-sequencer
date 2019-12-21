module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
  },
  server: {
    command: 'grunt serve',
    port:3000,
    launchTimeout: 5000000,
  },
  
};