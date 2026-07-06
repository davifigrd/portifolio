// =========================================
// TRANSLATIONS
// =========================================
const translations = {
  en: {
    greeting: "Hello, I'm Davi",
    subtitle: "ADS student & Developer",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
  },
  pt: {
    greeting: "Olá, Eu sou o Davi",
    subtitle: "Estudante de ADS & Desenvolvedor",
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    contact: "Contato",
  },
};

let lang = "en";

function applyTranslations() {
  const i18nElements = document.querySelectorAll("[data-i18n]");

  i18nElements.forEach((element) => {
    const key = element.dataset.i18n;

    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// =========================================
// LANGUAGE TOGGLE
// =========================================
const langButton = document.getElementById('lang-button');

langButton.addEventListener('click', () => {
  if (lang === "en") {
    lang = "pt";
    langButton.textContent = "🇺🇸";
  } else {
    lang = "en";
    langButton.textContent = "🇧🇷"
  }

  applyTranslations();
});

// =========================================
// THEME TOGGLE (DARK/ LIGHT MODE)
// =========================================
const themeButton = document.getElementById('theme-button');

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      themeButton.textContent = "🌙";
    } else {
      themeButton.textContent = "☀️";
    }
  });
}

// =========================================
// HAMBURGUER MENU (MOBILE)
// =========================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
