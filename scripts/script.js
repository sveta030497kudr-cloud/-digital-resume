document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // 1. Theme Toggle (Темная/Светлая тема)
  // =========================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  // =========================================
  // 2. Language Toggle (RU / EN)
  // =========================================
  const langToggle = document.getElementById('langToggle');
  const langActive = langToggle.querySelector('.lang-active');
  const langInactive = langToggle.querySelector('.lang-inactive');
  const savedLang = localStorage.getItem('lang') || 'ru';

  setLanguage(savedLang);

  langToggle.addEventListener('click', () => {
    const currentLang = langActive.textContent.toLowerCase();
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
    localStorage.setItem('lang', newLang);
  });

  function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-ru][data-en]');
    elements.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Обновляем кнопку языка
    if (lang === 'ru') {
      langActive.textContent = 'RU';
      langInactive.textContent = 'EN';
    } else {
      langActive.textContent = 'EN';
      langInactive.textContent = 'RU';
    }
    
    // Меняем активный класс для стилизации
    langActive.classList.add('lang-active');
    langInactive.classList.remove('lang-active');
    langInactive.classList.add('lang-inactive');
  }

  // =========================================
  // 3. Burger Menu (Бургер-меню)
  // =========================================
  const burgerMenu = document.getElementById('burgerMenu');
  const burgerDropdown = document.getElementById('burgerDropdown');
  const burgerLinks = document.querySelectorAll('.burger-nav-item');

  // Создаем оверлей для закрытия меню при клике вне его
  const overlay = document.createElement('div');
  overlay.classList.add('menu-overlay');
  document.body.appendChild(overlay);

  function toggleMenu() {
    burgerMenu.classList.toggle('active');
    burgerDropdown.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = burgerDropdown.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    burgerMenu.classList.remove('active');
    burgerDropdown.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  burgerMenu.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Закрываем меню при клике на ссылку
  burgerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // =========================================
  // 4. Accordion (Аккордеон опыта работы)
  // =========================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const body = header.nextElementSibling;

      // Закрываем все остальные (опционально, если нужно только одно открытое)
      // accordionHeaders.forEach(h => {
      //   h.setAttribute('aria-expanded', 'false');
      //   h.nextElementSibling.classList.remove('open');
      // });

      header.setAttribute('aria-expanded', !isExpanded);
      body.classList.toggle('open');
    });
  });

  // =========================================
  // 5. Scroll Animations (Анимации при скролле)
  // =========================================
  const fadeElements = document.querySelectorAll('.fade-section');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Анимация проигрывается только один раз
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // =========================================
  // 6. Custom Scrollbar (Кастомный скроллбар)
  // =========================================
  const scrollThumb = document.getElementById('scrollThumb');
  const customScroll = document.getElementById('customScroll');

  if (scrollThumb && customScroll) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      const trackHeight = 200; // Высота трека из CSS
      const thumbHeight = 40;  // Высота ползунка из CSS
      const maxTop = trackHeight - thumbHeight;
      
      scrollThumb.style.top = `${scrollPercent * maxTop}px`;
    });
  }

  // =========================================
  // 7. Smooth Scroll for Anchor Links
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
