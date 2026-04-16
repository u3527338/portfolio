"use client";

import { SkillGroup } from "@/lib/types";
import { SkillCard } from "./SkillCard";

export default function SkillSection({
    skillGroups,
}: {
    skillGroups: SkillGroup[];
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillGroups.map((group, gIdx) => (
                <SkillCard
                    key={group.category}
                    category={group.category}
                    skills={group.skills}
                    index={gIdx}
                />
            ))}

            <div className="sr-only">
                {skillGroups
                    .map(
                        (group) =>
                            `${group.category}: ${group.skills
                                .map((s) => s.name)
                                .join(", ")}`
                    )
                    .join(" | ")}
            </div>
        </div>
    );
}
