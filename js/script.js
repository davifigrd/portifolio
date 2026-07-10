const immediateOverlay = document.querySelector('.lang-overlay');
if (immediateOverlay) {
  immediateOverlay.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
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
      "contact-desc": "Sinta-se à vontade para entrar em contato para projetos, colaborações ou apenas um bate-papo amigável!",
      "form-name": "Nome",
      "form-email": "E-mail",
      "form-msg": "Mensagem",
      "form-btn": "Enviar Mensagem"
    },
  };

  let lang = localStorage.getItem('user-language') || "en";

  if (localStorage.getItem('user-theme') === 'light') {
    document.body.classList.add('light-mode');
  }

  function applyTranslations() {
    const i18nElements = document.querySelectorAll("[data-i18n]");
    i18nElements.forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    const i18nPlaceholders = document.querySelectorAll("[data-i18n-placeholder]");
    i18nPlaceholders.forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      if (translations[lang] && translations[lang][key]) {
        element.setAttribute('placeholder', translations[lang][key]);
      }
    });
  }

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

  // =========================================
  // CONTROLADORES DE ÍCONES
  // =========================================
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

  // =========================================
  // TRANSIÇÃO NO REFRESH (F5) & TEASER RÁPIDO 360°
  // =========================================
  if (overlay) {
    // Remove a classe suavemente após os 1.4s da animação terminar por completo
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 1400);
  }

  // 3. Torna o site visível bem no meio da transição (com a tela 100% coberta)
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);

  // 4. Roda o efeito 360° da foto de perfil estritamente DEPOIS que a cortina sai de cena
  if (profileCard) {
    setTimeout(() => {
      profileCard.classList.add('active-360');
    }, 1450);

    // Limpa a animação da moeda
    setTimeout(() => {
      profileCard.classList.remove('active-360');
    }, 2250);

    // Mantém o clique manual
    profileCard.addEventListener('click', () => {
      profileCard.classList.toggle('active');
    });
  }

  // =========================================
  // EVENTOS DE CLIQUES (IDIOMA E TEMA CORRIGIDOS)
  // =========================================
  if (langButton && overlay) {
    langButton.addEventListener('click', () => {
      overlay.classList.add('active');

      // Muda o idioma exatamente quando a tela estiver 100% coberta (no meio do ciclo)
      setTimeout(() => {
        lang = (lang === "en") ? "pt" : "en";
        localStorage.setItem('user-language', lang);
        updateLangButtonIcon();
        applyTranslations();
      }, 500);

      // CORREÇÃO: Aguarda os 1.4s completos da animação terminar para limpar a classe sem cortes secos
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
        
        // ADICIONE ESTAS LINHAS AQUI: Verifica se a classe existe e salva o status correto
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
});