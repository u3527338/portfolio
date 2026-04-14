"use client";

import profilePic from "@/public/image/hero.png";
import { motion, Variants } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";

export default function Home() {
    const text = "Hello World, I am SIU CHUN KIT";

    const container: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.08,
            },
        },
    };

    const child: Variants = {
        visible: {
            display: "inline-block",
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
            },
        },
        hidden: {
            display: "inline-block",
            opacity: 0,
            scale: 0,
        },
    };

    return (
        <section className="relative h-screen w-full flex items-center bg-slate-950 px-6 lg:px-32 overflow-hidden">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 lg:space-y-8 z-20"
                >
                    <div className="space-y-4 text-center lg:text-left">
                        <motion.h1 
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-tight flex flex-wrap justify-center lg:justify-start items-center"
                        >
                            {text.split("").map((letter, index) => (
                                <motion.span 
                                    key={index}
                                    variants={child}
                                    className={index > 16 ? "text-blue-500" : ""}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </motion.h1>
                        
                        <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            一名熱衷於打造極致使用者體驗的{" "}
                            <span className="text-white font-medium">
                                Full-stack 開發者
                            </span>
                            。
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                        <div className="flex gap-5">
                            {[
                                { icon: <FaGoogle size={24} />, href: "#" },
                                { icon: <FaGithub size={24} />, href: "https://github.com" },
                                { icon: <FaLinkedin size={24} />, href: "https://linkedin.com" },
                                { icon: <Mail size={24} />, href: "mailto:your@email.com" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="p-3 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all transform hover:-translate-y-1"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 lg:relative lg:inset-auto flex justify-center lg:justify-end z-0 lg:z-10"
                >
                    <div className="relative w-full h-full lg:w-[420px] lg:h-[420px]">
                        <div className="hidden lg:block absolute inset-0 border-2 border-blue-500/30 rounded-[40px] rotate-6 animate-pulse" />
                        <div className="hidden lg:block absolute inset-0 border border-white/10 rounded-[40px] -rotate-3" />

                        <div className="relative w-full h-full lg:bg-slate-900 lg:rounded-[40px] overflow-hidden lg:border lg:border-white/20 lg:shadow-2xl">
                            <Image
                                src={profilePic}
                                alt="Profile"
                                fill
                                className="object-cover object-top lg:object-center opacity-40 lg:opacity-100 transition-opacity duration-700"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
