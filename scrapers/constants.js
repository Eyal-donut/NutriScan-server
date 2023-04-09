const QUICK = "https://quik.co.il/?product=";
const RAMI_LEVI = "https://www.rami-levy.co.il/he/online/search?item=";

export const selectors = {
  imageSelector:
    "#__nuxt #__layout #main-content > div div:last-child > div #main-content > div > div:last-child > div > div > div > div > div > img",
  categorySelector:
    "#__nuxt #__layout #main-content > div div:last-child > div #main-content > div",
  categoryHeaderSelector:
    "#__nuxt #__layout #main-content > div div:last-child > div #main-content > div > div:first-child > div > h2",
  productCardSelector:
    "#__nuxt #__layout #main-content > div div:last-child > div #main-content > div > div:last-child > div",
  ingredientsSelector:
  "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 div div div div div:nth-child(2)",
  ingredientsHeaderSelector:
    "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 div div div div div",
  nutritionalValuesHeader:
    "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 .col-lg-9 .py-3 .px-3 svg",
  nutritionalValuesTable:
    "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product div:last-child div .main-product .pt-2 .col-lg-9 .py-3 .nutritional-values-swiper",
  modalSelector: "#main-product-modal___BV_modal_outer_ #main-product-modal",
  modalExitSelector:
    "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product > div:first-child",
  productNameSelector:
    "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div > h3",
  barcodeSelector:
    "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div > div > div",
  companySelector:
    "#main-product-modal___BV_modal_outer_ #main-product-modal .modal-dialog #main-product-modal___BV_modal_content_ #main-product-modal___BV_modal_body_ .inner-scroll-popup-product > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div > span",
};

export { QUICK, RAMI_LEVI };
