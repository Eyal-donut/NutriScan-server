import puppeteer from "puppeteer";
import { QUICK } from "./constants.js";
const ingredientsSelector = "#root > main .floatPageWrapper_DQh .styledCloseBtn_mjU .productContent_oZX .productXl_dip .tablesContainer_qO7 .tablesDisplay_E5X .tablesDisplayColumn_ac1"


const performScraping = async (barcodeNumber) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );
  await page.goto(`${QUICK}${barcodeNumber}`);
  await page.waitForSelector(ingredientsSelector);

  const ingredientsText = await page.$eval(ingredientsSelector,
    (el) => el.innerText);
  console.log(ingredientsText);
  await browser.close();
};
performScraping(7290002627210);
