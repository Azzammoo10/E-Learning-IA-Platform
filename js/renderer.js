/* ── Renderer — Master content renderer consuming content.json ── */
const Renderer = {
    /* SVG icon helper — inline Lucide-style icons */
    _svg: {
        document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
        wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
        cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
        target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
        ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4Z"/><path d="M3 12h4"/><path d="M3 8h2"/><path d="M3 16h2"/><path d="M17 12h4"/></svg>',
    },

    render(moduleId) {
        const module = ContentLoader.getModule(moduleId);
        if (!module) return;

        const content = document.getElementById('content');
        let html = `<div class="page-enter">`;

        // Module title
        html += `<h1 class="section-title">${module.titre}</h1>`;

        // Render by module type
        switch (moduleId) {
            case 'introduction':
                html += this._renderIntroduction(module);
                break;
            case 'modules_python':
                html += this._renderModulesPython(module);
                break;
            case 'numpy':
                html += this._renderNumPy(module);
                break;
            case 'pandas':
                html += this._renderPandas(module);
                break;
            case 'matplotlib':
                html += this._renderMatplotlib(module);
                break;
            default:
                if (moduleId.startsWith('ml_part_')) {
                    html += this._renderMLModule(module);
                } else {
                    html += `<p>Module non reconnu.</p>`;
                }
        }

        html += `</div>`;
        content.innerHTML = html;

        // Post-render
        setTimeout(() => {
            ScrollReveal.observe();
            this._initCharts(moduleId);
        }, 100);
    },

    // ── INTRODUCTION ──
    _renderIntroduction(m) {
        let html = '';
        html += ConceptCard.definition(
            "L'<strong>analyse des données</strong>, c'est l'art d'explorer, nettoyer et comprendre des données pour en tirer des informations utiles. " +
            "Avec Python, on utilise des outils (bibliothèques) spécialisés pour faire ça facilement."
        );
        html += ConceptCard.why(
            "Imaginez : vous avez les notes de 100 étudiants. Plutôt que de tout calculer à la main, " +
            "Python peut trouver la moyenne, le maximum, faire des graphiques... en quelques lignes de code !"
        );

        // Libraries
        html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-4)">Les bibliothèques principales</h2>`;
        html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4);font-size:var(--text-sm)">
      Une <strong>bibliothèque</strong> (= library), c'est un ensemble d'outils prêts à l'emploi. On les importe dans notre code pour ne pas tout réécrire.
    </p>`;

        html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:var(--space-4)" class="stagger-children">`;
        const libColors = { numpy: 'var(--primary-500)', pandas: 'var(--success-500)', matplotlib: 'var(--warning-500)', scipy: 'var(--accent-500)' };
        m.bibliotheques.forEach(lib => {
            html += `
        <div class="concept-card expanded scroll-reveal" style="padding:var(--space-5)">
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3)">
            <div class="concept-card-icon" style="background:${libColors[lib.nom]}15;color:${libColors[lib.nom]};width:40px;height:40px">${this._svg.document}</div>
            <strong style="font-size:var(--text-lg)">${lib.nom}</strong>
          </div>
          <p style="font-size:var(--text-sm);color:var(--text-secondary)">${lib.description}</p>
        </div>
      `;
        });
        html += `</div>`;

        html += ConceptCard.encourage("C'est parti ! Dans les prochains modules, on va apprendre à utiliser ces outils un par un.");
        html += QuizEngine.renderInline('introduction', 0);
        html += ConceptCard.completeButton('introduction', 0);
        return html;
    },

    // ── MODULES PYTHON ──
    _renderModulesPython(m) {
        let html = '';
        html += ConceptCard.definition(
            "Un <strong>module Python</strong>, c'est simplement un fichier Python (.py) qui contient du code réutilisable : " +
            "des fonctions, des classes, des variables. On peut l'importer dans notre propre code avec le mot-clé <code class='inline'>import</code>."
        );
        html += ConceptCard.why(
            "C'est comme une boîte à outils : au lieu de fabriquer un tournevis à chaque fois, on va chercher celui qui existe déjà. " +
            "Les modules nous évitent de réécrire du code qui existe déjà."
        );

        // Concepts
        html += `<div id="section-0">`;
        html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-6) 0 var(--space-3)">Points clés</h2>`;
        html += ConceptCard.steps(m.concepts);
        html += `</div>`;

        // Import syntaxes
        html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Les différentes façons d'importer</h2>`;
        html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4);font-size:var(--text-sm)">
      Il y a plusieurs façons d'importer un module. Voici les plus utilisées :
    </p>`;
        html += Diagrams.importStyles();

        m.syntaxes_import.forEach((s, i) => {
            const body = `
        <p style="color:var(--text-secondary);margin-bottom:var(--space-3)">${s.usage}</p>
        ${CodeBlock.create(s.exemple, s.acces, { explanation: `Syntaxe : ${s.syntaxe}` })}
      `;
            html += ConceptCard.create(s.syntaxe, this._svg.document, body, { expanded: i === 0 });
        });

        html += QuizEngine.renderAll('modules_python');
        html += ConceptCard.encourage("Vous maîtrisez maintenant les imports ! C'est la base de tout ce qu'on va faire ensuite.");
        html += ConceptCard.completeButton('modules_python', 0);
        return html;
    },

    // ── NUMPY ──
    _renderNumPy(m) {
        let html = '';
        html += `<p class="section-subtitle">Bibliothèque la plus importante pour le calcul scientifique en Python.</p>`;
        html += ConceptCard.definition(
            "<strong>NumPy</strong> (Numerical Python) est une bibliothèque qui ajoute à Python la capacité de travailler avec des <strong>tableaux de nombres</strong> (arrays) " +
            "de manière très rapide et efficace. C'est la base de presque tous les outils de Data Science."
        );
        html += ConceptCard.why(
            "Sans NumPy, Python est lent pour les calculs. NumPy rend les opérations sur des milliers de nombres quasi instantanées. " +
            "C'est comme passer d'une calculatrice à un ordinateur !"
        );

        // Import
        html += `<div style="margin:var(--space-4) 0">`;
        html += `<p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-2)">Pour commencer, on importe NumPy :</p>`;
        html += CodeBlock.create('import numpy as np', null, { explanation: "On donne le surnom 'np' à NumPy pour écrire moins" });
        html += `</div>`;

        // Render each sous_section
        m.sous_sections.forEach((section, idx) => {
            html += `<div id="section-${idx}" style="margin-top:var(--space-8)">`;
            html += this._renderNumPySection(section, m.id, idx);
            html += `</div>`;
        });

        return html;
    },

    _renderNumPySection(section, moduleId, idx) {
        let html = '';

        if (section.titre === 'Création de tableaux (array)') {
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">${section.titre}</h2>`;
            html += ConceptCard.definition(
                "Un <strong>array</strong> (tableau), c'est une collection ordonnée de données du <strong>même type</strong>. " +
                "C'est comme une rangée de boîtes numérotées, où chaque boîte contient le même type d'objet."
            );
            html += Diagrams.arrayMemory1D();
            html += Diagrams.listVsArray();

            // Key concepts
            html += ConceptCard.steps(section.contenu);

            // Examples one by one
            if (section.exemples) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Exemples</h3>`;
                section.exemples.forEach((ex, i) => {
                    const explanations = [
                        "On transforme une liste Python en array NumPy",
                        "On peut aussi partir d'un tuple",
                        "Si on mélange nombres et texte, tout devient du texte !",
                        "Si on mélange int et float, tout devient float",
                        "True est converti en 1, False en 0",
                        "True est converti en 1.0 quand mélangé avec des floats"
                    ];
                    html += CodeBlock.create(ex.code, ex.resultat, { explanation: explanations[i] || '' });
                });
            }

            html += ConceptCard.warning("Un array ne contient qu'UN SEUL type de données. Si vous mélangez, NumPy convertit tout vers le type le plus général.");
            html += QuizEngine.renderInline('numpy', 0);
            html += ConceptCard.completeButton(moduleId, idx);

        } else if (section.titre === 'Fonction arange()') {
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">${section.titre}</h2>`;
            html += ConceptCard.definition("La fonction <code class='inline'>arange()</code> crée un array avec des nombres qui se suivent, comme la fonction <code class='inline'>range()</code> mais pour NumPy.");
            html += ConceptCard.steps(section.contenu);
            if (section.exemples) {
                section.exemples.forEach(ex => {
                    html += CodeBlock.create(ex.code, ex.resultat);
                });
            }
            html += ConceptCard.completeButton(moduleId, idx);

        } else if (section.titre === 'Tableaux à double dimensions') {
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">${section.titre}</h2>`;
            html += ConceptCard.definition("Un tableau <strong>2D</strong>, c'est un tableau de tableaux — comme un tableur avec des lignes et des colonnes.");
            html += Diagrams.arrayMemory2D();
            html += ConceptCard.steps(section.contenu);
            if (section.exemples) {
                section.exemples.forEach(ex => {
                    html += CodeBlock.create(ex.code, ex.resultat);
                });
            }
            html += QuizEngine.renderInline('numpy', 2);
            html += ConceptCard.completeButton(moduleId, idx);

        } else if (section.titre === 'Opérations sur les tableaux') {
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">${section.titre}</h2>`;
            html += ConceptCard.definition("Avec NumPy, on peut faire des calculs sur <strong>tous les éléments</strong> d'un array en une seule opération. C'est le <strong>calcul vectoriel</strong>.");
            html += ConceptCard.why("Au lieu de faire une boucle pour additionner 1 à chaque élément, NumPy le fait automatiquement — et c'est 100x plus rapide !");
            html += ConceptCard.steps(section.contenu);
            if (section.exemples) {
                const expls = ["On ajoute 1 à chaque élément", "On multiplie chaque élément par 2", "On multiplie chaque élément par lui-même (carré)"];
                section.exemples.forEach((ex, i) => {
                    html += CodeBlock.create(ex.code, ex.resultat, { explanation: expls[i] || '' });
                });
            }
            html += QuizEngine.renderInline('numpy', 1);
            html += ConceptCard.completeButton(moduleId, idx);

        } else if (section.titre === 'Attributs des tableaux') {
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">${section.titre}</h2>`;
            html += ConceptCard.definition("Chaque array a des <strong>propriétés</strong> qui nous renseignent sur sa forme et sa taille.");
            if (section.attributs) {
                html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
          <tr><th>Attribut</th><th>Ce qu'il fait</th></tr>
          ${section.attributs.map(a => `<tr><td><code class="inline">.${a.nom}</code></td><td>${a.description}</td></tr>`).join('')}
        </table></div>`;
            }
            if (section.methodes_reshape) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Changer la forme : reshape et resize</h3>`;
                html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
          <tr><th>Méthode</th><th>Ce qu'elle fait</th></tr>
          ${section.methodes_reshape.map(m => `<tr><td><code class="inline">.${m.nom}</code></td><td>${m.description}</td></tr>`).join('')}
        </table></div>`;
            }
            html += ConceptCard.completeButton(moduleId, idx);

        } else if (section.titre === 'Méthodes appliquées sur des tableaux') {
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">${section.titre}</h2>`;
            html += ConceptCard.definition("NumPy offre des fonctions pour calculer rapidement des statistiques sur vos données.");
            if (section.methodes) {
                html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
          <tr><th>Méthode</th><th>Résultat</th></tr>
          ${section.methodes.map(m => `<tr><td><code class="inline">${m.nom}</code></td><td>${m.description}</td></tr>`).join('')}
        </table></div>`;
            }
            if (section.exemple) {
                html += CodeBlock.create(section.exemple.code, `len=9, min=1, max=9, mean=5.0, sum=45`);
            }
            html += ConceptCard.completeButton(moduleId, idx);

        } else if (section.titre === 'Fonctions couramment utilisées') {
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">${section.titre}</h2>`;
            section.fonctions.forEach(fn => {
                let body = `<p style="color:var(--text-secondary);margin-bottom:var(--space-3)">${fn.description}</p>`;
                if (fn.exemples) {
                    fn.exemples.forEach(ex => { body += CodeBlock.create(ex.code, ex.resultat); });
                }
                html += ConceptCard.create(fn.nom.split('(')[0], this._svg.wrench, body);
            });
            html += ConceptCard.completeButton(moduleId, idx);

        } else if (section.titre === 'Application') {
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">${section.titre} pratique</h2>`;
            html += ConceptCard.encourage(section.contexte + " — C'est exactement le genre de problème qu'on résout avec NumPy !");
            html += `<div id="grades-chart" style="margin:var(--space-6) 0;max-width:600px"></div>`;
            section.exercices.forEach(ex => {
                let body = `<p style="margin-bottom:var(--space-2)">${ex.description}</p>`;
                if (ex.code) body += CodeBlock.create(ex.code, ex.resultat || '');
                if (ex.resultats) {
                    body += `<div style="margin-top:var(--space-2)"><table class="comparison-table">
            ${Object.entries(ex.resultats).map(([k, v]) => `<tr><td>${k}</td><td><strong>${v}</strong></td></tr>`).join('')}
          </table></div>`;
                }
                html += ConceptCard.create(`Exercice ${ex.num}`, this._svg.document, body);
            });
            html += ConceptCard.completeButton(moduleId, idx);
        }

        return html;
    },

    // ── PANDAS ──
    _renderPandas(m) {
        let html = '';
        html += `<p class="section-subtitle">Bibliothèque populaire pour l'analyse et la manipulation de données.</p>`;
        html += ConceptCard.definition(
            "<strong>Pandas</strong> (Panel Datas) est une bibliothèque qui permet de travailler avec des données structurées — " +
            "comme des tableaux Excel, des fichiers CSV, des bases de données. C'est l'outil numéro 1 pour l'analyse de données."
        );
        html += ConceptCard.why(
            "Imaginez un tableur Excel surpuissant, directement dans Python. Vous pouvez filtrer, trier, nettoyer, " +
            "fusionner des données en quelques lignes. C'est ça, Pandas !"
        );
        html += CodeBlock.create(m.import, null, { explanation: "Convention : on utilise toujours 'pd' comme alias pour Pandas" });

        // Series
        const series = m.structures_principales.find(s => s.nom === 'Series');
        if (series) {
            html += `<div id="section-0" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">Les Series</h2>`;
            html += ConceptCard.definition(`${series.description}. Pensez à une <strong>colonne unique</strong> d'un tableau Excel.`);
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Comment créer une Series ?</h3>`;
            series.creation.forEach(c => {
                html += ConceptCard.create(c.methode, this._svg.document, CodeBlock.create(c.code, ''));
            });
            if (series.acces) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Accéder aux données</h3>`;
                series.acces.forEach(a => {
                    html += CodeBlock.create(a.code, a.resultat || a.description || '');
                });
            }
            html += ConceptCard.completeButton('pandas', 0);
            html += `</div>`;
        }

        // DataFrame
        const df = m.structures_principales.find(s => s.nom === 'DataFrame');
        if (df) {
            html += `<div id="section-1" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">Les DataFrames</h2>`;
            html += ConceptCard.definition(`${df.description}. C'est la structure la plus utilisée en Pandas — pensez à une <strong>feuille Excel complète</strong>.`);
            html += Diagrams.dataframeSchema();
            html += Diagrams.seriesVsDataframe();

            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Comment créer un DataFrame ?</h3>`;
            df.creation.forEach(c => {
                html += ConceptCard.create(c.methode, this._svg.document, CodeBlock.create(c.code, ''));
            });

            if (df.operations) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Opérations courantes</h3>`;
                df.operations.forEach(op => {
                    let body = CodeBlock.create(op.code, '');
                    if (op.note) body += ConceptCard.tip(op.note);
                    html += ConceptCard.create(op.nom, this._svg.cog, body);
                });
            }

            if (df.exploration) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Explorer les données</h3>`;
                html += Diagrams.locVsIloc();
                df.exploration.forEach(ex => {
                    let body = '';
                    if (ex.description) body += `<p style="color:var(--text-secondary);margin-bottom:var(--space-2)">${ex.description}</p>`;
                    body += CodeBlock.create(ex.code, ex.resultat || '');
                    html += ConceptCard.create(ex.nom, this._svg.search, body);
                });
            }

            if (df.filtrage) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Filtrer et trier</h3>`;
                df.filtrage.forEach(f => {
                    html += ConceptCard.create(f.nom, this._svg.search, CodeBlock.create(f.code, ''));
                });
            }

            if (df.importation) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Importer des données</h3>`;
                df.importation.forEach(imp => {
                    html += CodeBlock.create(imp.code, '', { explanation: imp.nom });
                });
            }

            html += QuizEngine.renderAll('pandas');
            html += ConceptCard.completeButton('pandas', 1);
            html += `</div>`;
        }

        return html;
    },

    // ── MATPLOTLIB ──
    _renderMatplotlib(m) {
        let html = '';
        html += `<p class="section-subtitle">Bibliothèque pour créer des graphiques et visualisations.</p>`;
        html += ConceptCard.definition(
            "<strong>Matplotlib</strong> est la bibliothèque de référence pour créer des graphiques en Python. " +
            "Elle permet de dessiner des courbes, des barres, des nuages de points, et bien plus."
        );
        html += ConceptCard.why(
            "Un bon graphique vaut mille mots ! Visualiser les données permet de comprendre des tendances, " +
            "repérer des anomalies et communiquer des résultats clairement."
        );
        html += CodeBlock.create(m.import, null, { explanation: "On utilise le sous-module pyplot avec l'alias plt" });

        // Pipeline
        html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Comment créer un graphique ?</h2>`;
        html += Diagrams.plottingPipeline();
        html += CodeBlock.create(m.syntaxe_base, null, { explanation: "La structure de base de tout graphique Matplotlib" });

        // Appearance
        html += `<h2 id="section-0" style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Personnaliser l'apparence</h2>`;
        html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4)">On peut changer la couleur, le style des points et des lignes avec un code court :</p>`;

        if (m.apparence) {
            html += `<div class="responsive-grid-250" style="margin:var(--space-4) 0">`;
            // Colors table
            html += `<div><table class="comparison-table"><tr><th>Code</th><th>Couleur</th></tr>
        ${m.apparence.couleurs.map(c => `<tr><td><code class="inline">${c.code}</code></td><td>${c.valeur}</td></tr>`).join('')}
      </table></div>`;
            // Point types
            html += `<div><table class="comparison-table"><tr><th>Code</th><th>Marqueur</th></tr>
        ${m.apparence.types_points.map(t => `<tr><td><code class="inline">${t.code}</code></td><td>${t.valeur}</td></tr>`).join('')}
      </table></div>`;
            // Line types
            html += `<div><table class="comparison-table"><tr><th>Code</th><th>Style ligne</th></tr>
        ${m.apparence.types_lignes.map(t => `<tr><td><code class="inline">${t.code}</code></td><td>${t.valeur}</td></tr>`).join('')}
      </table></div>`;
            html += `</div>`;
            html += ConceptCard.tip("Le format combine les 3 : <code class='inline'>'go:'</code> = vert (g) + cercles (o) + pointillés (:)");
        }

        // Functions
        if (m.fonctions_informations) {
            html += `<h2 id="section-1" style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Ajouter des informations</h2>`;
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
        <tr><th>Fonction</th><th>Ce qu'elle fait</th></tr>
        ${m.fonctions_informations.map(f => `<tr><td><code class="inline">${f.nom}</code></td><td>${f.description}</td></tr>`).join('')}
      </table></div>`;
        }

        // Subplots
        if (m.subplots) {
            html += `<h2 id="section-2" style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Subplots — Plusieurs graphiques</h2>`;
            html += ConceptCard.definition(m.subplots.description);
            html += CodeBlock.create(m.subplots.syntaxe, null);
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
        <tr><th>Paramètre</th><th>Signification</th></tr>
        ${m.subplots.parametres.map(p => `<tr><td><code class="inline">${p.nom}</code></td><td>${p.description}</td></tr>`).join('')}
      </table></div>`;
        }

        // Chart types
        if (m.types_graphiques) {
            html += `<h2 id="section-3" style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Types de graphiques</h2>`;
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
        <tr><th>Fonction</th><th>Type</th></tr>
        ${m.types_graphiques.map(t => `<tr><td><code class="inline">${t.nom}</code></td><td>${t.description}</td></tr>`).join('')}
      </table></div>`;
        }

        // Demo charts
        html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Aperçu interactif</h2>`;
        html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4)">Voici ce que Matplotlib peut produire :</p>`;
        html += `<div class="responsive-grid-400">
      <div class="concept-card expanded" style="padding:var(--space-4)"><div id="sincos-chart"></div></div>
      <div class="concept-card expanded" style="padding:var(--space-4)"><div id="bar-chart"></div></div>
    </div>`;

        // Examples
        if (m.exemples) {
            html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Exemples de code</h2>`;
            m.exemples.forEach(ex => {
                html += ConceptCard.create(ex.description, this._svg.chart, CodeBlock.create(ex.code, ''));
            });
        }

        html += QuizEngine.renderAll('matplotlib');
        html += ConceptCard.encourage("Bravo ! Vous avez terminé le module Matplotlib. Vous pouvez maintenant visualiser n'importe quelles données !");
        html += ConceptCard.completeButton('matplotlib', 0);

        return html;
    },

    _initCharts(moduleId) {
        if (moduleId === 'numpy') {
            Charts.renderGradesChart('grades-chart');
        }
        if (moduleId === 'matplotlib') {
            Charts.renderDemoChart('sincos-chart', 'sincos');
            Charts.renderDemoChart('bar-chart', 'bar');
        }
        if (moduleId === 'ml_part_2') {
            Charts.renderLinearRegression('lr-chart-1');
            Charts.renderKNNChart('knn-chart-1');
        }
        if (moduleId === 'ml_part_3') {
            Charts.renderKMeansChart('kmeans-chart');
        }
    },

    // ══════════════════════════════════════════
    // ══ MACHINE LEARNING MODULES ══
    // ══════════════════════════════════════════

    _renderMLModule(module) {
        const data = module._data;
        if (!data) return '<p>Contenu non disponible.</p>';

        switch (module.id) {
            case 'ml_part_1': return this._renderMLIntro(data);
            case 'ml_part_2': return this._renderMLSupervised(data);
            case 'ml_part_3': return this._renderMLUnsupervised(data);
            case 'ml_part_4': return this._renderMLReinforcement(data);
            default: return '<p>Module ML non reconnu.</p>';
        }
    },

    // ── ML PART 1: Introduction au Machine Learning ──
    _renderMLIntro(part) {
        const c = part.contenu;
        let html = '';

        html += ConceptCard.definition(
            `<strong>Le Machine Learning</strong> (apprentissage automatique), c'est donner à un ordinateur ` +
            `la capacité d'<strong>apprendre à partir de données</strong>, sans être explicitement programmé pour chaque cas. ` +
            `${c.definition}`
        );

        html += ConceptCard.why(
            `Imaginez : au lieu de programmer "si l'email contient le mot promo → spam", on donne à la machine ` +
            `des milliers d'emails étiquetés (spam / pas spam) et elle apprend toute seule les règles ! ` +
            `${c.lien_avec_IA}`
        );

        // Types de données
        html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Les données utilisées</h2>`;
        html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4)">Le ML peut apprendre à partir de différents types de données :</p>`;
        html += `<div class="responsive-flex-wrap" style="margin-bottom:var(--space-6)">`;
        c.types_de_donnees.forEach(t => {
            html += `<div class="concept-card expanded scroll-reveal" style="padding:var(--space-4);flex:1;min-width:120px;text-align:center">
                <div class="concept-card-icon" style="width:40px;height:40px;margin:0 auto">${this._svg.document}</div>
                <div style="font-weight:var(--weight-semibold);margin-top:var(--space-2)">${t.charAt(0).toUpperCase() + t.slice(1)}</div>
            </div>`;
        });
        html += `</div>`;

        // Étapes de développement
        html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-6) 0 var(--space-3)">Les 4 étapes d'un projet ML</h2>`;
        html += Diagrams.mlPipeline(c.etapes_developpement);
        html += ConceptCard.steps(c.etapes_developpement.map(e => `<strong>${e.nom}</strong> — ${e.description}`));

        // Types d'apprentissage
        html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-3)">Les 3 types d'apprentissage</h2>`;
        html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4)">Il y a 3 grandes familles de Machine Learning :</p>`;

        const typeIcons = {}; // removed emojis
        const typeColors = { 'Apprentissage supervisé': 'var(--primary-500)', 'Apprentissage non supervisé': 'var(--accent-500)', 'Apprentissage par renforcement': 'var(--error-500)' };
        const typeAnalogies = {
            'Apprentissage supervisé': 'Comme un prof qui corrige vos copies — il vous dit "oui" ou "non" pour chaque réponse.',
            'Apprentissage non supervisé': 'Comme trier des vêtements par couleur sans qu\'on vous dise les catégories.',
            'Apprentissage par renforcement': 'Comme apprendre un jeu vidéo — on essaie, on gagne ou on perd, et on s\'améliore.'
        };

        html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-4)" class="stagger-children">`;
        c.types_apprentissage.forEach(t => {
            html += `
                <div class="concept-card expanded scroll-reveal" style="padding:var(--space-5);border-left:4px solid ${typeColors[t.type] || 'var(--primary-500)'}">
                    <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3)">
                        <div class="concept-card-icon" style="width:36px;height:36px">${this._svg.target}</div>
                        <strong style="font-size:var(--text-base)">${t.type}</strong>
                    </div>
                    <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-2)">${t.description}</p>
                    <div class="info-box tip" style="margin:var(--space-2) 0 0"><span class="info-box-icon">${ConceptCard._svgIcons.tip}</span><div>${typeAnalogies[t.type]}</div></div>
                </div>
            `;
        });
        html += `</div>`;

        html += QuizEngine.renderAll('ml_part_1');
        html += ConceptCard.encourage("Vous comprenez maintenant les bases du Machine Learning ! Dans les prochains modules, on va voir chaque type en détail.");
        html += ConceptCard.completeButton('ml_part_1', 0);
        return html;
    },

    // ── ML PART 2: Apprentissage Supervisé ──
    _renderMLSupervised(part) {
        const subs = part.sous_parties;
        let html = '';

        html += ConceptCard.definition(
            `L'<strong>apprentissage supervisé</strong>, c'est quand on enseigne à la machine avec des <strong>exemples étiquetés</strong>. ` +
            `On lui montre des données avec la bonne réponse, et elle apprend la relation entre les entrées et les sorties.`
        );
        html += ConceptCard.why(
            `C'est le type de ML le plus utilisé ! Prédire le prix d'une maison, détecter des emails spam, ` +
            `diagnostiquer une maladie... tout ça utilise l'apprentissage supervisé.`
        );

        // Overview: Classification vs Régression
        const intro = subs.find(s => s.titre === 'Introduction');
        if (intro) {
            html += `<div id="section-0" style="margin-top:var(--space-6)">`;
            html += Diagrams.classificationVsRegression();
            html += `</div>`;
        }

        // Classification
        const classification = subs.find(s => s.titre === 'La Classification');
        if (classification) {
            html += `<div id="section-1" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">La Classification</h2>`;
            html += ConceptCard.definition(classification.contenu.definition);

            if (classification.contenu.exemple) {
                const ex = classification.contenu.exemple;
                html += ConceptCard.create('Exemple concret', this._svg.document, `
                    <p><strong>${ex.contexte}</strong></p>
                    <p style="color:var(--text-secondary);margin-top:var(--space-2)">Caractéristiques utilisées : ${ex.caracteristiques}</p>
                    <p style="color:var(--text-secondary)">Résultat prédit (cible) : <code class="inline">${ex.cible}</code></p>
                `, { expanded: true });
            }

            // Algorithmes de classification
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Algorithmes courants</h3>`;
            html += `<div class="responsive-flex-wrap" style="gap:var(--space-2);margin-bottom:var(--space-4)">`;
            classification.contenu.algorithmes.forEach(a => {
                html += `<span class="badge badge-primary" style="padding:var(--space-2) var(--space-3)">${a}</span>`;
            });
            html += `</div>`;

            // Applications
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Applications réelles</h3>`;
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                <tr><th>Application</th><th>Type</th></tr>
                ${classification.contenu.applications.map(a => `<tr><td>${a.application}</td><td><span class="badge ${a.type === 'Classification' ? 'badge-primary' : 'badge-success'}">${a.type}</span></td></tr>`).join('')}
            </table></div>`;

            html += ConceptCard.completeButton('ml_part_2', 1);
            html += `</div>`;
        }

        // Régression
        const regression = subs.find(s => s.titre === 'La Régression');
        if (regression) {
            html += `<div id="section-2" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">La Régression</h2>`;
            html += ConceptCard.definition(regression.contenu.definition);

            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Exemples d'application</h3>`;
            html += ConceptCard.steps(regression.contenu.exemples_application);
            html += `</div>`;
        }

        // Régression Linéaire
        const linReg = subs.find(s => s.titre === 'Régression Linéaire');
        if (linReg) {
            html += `<div id="section-3" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">Régression Linéaire</h2>`;
            html += ConceptCard.definition(linReg.contenu.objectif);

            // Simple explanation
            if (linReg.contenu.explication_simple) {
                html += ConceptCard.why(linReg.contenu.explication_simple);
            }

            // Types
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                <tr><th>Type</th><th>Description</th></tr>
                <tr><td>Simple</td><td>${linReg.contenu.types.simple}</td></tr>
                <tr><td>Multiple</td><td>${linReg.contenu.types.multiple}</td></tr>
            </table></div>`;

            // Equation
            html += `<div class="info-box definition" style="margin:var(--space-4) 0">
                <span class="info-box-icon">${this._svg.ruler}</span>
                <div>
                    <strong>Équation de la droite :</strong> <code class="inline">${linReg.contenu.equation}</code><br>
                    <span style="font-size:var(--text-sm);color:var(--text-secondary)">
                        c = ${linReg.contenu.parametres.c} | m = ${linReg.contenu.parametres.m}
                    </span>
                </div>
            </div>`;

            // Méthode
            html += ConceptCard.tip(`La <strong>${linReg.contenu.methode}</strong> est utilisée pour trouver la meilleure droite. Formule de la pente : <code class="inline">${linReg.contenu.formule_pente}</code>`);

            // Fonctions d'évaluation
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Évaluer la qualité du modèle</h3>`;
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                <tr><th>Métrique</th><th>Formule</th><th>Interprétation</th></tr>
                ${linReg.contenu.fonctions_evaluation.map(f => `<tr><td><strong>${f.nom}</strong></td><td><code class="inline">${f.formule}</code></td><td>${f.interpretation}</td></tr>`).join('')}
            </table></div>`;

            // Interactive chart
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Visualisation interactive</h3>`;
            html += `<div id="lr-chart-1" class="concept-card expanded" style="padding:var(--space-4);max-width:600px"></div>`;

            // Exemples
            if (linReg.contenu.exemples) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Exemples corrigés</h3>`;
                linReg.contenu.exemples.forEach(ex => {
                    let body = `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                        <tr><th>Paramètre</th><th>Valeur</th></tr>`;
                    Object.entries(ex.resultats).forEach(([k, v]) => {
                        body += `<tr><td>${k}</td><td><strong>${v}</strong></td></tr>`;
                    });
                    body += `</table></div>`;
                    html += ConceptCard.create(ex.nom, this._svg.document, body);
                });
            }

            // 2 Méthodes Python
            if (linReg.contenu.methodes_python) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Comment coder la Régression Linéaire ? (2 méthodes)</h3>`;
                html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4)">Voici 2 façons de faire — choisissez celle qui vous convient !</p>`;
                linReg.contenu.methodes_python.forEach(method => {
                    let body = `<p style="color:var(--text-secondary);margin-bottom:var(--space-3)">${method.description}</p>`;
                    body += CodeBlock.create(method.code, method.resultat);
                    html += ConceptCard.create(method.nom, this._svg.wrench, body);
                });
            }

            html += QuizEngine.renderAll('ml_part_2');
            html += ConceptCard.completeButton('ml_part_2', 3);
            html += `</div>`;
        }

        // KNN
        const knn = subs.find(s => s.titre === 'K Plus Proches Voisins (KNN)');
        if (knn) {
            html += `<div id="section-4" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">K Plus Proches Voisins (KNN)</h2>`;
            html += ConceptCard.definition(knn.contenu.definition);

            // Simple explanation
            if (knn.contenu.explication_simple) {
                html += ConceptCard.why(knn.contenu.explication_simple);
            } else {
                html += ConceptCard.why(
                    `C'est l'un des algorithmes les plus intuitifs ! L'idée est simple : <em>"Dis-moi qui sont tes voisins, ` +
                    `je te dirai qui tu es."</em> On regarde les K points les plus proches pour décider.`
                );
            }

            // Étapes
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Les étapes de KNN</h3>`;
            html += ConceptCard.steps(knn.contenu.etapes);

            // Distances
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Formules de distance</h3>`;
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                <tr><th>Type</th><th>Formule</th></tr>
                <tr><td>Euclidienne</td><td><code class="inline">${knn.contenu.formules_distance.euclidienne}</code></td></tr>
                <tr><td>Manhattan</td><td><code class="inline">${knn.contenu.formules_distance.manhattan}</code></td></tr>
            </table></div>`;

            html += ConceptCard.warning(knn.contenu.choix_k);

            // KNN interactive chart
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Visualisation KNN</h3>`;
            html += `<div id="knn-chart-1" class="concept-card expanded" style="padding:var(--space-4);max-width:600px"></div>`;

            // Exemples
            if (knn.contenu.exemples) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Exemples</h3>`;
                knn.contenu.exemples.forEach(ex => {
                    let body = `<p style="margin-bottom:var(--space-3)">${ex.nom}</p>`;
                    if (ex.distances) {
                        body += `<div style="margin:var(--space-3) 0"><table class="comparison-table">
                            <tr><th>Point</th><th>Classe</th><th>Distance</th></tr>
                            ${ex.distances.map(d => `<tr><td>(${d.point.join(', ')})</td><td><span class="badge ${d.classe === 'A' ? 'badge-primary' : 'badge-success'}">${d.classe}</span></td><td>${d.distance}</td></tr>`).join('')}
                        </table></div>`;
                    }
                    body += `<div class="info-box encourage"><span class="info-box-icon">${ConceptCard._svgIcons.encourage}</span><div>Prédiction : <strong>${ex.prediction}${ex.interpretation ? ' (' + ex.interpretation + ')' : ''}</strong></div></div>`;
                    html += ConceptCard.create(ex.nom, this._svg.chart, body);
                });
            }

            // 2 Méthodes Python
            if (knn.contenu.methodes_python) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Comment coder KNN ? (2 méthodes)</h3>`;
                html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4)">Voici 2 façons de faire — choisissez celle qui vous convient !</p>`;
                knn.contenu.methodes_python.forEach(method => {
                    let body = `<p style="color:var(--text-secondary);margin-bottom:var(--space-3)">${method.description}</p>`;
                    body += CodeBlock.create(method.code, method.resultat);
                    html += ConceptCard.create(method.nom, this._svg.wrench, body);
                });
            }

            html += ConceptCard.completeButton('ml_part_2', 4);
            html += `</div>`;
        }

        return html;
    },

    // ── ML PART 3: Apprentissage Non Supervisé ──
    _renderMLUnsupervised(part) {
        const subs = part.sous_parties;
        let html = '';

        html += ConceptCard.definition(
            `L'<strong>apprentissage non supervisé</strong>, c'est quand la machine trouve elle-même des patterns ` +
            `dans les données <strong>sans étiquettes</strong>. On ne lui dit pas les réponses — elle doit découvrir la structure.`
        );
        html += ConceptCard.why(
            `Imaginez recevoir un sac de bonbons mélangés : l'apprentissage non supervisé, c'est trier les bonbons ` +
            `par groupes similaires (couleur, forme, goût) sans que personne ne vous dise les catégories.`
        );

        // Clustering intro
        const clustering = subs.find(s => s.titre === 'Clustering');
        if (clustering) {
            html += `<div id="section-1" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">Le Clustering</h2>`;
            html += ConceptCard.definition(clustering.contenu.definition_formelle || clustering.contenu.principe);

            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Applications</h3>`;
            html += ConceptCard.steps(clustering.contenu.applications);
            html += ConceptCard.completeButton('ml_part_3', 1);
            html += `</div>`;
        }

        // K-Means
        const kmeans = subs.find(s => s.titre === 'K-Means');
        if (kmeans) {
            html += `<div id="section-2" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">L'algorithme K-Means</h2>`;
            html += ConceptCard.definition(kmeans.contenu.definition);

            // Simple explanation
            if (kmeans.contenu.explication_simple) {
                html += ConceptCard.why(kmeans.contenu.explication_simple);
            } else {
                html += ConceptCard.why(
                    `K-Means est l'algorithme de clustering le plus populaire. Il est simple à comprendre ` +
                    `et efficace pour regrouper des données en K clusters.`
                );
            }

            // Distance formula
            html += `<div class="info-box definition" style="margin:var(--space-4) 0">
                <span class="info-box-icon">${this._svg.ruler}</span>
                <div><strong>Distance euclidienne :</strong> <code class="inline">${kmeans.contenu.formule_distance}</code></div>
            </div>`;

            // Étapes
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Les étapes de K-Means</h3>`;
            html += Diagrams.kMeansPipeline(kmeans.contenu.etapes);
            html += ConceptCard.steps(kmeans.contenu.etapes);

            html += ConceptCard.tip(kmeans.contenu.critere_arret);

            // Interactive chart
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Visualisation K-Means</h3>`;
            html += `<div id="kmeans-chart" class="concept-card expanded" style="padding:var(--space-4);max-width:600px"></div>`;

            // 2 Méthodes Python
            if (kmeans.contenu.methodes_python) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Comment coder K-Means ? (2 méthodes)</h3>`;
                html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4)">Voici 2 façons de faire — choisissez celle qui vous convient !</p>`;
                kmeans.contenu.methodes_python.forEach(method => {
                    let body = `<p style="color:var(--text-secondary);margin-bottom:var(--space-3)">${method.description}</p>`;
                    body += CodeBlock.create(method.code, method.resultat);
                    html += ConceptCard.create(method.nom, this._svg.wrench, body);
                });
            }

            html += QuizEngine.renderAll('ml_part_3');
            html += ConceptCard.completeButton('ml_part_3', 2);
            html += `</div>`;
        }

        return html;
    },

    // ── ML PART 4: Apprentissage par Renforcement ──
    _renderMLReinforcement(part) {
        const subs = part.sous_parties;
        let html = '';

        const intro = subs.find(s => s.titre === 'Introduction');
        if (intro) {
            html += ConceptCard.definition(intro.contenu.definition);
            html += ConceptCard.why(
                `Pensez à un jeu vidéo : le personnage (agent) apprend à naviguer dans un monde (environnement). ` +
                `Quand il ramasse une pièce + récompense, quand il tombe dans un trou → punition. ` +
                `À force d'essais, il trouve le meilleur chemin !`
            );

            html += `<div id="section-0" style="margin-top:var(--space-6)">`;
            // Elements fondamentaux
            html += `<h2 style="font-size:var(--text-xl);font-weight:var(--weight-bold);margin:var(--space-6) 0 var(--space-3)">Éléments fondamentaux</h2>`;
            html += Diagrams.rlCycle(intro.contenu.elements_fondamentaux);

            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                <tr><th>Élément</th><th>Rôle</th></tr>
                ${Object.entries(intro.contenu.elements_fondamentaux).map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v}</td></tr>`).join('')}
            </table></div>`;
            html += ConceptCard.completeButton('ml_part_4', 0);
            html += `</div>`;
        }

        // Q-Learning
        const qlearn = subs.find(s => s.titre === 'Q-Learning');
        if (qlearn) {
            html += `<div id="section-1" style="margin-top:var(--space-8)">`;
            html += `<h2 style="font-size:var(--text-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">Q-Learning</h2>`;
            html += ConceptCard.definition(qlearn.contenu.definition);

            // Simple explanation
            if (qlearn.contenu.explication_simple) {
                html += ConceptCard.why(qlearn.contenu.explication_simple);
            }

            html += ConceptCard.tip(qlearn.contenu.contrainte);

            // Q-Table
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">La Q-Table</h3>`;
            html += ConceptCard.create('Qu\'est-ce que la Q-Table ?', this._svg.document, `
                <p>${qlearn.contenu.q_table.description}</p>
                <div class="info-box definition" style="margin-top:var(--space-3)">
                    <span class="info-box-icon">${this._svg.ruler}</span>
                    <div><strong>Politique :</strong> <code class="inline">${qlearn.contenu.q_table.politique}</code></div>
                </div>
            `, { expanded: true });

            // Formule de mise à jour
            html += `<div class="info-box definition" style="margin:var(--space-4) 0">
                <span class="info-box-icon">${this._svg.ruler}</span>
                <div>
                    <strong>Formule de mise à jour :</strong><br>
                    <code class="inline" style="font-size:var(--text-sm)">${qlearn.contenu.formule_mise_a_jour}</code>
                </div>
            </div>`;

            // Paramètres
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                <tr><th>Paramètre</th><th>Signification</th></tr>
                ${Object.entries(qlearn.contenu.parametres).map(([k, v]) => `<tr><td><strong>${k} (${k === 'alpha' ? 'α' : k === 'gamma' ? 'γ' : 'ε'})</strong></td><td>${v}</td></tr>`).join('')}
            </table></div>`;

            // Exploration vs Exploitation
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Exploration vs Exploitation</h3>`;
            html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                <tr><th></th><th>Exploitation</th><th>Exploration</th></tr>
                <tr><td>Principe</td><td>${qlearn.contenu.exploration_vs_exploitation.exploitation}</td><td>${qlearn.contenu.exploration_vs_exploitation.exploration}</td></tr>
                <tr><td>ε = 0.0</td><td colspan="2">100% exploitation (toujours le meilleur choix connu)</td></tr>
                <tr><td>ε = 1.0</td><td colspan="2">100% exploration (toujours aléatoire)</td></tr>
                <tr><td>ε = 0.2</td><td colspan="2">80% exploitation + 20% exploration (bon équilibre)</td></tr>
            </table></div>`;

            // Pseudo-code
            html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Algorithme (pseudo-code)</h3>`;
            html += CodeBlock.create(qlearn.contenu.algorithme_pseudocode.join('\n'), null);

            // Exemple grille
            if (qlearn.contenu.exemple) {
                const ex = qlearn.contenu.exemple;
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Exemple : grille ${ex.grille}</h3>`;
                html += Diagrams.qLearningGrid(ex);
                html += `<div style="margin:var(--space-4) 0"><table class="comparison-table">
                    <tr><th>Paramètre</th><th>Valeur</th></tr>
                    <tr><td>Départ</td><td>(${ex.depart.join(', ')})</td></tr>
                    <tr><td>Objectif</td><td>(${ex.objectif.join(', ')}) → récompense ${ex.recompenses.objectif}</td></tr>
                    <tr><td>Case interdite</td><td>(${ex.case_interdite.join(', ')}) → récompense ${ex.recompenses.case_interdite}</td></tr>
                    <tr><td>Déplacement</td><td>récompense ${ex.recompenses.deplacement}</td></tr>
                </table></div>`;
            }

            // 2 Méthodes Python
            if (qlearn.contenu.methodes_python) {
                html += `<h3 style="font-size:var(--text-lg);font-weight:var(--weight-semibold);margin:var(--space-6) 0 var(--space-3)">Comment coder Q-Learning ? (2 méthodes)</h3>`;
                html += `<p style="color:var(--text-secondary);margin-bottom:var(--space-4)">Voici 2 façons de faire — choisissez celle qui vous convient !</p>`;
                qlearn.contenu.methodes_python.forEach(method => {
                    let body = `<p style="color:var(--text-secondary);margin-bottom:var(--space-3)">${method.description}</p>`;
                    body += CodeBlock.create(method.code, method.resultat);
                    html += ConceptCard.create(method.nom, this._svg.wrench, body);
                });
            }

            html += QuizEngine.renderAll('ml_part_4');
            html += ConceptCard.encourage("Bravo ! Vous avez terminé le module d'apprentissage par renforcement. Vous comprenez maintenant comment un agent apprend par essais et erreurs !");
            html += ConceptCard.completeButton('ml_part_4', 1);
            html += `</div>`;
        }

        return html;
    }
};
