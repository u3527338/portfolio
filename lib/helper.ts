import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function verifyAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) throw new Error("UNAUTHORIZED_ACCESS");

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
    } catch (err) {
        throw new Error("INVALID_TOKEN");
    }
}
