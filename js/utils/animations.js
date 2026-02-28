/* ── Professional Animations Engine ── */
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
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
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

/* ── Floating Particles Background ── */
const Particles = {
    canvas: null,
    ctx: null,
    particles: [],
    animId: null,
    active: false,

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particleCanvas';
        this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.4;';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this._resize();
        window.addEventListener('resize', () => this._resize());
        this._createParticles();
        this.active = true;
        this._animate();
    },

    _resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    _createParticles() {
        this.particles = [];
        const count = Math.min(35, Math.floor(window.innerWidth / 50));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    },

    _animate() {
        if (!this.active) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const color = isDark ? '148,163,184' : '59,130,246';

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${color},${p.opacity})`;
            this.ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(${color},${0.06 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }

        this.animId = requestAnimationFrame(() => this._animate());
    },

    destroy() {
        this.active = false;
        if (this.animId) cancelAnimationFrame(this.animId);
        if (this.canvas) this.canvas.remove();
    }
};

/* ── Animated Counter ── */
const AnimatedCounter = {
    animate(el, target, duration = 1200) {
        let start = 0;
        const startTime = performance.now();
        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.floor(eased * target);
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

/* ── Typing Effect ── */
const TypingEffect = {
    type(el, text, speed = 40) {
        el.textContent = '';
        el.style.borderRight = '2px solid var(--primary-500)';
        let i = 0;
        const interval = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                setTimeout(() => { el.style.borderRight = 'none'; }, 1000);
            }
        }, speed);
    }
};

/* ── Ripple Effect on Buttons ── */
const RippleEffect = {
    init() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn, .module-card, .quiz-option, .sidebar-nav-item');
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
            setTimeout(() => ripple.remove(), 600);
        });
    }
};

/* ── Smooth Page Transition ── */
const PageTransition = {
    animate(contentEl) {
        contentEl.style.opacity = '0';
        contentEl.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
            contentEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            contentEl.style.opacity = '1';
            contentEl.style.transform = 'translateY(0)';
        });
    }
};

/* ── Tilt Effect on Cards ── */
const TiltEffect = {
    init() {
        document.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.module-card');
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-6px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        });

        document.addEventListener('mouseleave', (e) => {
            const card = e.target.closest('.module-card');
            if (card) card.style.transform = '';
        }, true);
    }
};
