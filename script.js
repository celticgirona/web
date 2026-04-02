// Menu Responsiu - UN ÚNIC LISTENER GLOBAL
document.addEventListener('click', function(e) {
    const navList = document.getElementById('navList');
    
    // 1. Si clickejas el hamburger, toggle menú
    if (e.target.closest('.hamburger')) {
        e.preventDefault();
        e.stopPropagation();
        navList.classList.toggle('active');
        return;
    }
    
    // 2. Si clickejas un link #, navegar
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const section_id = href.slice(1);
            
            console.log('📍 Click en link:', href);
            
            const element = document.getElementById(section_id);
            if (element) {
                console.log('✅ Navegant a:', section_id);
                element.scrollIntoView({ behavior: 'smooth' });
                // Tancar menú
                if (navList) {
                    navList.classList.remove('active');
                }
            } else {
                console.error('❌ Secció no trobada:', section_id);
            }
        }
        return;
    }
    
    // 3. Si clickejas fora del menú, tancar-lo
    if (navList && !e.target.closest('nav') && navList.classList.contains('active')) {
        navList.classList.remove('active');
    }
}, false);


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
    console.log('🔍 navigateTo() - Buscant secció:', section);
    
    const element = document.getElementById(section);
    if (element) {
        console.log('✅ Secció trobada! Scrollant...');
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error('❌ SECCIÓ NO TROBADA:', section);
        console.log('IDs disponibles al document:',Array.from(document.querySelectorAll('[id]')).map(el => el.id));
    }
    return false;
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

