// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Загрузка сохраненной темы
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
    if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// ===== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА =====
const langToggle = document.getElementById('langToggle');
const langActive = langToggle.querySelector('.lang-active');
const langInactive = langToggle.querySelector('.lang-inactive');

let currentLang = localStorage.getItem('lang') || 'ru';
updateLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    updateLanguage(currentLang);
});

function updateLanguage(lang) {
    if (lang === 'en') {
        langActive.textContent = 'EN';
        langInactive.textContent = 'RU';
    } else {
        langActive.textContent = 'RU';
        langInactive.textContent = 'EN';
    }
    
    // Обновление всех элементов с data-ru и data-en
    document.querySelectorAll('[data-ru][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}

// ===== АНИМАЦИИ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

// ===== АККОРДЕОН ОПЫТА РАБОТЫ =====
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const body = header.nextElementSibling;
        
        // Закрыть все другие
        document.querySelectorAll('.accordion-header').forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.setAttribute('aria-expanded', 'false');
                otherHeader.nextElementSibling.classList.remove('open');
            }
        });
        
        // Переключить текущий
        header.setAttribute('aria-expanded', !isExpanded);
        body.classList.toggle('open');
    });
});

// ===== НАВИГАЦИОННЫЕ ТОЧКИ =====
const sections = document.querySelectorAll('section[id]');
const navDots = document.getElementById('navDots');

// Создание точек
sections.forEach((section, index) => {
    const dot = document.createElement('div');
    dot.className = 'nav-dot';
    dot.dataset.index = index;
    dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth' });
    });
    navDots.appendChild(dot);
});

// Обновление активной точки при скролле
const navDotsElements = document.querySelectorAll('.nav-dot');

window.addEventListener('scroll', () => {
    let current = 0;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 300) {
            current = index;
        }
    });
    
    navDotsElements.forEach(dot => dot.classList.remove('active'));
    if (navDotsElements[current]) {
        navDotsElements[current].classList.add('active');
    }
});

// ===== КАСТОМНЫЙ СКРОЛЛБАР =====
const customScroll = document.getElementById('customScroll');
const scrollThumb = document.getElementById('scrollThumb');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    const thumbHeight = Math.max(40, (window.innerHeight / docHeight) * 200);
    const thumbTop = scrollPercent * (200 - thumbHeight);
    
    scrollThumb.style.height = thumbHeight + 'px';
    scrollThumb.style.top = thumbTop + 'px';
    
    // Показать/скрыть скроллбар
    if (scrollTop > 100) {
        customScroll.classList.add('visible');
    } else {
        customScroll.classList.remove('visible');
    }
});

// ===== COOKIE BANNER =====
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDetails = document.getElementById('cookieDetails');

// Показать баннер, если не принимали
if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 2000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('show');
});

cookieDetails.addEventListener('click', () => {
    alert('Мы используем только localStorage для хранения ваших предпочтений темы. Данные не передаются на сервер.');
});

// ===== БУРГЕР-МЕНЮ (для мобильных) =====
const burgerMenu = document.getElementById('burgerMenu');
let menuOpen = false;

burgerMenu.addEventListener('click', () => {
    menuOpen = !menuOpen;
    const lines = burgerMenu.querySelectorAll('.burger-line');
    
    if (menuOpen) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
});

// ===== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРЕЙ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ОБНОВЛЕНИЕ ЛЕТ ОПЫТА =====
function updateExperienceYears() {
    const startDate = new Date('2023-09-01'); // Сентябрь 2023
    const today = new Date();
    const years = today.getFullYear() - startDate.getFullYear();
    const months = today.getMonth() - startDate.getMonth();
    
    let experienceYears = years;
    if (months < 0 || (months === 0 && today.getDate() < startDate.getDate())) {
        experienceYears--;
    }
    
    const experienceElements = [
        document.getElementById('experienceYears'),
        document.getElementById('aboutExperienceYears'),
        document.getElementById('statExperience'),
        document.getElementById('footerExperience')
    ];
    
    experienceElements.forEach(el => {
        if (el) {
            el.textContent = experienceYears + '+';
        }
    });
}

updateExperienceYears();

// ===== ПАРАЛЛАКС ЭФФЕКТ ДЛЯ BLOBS =====
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    
    const blobs = document.querySelectorAll('.glass-blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        blob.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== КОНСОЛЬНОЕ СООБЩЕНИЕ =====
console.log('%c🚀 Светлана Кулакова - QA Engineer', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cСайт создан с ❤️ для демонстрации навыков', 'font-size: 14px; color: #10b981;');
