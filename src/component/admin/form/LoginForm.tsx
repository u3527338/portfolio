"use client";

import { LoginInput, loginSchema } from "@/schema/Login";
import { loginAction } from "@/src/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setServerError("");
        
        const result = await loginAction(data);

        if (result?.success) {
            onLoginSuccess();
        } else {
            setServerError(result?.error || "Something went wrong.");
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 shadow-2xl"
            >
                <div className="flex flex-col items-center mb-8 space-y-2">
                    <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-2">
                        <ShieldCheck size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-white text-center">
                        Identity Verification
                    </h2>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        Admin Authorization Required
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <Lock
                                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                                    errors.password ? "text-red-500" : "text-slate-600"
                                }`}
                                size={18}
                            />
                            <input
                                {...register("password")}
                                type="password"
                                placeholder="Access Token"
                                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/50 border outline-none text-white transition-all placeholder:text-slate-700 ${
                                    errors.password
                                        ? "border-red-500/50 focus:border-red-500"
                                        : "border-white/5 focus:border-blue-500/50"
                                }`}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-[10px] font-mono ml-2 uppercase">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {serverError && (
                        <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-[10px] font-mono text-center uppercase tracking-wider bg-red-400/10 py-3 rounded-xl border border-red-400/20"
                        >
                            {serverError}
                        </motion.p>
                    )}

                    <button
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl font-bold transition-all group"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <>
                                Verify
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}