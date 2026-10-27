
"use client";

import { useIsDesktop } from "@/hooks/useIsDesktop";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const CustomCursor = () => {
    const isDesktop = useIsDesktop();
    const smoothOption = {
        stiffness: 200,
        damping: 60,
        mass: 0.1,
    };

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const mouseX = useSpring(x, smoothOption);
    const mouseY = useSpring(y, smoothOption);

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (!isDesktop) return;

        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            setIsVisible(true);
        };

        const hideCursor = () => setIsVisible(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", hideCursor);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", hideCursor);
        };
    }, [isDesktop, x, y]);

    if (!isDesktop) return null;

    return (
        <motion.div
            className="
                pointer-events-none
                fixed
                left-0
                top-0
                z-500
                aspect-square
                w-5
                bg-white
                mix-blend-difference
            "
            style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
                opacity: isVisible ? 1 : 0,
            }}
        />
    );
};

export default CustomCursor;
