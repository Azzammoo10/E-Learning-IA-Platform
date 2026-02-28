/* ── Theme Manager ── */
const ThemeManager = {
    init() {
        const saved = localStorage.getItem('elearning-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (prefersDark ? 'dark' : 'light');
        this.set(theme);

        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggle();
        });
    },

    set(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('elearning-theme', theme);
        const btn = document.getElementById('themeToggle');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        this.set(current === 'dark' ? 'light' : 'dark');
    },

    get() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
};