const i18nData = {
    ca: {
        'nav.inici': 'Inici',
        'nav.quiSom': 'Qui Som',
        'nav.premsa': 'Premsa & TV',
        'nav.botiga': 'Botiga',
        'nav.patrocinadors': 'Col·laboradors',
        'nav.juguem': 'Juguem',
        'nav.enllacos': 'Enllaços',
        'nav.contacte': 'Contacte',
        'lang.label': 'Idioma:',
        'quiSom.title': 'Benvingut/a',
        'quiSom.card1.title': 'Cèltic Girona',
        'quiSom.card1.text': 'El Cèltic Girona és el primer club de futbol gaèlic de la província de Girona i el tercer de Catalunya. El club reuneix jugadors i jugadores de diverses comarques, especialment estudiants de la Universitat de Girona, interessats a descobrir un esport diferent. Més que un simple equip, el Cèltic Girona vol ser un punt de trobada per a persones apassionades per l’esport i pel bon ambient. L’objectiu del club és créixer i competir contra equips en tornejos nacionals i internacionals de futbol gaèlic organitzats per Gaelic Games Europe.',
        'quiSom.card1.trainingTitle': 'Entrenaments',
        'quiSom.card1.trainingText': 'Els entrenaments es fan cada dilluns de 19:00 a 20:30, en sessions mixtes que es duen a terme alternativament a les instal·lacions del Servei d’Esports de la Universitat de Girona i del Club Esportiu Pontenc.',
        'quiSom.card1.callToAction': 'Si vols venir a provar-ho, no dubtis a contactar amb nosaltres! ☘️♥️',
        'quiSom.card2.title': 'Futbol Gaèlic',
        'quiSom.card2.text': 'El futbol gaèlic és un esport d’equip originari d’Irlanda que combina elements del futbol i del rugbi. Es juga amb una pilota rodona que es pot xutar, portar amb les mans i passar als companys. Cada equip intenta marcar punts xutant la pilota entre els pals de la porteria de rugbi o per sobre del travesser. És l\'esport nacional d’Irlanda i la seva versió moderna es va codificar al 1887 amb la fundació de la Gaelic Athletic Association (GAA). Aquesta organització va establir regles clares i va promoure el joc com a símbol de la cultura irlandesa.',
        'quiSom.card2.stats': '50.000 persones a la final femenina All-Ireland del 2017 a Dublín.',
        'quiSom.card3.title': 'Comunitat i Valors',
        'quiSom.card3.text': 'Al Cèltic Girona creiem en l’esport com una manera de crear comunitat i connectar persones de diferents llocs i cultures. Promovem valors com el respecte, el treball en equip i el bon ambient dins i fora del camp. Volem ser un espai obert on tothom se senti benvingut, tingui o no experiència prèvia amb el futbol gaèlic. Junts fem créixer aquest esport a Girona i a tot Catalunya.',
        'quiSom.card3.valuesTitle': 'Valors del Futbol Gaèlic',
        'premsa.title': 'Premsa, Radio i Televisió',
        'premsa.readArticle': 'Llegir article',
        'premsa.watchVideo': 'Veure video',
        'botiga.title': 'Botiga Online',
        'botiga.subtitle': 'Accedeix a la botiga oficial del Cèltic Girona',
        'botiga.enter': 'Entra a la botiga',
        'patrocinadors.title': 'Col·laboradors i patrocinadors',
        'patrocinadors.groupCollabs': 'Col·laboradors',
        'patrocinadors.groupSponsors': 'Patrocinadors',
        'patrocinadors.groupNewPartners': 'Nous Socis i Col·laboradors',
        'patrocinadors.udg.title': 'Servei d\'Esports de la Universitat de Girona',
        'patrocinadors.udg.text': 'El Servei d’Esports de la Universitat de Girona promou la pràctica esportiva al campus i, des de 2023, ofereix sessions d’introducció al futbol gaèlic i entrenaments bisetmanals. En les sessions podràs conèixer les regles bàsiques i practicar-ne les tècniques fonamentals d’una manera activa, accessible i divertida. Per cada sessió que fas sumes 4 punts per convertir amb 1 ECTS (40 punts).',
        'patrocinadors.udg.link': 'Inscriu-te a l\'activitat',
        'patrocinadors.mckiernans.title': 'McKiernans',
        'patrocinadors.mckiernans.text': 'McKiernans és un pub irlandès a Girona on trobaràs ambient gaèlic, menjar tradicional i cervesa acompanyats de música en directe. És el punt de reunió ideal per a fans del futbol gaèlic que volen veure grans partits. A més, McKiernans és el nostre patrocinador oficial de les samarretes.',
        'patrocinadors.mckiernans.link': 'Instagram McKiernans',
        'patrocinadors.mckeevers.title': 'McKeevers',
        'patrocinadors.mckeevers.text': 'McKeevers és la botiga d\'esports que dissenya i comercialitza les equipacions del Cèltic Girona. Té els drets oficials per utilitzar el logo de la GAA, fabrica les equipacions a Irlanda i les samarretes estan fetes amb materials 100% reciclats, combinant qualitat i sostenibilitat.',
        'patrocinadors.mckeevers.link': 'Web McKeevers',
        'patrocinadors.joinProject.title': 'Uneix-te al projecte esportiu',
        'patrocinadors.joinProject.text1': 'Fes-te soci del Cèltic Girona i forma part activa del creixement del club. Com a soci o sòcia, podràs participar a l’Assemblea General Anual i contribuir directament a ajudar l’equip a cobrir les despeses relacionades amb l’activitat.',
        'patrocinadors.joinProject.text2': 'Si representes una empresa o un col·lectiu i vols formar part d’aquest projecte esportiu, contacta’ns per descobrir com podem col·laborar junts. Oferim diferents opcions de col·laboració i ens podem adaptar a totes les necessitats per crear aliances que s’ajustin perfectament a la teva realitat.',
        'patrocinadors.joinProject.link': 'Envia\'ns un correu',
        'trivial.title': 'Aprèn jugant al nostre trivial!',
        'trivial.playerPlaceholder': 'Nom',
        'trivial.startButton': 'Començar el joc',
        'trivial.nextButton': 'Següent',
        'trivial.restartButton': 'Tornar a jugar',
        'trivial.table.player': 'Jugador',
        'trivial.table.score': 'Punts',
        'trivial.table.time': 'Temps (s)',
        'trivial.finished': 'Quiz acabat!',
        'trivial.scoreTemplate': '{player} ha fet {score}/10 punts',
        'enllacos.title': 'Enllaços d\'Interès',
        'premsa.readArticle': 'Llegir article',
        'premsa.watchVideo': 'Veure video',
        'quiSom.rules.title': 'Normes Bàsiques',
        'quiSom.rules.line1': '1. Cada equip juga amb 9, 11, 13 o 15 jugadors, depenent de la competició i les dimensions del camp. A Irlanda sempre son equips de 15.',
        'quiSom.rules.line2': '2. La pilota es pot jugar amb les mans i amb els peus, però no es pot llançar: s’ha de passar amb un cop de canell o xutar-la.',
        'quiSom.rules.line3': '3. No es poden fer més de 4 passes seguits amb la pilota a les mans; després cal botar-la o fer un “solo” (deixar-la caure al peu i tornar-la a agafar).',
        'quiSom.rules.line4': '4. No es pot agafar la pilota directament del terra amb les mans; s’ha de recollir amb el peu.',
        'quiSom.rules.line5': '5. S’aconsegueix 1 punt quan la pilota passa per sobre del travesser, 2 punts si hi passa des de més de 40 metres, i 3 punts si entra a la porteria per sota del travesser.',
        'quiSom.rules.line6': '6. El contacte físic és limitat: es pot disputar la pilota cos a cos, però no es permeten entrades dures, empentes perilloses o placatges.',
        'quiSom.rules.line7': '7. No hi ha fora de joc, així que els jugadors es poden moure lliurement per tot el camp.',
        'quiSom.rules.fullRules': 'Regles Completes',
        'quiSom.rules.downloadText': 'Pots descarregar el document oficial amb totes les regles del futbol gaèlic femení (2022) en català aquí:',
        'quiSom.values.point1': '• És un esport amateur basat en la passió i el compromís. Els jugadors/es no cobren.',
        'quiSom.values.point2': '• Es fomenta el joc net i el respecte entre equips i aficions.',
        'quiSom.values.point3': '• Les aficions es barregen als estadis, sense rivalitats violentes.',
        'quiSom.values.point4': '• Els jugadors/es no porten el nom a la samarreta, prioritzant l’equip per sobre de l’individu.',
        'quiSom.values.point5': '• És un esport col·lectiu on el treball en equip és essencial.',
        'quiSom.values.point6': '• Promou la inclusió i la participació de tothom.',
        'quiSom.values.point7': '• Forta vinculació amb la comunitat local i les arrels culturals.',
        'botiga.productGreen': 'Samarreta Verda',
        'botiga.productRed': 'Samarreta Vermella',
        'botiga.productHoodie': 'Dessuadora',
        'contact.title': 'Contacte',
        'contact.infoTitle': 'Informació de Contacte',
        'contact.locationLabel': 'Ubicació',
        'contact.locationValue': 'Girona, Catalunya',
        'contact.emailLabel': 'Email',
        'contact.emailValue': 'communications.celticgirona.europe@gaa.ie',
        'footer.copyright': '© 2026 Cèltic Girona | Gaèlic Futbol Club',
        'footer.rights': 'Tots els drets reservats',
        'footer.tagline': '🍀 Passió pel futbol gaèlic a Girona ❤️'
    },
    en: {
        'nav.inici': 'Home',
        'nav.quiSom': 'About',
        'nav.premsa': 'Press & TV',
        'nav.botiga': 'Shop',
        'nav.patrocinadors': 'Partners',
        'nav.juguem': 'Quiz',
        'nav.enllacos': 'Links',
        'nav.contacte': 'Contact',
        'lang.label': 'Language:',
        'quiSom.title': 'Welcome',
        'premsa.readArticle': 'Read article',
        'premsa.watchVideo': 'Watch video',
        'botiga.title': 'Online Shop',
        'botiga.subtitle': 'Access the official Celtic Girona store',
        'botiga.enter': 'Enter shop',
        'patrocinadors.title': 'Supporters and sponsors',
        'patrocinadors.groupCollabs': 'Collaborators',
        'patrocinadors.groupSponsors': 'Sponsors',
        'patrocinadors.groupNewPartners': 'New Members and Partners',
        'patrocinadors.udg.title': 'University of Girona Sports Service',
        'patrocinadors.udg.text': 'The University of Girona Sports Service promotes sports practice on campus and, since 2023, offers introductory Gaelic football sessions and twice-weekly training sessions. In the sessions you can learn the basic rules and practice the fundamental techniques in an active, accessible and fun way. For each session you do you add 4 points to convert into 1 ECTS (40 points).',
        'patrocinadors.udg.link': 'Sign up for the activity',
        'patrocinadors.mckiernans.title': 'McKiernans',
        'patrocinadors.mckiernans.text': 'McKiernans is an Irish pub in Girona where you will find a Gaelic atmosphere, traditional food and beer accompanied by live music. It is the ideal meeting point for Gaelic football fans who want to watch big matches. Also, McKiernans is our official shirt sponsor.',
        'patrocinadors.mckiernans.link': 'Instagram McKiernans',
        'patrocinadors.mckeevers.title': 'McKeevers',
        'patrocinadors.mckeevers.text': 'McKeevers is the sports store that designs and markets the Celtic Girona kits. It has the official rights to use the GAA logo, manufactures the kits in Ireland and the shirts are made with 100% recycled materials, combining quality and sustainability.',
        'patrocinadors.mckeevers.link': 'McKeevers Website',
        'patrocinadors.joinProject.title': 'Join the sports project',
        'patrocinadors.joinProject.text1': 'Become a member of Celtic Girona and be an active part of the club\'s growth. As a member, you can participate in the Annual General Assembly and contribute directly to helping the team cover activity-related expenses.',
        'patrocinadors.joinProject.text2': 'If you represent a company or group and want to be part of this sports project, contact us to find out how we can collaborate together. We offer different collaboration options and can adapt to all needs to create alliances that perfectly suit your reality.',
        'patrocinadors.joinProject.link': 'Send us an email',
        'trivial.title': 'Learn playing our quiz and some Catalan',
        'trivial.playerPlaceholder': 'Name',
        'trivial.startButton': 'Start game',
        'trivial.nextButton': 'Next',
        'trivial.restartButton': 'Play again',
        'trivial.table.player': 'Player',
        'trivial.table.score': 'Score',
        'trivial.table.time': 'Time (s)',
        'trivial.finished': 'Quiz finished!',
        'trivial.scoreTemplate': '{player} scored {score}/10 points',
        'enllacos.title': 'Links of Interest',
        'premsa.title': 'Press, Radio and Television',
        'quiSom.rules.title': 'Basic Rules',
        'quiSom.rules.line1': '1. Each team plays with 9, 11, 13 or 15 players, depending on the competition and field size. In Ireland teams always have 15.',
        'quiSom.rules.line2': '2. The ball can be played with hands and feet, but it cannot be thrown: it must be passed with a wrist strike or kicked.',
        'quiSom.rules.line3': '3. You cannot take more than 4 consecutive steps with the ball in your hands; then you must bounce it or do a "solo" (drop it at your foot and pick it up again).',
        'quiSom.rules.line4': '4. You cannot pick the ball up directly from the ground with your hands; you must pick it up with your foot.',
        'quiSom.rules.line5': '5. You score 1 point when the ball goes over the crossbar, 2 points if it goes over from more than 40 meters, and 3 points if it enters the goal under the crossbar.',
        'quiSom.rules.line6': '6. Physical contact is limited: the ball can be contested body-to-body, but hard tackles, dangerous pushes or blocks are not allowed.',
        'quiSom.rules.line7': '7. There is no offside, so players can move freely across the field.',
        'quiSom.rules.fullRules': 'Full Rules',
        'quiSom.rules.downloadText': 'You can download the official document with all the rules of women\'s Gaelic football (2022) in Catalan here:',
        'quiSom.values.point1': '• It is an amateur sport based on passion and commitment. Players do not get paid.',
        'quiSom.values.point2': '• Fair play and respect between teams and supporters are encouraged.',
        'quiSom.values.point3': '• Fans mix in stands, without violent rivalries.',
        'quiSom.values.point4': '• Players do not wear names on shirts, prioritizing the team over the individual.',
        'quiSom.values.point5': '• It is a team sport where teamwork is essential.',
        'quiSom.values.point6': '• It promotes inclusion and participation for everyone.',
        'quiSom.values.point7': '• Strong connection with the local community and cultural roots.',
        'botiga.productGreen': 'Green Jersey',
        'botiga.productRed': 'Red Jersey',
        'botiga.productHoodie': 'Hoodie',
        'contact.title': 'Contact',
        'contact.infoTitle': 'Contact Information',
        'contact.locationLabel': 'Location',
        'contact.locationValue': 'Girona, Catalonia',
        'contact.emailLabel': 'Email',
        'contact.emailValue': 'communications.celticgirona.europe@gaa.ie',
        'footer.copyright': '© 2026 Celtic Girona | Gaelic Football Club',
        'footer.rights': 'All rights reserved',
        'footer.tagline': '🍀 Passion for Gaelic football in Girona ❤️',

        'quiSom.card1.title': 'Celtic Girona',
        'quiSom.card1.text': 'Celtic Girona is the first Gaelic football club in the province of Girona and the third in Catalonia. The club brings together players from different regions, especially students from the University of Girona, who are interested in discovering a different sport. More than just a team, Celtic Girona wants to be a meeting point for people passionate about sports and good atmosphere. The club aims to grow and compete in national and international Gaelic football tournaments organized by Gaelic Games Europe.',
        'quiSom.card1.trainingTitle': 'Trainings',
        'quiSom.card1.trainingText': 'Training sessions are held every Monday from 19:00 to 20:30, in mixed sessions alternately at the University of Girona Sports Service and the Club Esportiu Pontenc facilities.',
        'quiSom.card1.callToAction': 'If you want to try it, do not hesitate to contact us! ☘️♥️',
        'quiSom.card2.title': 'Gaelic Football',
        'quiSom.card2.text': 'Gaelic football is a team sport originating in Ireland that combines elements of soccer and rugby. It is played with a round ball that can be kicked, carried by hand and passed to teammates. Each team tries to score by kicking the ball between the rugby goalposts or over the crossbar. It is Ireland\'s national sport and its modern version was codified in 1887 with the founding of the Gaelic Athletic Association (GAA). This organization established clear rules and promoted the game as a symbol of Irish culture.',
        'quiSom.card2.stats': '50,000 people at the 2017 All-Ireland women\'s final in Dublin.',
        'quiSom.card3.title': 'Community and Values',
        'quiSom.card3.text': 'At Celtic Girona we believe in sport as a way to create community and connect people from different places and cultures. We promote values such as respect, teamwork and good atmosphere on and off the field. We want to be an open space where everyone feels welcome, with or without previous Gaelic football experience. Together we grow this sport in Girona and throughout Catalonia.',
        'quiSom.card3.valuesTitle': 'Gaelic Football Values',
        'premsa.title': 'Press, Radio and Television'
    }
};

