"use client";

import { AdminListCard } from "@/component/AdminListCard";
import { AdminSection } from "@/component/AdminSection";
import { FormActions } from "@/component/FormActions";
import { InputField, ProjectImageUpload } from "@/component/FormElements";
import { ListActions } from "@/component/ListActions";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useAdminData } from "../hook/useAdminData";

export default function ExperienceAdminForm() {
    const {
        data: exps,
        loading,
        upsert,
        uploadImage,
        remove,
    } = useAdminData("/api/experiences");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        fromDate: "",
        toDate: "",
        isCurrent: false,
        shortDesc: "",
        bgImage: "",
    });

    const formatToMonth = (dateStr: string) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return `${d.getFullYear()}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
    };

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const onEdit = (exp: any) => {
        setEditingId(exp._id);
        setImagePreview(exp.bgImage || null);
        setFormData({
            ...exp,
            fromDate: formatToMonth(exp.fromDate),
            toDate: formatToMonth(exp.toDate),
        });
    };

    const onReset = () => {
        setEditingId(null);
        setSelectedFile(null);
        setImagePreview(null);
        setFormData({
            title: "",
            company: "",
            location: "",
            fromDate: "",
            toDate: "",
            isCurrent: false,
            shortDesc: "",
            bgImage: "",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let finalImageUrl = formData.bgImage;

        if (selectedFile) {
            finalImageUrl = await uploadImage(selectedFile, "experience");
        }

        const success = await upsert(
            { ...formData, bgImage: finalImageUrl },
            editingId
        );
        if (success) onReset();
    };

    return (
        <AdminSection
            title={editingId ? "Edit Experience" : "Add New Experience"}
            form={
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="md:col-span-2">
                        <ProjectImageUpload
                            preview={imagePreview}
                            onFileChange={handleFileChange}
                        />
                    </div>

                    <InputField
                        label="Job Title"
                        value={formData.title}
                        onChange={(v: string) =>
                            setFormData({ ...formData, title: v })
                        }
                    />
                    <InputField
                        label="Company Name"
                        value={formData.company}
                        onChange={(v: string) =>
                            setFormData({ ...formData, company: v })
                        }
                    />
                    <InputField
                        label="Location"
                        value={formData.location}
                        onChange={(v: string) =>
                            setFormData({ ...formData, location: v })
                        }
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            From (Month/Year)
                        </label>
                        <input
                            type="month"
                            required
                            value={formData.fromDate}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    fromDate: e.target.value,
                                })
                            }
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
                        />
                    </div>

                    {!formData.isCurrent && (
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                                To (Month/Year)
                            </label>
                            <input
                                type="month"
                                value={formData.toDate}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        toDate: e.target.value,
                                    })
                                }
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
                            />
                        </div>
                    )}

                    <div className="md:col-span-2 flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <input
                            type="checkbox"
                            id="isCurrent"
                            checked={formData.isCurrent}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    isCurrent: e.target.checked,
                                })
                            }
                            className="w-4 h-4 accent-blue-600 cursor-pointer"
                        />
                        <label
                            htmlFor="isCurrent"
                            className="text-sm text-slate-300 cursor-pointer"
                        >
                            I currently work here
                        </label>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            Short Description
                        </label>
                        <textarea
                            value={formData.shortDesc}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    shortDesc: e.target.value,
                                })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-32 outline-none focus:border-blue-500 text-white resize-none"
                            placeholder="Key responsibilities..."
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
                <div className="grid gap-4">
                    {exps.map((exp) => (
                        <AdminListCard
                            key={exp._id}
                            image={
                                <img
                                    src={
                                        exp.bgImage || "/image/placeholder.png"
                                    }
                                    className="w-full h-full object-cover"
                                />
                            }
                            title={`${exp.title} @ ${exp.company}`}
                            subtitle={
                                <span className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={10} /> {exp.location}
                                    </span>
                                    <span className="font-mono text-blue-400/80">
                                        {formatToMonth(exp.fromDate)} —{" "}
                                        {exp.isCurrent
                                            ? "PRESENT"
                                            : formatToMonth(exp.toDate)}
                                    </span>
                                </span>
                            }
                            actions={
                                <ListActions
                                    onEdit={() => onEdit(exp)}
                                    onDelete={() => remove(exp._id)}
                                />
                            }
                        />
                    ))}
                </div>
            }
        />
    );
}
