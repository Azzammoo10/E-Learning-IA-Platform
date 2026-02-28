/* ── Concept Card — Progressive disclosure with visual-first approach ── */
const ConceptCard = {
    create(title, icon, contentHtml, options = {}) {
        const id = 'card-' + Math.random().toString(36).substr(2, 9);
        const expanded = options.expanded || false;

        return `
      <div class="concept-card scroll-reveal ${expanded ? 'expanded' : ''}" id="${id}">
        <div class="concept-card-header" onclick="ConceptCard.toggle('${id}')">
          <div class="concept-card-icon">${icon}</div>
          <div class="concept-card-title">${title}</div>
          <span class="concept-card-toggle">▼</span>
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
        <span class="info-box-icon">🤔</span>
        <div><strong>C'est quoi ?</strong><br>${text}</div>
      </div>
    `;
    },

    // Create a "Why?" box
    why(text) {
        return `
      <div class="info-box why">
        <span class="info-box-icon">🎯</span>
        <div><strong>Pourquoi c'est utile ?</strong><br>${text}</div>
      </div>
    `;
    },

    // Tip box
    tip(text) {
        return `
      <div class="info-box tip">
        <span class="info-box-icon">💡</span>
        <div><strong>Astuce :</strong> ${text}</div>
      </div>
    `;
    },

    // Warning box
    warning(text) {
        return `
      <div class="info-box warning">
        <span class="info-box-icon">⚠️</span>
        <div><strong>Attention :</strong> ${text}</div>
      </div>
    `;
    },

    // Encouraging message
    encourage(text) {
        return `
      <div class="info-box encourage">
        <span class="info-box-icon">🌟</span>
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
          <span class="arrow">▶</span> 🔬 ${title}
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
        return `
      <div style="text-align:center;margin:var(--space-6) 0">
        <button class="btn ${done ? 'btn-success' : 'btn-primary'}" id="complete-${moduleId}-${sectionIndex}"
          onclick="ConceptCard.markDone('${moduleId}', ${sectionIndex})">
          ${done ? '✅ Section terminée' : '✅ Marquer comme terminé'}
        </button>
      </div>
    `;
    },

    markDone(moduleId, sectionIndex) {
        ProgressTracker.markComplete(moduleId, sectionIndex);
        const btn = document.getElementById(`complete-${moduleId}-${sectionIndex}`);
        if (btn) {
            btn.className = 'btn btn-success';
            btn.innerHTML = '✅ Section terminée';
        }
        Sidebar.setActive(moduleId);
    }
};
