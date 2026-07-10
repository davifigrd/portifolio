// 1. FORÇAR A PÁGINA A IR PARA O TOPO IMEDIATAMENTE NO REFRESH (F5)
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // Garante o topo assim que o DOM estiver pronto
  window.scrollTo(0, 0);

  // =========================================
  // TRANSLATIONS DICTIONARY
  // =========================================
  const translations = {
    en: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      greeting: "Hello, I'm Davi",
      subtitle: "ADS student & Developer",
      "about-title": "About Me",
      "about-text": "I am an Analysis and Systems Development student passionate about creating clean, efficient, and modern digital solutions. Focused on front-end development and constantly learning new technologies to build premium web experiences.",
      "skills-title": "Skills & Technologies",
      "projects-title": "Projects",
      "project-1-title": "Premium Web Experience",
      "project-1-desc": "A beautiful, minimalistic personal website built using modern CSS layout techniques and interactive, lightweight JavaScript features.",
      "project-2-title": "Next Big Project",
      "project-2-desc": "Currently studying new architectures and software engineering patterns to launch the next efficient fullstack application here.",
      "contact-title": "Contact Me",
      "contact-desc": "Feel free to reach out for projects, collaborations or just a friendly chat!",
      "form-name": "Name",
      "form-email": "Email",
      "form-msg": "Message",
      "form-btn": "Send Message"
    },
    pt: {
      about: "Sobre",
      skills: "Habilidades",
      projects: "Projetos",
      contact: "Contato",
      greeting: "Olá, Eu sou o Davi",
      subtitle: "Estudante de ADS & Desenvolvedor",
      "about-title": "Sobre Mim",
      "about-text": "Sou estudante de Análise e Desenvolvimento de Sistemas, apaixonado por criar soluções digitais limpas, eficientes e modernas. Focado no desenvolvimento front-end e constantemente aprendendo novas tecnologias para construir experiências web premium.",
      "skills-title": "Habilidades & Tecnologias",
      "projects-title": "Projetos",
      "project-1-title": "Experiência Web Premium",
      "project-1-desc": "Um site pessoal lindo e minimalista construído usando técnicas modernas de layout CSS e recursos interativos e leves de JavaScript.",
      "project-2-title": "Próximo Grande Projeto",
      "project-2-desc": "Atualmente estudando novas arquiteturas e padrões de engenharia de software para lançar a próxima aplicação fullstack eficiente aqui.",
      "contact-title": "Contato",
      "contact-desc": "Sainte-se à vontade para entrar em contato para projetos, colaborações ou apenas um bate-papo amigável!",
      "form-name": "Nome",
      "form-email": "E-mail",
      "form-msg": "Mensagem",
      "form-btn": "Enviar Mensagem"
    },
  };

  // DETECÇÃO AUTOMÁTICA DE IDIOMA
  let lang = localStorage.getItem('user-language');

  if (!lang) {
    const browserLang = navigator.language || navigator.userLanguage;
    lang = browserLang.startsWith('pt') ? 'pt' : 'en';
  }

  if (localStorage.getItem('user-theme') === 'light') {
    document.body.classList.add('light-mode');
  }

  function applyTranslations() {
    const i18nElements = document.querySelectorAll("[data-i18n]");
    i18nElements.forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        element.innerHTML = translations[lang][key];
      }
    });

    const i18nPlaceholders = document.querySelectorAll("[data-i18n-placeholder]");
    i18nPlaceholders.forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (translations[lang] && translations[lang][key]) {
        element.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // CONTROLADOR DINÂMICO DA MÁQUINA DE ESCREVER (SUBTITLE)
    const subtitleEl = document.querySelector('.subtitle');
    if (subtitleEl) {
      subtitleEl.style.animation = 'none';
      void subtitleEl.offsetWidth; // Truque de reflow
      subtitleEl.style.animation = '';

      const textLength = subtitleEl.textContent.length;
      subtitleEl.style.setProperty('--text-length', textLength);
    }
  } // <--- CHAVE CORRIGIDA AQUI

  applyTranslations();

  // =========================================
  // REFERÊNCIAS GLOBAIS (Elementos DOM)
  // =========================================
  const langButton = document.getElementById('lang-button');
  const themeButton = document.getElementById('theme-button');
  const overlay = document.querySelector('.lang-overlay');
  const profileCard = document.querySelector('.profile-card');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuItems = document.querySelectorAll('.nav-links a');

  function updateLangButtonIcon() {
    if (langButton) {
      if (lang === "en") {
        langButton.innerHTML = '<span class="fi fi-br"></span>';
      } else {
        langButton.innerHTML = '<span class="fi fi-us"></span>';
      }
    }
  }

  function updateThemeButtonIcon() {
    if (themeButton) {
      themeButton.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i>';
    }
  }

  updateLangButtonIcon();
  updateThemeButtonIcon();

  // Modifique este bloco por volta da linha 116:
  if (overlay) {
    overlay.classList.add('run-transition');
    setTimeout(() => { overlay.classList.remove('run-transition'); }, 1250);
  }

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);

  if (profileCard) {
    // Faz o giro de 360 graus lindo na entrada da página
    setTimeout(() => {
      profileCard.classList.add('active-360');
    }, 1450);

    // CONTROLE DO CLIQUE (FRENTE / VERSO)
    let isFlipped = false;
    profileCard.addEventListener('click', () => {
      // Remove a classe de entrada para ela não brigar com o clique
      profileCard.classList.remove('active-360');

      isFlipped = !isFlipped; // Inverte o estado

      const innerCard = profileCard.querySelector('.profile-card-inner');
      if (innerCard) {
        // Gira na hora que clica, sem esperar o mouse sair!
        innerCard.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
      }
    });
  }

  // =========================================
  // EVENTOS DE CLIQUES (IDIOMA E TEMA CORRIGIDOS)
  // =========================================
  // =========================================
  // EVENTOS DE CLIQUES (RESET DE ANIMAÇÃO REAL)
  // =========================================
  if (langButton && overlay) {
    langButton.addEventListener('click', () => {
      // Injeta a animação flash
      overlay.classList.add('run-transition');

      // Muda o idioma bem no meio da cortina (quando ela cobrir a tela inteira aos 500ms)
      setTimeout(() => {
        lang = (lang === "en") ? "pt" : "en";
        localStorage.setItem('user-language', lang);
        updateLangButtonIcon();
        applyTranslations();
      }, 500);

      // Remove a classe logo após a animação acabar (1.2s), deixando ela pronta para o próximo clique
      setTimeout(() => {
        overlay.classList.remove('run-transition');
      }, 1250);
    });
  }

  if (themeButton && overlay) {
    themeButton.addEventListener('click', () => {
      // Injeta a animação flash
      overlay.classList.add('run-transition');

      // Muda o tema no escuro total (500ms)
      setTimeout(() => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('user-theme', isLight ? 'light' : 'dark');
        updateThemeButtonIcon();
      }, 500);

      // Reseta o gatilho da cortina
      setTimeout(() => {
        overlay.classList.remove('run-transition');
      }, 1250);
    });
  }

  if (themeButton && overlay) {
    themeButton.addEventListener('click', () => {
      // 1. Dispara a cortina
      overlay.classList.add('active');

      // 2. Altera o tema exatamente no meio da transição escura (600ms)
      setTimeout(() => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('user-theme', isLight ? 'light' : 'dark');
        updateThemeButtonIcon();
      }, 600); // Sincronizado com o ponto cego

      // 3. Finaliza a animação retirando a cortina
      setTimeout(() => {
        overlay.classList.remove('active');
      }, 1400);
    });
  }

  if (themeButton && overlay) {
    themeButton.addEventListener('click', () => {
      overlay.classList.add('active');
      setTimeout(() => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('user-theme', isLight ? 'light' : 'dark');
        updateThemeButtonIcon();
      }, 500);
      setTimeout(() => {
        overlay.classList.remove('active');
      }, 1400);
    });
  }

  // =========================================
  // HAMBURGUER MENU (MOBILE)
  // =========================================
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // =========================================
  // ANIMAÇÃO DE REVELAÇÃO DAS SEÇÕES AO ROLAR
  // =========================================
  const sections = document.querySelectorAll('section');

  function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add('active-section');
      }
    });
  }

  window.addEventListener('scroll', revealSections);
  setTimeout(revealSections, 600);
});

// =========================================
// APARIÇÃO DINÂMICA DO HEADER (PÓS-HERO)
// =========================================
const header = document.querySelector('header');
const heroSection = document.getElementById('hero');

if (header && heroSection) {
  window.addEventListener('scroll', () => {
    const heroHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > heroHeight * 0.8) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }

    if (scrollPosition > heroHeight * 1.2) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}