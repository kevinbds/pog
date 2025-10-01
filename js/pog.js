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