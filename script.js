const navPageLinks = document.querySelectorAll('.nav-page');
const pages = document.querySelectorAll('.content-center');
const secretNavItem = document.querySelector('.secret-nav-item');
const secretTrigger = document.querySelector('.slider2 a[href="archive.html"]');
const archiveImageTrigger = document.querySelector('.slider2 img[src="img/m200(1).jpg"]');
const exitNavItem = document.querySelector('.exit-nav-item');

const popup = document.querySelector('.popup');
const poppass = document.getElementById('poppass');
const musicPlayers = document.querySelectorAll('#fronttheme, #archive-music');
const isIndexPage = Boolean(document.getElementById('fronttheme'));
const dmToggle = document.getElementById('dm-tgl');
const popnotif = document.getElementById('popups');
const body = document.body;
const savedDarkMode = isIndexPage ? localStorage.getItem('darkMode') : null;
const nowPlayingToast = document.createElement('div');
const panelToggles = document.querySelectorAll('.panel-toggle');
const floatingPanels = document.querySelectorAll('.nav-left, .sidebar-right');
const navPanel = document.querySelector('.nav-left');
const navToggle = navPanel.querySelector('.panel-toggle');
const widgetPanel = document.querySelector('.sidebar-right');
const widgetContent = widgetPanel.querySelector('.widget-content');
const widgetToggle = widgetPanel.querySelector('.panel-toggle');
let passwordAccepted = false;
const indexTracks = [
    'audio/Aphasia.mp3',
    'audio/寄明月.mp3'
];
const k = 'a71a7c7011f53a1bab3642ec2ce12593f05230ace8de1e3e7645f69efac1443d';
const logFiles = new Map([
    ['2faff19572d87a3684b2466fc4d7f5f4b950a30cc92f859c597a8f6c094a533f', 1],
    ['4523540f1504cd17100c4835e85b7eefd49911580f8efff0599a8f283be6b9e3', 2],
    ['a388f562e286fdf28986f9253579f4d096446e01dd0c771996a51ff11b390fa2', 3],
    ['0b73ac87e5b7b8aaf38929124133b4c7b4cbd41feed0eba7584493588c48fc14', 4],
    ['1ce31ea41272f6e794c7cff80821fc30d577ed4c6425f99eab0bd505802406ab', 5],
    ['fb3e2c0015ad5bcd60d7619ca575a56c15c5d2cd3f01f18e68c4dfaeee585db5', 6]
]);

const tipMessages = [
    'Tip: go and try Phigros, underrated game that are fantastic.',
    'Quotes: La Li Lu Le Lo, La Li Lu Le Lo, La Li Lu Le Lo.',
    'Tip: What you saw is not supposed what you believe.',
    'Quotes: ...There is no point i running away, so i came back,..',
    'Tip: Why not try to sleep early??',
    'Tip: KYS',
    'Quotes: Its La Peace',
    'Quotes: Chasing dream beyond the stars'

];

const archiveImageMessages = [
    'Oh, you found something? no? well, keep looking.',
    'damn it, didnt i tell you not to be stupid?',
    'Check everything, there might be a clue hidden somewhere.',
    'Stop wasting time.',
    'Stay calm, dont panic.',
    'make it quick, im not a babysitter.',
    'im here to help you as best as i could, but you have to do most of the work',
];

if (isIndexPage && savedDarkMode !== null) {
    body.classList.toggle('dark-mode', savedDarkMode === 'true');
}

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

