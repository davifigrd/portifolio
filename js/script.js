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

      // DESCRIÇÕES EM INGLÊS (RESUMIDAS)
      // Terminal Zero
      "project-1-desc": "Puzzle game developed as an academic project. It features 10 levels with challenges focused on logic, observation, and player interaction.",
      // IA Consciente
      "project-2-desc": "A web app created for an academic extension project that promotes ethical AI use by helping users spot limitations in generated content.",
      // Tristram Health & Mind
      "project-3-desc": "A wellness platform developed as an academic project that uses AI and your phone camera to correct your posture in real time.",

      "view-project": "View Project",
      "contact-title": "Contact Me",
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

      // DESCRIÇÕES EM PORTUGUÊS (RESUMIDAS)
      // Terminal Zero
      "project-1-desc": "Jogo do estilo puzzle desenvolvido como projeto acadêmico. Apresenta 10 fases com desafios focados em lógica, observação e interação.",
      // IA Consciente
      "project-2-desc": "Aplicação web para extensão acadêmica que promove o uso ético da IA, ensinando a identificar falhas em conteúdos gerados por algoritmos.",
      // Tristram Health & Mind
      "project-3-desc": "Plataforma de bem-estar criada como projeto acadêmico que utiliza IA e a câmera do celular para corrigir a postura em tempo real.",

      "view-project": "Ver Projeto",
      "contact-title": "Entre em Contato",
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
  // ANIMAÇÃO INTELIGENTE DAS LINHAS DOS H2 (SCROLL)
  // =========================================
  const headings = document.querySelectorAll('h2');

  if ('IntersectionObserver' in window) {
    const headingObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // Se o título ficou visível na tela
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Deixa de observar este h2 específico para que a animação não se repita ao subir a página
          observer.unobserve(entry.target);
        }
      });
    }, {
      // Ativa quando 20% do elemento já estiver visível no ecrã
      threshold: 0.2,
      // Margem para iniciar a animação um pouco antes de aparecer totalmente
      rootMargin: "0px 0px -50px 0px"
    });

    headings.forEach(heading => headingObserver.observe(heading));
  } else {
    // Fallback caso o navegador seja muito antigo e não suporte IntersectionObserver
    headings.forEach(heading => heading.classList.add('active'));
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

  // =================================================================
  // HEADER VISIBILITY ON MOBILE & DESKTOP (Item 1 - Travado no Mobile)
  // =================================================================
  const header = document.querySelector('header');
  const heroSection = document.getElementById('hero');

  let lastScrollY = window.scrollY;
  let borderTimeout = null;

  if (header && heroSection) {
    window.addEventListener('scroll', () => {
      const heroHeight = heroSection.offsetHeight;
      const currentScrollY = window.scrollY;
      const pastHero = currentScrollY > heroHeight * 0.8;

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // Comportamento Mobile: Passou do hero, fica FIXO e não some mais ao descer
        if (pastHero) {
          header.classList.add('visible', 'scrolled');
        } else {
          header.classList.remove('visible', 'scrolled');
        }
      } else {
        // Comportamento Desktop: Mantido original intacto
        const scrollingUp = currentScrollY < lastScrollY;

        if (pastHero && (scrollingUp || currentScrollY <= 0)) {
          if (!header.classList.contains('visible')) {
            header.classList.add('visible');
            clearTimeout(borderTimeout);
            borderTimeout = setTimeout(() => {
              header.classList.add('scrolled');
            }, 500);
          }
        } else {
          header.classList.remove('visible', 'scrolled');
          clearTimeout(borderTimeout);
        }
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
  });

    // =================================================================
    // PROFILE CARD SPIN (Click Accumulator + Inactivity Auto-Spin)
    // =================================================================
    const cardInner = document.querySelector('.profile-card-inner');

    if (profileCard && cardInner) {
      let rotacaoAcumulada = 360; // Começa em 360 para bater com a animação de entrada
      let inactivityTimer;
      const TEMPO_INATIVIDADE = 10000; // 10 segundos de inatividade (mude se quiser)

      // Função para dar o giro de 360 graus automático
      const girarAutomatico = () => {
        rotacaoAcumulada += 360; // Soma 360 graus no acumulador global
        cardInner.style.transform = `rotateY(${rotacaoAcumulada}deg)`;
        
        // Reinicia o timer para o próximo ciclo de inatividade
        resetInactivityTimer();
      };

      // Inicia ou reinicia o temporizador de inatividade
      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(girarAutomatico, TEMPO_INATIVIDADE);
      };

      // Função ao clicar (Giro de 180 graus manual)
      const girarMoeda = () => {
        rotacaoAcumulada += 180; // Soma 180 graus normalmente
        cardInner.style.transform = `rotateY(${rotacaoAcumulada}deg)`;
        
        // Se o usuário interagiu, reseta o tempo de inatividade
        resetInactivityTimer();
      };

      profileCard.addEventListener('click', girarMoeda);

      // Inicia o cronômetro assim que a página carregar por completo
      window.addEventListener('load', () => {
        resetInactivityTimer();
      });
    }

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

  // =================================================================
  // PROJECTS CAROUSEL (Infinite Loop & Tab Visibility - NO DRAG)
  // =================================================================
  const projectsTrack = document.getElementById('projects-track');
  const carouselDots = document.getElementById('carousel-dots');

  if (projectsTrack && carouselDots) {
    const allCards = Array.from(projectsTrack.children);
    const cardsPerPage = 1;
    const originalPagesData = [];

    for (let i = 0; i < allCards.length; i += cardsPerPage) {
      originalPagesData.push(allCards.slice(i, i + cardsPerPage));
    }

    projectsTrack.innerHTML = '';
    carouselDots.innerHTML = '';

    const pageElements = originalPagesData.map((pageCards) => {
      const page = document.createElement('div');
      page.classList.add('projects-page');
      pageCards.forEach(card => page.appendChild(card));
      return page;
    });

    const totalOriginalPages = pageElements.length;

    const firstClone = pageElements[0].cloneNode(true);
    const lastClone = pageElements[totalOriginalPages - 1].cloneNode(true);

    projectsTrack.appendChild(lastClone);
    pageElements.forEach(page => projectsTrack.appendChild(page));
    projectsTrack.appendChild(firstClone);

    for (let i = 0; i < totalOriginalPages; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToPage(i + 1));
      carouselDots.appendChild(dot);
    }

    let currentIndex = 1;
    let autoplayInterval = null;
    let isHoveringCard = false;

    projectsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    function goToPage(targetIndex, animated = true) {
      if (!animated) {
        projectsTrack.style.transition = 'none';
      } else {
        projectsTrack.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      }

      currentIndex = targetIndex;
      projectsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

      let activeDotIndex = currentIndex - 1;
      if (currentIndex === 0) activeDotIndex = totalOriginalPages - 1;
      if (currentIndex === totalOriginalPages + 1) activeDotIndex = 0;

      const dots = document.querySelectorAll('#carousel-dots .dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeDotIndex);
      });
    }

    projectsTrack.addEventListener('transitionend', () => {
      if (currentIndex === 0) goToPage(totalOriginalPages, false);
      if (currentIndex === totalOriginalPages + 1) goToPage(1, false);
    });

    function startAutoplay() {
      stopAutoplay();
      if (totalOriginalPages <= 1) return;
      autoplayInterval = setInterval(() => {
        if (!isHoveringCard && document.visibilityState === 'visible') {
          goToPage(currentIndex + 1);
        }
      }, 8000);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    // Remove qualquer cursor de "mãozinha de arrastar" para não confundir o usuário
    projectsTrack.style.cursor = 'default';

    function setupVideoListeners() {
      document.querySelectorAll('.project-card').forEach(card => {
        const video = card.querySelector('.project-video');
        if (video) video.loop = true;

        card.addEventListener('mouseenter', () => {
          isHoveringCard = true;
          if (video) {
            video.play().catch(() => { });
          }
        });

        card.addEventListener('mouseleave', () => {
          isHoveringCard = false;
          if (video) {
            video.pause();
          }
        });
      });
    }

    setupVideoListeners();
    startAutoplay();
  }

// =========================================
  // BACK-TO-TOP BUTTON VISIBILITY (Apenas Desktop)
  // =========================================
  const backToTopButton = document.getElementById('back-to-top');
  const contactSection = document.getElementById('contact');

  if (backToTopButton && contactSection && window.innerWidth > 768) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    contactObserver.observe(contactSection);
  }
});

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