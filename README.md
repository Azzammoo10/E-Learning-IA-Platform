<div align="center">

# 🎓 E-Learning IA Platform

### Analyse des Données avec Python & Machine Learning

[![Made with HTML/CSS/JS](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-blue?style=for-the-badge&logo=html5)](.)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=for-the-badge&logo=github)](.)
[![Chart.js](https://img.shields.io/badge/Charts-Chart.js%204-FF6384?style=for-the-badge&logo=chartdotjs)](https://www.chartjs.org/)

**Une plateforme e-learning interactive et animée, conçue pour les étudiants GEII de l'EST-Salé (Université Mohammed V).**

Apprenez l'analyse de données avec Python (NumPy, Pandas, Matplotlib) et les fondamentaux du Machine Learning — de manière visuelle, progressive et engageante.

[🚀 Voir la Démo](#) · [📖 Documentation](#architecture) · [🐛 Signaler un Bug](../../issues)

---

</div>

## ✨ Fonctionnalités

| Catégorie | Détails |
|-----------|---------|
| 📚 **9 Modules Complets** | Python, NumPy, Pandas, Matplotlib + Introduction ML, Supervisé, Non-Supervisé, Renforcement |
| 🎨 **UI Premium** | Design glassmorphism, dark mode, animations fluides, particules flottantes |
| 📊 **Charts Interactifs** | Régression linéaire, KNN, K-Means avec Chart.js |
| 🧩 **SVG Diagrams** | Pipeline ML, Classification vs Régression, Cycle RL, Grille Q-Learning |
| 🧠 **Quiz Intégrés** | Tests de compréhension avec feedback immédiat et animations |
| 🃏 **Flashcards** | Mode révision pour renforcer la mémorisation |
| 📖 **Glossaire** | Recherche instantanée de termes techniques |
| 📱 **100% Responsive** | Optimisé pour mobile, tablette et desktop (5 breakpoints) |
| 🌙 **Dark Mode** | Basculement fluide entre thème clair et sombre |
| 📈 **Suivi de Progression** | Barre de progression par module et globale |
| ✨ **Animations Pro** | Particules, ripple clicks, 3D tilt, gradient animé, transitions fluides |

---

## 🏗️ Architecture

```
E-Learning-IA/
├── index.html              # Point d'entrée — SPA avec routing hash
├── content.json            # Contenu Python (NumPy, Pandas, Matplotlib)
├── content2.json           # Contenu Machine Learning
├── css/
│   ├── variables.css       # Design tokens (couleurs, typographie, espacements)
│   ├── layout.css          # Grille Sidebar + Main + Footer responsive
│   ├── components.css      # Cards, quiz, flashcards, tables, badges
│   ├── animations.css      # Keyframes, micro-interactions, effets
│   └── code.css            # Syntax highlighting pour les blocs Python
├── js/
│   ├── app.js              # Router SPA, initialisation des systèmes
│   ├── content-loader.js   # Fusion content.json + content2.json
│   ├── renderer.js         # Rendu des modules (5 Python + 4 ML)
│   ├── components/
│   │   ├── sidebar.js      # Navigation latérale avec sous-sections
│   │   ├── dashboard.js    # Page d'accueil avec roadmap SVG
│   │   ├── concept-card.js # Cartes de concepts accordéon
│   │   ├── code-block.js   # Blocs de code avec copie
│   │   ├── quiz-engine.js  # Moteur de quiz interactif
│   │   ├── flashcard.js    # Cartes de révision flip
│   │   ├── diagrams.js     # Générateurs SVG (9 diagrammes)
│   │   ├── charts.js       # Graphiques Chart.js interactifs
│   │   └── glossary.js     # Glossaire searchable
│   └── utils/
│       ├── theme.js        # Gestionnaire dark/light mode
│       ├── progress.js     # Tracker de progression localStorage
│       ├── syntax.js       # Tokenizer Python custom
│       └── animations.js   # Particules, ripple, tilt, counters
└── README.md
```

---

## 🚀 Démarrage Rapide

### Prérequis

- Un navigateur moderne (Chrome, Firefox, Edge, Safari)
- [Node.js](https://nodejs.org/) (optionnel, pour le serveur local)

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/E-Learning-IA.git
cd E-Learning-IA

# Lancer un serveur local
npx -y serve . -l 3000

# Ouvrir dans le navigateur
# → http://localhost:3000
```

> **💡 Alternative :** Ouvrez simplement `index.html` dans votre navigateur, ou utilisez l'extension **Live Server** de VS Code.

---

## 🌐 Déploiement (GitHub Pages)

Ce projet est **100% statique** — aucun build nécessaire.

```bash
# 1. Initialiser git et pousser
git init
git add .
git commit -m "🎓 E-Learning IA Platform"
git remote add origin https://github.com/VOTRE_USERNAME/E-Learning-IA.git
git branch -M main
git push -u origin main

# 2. Activer GitHub Pages
# → Settings → Pages → Source: main / root → Save

# 3. Votre site est live !
# → https://VOTRE_USERNAME.github.io/E-Learning-IA/
```

---

## 🎯 Approche Pédagogique

La plateforme applique des principes modernes de sciences de l'apprentissage :

- **🔄 Progressive Disclosure** — Révélation graduelle de la complexité
- **🧠 Dual Coding** — Chaque concept combine texte + visuel (diagrammes, charts)
- **📐 Scaffolding** — Structure : Définition → Pourquoi → Visuel → Étapes → Code → Quiz
- **🎮 Active Recall** — Quiz et flashcards pour renforcer la mémorisation
- **🌍 Langue simple** — Français clair adapté aux étudiants non-informaticiens

---

## 🛠️ Stack Technique

| Technologie | Utilisation |
|-------------|-------------|
| **HTML5** | Structure sémantique |
| **CSS3** | Design system complet avec variables, glassmorphism, animations |
| **Vanilla JS** | Logic applicative (SPA, routing, rendu) |
| **Chart.js 4** | Graphiques interactifs (régression, KNN, K-Means) |
| **Google Fonts** | Inter + JetBrains Mono |
| **LocalStorage** | Sauvegarde de la progression utilisateur |

---

## 📚 Contenu des Modules

### Python & Data Analysis
| # | Module | Sections |
|---|--------|----------|
| 1 | Introduction à l'analyse des données | Vue d'ensemble, outils |
| 2 | Comment utiliser un module en Python | import, from, as, pip |
| 3 | Le module NumPy | Tableaux, opérations, indexation |
| 4 | Le module Pandas | Series, DataFrame, manipulation |
| 5 | Le module Matplotlib | Graphiques, personnalisation |

### Machine Learning
| # | Module | Concepts clés |
|---|--------|---------------|
| 6 | Introduction au ML | Types de données, pipeline ML, 3 types d'apprentissage |
| 7 | Apprentissage Supervisé | Classification, Régression Linéaire, KNN |
| 8 | Apprentissage Non Supervisé | Clustering, K-Means |
| 9 | Apprentissage par Renforcement | Q-Learning, Q-Table, Exploration vs Exploitation |

---

## 👤 Auteur

<div align="center">

**Mohamed Azzam**

🛡️ Cybersecurity Engineer

[![Website](https://img.shields.io/badge/Website-azzammo.com-blue?style=flat-square&logo=google-chrome)](https://azzammo.com)

*Université Mohammed V — EST-Salé*

</div>

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

*Fait avec ❤️ pour les étudiants GEII*

</div>
