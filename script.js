const navPageLinks = document.querySelectorAll('.nav-page');
const pages = document.querySelectorAll('.content-center');

const dmToggle = document.getElementById('dm-tgl');
const body = document.body;
const panelToggles = document.querySelectorAll('.panel-toggle');
const floatingPanels = document.querySelectorAll('.nav-left, .sidebar-right');
const navPanel = document.querySelector('.nav-left');
const navToggle = navPanel.querySelector('.panel-toggle');
const widgetPanel = document.querySelector('.sidebar-right');
const widgetContent = widgetPanel.querySelector('.widget-content');
const widgetToggle = widgetPanel.querySelector('.panel-toggle');

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

dmToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
});