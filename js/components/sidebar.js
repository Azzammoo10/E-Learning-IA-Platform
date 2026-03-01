/* ── Sidebar Navigation ── */
const Sidebar = {
    activeModule: null,

    /* SVG icon map — Lucide-style stroke icons */
    _icons: {
        home: '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        introduction: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        modules_python: '<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
        numpy: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
        pandas: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>',
        matplotlib: '<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
        ml_part_1: '<svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.92"/><path d="M8.24 4.23A4 4 0 0 1 12 2"/><rect x="5" y="12" width="14" height="8" rx="2"/><line x1="12" y1="16" x2="12" y2="16.01"/><line x1="9" y1="16" x2="9" y2="16.01"/><line x1="15" y1="16" x2="15" y2="16.01"/><path d="M9 12V9"/><path d="M15 12V9"/></svg>',
        ml_part_2: '<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        ml_part_3: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="5" cy="19" r="2"/><line x1="14.5" y1="9.5" x2="17.5" y2="6.5"/><line x1="9.5" y1="9.5" x2="6.5" y2="6.5"/><line x1="14.5" y1="14.5" x2="17.5" y2="17.5"/><line x1="9.5" y1="14.5" x2="6.5" y2="17.5"/></svg>',
        ml_part_4: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        default: '<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
    },

    render(modules) {
        const nav = document.getElementById('sidebarNav');
        if (!nav) return;

        let html = `
      <div class="sidebar-section-title">Modules du cours</div>
      <a class="sidebar-nav-item ${!this.activeModule ? 'active' : ''}" data-route="dashboard">
        <span class="sidebar-nav-item-icon">${this._icons.home}</span>
        Tableau de bord
      </a>
    `;

        modules.forEach((m, idx) => {
            const isActive = this.activeModule === m.id;
            const icon = this._icons[m.id] || this._icons.default;
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
