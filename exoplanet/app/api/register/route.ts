import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
const file = path.join(process.cwd(), "users.json");
export async function POST(req: Request) {
const { email, password } = await req.json();
if (!email || !password || password.length < 6) {
return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
}
const raw = await fs.readFile(file, "utf8").catch(() => "[]");
const users = JSON.parse(raw);
if (users.find((u: any) => u.email === email)) {
return NextResponse.json({ success: false, error: "User exists" }, { status: 409 });
}
users.push({ email, password });
await fs.writeFile(file, JSON.stringify(users, null, 2), "utf8");
const res = NextResponse.json({ success: true, redirect: "/dashboard" });
res.cookies.set("token", "demo-session", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 });
return res;
}