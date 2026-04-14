"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { AdminListCard } from "@/component/AdminListCard";
import { AdminSection } from "@/component/AdminSection";
import { FormActions } from "@/component/FormActions";
import { InputField, ProjectImageUpload } from "@/component/FormElements";
import { ListActions } from "@/component/ListActions";
import { useAdminData } from "../hook/useAdminData";

const experienceSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    abbrev: z.string().min(1, "Company abbreviation is required"),
    location: z.string().min(1, "Location is required"),
    fromDate: z.string().min(1, "Start date is required"),
    toDate: z.string(),
    isCurrent: z.boolean().default(false),
    shortDesc: z.string(),
    bgImage: z.string(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

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

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema) as any,
        defaultValues: {
            title: "",
            company: "",
            abbrev: "",
            location: "",
            fromDate: "",
            toDate: "",
            isCurrent: false,
            shortDesc: "",
            bgImage: "",
        },
    });

    const isCurrent = watch("isCurrent");

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
        reset({
            title: exp.title || "",
            company: exp.company || "",
            abbrev: exp.abbrev || "",
            location: exp.location || "",
            fromDate: formatToMonth(exp.fromDate),
            toDate: formatToMonth(exp.toDate),
            isCurrent: exp.isCurrent || false,
            shortDesc: exp.shortDesc || "",
            bgImage: exp.bgImage || "",
        });
    };

    const onReset = () => {
        setEditingId(null);
        setSelectedFile(null);
        setImagePreview(null);
        reset();
    };

    const onSubmit: SubmitHandler<ExperienceFormValues> = async (data) => {
        let finalImageUrl = data.bgImage;
        if (selectedFile) {
            finalImageUrl = await uploadImage(selectedFile, "experience");
        }
        if (await upsert({ ...data, bgImage: finalImageUrl }, editingId)) {
            onReset();
        }
    };

    return (
        <AdminSection
            title={editingId ? "Edit Experience" : "Add New Experience"}
            form={
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="md:col-span-2">
                        <ProjectImageUpload
                            preview={imagePreview}
                            onFileChange={handleFileChange}
                        />
                    </div>

                    <InputField
                        label="Company Name"
                        {...register("company")}
                        error={errors.company?.message}
                    />
                    <InputField
                        label="Company Abbreviation"
                        {...register("abbrev")}
                        error={errors.abbrev?.message}
                    />
                    <InputField
                        label="Job Title"
                        {...register("title")}
                        error={errors.title?.message}
                    />
                    <InputField
                        label="Location"
                        {...register("location")}
                        error={errors.location?.message}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                            From (Month/Year)
                        </label>
                        <input
                            type="month"
                            {...register("fromDate")}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
                        />
                        {errors.fromDate && (
                            <span className="text-red-500 text-[10px]">
                                {errors.fromDate.message}
                            </span>
                        )}
                    </div>

                    {!isCurrent && (
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                                To (Month/Year)
                            </label>
                            <input
                                type="month"
                                {...register("toDate")}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
                            />
                        </div>
                    )}

                    <div className="md:col-span-2 flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <input
                            type="checkbox"
                            id="isCurrent"
                            {...register("isCurrent")}
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
                            {...register("shortDesc")}
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
                    {exps.map((exp: any) => (
                        <AdminListCard
                            key={exp._id}
                            image={
                                <img
                                    src={exp.bgImage}
                                    className="w-full h-full object-cover"
                                    alt="bg"
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