function getTrackTitle(audioElement) {
    const sourceElement = audioElement.querySelector('source');
    const sourceUrl = audioElement.currentSrc
        || sourceElement?.getAttribute('src')
        || audioElement.getAttribute('src');

    if (!sourceUrl) {
        return 'Unknown track';
    }

    const filename = sourceUrl.split(/[\\/]/).pop()?.split(/[?#]/)[0] || '';
    let decodedFilename = filename;

    try {
        decodedFilename = decodeURIComponent(filename);
    } catch {
        // Keep the original filename when the URL contains malformed encoding.
    }

    return decodedFilename.replace(/\.[^/.]+$/, '') || 'Unknown track';
}

function bindAudioToast(audioElement) {
    if (!audioElement) return;

    audioElement.dataset.trackLabel = getTrackTitle(audioElement);

    audioElement.addEventListener('play', () => {
        const trackTitle = getTrackTitle(audioElement);
        audioElement.dataset.trackLabel = trackTitle;
        showNowPlayingToast(trackTitle);
    });

    audioElement.addEventListener('ended', () => {
        if (audioElement.id === 'fronttheme') {
            const sourceElement = audioElement.querySelector('source');
            const currentTrack = sourceElement?.getAttribute('src') || audioElement.src;
            const nextTrack = indexTracks.find(track => !currentTrack.endsWith(track))
                || indexTracks[0];

            if (sourceElement) {
                sourceElement.src = nextTrack;
            } else {
                audioElement.src = nextTrack;
            }

            audioElement.load();
            audioElement.play().catch(() => {});
            return;
        }

        const trackTitle = getTrackTitle(audioElement);
        audioElement.dataset.trackLabel = trackTitle;
        showNowPlayingToast(trackTitle);
    });

    audioElement.addEventListener('pause', () => {
        nowPlayingToast.classList.remove('show');
    });
}

function selectRandomIndexTrack(audioElement) {
    if (!audioElement || audioElement.id !== 'fronttheme') return;

    const sourceElement = audioElement.querySelector('source');
    const selectedTrack = indexTracks[Math.floor(Math.random() * indexTracks.length)];

    if (sourceElement) {
        sourceElement.src = selectedTrack;
    } else {
        audioElement.src = selectedTrack;
    }

    audioElement.load();
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

function showArchiveImageMessage() {
    const toast = document.getElementById('archive-image-toast') || document.createElement('div');
    const randomMessage = archiveImageMessages[Math.floor(Math.random() * archiveImageMessages.length)];

    toast.id = 'archive-image-toast';
    toast.className = 'tip-toast archive-image-toast';
    toast.textContent = randomMessage;

    if (!toast.parentNode) {
        document.body.appendChild(toast);
    }

    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');

    clearTimeout(showArchiveImageMessage.timeoutId);
    showArchiveImageMessage.timeoutId = setTimeout(() => {
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

if (archiveImageTrigger) {
    archiveImageTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        showArchiveImageMessage();
    });
}

if (popup) {
    popup.addEventListener('click', function() {
        alert('Цif·f@qБ@vw@ФbХ@wДЁ');
    });
}
 
if (poppass) {
    poppass.addEventListener('click', async () => {
        if (passwordAccepted) {
            window.alert('WHAT ARE YOU WAITING FOR? GET YOUR ARSE OUTTA HERE');
            return;
        }

        const password = window.prompt('Ёif@sf╦@Ёw@╦w╢·@f╚dbxfk@q╚@·qhiЁ@qv@g·wvЁ@wg@╦w╢:');

        if (password === null) {
            return;
        }

        const data = new TextEncoder().encode(password);
        const digest = await crypto.subtle.digest('SHA-256', data);
        const hash = Array.from(new Uint8Array(digest))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');

        const logIdentifier = logFiles.get(hash);
        if (logIdentifier) {
            const logFile = logIdentifier === 6
                ? `${password}.txt`
                : ['l', 'o', 'g', '-', String(logIdentifier).padStart(2, '0'), '.', 't', 'x', 't'].join('');
            const downloadLink = document.createElement('a');
            downloadLink.href = `logs/${logFile}`;
            downloadLink.download = logFile;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
            return;
        }

        if (hash === k) {
            passwordAccepted = true;
            if (exitNavItem) {
                exitNavItem.classList.remove('hidden-secret');
                exitNavItem.classList.add('visible-secret');
            }
            window.alert('NICE WORK, NOW GET OUT OF HERE');
        } else {
            window.alert('iwФ@Дvgw·ЁДvbЁf');
        }
    });
}

musicPlayers.forEach(audioElement => {
    selectRandomIndexTrack(audioElement);
    bindAudioToast(audioElement);
    audioElement.volume = 0.25;
    audioElement.loop = audioElement.id !== 'fronttheme';
    audioElement.play().then(() => {
        showNowPlayingToast(getTrackTitle(audioElement));
    }).catch(() => {});
});



if (isIndexPage && dmToggle) {
    dmToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', String(body.classList.contains('dark-mode')));
    });
}

if (popnotif) {
    popnotif.addEventListener('click', function() {
        showRandomTip();
    });
}

