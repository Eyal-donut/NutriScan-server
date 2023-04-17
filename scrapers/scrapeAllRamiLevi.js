import puppeteer from "puppeteer";
import colors from "colors";
import autoScroll from "./scrape utils/autoScroll.js";
import { wait } from "./scrape utils/wait.js";
import { selectors } from "./constants.js";
import { createProductLocally } from "../controllers/localProductsController.js";

const performScraping = async () => {
  const browser = await puppeteer.launch({
    // executablePath: `C:/Program Files/Google/Chrome/Application/chrome.exe`,
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
      timeout: 0,
    },
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );

  while (true) {
    try {
      await page.goto(
        `https://www.rami-levy.co.il/he/online/market/%D7%A4%D7%90%D7%A8%D7%9D-%D7%95%D7%AA%D7%99%D7%A0%D7%95%D7%A7%D7%95%D7%AA`
      );
      // await page.waitForSelector(selectors.categoryHeaderSelector);
      await page.waitForSelector(selectors.imageSelector);

      //Scroll until you can't scroll no more
      await autoScroll(page);

      const categories = await page.$$(selectors.categorySelector);

      let header;
      let productObj = {};

      for (let category of categories) {
        header = await category.$eval(selectors.categoryHeaderSelector, (el) =>
          el.innerText.trim()
        );

        const productCards = await category.$$(selectors.productCardSelector);

        for (let productCard of productCards) {
          await wait(1000);

          //~ Scrape Image if exists
          const imageElement = await page.$(selectors.imageSelector);
          if (imageElement) {
            const imageSrc = await productCard.$eval(
              selectors.imageSelector,
              (el) => el.getAttribute("src")
            );
            const imageURL = `https://www.rami-levy.co.il${imageSrc}`;

            productObj = { category: header, imageURL };
          }

          await productCard.click();
          await page.waitForSelector(selectors.modalSelector);

          //~ Scrape Ingredients if exists
          const ingredientsTextElement = await page
            .waitForSelector(selectors.ingredientsSelector, { timeout: 500 })
            .catch(() => null);
          if (ingredientsTextElement) {
            const ingredientsHeaderElement = await page.$(
              selectors.ingredientsHeaderSelector
            );
            if (ingredientsHeaderElement) {
              const ingredientsHeaderText = await page.$eval(
                selectors.ingredientsHeaderSelector,
                (el) => el.innerText
              );
              if (ingredientsHeaderText === "רכיבים") {
                const ingredientsText = await page.$eval(
                  selectors.ingredientsSelector,
                  (el) => el.innerText
                );
                productObj = { ...productObj, ingredients: ingredientsText };
              }
            }
          }

          //~ Scrape barcode if exists
          const barcodeElement = await page.$(selectors.barcodeSelector);
          if (barcodeElement) {
            const barcodeString = await page.$eval(
              selectors.barcodeSelector,
              (el) => el.innerText
            );
            const barcodeNumber = Number(barcodeString.match(/\d+/));

            productObj = { ...productObj, barcode: barcodeNumber };
          }

          //~ Scrape productName if exists
          const productNameElement = await page.$(
            selectors.productNameSelector
          );
          if (productNameElement) {
            const productName = await page.$eval(
              selectors.productNameSelector,
              (el) => el.innerText
            );

            productObj = { ...productObj, name: productName };
          }

          //~ Scrape company if exists
          const companyElement = await page.$(selectors.companySelector);
          if (companyElement) {
            const company = await page.$eval(
              selectors.companySelector,
              (el) => el.innerText
            );

            productObj = { ...productObj, company: company };
          }

          //~ Scrape nutritional values if exists
          const nutritionalValuesHeaderElement = await page
            .waitForSelector(selectors.nutritionalValuesHeader, {
              timeout: 500,
            })
            .catch(() => null);
          if (nutritionalValuesHeaderElement) {
            await page.click(selectors.nutritionalValuesHeader);
            await page.waitForSelector(selectors.nutritionalValuesTable);
            const nutValuesText = await page.$eval(
              selectors.nutritionalValuesTable,
              (el) => el.innerText
            );

            productObj = { ...productObj, nutritionalValues: nutValuesText };
          }

          createProductLocally(productObj);

          await page.click(selectors.modalExitSelector);

          await page
            .waitForSelector(selectors.modalSelector, {
              hidden: true,
              timeout: 5000,
            })
            .catch(() => null);
        }
      }

      await browser.close();
      console.log("I'm done bra".yellow.bold);
      break;
    } catch (error) {
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
      console.log("page reloaded".yellow.bold);
      continue;
    }
  }
};

performScraping();
