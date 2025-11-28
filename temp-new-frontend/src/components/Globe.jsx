import React, { useEffect, useRef } from 'react';

const Globe = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let globeRadius = Math.min(width, height) * 0.4;
        const dots = [];
        const numDots = 800; // Density of the globe
        let rotation = 0;

        // Initialize dots on a sphere
        for (let i = 0; i < numDots; i++) {
            const phi = Math.acos(-1 + (2 * i) / numDots);
            const theta = Math.sqrt(numDots * Math.PI) * phi;
            dots.push({
                x: globeRadius * Math.cos(theta) * Math.sin(phi),
                y: globeRadius * Math.sin(theta) * Math.sin(phi),
                z: globeRadius * Math.cos(phi)
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Center of the canvas
            const cx = width / 2;
            const cy = height / 2;

            rotation += 0.002; // Rotation speed

            dots.forEach(dot => {
                // Rotate around Y axis
                let x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
                let z = dot.z * Math.cos(rotation) + dot.x * Math.sin(rotation);
                let y = dot.y;

                // 3D projection
                let scale = 400 / (400 + z); // Perspective scale
                let alpha = (z + globeRadius) / (2 * globeRadius); // Opacity based on depth

                // Draw only front-facing dots or all with depth
                if (scale > 0) {
                    ctx.beginPath();
                    ctx.arc(cx + x * scale, cy + y * scale, 1.5 * scale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`; // White dots with depth opacity
                    ctx.fill();
                }
            });

            requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            globeRadius = Math.min(width, height) * 0.4;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default Globe;
