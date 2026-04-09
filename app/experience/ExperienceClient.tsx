"use client";

import { useState } from "react";
import { ExperienceBackground } from "./ExperienceBackground";
import { ExperienceDetail } from "./ExperienceDetail";
import { ExperienceTree } from "./ExperienceTree";

export default function ExperienceClient({
  experiences,
}: {
  experiences: any[];
}) {
  const [activeExp, setActiveExp] = useState(experiences[0] || null);

  if (!activeExp) return <div className="text-white">Loading...</div>;

  return (
    <section className="relative h-screen w-full bg-slate-950 overflow-hidden flex items-center">
      {/* 背景圖片組件 */}
      <ExperienceBackground activeBg={activeExp.bgImage} />

      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between px-10 lg:px-24 pt-20">
        <div className="w-full lg:w-1/3 flex flex-col justify-center h-full max-h-[70vh]">
          <div className="overflow-y-auto no-scrollbar pr-4 py-4">
            <ExperienceTree
              experiences={experiences}
              activeId={activeExp._id} // 注意這裡改用 _id
              onHover={setActiveExp}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-end items-end pb-20 lg:pb-32">
          <ExperienceDetail activeExp={activeExp} />
        </div>
      </div>
    </section>
  );
}
