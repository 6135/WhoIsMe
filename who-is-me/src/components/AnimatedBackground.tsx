// src/components/AnimatedBackground.tsx
import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/AnimatedBackground.css';

interface Shape {
    x: number;
    y: number;
    size: number;
    sides?: number;
    type: 'circle' | 'triangle' | 'hexagon' | 'wireCircle' | 'wireTriangle' | 'wireHexagon' | 'wireSquare' | 'wireStar' | 'star' | 'polygon' | 'diamond';
    color: string;
    opacity: number;
    speed: number;
    direction: number;
    rotation: number;
    rotationSpeed: number;
    lineWidth?: number; // For wireframe shapes
}

export const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapesRef = useRef<Shape[]>([]);
    const animationFrameId = useRef<number>(0);
    const draggedShapeIndexRef = useRef<number | null>(null);
    const mousePosRef = useRef<{ x: number, y: number } | null>(null);
    const isInitializedRef = useRef<boolean>(false);

    // Initialize shapes on component mount
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full window size
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Handle window resize
        window.addEventListener('resize', handleResize);
        handleResize();

        // Only generate shapes once when the component first mounts
        if (!isInitializedRef.current) {
            shapesRef.current = generateShapes(35);
            isInitializedRef.current = true;
        }

        // Animation function
        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw shapes
            shapesRef.current.forEach((shape, index) => {
                // Only update position if not being dragged
                if (index !== draggedShapeIndexRef.current) {
                    // Update position
                    shape.x += shape.speed * Math.cos(shape.direction);
                    shape.y += shape.speed * Math.sin(shape.direction);
                    
                    // Wrap around edges
                    if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
                    if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
                    if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
                    if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
                } else if (mousePosRef.current) {
                    // If this shape is being dragged, update its position to follow the mouse
                    shape.x = mousePosRef.current.x;
                    shape.y = mousePosRef.current.y;
                }

                // Always update rotation
                shape.rotation += shape.rotationSpeed;

                // Draw shape
                drawShape(ctx, shape);
            });

            // Continue animation loop
            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []); // Empty dependency array means this runs once on mount

    // Generate array of random shapes
    const generateShapes = (count: number): Shape[] => {
        const solidShapeTypes = ['circle', 'triangle', 'hexagon', 'star'];
        const wireShapeTypes = ['wireCircle', 'wireTriangle', 'wireHexagon', 'wireSquare', 'wireStar'];
        const allShapeTypes = [...solidShapeTypes, ...wireShapeTypes];
        const colors = ['#3498db', '#2c3e50', '#2980b9', '#34495e', '#1abc9c', '#3498db', '#16a085']; // Blues and complementary colors

        const newShapes: Shape[] = [];

        for (let i = 0; i < count; i++) {
            // Decide if this will be a wireframe shape (about 40% chance)
            const isWireframe = Math.random() < 0.3;
            const shapeType = isWireframe
                ? wireShapeTypes[Math.floor(Math.random() * wireShapeTypes.length)]
                : solidShapeTypes[Math.floor(Math.random() * solidShapeTypes.length)];

            newShapes.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: 10 + Math.random() * 140, // Size between 10 and 150
                sides: Math.floor(Math.random() * 11) + 5, // Random number of sides for polygons
                type: shapeType as any,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 0.1 + Math.random() * 0.18, // Opacity between 0.1 and 0.3
                speed: 0.1 + Math.random() * 0.4, // Slow speed for gentle movement
                direction: Math.random() * Math.PI * 2, // Random direction
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01 // Slow rotation
            });
        }

        return newShapes;
    };

    // Draw a single shape on the canvas
    const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);

        // Set opacity for all shapes
        ctx.globalAlpha = shape.opacity;

        switch (shape.type) {
            // Solid shapes
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                ctx.fillStyle = shape.color;
                ctx.fill();
                break;

            case 'triangle':
                ctx.beginPath();
                const triangleSize = shape.size / 2;
                ctx.moveTo(0, -triangleSize);
                ctx.lineTo(triangleSize * Math.cos(Math.PI / 6), triangleSize * Math.sin(Math.PI / 6));
                ctx.lineTo(-triangleSize * Math.cos(Math.PI / 6), triangleSize * Math.sin(Math.PI / 6));
                ctx.closePath();
                ctx.fillStyle = shape.color;
                ctx.fill();
                break;

            case 'hexagon':
                ctx.beginPath();
                const hexSize = shape.size / 2;
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const x = hexSize * Math.cos(angle);
                    const y = hexSize * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fillStyle = shape.color;
                ctx.fill();
                break;

            // Wireframe shapes
            case 'wireCircle':
                ctx.beginPath();
                ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                ctx.strokeStyle = shape.color;
                ctx.lineWidth = shape.lineWidth || 1;
                ctx.stroke();
                break;

            case 'wireTriangle':
                ctx.beginPath();
                const wireTSize = shape.size / 2;
                ctx.moveTo(0, -wireTSize);
                ctx.lineTo(wireTSize * Math.cos(Math.PI / 6), wireTSize * Math.sin(Math.PI / 6));
                ctx.lineTo(-wireTSize * Math.cos(Math.PI / 6), wireTSize * Math.sin(Math.PI / 6));
                ctx.closePath();
                ctx.strokeStyle = shape.color;
                ctx.lineWidth = shape.lineWidth || 1;
                ctx.stroke();
                break;

            case 'wireHexagon':
                ctx.beginPath();
                const wireHexSize = shape.size / 2;
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const x = wireHexSize * Math.cos(angle);
                    const y = wireHexSize * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.strokeStyle = shape.color;
                ctx.lineWidth = shape.lineWidth || 1;
                ctx.stroke();
                break;

            case 'wireSquare':
                ctx.beginPath();
                const halfSize = shape.size / 2;
                ctx.rect(-halfSize, -halfSize, shape.size, shape.size);
                ctx.strokeStyle = shape.color;
                ctx.lineWidth = shape.lineWidth || 1;
                ctx.stroke();
                break;
            case 'star':
                const starPoints = 5; // Or make variable
                const outerRadius = shape.size / 2;
                const innerRadius = outerRadius * 0.4;
                ctx.beginPath();
                for (let i = 0; i < starPoints * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (Math.PI / starPoints) * i;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fillStyle = shape.color;
                ctx.fill();
                break;
            case 'diamond':
                ctx.beginPath();
                let dSize = shape.size / 2;
                ctx.moveTo(0, -dSize); // Top
                ctx.lineTo(dSize, 0);  // Right
                ctx.lineTo(0, dSize);  // Bottom
                ctx.lineTo(-dSize, 0); // Left
                ctx.closePath();
                ctx.fillStyle = shape.color;
                ctx.fill();
                break;
            case 'wireStar':
                const wStarPoints = 5;
                const wOuterRadius = shape.size / 2;
                const wInnerRadius = wOuterRadius * 0.4;

                ctx.beginPath();
                for (let i = 0; i < wStarPoints * 2; i++) {
                    const radius = i % 2 === 0 ? wOuterRadius : wInnerRadius;
                    const angle = (Math.PI / wStarPoints) * i;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.strokeStyle = shape.color;
                ctx.lineWidth = shape.lineWidth || 1;
                ctx.stroke();
                break;
        }

        ctx.restore();
    };

    // Find if a point is inside a shape
    const isPointInShape = (shape: Shape, point: { x: number, y: number }): boolean => {
        // Calculate distance between point and shape center
        const dx = point.x - shape.x;
        const dy = point.y - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Simple circular hit detection for all shapes
        return distance <= shape.size / 2;
    };

    // Handle mouse events
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Get mouse coordinates relative to canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Check if the mouse is on any shape (check in reverse to prioritize shapes drawn on top)
        for (let i = shapesRef.current.length - 1; i >= 0; i--) {
            if (isPointInShape(shapesRef.current[i], { x: mouseX, y: mouseY })) {
                // Make this shape dragged
                draggedShapeIndexRef.current = i;
                mousePosRef.current = { x: mouseX, y: mouseY };
                
                // Set cursor to indicate dragging
                canvas.style.cursor = 'grabbing';
                break;
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (draggedShapeIndexRef.current === null) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Update mouse position for the dragged shape
        const rect = canvas.getBoundingClientRect();
        mousePosRef.current = { 
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseUp = () => {
        // Stop dragging
        if (draggedShapeIndexRef.current !== null) {
            // Reset drag state
            draggedShapeIndexRef.current = null;
            
            // Reset cursor
            if (canvasRef.current) {
                canvasRef.current.style.cursor = 'default';
            }
        }
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || e.touches.length === 0) return;

        // Prevent scrolling while dragging
        e.preventDefault();

        // Get touch coordinates relative to canvas
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;

        // Check if the touch is on any shape (check in reverse to prioritize shapes drawn on top)
        for (let i = shapesRef.current.length - 1; i >= 0; i--) {
            if (isPointInShape(shapesRef.current[i], { x: touchX, y: touchY })) {
                // Make this shape dragged
                draggedShapeIndexRef.current = i;
                mousePosRef.current = { x: touchX, y: touchY };
                break;
            }
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        if (draggedShapeIndexRef.current === null || e.touches.length === 0) return;

        // Prevent scrolling while dragging
        e.preventDefault();

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Update touch position for the dragged shape
        const rect = canvas.getBoundingClientRect();
        mousePosRef.current = { 
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    };

    const handleTouchEnd = () => {
        // Stop dragging
        draggedShapeIndexRef.current = null;
    };

    // Cursor changes based on dragging state
    const getCursorStyle = () => {
        return draggedShapeIndexRef.current !== null ? 'grabbing' : 'default';
    };

    return (
        <canvas
            ref={canvasRef}
            className="animated-background"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
                cursor: getCursorStyle(),
                zIndex: draggedShapeIndexRef.current !== null ? 10 : 0 // Elevate z-index when dragging
            }}
        />
    );
};