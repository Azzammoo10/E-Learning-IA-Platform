/* ── Lightweight Animations Engine ── */
const ScrollReveal = {
    observer: null,

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    },

    observe() {
        document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => {
            this.observer.observe(el);
        });
    },

    reset() {
        document.querySelectorAll('.scroll-reveal.revealed').forEach(el => {
            el.classList.remove('revealed');
        });
    }
};

/* ── Animated Counter (lightweight) ── */
const AnimatedCounter = {
    animate(el, target, duration = 600) {
        const startTime = performance.now();
        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            el.textContent = current + (el.dataset.suffix || '');
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + (el.dataset.suffix || '');
        };
        requestAnimationFrame(step);
    },

    observeAll() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    if (target) this.animate(entry.target, target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
    }
};

/* ── Ripple Effect (lightweight) ── */
const RippleEffect = {
    init() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn, .module-card, .quiz-option');
            if (!btn) return;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 400);
        });
    }
};
