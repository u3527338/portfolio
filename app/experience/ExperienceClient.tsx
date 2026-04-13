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
      <ExperienceBackground activeBg={activeExp.bgImage} />

      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row justify-between px-6 lg:px-20">
        
        <div className="w-full lg:w-1/3 flex flex-col justify-start lg:justify-center h-auto lg:h-full lg:pt-0">
          <div className="lg:overflow-y-auto no-scrollbar pr-0 lg:pr-4 py-4">
            <ExperienceTree
              experiences={experiences}
              activeId={activeExp._id}
              onHover={setActiveExp}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-end items-end pb-16 lg:pb-32 flex-1">
          <ExperienceDetail activeExp={activeExp} />
        </div>
      </div>
    </section>
  );
}
