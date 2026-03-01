/* ── Code Block — Syntax highlighted with copy + output ── */
const CodeBlock = {
  create(code, output, options = {}) {
    const id = 'code-' + Math.random().toString(36).substr(2, 9);
    const highlighted = SyntaxHighlighter.highlight(code);
    const lines = highlighted.split('\n');

    let html = `<div class="code-block-wrapper">`;

    // Header
    html += `
      <div class="code-block-header">
        <span class="code-block-lang">Python</span>
        <div class="code-block-actions">
          <button class="code-copy-btn" onclick="CodeBlock.copy('${id}', this)" title="Copier le code">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copier
          </button>
        </div>
      </div>
    `;

    // Code body
    html += `<div class="code-block-body"><pre id="${id}"><code>`;
    lines.forEach((line, i) => {
      html += `<div class="code-line" data-line="${i}">`;
      html += `<span class="code-line-num">${i + 1}</span>`;
      html += `<span class="code-line-content">${line}</span>`;
      html += `</div>`;
    });
    html += `</code></pre></div>`;

    // Output
    if (output !== undefined && output !== null && output !== '') {
      html += `
        <div class="code-output">
          <div class="code-output-label">▶ Résultat :</div>
          <pre>${this._escapeHtml(String(output))}</pre>
        </div>
      `;
    }

    // Step explanation if provided
    if (options.explanation) {
      html += `
        <div class="step-explanation">
          ${options.explanation}
        </div>
      `;
    }

    html += `</div>`;
    return html;
  },

  copy(id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copié !';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copier';
        btn.classList.remove('copied');
      }, 2000);
    });
  },

  _escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};
