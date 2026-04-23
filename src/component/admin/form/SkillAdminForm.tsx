"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

import { skillCategory } from "@/lib/constant";
import { SkillFormValues, skillSchema } from "@/schema/Skill";
import { AdminSection } from "@/src/component/admin/AdminSection";
import { FormActions } from "@/src/component/admin/FormActions";
import { InputField, SelectField } from "@/src/component/admin/FormElements";
import { ListActions } from "@/src/component/admin/ListActions";
import { AdminListCard } from "@/src/component/admin/AdminListCard";
import { useSkills } from "@/src/hook/useSkills";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillAdminForm({
    initialData,
}: {
    initialData?: any[];
}) {
    const tForm = useTranslations("Form.Skill");
    const t = useTranslations("Skill");
    const { groups, isPending, upsert, remove } = useSkills(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);

    const defaultValues: SkillFormValues = {
        name: "",
        iconName: "",
        category: "frontend_mastery",
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
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const onReset = () => {
        setEditingId(null);
        reset(defaultValues);
    };

    return (
        <AdminSection
            title={editingId ? tForm("titleEdit") : tForm("titleAdd")}
            form={
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-white/5"
                >
                    <InputField
                        label="Skill.fields.name"
                        placeholder="e.g. TypeScript"
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                {tForm("fields.iconName")}
                            </label>
                            <a
                                href="https://icon-sets.iconify.design/"
                                target="_blank"
                                className="text-[10px] text-blue-500 hover:underline"
                            >
                                Find Icon Name →
                            </a>
                        </div>
                        <div className="relative flex items-center">
                            <input
                                {...register("iconName")}
                                placeholder="e.g. logos:typescript-icon"
                                className={`w-full bg-white/5 border ${
                                    errors.iconName
                                        ? "border-red-500/50"
                                        : "border-white/10"
                                } rounded-xl px-4 py-3 pl-12 outline-none focus:border-blue-500 transition-all text-white font-mono text-sm`}
                            />
                            <div className="absolute left-4 w-6 h-6 flex items-center justify-center text-blue-400">
                                <Icon
                                    icon={
                                        watchedIconName ||
                                        "ph:placeholder-light"
                                    }
                                    className="w-5 h-5"
                                />
                            </div>
                        </div>
                    </div>

                    <SelectField
                        tag="Skill"
                        label="Skill.fields.category"
                        {...register("category")}
                        options={skillCategory}
                        translation
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex justify-between">
                            <span>{tForm("fields.proficiency")}</span>
                            <span className="text-blue-400">
                                {watchedLevel}%
                            </span>
                        </label>
                        <div className="pt-4 px-2">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                {...register("level", { valueAsNumber: true })}
                                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <FormActions
                            loading={isPending}
                            editingId={editingId}
                            onCancel={onReset}
                        />
                    </div>
                </form>
            }
            list={
                <div className="space-y-12">
                    {groups.map((group: any) => (
                        <div key={group.category} className="space-y-4">
                            <h4 className="text-blue-400 font-mono text-[11px] uppercase tracking-[0.3em] px-2 border-l-2 border-blue-500/50 ml-1">
                                {t(
                                    `categories.${group.category
                                        .toLowerCase()
                                        .replace(/ & | /g, "_")}`
                                )}
                            </h4>

                            <div className="grid grid-cols-1 gap-3">
                                <AnimatePresence mode="popLayout">
                                    {group.skills.map((s: any) => (
                                        <motion.div
                                            key={s._id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                        >
                                            <AdminListCard
                                                title={s.name}
                                                subtitle={`${s.level}% ${tForm(
                                                    "fields.proficiency"
                                                )}`}
                                                image={
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-800/50 text-blue-400">
                                                        <Icon
                                                            icon={s.iconName}
                                                            className="w-6 h-6"
                                                        />
                                                    </div>
                                                }
                                                actions={
                                                    <ListActions
                                                        onEdit={() => onEdit(s)}
                                                        onDelete={() =>
                                                            confirm(
                                                                tForm(
                                                                    "list.confirmDelete"
                                                                )
                                                            ) && remove(s._id)
                                                        }
                                                    />
                                                }
                                            >
                                                <div className="mt-2 w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500/50"
                                                        style={{
                                                            width: `${s.level}%`,
                                                        }}
                                                    />
                                                </div>
                                            </AdminListCard>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            }
        />
    );
}
