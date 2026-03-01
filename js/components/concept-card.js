/* ── Concept Card — Progressive disclosure with visual-first approach ── */
const ConceptCard = {
  /* SVG icons for info boxes */
  _svgIcons: {
    definition: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    why: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    tip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    encourage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    microscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>'
  },

  create(title, icon, contentHtml, options = {}) {
    const id = 'card-' + Math.random().toString(36).substr(2, 9);
    const expanded = options.expanded || false;

    return `
      <div class="concept-card scroll-reveal ${expanded ? 'expanded' : ''}" id="${id}">
        <div class="concept-card-header" onclick="ConceptCard.toggle('${id}')">
          <div class="concept-card-icon">${icon}</div>
          <div class="concept-card-title">${title}</div>
          <span class="concept-card-toggle">${this._svgIcons.chevron}</span>
        </div>
        <div class="concept-card-body">
          <div style="padding-top:var(--space-4)">
            ${contentHtml}
          </div>
        </div>
      </div>
    `;
  },

  toggle(id) {
    const card = document.getElementById(id);
    if (card) card.classList.toggle('expanded');
  },

  // Create a "What is it?" definition box
  definition(text) {
    return `
      <div class="info-box definition">
        <span class="info-box-icon">${this._svgIcons.definition}</span>
        <div><strong>C'est quoi ?</strong><br>${text}</div>
      </div>
    `;
  },

  // Create a "Why?" box
  why(text) {
    return `
      <div class="info-box why">
        <span class="info-box-icon">${this._svgIcons.why}</span>
        <div><strong>Pourquoi c'est utile ?</strong><br>${text}</div>
      </div>
    `;
  },

  // Tip box
  tip(text) {
    return `
      <div class="info-box tip">
        <span class="info-box-icon">${this._svgIcons.tip}</span>
        <div><strong>Astuce :</strong> ${text}</div>
      </div>
    `;
  },

  // Warning box
  warning(text) {
    return `
      <div class="info-box warning">
        <span class="info-box-icon">${this._svgIcons.warning}</span>
        <div><strong>Attention :</strong> ${text}</div>
      </div>
    `;
  },

  // Encouraging message
  encourage(text) {
    return `
      <div class="info-box encourage">
        <span class="info-box-icon">${this._svgIcons.encourage}</span>
        <div>${text}</div>
      </div>
    `;
  },

  // Step-by-step breakdown
  steps(stepsArr) {
    return `
      <div style="margin:var(--space-4) 0">
        ${stepsArr.map((s, i) => `
          <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-3);align-items:flex-start" class="scroll-reveal">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--primary-500);color:white;display:flex;align-items:center;justify-content:center;font-size:var(--text-xs);font-weight:var(--weight-bold);flex-shrink:0">${i + 1}</div>
            <div style="padding-top:3px;font-size:var(--text-sm);line-height:var(--leading-relaxed)">${s}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // Collapsible advanced section
  advanced(title, contentHtml) {
    const id = 'adv-' + Math.random().toString(36).substr(2, 9);
    return `
      <div style="margin:var(--space-4) 0">
        <button class="collapsible-trigger" onclick="ConceptCard.toggleCollapsible('${id}', this)">
          <span class="arrow">&#9654;</span> ${title}
        </button>
        <div class="collapsible-content" id="${id}">
          ${contentHtml}
        </div>
      </div>
    `;
  },

  toggleCollapsible(id, btn) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle('open');
      btn.classList.toggle('open');
    }
  },

  // Mark section complete button
  completeButton(moduleId, sectionIndex) {
    const done = ProgressTracker.isComplete(moduleId, sectionIndex);
    const checkIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    return `
      <div style="text-align:center;margin:var(--space-6) 0">
        <button class="btn ${done ? 'btn-success' : 'btn-primary'}" id="complete-${moduleId}-${sectionIndex}"
          onclick="ConceptCard.markDone('${moduleId}', ${sectionIndex})">
          ${checkIcon} ${done ? 'Section terminée' : 'Marquer comme terminé'}
        </button>
      </div>
    `;
  },

  markDone(moduleId, sectionIndex) {
    ProgressTracker.markComplete(moduleId, sectionIndex);
    const btn = document.getElementById(`complete-${moduleId}-${sectionIndex}`);
    const checkIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    if (btn) {
      btn.className = 'btn btn-success';
      btn.innerHTML = checkIcon + ' Section terminée';
    }
    Sidebar.setActive(moduleId);
  }
};
