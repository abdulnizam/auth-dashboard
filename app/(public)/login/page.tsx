'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        router.push('/');
    } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-full max-w-md space-y-4">
      <h1 className="text-xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border px-3 py-2"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
      <p className="text-sm text-center">
        Don&apos;t have an account? <a href="/register" className="text-blue-600">Register</a>
      </p>
    </form>
  );
}