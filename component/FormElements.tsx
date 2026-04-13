"use client";

import React, { forwardRef } from "react";
import { ImagePlus, X, ChevronDown } from "lucide-react";

/**
 * InputField: 支援文字、月份、數字等輸入
 * 使用 forwardRef 確保 React Hook Form 可以控制 input 狀態
 */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white transition-all"
        />
        {error && <span className="text-red-500 text-[10px] font-medium">{error}</span>}
      </div>
    );
  }
);
InputField.displayName = "InputField";

/**
 * SelectField: 下拉選單組件
 * 支援物件數組 [{label, value}] 或純字串數組
 */
interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: (string | { label: string; value: any })[];
  error?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-white appearance-none cursor-pointer"
        >
          {options.map((opt, index) => {
            const isObject = typeof opt === "object" && opt !== null;
            const displayLabel = isObject ? opt.label : opt;
            const val = isObject ? opt.value : opt;

            return (
              <option key={index} value={val} className="bg-slate-900">
                {displayLabel}
              </option>
            );
          })}
        </select>
        {/* 自定義下拉箭頭 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDown size={16} />
        </div>
      </div>
      {error && <span className="text-red-500 text-[10px] font-medium">{error}</span>}
    </div>
  )
);
SelectField.displayName = "SelectField";

/**
 * ProjectImageUpload: 圖片上傳預覽組件
 * 這是一個受控組件，不直接使用 register，而是透過 onFileChange 回傳 File
 */
interface ImageUploadProps {
  preview: string | null;
  onFileChange: (f: File | null) => void;
}

export const ProjectImageUpload = ({
  preview,
  onFileChange,
}: ImageUploadProps) => (
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
          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg"
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
