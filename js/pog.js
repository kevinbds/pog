(function() {
    const helpToggle = document.getElementById('helpToggle');
    const helpMenu = document.getElementById('helpMenu');

    helpToggle.addEventListener('click', function() {
        helpMenu.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (!helpMenu.contains(e.target) && !helpToggle.contains(e.target)) {
            helpMenu.classList.remove('open');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === '?' && !e.shiftKey) {
            helpMenu.classList.toggle('open');
            e.preventDefault();
        }
        if (e.key === 'Escape' && helpMenu.classList.contains('open')) {
            helpMenu.classList.remove('open');
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

        if (theme === 'auto') {
            if (systemPrefersDark.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        } else if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
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