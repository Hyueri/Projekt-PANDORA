const navPageLinks = document.querySelectorAll('.nav-page');
const pages = document.querySelectorAll('.content-center');

const popup = document.getElementById('popup');
const fronttheme = document.getElementById('fronttheme')
const backdoorMusic = document.getElementById('backdoor-music');
const dmToggle = document.getElementById('dm-tgl');
const popnotif = document.getElementById('popups');
const body = document.body;
const panelToggles = document.querySelectorAll('.panel-toggle');
const floatingPanels = document.querySelectorAll('.nav-left, .sidebar-right');
const navPanel = document.querySelector('.nav-left');
const navToggle = navPanel.querySelector('.panel-toggle');
const widgetPanel = document.querySelector('.sidebar-right');
const widgetContent = widgetPanel.querySelector('.widget-content');
const widgetToggle = widgetPanel.querySelector('.panel-toggle');

const tipMessages = [
    'Tip: go and try Phigros, underrated game that are fantastic.',
    'Tip: La Li Lu Le Lo, La Li Lu Le Lo, La Li Lu Le Lo.',
    'Tip: What you saw is not supposed what you believe.',
    'Tip: ...There is no point i running away, so i came back,..',
    'Tip: Why not try to sleep early??',
    'Tip: KYS',
    'Quotes: Its La Peace',
    'Quotes: Chasing dream beyond the stars'

];

function showRandomTip() {
    const toast = document.getElementById('tip-toast') || document.createElement('div');
    const randomTip = tipMessages[Math.floor(Math.random() * tipMessages.length)];

    toast.id = 'tip-toast';
    toast.className = 'tip-toast';
    toast.textContent = randomTip;

    if (!toast.parentNode) {
        document.body.appendChild(toast);
    }

    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');

    clearTimeout(showRandomTip.timeoutId);
    showRandomTip.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

panelToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const panel = toggle.parentElement;
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        panel.classList.toggle('is-collapsed', isExpanded);
        toggle.setAttribute('aria-expanded', String(!isExpanded));
    });
});

let previousScrollY = window.scrollY;
let scrollTicking = false;

function updateFloatingPanels() {
    const currentScrollY = window.scrollY;
    const scrollClass = currentScrollY > previousScrollY ? 'scrolling-down' : 'scrolling-up';

    floatingPanels.forEach(panel => {
        panel.classList.remove('scrolling-down', 'scrolling-up');
        panel.classList.add(scrollClass);
    });

    previousScrollY = currentScrollY;
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateFloatingPanels);
        scrollTicking = true;
    }
}, { passive: true });

function switchPage(targetPageId) {
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        targetPage.classList.add('active-page');
    }

    navPageLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === targetPageId) {
            link.classList.add('active');
        }
    });

}

navPageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.dataset.page;
        switchPage(targetPage);

        if (window.matchMedia('(max-width: 700px)').matches) {
            navPanel.classList.add('is-collapsed');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}); 

widgetContent.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 700px)').matches) {
        widgetPanel.classList.add('is-collapsed');
        widgetToggle.setAttribute('aria-expanded', 'false');
    }
});

if (popup) {
    popup.addEventListener('click', function() {
        showRandomTip();
    });
}

if (fronttheme) {
    fronttheme.volume = 0.25;
    fronttheme.play().catch(() => {});
}

if (backdoorMusic) {
    backdoorMusic.volume = 0.25;
    backdoorMusic.play().catch(() => {});
}

if (dmToggle) {
    dmToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
    });
}

if (popnotif) {
    popnotif.addEventListener('click', function() {
        showRandomTip();
    });
}