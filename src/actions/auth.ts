"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { LoginInput, loginSchema } from "@/schema/Login";

export async function loginAction(data: LoginInput) {
    const result = loginSchema.safeParse(data);
    if (!result.success) return { error: "Format Invalid" };

    const { password } = result.data;

    if (password === process.env.ADMIN_PASSWORD) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_32_chars_at_least");
        
        const token = await new SignJWT({ role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(secret);

        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7200, 
        });

        return { success: true };
    }

    return { error: "Invalid Access Token" };
}