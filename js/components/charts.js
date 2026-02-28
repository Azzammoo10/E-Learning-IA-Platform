/* ── Charts — Interactive Chart.js charts ── */
const Charts = {
    renderGradesChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container || typeof Chart === 'undefined') return;

        const grades = [50, 50, 47, 97, 49, 3, 53, 42, 26, 74, 82, 62, 37, 15, 70, 27, 36, 35, 48, 52, 63, 64];
        const hours = [10, 11.5, 9, 16, 9.25, 1, 11.5, 9, 8.5, 14.5, 15.5, 13.75, 9, 8, 15.5, 8, 9, 6, 10, 12, 12.5, 12];

        const canvas = document.createElement('canvas');
        canvas.style.maxHeight = '350px';
        container.appendChild(canvas);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#94a3b8' : '#475569';
        const gridColor = isDark ? 'rgba(148,163,184,0.1)' : 'rgba(0,0,0,0.06)';

        new Chart(canvas, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Étudiants',
                    data: hours.map((h, i) => ({ x: h, y: grades[i] })),
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 9
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: { display: true, text: 'Heures d\'étude vs Notes', color: textColor, font: { size: 16, family: 'Inter' } },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.raw.x}h d'étude → Note: ${ctx.raw.y}/100`
                        }
                    }
                },
                scales: {
                    x: { title: { display: true, text: 'Heures d\'étude', color: textColor }, grid: { color: gridColor }, ticks: { color: textColor } },
                    y: { title: { display: true, text: 'Note finale', color: textColor }, grid: { color: gridColor }, ticks: { color: textColor } }
                }
            }
        });
    },

    renderDemoChart(containerId, type) {
        const container = document.getElementById(containerId);
        if (!container || typeof Chart === 'undefined') return;

        const canvas = document.createElement('canvas');
        canvas.style.maxHeight = '300px';
        container.appendChild(canvas);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#94a3b8' : '#475569';

        if (type === 'sincos') {
            const x = Array.from({ length: 50 }, (_, i) => (i / 50) * 2 * Math.PI);
            new Chart(canvas, {
                type: 'line',
                data: {
                    labels: x.map(v => v.toFixed(1)),
                    datasets: [
                        { label: 'sin(x)', data: x.map(Math.sin), borderColor: '#3b82f6', borderWidth: 2, pointRadius: 0, tension: 0.4 },
                        { label: 'cos(x)', data: x.map(Math.cos), borderColor: '#ef4444', borderWidth: 2, borderDash: [5, 5], pointRadius: 0, tension: 0.4 }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: { title: { display: true, text: 'Fonctions Sin et Cos', color: textColor, font: { size: 14, family: 'Inter' } } },
                    scales: {
                        x: { display: true, ticks: { color: textColor, maxTicksLimit: 8 } },
                        y: { ticks: { color: textColor } }
                    }
                }
            });
        } else if (type === 'bar') {
            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: ['Python', 'Java', 'PHP', 'C++', 'JavaScript'],
                    datasets: [{ label: 'Popularité', data: [35, 25, 10, 15, 30], backgroundColor: ['#3b82f6', '#f97316', '#a855f7', '#14b8a6', '#eab308'] }]
                },
                options: {
                    responsive: true,
                    plugins: { title: { display: true, text: 'Exemple de diagramme en barres', color: textColor, font: { size: 14, family: 'Inter' } }, legend: { display: false } },
                    scales: { y: { ticks: { color: textColor } }, x: { ticks: { color: textColor } } }
                }
            });
        }
    },

    // ── ML Charts ──

    renderLinearRegression(containerId) {
        const container = document.getElementById(containerId);
        if (!container || typeof Chart === 'undefined') return;
        const canvas = document.createElement('canvas');
        canvas.style.maxHeight = '350px';
        container.appendChild(canvas);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#94a3b8' : '#475569';

        // Data from example 1 in content2
        const xData = [1, 2, 3, 4, 5];
        const yData = [3, 4, 2, 4, 5];
        const m = 0.4, c = 2.4;
        const lineY = xData.map(x => c + m * x);

        new Chart(canvas, {
            type: 'scatter',
            data: {
                datasets: [
                    { label: 'Données', data: xData.map((x, i) => ({ x, y: yData[i] })), backgroundColor: 'rgba(59,130,246,0.7)', pointRadius: 8, pointHoverRadius: 11 },
                    { label: 'Droite y=2.4+0.4x', data: xData.map((x, i) => ({ x, y: lineY[i] })), type: 'line', borderColor: '#ef4444', borderWidth: 3, pointRadius: 0, tension: 0 }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: { display: true, text: 'Régression linéaire : y = 2.4 + 0.4x', color: textColor, font: { size: 14, family: 'Inter' } },
                    legend: { labels: { color: textColor } }
                },
                scales: {
                    x: { title: { display: true, text: 'x', color: textColor }, ticks: { color: textColor } },
                    y: { title: { display: true, text: 'y', color: textColor }, ticks: { color: textColor } }
                }
            }
        });
    },

    renderKNNChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container || typeof Chart === 'undefined') return;
        const canvas = document.createElement('canvas');
        canvas.style.maxHeight = '350px';
        container.appendChild(canvas);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#94a3b8' : '#475569';

        new Chart(canvas, {
            type: 'scatter',
            data: {
                datasets: [
                    { label: 'Classe A', data: [{ x: 2, y: 4 }, { x: 4, y: 2 }], backgroundColor: 'rgba(59,130,246,0.7)', pointRadius: 10, pointStyle: 'circle' },
                    { label: 'Classe B', data: [{ x: 4, y: 4 }, { x: 4, y: 6 }, { x: 6, y: 4 }], backgroundColor: 'rgba(34,197,94,0.7)', pointRadius: 10, pointStyle: 'triangle' },
                    { label: 'Test (5,5)', data: [{ x: 5, y: 5 }], backgroundColor: 'rgba(239,68,68,0.9)', pointRadius: 14, pointStyle: 'star', borderColor: '#ef4444', borderWidth: 2 }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: { display: true, text: 'KNN : Classification du point (5,5)', color: textColor, font: { size: 14, family: 'Inter' } },
                    legend: { labels: { color: textColor } }
                },
                scales: {
                    x: { min: 0, max: 8, title: { display: true, text: 'X', color: textColor }, ticks: { color: textColor } },
                    y: { min: 0, max: 8, title: { display: true, text: 'Y', color: textColor }, ticks: { color: textColor } }
                }
            }
        });
    },

    renderKMeansChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container || typeof Chart === 'undefined') return;
        const canvas = document.createElement('canvas');
        canvas.style.maxHeight = '350px';
        container.appendChild(canvas);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#94a3b8' : '#475569';

        // Simulated clustering data
        const cluster1 = [{ x: 2, y: 3 }, { x: 2.5, y: 4 }, { x: 3, y: 3.5 }, { x: 1.5, y: 3.5 }, { x: 2, y: 4.5 }];
        const cluster2 = [{ x: 7, y: 8 }, { x: 7.5, y: 7 }, { x: 8, y: 8.5 }, { x: 6.5, y: 7.5 }, { x: 7, y: 7 }];
        const cluster3 = [{ x: 6, y: 2 }, { x: 5.5, y: 1.5 }, { x: 7, y: 2.5 }, { x: 6.5, y: 1 }, { x: 6, y: 3 }];

        new Chart(canvas, {
            type: 'scatter',
            data: {
                datasets: [
                    { label: 'Cluster 1', data: cluster1, backgroundColor: 'rgba(59,130,246,0.7)', pointRadius: 8 },
                    { label: 'Cluster 2', data: cluster2, backgroundColor: 'rgba(34,197,94,0.7)', pointRadius: 8 },
                    { label: 'Cluster 3', data: cluster3, backgroundColor: 'rgba(168,85,247,0.7)', pointRadius: 8 },
                    { label: 'Centroïdes', data: [{ x: 2.2, y: 3.7 }, { x: 7.2, y: 7.6 }, { x: 6.2, y: 2.0 }], backgroundColor: '#ef4444', pointRadius: 14, pointStyle: 'crossRot', borderColor: '#ef4444', borderWidth: 3 }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: { display: true, text: 'K-Means : 3 Clusters avec centroïdes', color: textColor, font: { size: 14, family: 'Inter' } },
                    legend: { labels: { color: textColor } }
                },
                scales: {
                    x: { title: { display: true, text: 'X', color: textColor }, ticks: { color: textColor } },
                    y: { title: { display: true, text: 'Y', color: textColor }, ticks: { color: textColor } }
                }
            }
        });
    }
};
