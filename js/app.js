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
        } else if (parts[0] === 'about') {
            html += `<span class="breadcrumb-sep">›</span>`;
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
                    <div class="about-avatar-inner">🛡️</div>
                    <div class="about-avatar-ring"></div>
                </div>
                <h1 class="about-name">Mohamed Azzam</h1>
                <p class="about-role">Cybersecurity Engineer</p>
                <a href="https://azzammo.com" target="_blank" rel="noopener" class="about-website">
                    🌐 azzammo.com ↗
                </a>
            </div>

            <!-- Bio Card -->
            <div class="about-card scroll-reveal">
                <div class="about-card-icon">👤</div>
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
                <div class="about-card-icon">🎯</div>
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
                <div class="about-card-icon">🎓</div>
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
                <div class="about-card-icon">📬</div>
                <div>
                    <h3 class="about-card-title">Contact & Liens</h3>
                    <div class="about-links">
                        <a href="https://azzammo.com" target="_blank" rel="noopener" class="about-link-item">
                            <span>🌐</span> <strong>azzammo.com</strong> <span class="about-link-arrow">↗</span>
                        </a>
                        <a href="https://github.com/Azzammoo10" target="_blank" rel="noopener" class="about-link-item">
                            <span>💻</span> <strong>GitHub</strong> <span class="about-link-arrow">↗</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="about-footer scroll-reveal">
                <p>© 2026 Mohamed Azzam — Tous droits réservés</p>
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
