/**
 * ULTRA AURA 9999+++ 3D Animation
 * Epic tech logos with energy fields, lightning, and maximum visual impact
 * Mobile-optimized for smooth performance
 */

class ThreeScene {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) return;

        // Mobile and in-app browser detection
        const ua = navigator.userAgent || '';
        this.isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        this.isInAppBrowser = /Instagram|FBAN|FBAV|Twitter|Line|WhatsApp|Snapchat/i.test(ua);

        // Performance settings based on device
        // Use low settings for in-app browsers for better compatibility
        if (this.isInAppBrowser) {
            this.performanceMode = 'low';
        } else {
            this.performanceMode = this.isMobile ? 'low' : (this.isTablet ? 'medium' : 'high');
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.techNodes = [];
        this.connectionLines = [];
        this.lightningBolts = [];
        this.energyWaves = [];
        this.auraSpheres = [];
        this.centralCore = null;
        this.energyField = null;
        // IT-themed elements
        this.codeSymbols = [];
        this.binaryColumns = [];
        this.dataPackets = [];
        this.networkNodes = [];
        this.networkLines = [];
        this.terminalTexts = [];
        this.cosmicDust = null;
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.clock = new THREE.Clock();

        // Frame limiting for smooth performance
        this.lastFrameTime = 0;
        this.targetFPS = this.isMobile ? 30 : 60;
        this.frameInterval = 1000 / this.targetFPS;

        this.techData = [
            { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 0x3776ab },
            { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: 0x44b78b },
            { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 0xf7df1e },
            { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 0x61dafb },
            { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: 0x339933 },
            { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: 0x2496ed },
            { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: 0xff9900 },
            { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: 0x336791 },
            { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: 0xdc382d },
            { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', color: 0x009688 },
            { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 0x47a248 },
            { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: 0x3178c6 },
            { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: 0xf05032 },
            { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', color: 0x02569b },
            { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', color: 0xff6f00 },
            { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: 0xfcc624 },
        ];

        this.init();
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createEpicCore();

        // Load effects based on performance mode
        if (this.performanceMode !== 'low') {
            this.createEnergyField();
            this.createAuraSpheres();
        }

        this.createTechNodes();

        if (this.performanceMode === 'high') {
            this.createLightning();
            this.createEnergyWaves();
            this.createFloatingCodeSymbols();
            this.createBinaryRain();
            this.createDataPackets();
            this.createNetworkMesh();
            this.createTerminalText();
        } else if (this.performanceMode === 'medium') {
            this.createLightning();
            this.createFloatingCodeSymbols();
            this.createDataPackets();
        } else {
            // Mobile: minimal effects for smooth performance
            this.createSimpleParticles();
        }

        this.createCosmicDust();
        this.addEventListeners();
        this.animate();
    }

    createSimpleParticles() {
        // Lightweight particles for mobile
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorOptions = [
            new THREE.Color(0x6366f1),
            new THREE.Color(0x22d3ee),
            new THREE.Color(0xf472b6),
        ];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.simpleParticles = new THREE.Points(geometry, material);
        this.scene.add(this.simpleParticles);
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        // Wider FOV on mobile to see more content
        const fov = this.isMobile ? 75 : 60;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
        // Pull camera back on mobile for better view
        this.camera.position.z = this.isMobile ? 50 : 40;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: !this.isMobile, // Disable antialiasing on mobile for performance
            alpha: true,
            powerPreference: this.isMobile ? 'low-power' : 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // Lower pixel ratio on mobile for better performance
        const maxPixelRatio = this.isMobile ? 1.5 : 2;
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
        this.renderer.setClearColor(0x030308, 1);
    }

    createEpicCore() {
        const coreGroup = new THREE.Group();

        // Inner plasma core
        const coreGeometry = new THREE.SphereGeometry(2, 64, 64);
        const coreMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x6366f1) },
                color2: { value: new THREE.Color(0x22d3ee) },
                color3: { value: new THREE.Color(0xf472b6) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                uniform float time;

                void main() {
                    vUv = uv;
                    vNormal = normal;
                    vec3 pos = position;
                    pos += normal * sin(time * 3.0 + position.y * 5.0) * 0.1;
                    pos += normal * cos(time * 2.0 + position.x * 5.0) * 0.1;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform vec3 color3;
                varying vec2 vUv;
                varying vec3 vNormal;

                void main() {
                    float pulse = sin(time * 2.0) * 0.5 + 0.5;
                    float wave = sin(vUv.x * 20.0 + time * 5.0) * sin(vUv.y * 20.0 + time * 3.0);

                    vec3 color = mix(color1, color2, pulse);
                    color = mix(color, color3, wave * 0.3 + 0.3);

                    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    color += vec3(1.0) * fresnel * 0.5;

                    gl_FragColor = vec4(color, 0.9);
                }
            `,
            transparent: true
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        coreGroup.add(core);

        // Multiple glow layers
        for (let i = 1; i <= 8; i++) {
            const glowGeometry = new THREE.SphereGeometry(2 + i * 0.8, 32, 32);
            const hue = (i * 30) % 360;
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(hue / 360, 0.8, 0.5),
                transparent: true,
                opacity: 0.12 / i,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.userData = { layer: i };
            coreGroup.add(glow);
        }

        // Rotating energy rings
        for (let i = 0; i < 5; i++) {
            const ringGeometry = new THREE.TorusGeometry(3 + i * 1.5, 0.03 + i * 0.01, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x6366f1 : 0x22d3ee,
                transparent: true,
                opacity: 0.7 - i * 0.1
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2 + i * 0.2;
            ring.rotation.y = i * 0.3;
            ring.userData = {
                speed: 0.02 + i * 0.008,
                axis: i % 3
            };
            coreGroup.add(ring);
        }

        // Hexagonal shields
        for (let i = 0; i < 3; i++) {
            const hexGeometry = new THREE.CircleGeometry(5 + i * 2, 6);
            const hexMaterial = new THREE.MeshBasicMaterial({
                color: 0x6366f1,
                transparent: true,
                opacity: 0.1,
                side: THREE.DoubleSide,
                wireframe: true
            });
            const hex = new THREE.Mesh(hexGeometry, hexMaterial);
            hex.rotation.z = i * Math.PI / 6;
            hex.userData = { rotSpeed: 0.005 + i * 0.003 };
            coreGroup.add(hex);
        }

        this.centralCore = coreGroup;
        this.scene.add(coreGroup);
    }

    createEnergyField() {
        // Massive energy field shader
        const fieldGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
        const fieldMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0, 0) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform float time;
                uniform vec2 mouse;

                void main() {
                    vUv = uv;
                    vec3 pos = position;

                    float dist = length(uv - 0.5);
                    float wave1 = sin(dist * 20.0 - time * 3.0) * 0.5;
                    float wave2 = sin(dist * 15.0 - time * 2.0 + 1.0) * 0.3;
                    float wave3 = cos(dist * 25.0 - time * 4.0) * 0.2;

                    pos.z = (wave1 + wave2 + wave3) * (1.0 - dist * 1.5);
                    vElevation = pos.z;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform float time;

                void main() {
                    float dist = length(vUv - 0.5);

                    vec3 color1 = vec3(0.39, 0.4, 0.95); // Purple
                    vec3 color2 = vec3(0.13, 0.83, 0.93); // Cyan
                    vec3 color3 = vec3(0.96, 0.45, 0.73); // Pink

                    float t = sin(time + dist * 10.0) * 0.5 + 0.5;
                    vec3 color = mix(mix(color1, color2, t), color3, vElevation + 0.5);

                    // Grid lines
                    float gridX = abs(fract(vUv.x * 30.0 - 0.5) - 0.5) / fwidth(vUv.x * 30.0);
                    float gridY = abs(fract(vUv.y * 30.0 - 0.5) - 0.5) / fwidth(vUv.y * 30.0);
                    float grid = 1.0 - min(min(gridX, gridY), 1.0);

                    float alpha = (grid * 0.3 + 0.05) * (1.0 - dist * 1.8);
                    alpha = max(alpha, 0.0);

                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        field.rotation.x = -Math.PI / 2;
        field.position.y = -15;
        this.energyField = field;
        this.scene.add(field);
    }

    createAuraSpheres() {
        // Floating aura orbs
        for (let i = 0; i < 20; i++) {
            const size = 0.3 + Math.random() * 0.5;
            const geometry = new THREE.SphereGeometry(size, 16, 16);

            const hue = Math.random();
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(hue, 0.9, 0.6),
                transparent: true,
                opacity: 0.6
            });

            const sphere = new THREE.Mesh(geometry, material);

            const angle = Math.random() * Math.PI * 2;
            const radius = 8 + Math.random() * 15;
            sphere.position.set(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 20,
                Math.sin(angle) * radius
            );

            // Glow effect
            const glowGeometry = new THREE.SphereGeometry(size * 2, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(hue, 0.9, 0.6),
                transparent: true,
                opacity: 0.2,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            sphere.add(glow);

            sphere.userData = {
                angle: angle,
                radius: radius,
                speed: 0.2 + Math.random() * 0.3,
                ySpeed: 0.5 + Math.random() * 0.5,
                yOffset: sphere.position.y,
                phase: Math.random() * Math.PI * 2
            };

            this.auraSpheres.push(sphere);
            this.scene.add(sphere);
        }
    }

    createTechNodes() {
        const positions = this.generatePositions(this.techData.length);

        this.techData.forEach((tech, index) => {
            const group = new THREE.Group();
            const pos = positions[index];

            // Load logo
            this.loadLogo(tech.logo, tech.color, group, tech.name);

            // Energy aura around each logo
            for (let i = 0; i < 3; i++) {
                const auraGeometry = new THREE.RingGeometry(2.5 + i * 0.5, 2.7 + i * 0.5, 32);
                const auraMaterial = new THREE.MeshBasicMaterial({
                    color: tech.color,
                    transparent: true,
                    opacity: 0.3 - i * 0.08,
                    side: THREE.DoubleSide
                });
                const aura = new THREE.Mesh(auraGeometry, auraMaterial);
                aura.userData = { ringIndex: i };
                group.add(aura);
            }

            // Connection line with energy effect
            const linePoints = 80;
            const lineGeometry = new THREE.BufferGeometry();
            const linePositions = new Float32Array(linePoints * 3);
            const lineColors = new Float32Array(linePoints * 3);
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
            lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

            const lineMaterial = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            const line = new THREE.Line(lineGeometry, lineMaterial);
            this.connectionLines.push({ line, group, color: tech.color, points: linePoints });
            this.scene.add(line);

            group.position.set(pos.x, pos.y, pos.z);

            group.userData = {
                originalPos: { ...pos },
                pullStrength: 0.2 + Math.random() * 0.15,
                orbitSpeed: 0.15 + Math.random() * 0.2,
                orbitRadius: 1.5 + Math.random() * 1.5,
                phase: Math.random() * Math.PI * 2,
                bobSpeed: 0.3 + Math.random() * 0.4,
                bobAmount: 0.8 + Math.random() * 0.8,
                color: new THREE.Color(tech.color)
            };

            this.techNodes.push(group);
            this.scene.add(group);
        });
    }

    generatePositions(count) {
        const positions = [];
        const aspect = window.innerWidth / window.innerHeight;

        if (this.isMobile) {
            // Mobile: Circular arrangement that fits screen
            const radius = 18;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
                positions.push({
                    x: Math.cos(angle) * radius * 0.9,
                    y: Math.sin(angle) * radius * 1.2,
                    z: -5 + (Math.random() - 0.5) * 4
                });
            }
            return positions;
        }

        // Desktop: Screen edge positions - spread logos to corners and edges
        const edgeX = 28 * Math.min(aspect, 1.8);
        const edgeY = 18;
        const midX = edgeX * 0.5;
        const midY = edgeY * 0.5;

        const edgePositions = [
            // 4 Corners
            { x: -edgeX, y: edgeY, z: -5 },
            { x: edgeX, y: edgeY, z: -5 },
            { x: -edgeX, y: -edgeY, z: -5 },
            { x: edgeX, y: -edgeY, z: -5 },

            // Top edge
            { x: -midX, y: edgeY, z: -8 },
            { x: 0, y: edgeY + 2, z: -10 },
            { x: midX, y: edgeY, z: -8 },

            // Bottom edge
            { x: -midX, y: -edgeY, z: -8 },
            { x: 0, y: -edgeY - 2, z: -10 },
            { x: midX, y: -edgeY, z: -8 },

            // Left edge
            { x: -edgeX - 2, y: midY, z: -6 },
            { x: -edgeX - 3, y: 0, z: -8 },
            { x: -edgeX - 2, y: -midY, z: -6 },

            // Right edge
            { x: edgeX + 2, y: midY, z: -6 },
            { x: edgeX + 3, y: 0, z: -8 },
            { x: edgeX + 2, y: -midY, z: -6 },
        ];

        for (let i = 0; i < count; i++) {
            const basePos = edgePositions[i % edgePositions.length];
            positions.push({
                x: basePos.x + (Math.random() - 0.5) * 3,
                y: basePos.y + (Math.random() - 0.5) * 2,
                z: basePos.z + (Math.random() - 0.5) * 4
            });
        }
        return positions;
    }

    loadLogo(logoUrl, color, group, name) {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        // Bigger logos on mobile for visibility
        const logoScale = this.isMobile ? 5.5 : 6;
        const backdropSize = this.isMobile ? 3.2 : 3.5;

        const createLogo = (texture) => {
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true
            });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(logoScale, logoScale, 1);
            group.add(sprite);

            // Glowing backdrop - bigger and brighter
            const backdropGeometry = new THREE.CircleGeometry(backdropSize, 32);
            const backdropMaterial = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.35,
                side: THREE.DoubleSide
            });
            const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial);
            backdrop.position.z = -0.1;
            group.add(backdrop);

            // Extra outer glow
            const outerGlowGeometry = new THREE.CircleGeometry(backdropSize * 1.5, 32);
            const outerGlowMaterial = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.15,
                side: THREE.DoubleSide
            });
            const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
            outerGlow.position.z = -0.2;
            group.add(outerGlow);
        };

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 256;
            ctx.drawImage(img, 28, 28, 200, 200);
            createLogo(new THREE.CanvasTexture(canvas));
        };

        img.onerror = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 256;

            const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 100);
            gradient.addColorStop(0, `#${color.toString(16).padStart(6, '0')}`);
            gradient.addColorStop(1, `#${Math.floor(color * 0.6).toString(16).padStart(6, '0')}`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(128, 128, 100, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 72px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(name.substring(0, 2).toUpperCase(), 128, 128);

            createLogo(new THREE.CanvasTexture(canvas));
        };

        img.src = logoUrl;
    }

    createLightning() {
        // Dynamic lightning bolts between nodes
        for (let i = 0; i < 6; i++) {
            const points = 30;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(points * 3);
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.LineBasicMaterial({
                color: 0x22d3ee,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending
            });

            const lightning = new THREE.Line(geometry, material);
            lightning.userData = {
                active: false,
                timer: Math.random() * 100,
                duration: 0,
                sourceIndex: 0,
                targetIndex: 0
            };

            this.lightningBolts.push(lightning);
            this.scene.add(lightning);
        }
    }

    createEnergyWaves() {
        // Expanding energy waves from center
        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.RingGeometry(0.1, 0.3, 64);
            const material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x6366f1 : 0x22d3ee,
                transparent: true,
                opacity: 0,
                side: THREE.DoubleSide
            });

            const wave = new THREE.Mesh(geometry, material);
            wave.userData = {
                maxRadius: 25,
                speed: 8 + i * 2,
                delay: i * 40,
                timer: i * 40
            };

            this.energyWaves.push(wave);
            this.scene.add(wave);
        }
    }

    createFloatingCodeSymbols() {
        // Floating programming symbols (no brackets for cleaner look)
        this.codeSymbols = [];
        const symbols = ['<>', '/>', '=', ';', '=>', '()', '&&', '||', '//', 'if', 'for', 'def', 'class', 'import', 'return', 'async', 'await', 'const', 'let', 'fn', '===', '!=', '++', '--', '#', '@', '$', '%', '::'];

        const colors = [0x6366f1, 0x22d3ee, 0xf472b6, 0x10b981, 0xfbbf24, 0xff6b6b];

        for (let i = 0; i < 60; i++) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 128;
            canvas.height = 128;

            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const colorHex = '#' + color.toString(16).padStart(6, '0');

            // Glow effect
            ctx.shadowColor = colorHex;
            ctx.shadowBlur = 20;
            ctx.fillStyle = colorHex;
            ctx.font = 'bold 48px Monaco, Consolas, monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, 64, 64);
            // Double draw for stronger glow
            ctx.fillText(symbol, 64, 64);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });

            const sprite = new THREE.Sprite(material);
            const scale = 1.5 + Math.random() * 1.5;
            sprite.scale.set(scale, scale, 1);

            // Position around the scene
            const angle = Math.random() * Math.PI * 2;
            const radius = 15 + Math.random() * 25;
            sprite.position.set(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 30,
                Math.sin(angle) * radius - 5
            );

            sprite.userData = {
                floatSpeed: 0.3 + Math.random() * 0.5,
                floatAmount: 2 + Math.random() * 3,
                rotateSpeed: (Math.random() - 0.5) * 0.02,
                driftX: (Math.random() - 0.5) * 0.01,
                driftZ: (Math.random() - 0.5) * 0.01,
                originalY: sprite.position.y,
                phase: Math.random() * Math.PI * 2
            };

            this.codeSymbols.push(sprite);
            this.scene.add(sprite);
        }
    }

    createBinaryRain() {
        // Matrix-style binary rain columns
        this.binaryColumns = [];
        const columnCount = 25;

        for (let col = 0; col < columnCount; col++) {
            const column = {
                sprites: [],
                x: (Math.random() - 0.5) * 70,
                z: (Math.random() - 0.5) * 30 - 10,
                speed: 5 + Math.random() * 8,
                length: 8 + Math.floor(Math.random() * 12)
            };

            for (let i = 0; i < column.length; i++) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 64;
                canvas.height = 64;

                const bit = Math.random() > 0.5 ? '1' : '0';
                const brightness = 1 - (i / column.length) * 0.7;
                const green = Math.floor(200 * brightness);

                ctx.shadowColor = `rgb(34, 211, 238)`;
                ctx.shadowBlur = 15;
                ctx.fillStyle = i === 0 ? '#ffffff' : `rgb(${green * 0.4}, ${green}, ${green * 0.9})`;
                ctx.font = 'bold 40px Monaco, Consolas, monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(bit, 32, 32);

                const texture = new THREE.CanvasTexture(canvas);
                const material = new THREE.SpriteMaterial({
                    map: texture,
                    transparent: true,
                    opacity: brightness * 0.8,
                    blending: THREE.AdditiveBlending
                });

                const sprite = new THREE.Sprite(material);
                sprite.scale.set(1.2, 1.2, 1);
                sprite.position.set(column.x, 20 - i * 1.5, column.z);

                column.sprites.push(sprite);
                this.scene.add(sprite);
            }

            column.offset = Math.random() * 40;
            this.binaryColumns.push(column);
        }
    }

    createDataPackets() {
        // Glowing data packets that travel between tech nodes
        this.dataPackets = [];

        for (let i = 0; i < 30; i++) {
            const geometry = new THREE.OctahedronGeometry(0.3, 0);
            const color = [0x6366f1, 0x22d3ee, 0xf472b6, 0x10b981][Math.floor(Math.random() * 4)];

            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.9
            });

            const packet = new THREE.Mesh(geometry, material);

            // Glow
            const glowGeometry = new THREE.OctahedronGeometry(0.5, 0);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.3,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            packet.add(glow);

            // Trail effect
            const trailGeometry = new THREE.BufferGeometry();
            const trailPositions = new Float32Array(30 * 3);
            trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
            const trailMaterial = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.5,
                blending: THREE.AdditiveBlending
            });
            const trail = new THREE.Line(trailGeometry, trailMaterial);
            this.scene.add(trail);

            packet.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20
            );

            packet.userData = {
                sourceIndex: Math.floor(Math.random() * this.techData.length),
                targetIndex: Math.floor(Math.random() * this.techData.length),
                progress: Math.random(),
                speed: 0.005 + Math.random() * 0.01,
                trail: trail,
                trailPositions: [],
                color: color
            };

            this.dataPackets.push(packet);
            this.scene.add(packet);
        }
    }

    createNetworkMesh() {
        // Interconnected network visualization
        this.networkNodes = [];
        this.networkLines = [];

        // Create small network nodes
        for (let i = 0; i < 40; i++) {
            const geometry = new THREE.SphereGeometry(0.15, 8, 8);
            const material = new THREE.MeshBasicMaterial({
                color: 0x22d3ee,
                transparent: true,
                opacity: 0.6
            });

            const node = new THREE.Mesh(geometry, material);
            const angle = Math.random() * Math.PI * 2;
            const radius = 12 + Math.random() * 20;

            node.position.set(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 25,
                Math.sin(angle) * radius * 0.5 - 5
            );

            node.userData = {
                connections: [],
                pulsePhase: Math.random() * Math.PI * 2,
                originalPos: node.position.clone()
            };

            this.networkNodes.push(node);
            this.scene.add(node);
        }

        // Connect nearby nodes
        for (let i = 0; i < this.networkNodes.length; i++) {
            for (let j = i + 1; j < this.networkNodes.length; j++) {
                const dist = this.networkNodes[i].position.distanceTo(this.networkNodes[j].position);
                if (dist < 10 && Math.random() > 0.5) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        this.networkNodes[i].position,
                        this.networkNodes[j].position
                    ]);

                    const material = new THREE.LineBasicMaterial({
                        color: 0x6366f1,
                        transparent: true,
                        opacity: 0.2,
                        blending: THREE.AdditiveBlending
                    });

                    const line = new THREE.Line(geometry, material);
                    line.userData = { nodeA: i, nodeB: j };

                    this.networkLines.push(line);
                    this.scene.add(line);

                    this.networkNodes[i].userData.connections.push(j);
                    this.networkNodes[j].userData.connections.push(i);
                }
            }
        }
    }

    createTerminalText() {
        // Floating terminal commands
        this.terminalTexts = [];
        const commands = [
            'git push origin main',
            'npm install',
            'python manage.py',
            'docker-compose up',
            'kubectl apply -f',
            'pip install django',
            'SELECT * FROM',
            'CREATE TABLE',
            'redis-cli SET',
            'aws s3 sync',
            'terraform apply',
            'chmod +x deploy.sh',
            'curl -X POST',
            'ssh user@server',
            'grep -r "pattern"',
            'make build'
        ];

        for (let i = 0; i < 15; i++) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 64;

            const cmd = commands[Math.floor(Math.random() * commands.length)];

            // Terminal style
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, 512, 64);

            ctx.shadowColor = '#22d3ee';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#22d3ee';
            ctx.font = '24px Monaco, Consolas, monospace';
            ctx.textBaseline = 'middle';
            ctx.fillText('$ ' + cmd, 10, 32);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0.6
            });

            const sprite = new THREE.Sprite(material);
            sprite.scale.set(10, 1.25, 1);

            const angle = (i / 15) * Math.PI * 2;
            const radius = 22 + Math.random() * 10;
            sprite.position.set(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 20,
                Math.sin(angle) * radius * 0.4 - 8
            );

            sprite.userData = {
                driftSpeed: 0.1 + Math.random() * 0.2,
                phase: Math.random() * Math.PI * 2,
                originalY: sprite.position.y
            };

            this.terminalTexts.push(sprite);
            this.scene.add(sprite);
        }
    }

    createCosmicDust() {
        // Subtle background cosmic dust
        const dustCount = 500;
        const positions = new Float32Array(dustCount * 3);
        const sizes = new Float32Array(dustCount);

        for (let i = 0; i < dustCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
            sizes[i] = Math.random() * 1.5 + 0.3;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            color: 0x8888ff,
            size: 0.5,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });

        const dust = new THREE.Points(geometry, material);
        this.cosmicDust = dust;
        this.scene.add(dust);
    }

    updateConnectionLines(time) {
        this.connectionLines.forEach(({ line, group, color, points }, index) => {
            const positions = line.geometry.attributes.position.array;
            const colors = line.geometry.attributes.color.array;
            const startPos = group.position;
            const endPos = new THREE.Vector3(0, 0, 0);
            const baseColor = new THREE.Color(color);

            for (let i = 0; i < points; i++) {
                const t = i / (points - 1);
                const easeT = t * t * (3 - 2 * t); // Smooth step

                // Curved path with energy pulse
                const controlHeight = 5 + Math.sin(time * 2 + index) * 2;
                const x = startPos.x * (1 - easeT) + endPos.x * easeT;
                const y = startPos.y * (1 - easeT) + endPos.y * easeT + Math.sin(t * Math.PI) * controlHeight;
                const z = startPos.z * (1 - easeT) + endPos.z * easeT;

                // Add electric wobble
                const wobble = Math.sin(t * 30 + time * 10 + index * 2) * 0.2 * (1 - t);

                positions[i * 3] = x + wobble;
                positions[i * 3 + 1] = y + wobble;
                positions[i * 3 + 2] = z;

                // Energy pulse color
                const pulse = Math.sin(t * Math.PI * 4 - time * 8 + index) * 0.5 + 0.5;
                const pulseColor = new THREE.Color().lerpColors(baseColor, new THREE.Color(0xffffff), pulse * 0.5);
                colors[i * 3] = pulseColor.r;
                colors[i * 3 + 1] = pulseColor.g;
                colors[i * 3 + 2] = pulseColor.b;
            }

            line.geometry.attributes.position.needsUpdate = true;
            line.geometry.attributes.color.needsUpdate = true;
            line.material.opacity = 0.5 + Math.sin(time * 3 + index) * 0.3;
        });
    }

    updateLightning(time) {
        this.lightningBolts.forEach((lightning, idx) => {
            lightning.userData.timer++;

            if (!lightning.userData.active && lightning.userData.timer > 60 + Math.random() * 120) {
                // Trigger new lightning
                lightning.userData.active = true;
                lightning.userData.duration = 5 + Math.random() * 10;
                lightning.userData.sourceIndex = Math.floor(Math.random() * this.techNodes.length);
                do {
                    lightning.userData.targetIndex = Math.floor(Math.random() * this.techNodes.length);
                } while (lightning.userData.targetIndex === lightning.userData.sourceIndex);
                lightning.userData.timer = 0;
            }

            if (lightning.userData.active) {
                const source = this.techNodes[lightning.userData.sourceIndex];
                const target = this.techNodes[lightning.userData.targetIndex];

                if (source && target) {
                    const positions = lightning.geometry.attributes.position.array;
                    const points = positions.length / 3;

                    for (let i = 0; i < points; i++) {
                        const t = i / (points - 1);
                        const x = source.position.x * (1 - t) + target.position.x * t;
                        const y = source.position.y * (1 - t) + target.position.y * t;
                        const z = source.position.z * (1 - t) + target.position.z * t;

                        // Jagged lightning effect
                        const jag = (Math.random() - 0.5) * 2 * Math.sin(t * Math.PI);
                        positions[i * 3] = x + jag;
                        positions[i * 3 + 1] = y + jag;
                        positions[i * 3 + 2] = z + jag * 0.5;
                    }

                    lightning.geometry.attributes.position.needsUpdate = true;
                    lightning.material.opacity = 0.8;
                    lightning.material.color.setHSL((time * 0.5) % 1, 0.8, 0.7);
                }

                lightning.userData.duration--;
                if (lightning.userData.duration <= 0) {
                    lightning.userData.active = false;
                    lightning.material.opacity = 0;
                }
            }
        });
    }

    updateEnergyWaves(time) {
        this.energyWaves.forEach((wave, index) => {
            wave.userData.timer++;

            if (wave.userData.timer > wave.userData.delay) {
                const progress = (wave.userData.timer - wave.userData.delay) / wave.userData.speed;
                const radius = progress * wave.userData.maxRadius;

                if (radius < wave.userData.maxRadius) {
                    wave.scale.set(radius, radius, 1);
                    wave.material.opacity = 0.4 * (1 - radius / wave.userData.maxRadius);
                } else {
                    wave.userData.timer = 0;
                    wave.scale.set(0.1, 0.1, 1);
                    wave.material.opacity = 0;
                }
            }
        });
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));

        // Touch support for mobile
        if (this.isMobile) {
            window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
            window.addEventListener('deviceorientation', this.onDeviceOrientation.bind(this), { passive: true });
        }
    }

    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Update mobile detection on resize
        this.isMobile = width <= 768;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    onMouseMove(event) {
        this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onTouchMove(event) {
        if (event.touches.length > 0) {
            this.targetMouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    }

    onDeviceOrientation(event) {
        if (event.gamma && event.beta) {
            // Use device tilt for subtle movement
            this.targetMouse.x = (event.gamma / 45) * 0.5; // Left/right tilt
            this.targetMouse.y = ((event.beta - 45) / 45) * 0.5; // Forward/back tilt
        }
    }

    animate(currentTime) {
        requestAnimationFrame(this.animate.bind(this));

        // Check if we should update animations (frame limiting)
        // But ALWAYS render to prevent blinking in in-app browsers
        const shouldUpdate = !currentTime || (currentTime - this.lastFrameTime >= this.frameInterval);
        if (shouldUpdate) {
            this.lastFrameTime = currentTime || 0;
        }

        const time = this.clock.getElapsedTime();

        // Always update mouse smoothly to prevent jerky movement
        const mouseSmooth = this.isMobile ? 0.03 : 0.05;
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * mouseSmooth;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * mouseSmooth;

        // Skip heavy animations if frame limiting, but still render
        if (!shouldUpdate) {
            this.renderer.render(this.scene, this.camera);
            return;
        }

        // Animate simple particles on mobile
        if (this.simpleParticles) {
            this.simpleParticles.rotation.y = time * 0.1;
            this.simpleParticles.rotation.x = Math.sin(time * 0.05) * 0.1;
        }

        // Animate central core
        if (this.centralCore) {
            this.centralCore.rotation.y = time * 0.3;
            this.centralCore.rotation.z = Math.sin(time * 0.5) * 0.1;

            // Update core shader
            const coreMesh = this.centralCore.children[0];
            if (coreMesh && coreMesh.material && coreMesh.material.uniforms) {
                coreMesh.material.uniforms.time.value = time;
            }

            // Animate glow layers
            this.centralCore.children.forEach((child, i) => {
                if (child.userData.layer) {
                    const pulse = 1 + Math.sin(time * 2 + i * 0.5) * 0.1;
                    child.scale.setScalar(pulse);
                }
                if (child.userData.speed) {
                    if (child.userData.axis === 0) child.rotation.z += child.userData.speed;
                    else if (child.userData.axis === 1) child.rotation.x += child.userData.speed;
                    else child.rotation.y += child.userData.speed;
                }
                if (child.userData.rotSpeed) {
                    child.rotation.z += child.userData.rotSpeed;
                }
            });
        }

        // Animate energy field
        if (this.energyField && this.energyField.material.uniforms) {
            this.energyField.material.uniforms.time.value = time;
        }

        // Animate aura spheres
        this.auraSpheres.forEach(sphere => {
            const d = sphere.userData;
            d.angle += d.speed * 0.01;
            sphere.position.x = Math.cos(d.angle) * d.radius;
            sphere.position.z = Math.sin(d.angle) * d.radius;
            sphere.position.y = d.yOffset + Math.sin(time * d.ySpeed + d.phase) * 3;

            const pulse = 1 + Math.sin(time * 3 + d.phase) * 0.2;
            sphere.scale.setScalar(pulse);
        });

        // Animate tech nodes
        this.techNodes.forEach((node, index) => {
            const d = node.userData;

            const pullFactor = 0.65 + Math.sin(time * d.pullStrength + d.phase) * 0.15;
            const orbitX = Math.cos(time * d.orbitSpeed + d.phase) * d.orbitRadius;
            const orbitY = Math.sin(time * d.orbitSpeed + d.phase) * d.orbitRadius;
            const bob = Math.sin(time * d.bobSpeed + d.phase) * d.bobAmount;

            node.position.x = d.originalPos.x * pullFactor + orbitX + this.mouse.x * 3;
            node.position.y = d.originalPos.y * pullFactor + orbitY + bob + this.mouse.y * 2;
            node.position.z = d.originalPos.z + Math.sin(time * 0.5 + index) * 2;

            // Animate aura rings
            node.children.forEach(child => {
                if (child.userData.ringIndex !== undefined) {
                    child.rotation.z = time * (0.5 + child.userData.ringIndex * 0.2);
                    child.material.opacity = 0.2 + Math.sin(time * 2 + child.userData.ringIndex) * 0.1;
                }
            });

            const scale = 1 + Math.sin(time * 2 + d.phase) * 0.08;
            node.scale.setScalar(scale);
        });

        // Update all effects
        this.updateConnectionLines(time);
        this.updateLightning(time);
        this.updateEnergyWaves(time);

        // Animate floating code symbols
        if (this.codeSymbols) {
            this.codeSymbols.forEach(symbol => {
                const d = symbol.userData;
                symbol.position.y = d.originalY + Math.sin(time * d.floatSpeed + d.phase) * d.floatAmount;
                symbol.material.rotation += d.rotateSpeed;
                symbol.material.opacity = 0.5 + Math.sin(time * 2 + d.phase) * 0.2;
            });
        }

        // Animate binary rain
        if (this.binaryColumns) {
            this.binaryColumns.forEach(column => {
                column.sprites.forEach((sprite, i) => {
                    sprite.position.y -= column.speed * 0.02;

                    // Reset to top when below screen
                    if (sprite.position.y < -20) {
                        sprite.position.y = 20 + i * 1.5;
                        // Randomize the bit
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = 64;
                        canvas.height = 64;
                        const bit = Math.random() > 0.5 ? '1' : '0';
                        const brightness = 1 - (i / column.length) * 0.7;
                        const green = Math.floor(200 * brightness);
                        ctx.shadowColor = `rgb(34, 211, 238)`;
                        ctx.shadowBlur = 15;
                        ctx.fillStyle = i === 0 ? '#ffffff' : `rgb(${green * 0.4}, ${green}, ${green * 0.9})`;
                        ctx.font = 'bold 40px Monaco, Consolas, monospace';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(bit, 32, 32);
                        sprite.material.map = new THREE.CanvasTexture(canvas);
                        sprite.material.map.needsUpdate = true;
                    }
                });
            });
        }

        // Animate data packets traveling between nodes
        if (this.dataPackets && this.techNodes.length > 0) {
            this.dataPackets.forEach(packet => {
                const d = packet.userData;
                d.progress += d.speed;

                if (d.progress >= 1) {
                    d.progress = 0;
                    d.sourceIndex = d.targetIndex;
                    d.targetIndex = Math.floor(Math.random() * this.techNodes.length);
                }

                const source = this.techNodes[d.sourceIndex];
                const target = this.techNodes[d.targetIndex];

                if (source && target) {
                    const t = d.progress;
                    const ease = t * t * (3 - 2 * t); // Smooth step

                    // Curved path
                    const mid = new THREE.Vector3(
                        (source.position.x + target.position.x) / 2,
                        (source.position.y + target.position.y) / 2 + 5,
                        (source.position.z + target.position.z) / 2
                    );

                    const p1 = source.position.clone().lerp(mid, ease);
                    const p2 = mid.clone().lerp(target.position, ease);
                    packet.position.copy(p1.lerp(p2, ease));

                    // Rotation
                    packet.rotation.x += 0.1;
                    packet.rotation.y += 0.15;

                    // Update trail
                    d.trailPositions.unshift(packet.position.clone());
                    if (d.trailPositions.length > 10) d.trailPositions.pop();

                    const trailPositions = d.trail.geometry.attributes.position.array;
                    for (let i = 0; i < 10; i++) {
                        const pos = d.trailPositions[i] || packet.position;
                        trailPositions[i * 3] = pos.x;
                        trailPositions[i * 3 + 1] = pos.y;
                        trailPositions[i * 3 + 2] = pos.z;
                    }
                    d.trail.geometry.attributes.position.needsUpdate = true;
                }
            });
        }

        // Animate network nodes
        if (this.networkNodes) {
            this.networkNodes.forEach((node, i) => {
                const d = node.userData;
                const pulse = 0.5 + Math.sin(time * 3 + d.pulsePhase) * 0.3;
                node.material.opacity = pulse;

                // Slight movement
                node.position.y = d.originalPos.y + Math.sin(time * 0.5 + i) * 0.5;
            });

            // Update network lines
            this.networkLines.forEach(line => {
                const nodeA = this.networkNodes[line.userData.nodeA];
                const nodeB = this.networkNodes[line.userData.nodeB];
                const positions = line.geometry.attributes.position.array;
                positions[0] = nodeA.position.x;
                positions[1] = nodeA.position.y;
                positions[2] = nodeA.position.z;
                positions[3] = nodeB.position.x;
                positions[4] = nodeB.position.y;
                positions[5] = nodeB.position.z;
                line.geometry.attributes.position.needsUpdate = true;

                // Pulse opacity
                line.material.opacity = 0.15 + Math.sin(time * 2 + line.userData.nodeA) * 0.1;
            });
        }

        // Animate terminal text
        if (this.terminalTexts) {
            this.terminalTexts.forEach(text => {
                const d = text.userData;
                text.position.y = d.originalY + Math.sin(time * d.driftSpeed + d.phase) * 2;
                text.material.opacity = 0.4 + Math.sin(time + d.phase) * 0.2;
            });
        }

        // Animate cosmic dust
        if (this.cosmicDust) {
            this.cosmicDust.rotation.y = time * 0.01;
            this.cosmicDust.rotation.x = Math.sin(time * 0.05) * 0.1;
        }

        // Camera movement
        this.camera.position.x = this.mouse.x * 5;
        this.camera.position.y = this.mouse.y * 3;
        this.camera.position.z = 40 + Math.sin(time * 0.3) * 2;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        window.removeEventListener('resize', this.onResize.bind(this));
        window.removeEventListener('mousemove', this.onMouseMove.bind(this));
        this.scene.traverse(obj => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                else obj.material.dispose();
            }
        });
        this.renderer.dispose();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        window.threeScene = new ThreeScene();
    }
});
