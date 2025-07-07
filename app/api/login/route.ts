// pages/api/login.ts (or app/api/login/route.ts if using App Router)
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.message }, { status: res.status });
  }

  const response = NextResponse.json({ success: true });
  response.headers.set(
    'Set-Cookie',
    serialize('token', data.token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })
  );

  return response;
}