const articleMonthTranslations = {
    en: {
        'Gener': 'January',
        'Febrer': 'February',
        'Març': 'March',
        'Abril': 'April',
        'Maig': 'May',
        'Juny': 'June',
        'Juliol': 'July',
        'Agost': 'August',
        'Setembre': 'September',
        'Octubre': 'October',
        'Novembre': 'November',
        'Desembre': 'December'
    },
    ca: {
        'January': 'Gener',
        'February': 'Febrer',
        'March': 'Març',
        'April': 'Abril',
        'May': 'Maig',
        'June': 'Juny',
        'July': 'Juliol',
        'August': 'Agost',
        'September': 'Setembre',
        'October': 'Octubre',
        'November': 'Novembre',
        'December': 'Desembre'
    }
};

const articleTitleTranslations = {
    'La comarca impulsa el futbol gaèlic': 'The county promotes Gaelic football',
    "Cèltic Girona - Catalonian GAA community welcomes it's third club": "Celtic Girona - Catalonian GAA community welcomes its third club",
    "Programa l'Entrevista - Entrevista al Cèltic Girona": "TV Girona - Interview with Celtic Girona",
    'Neix el Cèltic Girona, nou club de futbol gaèlic': 'Celtic Girona is born, the third Gaelic football club in Catalonia',
    'Neix el Celtic Girona, el tercer club de futbol gaèlic de Catalunya': 'Celtic Girona is born, the third Gaelic football club in Catalonia',
    'El futbol gaèlic altempordanès passa per Europa mentre somia crear el primer club federat de la zona': 'Alt Empordà Gaelic football goes through Europe while dreaming of creating the first federated club in the area',
    'La Garrotxa ha acollit una jornada de futbol gaèlic entre la Selecció Catalana i estudiants de la Universitat de Girona': 'Garrotxa hosted a Gaelic football day between the Catalan team and University of Girona students',
    "Programa La Banqueta - El futbol gaèlic arriba a la Garrotxa": "La Banqueta Program - Gaelic football arrives in Garrotxa",
    'El futbol gaèlic barreja quatre esports, és molt complet i el volem donar a conèixer a Girona': 'Gaelic football mixes four sports, is very complete and we want to make it known in Girona',
    'Programa Onze - Futbol Gaèlic': 'Programa Onze - Gaelic Football',
    "Quatre esports en un: el futbol gaèlic, d'Irlanda, s'exhibeix al camp del Lladó": "Four sports in one: Gaelic football from Ireland performs at Lladó field",
    'El futbol gaèlic arriba a la comarca': 'Gaelic football arrives in the region',
    "El futbol gaèlic dona els primers passos a l'Empordà": "Gaelic football takes its first steps in Empordà"
};

