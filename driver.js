const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
async function get_driver(){
  const options = new firefox.Options();
  const driver =  await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options).build();
  return driver;
}
module.exports = get_driver;