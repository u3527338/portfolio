import { ImagePlus, X, ChevronDown } from "lucide-react";

export const InputField = ({ label, value, onChange }: any) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            {label}
        </label>
        <input
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-white"
        />
    </div>
);

export const SelectField = ({ label, value, options, onChange }: any) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            {label}
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-white appearance-none cursor-pointer"
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt} className="bg-slate-900">
                        {opt}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
        </div>
    </div>
);

export const ProjectImageUpload = ({
    preview,
    onFileChange,
}: {
    preview: string | null;
    onFileChange: (f: File | null) => void;
}) => (
    <div className="relative group h-48 w-full bg-white/5 border-2 border-dashed border-white/10 rounded-2xl overflow-hidden flex items-center justify-center hover:border-blue-500/50 transition-all">
        {preview ? (
            <>
                <img
                    src={preview}
                    className="w-full h-full object-cover opacity-60"
                    alt="Preview"
                />
                <button
                    type="button"
                    onClick={() => onFileChange(null)}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                >
                    <X size={16} />
                </button>
            </>
        ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
                <ImagePlus size={32} />
                <span className="text-xs">Click to select project image</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>
        )}
    </div>
);
