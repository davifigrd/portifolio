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

  // =========================================
  // EFEITO DE ENVIO PREMIUM (VALIDAÇÃO AVANÇADA E FILTRO AUTOMÁTICO)
  // =========================================
  const contactForm = document.querySelector('.contact-form');
  const submitBtn = contactForm ? contactForm.querySelector('button') : null;

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // 1. Identifica o idioma usando a variável global do seu código
      const isEn = (lang === 'en');

      // LISTA AUTOMÁTICA DE MODERAÇÃO
      const blackList = [
        "viado", "puta", "caralho", "porra", "merda", "chupa", "buceta", "pica", "caral", "fdp", "vtnm",
        "arrombado", "cu", "cuzao", "pnc", "cacete", "bosta", "vadia", "vagabundo", "bicha", "macaco",
        "filho da puta", "imbecil", "idiota", "otario", "pinto", "xereca", "penis", "vagina", "orgia", "sexo",
        "fuck", "shit", "bitch", "asshole", "cunt", "dick", "pussy", "faggot", "nigger", "bastard",
        "slut", "whore", "cock", "prick", "wanker", "motherfucker", "sex", "porn", "naked"
      ];

      // Dicionário de traduções internas para os estados do botão
      const text = {
        sending: isEn ? `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...` : `<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...`,
        success: isEn ? `<i class="fa-solid fa-circle-check"></i> Message Sent!` : `<i class="fa-solid fa-circle-check"></i> Mensagem Enviada!`,
        errEmpty: isEn ? `<i class="fa-solid fa-circle-xmark"></i> Fill all fields!` : `<i class="fa-solid fa-circle-xmark"></i> Preencha os campos!`,
        errEmail: isEn ? `<i class="fa-solid fa-circle-xmark"></i> Invalid Email!` : `<i class="fa-solid fa-circle-xmark"></i> E-mail Inválido!`,
        errBanned: isEn ? `<i class="fa-solid fa-hand"></i> Forbidden Content!` : `<i class="fa-solid fa-hand"></i> Conteúdo Proibido!`
      };

      // Seleção dos campos do formulário
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');

      let mensagemErro = "";

      // --- FUNÇÕES AUXILIARES INTERNAS ---
      const contemTermoProibido = (texto) => {
        if (!texto) return false;
        const textoMinusculo = texto.toLowerCase();
        return blackList.some(termo => textoMinusculo.includes(termo));
      };

      const emailValido = (email) => {
        // O .trim() remove espaços antes/depois e o regex proíbe espaços no meio
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return regex.test(email.toLowerCase().trim());
      };

      // --- ETAPAS DE VALIDAÇÃO REAL ---
      if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
        mensagemErro = text.errEmpty;
      }
      else if (emailInput && !emailValido(emailInput.value)) {
        mensagemErro = text.errEmail;
      }
      else if (contemTermoProibido(nameInput?.value) || contemTermoProibido(messageInput?.value)) {
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
    }); // <-- Fecha o addEventListener corretamente
  } // <-- Fecha o IF inicial de segurança corretamente e isola o código abaixo!
  // =========================================
  // EXIBIÇÃO INTELIGENTE DO BOTÃO VOLTAR AO TOPO (FIXED)
  // =========================================
  const backToTopButton = document.getElementById('back-to-top');
  const contactSection = document.getElementById('contact');

  if (backToTopButton && contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Quando a seção de contato entrar 10% no ecrã, mostra a seta fixed
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
// CONTROLE INTELIGENTE DO HEADER (UP/DOWN + DELAY ROXO)
// =========================================
const header = document.querySelector('header');
const heroSection = document.getElementById('hero');

let lastScrollY = window.scrollY;
let borderTimeout = null;

if (header && heroSection) {
  window.addEventListener('scroll', () => {
    const heroHeight = heroSection.offsetHeight;
    const currentScrollY = window.scrollY;

    // Verifica se o usuário já passou da seção Hero
    const pastHero = currentScrollY > heroHeight * 0.8;
    // Detecta a direção do scroll: true se rolou para cima, false se rolar para baixo
    const scrollingUp = currentScrollY < lastScrollY;

    if (pastHero && (scrollingUp || currentScrollY <= 0)) {
      // Se passou do hero E está rolando para cima (ou no topo extremo): MOSTRA
      if (!header.classList.contains('visible')) {
        header.classList.add('visible');

        // Limpa timers anteriores para evitar bugs de rolagem rápida
        clearTimeout(borderTimeout);

        // Dispara o destaque da borda roxa exatamente após 0.5 segundos (500ms)
        borderTimeout = setTimeout(() => {
          header.classList.add('scrolled');
        }, 500);
      }
    } else {
      // Se rolar para baixo OU ainda estiver dentro do Hero: ESCONDE
      header.classList.remove('visible');

      // Quando ele some, remove instantaneamente a borda roxa para resetar o efeito
      header.classList.remove('scrolled');
      clearTimeout(borderTimeout);
    }

    // Atualiza a última posição do scroll para a próxima verificação
    lastScrollY = currentScrollY;
  });
}
// =========================================
// GERENCIADOR DE INTRODUÇÃO (EFEITO PORTA PREMIUM)
// =========================================
window.addEventListener('load', () => {
  const introScreen = document.getElementById('intro-screen');
  const hasVisited = localStorage.getItem('davi_portfolio_visited');

  // Função auxiliar para procurar e disparar a tua digitação original
  const dispararTyping = () => {
    if (typeof typeEffect === 'function') {
      typeEffect();
    }
  };

  // ==================================================
  // GERENCIADOR DE INTRODUÇÃO & AVISO DE SCROLL AUTOMÁTICO
  // ==================================================
  if (introScreen) {
    document.body.classList.add('loaded');

    // 1. Mantém a tela totalmente fechada por 6 segundos para a pulsação lenta agir
    setTimeout(() => {
      // Inicia a abertura física e o fade-out contínuo da cortina
      introScreen.classList.add('fade-out');

      // 2. Aos 85% de abertura (700ms), o Hero surge suavemente no fundo
      setTimeout(() => {
        document.body.classList.add('start-animations');
        dispararTyping();
      }, 700);

      // 3. Cortina some totalmente. Ativa o scroll invisível e inicia o timer do aviso
      setTimeout(() => {
        document.body.classList.add('scrollbar-visible');
        introScreen.remove();

        // Ativa a lógica do aviso inteligente de Scroll
        ativarAvisoScroll();
      }, 1300);

    }, 6000);
  } else {
    document.body.classList.add('loaded');
    document.body.classList.add('start-animations');
    document.body.classList.add('scrollbar-visible');
    dispararTyping();
    ativarAvisoScroll();
  }

  // FUNÇÃO PARA CRIAR E GERENCIAR O AVISO DE SCROLL DINÂMICO
  function ativarAvisoScroll() {
    // Busca o idioma ativo direto do localStorage ou assume 'pt' como padrão
    const obterTexto = () => {
      const idiomaSalvo = localStorage.getItem('davi_portfolio_lang') || 'pt';
      return idiomaSalvo === 'en' ? 'Scroll' : 'Role para baixo';
    };

    // Cria o elemento da setinha no HTML dinamicamente
    const hint = document.createElement('div');
    hint.className = 'scroll-hint';
    hint.innerHTML = `
      <span id="scroll-hint-text">${obterTexto()}</span>
      <svg viewBox="0 0 24 24">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    `;
    document.body.appendChild(hint);

    // Se o usuário clicar no botão de trocar idioma enquanto o aviso estiver ativo, atualiza o texto na hora!
    const atualizarTextoIdioma = () => {
      const txtEl = document.getElementById('scroll-hint-text');
      if (txtEl) txtEl.textContent = obterTexto();
    };

    const langBtn = document.getElementById('btn-lang') || document.querySelector('.lang-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        setTimeout(atualizarTextoIdioma, 50);
      });
    }

    // Se o usuário ficar 5 segundos sem rolar a página, mostra a mensagem
    let timerHint = setTimeout(() => {
      hint.classList.add('show');
    }, 5000);

    // Função para sumir com o aviso para sempre assim que o usuário rolar a tela
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

  // =================================================================
  // CONTROLE DE ROTAÇÃO DA MOEDA (SEMPRE DA ESQUERDA PARA A DIREITA)
  // =================================================================
  const profileCard = document.querySelector('.profile-card');
  const cardInner = document.querySelector('.profile-card-inner');

  if (profileCard && cardInner) {
    // Agora totalmente corrigido sem aspas e iniciando em 360 por causa da intro
    let rotacaoAcumulada = 360;

    const girarMoeda = () => {
      rotacaoAcumulada += 180;
      cardInner.style.transform = `rotateY(${rotacaoAcumulada}deg)`;
    };

    // Aplica o giro infinito ao clicar na moeda
    profileCard.addEventListener('click', girarMoeda);

  }

}); // <--- CHAVE DE FECHAMENTO GLOBAL DO DOMCONTENTLOADED GARANTIDA E CORRETA