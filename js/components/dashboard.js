/* ── Dashboard — Welcome + Course Roadmap ── */
const Dashboard = {
  /* SVG icon map for modules */
  _icons: {
    introduction: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    modules_python: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    numpy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    pandas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>',
    matplotlib: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
    ml_part_1: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.92"/><path d="M8.24 4.23A4 4 0 0 1 12 2"/><rect x="5" y="12" width="14" height="8" rx="2"/><line x1="12" y1="16" x2="12" y2="16.01"/><line x1="9" y1="16" x2="9" y2="16.01"/><line x1="15" y1="16" x2="15" y2="16.01"/><path d="M9 12V9"/><path d="M15 12V9"/></svg>',
    ml_part_2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    ml_part_3: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="5" cy="19" r="2"/><line x1="14.5" y1="9.5" x2="17.5" y2="6.5"/><line x1="9.5" y1="9.5" x2="6.5" y2="6.5"/><line x1="14.5" y1="14.5" x2="17.5" y2="17.5"/><line x1="9.5" y1="14.5" x2="6.5" y2="17.5"/></svg>',
    ml_part_4: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
  },

  _colors: {
    introduction: 'var(--primary-500)',
    modules_python: 'var(--accent-500)',
    numpy: 'var(--primary-600)',
    pandas: 'var(--success-500)',
    matplotlib: 'var(--warning-500)',
    ml_part_1: 'var(--accent-500)',
    ml_part_2: 'var(--primary-500)',
    ml_part_3: 'var(--primary-600)',
    ml_part_4: 'var(--error-500)'
  },

  _descs: {
    introduction: 'Découvrez les outils Python pour analyser des données',
    modules_python: 'Apprenez à utiliser les modules et bibliothèques',
    numpy: 'Maîtrisez les tableaux et le calcul numérique',
    pandas: 'Manipulez et analysez des données structurées',
    matplotlib: 'Créez des graphiques et visualisations',
    ml_part_1: 'Découvrez les bases du Machine Learning',
    ml_part_2: 'Régression linéaire, KNN et classification',
    ml_part_3: 'Clustering et algorithme K-Means',
    ml_part_4: 'Q-Learning et prise de décision'
  },

  render(courseInfo, modules) {
    let html = `<div class="page-enter">`;

    // Welcome banner
    html += `
      <div style="margin-bottom:var(--space-10)">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-2)">
          <h1 class="section-title" style="margin:0">Bienvenue</h1>
        </div>
        <p class="section-subtitle" style="margin-bottom:var(--space-4)">
          Ce cours vous accompagne pas à pas dans l'analyse des données avec Python.
          <strong>Pas besoin d'être un expert</strong> — on part de zéro, ensemble.
        </p>
        <div class="info-box encourage">
          <span class="info-box-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </span>
          <div>
            <strong>Conseil :</strong> Prenez votre temps. Chaque module est divisé en petites étapes faciles à suivre.
            Vous pouvez revenir sur n'importe quelle partie quand vous voulez !
          </div>
        </div>
      </div>
    `;

    // Course info card
    html += `
      <div class="concept-card expanded scroll-reveal" style="margin-bottom:var(--space-8)">
        <div class="concept-card-header" style="cursor:default">
          <div class="concept-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div>
            <div class="concept-card-title" style="font-size:var(--text-lg)">Informations du cours</div>
          </div>
        </div>
        <div class="concept-card-body" style="max-height:none">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-4);padding-top:var(--space-2)">
            <div><span style="color:var(--text-tertiary);font-size:var(--text-sm)">Cours</span><br><strong>${courseInfo.titre}</strong></div>
            <div><span style="color:var(--text-tertiary);font-size:var(--text-sm)">Partie</span><br><strong>${courseInfo.partie}</strong></div>
            <div><span style="color:var(--text-tertiary);font-size:var(--text-sm)">Établissement</span><br><strong>${courseInfo.etablissement}</strong></div>
            <div><span style="color:var(--text-tertiary);font-size:var(--text-sm)">Niveau</span><br><strong>${courseInfo.niveau}</strong></div>
            <div><span style="color:var(--text-tertiary);font-size:var(--text-sm)">Professeur</span><br><strong>${courseInfo.professeur}</strong></div>
          </div>
        </div>
      </div>
    `;

    // Roadmap
    html += `
      <h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-2);letter-spacing:-0.025em">Parcours du cours</h2>
      <p style="color:var(--text-secondary);margin-bottom:var(--space-6);font-size:var(--text-sm)">
        Suivez les modules dans l'ordre. Chaque module se base sur le précédent.
      </p>
    `;

    // Roadmap visual (SVG) — split into two rows for 9 modules
    const row1 = modules.slice(0, 5);
    const row2 = modules.slice(5);
    html += `<div class="diagram-container scroll-reveal" style="padding:var(--space-8);margin-bottom:var(--space-8)">`;
    html += `<svg viewBox="0 0 900 ${row2.length > 0 ? 240 : 120}" style="width:100%;max-width:900px">`;
    row1.forEach((m, i) => {
      const x = 20 + i * 175;
      const color = this._colors[m.id] || 'var(--primary-500)';
      const progress = ProgressTracker.getModuleProgress(m.id, this._countSections(m));
      if (i > 0) html += `<line x1="${x - 130}" y1="50" x2="${x - 10}" y2="50" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="6,4"/>`;
      html += `<circle cx="${x + 30}" cy="50" r="24" fill="${progress === 100 ? 'var(--success-500)' : 'var(--bg-card)'}" stroke="${color}" stroke-width="2"/>`;
      html += `<text x="${x + 30}" y="54" text-anchor="middle" font-size="13" fill="var(--text-secondary)" font-family="var(--font-family)" font-weight="600">${(i + 1)}</text>`;
      const shortLabels = { introduction: 'Intro', modules_python: 'Modules', numpy: 'NumPy', pandas: 'Pandas', matplotlib: 'Matplotlib' };
      html += `<text x="${x + 30}" y="90" text-anchor="middle" font-size="11" fill="var(--text-secondary)" font-family="var(--font-family)">${shortLabels[m.id] || m.titre.split(' ').slice(0, 2).join(' ')}</text>`;
    });
    if (row2.length > 0) {
      html += `<line x1="${20 + 4 * 175 + 30}" y1="74" x2="${20 + (row2.length - 1) * 175 + 30}" y2="130" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="6,4" opacity="0.5"/>`;
      html += `<text x="10" y="145" font-size="10" fill="var(--text-tertiary)" font-family="var(--font-family)" font-weight="600" letter-spacing="0.05em">MACHINE LEARNING</text>`;
      row2.forEach((m, i) => {
        const x = 20 + i * 175;
        const color = this._colors[m.id] || 'var(--primary-500)';
        const progress = ProgressTracker.getModuleProgress(m.id, this._countSections(m));
        if (i > 0) html += `<line x1="${x - 130}" y1="170" x2="${x - 10}" y2="170" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="6,4"/>`;
        html += `<circle cx="${x + 30}" cy="170" r="24" fill="${progress === 100 ? 'var(--success-500)' : 'var(--bg-card)'}" stroke="${color}" stroke-width="2"/>`;
        html += `<text x="${x + 30}" y="174" text-anchor="middle" font-size="13" fill="var(--text-secondary)" font-family="var(--font-family)" font-weight="600">${row1.length + i + 1}</text>`;
        const shortML = { ml_part_1: 'Intro ML', ml_part_2: 'Supervisé', ml_part_3: 'Non-supervisé', ml_part_4: 'Renforcement' };
        html += `<text x="${x + 30}" y="210" text-anchor="middle" font-size="11" fill="var(--text-secondary)" font-family="var(--font-family)">${shortML[m.id] || m.titre.split(' ').slice(0, 2).join(' ')}</text>`;
      });
    }
    html += `</svg></div>`;


    // Module cards
    html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-6)" class="stagger-children">`;
    modules.forEach((m, idx) => {
      const icon = this._icons[m.id] || this._icons.default;
      const color = this._colors[m.id] || 'var(--primary-500)';
      const desc = this._descs[m.id] || m.titre;
      const sections = this._countSections(m);
      const progress = ProgressTracker.getModuleProgress(m.id, sections);

      html += `
        <div class="module-card scroll-reveal hover-lift" data-route="module/${m.id}">
          <div class="module-card-icon" style="background:${color}12;color:${color}">${icon}</div>
          <div class="module-card-title">${m.titre}</div>
          <div class="module-card-desc">${desc}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-2)">
            <span style="font-size:var(--text-xs);color:var(--text-tertiary)">${sections} section${sections > 1 ? 's' : ''}</span>
            <span style="font-size:var(--text-xs);font-weight:var(--weight-semibold);color:var(--primary-500)">${progress}%</span>
          </div>
          <div class="module-card-progress">
            <div class="module-card-progress-fill" style="width:${progress}%"></div>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    html += `</div>`;

    document.getElementById('content').innerHTML = html;

    // Click handlers for module cards
    document.querySelectorAll('.module-card').forEach(card => {
      card.addEventListener('click', () => {
        window.location.hash = card.dataset.route;
      });
    });

    setTimeout(() => ScrollReveal.observe(), 100);
  },

  _countSections(m) {
    if (m.sous_sections) return m.sous_sections.length;
    if (m.structures_principales) return m.structures_principales.length;
    if (m._data && m._data.sous_parties) return m._data.sous_parties.length;
    if (m._data && m._data.contenu) return 1;
    if (m.syntaxes_import) return 1;
    if (m.bibliotheques) return 1;
    if (m.types_graphiques) return m.types_graphiques.length;
    return 1;
  }
};
