"use client";

import { githubProfile, gmail, linkedInProfile } from "@/lib/constant";
import profilePic from "@/public/image/hero.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import Typewriter from "typewriter-effect";

export default function Home() {
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
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight min-h-[2.5em] md:min-h-[1.8em] lg:min-h-[1.5em] relative">
                            <span className="sr-only">
                                Hello World, I am SIU CHUN KIT - Full-stack
                                Developer passionate about UI/UX.
                            </span>

                            <Typewriter
                                options={{
                                    autoStart: true,
                                    loop: false,
                                    delay: 70,
                                    cursor: "|",
                                    wrapperClassName:
                                        "bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400",
                                    cursorClassName:
                                        "text-blue-500 animate-pulse font-light",
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString("Hello World, ")
                                        .typeString("<br /> I am <br/>")
                                        .typeString(
                                            '<span style="color: #3b82f6;">SIU CHUN KIT</span>'
                                        )
                                        .start();
                                }}
                            />
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5, duration: 1 }}
                            className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed"
                        >
                            一名熱衷於打造極致使用者體驗的{" "}
                            <strong className="text-white font-medium text-inherit">
                                {" "}
                                Full-stack 開發者
                            </strong>
                            。
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                    >
                        <div className="flex gap-5">
                            {[
                                {
                                    icon: <FaGoogle size={24} />,
                                    href: `mailto:${gmail}`,
                                    label: "Email via Google",
                                },
                                {
                                    icon: <FaGithub size={24} />,
                                    href: githubProfile,
                                    label: "GitHub Profile",
                                },
                                {
                                    icon: <FaLinkedin size={24} />,
                                    href: linkedInProfile,
                                    label: "LinkedIn Profile",
                                },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all transform hover:-translate-y-1"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 lg:relative lg:inset-auto flex justify-center lg:justify-end z-0 lg:z-10"
                >
                    <div className="relative w-full h-full lg:w-[420px] lg:h-[420px]">
                        <div className="hidden lg:block absolute inset-0 border-2 border-blue-500/30 rounded-[40px] rotate-6 animate-pulse" />
                        <div className="hidden lg:block absolute inset-0 border border-white/10 rounded-[40px] -rotate-3" />

                        <div className="relative w-full h-full lg:bg-slate-900 lg:rounded-[40px] overflow-hidden lg:border lg:border-white/20 lg:shadow-2xl">
                            <Image
                                src={profilePic}
                                alt="Full-stack Developer SIU CHUN KIT Portrait"
                                fill
                                className="object-cover object-top lg:object-center opacity-30 lg:opacity-100 transition-opacity duration-1000"
                                priority
                                sizes="(max-width: 768px) 100vw, 420px"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
