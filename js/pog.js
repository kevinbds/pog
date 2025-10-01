(function() {
    const helpToggle = document.getElementById('helpToggle');
    const helpClose = document.getElementById('helpClose');
    const helpMenu = document.getElementById('helpMenu');

    function openHelpMenu() {
        helpMenu.classList.add('open');
        helpToggle.setAttribute('aria-expanded', 'true');
        helpMenu.setAttribute('aria-hidden', 'false');
        helpClose.focus();
    }

    function closeHelpMenu() {
        helpMenu.classList.remove('open');
        helpToggle.setAttribute('aria-expanded', 'false');
        helpMenu.setAttribute('aria-hidden', 'true');
        helpToggle.focus();
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

    document.addEventListener('keydown', function(e) {
        if (e.key === '?' && !e.shiftKey) {
            if (helpMenu.classList.contains('open')) {
                closeHelpMenu();
            } else {
                openHelpMenu();
            }
            e.preventDefault();
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
    transition: Reveal.getQueryHash().transition || 'default'
});

Reveal.addEventListener('ready', function() {
    document.querySelector('.reveal').classList.add('ready');
});

function checkFullscreen() {
    const themeToggle = document.getElementById('themeToggle');
    const helpToggle = document.getElementById('helpToggle');

    const isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        window.innerHeight >= screen.height - 50 ||
        (window.outerHeight >= screen.height && window.outerWidth >= screen.width)
    );

    if (themeToggle) {
        themeToggle.style.display = isFullscreen ? 'none' : 'flex';
    }
    if (helpToggle) {
        helpToggle.style.display = isFullscreen ? 'none' : 'flex';
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
})();