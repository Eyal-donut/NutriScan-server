import puppeteer from "puppeteer";
import { RAMI_LEVI } from "./constants.js";
const ingredientsSelector =
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 div div div div";
const imageSelector =
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .px-3 div div div img";
const nutritionalValuesHeader =
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 .col-lg-9 .py-3 .px-3";
const nutritionalValuesTable =
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 .col-lg-9 .py-3 .nutritional-values-swiper";

const performScraping = async (barcodeNumber) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
  );
  await page.goto(`${RAMI_LEVI}${barcodeNumber}`);

  // //~ Scrape product image
  const imageSrc = await page.$eval(imageSelector, (el) =>
    el.getAttribute("src")
  );
  const imageURL = `https://www.rami-levy.co.il${imageSrc}`;
  console.log(imageURL);

  //~ Scrape ingredients
  const ingredientsText = await page.$eval(
    ingredientsSelector,
    (el) => el.innerText
  );
  console.log(ingredientsText);

  //~ Scrape nutritional values
  await page.click(nutritionalValuesHeader);
  await page.waitForSelector(nutritionalValuesTable);
  const nutValuesText = await page.$eval(
    nutritionalValuesTable,
    (el) => el.innerText
  );
  console.log(nutValuesText);

  await browser.close();
};

performScraping(8000500023976);
