document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // TRANSLATIONS DICTIONARY
  // =========================================
  const translations = {
    en: {
      // Navigation
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",

      // Greeting
      greeting: "Hello, I'm Davi",
      subtitle: "ADS student & Developer",

      // About
      "about-title": "About Me",
      "about-text": "I am an Analysis and Systems Development student passionate about creating clean, efficient, and modern digital solutions. Focused on front-end development and constantly learning new technologies to build premium web experiences.",

      // Skills
      "skills-title": "Skills & Technologies",

      // Projects
      "projects-title": "Projects",
      "project-1-title": "Premium Web Experience",
      "project-1-desc": "A beautiful, minimalistic personal website built using modern CSS layout techniques and interactive, lightweight JavaScript features.",
      "project-2-title": "Next Big Project",
      "project-2-desc": "Currently studying new architectures and software engineering patterns to launch the next efficient fullstack application here.",

      // Contact
      "contact-title": "Contact Me",
      "contact-desc": "Feel free to reach out for projects, collaborations or just a friendly chat!",
      "form-name": "Name",
      "form-email": "Email",
      "form-msg": "Message",
      "form-btn": "Send Message"
    },
    pt: {
      // Navegação
      about: "Sobre",
      skills: "Habilidades",
      projects: "Projetos",
      contact: "Contato",

      // Saudações
      greeting: "Olá, Eu sou o Davi",
      subtitle: "Estudante de ADS & Desenvolvedor",

      // Sobre
      "about-title": "Sobre Mim",
      "about-text": "Sou estudante de Análise e Desenvolvimento de Sistemas, apaixonado por criar soluções digitais limpas, eficientes e modernas. Focado no desenvolvimento front-end e constantemente aprendendo novas tecnologias para construir experiências web premium.",

      // Skills
      "skills-title": "Habilidades & Tecnologias",

      // Projects
      "projects-title": "Projetos",
      "project-1-title": "Experiência Web Premium",
      "project-1-desc": "Um site pessoal lindo e minimalista construído usando técnicas modernas de layout CSS e recursos interativos e leves de JavaScript.",
      "project-2-title": "Próximo Grande Projeto",
      "project-2-desc": "Atualmente estudando novas arquiteturas e padrões de engenharia de software para lançar a próxima aplicação fullstack eficiente aqui.",

      // Contato
      "contact-title": "Contato",
      "contact-desc": "Sinta-se à vontade para entrar em contato para projetos, colaborações ou apenas um bate-papo amigável!",
      "form-name": "Nome",
      "form-email": "E-mail",
      "form-msg": "Mensagem",
      "form-btn": "Enviar Mensagem"
    },
  };

  let lang = "en";

  function applyTranslations() {
    // Traduz elementos de texto normais
    const i18nElements = document.querySelectorAll("[data-i18n]");
    i18nElements.forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Traduz placeholders dos inputs e caixas de texto do formulário
    const i18nPlaceholders = document.querySelectorAll("[data-i18n-placeholder]");
    i18nPlaceholders.forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (translations[lang] && translations[lang][key]) {
        element.setAttribute('placeholder', translations[lang][key]);
      }
    });
  }

  // Executa a tradução inicial do site
  applyTranslations();

  // =========================================
  // LANGUAGE TOGGLE
  // =========================================
  const langButton = document.getElementById('lang-button');

  function updateLangButtonIcon() {
    if (lang === "en") {
      // Se o site está em inglês, mostra a bandeira do Brasil pra mudar pra PT
      langButton.innerHTML = '<span class="fi fi-br"></span>';
    } else {
      // Se o site está em português, mostra a bandeira dos EUA pra mudar pra EN
      langButton.innerHTML = '<span class="fi fi-us"></span>';
    }
  }

  // Inicializa o ícone correto assim que a página carrega
  updateLangButtonIcon();

  langButton.addEventListener('click', () => {
    if (lang === "en") {
      lang = "pt";
    } else {
      lang = "en";
    }

    updateLangButtonIcon();
    applyTranslations();
  });

  // =========================================
  // THEME TOGGLE (DARK/ LIGHT MODE)
  // =========================================
  const themeButton = document.getElementById('theme-button');

  function updateThemeButtonIcon() {
    // Usamos o mesmo ícone minimalista de contraste para os dois modos
    themeButton.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i>';
  }

  if (themeButton) {
    updateThemeButtonIcon();

    themeButton.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      updateThemeButtonIcon();
    });
  }

  // =========================================
  // HAMBURGUER MENU (MOBILE)
  // =========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Fecha o menu hambúrguer automaticamente ao clicar em qualquer link (Mobile UX)
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
});