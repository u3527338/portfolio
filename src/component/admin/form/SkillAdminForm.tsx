"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { skillCategory } from "@/lib/constant";
import { SkillFormValues, skillSchema } from "@/schema/Skill";
import { AdminListCard } from "@/src/component/admin/AdminListCard";
import { AdminSection } from "@/src/component/admin/AdminSection";
import { FormActions } from "@/src/component/admin/FormActions";
import { InputField, SelectField } from "@/src/component/admin/FormElements";
import { IconPreview } from "@/src/component/admin/IconPreview";
import { ListActions } from "@/src/component/admin/ListActions";
import { useSkills } from "@/src/hook/useSkills";

export default function SkillAdminForm({
    initialData,
}: {
    initialData?: any[];
}) {
    const t = useTranslations("Form.Skill");
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
            title={editingId ? t("titleEdit") : t("titleAdd")}
            form={
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <InputField
                        label="Skill.fields.name"
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            {t("fields.iconName")}
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
                        tag="Skill"
                        label="Skill.fields.category"
                        {...register("category")}
                        options={skillCategory}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            {t("fields.proficiency")} ({watchedLevel}%)
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
                            {t("list.loading")}
                        </div>
                    ) : (
                        groups.map((group: any) => (
                            <div key={group.category} className="space-y-4">
                                <h4 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                                    {t(
                                        `categories.${group.category
                                            .toLowerCase()
                                            .replace(/ & | /g, "_")}`
                                    )}
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
                                            subtitle={`${s.level}% ${t(
                                                "list.proficiency"
                                            )}`}
                                            actions={
                                                <ListActions
                                                    onEdit={() => onEdit(s)}
                                                    onDelete={() =>
                                                        confirm(
                                                            t(
                                                                "list.confirmDelete"
                                                            )
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
