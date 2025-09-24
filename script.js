// Educatum Academy - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Educatum Academy - Initializing...');

    // ===========================
    // UTILITY FUNCTIONS
    // ===========================
    const utils = {
        // Debounce function for performance
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Check if element is in viewport
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Format numbers with commas
        formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        // Check if user prefers reduced motion
        prefersReducedMotion() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    };

    // ===========================
    // LOADING SCREEN
    // ===========================
    const initLoadingScreen = () => {
        try {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.remove();
                        console.log('✅ Loading screen removed');
                    }, 500);
                }
            }, 1500);
        } catch (error) {
            console.error('❌ Loading screen error:', error);
        }
    };

    // ===========================
    // THEME SYSTEM
    // ===========================
    const initTheme = () => {
        try {
            const themeToggle = document.getElementById('themeToggle');
            const currentTheme = localStorage.getItem('theme') || 'light';
            
            // Set initial theme
            document.documentElement.setAttribute('data-theme', currentTheme);
            updateThemeIcon(currentTheme);
            
            if (!themeToggle) return;
            
            themeToggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const newTheme = current === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);
                
                console.log(`🎨 Theme switched to: ${newTheme}`);
            });
        } catch (error) {
            console.error('❌ Theme system error:', error);
        }
    };

    const updateThemeIcon = (theme) => {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    // ===========================
    // NAVIGATION SYSTEM
    // ===========================
    const initNavigation = () => {
        try {
            const menuButton = document.getElementById('menuButton');
            const sidebar = document.getElementById('sidebar');
            const sidebarClose = document.getElementById('sidebarClose');
            
            // Mobile menu toggle
            menuButton?.addEventListener('click', () => {
                sidebar?.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            });
            
            // Close sidebar
            const closeSidebar = () => {
                sidebar?.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            };
            
            sidebarClose?.addEventListener('click', closeSidebar);
            
            // Close sidebar on outside click
            sidebar?.addEventListener('click', (e) => {
                if (e.target === sidebar) closeSidebar();
            });
            
            // Close sidebar on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && sidebar?.classList.contains('active')) {
                    closeSidebar();
                }
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        const headerOffset = 80; // Account for fixed header
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        closeSidebar(); // Close mobile menu if open
                    }
                });
            });
            
            // Navigation scroll effect
            let lastScrollTop = 0;
            const navbar = document.querySelector('nav');
            
            window.addEventListener('scroll', utils.debounce(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (navbar) {
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        // Scrolling down
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up
                        navbar.style.transform = 'translateY(0)';
                    }
                }
                
                lastScrollTop = scrollTop;
            }, 100));
            
        } catch (error) {
            console.error('❌ Navigation system error:', error);
        }
    };

    // ===========================
    // STATS COUNTER ANIMATION
    // ===========================
    const initStatsCounter = () => {
        try {
            const statsNumbers = document.querySelectorAll('.stat-number');
            let hasAnimated = false;
            
            const animateCounter = (element) => {
                const target = parseInt(element.dataset.target);
                if (isNaN(target)) return;
                
                const duration = 2000; // 2 seconds
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                const easeOutQuad = t => t * (2 - t);
                
                let frame = 0;
                
                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentValue = Math.round(target * progress);
                    
                    element.textContent = utils.formatNumber(currentValue);
                    
                    if (frame === totalFrames) {
                        clearInterval(counter);
                        // Add appropriate suffix
                        if (target >= 1000) {
                            element.textContent = utils.formatNumber(target) + '+';
                        } else if (element.textContent.includes('%') === false && target === 98) {
                            element.textContent = target + '%';
                        } else {
                            element.textContent = utils.formatNumber(target);
                        }
                    }
                }, frameDuration);
            };
            
            // Intersection Observer for stats animation
            const statsBar = document.getElementById('statsBar');
            if (statsBar && statsNumbers.length > 0) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !hasAnimated) {
                            hasAnimated = true;
                            setTimeout(() => {
                                statsNumbers.forEach(counter => {
                                    animateCounter(counter);
                                });
                            }, 200); // Small delay for better effect
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(statsBar);
            }
            
        } catch (error) {
            console.error('❌ Stats counter error:', error);
        }
    };

    // ===========================
    // VIDEO MODAL SYSTEM
    // ===========================
    const initVideoModal = () => {
        try {
            const heroVideoBtn = document.getElementById('heroVideoBtn');
            const videoModal = document.getElementById('heroVideoModal');
            const videoModalClose = document.getElementById('videoModalClose');
            const heroVideo = document.getElementById('heroVideo');
            
            const openModal = () => {
                if (!videoModal || !heroVideo) return;
                videoModal.classList.add('active');
                heroVideo.src = 'https://www.youtube.com/embed/b-ELMKkHEDU?autoplay=1&rel=0';
                document.body.style.overflow = 'hidden';
            };
            
            const closeModal = () => {
                if (!videoModal || !heroVideo) return;
                videoModal.classList.remove('active');
                heroVideo.src = '';
                document.body.style.overflow = '';
            };
            
            heroVideoBtn?.addEventListener('click', openModal);
            videoModalClose?.addEventListener('click', closeModal);
            
            // Close modal on outside click
            videoModal?.addEventListener('click', (e) => {
                if (e.target === videoModal) closeModal();
            });
            
            // Close modal on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
                    closeModal();
                }
            });
            
        } catch (error) {
            console.error('❌ Video modal error:', error);
        }
    };

    // ===========================
    // SCROLL ANIMATIONS
    // ===========================
    const initScrollAnimations = () => {
        try {
            if (utils.prefersReducedMotion()) {
                // If user prefers reduced motion, show all elements immediately
                document.querySelectorAll('.reveal-animation').forEach(el => {
                    el.classList.add('revealed');
                });
                return;
            }
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observe all elements with reveal animation
            document.querySelectorAll('.reveal-animation').forEach(el => {
                observer.observe(el);
            });
            
        } catch (error) {
            console.error('❌ Scroll animations error:', error);
        }
    };

    // ===========================
    // SCROLL INDICATOR
    // ===========================
    const initScrollIndicator = () => {
        try {
            const scrollIndicator = document.getElementById('scrollIndicator');
            
            if (scrollIndicator) {
                scrollIndicator.addEventListener('click', () => {
                    const coursesSection = document.getElementById('courses');
                    if (coursesSection) {
                        const headerOffset = 80;
                        const elementPosition = coursesSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
            
        } catch (error) {
            console.error('❌ Scroll indicator error:', error);
        }
    };

    // ===========================
    // CANVAS ANIMATION
    // ===========================
    const initCanvasAnimation = () => {
        try {
            const canvas = document.getElementById('heroCanvas');
            
            if (!canvas || utils.prefersReducedMotion()) return;
            
            const ctx = canvas.getContext('2d');
            const particles = [];
            let animationId;
            
            const resizeCanvas = () => {
                const rect = canvas.parentElement.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            };
            
            const createParticle = () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
            
            const initParticles = () => {
                particles.length = 0; // Clear existing particles
                for (let i = 0; i < 30; i++) { // Reduced from 50 for better performance
                    particles.push(createParticle());
                }
            };
            
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Bounce off edges
                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                    
                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                    ctx.fill();
                });
                
                animationId = requestAnimationFrame(animate);
            };
            
            resizeCanvas();
            initParticles();
            animate();
            
            // Handle resize
            window.addEventListener('resize', utils.debounce(() => {
                resizeCanvas();
                initParticles();
            }, 250));
            
            // Pause animation when tab is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    cancelAnimationFrame(animationId);
                } else {
                    animate();
                }
            });
            
        } catch (error) {
            console.error('❌ Canvas animation error:', error);
        }
    };

    // ===========================
    // 3D ANIMATION (Three.js)
    // ===========================
    const init3DAnimation = () => {
        try {
            if (typeof THREE === 'undefined' || utils.prefersReducedMotion()) return;
            
            const container = document.getElementById('hero3D');
            if (!container) return;
            
            let scene, camera, renderer, book;
            
            // Create scene
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(300, 300);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);
            
            // Create floating book
            const geometry = new THREE.BoxGeometry(2, 2.8, 0.3);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0xffd700,
                shininess: 100,
                transparent: true,
                opacity: 0.8
            });
            book = new THREE.Mesh(geometry, material);
            
            // Lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
            
            scene.add(book);
            camera.position.z = 5;
            
            let animationId;
            
            const animate3D = () => {
                book.rotation.x += 0.005;
                book.rotation.y += 0.01;
                book.position.y = Math.sin(Date.now() * 0.001) * 0.3;
                
                renderer.render(scene, camera);
                animationId = requestAnimationFrame(animate3D);
            };
            
            animate3D();
            
            // Pause animation when tab is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    cancelAnimationFrame(animationId);
                } else {
                    animate3D();
                }
            });
            
        } catch (error) {
            console.error('❌ 3D animation error:', error);
        }
    };

    // ===========================
    // NEWSLETTER FORM
    // ===========================
    const initNewsletterForm = () => {
        try {
            const form = document.getElementById('newsletterForm');
            const messageDiv = document.getElementById('newsletterMessage');
            
            if (!form) return;
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = form.querySelector('.newsletter-input')?.value;
                
                if (!email) {
                    showMessage('Please enter your email address.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showMessage('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate successful subscription
                showMessage('Thank you for subscribing! You will receive our latest updates.', 'success');
                form.reset();
                
                console.log(`📧 Newsletter subscription: ${email}`);
            });
            
            const showMessage = (message, type) => {
                if (messageDiv) {
                    messageDiv.textContent = message;
                    messageDiv.className = `newsletter-message ${type}`;
                    
                    // Clear message after 5 seconds
                    setTimeout(() => {
                        messageDiv.textContent = '';
                        messageDiv.className = 'newsletter-message';
                    }, 5000);
                }
            };
            
            const isValidEmail = (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            };
            
        } catch (error) {
            console.error('❌ Newsletter form error:', error);
        }
    };

    // ===========================
    // DYNAMIC GREETING
    // ===========================
    const initDynamicGreeting = () => {
        try {
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
            
        } catch (error) {
            console.error('❌ Dynamic greeting error:', error);
        }
    };

    // ===========================
    // PERFORMANCE OPTIMIZATIONS
    // ===========================
    const initPerformanceOptimizations = () => {
        try {
            // Lazy load images when they come into viewport
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            if (lazyImages.length > 0) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                lazyImages.forEach(img => imageObserver.observe(img));
            }
            
            // Detect low-end devices and disable heavy animations
            const isLowEndDevice = () => {
                return navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
            };
            
            if (isLowEndDevice()) {
                console.log('🔧 Low-end device detected - optimizing performance');
                
                // Disable heavy animations
                document.documentElement.style.setProperty('--transition-smooth', '0.2s ease');
                document.documentElement.style.setProperty('--transition-bounce', '0.2s ease');
                
                // Hide canvas and 3D elements
                const canvas = document.getElementById('heroCanvas');
                const hero3D = document.getElementById('hero3D');
                
                if (canvas) canvas.style.display = 'none';
                if (hero3D) hero3D.style.display = 'none';
            }
            
        } catch (error) {
            console.error('❌ Performance optimization error:', error);
        }
    };

    // ===========================
    // ACCESSIBILITY ENHANCEMENTS
    // ===========================
    const initAccessibility = () => {
        try {
            // Add keyboard navigation support
            document.addEventListener('keydown', (e) => {
                // Add visual indication for keyboard navigation
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });
            
            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
            
            // Announce screen reader updates for dynamic content
            const announceToScreenReader = (message) => {
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.classList.add('sr-only');
                announcement.textContent = message;
                
                document.body.appendChild(announcement);
                
                setTimeout(() => {
                    document.body.removeChild(announcement);
                }, 1000);
            };
            
            // Add click handlers for better keyboard accessibility
            document.querySelectorAll('[role="button"]').forEach(button => {
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        button.click();
                    }
                });
            });
            
        } catch (error) {
            console.error('❌ Accessibility enhancement error:', error);
        }
    };

    // ===========================
    // INITIALIZATION
    // ===========================
    const initializeApp = () => {
        console.log('🚀 Starting application initialization...');
        
        try {
            initLoadingScreen();
            initTheme();
            initNavigation();
            initScrollAnimations();
            initStatsCounter();
            initVideoModal();
            initScrollIndicator();
            initNewsletterForm();
            initDynamicGreeting();
            initPerformanceOptimizations();
            initAccessibility();
            
            // Initialize animations after a short delay for better performance
            setTimeout(() => {
                initCanvasAnimation();
                init3DAnimation();
            }, 1000);
            
            console.log('✅ Application initialized successfully!');
            
        } catch (error) {
            console.error('❌ Application initialization error:', error);
        }
    };

    // ===========================
    // ERROR HANDLING
    // ===========================
    window.addEventListener('error', (error) => {
        console.error('🚨 Global JavaScript error:', error.message, error.filename, error.lineno);
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('🚨 Unhandled promise rejection:', event.reason);
    });

    // Start the application
    initializeApp();
});

// ===========================
// CSS INJECTION FOR ACCESSIBILITY
// ===========================
const injectAccessibilityStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid var(--gold-accent) !important;
            outline-offset: 2px !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    `;
    document.head.appendChild(style);
};

// Inject accessibility styles immediately
injectAccessibilityStyles();
