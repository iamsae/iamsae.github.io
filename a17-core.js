// Scalzo + Graffio Inspired JavaScript - Premium Smooth Scrolling

document.addEventListener('DOMContentLoaded', function() {
    // Performance monitoring
    const startTime = performance.now();
    
    // Initialize Lenis smooth scrolling
    let lenis;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Initialize Lenis for smooth scrolling
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });
        
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        
        requestAnimationFrame(raf);
        
        // Connect Lenis to GSAP ScrollTrigger if available
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }
    
    // Custom Cursor System - Optimized
    const cursorDot = document.createElement('div');
    cursorDot.id = 'cursorDot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        will-change: transform;
        transition: transform 0.1s ease-out;
    `;
    document.body.appendChild(cursorDot);
    
    const cursorRing = document.createElement('div');
    cursorRing.id = 'cursorRing';
    cursorRing.style.cssText = `
        position: fixed;
        width: 24px;
        height: 24px;
        border: 1.5px solid white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: difference;
        will-change: transform;
        transition: transform 0.15s ease-out;
    `;
    document.body.appendChild(cursorRing);
    
    // Cursor state management
    const cursor = {
        x: 0,
        y: 0,
        dotX: 0,
        dotY: 0,
        ringX: 0,
        ringY: 0,
        isMoving: false,
        timer: null,
        raf: null
    };
    
    // Throttled mouse movement
    let lastMouseTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = performance.now();
        if (now - lastMouseTime > 16) { // 60fps
            cursor.x = e.clientX;
            cursor.y = e.clientY;
            cursor.isMoving = true;
            lastMouseTime = now;
            
            clearTimeout(cursor.timer);
            cursor.timer = setTimeout(() => {
                cursor.isMoving = false;
            }, 100);
        }
    });
    
    // Optimized cursor animation
    function animateCursor() {
        // Smooth dot movement
        cursor.dotX += (cursor.x - cursor.dotX) * 0.5;
        cursor.dotY += (cursor.y - cursor.dotY) * 0.5;
        cursorDot.style.transform = `translate(${cursor.dotX - 3}px, ${cursor.dotY - 3}px)`;
        
        // Smooth ring movement
        cursor.ringX += (cursor.x - cursor.ringX) * 0.15;
        cursor.ringY += (cursor.y - cursor.ringY) * 0.15;
        cursorRing.style.transform = `translate(${cursor.ringX - 12}px, ${cursor.ringY - 12}px)`;
        
        cursor.raf = requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
    }
    
    // Optimized reveal animations with ScrollTrigger
    const revealElements = document.querySelectorAll('.reveal');
    
    if (typeof ScrollTrigger !== 'undefined') {
        revealElements.forEach((element, index) => {
            gsap.fromTo(element, 
                { 
                    opacity: 0, 
                    y: 30 
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    },
                    delay: index * 0.1
                }
            );
        });
    } else {
        // Fallback to IntersectionObserver
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // Enhanced smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                if (lenis) {
                    lenis.scrollTo(target, {
                        offset: -50,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Optimized hover effects
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .contact-item');
    let hoverTimeout;
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!('ontouchstart' in window)) {
                clearTimeout(hoverTimeout);
                cursorRing.style.transform = `translate(${cursor.ringX - 12}px, ${cursor.ringY - 12}px) scale(1.5)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (!('ontouchstart' in window)) {
                hoverTimeout = setTimeout(() => {
                    cursorRing.style.transform = `translate(${cursor.ringX - 12}px, ${cursor.ringY - 12}px) scale(1)`;
                }, 100);
            }
        });
    });
    
    // Magnetic button effect for CTA buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
    
    // Performance cleanup
    window.addEventListener('beforeunload', () => {
        if (cursor.raf) cancelAnimationFrame(cursor.raf);
        if (cursor.timer) clearTimeout(cursor.timer);
        if (hoverTimeout) clearTimeout(hoverTimeout);
        if (cursorDot) cursorDot.remove();
        if (cursorRing) cursorRing.remove();
        if (lenis) lenis.destroy();
    });
    
    // Performance metrics
    const loadTime = performance.now() - startTime;
    console.log(`✨ Premium experience loaded in ${loadTime.toFixed(2)}ms`);
    
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // ==========================================
    // FLOATING NAVIGATION - Hide/Show on Scroll
    // ==========================================
    const floatingNav = document.getElementById('floatingNav');
    let lastScroll = 0;
    let scrollTimeout;
    
    // Show nav after scrolling past hero
    const heroSection = document.querySelector('.hero-scalzo');
    const heroHeight = heroSection ? heroSection.offsetHeight : 500;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        clearTimeout(scrollTimeout);
        
        // Show nav after hero section
        if (currentScroll > heroHeight * 0.5) {
            floatingNav.classList.add('visible');
            
            // Hide when scrolling down, show when scrolling up
            if (currentScroll > lastScroll && currentScroll > heroHeight) {
                // Scrolling down - hide
                floatingNav.classList.add('hidden-nav');
                floatingNav.classList.remove('visible');
            } else {
                // Scrolling up - show
                floatingNav.classList.remove('hidden-nav');
                floatingNav.classList.add('visible');
            }
        } else {
            floatingNav.classList.remove('visible');
            floatingNav.classList.remove('hidden-nav');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // ==========================================
    // PARTICLE SYSTEM
    // ==========================================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = `rgba(255, 255, 255, ${this.opacity})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(100, window.innerWidth / 10);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse interaction
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            
            // Draw connections between nearby particles
            for (let j = index + 1; j < particles.length; j++) {
                const dx = particles[j].x - particle.x;
                const dy = particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            
            // Mouse interaction - particles move away from cursor
            if (mouse.x && mouse.y) {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.x -= dx * force * 0.02;
                    particle.y -= dy * force * 0.02;
                }
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // ==========================================
    // FUN INTERACTIVE EFFECTS
    // ==========================================
    
    // Random floating shapes on click
    document.addEventListener('click', (e) => {
        createClickBurst(e.clientX, e.clientY);
    });
    
    function createClickBurst(x, y) {
        const burstCount = 8;
        const colors = ['#ff6b6b', '#4ecdc4', '#a29bfe', '#ffe66d', '#ff9ff3'];
        
        for (let i = 0; i < burstCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9997;
                animation: burstFloat 1s ease-out forwards;
            `;
            
            // Set custom properties for animation
            const angle = (Math.PI * 2 * i) / burstCount;
            const distance = 50 + Math.random() * 50;
            particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }
    
    // Add burst animation keyframes
    const burstStyle = document.createElement('style');
    burstStyle.textContent = `
        @keyframes burstFloat {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(calc(-50% + var(--tx, 0)), calc(-50% + var(--ty, 0))) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(burstStyle);
    
    // ==========================================
    // TEXT SCRAMBLE EFFECT ON HOVER
    // ==========================================
    const scrambleElements = document.querySelectorAll('.hero-title, .section-title');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    scrambleElements.forEach(element => {
        const originalText = element.textContent;
        let interval;
        
        element.addEventListener('mouseenter', () => {
            let iteration = 0;
            clearInterval(interval);
            
            interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }
                
                iteration += 1/3;
            }, 30);
        });
        
        element.addEventListener('mouseleave', () => {
            clearInterval(interval);
            element.textContent = originalText;
        });
    });
    
    // Cleanup function for new features
    const cleanup = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
    };
    
    window.addEventListener('beforeunload', cleanup);
});
