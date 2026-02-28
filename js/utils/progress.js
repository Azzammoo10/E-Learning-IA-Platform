/* ── Progress Tracker (localStorage) ── */
const ProgressTracker = {
    KEY: 'elearning-progress',

    _load() {
        try {
            return JSON.parse(localStorage.getItem(this.KEY)) || {};
        } catch { return {}; }
    },

    _save(data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    },

    markComplete(moduleId, sectionIndex) {
        const data = this._load();
        if (!data[moduleId]) data[moduleId] = [];
        if (!data[moduleId].includes(sectionIndex)) {
            data[moduleId].push(sectionIndex);
        }
        this._save(data);
        this.updateUI();
    },

    isComplete(moduleId, sectionIndex) {
        const data = this._load();
        return data[moduleId] ? data[moduleId].includes(sectionIndex) : false;
    },

    getModuleProgress(moduleId, totalSections) {
        const data = this._load();
        const completed = data[moduleId] ? data[moduleId].length : 0;
        return totalSections > 0 ? Math.round((completed / totalSections) * 100) : 0;
    },

    getOverallProgress(modules) {
        if (!modules || modules.length === 0) return 0;
        let totalSections = 0;
        let totalCompleted = 0;
        const data = this._load();

        modules.forEach(m => {
            const count = this._getSectionCount(m);
            totalSections += count;
            totalCompleted += data[m.id] ? Math.min(data[m.id].length, count) : 0;
        });

        return totalSections > 0 ? Math.round((totalCompleted / totalSections) * 100) : 0;
    },

    _getSectionCount(module) {
        if (module.sous_sections) return module.sous_sections.length;
        if (module.structures_principales) return module.structures_principales.length;
        if (module.syntaxes_import) return 1;
        if (module.bibliotheques) return 1;
        if (module.types_graphiques) return module.types_graphiques.length;
        return 1;
    },

    updateUI() {
        if (!window.ContentLoader || !window.ContentLoader.data) return;
        const modules = window.ContentLoader.data.modules;
        const pct = this.getOverallProgress(modules);
        const fill = document.getElementById('globalProgressFill');
        const text = document.getElementById('globalProgressText');
        if (fill) fill.style.width = pct + '%';
        if (text) text.textContent = pct + '%';
    },

    getQuizScore(moduleId) {
        try {
            const scores = JSON.parse(localStorage.getItem('elearning-quiz-scores')) || {};
            return scores[moduleId] || { correct: 0, total: 0 };
        } catch { return { correct: 0, total: 0 }; }
    },

    saveQuizScore(moduleId, correct, total) {
        try {
            const scores = JSON.parse(localStorage.getItem('elearning-quiz-scores')) || {};
            scores[moduleId] = { correct, total };
            localStorage.setItem('elearning-quiz-scores', JSON.stringify(scores));
        } catch { }
    }
};
