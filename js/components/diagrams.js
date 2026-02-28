/* ── SVG Diagrams — Visual intelligence ── */
const Diagrams = {
  arrayMemory1D() {
    const values = [5, 6, 23];
    const w = 360, h = 140;
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px">`;
    svg += `<text x="10" y="25" font-size="14" fill="var(--text-primary)" font-family="var(--font-family)" font-weight="600">Array 1D en mémoire</text>`;
    // Cells
    values.forEach((v, i) => {
      const x = 40 + i * 100;
      svg += `<rect x="${x}" y="45" width="80" height="50" rx="8" fill="var(--primary-50)" stroke="var(--primary-400)" stroke-width="2">
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${i * 0.15}s" fill="freeze"/>
      </rect>`;
      svg += `<text x="${x + 40}" y="76" text-anchor="middle" font-size="18" fill="var(--primary-700)" font-family="var(--font-mono)" font-weight="600">${v}</text>`;
      svg += `<text x="${x + 40}" y="115" text-anchor="middle" font-size="11" fill="var(--text-tertiary)" font-family="var(--font-mono)">[${i}]</text>`;
    });
    svg += `</svg>`;
    return `<div class="diagram-container scroll-reveal">${svg}<div class="diagram-label">Chaque case a un numéro (index) qui commence à 0</div></div>`;
  },

  arrayMemory2D() {
    const data = [[1, 2], [3, 4], [5, 6]];
    const w = 300, h = 230;
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px">`;
    svg += `<text x="10" y="22" font-size="14" fill="var(--text-primary)" font-family="var(--font-family)" font-weight="600">Array 2D (3 lignes × 2 colonnes)</text>`;
    // Column headers
    svg += `<text x="115" y="50" text-anchor="middle" font-size="11" fill="var(--text-tertiary)" font-family="var(--font-mono)">col 0</text>`;
    svg += `<text x="205" y="50" text-anchor="middle" font-size="11" fill="var(--text-tertiary)" font-family="var(--font-mono)">col 1</text>`;
    data.forEach((row, r) => {
      const y = 60 + r * 52;
      svg += `<text x="40" y="${y + 32}" text-anchor="middle" font-size="11" fill="var(--text-tertiary)" font-family="var(--font-mono)">lig ${r}</text>`;
      row.forEach((v, c) => {
        const x = 75 + c * 90;
        const colors = ['var(--primary-50)', 'var(--accent-50)'];
        const strokes = ['var(--primary-400)', 'var(--accent-400)'];
        svg += `<rect x="${x}" y="${y}" width="80" height="44" rx="6" fill="${colors[c]}" stroke="${strokes[c]}" stroke-width="2"/>`;
        svg += `<text x="${x + 40}" y="${y + 28}" text-anchor="middle" font-size="16" fill="var(--text-primary)" font-family="var(--font-mono)" font-weight="600">${v}</text>`;
      });
    });
    svg += `</svg>`;
    return `<div class="diagram-container scroll-reveal">${svg}<div class="diagram-label">Accès : array[ligne, colonne] → ex: array[2,1] = 6</div></div>`;
  },

  listVsArray() {
    return `
      <div class="scroll-reveal" style="margin:var(--space-4) 0">
        <table class="comparison-table">
          <tr><th>Caractéristique</th><th>Liste Python 📋</th><th>Array NumPy 🔢</th></tr>
          <tr><td>Types de données</td><td>Peut mélanger (int, str, bool...)</td><td>Un seul type (homogène)</td></tr>
          <tr><td>Vitesse</td><td>Lente pour les calculs</td><td>Très rapide ⚡</td></tr>
          <tr><td>Opérations math</td><td>Pas directement</td><td>Oui ! (+, -, *, / sur chaque élément)</td></tr>
          <tr><td>Quand utiliser ?</td><td>Données variées</td><td>Calculs numériques</td></tr>
        </table>
      </div>
    `;
  },

  dataframeSchema() {
    const w = 420, h = 220;
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px">`;
    svg += `<text x="10" y="22" font-size="14" fill="var(--text-primary)" font-family="var(--font-family)" font-weight="600">Structure d'un DataFrame</text>`;
    // Headers
    const cols = ['ID', 'Prénom', 'Âge'];
    const data = [['1', 'Nabil', '21'], ['2', 'Mourad', '19'], ['3', 'Nisrine', '20']];
    // Index column
    svg += `<text x="35" y="55" text-anchor="middle" font-size="10" fill="var(--text-tertiary)" font-family="var(--font-family)" font-weight="600">Index</text>`;
    // Column headers
    cols.forEach((c, i) => {
      const x = 85 + i * 110;
      svg += `<rect x="${x}" y="40" width="100" height="28" rx="6" fill="var(--primary-500)"/>`;
      svg += `<text x="${x + 50}" y="59" text-anchor="middle" font-size="12" fill="white" font-family="var(--font-family)" font-weight="600">${c}</text>`;
    });
    // Data rows
    data.forEach((row, r) => {
      const y = 75 + r * 40;
      svg += `<text x="35" y="${y + 22}" text-anchor="middle" font-size="12" fill="var(--primary-500)" font-family="var(--font-mono)" font-weight="600">${r}</text>`;
      row.forEach((v, c) => {
        const x = 85 + c * 110;
        svg += `<rect x="${x}" y="${y}" width="100" height="32" rx="4" fill="var(--bg-card)" stroke="var(--border-light)" stroke-width="1"/>`;
        svg += `<text x="${x + 50}" y="${y + 21}" text-anchor="middle" font-size="13" fill="var(--text-primary)" font-family="var(--font-mono)">${v}</text>`;
      });
    });
    // Labels
    svg += `<text x="210" y="210" text-anchor="middle" font-size="11" fill="var(--text-tertiary)" font-family="var(--font-family)">↑ Colonnes = variables | ← Index = numéro de ligne</text>`;
    svg += `</svg>`;
    return `<div class="diagram-container scroll-reveal">${svg}<div class="diagram-label">Un DataFrame = un tableau avec des lignes indexées et des colonnes nommées</div></div>`;
  },

  seriesVsDataframe() {
    return `
      <div class="scroll-reveal" style="margin:var(--space-4) 0">
        <table class="comparison-table">
          <tr><th>Caractéristique</th><th>Series 📊</th><th>DataFrame 📋</th></tr>
          <tr><td>Dimensions</td><td>1D (une colonne)</td><td>2D (tableau complet)</td></tr>
          <tr><td>Analogie</td><td>Une colonne Excel</td><td>Une feuille Excel entière</td></tr>
          <tr><td>Création</td><td>pd.Series([1, 2, 3])</td><td>pd.DataFrame({'A': [1,2], 'B': [3,4]})</td></tr>
          <tr><td>Types</td><td>Un seul type</td><td>Type différent par colonne</td></tr>
        </table>
      </div>
    `;
  },

  plottingPipeline() {
    const w = 600, h = 100;
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px">`;
    const steps = [
      { icon: '📊', label: 'Données', color: 'var(--primary-400)' },
      { icon: '⚙️', label: 'plt.plot()', color: 'var(--accent-400)' },
      { icon: '🎨', label: 'Style', color: 'var(--purple-400)' },
      { icon: '📝', label: 'Labels', color: 'var(--warning-400)' },
      { icon: '👁️', label: 'plt.show()', color: 'var(--success-400)' }
    ];
    steps.forEach((s, i) => {
      const x = 10 + i * 120;
      if (i > 0) {
        svg += `<line x1="${x - 18}" y1="40" x2="${x + 5}" y2="40" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="4,3"/>`;
        svg += `<polygon points="${x + 5},35 ${x + 12},40 ${x + 5},45" fill="var(--border-medium)"/>`;
      }
      svg += `<rect x="${x + 15}" y="15" width="90" height="50" rx="10" fill="var(--bg-card)" stroke="${s.color}" stroke-width="2"/>`;
      svg += `<text x="${x + 60}" y="38" text-anchor="middle" font-size="16">${s.icon}</text>`;
      svg += `<text x="${x + 60}" y="55" text-anchor="middle" font-size="10" fill="var(--text-secondary)" font-family="var(--font-family)">${s.label}</text>`;
      svg += `<text x="${x + 60}" y="85" text-anchor="middle" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-family)">Étape ${i + 1}</text>`;
    });
    svg += `</svg>`;
    return `<div class="diagram-container scroll-reveal">${svg}<div class="diagram-label">Le processus de création d'un graphique Matplotlib</div></div>`;
  },

  locVsIloc() {
    return `
      <div class="scroll-reveal" style="margin:var(--space-4) 0">
        <table class="comparison-table">
          <tr><th></th><th>loc 🏷️</th><th>iloc 🔢</th></tr>
          <tr><td>Signification</td><td>Location (par étiquette)</td><td>Integer location (par position)</td></tr>
          <tr><td>Utilise</td><td>Les noms / labels</td><td>Les numéros de position</td></tr>
          <tr><td>Exemple</td><td>df.loc[5] → ligne avec index 5</td><td>df.iloc[0] → première ligne</td></tr>
          <tr><td>Plage</td><td>df.loc[0:5] → inclut 5</td><td>df.iloc[0:5] → exclut 5</td></tr>
        </table>
      </div>
    `;
  },

  importStyles() {
    return `
      <div class="scroll-reveal" style="margin:var(--space-4) 0">
        <table class="comparison-table">
          <tr><th>Syntaxe</th><th>Quand l'utiliser ?</th><th>Exemple</th></tr>
          <tr><td><code class="inline">import module</code></td><td>Quand on utilise beaucoup de fonctions du module</td><td>import math → math.sqrt(25)</td></tr>
          <tr><td><code class="inline">import module as alias</code></td><td>Quand le nom est long</td><td>import numpy as np → np.array()</td></tr>
          <tr><td><code class="inline">from module import func</code></td><td>Quand on a besoin d'une seule fonction</td><td>from math import sqrt → sqrt(25)</td></tr>
          <tr><td><code class="inline">from module import *</code></td><td>⚠️ À éviter ! Risque de conflits</td><td>from numpy import *</td></tr>
        </table>
      </div>
    `;
  },

  // ── ML Diagrams ──

  mlPipeline(steps) {
    const w = 700, h = 80;
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px">`;
    const icons = ['📋', '⚙️', '🔄', '🚀'];
    steps.forEach((s, i) => {
      const x = 10 + i * 175;
      if (i > 0) {
        svg += `<line x1="${x - 25}" y1="30" x2="${x + 5}" y2="30" stroke="var(--border-medium)" stroke-width="2" stroke-dasharray="4,3"/>`;
        svg += `<polygon points="${x + 5},25 ${x + 12},30 ${x + 5},35" fill="var(--border-medium)"/>`;
      }
      svg += `<rect x="${x + 15}" y="8" width="140" height="44" rx="10" fill="var(--bg-card)" stroke="var(--primary-400)" stroke-width="2"/>`;
      svg += `<text x="${x + 85}" y="28" text-anchor="middle" font-size="13">${icons[i] || '📌'}</text>`;
      svg += `<text x="${x + 85}" y="44" text-anchor="middle" font-size="9" fill="var(--text-secondary)" font-family="var(--font-family)">Étape ${i + 1}</text>`;
      svg += `<text x="${x + 85}" y="68" text-anchor="middle" font-size="9" fill="var(--text-tertiary)" font-family="var(--font-family)">${s.nom.split(' ').slice(0, 3).join(' ')}</text>`;
    });
    svg += `</svg>`;
    return `<div class="diagram-container scroll-reveal">${svg}</div>`;
  },

  classificationVsRegression() {
    return `
            <div class="scroll-reveal" style="margin:var(--space-4) 0">
                <table class="comparison-table">
                    <tr><th></th><th>Classification 🏷️</th><th>Régression 📈</th></tr>
                    <tr><td>Prédit</td><td>Une catégorie / classe</td><td>Une valeur numérique continue</td></tr>
                    <tr><td>Sortie</td><td>Oui/Non, Spam/Pas spam, 0/1</td><td>Prix, température, salaire</td></tr>
                    <tr><td>Exemple</td><td>Cet email est-il spam ?</td><td>Quel sera le prix de la maison ?</td></tr>
                    <tr><td>Algorithmes</td><td>KNN, Arbre de décision, SVM</td><td>Régression linéaire, polynomiale</td></tr>
                </table>
            </div>
        `;
  },

  kMeansPipeline(steps) {
    const w = 700, h = 80;
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px">`;
    const icons = ['🎯', '📍', '📏', '🔄', '📊', '✅'];
    const shortSteps = steps.slice(0, Math.min(steps.length, 6));
    const spacing = w / shortSteps.length;
    shortSteps.forEach((s, i) => {
      const x = 5 + i * spacing;
      const sw = spacing - 10;
      if (i > 0) {
        svg += `<line x1="${x - 10}" y1="30" x2="${x + 5}" y2="30" stroke="var(--accent-400)" stroke-width="2" stroke-dasharray="4,3"/>`;
      }
      svg += `<rect x="${x + 5}" y="8" width="${sw}" height="44" rx="8" fill="var(--bg-card)" stroke="var(--accent-400)" stroke-width="2"/>`;
      svg += `<text x="${x + sw / 2 + 5}" y="28" text-anchor="middle" font-size="14">${icons[i] || '📌'}</text>`;
      svg += `<text x="${x + sw / 2 + 5}" y="42" text-anchor="middle" font-size="8" fill="var(--text-secondary)" font-family="var(--font-family)">Ét. ${i + 1}</text>`;
    });
    svg += `</svg>`;
    return `<div class="diagram-container scroll-reveal">${svg}</div>`;
  },

  rlCycle(elements) {
    const w = 450, h = 200;
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px">`;
    // Agent box
    svg += `<rect x="30" y="20" width="140" height="60" rx="12" fill="var(--primary-50)" stroke="var(--primary-400)" stroke-width="2"/>`;
    svg += `<text x="100" y="45" text-anchor="middle" font-size="16">🤖</text>`;
    svg += `<text x="100" y="65" text-anchor="middle" font-size="12" fill="var(--primary-700)" font-family="var(--font-family)" font-weight="600">Agent</text>`;
    // Environment box
    svg += `<rect x="280" y="20" width="140" height="60" rx="12" fill="var(--accent-50)" stroke="var(--accent-400)" stroke-width="2"/>`;
    svg += `<text x="350" y="45" text-anchor="middle" font-size="16">🌍</text>`;
    svg += `<text x="350" y="65" text-anchor="middle" font-size="12" fill="var(--accent-700)" font-family="var(--font-family)" font-weight="600">Environnement</text>`;
    // Action arrow (agent → env)
    svg += `<line x1="170" y1="40" x2="275" y2="40" stroke="var(--success-500)" stroke-width="2"/>`;
    svg += `<polygon points="275,35 282,40 275,45" fill="var(--success-500)"/>`;
    svg += `<text x="225" y="32" text-anchor="middle" font-size="10" fill="var(--success-600)" font-family="var(--font-family)">Action (a)</text>`;
    // Reward arrow (env → agent, below)
    svg += `<path d="M 350,85 L 350,140 L 100,140 L 100,85" fill="none" stroke="var(--warning-500)" stroke-width="2" stroke-dasharray="6,3"/>`;
    svg += `<polygon points="95,85 100,77 105,85" fill="var(--warning-500)"/>`;
    svg += `<text x="225" y="155" text-anchor="middle" font-size="10" fill="var(--warning-600)" font-family="var(--font-family)">Récompense (r) + Nouvel état (s')</text>`;
    // State label
    svg += `<text x="225" y="180" text-anchor="middle" font-size="10" fill="var(--text-tertiary)" font-family="var(--font-family)">L'agent choisit une action → observe le résultat → s'améliore</text>`;
    svg += `</svg>`;
    return `<div class="diagram-container scroll-reveal">${svg}<div class="diagram-label">Le cycle de l'apprentissage par renforcement</div></div>`;
  },

  qLearningGrid(example) {
    const w = 320, h = 320;
    const cellSize = 70;
    const offset = 20;
    let svg = `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px">`;
    // Grid
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const x = offset + c * cellSize;
        const y = offset + r * cellSize;
        let fill = 'var(--bg-card)';
        let stroke = 'var(--border-medium)';
        // Start
        if (r === example.depart[0] && c === example.depart[1]) {
          fill = 'var(--success-50)'; stroke = 'var(--success-400)';
        }
        // Goal
        if (r === example.objectif[0] && c === example.objectif[1]) {
          fill = 'var(--warning-50)'; stroke = 'var(--warning-400)';
        }
        // Blocked
        if (r === example.case_interdite[0] && c === example.case_interdite[1]) {
          fill = 'var(--error-50)'; stroke = 'var(--error-400)';
        }
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        // Labels
        if (r === example.depart[0] && c === example.depart[1]) {
          svg += `<text x="${x + cellSize / 2}" y="${y + cellSize / 2 + 5}" text-anchor="middle" font-size="20">🟢</text>`;
        } else if (r === example.objectif[0] && c === example.objectif[1]) {
          svg += `<text x="${x + cellSize / 2}" y="${y + cellSize / 2 + 5}" text-anchor="middle" font-size="20">🏆</text>`;
        } else if (r === example.case_interdite[0] && c === example.case_interdite[1]) {
          svg += `<text x="${x + cellSize / 2}" y="${y + cellSize / 2 + 5}" text-anchor="middle" font-size="20">🚫</text>`;
        }
        // Coordinates
        svg += `<text x="${x + 5}" y="${y + 14}" font-size="8" fill="var(--text-tertiary)" font-family="var(--font-mono)">${r},${c}</text>`;
      }
    }
    // Draw optimal path
    if (example.chemin_optimal) {
      for (let i = 0; i < example.chemin_optimal.length - 1; i++) {
        const [r1, c1] = example.chemin_optimal[i];
        const [r2, c2] = example.chemin_optimal[i + 1];
        const x1 = offset + c1 * cellSize + cellSize / 2;
        const y1 = offset + r1 * cellSize + cellSize / 2;
        const x2 = offset + c2 * cellSize + cellSize / 2;
        const y2 = offset + r2 * cellSize + cellSize / 2;
        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--primary-500)" stroke-width="3" opacity="0.7" stroke-dasharray="6,3"/>`;
      }
    }
    svg += `</svg>`;
    return `<div class="diagram-container scroll-reveal">${svg}<div class="diagram-label">🟢 Départ → 🏆 Objectif | 🚫 Case interdite | --- Chemin optimal</div></div>`;
  }
};
