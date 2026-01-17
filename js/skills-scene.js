/**
 * Three.js 3D Skills Section Animation
 * Floating tech logos with particle effects
 * Mobile-optimized for smooth performance
 */

class SkillsScene {
    constructor() {
        this.canvas = document.getElementById('skills-canvas');
        if (!this.canvas) return;

        // Mobile and in-app browser detection
        const ua = navigator.userAgent || '';
        this.isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        this.isInAppBrowser = /Instagram|FBAN|FBAV|Twitter|Line|WhatsApp|Snapchat/i.test(ua);

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.floatingLogos = [];
        this.energyRings = [];
        this.clock = new THREE.Clock();
        this.mouse = { x: 0, y: 0 };
        this.isVisible = false;

        // Frame limiting
        this.lastFrameTime = 0;
        this.targetFPS = this.isMobile ? 30 : 60;
        this.frameInterval = 1000 / this.targetFPS;

        // Tech logos for the background
        this.techData = [
            { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 0x3776ab },
            { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: 0x092e20 },
            { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 0xf7df1e },
            { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 0x61dafb },
            { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: 0x2496ed },
            { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: 0x336791 },
            { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: 0xdc382d },
            { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: 0xf05032 },
        ];

        this.init();
        this.setupIntersectionObserver();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createParticles();
        if (!this.isMobile) {
            this.createFloatingLogos();
            this.createEnergyRings();
        }
        this.addEventListeners();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        const fov = this.isMobile ? 70 : 60;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
        this.camera.position.z = this.isMobile ? 35 : 30;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: !this.isMobile,
            alpha: true,
            powerPreference: this.isMobile ? 'low-power' : 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const maxPixelRatio = this.isMobile ? 1.5 : 2;
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
        this.renderer.setClearColor(0x000000, 0);
    }

    createParticles() {
        const particleCount = this.isMobile ? 150 : 500;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const colorOptions = [
            new THREE.Color(0x6366f1),
            new THREE.Color(0x22d3ee),
            new THREE.Color(0xf472b6),
        ];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 80;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * 2 + 0.5;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;

                void main() {
                    vColor = color;
                    vec3 pos = position;
                    pos.y += sin(time + position.x * 0.1) * 2.0;
                    pos.x += cos(time * 0.5 + position.y * 0.1) * 1.0;

                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (200.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;

                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
                    gl_FragColor = vec4(vColor, alpha * 0.6);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createFloatingLogos() {
        this.techData.forEach((tech, index) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 256;
                canvas.height = 256;

                // Glow background
                const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
                gradient.addColorStop(0, 'rgba(255,255,255,0.15)');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(128, 128, 120, 0, Math.PI * 2);
                ctx.fill();

                ctx.drawImage(img, 28, 28, 200, 200);

                const texture = new THREE.CanvasTexture(canvas);
                const material = new THREE.SpriteMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.4
                });

                const sprite = new THREE.Sprite(material);
                sprite.scale.set(6, 6, 1);

                // Position around the edges
                const angle = (index / this.techData.length) * Math.PI * 2;
                const radius = 25 + Math.random() * 10;
                sprite.position.set(
                    Math.cos(angle) * radius,
                    (Math.random() - 0.5) * 15,
                    Math.sin(angle) * radius * 0.3 - 10
                );

                sprite.userData = {
                    originalPos: sprite.position.clone(),
                    speed: 0.5 + Math.random() * 0.5,
                    amplitude: 2 + Math.random() * 2,
                    phase: Math.random() * Math.PI * 2
                };

                this.floatingLogos.push(sprite);
                this.scene.add(sprite);
            };

            img.src = tech.logo;
        });
    }

    createEnergyRings() {
        for (let i = 0; i < 3; i++) {
            const geometry = new THREE.TorusGeometry(12 + i * 6, 0.05, 16, 100);
            const material = new THREE.MeshBasicMaterial({
                color: i === 0 ? 0x6366f1 : i === 1 ? 0x22d3ee : 0xf472b6,
                transparent: true,
                opacity: 0.2
            });

            const ring = new THREE.Mesh(geometry, material);
            ring.rotation.x = Math.PI / 2;
            ring.position.z = -5;
            ring.userData = { speed: 0.002 + i * 0.001 };

            this.energyRings.push(ring);
            this.scene.add(ring);
        }
    }

    setupIntersectionObserver() {
        const section = document.getElementById('skills');
        if (!section) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        observer.observe(section);
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onResize() {
        const section = document.getElementById('skills');
        if (!section) return;

        const width = window.innerWidth;
        const height = section.offsetHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    animate(currentTime) {
        requestAnimationFrame(this.animate.bind(this));

        if (!this.isVisible) return;

        // Check if we should update animations (frame limiting)
        // But ALWAYS render to prevent blinking in in-app browsers
        const shouldUpdate = !currentTime || (currentTime - this.lastFrameTime >= this.frameInterval);
        if (shouldUpdate) {
            this.lastFrameTime = currentTime || 0;
        }

        const elapsedTime = this.clock.getElapsedTime();

        // Skip heavy animations if frame limiting, but still render
        if (!shouldUpdate) {
            this.renderer.render(this.scene, this.camera);
            return;
        }

        // Animate particles
        if (this.particles) {
            this.particles.material.uniforms.time.value = elapsedTime;
            this.particles.rotation.y = elapsedTime * 0.02;
        }

        // Animate floating logos (desktop only)
        if (!this.isMobile) {
            this.floatingLogos.forEach(logo => {
                const data = logo.userData;
                logo.position.y = data.originalPos.y + Math.sin(elapsedTime * data.speed + data.phase) * data.amplitude;
                logo.position.x = data.originalPos.x + Math.cos(elapsedTime * data.speed * 0.5 + data.phase) * (data.amplitude * 0.5);
            });

            // Animate energy rings
            this.energyRings.forEach((ring, index) => {
                ring.rotation.z += ring.userData.speed;
                ring.material.opacity = 0.15 + Math.sin(elapsedTime + index) * 0.1;
            });
        }

        // Camera subtle movement (reduced on mobile)
        const cameraMove = this.isMobile ? 0.5 : 1;
        this.camera.position.x = this.mouse.x * 2 * cameraMove;
        this.camera.position.y = this.mouse.y * 1 * cameraMove;

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        // Wait a bit for the section to be properly laid out
        setTimeout(() => {
            window.skillsScene = new SkillsScene();
        }, 500);
    }
});
