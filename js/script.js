// =================================================================
// SCROLL-TO-TOP FIX ON REFRESH (F5)
// Forces the page to stay at the top instead of restoring old scroll
// position, so the intro curtain always plays from a clean state.
// =================================================================
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  // =========================================
  // TRANSLATIONS DICTIONARY (i18n)
  // =========================================
  const translations = {
    en: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      greeting: "Davi",
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
      greeting: "Davi Figueiredo",
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

  // Auto-detects language from a saved preference or the browser locale
  let lang = localStorage.getItem('user-language');
  if (!lang) {
    const browserLang = navigator.language || navigator.userLanguage;
    lang = browserLang.startsWith('pt') ? 'pt' : 'en';
  }

  // =========================================
  // APPLY TRANSLATIONS TO THE PAGE
  // =========================================
  const i18nTextElements = document.querySelectorAll("[data-i18n]");
  i18nTextElements.forEach((element) => {
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

  // =========================================
  // SUBTITLE TYPEWRITER SETUP
  // Restarts the CSS "typing" animation and recalculates the
  // character count so it matches whichever language is active.
  // =========================================
  const subtitleEl = document.querySelector('.subtitle');
  if (subtitleEl) {
    subtitleEl.style.animation = 'none';
    void subtitleEl.offsetWidth; // Forces a reflow so the animation can restart
    subtitleEl.style.animation = '';

    const textLength = subtitleEl.textContent.length;
    subtitleEl.style.setProperty('--text-length', textLength);
  }

  // =========================================
  // GLOBAL DOM REFERENCES
  // =========================================
  const profileCard = document.querySelector('.profile-card');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuItems = document.querySelectorAll('.nav-links a');

  // Reveals the page body shortly after DOM content is ready
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);

  // =========================================
  // PROFILE CARD ENTRY ANIMATION (360° spin-in)
  // =========================================
  if (profileCard) {
    setTimeout(() => {
      profileCard.classList.add('active-360');
    }, 1450);
  }

  // =========================================
  // HAMBURGER MENU (MOBILE)
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
  // SECTION SCROLL-REVEAL ANIMATION
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

  // =========================================
  // CONTACT FORM: VALIDATION + SIMULATED SUBMIT
  // =========================================
  const contactForm = document.querySelector('.contact-form');
  const submitBtn = contactForm ? contactForm.querySelector('button') : null;

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isEn = (lang === 'en');

      // Basic profanity / inappropriate-content filter
      const blackList = [
        "viado", "puta", "caralho", "porra", "merda", "chupa", "buceta", "pica", "caral", "fdp", "vtnm",
        "arrombado", "cu", "cuzao", "pnc", "cacete", "bosta", "vadia", "vagabundo", "bicha", "macaco",
        "filho da puta", "imbecil", "idiota", "otario", "pinto", "xereca", "penis", "vagina", "orgia", "sexo",
        "fuck", "shit", "bitch", "asshole", "cunt", "dick", "pussy", "faggot", "nigger", "bastard",
        "slut", "whore", "cock", "prick", "wanker", "motherfucker", "sex", "porn", "naked"
      ];

      // Button label text for each state, in both languages
      const text = {
        sending: isEn ? `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...` : `<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...`,
        success: isEn ? `<i class="fa-solid fa-circle-check"></i> Message Sent!` : `<i class="fa-solid fa-circle-check"></i> Mensagem Enviada!`,
        errEmpty: isEn ? `<i class="fa-solid fa-circle-xmark"></i> Fill all fields!` : `<i class="fa-solid fa-circle-xmark"></i> Preencha os campos!`,
        errEmail: isEn ? `<i class="fa-solid fa-circle-xmark"></i> Invalid Email!` : `<i class="fa-solid fa-circle-xmark"></i> E-mail Inválido!`,
        errBanned: isEn ? `<i class="fa-solid fa-hand"></i> Forbidden Content!` : `<i class="fa-solid fa-hand"></i> Conteúdo Proibido!`
      };

      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');

      let mensagemErro = "";

      const contemTermoProibido = (texto) => {
        if (!texto) return false;
        const textoMinusculo = texto.toLowerCase();
        return blackList.some(termo => textoMinusculo.includes(termo));
      };

      const emailValido = (email) => {
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return regex.test(email.toLowerCase().trim());
      };

      // Validation pipeline: empty fields -> invalid email -> banned content
      if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
        mensagemErro = text.errEmpty;
      } else if (emailInput && !emailValido(emailInput.value)) {
        mensagemErro = text.errEmail;
      } else if (contemTermoProibido(nameInput?.value) || contemTermoProibido(messageInput?.value)) {
        mensagemErro = text.errBanned;
      }

      const originalText = submitBtn.innerHTML;

      if (mensagemErro !== "") {
        submitBtn.classList.remove('success', 'loading');
        submitBtn.classList.add('error', 'shake');
        submitBtn.innerHTML = mensagemErro;

        setTimeout(() => {
          submitBtn.classList.remove('shake');
        }, 500);

        setTimeout(() => {
          submitBtn.classList.remove('error');
          submitBtn.innerHTML = originalText;
        }, 1500);

      } else {
        submitBtn.classList.remove('success', 'error', 'shake');
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = text.sending;

        setTimeout(() => {
          submitBtn.classList.remove('loading');
          submitBtn.classList.add('success');
          submitBtn.innerHTML = text.success;

          setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.innerHTML = originalText;
            contactForm.reset();
          }, 1500);

        }, 2000);
      }
    });
  }

  // =========================================
  // BACK-TO-TOP BUTTON VISIBILITY
  // Shows the button once the Contact section enters the viewport.
  // =========================================
  const backToTopButton = document.getElementById('back-to-top');
  const contactSection = document.getElementById('contact');

  if (backToTopButton && contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    contactObserver.observe(contactSection);
  }
});

