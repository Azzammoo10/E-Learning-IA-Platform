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

        // Init lightweight animations
        RippleEffect.init();

        // Flashcard button
        document.getElementById('flashcardBtn').addEventListener('click', () => {
            window.location.hash = 'flashcards';
        });

        // About button
        document.getElementById('aboutBtn').addEventListener('click', () => {
            window.location.hash = 'about';
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
        } else if (page === 'about') {
            Sidebar.setActive(null);
            this._renderAbout();
        } else {
            Sidebar.setActive(null);
            Dashboard.render(ContentLoader.getCourseInfo(), ContentLoader.getModules());
        }

        // Observe animated counters
        AnimatedCounter.observeAll();

        ProgressTracker.updateUI();
    },

    _updateBreadcrumb(hash) {
        const bc = document.getElementById('breadcrumb');
        if (!bc) return;

        const chevronSVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
        const parts = hash.split('/');
        let html = `<a href="#dashboard">Accueil</a>`;

        if (parts[0] === 'module' && parts[1]) {
            const m = ContentLoader.getModule(parts[1]);
            if (m) {
                html += `<span class="breadcrumb-sep">${chevronSVG}</span>`;
                html += `<span class="breadcrumb-current">${m.titre}</span>`;
            }
        } else if (parts[0] === 'flashcards') {
            html += `<span class="breadcrumb-sep">${chevronSVG}</span>`;
            html += `<span class="breadcrumb-current">Flashcards</span>`;
        } else if (parts[0] === 'about') {
            html += `<span class="breadcrumb-sep">${chevronSVG}</span>`;
            html += `<span class="breadcrumb-current">À propos</span>`;
        }

        bc.innerHTML = html;
    },

    _renderAbout() {
        const el = document.getElementById('content');
        el.innerHTML = `
        <div class="about-page page-enter">
            <!-- Header -->
            <div class="about-header">
                <div class="about-avatar">
                    <div class="about-avatar-inner">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div class="about-avatar-ring"></div>
                </div>
                <h1 class="about-name">Mohamed Azzam</h1>
                <p class="about-role">Cybersecurity Engineer</p>
                <a href="https://azzammo.com" target="_blank" rel="noopener" class="about-website">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    azzammo.com
                </a>
            </div>

            <!-- Bio Card -->
            <div class="about-card scroll-reveal">
                <div class="about-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                    <h3 class="about-card-title">À propos</h3>
                    <p class="about-card-text">
                        Ingénieur en Cybersécurité passionné par l'éducation et les technologies modernes.
                        Créateur de cette plateforme e-learning pour rendre l'apprentissage de l'analyse de données
                        et du Machine Learning accessible, visuel et engageant pour les étudiants GEII.
                    </p>
                </div>
            </div>

            <!-- Skills -->
            <div class="about-card scroll-reveal">
                <div class="about-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <div>
                    <h3 class="about-card-title">Compétences</h3>
                    <div class="about-skills">
                        <span class="about-skill">Cybersecurity</span>
                        <span class="about-skill">Penetration Testing</span>
                        <span class="about-skill">Network Security</span>
                        <span class="about-skill">Python</span>
                        <span class="about-skill">Data Analysis</span>
                        <span class="about-skill">Machine Learning</span>
                        <span class="about-skill">Web Development</span>
                        <span class="about-skill">Linux</span>
                    </div>
                </div>
            </div>

            <!-- Project Info -->
            <div class="about-card scroll-reveal">
                <div class="about-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>
                </div>
                <div>
                    <h3 class="about-card-title">Ce projet</h3>
                    <p class="about-card-text">
                        Cette plateforme a été conçue pour les étudiants de <strong>MI-GEII 2ème année</strong>
                        à l'<strong>EST-Salé</strong>, Université Mohammed V.
                        Elle couvre l'analyse des données avec Python (NumPy, Pandas, Matplotlib) ainsi que
                        les fondamentaux du Machine Learning.
                    </p>
                    <div class="about-stats">
                        <div class="about-stat">
                            <span class="about-stat-number" data-count="9" data-suffix="">0</span>
                            <span class="about-stat-label">Modules</span>
                        </div>
                        <div class="about-stat">
                            <span class="about-stat-number" data-count="6" data-suffix="">0</span>
                            <span class="about-stat-label">Quiz</span>
                        </div>
                        <div class="about-stat">
                            <span class="about-stat-number" data-count="9" data-suffix="">0</span>
                            <span class="about-stat-label">Flashcards</span>
                        </div>
                        <div class="about-stat">
                            <span class="about-stat-number" data-count="5" data-suffix="">0</span>
                            <span class="about-stat-label">Diagrammes</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact -->
            <div class="about-card scroll-reveal">
                <div class="about-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                    <h3 class="about-card-title">Contact & Liens</h3>
                    <div class="about-links">
                        <a href="https://azzammo.com" target="_blank" rel="noopener" class="about-link-item">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            <strong>azzammo.com</strong> <span class="about-link-arrow">&rarr;</span>
                        </a>
                        <a href="https://github.com/Azzammoo10" target="_blank" rel="noopener" class="about-link-item">
                            <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                            <strong>GitHub</strong> <span class="about-link-arrow">&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="about-footer scroll-reveal">
                <p>&copy; 2026 Mohamed Azzam — Tous droits réservés</p>
                <p>Université Mohammed V — EST-Salé</p>
            </div>
        </div>
        `;

        ScrollReveal.observe();
        AnimatedCounter.observeAll();
    }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
