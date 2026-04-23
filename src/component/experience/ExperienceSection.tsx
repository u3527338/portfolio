"use client";

import { useState } from "react";
import { ExperienceBackground } from "./ExperienceBackground";
import { ExperienceDetail } from "./ExperienceDetail";
import { ExperienceTree } from "./ExperienceTree";

export default function ExperienceSection({
    experiences,
}: {
    experiences: any[];
}) {
    const [activeExp, setActiveExp] = useState(experiences[0] || null);

    if (!activeExp && experiences.length === 0) {
        return <div className="text-white p-10">No data found.</div>;
    }

    return (
        <section className="fixed inset-0 h-[100dvh] w-full bg-slate-950 overflow-hidden flex flex-col">
            <ExperienceBackground
                activeBg={activeExp?.bgImage}
                activeCompanyName={activeExp?.company}
            />

            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row px-6 lg:px-24 py-8 lg:py-0">
                <div className="w-full lg:w-2/5 flex flex-col justify-end lg:justify-center shrink-0 lg:shrink h-1/3 lg:h-full min-h-0 pt-10">
                    <div className="overflow-y-auto no-scrollbar py-4">
                        <ExperienceTree
                            experiences={experiences}
                            activeId={activeExp?._id}
                            onHover={setActiveExp}
                        />
                    </div>
                </div>

                <div className="w-full lg:w-3/5 flex-1 min-h-0 flex flex-col justify-end items-end overflow-hidden lg:pb-8">
                    <div className="w-full overflow-y-auto no-scrollbar">
                        <ExperienceDetail activeExp={activeExp} />
                    </div>
                </div>
            </div>

            <div className="sr-only" aria-hidden="false">
                {experiences.map((exp) => (
                    <article key={exp._id}>
                        <h2>{exp.title}</h2>
                        <p>{exp.shortDesc}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
