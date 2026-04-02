"use client";

import profilePic from "@/public/image/hero.png";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center bg-slate-950 px-6 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 lg:space-y-8"
                >
                    <div className="space-y-4 text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-tight">
                            Hello World,<br /> I am <br />
                            <span className="text-blue-500">SIU CHUN KIT</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            一名熱衷於打造極致使用者體驗的{" "}
                            <span className="text-white font-medium">
                                Full-stack 開發者
                            </span>
                            。
                        </p>
                    </div>

                    {/* 社群連結與行動按鈕 */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                        <div className="flex gap-5">
                            <a
                                href="#"
                                className="p-3 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all transform hover:-translate-y-1"
                            >
                                <FaGoogle size={24} />
                            </a>
                            <a
                                href="https://github.com"
                                className="p-3 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all transform hover:-translate-y-1"
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                className="p-3 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all transform hover:-translate-y-1"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="mailto:your@email.com"
                                className="p-3 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all transform hover:-translate-y-1"
                            >
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
                        {/* 裝飾框線 */}
                        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-[40px] rotate-6 animate-pulse" />
                        <div className="absolute inset-0 border border-white/10 rounded-[40px] -rotate-3" />

                        {/* 圖片存放區 */}
                        <div className="relative w-full h-full bg-slate-900 rounded-[40px] overflow-hidden border border-white/20 shadow-2xl">
                            <Image
                                src={profilePic}
                                alt="Profile"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
