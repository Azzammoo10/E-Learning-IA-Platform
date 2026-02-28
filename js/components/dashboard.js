/* ── Dashboard — Welcome + Course Roadmap ── */
const Dashboard = {
  render(courseInfo, modules) {
    const icons = { introduction: '🚀', modules_python: '📦', numpy: '🔢', pandas: '🐼', matplotlib: '📊', ml_part_1: '🤖', ml_part_2: '📈', ml_part_3: '🔗', ml_part_4: '🎮' };
    const colors = {
      introduction: 'var(--accent-500)',
      modules_python: 'var(--purple-500)',
      numpy: 'var(--primary-500)',
      pandas: 'var(--success-500)',
      matplotlib: 'var(--warning-500)',
      ml_part_1: 'var(--purple-500)',
      ml_part_2: 'var(--primary-500)',
      ml_part_3: 'var(--accent-500)',
      ml_part_4: 'var(--error-500)'
    };
    const descs = {
      introduction: 'Découvrez les outils Python pour analyser des données',
      modules_python: 'Apprenez à utiliser les modules et bibliothèques',
      numpy: 'Maîtrisez les tableaux et le calcul numérique',
      pandas: 'Manipulez et analysez des données structurées',
      matplotlib: 'Créez des graphiques et visualisations',
      ml_part_1: 'Découvrez les bases du Machine Learning',
      ml_part_2: 'Régression linéaire, KNN et classification',
      ml_part_3: 'Clustering et algorithme K-Means',
      ml_part_4: 'Q-Learning et prise de décision'
    };

    let html = `<div class="page-enter">`;

    // Welcome banner
    html += `
      <div style="margin-bottom:var(--space-10)">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-2)">
          <span style="font-size:2rem">👋</span>
          <h1 class="section-title" style="margin:0">Bienvenue !</h1>
        </div>
        <p class="section-subtitle" style="margin-bottom:var(--space-4)">
          Ce cours vous accompagne pas à pas dans l'analyse des données avec Python.
          <strong>Pas besoin d'être un expert</strong> — on part de zéro, ensemble.
        </p>
        <div class="info-box encourage">
          <span class="info-box-icon">💡</span>
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
          <div class="concept-card-icon">📋</div>
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
      <h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-2)">🗺️ Parcours du cours</h2>
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
      const color = colors[m.id] || 'var(--primary-500)';
      const progress = ProgressTracker.getModuleProgress(m.id, this._countSections(m));
      if (i > 0) html += `<line x1="${x - 130}" y1="50" x2="${x - 10}" y2="50" stroke="var(--border-medium)" stroke-width="3" stroke-dasharray="8,4"/>`;
      html += `<circle cx="${x + 30}" cy="50" r="26" fill="${progress === 100 ? 'var(--success-500)' : 'var(--bg-card)'}" stroke="${color}" stroke-width="3"/>`;
      html += `<text x="${x + 30}" y="55" text-anchor="middle" font-size="16">${icons[m.id] || '📘'}</text>`;
      const shortLabels = { introduction: 'Intro', modules_python: 'Modules', numpy: 'NumPy', pandas: 'Pandas', matplotlib: 'Matplotlib' };
      html += `<text x="${x + 30}" y="95" text-anchor="middle" font-size="11" fill="var(--text-secondary)" font-family="var(--font-family)">${shortLabels[m.id] || m.titre.split(' ').slice(0, 2).join(' ')}</text>`;
    });
    if (row2.length > 0) {
      // Connector between rows
      html += `<line x1="${20 + 4 * 175 + 30}" y1="76" x2="${20 + (row2.length - 1) * 175 + 30}" y2="130" stroke="var(--border-medium)" stroke-width="3" stroke-dasharray="8,4" opacity="0.5"/>`;
      // ML section label
      html += `<text x="10" y="145" font-size="10" fill="var(--text-tertiary)" font-family="var(--font-family)" font-weight="600">MACHINE LEARNING</text>`;
      row2.forEach((m, i) => {
        const x = 20 + i * 175;
        const color = colors[m.id] || 'var(--primary-500)';
        const progress = ProgressTracker.getModuleProgress(m.id, this._countSections(m));
        if (i > 0) html += `<line x1="${x - 130}" y1="170" x2="${x - 10}" y2="170" stroke="var(--border-medium)" stroke-width="3" stroke-dasharray="8,4"/>`;
        html += `<circle cx="${x + 30}" cy="170" r="26" fill="${progress === 100 ? 'var(--success-500)' : 'var(--bg-card)'}" stroke="${color}" stroke-width="3"/>`;
        html += `<text x="${x + 30}" y="175" text-anchor="middle" font-size="16">${icons[m.id] || '📘'}</text>`;
        const shortML = { ml_part_1: 'Intro ML', ml_part_2: 'Supervisé', ml_part_3: 'Non-supervisé', ml_part_4: 'Renforcement' };
        html += `<text x="${x + 30}" y="215" text-anchor="middle" font-size="11" fill="var(--text-secondary)" font-family="var(--font-family)">${shortML[m.id] || m.titre.split(' ').slice(0, 2).join(' ')}</text>`;
      });
    }
    html += `</svg></div>`;


    // Module cards
    html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-6)" class="stagger-children">`;
    modules.forEach((m, idx) => {
      const icon = icons[m.id] || '📘';
      const color = colors[m.id] || 'var(--primary-500)';
      const desc = descs[m.id] || m.titre;
      const sections = this._countSections(m);
      const progress = ProgressTracker.getModuleProgress(m.id, sections);

      html += `
        <div class="module-card scroll-reveal hover-lift" data-route="module/${m.id}">
          <div class="module-card-icon" style="background:${color}15;color:${color}">${icon}</div>
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
