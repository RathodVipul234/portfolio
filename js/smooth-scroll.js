/**
 * Smooth Scroll Implementation
 * Simple smooth scrolling for navigation
 */

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        this.initNavLinks();
        this.initNavbarScroll();
        this.updateActiveNavOnScroll();
    }

    initNavLinks() {
        // Handle anchor links with smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    const navbarHeight = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add scrolled class
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = 'hero';
            const scrollY = window.pageYOffset;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 200;
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    scrollTo(target) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
            const navbarHeight = 80;
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.smoothScroll = new SmoothScroll();
});
