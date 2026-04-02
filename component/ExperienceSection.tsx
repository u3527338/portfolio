"use client"; // 使用動畫需要 client component

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "高級前端工程師",
    company: "Google / 科技公司",
    period: "2022 - 現在",
    description: "負責 Next.js 核心架構開發，提升網站加載速度 40%，並帶領 5 人團隊。",
  },
  {
    title: "全端開發實習生",
    company: "新創電商平台",
    period: "2021 - 2022",
    description: "使用 React 與 Node.js 建立後台管理系統，優化 API 查詢效率。",
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto bg-slate-50 rounded-2xl">
      <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">工作經歷</h2>
      
      <div className="relative border-l-2 border-blue-200 ml-4">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-10 ml-8 relative"
          >
            {/* 圓圈與圖示 */}
            <span className="absolute -left-[41px] top-0 bg-blue-500 p-2 rounded-full text-white ring-4 ring-white">
              <Briefcase size={16} />
            </span>
            
            {/* 內容卡片 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {exp.period}
              </span>
              <h3 className="text-xl font-bold mt-3 text-slate-900">{exp.title}</h3>
              <p className="text-slate-500 font-medium mb-2">{exp.company}</p>
              <p className="text-slate-600 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
