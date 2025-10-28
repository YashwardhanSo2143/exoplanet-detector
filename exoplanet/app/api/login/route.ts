import { NextResponse } from "next/server";
export async function POST(req: Request) {
const { email, password } = await req.json();
// Demo check; replace with real validation later
const ok = typeof email === "string" && typeof password === "string" && password.length >= 6;
if (!ok) return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
const res = NextResponse.json({ success: true, redirect: "/dashboard" });
// Set a demo session cookie
res.cookies.set("token", "demo-session", {
httpOnly: true,
sameSite: "lax",
path: "/",
maxAge: 60 * 60 * 24,
});
return res;
}