// Simplified JavaScript for Educatum Academy
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => loadingScreen.remove(), 500);
        }
    }, 1500);

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle?.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.querySelector('i').className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Mobile Menu
    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    
    menuButton?.addEventListener('click', () => sidebar?.classList.add('active'));
    sidebarClose?.addEventListener('click', () => sidebar?.classList.remove('active'));
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                sidebar?.classList.remove('active');
            }
        });
    });

    // Video Modal
    const heroVideoBtn = document.getElementById('heroVideoBtn');
    const videoModal = document.getElementById('heroVideoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    const heroVideo = document.getElementById('heroVideo');
    
    heroVideoBtn?.addEventListener('click', () => {
        videoModal?.classList.add('active');
        if (heroVideo) heroVideo.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    });
    
    videoModalClose?.addEventListener('click', () => {
        videoModal?.classList.remove('active');
        if (heroVideo) heroVideo.src = '';
    });

    // Stats Counter Animation
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + (target >= 1000 ? '+' : '');
            }
        };
        updateCounter();
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate stats when visible
                if (entry.target.id === 'statsBar') {
                    entry.target.querySelectorAll('.stat-number').forEach(counter => {
                        if (counter.textContent === '0') {
                            animateCounter(counter);
                        }
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.reveal-animation').forEach(el => observer.observe(el));
    const statsBar = document.getElementById('statsBar');
    if (statsBar) observer.observe(statsBar);

    // Canvas Animation
    const canvas = document.getElementById('heroCanvas');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Three.js 3D Element
    if (typeof THREE !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const container = document.getElementById('hero3D');
        if (container) {
            try {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                
                renderer.setSize(300, 300);
                renderer.setClearColor(0x000000, 0);
                container.appendChild(renderer.domElement);
                
                // Create a floating book
                const geometry = new THREE.BoxGeometry(2, 2.8, 0.3);
                const material = new THREE.MeshPhongMaterial({ 
                    color: 0xffd700,
                    shininess: 100,
                    transparent: true,
                    opacity: 0.8
                });
                const book = new THREE.Mesh(geometry, material);
                
                // Lighting
                const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
                scene.add(ambientLight);
                
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(1, 1, 1);
                scene.add(directionalLight);
                
                scene.add(book);
                camera.position.z = 5;
                
                const animate3D = () => {
                    book.rotation.x += 0.005;
                    book.rotation.y += 0.01;
                    book.position.y = Math.sin(Date.now() * 0.001) * 0.3;
                    
                    renderer.render(scene, camera);
                    requestAnimationFrame(animate3D);
                };
                
                animate3D();
            } catch (error) {
                console.log('3D elements could not be initialized');
            }
        }
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('.newsletter-input').value;
        alert(`Thank you for subscribing with email: ${email}`);
        e.target.reset();
    });

    // Custom Cursor (desktop only)
    if (!window.matchMedia('(max-width: 768px)').matches) {
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.custom-cursor-dot');
        
        if (cursor && cursorDot) {
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            let dotX = 0, dotY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            const animateCursor = () => {
                // Smooth cursor follow
                cursorX += (mouseX - cursorX) * 0.1;
                cursorY += (mouseY - cursorY) * 0.1;
                
                dotX += (mouseX - dotX) * 0.3;
                dotY += (mouseY - dotY) * 0.3;
                
                cursor.style.left = cursorX - 20 + 'px';
                cursor.style.top = cursorY - 20 + 'px';
                
                cursorDot.style.left = dotX - 4 + 'px';
                cursorDot.style.top = dotY - 4 + 'px';
                
                requestAnimationFrame(animateCursor);
            };
            
            animateCursor();
            
            // Cursor hover effects
            const hoverElements = document.querySelectorAll('a, button, .category-card, .video-card, .teacher-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    cursor.style.opacity = '0.6';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.opacity = '0.8';
                });
            });
        }
    }

    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const statsBar = document.getElementById('statsBar');
            if (statsBar) {
                statsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Dynamic greeting based on time
    const updateGreeting = () => {
        const greetingElement = document.querySelector('.greeting-text');
        if (!greetingElement) return;
        
        const hour = new Date().getHours();
        let greeting = 'Welcome, Future Innovator!';
        
        if (hour < 12) {
            greeting = 'Good Morning, Future Innovator!';
        } else if (hour < 18) {
            greeting = 'Good Afternoon, Future Innovator!';
        } else {
            greeting = 'Good Evening, Future Innovator!';
        }
        
        greetingElement.textContent = greeting;
    };
    
    updateGreeting();

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add bounce animation to scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        setInterval(() => {
            scrollArrow.style.animation = 'none';
            setTimeout(() => {
                scrollArrow.style.animation = 'bounce 2s infinite';
            }, 10);
        }, 3000);
    }

    // Initialize theme icon based on current theme
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // Add typing effect to hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Quiz Modal functionality (placeholder)
    const quizModal = document.getElementById('courseQuizModal');
    const quizModalClose = document.getElementById('quizModalClose');
    
    quizModalClose?.addEventListener('click', () => {
        quizModal?.classList.remove('active');
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            if (heroVideo) heroVideo.src = '';
        }
        
        if (e.target === quizModal) {
            quizModal.classList.remove('active');
        }
    });

    // Performance optimization: Disable animations on low-end devices
    const isLowEndDevice = () => {
        return navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    };

    if (isLowEndDevice()) {
        document.documentElement.style.setProperty('--transition-smooth', 'none');
        document.documentElement.style.setProperty('--transition-bounce', 'none');
        
        // Disable particles
        if (canvas) {
            canvas.style.display = 'none';
        }
        
        // Disable 3D elements
        const hero3D = document.getElementById('hero3D');
        if (hero3D) {
            hero3D.style.display = 'none';
        }
    }
});
