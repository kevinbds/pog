(function() {
    const menuToggle = document.getElementById('menuToggle');
    const controlsMenu = document.getElementById('controlsMenu');
    const overviewToggle = document.getElementById('overviewToggle');
    const helpToggle = document.getElementById('helpToggle');
    const helpClose = document.getElementById('helpClose');
    const helpMenu = document.getElementById('helpMenu');
    const helpKeyboard = document.querySelector('.help-keyboard');
    const helpTouch = document.querySelector('.help-touch');

    // Detectar se é dispositivo touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) {
        helpKeyboard.style.display = 'none';
        helpTouch.style.display = 'flex';
        helpTouch.style.flexDirection = 'column';
        helpTouch.style.gap = '12px';
    } else {
        helpKeyboard.style.display = 'flex';
        helpKeyboard.style.flexDirection = 'column';
        helpKeyboard.style.gap = '12px';
        helpTouch.style.display = 'none';
    }

    function openHelpMenu() {
        helpMenu.classList.add('open');
        helpToggle.setAttribute('aria-expanded', 'true');
        helpMenu.setAttribute('aria-hidden', 'false');
        if (!isTouchDevice) {
            helpClose.focus();
        }
    }

    function closeHelpMenu() {
        helpMenu.classList.remove('open');
        helpToggle.setAttribute('aria-expanded', 'false');
        helpMenu.setAttribute('aria-hidden', 'true');
        if (!isTouchDevice) {
            helpToggle.focus();
        }
    }

    helpToggle.addEventListener('click', function() {
        if (helpMenu.classList.contains('open')) {
            closeHelpMenu();
        } else {
            openHelpMenu();
        }
    });

    helpClose.addEventListener('click', function() {
        closeHelpMenu();
    });

    document.addEventListener('click', function(e) {
        if (!helpMenu.contains(e.target) && !helpToggle.contains(e.target)) {
            if (helpMenu.classList.contains('open')) {
                closeHelpMenu();
            }
        }
    });

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = controlsMenu.classList.contains('open');

        if (isOpen) {
            controlsMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        } else {
            controlsMenu.classList.add('open');
            menuToggle.classList.add('open');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    });

    document.addEventListener('click', function(e) {
        if (!controlsMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            if (controlsMenu.classList.contains('open')) {
                controlsMenu.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    overviewToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        Reveal.toggleOverview();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
            if (helpMenu.classList.contains('open')) {
                closeHelpMenu();
            } else {
                openHelpMenu();
            }
            e.preventDefault();
            e.stopPropagation();
        }
        if (e.key === 'Escape' && helpMenu.classList.contains('open')) {
            closeHelpMenu();
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    }, true);
})();

Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    theme: Reveal.getQueryHash().theme,
    transition: 'slide',
    transitionSpeed: 'fast',
    backgroundTransition: 'slide',
    width: '100%',
    height: '100%',
    margin: 0.02,
    minScale: 0.2,
    maxScale: 2.0
});

Reveal.addEventListener('ready', function() {
    document.querySelector('.reveal').classList.add('ready');
});

function checkFullscreen() {
    const menuToggle = document.getElementById('menuToggle');
    const controlsMenu = document.getElementById('controlsMenu');

    // Verifica apenas se está realmente em fullscreen via API
    const isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );

    if (menuToggle) {
        menuToggle.style.display = isFullscreen ? 'none' : 'flex';
    }
    if (controlsMenu) {
        controlsMenu.style.display = isFullscreen ? 'none' : 'flex';
    }
}

document.addEventListener('fullscreenchange', checkFullscreen);
document.addEventListener('webkitfullscreenchange', checkFullscreen);
document.addEventListener('mozfullscreenchange', checkFullscreen);
document.addEventListener('MSFullscreenChange', checkFullscreen);

window.addEventListener('resize', checkFullscreen);

setInterval(checkFullscreen, 500);

document.addEventListener('keydown', function(e) {
    if (e.key === 'f' || e.key === 'F' || e.key === 'F11') {
        setTimeout(checkFullscreen, 100);
    }
    if (e.key === 'Escape') {
        setTimeout(checkFullscreen, 100);
    }
});

(function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    let currentTheme = localStorage.getItem('theme') || 'auto';

    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);

        let themeLabel = '';
        if (theme === 'auto') {
            themeLabel = 'automático';
            if (systemPrefersDark.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        } else if (theme === 'dark') {
            themeLabel = 'escuro';
            body.classList.add('dark-mode');
        } else {
            themeLabel = 'claro';
            body.classList.remove('dark-mode');
        }

        themeToggle.setAttribute('aria-label', `Alternar tema (atual: ${themeLabel}). Pressione D para alternar`);
    }

    applyTheme(currentTheme);

    themeToggle.addEventListener('click', function() {
        if (currentTheme === 'auto') {
            currentTheme = 'light';
        } else if (currentTheme === 'light') {
            currentTheme = 'dark';
        } else {
            currentTheme = 'auto';
        }

        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });

    systemPrefersDark.addEventListener('change', function(e) {
        if (currentTheme === 'auto') {
            if (e.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'd' || e.key === 'D') {
            themeToggle.click();
        }
    });

    // Controle de vídeos ao mudar slides
    Reveal.on('slidechanged', function(event) {
        // Pausar todos os vídeos
        document.querySelectorAll('video').forEach(function(video) {
            video.pause();
            video.currentTime = 0;
        });

        // Reiniciar vídeos no slide atual
        const currentSlide = event.currentSlide;
        const videos = currentSlide.querySelectorAll('video');
        videos.forEach(function(video) {
            video.currentTime = 0;
            video.play().catch(function(err) {
                console.log('Autoplay bloqueado:', err);
            });
        });
    });

    // Iniciar vídeos no primeiro slide
    Reveal.on('ready', function() {
        const currentSlide = Reveal.getCurrentSlide();
        const videos = currentSlide.querySelectorAll('video');
        videos.forEach(function(video) {
            video.play().catch(function(err) {
                console.log('Autoplay bloqueado:', err);
            });
        });
    });
})();