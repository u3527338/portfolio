"use client";

import { AdminListCard } from "@/component/AdminListCard";
import { AdminSection } from "@/component/AdminSection";
import { FormActions } from "@/component/FormActions";
import { InputField, SelectField } from "@/component/FormElements";
import { ListActions } from "@/component/ListActions";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { useAdminData } from "../hook/useAdminData";

const IconPreview = ({ iconName }: { iconName: string }) => {
    if (!iconName) return <HelpCircle size={20} className="text-slate-600" />;
    const getIcon = (name: string) => {
        if (name.startsWith("Si")) return (SiIcons as any)[name];
        if (name.startsWith("Fa")) return (FaIcons as any)[name];
        if (name.startsWith("Ai")) return (AiIcons as any)[name];
        return null;
    };
    const IconComponent = getIcon(iconName);
    return IconComponent ? (
        <IconComponent size={20} />
    ) : (
        <HelpCircle size={20} className="text-slate-600" />
    );
};

export default function SkillAdminForm() {
    const {
        data: groups,
        loading,
        upsert,
        remove,
    } = useAdminData("/api/skills");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        iconName: "",
        category: "Frontend Mastery",
        level: 90,
    });

    const onEdit = (skill: any) => {
        setEditingId(skill._id);
        setFormData({
            name: skill.name,
            iconName: skill.iconName,
            category: skill.category,
            level: skill.level,
        });
    };

    const onReset = () => {
        setEditingId(null);
        setFormData({
            name: "",
            iconName: "",
            category: "Frontend Mastery",
            level: 90,
        });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (await upsert(formData, editingId)) onReset();
    };

    return (
        <AdminSection
            title={editingId ? "Edit Skill" : "Add New Skill"}
            form={
                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <InputField
                        label="Skill Name"
                        value={formData.name}
                        onChange={(v: string) =>
                            setFormData({ ...formData, name: v })
                        }
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            Icon Name (Si/Fa/Ai)
                        </label>
                        <div className="relative flex items-center">
                            <input
                                required
                                placeholder="e.g. SiNextdotjs"
                                value={formData.iconName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        iconName: e.target.value,
                                    })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 outline-none focus:border-blue-500 transition-all text-white"
                            />
                            <div className="absolute left-4 text-blue-400">
                                <IconPreview iconName={formData.iconName} />
                            </div>
                        </div>
                    </div>

                    <SelectField
                        label="Category"
                        value={formData.category}
                        options={[
                            "Frontend Mastery",
                            "Backend & Real-time",
                            "Database & DevOps",
                            "Business Automation",
                        ]}
                        onChange={(v: string) =>
                            setFormData({ ...formData, category: v })
                        }
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            Proficiency ({formData.level}%)
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.level}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    level: parseInt(e.target.value),
                                })
                            }
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
                    {groups.map((group: any) => (
                        <div key={group.category} className="space-y-4">
                            <h4 className="text-blue-400 font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-2">
                                {group.category}
                            </h4>
                            <div className="space-y-2">
                                {group.skills.map((s: any) => (
                                    <AdminListCard
                                        key={s._id}
                                        image={
                                            <div className="w-full h-full flex items-center justify-center bg-slate-800">
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
                                                onDelete={() => remove(s._id)}
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
