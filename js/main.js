/**
 * Main JavaScript
 * Handles interactive features and UI interactions
 */

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.initCustomCursor();
        this.initMagneticButtons();
        this.initNavigation();
        this.initProjectFilters();
        this.initFormHandling();
    }

    /**
     * Custom Cursor
     */
    initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');

        if (!cursor || !follower) return;

        // Check if touch device
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            cursor.style.display = 'none';
            follower.style.display = 'none';
            return;
        }

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor states for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .blog-card, .filter-btn');

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    /**
     * Magnetic Buttons
     */
    initMagneticButtons() {
        const magneticElements = document.querySelectorAll('.magnetic');

        magneticElements.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Navigation
     */
    initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu on link click
            navLinks.forEach((link) => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    /**
     * Project Filters
     */
    initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                // Filter projects
                projectCards.forEach((card) => {
                    const category = card.dataset.category;
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /**
     * Form Handling
     */
    initFormHandling() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;

            // Show sending state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                form.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });

        // Floating labels
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach((group) => {
            const input = group.querySelector('input, textarea');
            if (input) {
                input.addEventListener('focus', () => group.classList.add('focused'));
                input.addEventListener('blur', () => {
                    if (!input.value) group.classList.remove('focused');
                });
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();

    // Console branding
    console.log('%c Vipul Rathod Portfolio ', 'background: linear-gradient(135deg, #6366f1, #22d3ee); color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
});
