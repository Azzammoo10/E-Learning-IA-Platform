/* ── App — Main entry point, router, initialization ── */
const App = {
    async init() {
        // Load content
        await ContentLoader.load();

        // Init subsystems
        ThemeManager.init();
        ScrollReveal.init();
        Sidebar.initMobile();
        Glossary.init();

        // Init professional animations
        Particles.init();
        RippleEffect.init();
        TiltEffect.init();

        // Flashcard button
        document.getElementById('flashcardBtn').addEventListener('click', () => {
            window.location.hash = 'flashcards';
        });

        // Listen to hash changes
        window.addEventListener('hashchange', () => this.route());

        // Initial route
        this.route();

        // Update progress
        ProgressTracker.updateUI();
    },

    route() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        const parts = hash.split('/');
        const page = parts[0];
        const contentEl = document.getElementById('content');

        // Update breadcrumb
        this._updateBreadcrumb(hash);

        // Scroll to top
        window.scrollTo(0, 0);

        if (page === 'dashboard' || hash === '') {
            Sidebar.setActive(null);
            Dashboard.render(ContentLoader.getCourseInfo(), ContentLoader.getModules());
        } else if (page === 'module' && parts[1]) {
            const moduleId = parts[1];
            Sidebar.setActive(moduleId);
            Renderer.render(moduleId);
        } else if (page === 'flashcards') {
            Sidebar.setActive(null);
            Flashcard.render();
        } else {
            Sidebar.setActive(null);
            Dashboard.render(ContentLoader.getCourseInfo(), ContentLoader.getModules());
        }

        // Animate page entrance
        PageTransition.animate(contentEl);

        // Observe animated counters
        AnimatedCounter.observeAll();

        ProgressTracker.updateUI();
    },

    _updateBreadcrumb(hash) {
        const bc = document.getElementById('breadcrumb');
        if (!bc) return;

        const parts = hash.split('/');
        let html = `<a href="#dashboard">Accueil</a>`;

        if (parts[0] === 'module' && parts[1]) {
            const m = ContentLoader.getModule(parts[1]);
            if (m) {
                html += `<span class="breadcrumb-sep">›</span>`;
                html += `<span class="breadcrumb-current">${m.titre}</span>`;
            }
        } else if (parts[0] === 'flashcards') {
            html += `<span class="breadcrumb-sep">›</span>`;
            html += `<span class="breadcrumb-current">Flashcards</span>`;
        }

        bc.innerHTML = html;
    }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
