"use client";

import { motion } from "framer-motion";

const navItems = [
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact Me", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 flex justify-center p-6"
    >
      <div className="flex items-center gap-8 px-8 py-3 rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-2xl">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            {item.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