function translateArticleTagDates(lang) {
    const translationMap = articleMonthTranslations[lang] || {};
    document.querySelectorAll('.article-tag').forEach(tag => {
        let text = tag.textContent;
        Object.entries(translationMap).forEach(([from, to]) => {
            // Matches exact month names, case-insensitive, accents handled direct
            const regex = new RegExp('\\b' + from + '\\b', 'gi');
            text = text.replace(regex, (match) => {
                // respect capitalization of original token
                if (match[0] === match[0].toUpperCase()) {
                    return to[0].toUpperCase() + to.slice(1);
                }
                return to.toLowerCase();
            });
        });
        tag.textContent = text;
    });
}

function translateArticleTitles(lang) {
    document.querySelectorAll('.article-card h3').forEach(h3 => {
        if (!h3.dataset.originalTitle) {
            h3.dataset.originalTitle = h3.textContent.trim();
        }
        const originalTitle = h3.dataset.originalTitle;
        if (lang === 'en') {
            const translated = articleTitleTranslations[originalTitle] || articleTitleTranslations[originalTitle.trim()] || originalTitle;
            h3.textContent = translated;
        } else {
            h3.textContent = originalTitle;
        }
    });
}

function setLanguage(lang) {
    const selectedLang = (lang === 'en' ? 'en' : 'ca');
    document.documentElement.lang = selectedLang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const text = (i18nData[selectedLang] && i18nData[selectedLang][key]) || i18nData.ca[key] || element.textContent;
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = text;
            } else {
                element.value = text;
            }
        } else {
            element.innerHTML = text;
        }
    });

    document.querySelectorAll('.read-more').forEach(link => {
        const currentText = link.textContent.trim();
        const isVideo = /veure|watch/i.test(currentText);
        const key = isVideo ? 'premsa.watchVideo' : 'premsa.readArticle';
        const translated = (i18nData[selectedLang] && i18nData[selectedLang][key]) || i18nData.ca[key] || link.textContent;
        link.innerHTML = `${translated} <span>→</span>`;
    });

    translateArticleTagDates(selectedLang);
    translateArticleTitles(selectedLang);

    document.querySelectorAll('.lang-switcher .lang-toggle').forEach(btn => {
        const btnLang = btn.dataset.lang;
        if (btnLang === selectedLang) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });

    localStorage.setItem('celticgirona-lang', selectedLang);
}

function initLanguage() {
    const savedLang = localStorage.getItem('celticgirona-lang');
    setLanguage(savedLang || 'ca');

    document.querySelectorAll('.lang-switcher .lang-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.dataset.lang;
            setLanguage(newLang);
        });
    });
}

document.addEventListener('DOMContentLoaded', initLanguage);
