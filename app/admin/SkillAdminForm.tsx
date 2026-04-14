"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { AdminListCard } from "@/component/AdminListCard";
import { AdminSection } from "@/component/AdminSection";
import { FormActions } from "@/component/FormActions";
import { InputField, SelectField } from "@/component/FormElements";
import { IconPreview } from "@/component/IconPreview";
import { ListActions } from "@/component/ListActions";
import { useAdminData } from "../hook/useAdminData";

const skillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    iconName: z.string().min(1, "Icon name is required"),
    category: z.enum([
        "Frontend Mastery",
        "Backend & Real-time",
        "Database & DevOps",
        "Business Automation",
    ]),
    level: z.number().min(0).max(100),
});

type SkillFormValues = z.infer<typeof skillSchema>;

export default function SkillAdminForm() {
    const {
        data: groups,
        loading,
        upsert,
        remove,
    } = useAdminData("/api/skills");
    const [editingId, setEditingId] = useState<string | null>(null);

    const defaultValues: SkillFormValues = {
        name: "",
        iconName: "",
        category: "Frontend Mastery",
        level: 90,
    };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<SkillFormValues>({
        resolver: zodResolver(skillSchema),
        defaultValues,
    });

    const watchedIconName = watch("iconName");
    const watchedLevel = watch("level");

    const onEdit = (skill: any) => {
        setEditingId(skill._id);
        reset({
            name: skill.name || defaultValues.name,
            iconName: skill.iconName || defaultValues.iconName,
            category: skill.category || defaultValues.category,
            level: skill.level || defaultValues.level,
        });
    };

    const onReset = () => {
        setEditingId(null);
        reset();
    };

    const onSubmit: SubmitHandler<SkillFormValues> = async (data) => {
        if (await upsert(data, editingId)) onReset();
    };

    return (
        <AdminSection
            title={editingId ? "Edit Skill" : "Add New Skill"}
            form={
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <InputField
                        label="Skill Name"
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            Icon Name (Si/Fa/Ai)
                        </label>
                        <div className="relative flex items-center">
                            <input
                                {...register("iconName")}
                                placeholder="e.g. SiNextdotjs"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 outline-none focus:border-blue-500 transition-all text-white"
                            />
                            <div className="absolute left-4 text-blue-400">
                                <IconPreview iconName={watchedIconName} />
                            </div>
                        </div>
                        {errors.iconName && (
                            <span className="text-red-500 text-[10px]">
                                {errors.iconName.message}
                            </span>
                        )}
                    </div>

                    <SelectField
                        label="Category"
                        {...register("category")}
                        options={[
                            "Frontend Mastery",
                            "Backend & Real-time",
                            "Database & DevOps",
                            "Business Automation",
                        ]}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            Proficiency ({watchedLevel}%)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            {...register("level", { valueAsNumber: true })}
                            className="h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-4"
                        />
                    </div>

                    <FormActions
                        loading={loading}
                        editingId={editingId}
                        onCancel={onReset}
                    />
                </form>
            }
            list={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {groups &&
                        groups.map((group: any) => (
                            <div key={group.category} className="space-y-4">
                                <h4 className="text-blue-400 font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-2">
                                    {group.category}
                                </h4>
                                <div className="space-y-2">
                                    {group.skills.map((s: any) => (
                                        <AdminListCard
                                            key={s._id}
                                            image={
                                                <div className="w-full h-full flex items-center justify-center bg-slate-800 rounded-lg">
                                                    <IconPreview
                                                        iconName={s.iconName}
                                                    />
                                                </div>
                                            }
                                            title={s.name}
                                            subtitle={`${s.level}% Proficiency`}
                                            actions={
                                                <ListActions
                                                    onEdit={() => onEdit(s)}
                                                    onDelete={() =>
                                                        remove(s._id)
                                                    }
                                                />
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            }
        />
    );
}
