/* ── Content Loader — Fetch & parse content.json + content2.json ── */
const ContentLoader = {
    data: null,

    async load() {
        try {
            const [resp1, resp2] = await Promise.all([
                fetch('content.json'),
                fetch('content2.json')
            ]);
            const data1 = await resp1.json();
            const data2 = await resp2.json();

            // Merge: content.json modules + content2.json parties as modules
            this.data = {
                cours: data1.cours,
                modules: [
                    ...data1.modules,
                    ...this._convertContent2(data2)
                ]
            };
            return this.data;
        } catch (e) {
            console.error('Erreur lors du chargement du contenu:', e);
            return null;
        }
    },

    _convertContent2(data2) {
        // Convert content2.json parties into the same module format
        if (!data2.cours || !data2.cours.parties) return [];
        return data2.cours.parties.map(p => ({
            id: 'ml_part_' + p.id,
            titre: p.titre,
            _source: 'content2',
            _data: p
        }));
    },

    getCourseInfo() {
        return this.data ? this.data.cours : null;
    },

    getModules() {
        return this.data ? this.data.modules : [];
    },

    getModule(id) {
        return this.getModules().find(m => m.id === id) || null;
    },

    getModuleIndex(id) {
        return this.getModules().findIndex(m => m.id === id);
    },

    getSections(moduleId) {
        const m = this.getModule(moduleId);
        if (!m) return [];
        if (m.sous_sections) return m.sous_sections;
        if (m.structures_principales) return m.structures_principales;
        if (m._data && m._data.sous_parties) return m._data.sous_parties;
        return [];
    }
};

window.ContentLoader = ContentLoader;
