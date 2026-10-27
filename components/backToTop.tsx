"use client"

import { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { motion } from "motion/react"
import { useIsDesktop } from "@/hooks/useIsDesktop";

const BackToTop = () => {
    const isDesktop = useIsDesktop();
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll >= 150) {
                setHidden(false);
            } else {
                setHidden(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isDesktop) return
    
    return (
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="
                hidden md:block
                fixed bottom-5 right-5 z-90
                rounded-full bg-[#161D26] p-3
                dark:bg-white
            "
            animate={{
                opacity: hidden ? 0 : 1,
                y: hidden ? 10 : 0,
            }}
            transition={{
                duration: 0.3,
                ease: "easeInOut",
            }}
            style={{
                pointerEvents: hidden ? "none" : "auto",
            }}
        >
            <FaArrowUpLong
                size={22}
                className="text-white dark:text-black"
            />
        </motion.button>
    );
};

export default BackToTop