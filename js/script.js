// TRANSLATIONS //

const translations = {
  en: { greeting: "Hello, I'm Davi" },
  pt: { greeting: "Olá, Eu sou o Davi" },
}

const i18nElements = document.querySelectorAll("[data-i18n]");
let lang = "en";

function applyTranslations() {
  i18nElements.forEach((element) => {
    const key = element.dataset.i18n;
    const text = translations[lang][key];
    element.textContent = text;
  });
}