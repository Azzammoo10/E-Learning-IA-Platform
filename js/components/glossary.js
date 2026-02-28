/* ── Visual Glossary ── */
const Glossary = {
    terms: [
        { term: 'Array', def: 'Un tableau de données du même type, créé avec NumPy. Plus rapide qu\'une liste pour les calculs.' },
        { term: 'ndarray', def: 'Le nom technique d\'un array NumPy. "n-dimensional array" = tableau à N dimensions.' },
        { term: 'DataFrame', def: 'Un tableau 2D avec des colonnes nommées, créé avec Pandas. Comme une feuille Excel.' },
        { term: 'Series', def: 'Une seule colonne de données avec un index. C\'est un DataFrame avec une seule colonne.' },
        { term: 'Index', def: 'Le numéro ou l\'étiquette de chaque ligne. Commence à 0 par défaut.' },
        { term: 'Shape', def: 'La forme d\'un tableau : (lignes, colonnes). Ex: (3, 2) = 3 lignes, 2 colonnes.' },
        { term: 'Module', def: 'Un fichier Python (.py) contenant des fonctions réutilisables. Ex: numpy, pandas.' },
        { term: 'Import', def: 'Le mot-clé pour charger un module. Ex: import numpy as np.' },
        { term: 'dtype', def: 'Le type de données d\'un array (int, float, string...). Tous les éléments ont le même type.' },
        { term: 'Matplotlib', def: 'Bibliothèque pour créer des graphiques (courbes, barres, nuages de points...).' },
        { term: 'pyplot', def: 'Le sous-module de Matplotlib qu\'on utilise : import matplotlib.pyplot as plt.' },
        { term: 'plot()', def: 'Fonction pour tracer une courbe 2D. Ex: plt.plot(x, y).' },
        { term: 'scatter()', def: 'Fonction pour créer un nuage de points. Utile pour voir les relations entre données.' },
        { term: 'loc', def: 'Accès aux données par étiquette/nom. Ex: df.loc[5] = ligne avec index 5.' },
        { term: 'iloc', def: 'Accès aux données par position numérique. Ex: df.iloc[0] = première ligne.' },
        { term: 'CSV', def: 'Format de fichier texte où les données sont séparées par des virgules. Lisible par Pandas.' },
        { term: 'Reshape', def: 'Changer la forme d\'un array sans changer ses données. Ex: 1×6 → 2×3.' },
        { term: 'Vectoriel (calcul)', def: 'Opération appliquée à tous les éléments d\'un array en même temps. Ex: array + 1.' },
        // ML terms
        { term: 'Machine Learning', def: 'Donner à un ordinateur la capacité d\'apprendre à partir de données sans être explicitement programmé.' },
        { term: 'Apprentissage supervisé', def: 'L\'algorithme apprend avec des données étiquetées (avec les réponses). Ex: classification, régression.' },
        { term: 'Apprentissage non supervisé', def: 'L\'algorithme découvre des patterns dans des données non étiquetées (sans réponses). Ex: clustering.' },
        { term: 'Classification', def: 'Prédire une catégorie/classe. Ex: spam/pas spam, malade/sain.' },
        { term: 'Régression', def: 'Prédire une valeur continue (nombre). Ex: prix d\'une maison, température.' },
        { term: 'Régression linéaire', def: 'Modèle qui trouve la meilleure droite y = c + mx pour prédire une valeur à partir de données.' },
        { term: 'KNN', def: 'K Plus Proches Voisins. Classifie un point en regardant les K points les plus proches et en votant.' },
        { term: 'K-Means', def: 'Algorithme de clustering qui regroupe les données en K groupes autour de centroïdes.' },
        { term: 'Q-Learning', def: 'Algorithme d\'apprentissage par renforcement. L\'agent apprend les meilleures actions via une Q-Table.' },
        { term: 'Centroïde', def: 'Le point central (moyenne) d\'un cluster dans K-Means.' }
    ],

    init() {
        const btn = document.getElementById('glossaryBtn');
        const overlay = document.getElementById('glossaryOverlay');
        const close = document.getElementById('glossaryClose');
        const search = document.getElementById('glossarySearch');

        btn.addEventListener('click', () => {
            this.renderList('');
            overlay.classList.add('visible');
            search.value = '';
            search.focus();
        });

        close.addEventListener('click', () => overlay.classList.remove('visible'));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('visible'); });
        search.addEventListener('input', (e) => this.renderList(e.target.value));
    },

    renderList(filter) {
        const list = document.getElementById('glossaryList');
        const filtered = filter
            ? this.terms.filter(t => t.term.toLowerCase().includes(filter.toLowerCase()) || t.def.toLowerCase().includes(filter.toLowerCase()))
            : this.terms;

        list.innerHTML = filtered.map(t => `
      <div class="glossary-item">
        <div class="glossary-item-term">${t.term}</div>
        <div class="glossary-item-def">${t.def}</div>
      </div>
    `).join('');
    }
};