// =========================================
// HEADER SHOW/HIDE ON SCROLL (up = show, down = hide)
// =========================================
const header = document.querySelector('header');
const heroSection = document.getElementById('hero');
const backToTopBtn = document.getElementById('back-to-top');

let lastScrollY = window.scrollY;
let borderTimeout = null;
let suppressHeaderOnTop = false; // True while the back-to-top scroll animation is running

// Clicking "back to top" scrolls upward, which would normally reveal the
// header (see scroll logic below). This suppresses that side-effect.
if (backToTopBtn && header) {
  backToTopBtn.addEventListener('click', () => {
    suppressHeaderOnTop = true;
    header.classList.remove('visible');
    header.classList.remove('scrolled');
    clearTimeout(borderTimeout);
  });
}

if (header && heroSection) {
  window.addEventListener('scroll', () => {
    const heroHeight = heroSection.offsetHeight;
    const currentScrollY = window.scrollY;

    // Releases the lock only once the page has actually reached the top,
    // no matter how long the smooth-scroll animation takes.
    if (suppressHeaderOnTop && currentScrollY <= 5) {
      suppressHeaderOnTop = false;
    }

    const pastHero = currentScrollY > heroHeight * 0.8;
    const scrollingUp = currentScrollY < lastScrollY;

    if (!suppressHeaderOnTop && pastHero && (scrollingUp || currentScrollY <= 0)) {
      if (!header.classList.contains('visible')) {
        header.classList.add('visible');

        clearTimeout(borderTimeout);
        borderTimeout = setTimeout(() => {
          header.classList.add('scrolled');
        }, 500);
      }
    } else {
      header.classList.remove('visible');
      header.classList.remove('scrolled');
      clearTimeout(borderTimeout);
    }

    lastScrollY = currentScrollY;
  });
}

