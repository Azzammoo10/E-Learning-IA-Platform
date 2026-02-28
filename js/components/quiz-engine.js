/* ── Quiz Engine — Micro-quizzes with feedback ── */
const QuizEngine = {
    quizzes: {
        introduction: [
            {
                q: "Quelle bibliothèque Python est spécialisée dans le calcul numérique avec des tableaux ?",
                options: ["Pandas", "NumPy", "Matplotlib", "SciPy"],
                correct: 1,
                feedback: "NumPy (Numerical Python) est LA bibliothèque pour le calcul numérique. Elle offre des tableaux rapides et des fonctions mathématiques."
            }
        ],
        modules_python: [
            {
                q: "Quelle est la bonne syntaxe pour importer NumPy avec l'alias 'np' ?",
                options: ["from numpy import np", "import numpy as np", "import np from numpy", "using numpy as np"],
                correct: 1,
                feedback: "La syntaxe 'import numpy as np' permet d'utiliser np.array() au lieu de numpy.array() — c'est plus court et c'est la convention standard."
            },
            {
                q: "Que fait 'from math import sqrt' ?",
                options: ["Importe tout le module math", "Importe uniquement la fonction sqrt", "Crée un alias pour math", "Installe le module math"],
                correct: 1,
                feedback: "Cette syntaxe importe seulement la fonction sqrt. Vous pouvez ensuite l'utiliser directement : sqrt(25) → 5.0"
            }
        ],
        numpy: [
            {
                q: "Que se passe-t-il quand on crée np.array([1, 2, 'texte']) ?",
                options: ["Erreur", "Tout devient du texte (string)", "Les nombres restent des nombres", "Le texte est supprimé"],
                correct: 1,
                feedback: "Un array NumPy ne contient qu'UN SEUL type de données. Quand on mélange nombres et texte, tout est converti en texte (string). C'est le concept de données homogènes."
            },
            {
                q: "Quel est le résultat de np.array([5, 6, 23]) + 1 ?",
                options: ["Erreur", "[6, 7, 24]", "array([6, 7, 24])", "25"],
                correct: 2,
                feedback: "NumPy effectue l'opération sur CHAQUE élément automatiquement. C'est le calcul vectoriel : +1 est ajouté à chaque élément → array([6, 7, 24])"
            },
            {
                q: "Que retourne l'attribut .shape sur un tableau 2D de 3 lignes et 2 colonnes ?",
                options: ["(2, 3)", "(3, 2)", "6", "[3, 2]"],
                correct: 1,
                feedback: ".shape retourne un tuple (lignes, colonnes). Pour 3 lignes et 2 colonnes → (3, 2). C'est comme dire '3 rangées de 2 éléments'."
            }
        ],
        pandas: [
            {
                q: "Quelle est la différence principale entre une Series et un DataFrame ?",
                options: ["Aucune différence", "Series = 1 colonne, DataFrame = tableau complet", "DataFrame est plus rapide", "Series ne contient que des nombres"],
                correct: 1,
                feedback: "Une Series est comme UNE colonne d'un tableau Excel. Un DataFrame est le tableau complet avec plusieurs colonnes. Pensez : Series = colonne, DataFrame = feuille Excel."
            },
            {
                q: "Comment accéder à la colonne 'Nom' d'un DataFrame df ?",
                options: ["df.column('Nom')", "df['Nom']", "df.get('Nom')", "df(Nom)"],
                correct: 1,
                feedback: "On utilise les crochets avec le nom de la colonne entre guillemets : df['Nom']. C'est comme accéder à une valeur dans un dictionnaire Python."
            }
        ],
        matplotlib: [
            {
                q: "Quelle fonction affiche le graphique à l'écran ?",
                options: ["plt.display()", "plt.render()", "plt.show()", "plt.draw()"],
                correct: 2,
                feedback: "plt.show() est la fonction qui affiche le graphique. Sans elle, le graphique est créé en mémoire mais ne s'affiche pas !"
            },
            {
                q: "Que signifie le format 'go:' dans plt.plot(x, y, 'go:') ?",
                options: ["Graphique optimisé", "Vert, cercles, pointillés", "Grand, orange, continu", "Gris, ovale, tirets"],
                correct: 1,
                feedback: "'g' = green (vert), 'o' = cercles comme marqueurs, ':' = ligne en pointillés. C'est un raccourci pour définir couleur + marqueur + style de ligne en un seul texte."
            }
        ],
        ml_part_1: [
            {
                q: "Quel type d'apprentissage utilise des données étiquetées avec des résultats prédéfinis ?",
                options: ["Apprentissage par renforcement", "Apprentissage non supervisé", "Apprentissage supervisé", "Apprentissage profond"],
                correct: 2,
                feedback: "L'apprentissage supervisé utilise des données étiquetées — on donne à la machine les réponses pendant l'entraînement pour qu'elle apprenne la relation entrée → sortie."
            }
        ],
        ml_part_2: [
            {
                q: "La régression linéaire prédit une valeur...",
                options: ["Catégorielle (Oui/Non)", "Continue (un nombre)", "Binaire (0 ou 1)", "Aléatoire"],
                correct: 1,
                feedback: "La régression prédit une valeur continue (prix, température, salaire...), contrairement à la classification qui prédit une catégorie."
            },
            {
                q: "Dans KNN, si K=3 et que 2 voisins sont de classe B et 1 de classe A, quelle est la prédiction ?",
                options: ["Classe A", "Classe B", "Indéterminé", "Erreur"],
                correct: 1,
                feedback: "KNN utilise le vote majoritaire. Avec 2 voisins B et 1 voisin A → la majorité est B, donc la prédiction est B."
            }
        ],
        ml_part_3: [
            {
                q: "Que fait l'algorithme K-Means ?",
                options: ["Prédit une valeur continue", "Regroupe les données en K clusters", "Classifie les emails", "Trouve le plus court chemin"],
                correct: 1,
                feedback: "K-Means divise les données en K groupes (clusters) homogènes en regroupant les points proches les uns des autres."
            }
        ],
        ml_part_4: [
            {
                q: "En Q-Learning, que représente la Q-Table ?",
                options: ["Les données d'entraînement", "Les récompenses totales espérées pour chaque état-action", "La liste des erreurs", "Les clusters de données"],
                correct: 1,
                feedback: "La Q-Table stocke la valeur Q(s,a) = récompense totale espérée lorsqu'on prend l'action 'a' dans l'état 's'. L'agent choisit l'action avec la meilleure valeur Q."
            }
        ]
    },

    renderInline(moduleId, questionIndex) {
        const quizList = this.quizzes[moduleId];
        if (!quizList || !quizList[questionIndex]) return '';

        const quiz = quizList[questionIndex];
        const id = `quiz-${moduleId}-${questionIndex}`;

        let html = `
      <div class="quiz-card scroll-reveal" id="${id}">
        <div class="quiz-card-header">🧠 Mini-Quiz — Vérifie ta compréhension</div>
        <div class="quiz-question">${quiz.q}</div>
        <div class="quiz-options">
    `;

        quiz.options.forEach((opt, i) => {
            html += `
        <div class="quiz-option" data-quiz="${id}" data-index="${i}" data-correct="${quiz.correct}"
             onclick="QuizEngine.select('${id}', ${i}, ${quiz.correct})">
          <span class="quiz-option-marker">${String.fromCharCode(65 + i)}</span>
          <span>${opt}</span>
        </div>
      `;
        });

        html += `</div><div id="${id}-feedback"></div></div>`;
        return html;
    },

    select(quizId, selected, correct) {
        const options = document.querySelectorAll(`[data-quiz="${quizId}"]`);
        options.forEach((opt, i) => {
            opt.style.pointerEvents = 'none';
            if (i === correct) opt.classList.add('correct');
            else if (i === selected && selected !== correct) opt.classList.add('incorrect');
        });

        const feedbackEl = document.getElementById(`${quizId}-feedback`);
        const quiz = this._findQuiz(quizId);
        if (feedbackEl && quiz) {
            const isCorrect = selected === correct;
            feedbackEl.innerHTML = `
        <div class="quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}">
          <strong>${isCorrect ? '✅ Bravo !' : '❌ Pas tout à fait...'}</strong><br>
          ${quiz.feedback}
        </div>
      `;
        }
    },

    _findQuiz(quizId) {
        const parts = quizId.replace('quiz-', '').split('-');
        const idx = parseInt(parts.pop());
        const moduleId = parts.join('-');
        return this.quizzes[moduleId] ? this.quizzes[moduleId][idx] : null;
    },

    renderAll(moduleId) {
        const quizList = this.quizzes[moduleId] || [];
        return quizList.map((_, i) => this.renderInline(moduleId, i)).join('');
    }
};
