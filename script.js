const navPageLinks = document.querySelectorAll('.nav-page');
const pages = document.querySelectorAll('.content-center');
const secretNavItem = document.querySelector('.secret-nav-item');
const secretTrigger = document.querySelector('.slider2 a[href="archive.html"]');
const exitNavItem = document.querySelector('.exit-nav-item');

const popup = document.querySelector('.popup');
const poppass = document.getElementById('poppass');
const fronttheme = document.getElementById('fronttheme');
const archiveMusic = document.getElementById('archive-music');
const dmToggle = document.getElementById('dm-tgl');
const popnotif = document.getElementById('popups');
const body = document.body;
const nowPlayingToast = document.createElement('div');
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

nowPlayingToast.className = 'now-playing-toast';
nowPlayingToast.innerHTML = '<span class="now-playing-label">NOW PLAYING</span><span class="now-playing-title">Unknown track</span>';
document.body.appendChild(nowPlayingToast);

function revealSecretNav() {
    if (!secretNavItem) return;

    secretNavItem.classList.remove('hidden-secret');
    secretNavItem.classList.add('visible-secret');

    if (document.querySelector('.secret-link')) {
        document.querySelector('.secret-link').setAttribute('href', '404.html');
    }
}

function showNowPlayingToast(trackTitle) {
    const trackText = nowPlayingToast.querySelector('.now-playing-title');

    if (trackText) {
        trackText.textContent = trackTitle;
    }

    nowPlayingToast.classList.remove('show');
    void nowPlayingToast.offsetWidth;
    nowPlayingToast.classList.add('show');

    clearTimeout(showNowPlayingToast.timeoutId);
    showNowPlayingToast.timeoutId = setTimeout(() => {
        nowPlayingToast.classList.remove('show');
    }, 2600);
}

function bindAudioToast(audioElement, fallbackTitle) {
    if (!audioElement) return;

    const trackTitle = audioElement.dataset.trackLabel || fallbackTitle || 'Unknown track';
    audioElement.dataset.trackLabel = trackTitle;

    audioElement.addEventListener('play', () => {
        showNowPlayingToast(trackTitle);
    });

    audioElement.addEventListener('pause', () => {
        nowPlayingToast.classList.remove('show');
    });
}

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
    }, 3200);
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
        if (link.classList.contains('secret-link')) {
            return;
        }

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

if (secretTrigger) {
    let secretClickCount = 0;
    secretTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        secretClickCount += 1;

        if (secretClickCount >= 5) {
            sessionStorage.setItem('errorEntryToken', 'true');
            revealSecretNav();
            return;
        }
    });
}

if (popup) {
    popup.addEventListener('click', function() {
        alert('Цif·f@qБ@vw@ФbХ@wДЁ');
    });
}

if (poppass) {
    poppass.addEventListener('click', () => {
        const password = window.prompt('Ёif@sf╦@Ёw@╦w╢·@f╚dbxfk@q╚@·qhiЁ@q@g·wvЁ@wg@╦w╢:');

        if (password === 'wonderland') {
            if (exitNavItem) {
                exitNavItem.classList.remove('hidden-secret');
                exitNavItem.classList.add('visible-secret');
            }
        } else if (password !== null) {
            window.alert('iwФ@Дvgw·ЁДvbЁf');
        }
    });
}

if (fronttheme) {
    fronttheme.dataset.trackLabel = 'Aphasia';
    bindAudioToast(fronttheme, 'Aphasia');
    fronttheme.volume = 0.25;
    fronttheme.play().then(() => {
        showNowPlayingToast(fronttheme.dataset.trackLabel);
    }).catch(() => {});
}

if (archiveMusic) {
    archiveMusic.dataset.trackLabel = 'btqdf@qv@тqБbvЁi·wxf';
    bindAudioToast(archiveMusic, 'btqdf@qv@тqБbvЁi·wxf');
    archiveMusic.volume = 0.25;
    archiveMusic.play().then(() => {
        showNowPlayingToast(archiveMusic.dataset.trackLabel);
    }).catch(() => {});
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