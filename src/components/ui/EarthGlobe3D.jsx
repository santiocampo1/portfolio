import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const CITIES = [
    { name: "Santa Fe", lat: -31.62, lng: -60.70, color: 0x7c3aed, height: 0.20 },
    { name: "Buenos Aires", lat: -34.60, lng: -58.38, color: 0x1d4ed8, height: 0.32 },
    { name: "Orlando", lat: 28.54, lng: -81.38, color: 0xf59e0b, height: 0.26 },
    { name: "Lima", lat: -12.05, lng: -77.04, color: 0x0d9488, height: 0.24 },
];

function latLngToVector3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

export default function EarthGlobe3D() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth;
        let height = container.clientHeight;
        let animId = null;
        let isVisible = true;

        // ─── Scene ──────────────────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
        camera.position.set(0, 0.2, 3.2);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const sun = new THREE.DirectionalLight(0xffffff, 1.3);
        scene.add(sun);

        const EARTH_RADIUS = 1;
        const globeGroup = new THREE.Group();

        const earthMaterial = new THREE.MeshPhongMaterial({
            color: 0x9bb3d6, // fallback visible mientras carga la textura
            specular: 0x333333,
            shininess: 6,
        });
        const earth = new THREE.Mesh(
            new THREE.SphereGeometry(EARTH_RADIUS, 64, 64),
            earthMaterial
        );
        globeGroup.add(earth);

        new THREE.TextureLoader().load(
            "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
            (tex) => {
                earthMaterial.map = tex;
                earthMaterial.color.set(0xffffff);
                earthMaterial.needsUpdate = true;
            },
            undefined,
            () => { /* sin conexión — se mantiene el color de fallback */ }
        );

        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(EARTH_RADIUS * 1.04, 48, 48),
            new THREE.MeshBasicMaterial({
                color: 0x6ec6ff, transparent: true, opacity: 0.16,
                side: THREE.BackSide, blending: THREE.AdditiveBlending,
            })
        );
        globeGroup.add(atmosphere);

        const pings = [];
        CITIES.forEach((city, i) => {
            const surfacePoint = latLngToVector3(city.lat, city.lng, EARTH_RADIUS);
            const normal = surfacePoint.clone().normalize();

            const spike = new THREE.Mesh(
                new THREE.CylinderGeometry(0.006, 0.006, city.height, 6),
                new THREE.MeshBasicMaterial({
                    color: city.color, transparent: true, opacity: 0.9,
                    blending: THREE.AdditiveBlending,
                })
            );
            const quat = new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0), normal
            );
            spike.quaternion.copy(quat);
            spike.position.copy(surfacePoint).add(normal.clone().multiplyScalar(city.height / 2));
            globeGroup.add(spike);

            const tip = new THREE.Mesh(
                new THREE.SphereGeometry(0.017, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: city.color, transparent: true, opacity: 0.95,
                    blending: THREE.AdditiveBlending,
                })
            );
            tip.position.copy(surfacePoint).add(normal.clone().multiplyScalar(city.height));
            globeGroup.add(tip);

            const ring = new THREE.Mesh(
                new THREE.RingGeometry(0.001, 0.035, 24),
                new THREE.MeshBasicMaterial({
                    color: city.color, transparent: true, opacity: 0.5,
                    side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
                })
            );
            ring.quaternion.copy(quat);
            ring.position.copy(surfacePoint).add(normal.clone().multiplyScalar(0.006));
            globeGroup.add(ring);

            pings.push({ mesh: ring, offset: i / CITIES.length });
        });

        scene.add(globeGroup);

        const starCount = 90;
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            const r = 3.5 + Math.random() * 2.5;
            const theta = Math.random() * Math.PI;
            const phi = Math.random() * Math.PI * 2;
            starPositions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
            starPositions[i * 3 + 1] = r * Math.cos(theta);
            starPositions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
        }
        const starsGeo = new THREE.BufferGeometry();
        starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.5 });
        const stars = new THREE.Points(starsGeo, starsMat);
        scene.add(stars);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.7;
        controls.target.set(0, 0, 0);

        function onDown() { container.style.cursor = "grabbing"; }
        function onUp() { container.style.cursor = "grab"; }
        container.style.cursor = "grab";
        container.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);

        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0.1 }
        );
        observer.observe(container);

        const resizeObserver = new ResizeObserver(() => {
            width = container.clientWidth;
            height = container.clientHeight;
            if (width === 0 || height === 0) return;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
        resizeObserver.observe(container);

        function animate() {
            animId = requestAnimationFrame(animate);
            if (!isVisible) return;

            const t = performance.now() * 0.001;

            sun.position.set(Math.cos(t * 0.15) * 5, 1.5, Math.sin(t * 0.15) * 5);

            pings.forEach(ping => {
                const phase = ((t * 0.4) + ping.offset) % 1;
                const scale = 1 + phase * 2.6;
                ping.mesh.scale.set(scale, scale, scale);
                ping.mesh.material.opacity = Math.max(0, 0.5 * (1 - phase));
            });

            stars.material.opacity = 0.4 + Math.sin(t * 0.5) * 0.1;

            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            cancelAnimationFrame(animId);
            observer.disconnect();
            resizeObserver.disconnect();
            container.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            controls.dispose();
            earth.geometry.dispose(); earthMaterial.dispose();
            atmosphere.geometry.dispose(); atmosphere.material.dispose();
            globeGroup.children.forEach(obj => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) obj.material.dispose();
            });
            starsGeo.dispose(); starsMat.dispose();
            renderer.dispose();
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "100%", position: "relative", touchAction: "none" }}
        />
    );
}