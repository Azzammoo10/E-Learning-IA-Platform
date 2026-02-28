/* ── Flashcard Mode ── */
const Flashcard = {
    cards: [],
    currentIndex: 0,

    generateCards() {
        this.cards = [
            { front: "Qu'est-ce qu'un array NumPy ?", back: "Un tableau de données du même type, optimisé pour le calcul numérique rapide. C'est comme une liste Python mais beaucoup plus rapide." },
            { front: "Différence entre liste Python et array NumPy ?", back: "Une liste peut mélanger les types (nombres, texte...), un array ne contient qu'un seul type. L'array est beaucoup plus rapide pour les calculs." },
            { front: "Que fait np.arange(1, 10, 2) ?", back: "Crée un array : [1, 3, 5, 7, 9] — de 1 à 10 (exclu), avec un pas de 2." },
            { front: "Que retourne .shape ?", back: "Un tuple indiquant les dimensions du tableau. Ex: (3, 2) = 3 lignes, 2 colonnes." },
            { front: "Que signifie 'import numpy as np' ?", back: "On importe la bibliothèque NumPy et on lui donne le surnom 'np' pour écrire moins de code." },
            { front: "C'est quoi une Series Pandas ?", back: "C'est comme UNE colonne d'un tableau Excel : une liste de valeurs avec un index (numéro de ligne)." },
            { front: "C'est quoi un DataFrame ?", back: "C'est un tableau complet (comme une feuille Excel) avec des lignes, des colonnes et des en-têtes." },
            { front: "Différence entre loc et iloc ?", back: "loc utilise les noms/étiquettes (ex: df.loc[5]). iloc utilise la position numérique (ex: df.iloc[0] = première ligne)." },
            { front: "Que fait plt.show() ?", back: "Affiche le graphique à l'écran. Sans cette ligne, le graphique est créé mais pas visible." },
            { front: "Que signifie 'ro--' dans plt.plot(x, y, 'ro--') ?", back: "r = rouge, o = marqueurs cercle, -- = ligne en tirets." },
            { front: "Que fait df.describe() ?", back: "Affiche un résumé statistique : moyenne, min, max, écart-type... pour chaque colonne numérique." },
            { front: "Comment lire un fichier CSV avec Pandas ?", back: "df = pd.read_csv('fichier.csv') — Pandas lit le fichier et crée un DataFrame automatiquement." },
            // ML Flashcards
            { front: "Qu'est-ce que le Machine Learning ?", back: "C'est donner à un ordinateur la capacité d'apprendre à partir de données, sans être programmé explicitement pour chaque cas." },
            { front: "Les 3 types d'apprentissage ?", back: "1) Supervisé (avec étiquettes) 2) Non supervisé (sans étiquettes) 3) Par renforcement (essais/erreurs + récompenses)" },
            { front: "Classification vs Régression ?", back: "Classification → prédit une catégorie (spam/pas spam). Régression → prédit une valeur continue (prix, température)." },
            { front: "C'est quoi KNN ?", back: "K Plus Proches Voisins : on regarde les K points les plus proches d'un nouveau point et on prédit sa classe par vote majoritaire." },
            { front: "Formule y = c + mx ?", back: "C'est l'équation de la régression linéaire. m = pente de la droite, c = point d'intersection avec l'axe Y." },
            { front: "Que fait K-Means ?", back: "Il regroupe les données en K clusters homogènes en calculant la distance de chaque point aux centroïdes et en les réassignant." },
            { front: "En Q-Learning, que stocke la Q-Table ?", back: "Q(s,a) = la récompense totale espérée pour chaque paire (état, action). L'agent choisit l'action avec la valeur Q la plus élevée." },
            { front: "Que signifie ε (epsilon) en Q-Learning ?", back: "ε contrôle l'équilibre exploration/exploitation. ε=0 → toujours exploiter, ε=1 → toujours explorer. Souvent ε=0.2 (bon équilibre)." },
            { front: "MSE et R² en régression ?", back: "MSE = erreur moyenne au carré (plus bas = mieux). R² = coefficient de détermination (plus haut = mieux, max 1)." }
        ];
    },

    render() {
        if (this.cards.length === 0) this.generateCards();
        this.currentIndex = 0;

        let html = `<div class="page-enter">
      <h1 class="section-title">🃏 Mode Flashcards</h1>
      <p class="section-subtitle">Cliquez sur la carte pour voir la réponse. Utilisez les flèches pour naviguer.</p>

      <div style="text-align:center;margin:var(--space-2) 0">
        <span id="fcCounter" style="font-size:var(--text-sm);color:var(--text-tertiary)">1 / ${this.cards.length}</span>
      </div>

      <div class="flashcard-container" id="fcContainer" onclick="Flashcard.flip()">
        <div class="flashcard-inner">
          <div class="flashcard-front" id="fcFront">${this.cards[0].front}</div>
          <div class="flashcard-back" id="fcBack">${this.cards[0].back}</div>
        </div>
      </div>

      <div style="display:flex;justify-content:center;gap:var(--space-4);margin-top:var(--space-6)">
        <button class="btn btn-secondary" onclick="Flashcard.prev()">← Précédent</button>
        <button class="btn btn-primary" onclick="Flashcard.next()">Suivant →</button>
      </div>
    </div>`;

        document.getElementById('content').innerHTML = html;
    },

    flip() {
        document.getElementById('fcContainer').classList.toggle('flipped');
    },

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this._update();
    },

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this._update();
    },

    _update() {
        const card = this.cards[this.currentIndex];
        document.getElementById('fcContainer').classList.remove('flipped');
        setTimeout(() => {
            document.getElementById('fcFront').textContent = card.front;
            document.getElementById('fcBack').textContent = card.back;
            document.getElementById('fcCounter').textContent = `${this.currentIndex + 1} / ${this.cards.length}`;
        }, 150);
    }
};

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('fcContainer')) return;
    if (e.key === 'ArrowRight') Flashcard.next();
    if (e.key === 'ArrowLeft') Flashcard.prev();
    if (e.key === ' ') { e.preventDefault(); Flashcard.flip(); }
});
