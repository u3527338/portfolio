"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { AdminListCard } from "@/component/admin/AdminListCard";
import { AdminSection } from "@/component/admin/AdminSection";
import { FormActions } from "@/component/admin/FormActions";
import { InputField, SelectField } from "@/component/admin/FormElements";
import { IconPreview } from "@/component/admin/IconPreview";
import { ListActions } from "@/component/admin/ListActions";
import { useSkills } from "../hook/useSkills";

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

export default function SkillAdminForm({
    initialData,
}: {
    initialData?: any[];
}) {
    const { groups, isLoading, isPending, upsert, remove } =
        useSkills(initialData);
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

    const onSubmit: SubmitHandler<SkillFormValues> = async (data) => {
        const result = await upsert({ data, id: editingId });
        if (result.success) onReset();
    };

    const onEdit = (skill: any) => {
        setEditingId(skill._id);
        reset({
            name: skill.name,
            iconName: skill.iconName,
            category: skill.category,
            level: skill.level,
        });
    };

    const onReset = () => {
        setEditingId(null);
        reset(defaultValues);
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
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
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
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
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
                        loading={isPending}
                        editingId={editingId}
                        onCancel={onReset}
                    />
                </form>
            }
            list={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {isLoading ? (
                        <div className="col-span-2 text-center p-8 text-slate-500 font-mono text-xs">
                            LOADING SKILLS...
                        </div>
                    ) : (
                        groups.map((group: any) => (
                            <div key={group.category} className="space-y-4">
                                <h4 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                                    {group.category}
                                </h4>
                                <div className="space-y-2">
                                    {group.skills.map((s: any) => (
                                        <AdminListCard
                                            key={s._id}
                                            image={
                                                <div className="w-full h-full flex items-center justify-center bg-slate-800/50 rounded-lg text-xl">
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
                                                        confirm(
                                                            "Delete skill?"
                                                        ) && remove(s._id)
                                                    }
                                                />
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            }
        />
    );
}
