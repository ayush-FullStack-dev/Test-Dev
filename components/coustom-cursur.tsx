"use client";

import {
    motion,
    useMotionValue,
    useSpring,
} from "motion/react";
import { useEffect, useState } from "react";


const CoustomCursur = () => {
    const smoothOption = {
        stiffness: 200,
        damping: 60,
        mass: 0.1
    }

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const mouseX = useSpring(x, smoothOption);
    const mouseY = useSpring(y, smoothOption);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hideCursor = () => setIsVisible(false);
        const showCursor = () => setIsVisible(true);

        window.addEventListener("mousemove", (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        });

        window.addEventListener("mouseenter", showCursor);
        window.addEventListener("mouseleave", hideCursor);

        return () => {
            window.removeEventListener("mousemove", (e) => {
                x.set(e.clientX);
                y.set(e.clientY);
            });
            window.removeEventListener("mouseenter", showCursor);
            window.removeEventListener("mouseleave", hideCursor);
        };
    }, [x, y]);

    return (
        <motion.div
            className="
                fixed
                top-0
                left-0
                z-9999
                bg-white
                mix-blend-difference
                aspect-square
                w-5
                pointer-events-none
            "
            style={{
                x: mouseX,
                y: mouseY,
                opacity: isVisible ? 0 : 1,
                translateX: "-50%",
                translateY: "-50%",
            }}
        />
    )
}

export default CoustomCursur