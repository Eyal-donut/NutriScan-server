// import puppeteer from "puppeteer";

// async function getProductIngredients() {

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(`https://www.rami-levy.co.il/he/online/search?item=8000500023976`);
//   await page.waitForSelector('#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 div div div div .col-8 div');
//   const ingredients = await page.evaluate(() => {
//     const element = document.querySelector('#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 div div div div .col-8 div');
//     return element.textContent.trim();
//   });
//   await browser.close();
//   console.log(ingredients);
// }
// getProductIngredients()
import puppeteer from "puppeteer";

async function getProductIngredients() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to the product search page
  await page.goto(`https://www.rami-levy.co.il/he/online/search?item=8000500023976`);

  // Click on the first product link
  await Promise.all([
    page.waitForNavigation(), // Wait for the page to navigate
    page.click(".search-results .product-card:first-child .product-card__title-link"),
  ]);

  // Wait for the product modal to open
  await page.waitForSelector("#main-product-modal");

  // Get the ingredients text
  const ingredients = await page.evaluate(() => {
    const element = document.querySelector(
      '#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 div div div div .col-8 div'
    );
    return element.textContent.trim();
  });

  console.log(ingredients);

  await browser.close();
}

getProductIngredients();