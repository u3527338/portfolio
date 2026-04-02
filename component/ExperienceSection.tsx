"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "高級前端工程師",
    company: "Google / 科技公司",
    period: "2022 - 現在",
  },
  {
    title: "全端開發實習生",
    company: "新創電商平台",
    period: "2021 - 2022",
  },
];

export default function ExperienceSection() {
  return (
    // 移除大範圍 Padding 和背景，改為透明卡片風格
    <div className="w-full max-w-sm ml-auto">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
        <Briefcase size={20} className="text-blue-500" />
        工作經歷
      </h2>
      
      <div className="relative border-l border-slate-800 ml-3 space-y-6">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="ml-6 relative"
          >
            {/* 節點圓圈 */}
            <span className="absolute -left-[30px] top-1.5 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-slate-950" />
            
            {/* 內容：精簡化以節省空間 */}
            <div className="group">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                {exp.period}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                {exp.title}
              </h3>
              <p className="text-xs text-slate-400">
                {exp.company}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
