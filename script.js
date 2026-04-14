// Wedding Invitation JavaScript - Full Interactive Features + Sumbangan Digital
document.addEventListener('DOMContentLoaded', function() {
    // Wedding Date (change this to actual date)
    const weddingDate = new Date('2024-12-31T10:00:00').getTime();

    // Countdown Timer
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownEl = document.getElementById('countdown');
        if (countdownEl && distance > 0) {
            countdownEl.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Hari</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Jam</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Menit</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Detik</span>
                </div>
            `;
        } else if (countdownEl) {
            countdownEl.innerHTML = '<h2 style="color: var(--accent);">Hari Bahagia Telah Tiba! 💍✨</h2>';
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Particles Animation
    function initParticles() {
        const canvas = document.getElementById('particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Music Control
    const musicToggle = document.getElementById('musicToggle');
    const weddingMusic = document.getElementById('weddingMusic');
    let musicPlaying = false;

    if (musicToggle && weddingMusic) {
        // Auto play on load (with user interaction fallback)
        const playMusic = () => {
            weddingMusic.play().then(() => {
                musicPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(e => {
                console.log('Autoplay blocked:', e);
                // Fallback: wait for first user interaction
                document.addEventListener('click', playMusicFallback, { once: true });
            });
        };
        
        const playMusicFallback = () => {
            weddingMusic.play().then(() => {
                musicPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            });
        };
        
        // Try autoplay after load
        window.addEventListener('load', playMusic);
        
        musicToggle.addEventListener('click', () => {
            if (musicPlaying) {
                weddingMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                musicPlaying = false;
            } else {
                weddingMusic.play().then(() => {
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    musicPlaying = true;
                });
            }
        });
        
        // Continue on visibility change (tab switch)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && musicPlaying) {
                weddingMusic.play();
            }
        });
    }

    // Forms Handlers
    function handleFormSubmit(formId, title) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                let alertMsg = title + ' diterima!\n\n';
                for (let key in data) {
                    if (data[key]) alertMsg += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${data[key]}\n`;
                }
                alertMsg += '\nTerima kasih 🙏💕';
                
                alert(alertMsg);
                console.log(formId + ' Data:', data);
                form.reset();
                confettiBurst();
            });
        }
    }

    handleFormSubmit('rsvpForm', 'Konfirmasi Kehadiran');
    handleFormSubmit('donationForm', 'Sumbangan Digital');

    // Copy Account Function (global for onclick)
    window.copyAccount = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            const btn = event.target;
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            btn.style.background = '#10b981';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
            }, 2000);
        }).catch(() => alert('Gagal copy'));
    };

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    initParticles();

    // Confetti
    function confettiBurst() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed; left: ${Math.random()*100}vw; top: -10px;
                width: 10px; height: 10px;
                background: [${['#d4af37', '#f8c7cc', '#e8b4c1'][Math.floor(Math.random()*3)]}];
                pointer-events: none; z-index: 10000;
                animation: fall 3s linear forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    // CSS for confetti
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = '@keyframes fall { to { transform: translateY(100vh) rotate(360deg); opacity: 0; } }';
    document.head.appendChild(confettiStyle);

    // Heart cursor
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.cssText = 'position: fixed; left: ' + e.clientX + 'px; top: ' + e.clientY + 'px; pointer-events: none; font-size: 20px; z-index: 9999; animation: fadeInUp 1s ease forwards';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    });
});
