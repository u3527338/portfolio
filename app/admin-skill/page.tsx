"use client";

import { InputField, SelectField } from "@/component/FormElements";
import { Edit3, Trash2, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
// 引入常用的 Icon 庫
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

// 內部用的動態 Icon 預覽組件
const IconPreview = ({ iconName }: { iconName: string }) => {
    if (!iconName) return <HelpCircle size={20} className="text-slate-600" />;
    
    const getIcon = (name: string) => {
        if (name.startsWith("Si")) return (SiIcons as any)[name];
        if (name.startsWith("Fa")) return (FaIcons as any)[name];
        if (name.startsWith("Ai")) return (AiIcons as any)[name];
        return null;
    };

    const IconComponent = getIcon(iconName);
    return IconComponent ? <IconComponent size={20} /> : <HelpCircle size={20} className="text-slate-600" />;
};

export default function SkillAdminForm() {
    const [groups, setGroups] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        iconName: "",
        category: "Frontend Mastery",
        level: 90,
    });

    const fetchSkills = async () => {
        const res = await fetch("/api/skills");
        const data = await res.json();
        setGroups(data);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const method = editingId ? "PUT" : "POST";
        const url = editingId ? `/api/skills/${editingId}` : "/api/skills";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        setEditingId(null);
        setFormData({
            name: "",
            iconName: "",
            category: "Frontend Mastery",
            level: 90,
        });
        fetchSkills();
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete skill?")) return;
        await fetch(`/api/skills/${id}`, { method: "DELETE" });
        fetchSkills();
    };

    return (
        <div className="space-y-12">
            <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/10">
                <h2 className="text-2xl font-bold mb-6">
                    {editingId ? "Edit Skill" : "Add Skill"}
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <InputField
                        label="Skill Name"
                        value={formData.name}
                        onChange={(v: any) =>
                            setFormData({ ...formData, name: v })
                        }
                    />
                    
                    {/* Icon Name with Preview */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            Icon Name (React Icons)
                        </label>
                        <div className="relative flex items-center">
                            <input
                                required
                                placeholder="e.g. SiNextdotjs"
                                value={formData.iconName}
                                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 outline-none focus:border-blue-500 transition-all text-white"
                            />
                            <div className="absolute left-4 text-blue-400">
                                <IconPreview iconName={formData.iconName} />
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500 italic">
                            Prefix Si, Fa, or Ai (e.g., SiReact)
                        </p>
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
                        onChange={(v: any) =>
                            setFormData({ ...formData, category: v })
                        }
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-slate-400">
                            Level ({formData.level}%)
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
                            className="h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-colors shadow-lg"
                    >
                        {loading ? "Saving..." : "Save Skill"}
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.map((group) => (
                    <div
                        key={group.category}
                        className="bg-slate-900/50 p-6 rounded-[24px] border border-white/5"
                    >
                        <h3 className="text-blue-400 font-mono text-sm mb-4">
                            {group.category}
                        </h3>
                        <div className="space-y-3">
                            {group.skills.map((s: any) => (
                                <div
                                    key={s._id}
                                    className="flex justify-between items-center bg-white/5 p-3 rounded-xl group border border-transparent hover:border-white/10 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-slate-400">
                                            <IconPreview iconName={s.iconName} />
                                        </div>
                                        <span className="font-medium">
                                            {s.name}{" "}
                                            <span className="text-slate-500 text-xs font-normal">
                                                ({s.level}%)
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {
                                                setEditingId(s._id);
                                                setFormData({
                                                    name: s.name,
                                                    iconName: s.iconName,
                                                    category: s.category,
                                                    level: s.level
                                                });
                                            }}
                                            className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-colors"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
