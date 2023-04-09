import puppeteer from "puppeteer";
import colors from "colors";
import autoScroll from "./scrape utils/autoScroll.js";
// import { wait } from "./scrape utils/wait.js";

const ingredientsSelector =
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 div div div div";
const imageSelector =
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .px-3 div div div img";
const nutritionalValuesHeader =
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 .col-lg-9 .py-3 .px-3";
const nutritionalValuesTable =
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 .col-lg-9 .py-3 .nutritional-values-swiper";

const performScraping = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );
  await page.goto(`https://www.rami-levy.co.il/he/online/search`);

  //Scroll until you can't scroll no more
  // await autoScroll(page);

  //Select all product categories (an array):
  const categorySelector =
    "#__nuxt #__layout #main-content > div div:last-child > div #main-content > div";
  const categoryHeaderSelector =
    "#__nuxt #__layout #main-content > div div:last-child > div #main-content > div > div:first-child > div > h2";
  const productCardSelector =
    "#__nuxt #__layout #main-content > div div:last-child > div #main-content > div > div:last-child > div";

  //Appears after modal is open
  // const modalSelector =
  //   "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product";
  const modalSelector =
    "#main-product-modal___BV_modal_outer_ #main-product-modal";

  const modalExitSelector =
    "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product > div:first-child";

  const categories = await page.$$(categorySelector);

  for (const category of categories) {
    const header = await category.$eval(categoryHeaderSelector, (el) =>
      el.innerText.trim()
    );
    console.log(header.green.bold);

    const productCards = await category.$$(productCardSelector);
    console.log(productCards);
    // break
    for (const productCard of productCards) {
      await productCard.click();
      await page.waitForSelector(modalSelector);

      //Scrape Image if exists
      const imageElement = await page.$(imageSelector);
      if (imageElement) {
        const imageSrc = await page.$eval(imageSelector, (el) =>
          el.getAttribute("src")
        );
        const imageURL = `https://www.rami-levy.co.il${imageSrc}`;
        console.log(imageURL.yellow.bold);
      }

      //Scrape Ingredients if exists
      const ingredientsTextElement = await page.$(ingredientsSelector);
      if (ingredientsTextElement) {
        const ingredientsText = await page.$eval(
          ingredientsSelector,
          (el) => el.innerText
        );
        console.log(ingredientsText.red.bold);
      }
    }

    // Scrape nutritional values if exists
    const nutritionalValuesElement = await page.$(nutritionalValuesHeader);
    if (nutritionalValuesElement) {
      await page.click(nutritionalValuesHeader);
      await page.waitForSelector(nutritionalValuesTable);
      const nutValuesText = await page.$eval(
        nutritionalValuesTable,
        (el) => el.innerText
      );
      console.log(nutValuesText.yellow.bold);
    }

    await page.click(modalExitSelector);

    await page.waitForTimeout(2000);
  }

  // await browser.close();
};

performScraping();