// =================================================================
// PAGE LOAD SEQUENCE (intro curtain, scroll hint, coin spin)
// =================================================================
window.addEventListener('load', () => {
  const introScreen = document.getElementById('intro-screen');

  // =========================================
  // INTRO CURTAIN TIMELINE
  // =========================================
  if (introScreen) {
    document.body.classList.add('loaded');

    // Keeps the curtain fully closed for 6s while it pulses gently
    setTimeout(() => {
      introScreen.classList.add('fade-out');

      // At ~85% open (700ms in), the Hero fades in behind the curtain
      setTimeout(() => {
        document.body.classList.add('start-animations');
      }, 700);

      // Curtain fully gone: enable real scrolling and arm the scroll hint
      setTimeout(() => {
        document.body.classList.add('scrollbar-visible');
        introScreen.remove();
        ativarAvisoScroll();
      }, 1300);

    }, 6000);
  } else {
    document.body.classList.add('loaded');
    document.body.classList.add('start-animations');
    document.body.classList.add('scrollbar-visible');
    ativarAvisoScroll();
  }

  // =========================================
  // IDLE SCROLL HINT
  // Appears after 5s of inactivity, disappears for good on first scroll.
  // =========================================
  function ativarAvisoScroll() {
    const obterTexto = () => {
      const idiomaSalvo = localStorage.getItem('user-language') || 'pt';
      return idiomaSalvo === 'en' ? 'Scroll' : 'Role para baixo';
    };

    const hint = document.createElement('div');
    hint.className = 'scroll-hint';
    hint.innerHTML = `
      <span id="scroll-hint-text">${obterTexto()}</span>
      <svg viewBox="0 0 24 24">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    `;
    document.body.appendChild(hint);

    let timerHint = setTimeout(() => {
      hint.classList.add('show');
    }, 5000);

    const removerAviso = () => {
      clearTimeout(timerHint);
      hint.classList.remove('show');

      setTimeout(() => {
        hint.remove();
      }, 800);

      window.removeEventListener('scroll', removerAviso);
    };

    window.addEventListener('scroll', removerAviso);
  }

  // =========================================
  // PROFILE CARD SPIN-ON-CLICK (coin flip accumulator)
  // Keeps spinning further with every click instead of resetting.
  // =========================================
  const profileCard = document.querySelector('.profile-card');
  const cardInner = document.querySelector('.profile-card-inner');

  if (profileCard && cardInner) {
    let rotacaoAcumulada = 360; // Starts at 360 to match the entry-spin animation

    const girarMoeda = () => {
      rotacaoAcumulada += 180;
      cardInner.style.transform = `rotateY(${rotacaoAcumulada}deg)`;
    };

    profileCard.addEventListener('click', girarMoeda);
  }
});

// =================================================================
// 3D SKILL CUBES: click jump + continuous hover rotation
// =================================================================
const cubes = document.querySelectorAll('.cube');

// Click: brief "jump" pulse
cubes.forEach(cube => {
  cube.addEventListener('click', () => {
    if (cube.classList.contains('jump-active')) return;

    cube.classList.add('jump-active');
    setTimeout(() => {
      cube.classList.remove('jump-active');
    }, 600);
  });
});

// Hover: constant-speed rotation that always eases back to the resting angle
cubes.forEach(cube => {
  let animationFrameId = null;
  let currentY = 25;       // Starting Y angle
  const baseX = -20;       // Fixed X angle
  const velocidade = 2.0;  // Constant rotation speed for every cube
  let isHovered = false;

  function updateRotation() {
    currentY += velocidade;

    if (isHovered) {
      // Mouse over: spin indefinitely
      cube.style.transform = `rotateX(${baseX}deg) rotateY(${currentY}deg)`;
      animationFrameId = requestAnimationFrame(updateRotation);
    } else {
      // Mouse left: keep the same pace until it lands back on the resting angle
      const anguloRelativo = (currentY - 25) % 360;

      if (anguloRelativo >= 0 && anguloRelativo < velocidade) {
        const voltas = Math.round((currentY - 25) / 360);
        currentY = 25 + (voltas * 360); // Snaps precisely to the resting angle
        cube.style.transform = `rotateX(${baseX}deg) rotateY(${currentY}deg)`;
        animationFrameId = null; // Stops the loop gracefully
      } else {
        cube.style.transform = `rotateX(${baseX}deg) rotateY(${currentY}deg)`;
        animationFrameId = requestAnimationFrame(updateRotation);
      }
    }
  }

  cube.addEventListener('mouseenter', () => {
    isHovered = true;
    if (!animationFrameId) {
      updateRotation();
    }
  });

  cube.addEventListener('mouseleave', () => {
    isHovered = false;
    // Loop keeps running until it naturally reaches the resting angle
  });
});