/* ── Sidebar Navigation ── */
const Sidebar = {
    activeModule: null,

    render(modules) {
        const nav = document.getElementById('sidebarNav');
        if (!nav) return;

        const icons = {
            introduction: '🚀',
            modules_python: '📦',
            numpy: '🔢',
            pandas: '🐼',
            matplotlib: '📊',
            ml_part_1: '🤖',
            ml_part_2: '📈',
            ml_part_3: '🔗',
            ml_part_4: '🎮'
        };

        let html = `
      <div class="sidebar-section-title">Modules du cours</div>
      <a class="sidebar-nav-item ${!this.activeModule ? 'active' : ''}" data-route="dashboard">
        <span class="sidebar-nav-item-icon">🏠</span>
        Tableau de bord
      </a>
    `;

        modules.forEach((m, idx) => {
            const isActive = this.activeModule === m.id;
            const icon = icons[m.id] || '📘';
            const sections = this._getSections(m);
            const progress = ProgressTracker.getModuleProgress(m.id, sections.length);
            const completed = progress === 100;

            html += `
        <a class="sidebar-nav-item ${isActive ? 'active' : ''} ${completed ? 'completed' : ''}" data-route="module/${m.id}">
          <span class="sidebar-nav-item-icon">${icon}</span>
          <span style="flex:1">${m.titre}</span>
          ${progress > 0 ? `<span class="badge ${completed ? 'badge-success' : 'badge-primary'}">${progress}%</span>` : ''}
        </a>
        <div class="sidebar-nav-sub ${isActive ? 'expanded' : ''}">
          ${sections.map((s, si) => `
            <a class="sidebar-nav-sub-item ${ProgressTracker.isComplete(m.id, si) ? 'completed' : ''}"
               data-route="module/${m.id}" data-section="${si}">
              ${s.titre || s.nom || 'Section ' + (si + 1)}
            </a>
          `).join('')}
        </div>
      `;
        });

        nav.innerHTML = html;

        // Click handlers
        nav.querySelectorAll('.sidebar-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const route = item.dataset.route;
                window.location.hash = route;
                this._closeMobile();
            });
        });

        nav.querySelectorAll('.sidebar-nav-sub-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const route = item.dataset.route;
                const section = item.dataset.section;
                window.location.hash = route;
                setTimeout(() => {
                    const el = document.getElementById('section-' + section);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
                this._closeMobile();
            });
        });
    },

    _getSections(module) {
        if (module.sous_sections) return module.sous_sections;
        if (module.structures_principales) return module.structures_principales;
        if (module._data && module._data.sous_parties) return module._data.sous_parties;
        if (module._data && module._data.contenu) return [{ titre: module.titre }];
        if (module.syntaxes_import) return [{ titre: 'Syntaxes d\'import' }];
        if (module.bibliotheques) return [{ titre: 'Bibliothèques' }];
        if (module.types_graphiques) return module.types_graphiques.map(t => ({ titre: t.nom }));
        return [{ titre: module.titre }];
    },

    setActive(moduleId) {
        this.activeModule = moduleId;
        if (ContentLoader.data) {
            this.render(ContentLoader.getModules());
        }
    },

    _closeMobile() {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('visible');
    },

    initMobile() {
        const hamburger = document.getElementById('hamburgerBtn');
        const overlay = document.getElementById('sidebarOverlay');

        hamburger.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
            overlay.classList.toggle('visible');
        });

        overlay.addEventListener('click', () => {
            this._closeMobile();
        });
    }
};
