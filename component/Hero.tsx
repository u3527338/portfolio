"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";
import Image from "next/image";
import profilePic from "@/public/image/hero.png"

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-slate-950 px-6 lg:px-20 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="space-y-4 text-center lg:text-left">
                        <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Hello World, I am <br />
                            <span className="text-blue-500">[SIU CHUN KIT]</span>
                        </h3>
                        <p className="text-slate-400 text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            一名熱衷於打造極致使用者體驗的{" "}
                            <span className="text-white">
                                Full-stack 開發者
                            </span>
                            。
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                        <div className="flex gap-6">
                            <a
                                href="https://linkedin.com"
                                className="text-slate-400 hover:text-white transition-all transform hover:scale-110"
                            >
                                <FaGoogle size={28} />
                            </a>
                            <a
                                href="https://github.com"
                                className="text-slate-400 hover:text-white transition-all transform hover:scale-110"
                            >
                                <FaGithub size={28} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                className="text-slate-400 hover:text-white transition-all transform hover:scale-110"
                            >
                                <FaLinkedin size={28} />
                            </a>
                            <a
                                href="mailto:your@email.com"
                                className="text-slate-400 hover:text-white transition-all transform hover:scale-110"
                            >
                                <Mail size={28} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* 右側：背景圖片容器 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-100 h-100 md:w-120 md:h-120">
                        {/* 裝飾框線動畫 */}
                        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-3xl rotate-6 animate-pulse" />
                        <div className="absolute inset-0 border border-white/10 rounded-3xl -rotate-3" />

                        {/* 圖片存放區 (放入 public/profile.jpg) */}
                        <div className="relative w-full h-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                            {/* 如果還沒放照片，會先顯示背景色和文字佔位 */}
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                <span className="text-slate-600 font-bold text-6xl">
                                    PHOTO
                                </span>
                            </div>

                            {/* 取消註解以顯示照片 */}
                            <Image src={profilePic} alt="Profile" fill className="object-cover" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
