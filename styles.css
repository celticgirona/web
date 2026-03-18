// Menu Responsiu
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Tancar menú quan es fa clic en un link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// Filtres de premsa
function filterArticles(category, event) {
    const articles = document.querySelectorAll('.article-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Actualitzar botons actius
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Mostrar/amagar articles
    articles.forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
            article.classList.remove('hidden');
            article.style.animation = 'slideUp 0.6s ease';
        } else {
            article.classList.add('hidden');
        }
    });
}

// Navegació smoot amb scroll
function navigateTo(section) {
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Crear partícules animades al hero - DESACTIVAT
function createParticles() {
    // Funció desactivada - El logo de fons palpita en lloc de les partícules
}

createParticles();

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar tots els cards
document.querySelectorAll('.card, .article-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Form submitir
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio de formulari
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Missatge enviat!';
        submitBtn.style.background = 'var(--primary)';
        submitBtn.style.color = 'var(--white)';
        submitBtn.disabled = true;
        
        // Reset formulari
        contactForm.reset();
        
        // Restaurar botó després de 3 segons
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// Efecte parallax sutil
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animar números al hover
function animateNumber(element, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Smooth scroll per a navegació

// PDF.js viewer controls
let pdfDoc = null;
let pageNum = 1;
const pageIndicator = document.getElementById('pageIndicator');
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// configure worker through CDN
if (typeof pdfjsLib !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';
} else {
    console.warn('pdfjsLib not loaded, PDF viewer may not work');
}

function renderPage(num) {
    if (!pdfDoc) return;
    pdfDoc.getPage(num).then(page => {
        // scale to fit container width
        const unscaledViewport = page.getViewport({ scale: 1 });
        const containerWidth = canvas.parentElement.clientWidth;
        const scale = containerWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: ctx, viewport: viewport });
        if (pageIndicator) pageIndicator.textContent = num;
    });
}

function loadPdf(url) {
    pdfjsLib.getDocument(url).promise.then(doc => {
        pdfDoc = doc;
        renderPage(pageNum);
    }).catch(err => {
        console.error('Error loading PDF:', err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (pageNum <= 1) return;
        pageNum--;
        renderPage(pageNum);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (pdfDoc && pageNum >= pdfDoc.numPages) return;
        pageNum++;
        renderPage(pageNum);
    });
    // start loading PDF (updated filename)
    loadPdf('docs/futbol-gaelic.pdf');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Destacar secció activa en el menú
const sections = document.querySelectorAll('section[id]');
const navElements = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// Efecte de hover en els icones socials
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'spin 0.6s ease';
    });
});

// Easter egg: premi de la tecla secret
let secretCode = [];
const secretSequence = ['c', 'e', 'l', 't', 'i', 'c'];

document.addEventListener('keypress', (e) => {
    secretCode.push(e.key.toLowerCase());
    secretCode = secretCode.slice(-6);
    
    if (secretCode.join('') === secretSequence.join('')) {
        celebrateSuccess();
        secretCode = [];
    }
});

function celebrateSuccess() {
    // Crear confetti
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -10px;
            width: 10px;
            height: 10px;
            background: var(--primary);
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
            animation: fall ${2 + Math.random() * 1}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
    
    // Afegir estil per a l'animació
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('🍀 ¡Booom! Has escrit CELTIC! 🍀');
}

// Animació de càrrega
window.addEventListener('load', () => {
    document.querySelectorAll('.card, .article-card').forEach((el, index) => {
        el.style.animationDelay = (index * 0.1) + 's';
    });
});

console.log('%c🍀 Benvingut al Celtic Girona! 🍀', 'color: #22c55e; font-size: 20px; font-weight: bold;');
console.log('%cPista: Prova a escriure "celtic" a la pàgina...', 'color: #16a34a; font-size: 14px;');
