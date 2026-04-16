"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { AdminListCard } from "@/src/component/admin/AdminListCard";
import { AdminSection } from "@/src/component/admin/AdminSection";
import { FormActions } from "@/src/component/admin/FormActions";
import {
    InputField,
    ProjectImageUpload,
} from "@/src/component/admin/FormElements";
import { ListActions } from "@/src/component/admin/ListActions";
import { officeFallbackImage } from "@/lib/constant";
import { useExperiences } from "@/src/hook/useExperiences";

const experienceSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    abbrev: z.string().min(1, "Abbrev required").max(15),
    location: z.string().min(1, "Location is required"),
    fromDate: z.string().min(1, "Start date required"),
    toDate: z.string(),
    isCurrent: z.boolean(),
    shortDesc: z.string(),
    bgImage: z.string(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function ExperienceAdminForm({
    initialData,
}: {
    initialData?: any[];
}) {
    const { exps, isLoading, isPending, upsert, remove } =
        useExperiences(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const defaultValues: ExperienceFormValues = {
        title: "",
        company: "",
        abbrev: "",
        location: "",
        fromDate: "",
        toDate: "",
        isCurrent: false,
        shortDesc: "",
        bgImage: officeFallbackImage,
    };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
        defaultValues,
    });

    const isCurrent = watch("isCurrent");

    const formatToMonth = (dateStr: any) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? "" : d.toISOString().substring(0, 7);
    };

    const onSubmit: SubmitHandler<ExperienceFormValues> = async (data) => {
        const result = await upsert({
            data: { ...data, _id: editingId },
            file: selectedFile,
        });
        if (result.success) onReset();
    };

    const onEdit = (exp: any) => {
        setEditingId(exp._id);
        setImagePreview(exp.bgImage || null);
        reset({
            ...exp,
            fromDate: formatToMonth(exp.fromDate),
            toDate: exp.isCurrent ? "" : formatToMonth(exp.toDate),
            isCurrent: !!exp.isCurrent,
            shortDesc: exp.shortDesc || "",
        });
    };

    const onReset = () => {
        setEditingId(null);
        setSelectedFile(null);
        setImagePreview(null);
        reset(defaultValues);
    };

    return (
        <AdminSection
            title={editingId ? "Edit Experience" : "Add Experience"}
            form={
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="md:col-span-2">
                        <ProjectImageUpload
                            preview={imagePreview}
                            onFileChange={(file) => {
                                setSelectedFile(file);
                                if (file)
                                    setImagePreview(URL.createObjectURL(file));
                            }}
                        />
                    </div>

                    <InputField
                        label="Company"
                        {...register("company")}
                        error={errors.company?.message}
                    />
                    <InputField
                        label="Job Title"
                        {...register("title")}
                        error={errors.title?.message}
                    />
                    <InputField
                        label="Abbrev"
                        {...register("abbrev")}
                        error={errors.abbrev?.message}
                    />
                    <InputField
                        label="Location"
                        {...register("location")}
                        error={errors.location?.message}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase">
                            From
                        </label>
                        <input
                            type="month"
                            {...register("fromDate")}
                            className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    {!isCurrent && (
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-mono text-slate-500 uppercase">
                                To
                            </label>
                            <input
                                type="month"
                                {...register("toDate")}
                                className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500"
                            />
                        </div>
                    )}

                    <div className="md:col-span-2 flex items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                        <input
                            type="checkbox"
                            id="isCurrent"
                            {...register("isCurrent")}
                            className="accent-blue-500"
                        />
                        <label
                            htmlFor="isCurrent"
                            className="text-xs text-slate-400"
                        >
                            Current Job
                        </label>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase">
                            Description
                        </label>
                        <textarea
                            {...register("shortDesc")}
                            className="bg-white/5 border border-white/10 rounded-xl p-3 text-white h-32 resize-none"
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
                <div className="grid gap-4">
                    {isLoading ? (
                        <Loader2 className="animate-spin mx-auto text-blue-500" />
                    ) : (
                        exps.map((exp: any) => (
                            <AdminListCard
                                key={exp._id}
                                image={
                                    <img
                                        src={exp.bgImage || officeFallbackImage}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                }
                                title={exp.company}
                                subtitle={exp.title}
                                actions={
                                    <ListActions
                                        onEdit={() => onEdit(exp)}
                                        onDelete={() =>
                                            confirm("Delete?") &&
                                            remove(exp._id)
                                        }
                                    />
                                }
                            />
                        ))
                    )}
                </div>
            }
        />
    );
}
