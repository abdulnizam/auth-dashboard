import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });

  res.headers.set(
    'Set-Cookie',
    serialize('token', '', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    })
  );

  return res;
}