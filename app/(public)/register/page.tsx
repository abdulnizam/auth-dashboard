'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const res = await fetch('http://localhost:8080/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Registration failed');
    } else {
      setMessage('Registration successful. Check your email for verification link.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-full max-w-md space-y-4">
      <h1 className="text-xl font-bold">Register</h1>
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
      {message && <p className="text-green-600 text-sm">{message}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">Register</button>
      <p className="text-sm text-center">
        Already have an account? <a href="/login" className="text-blue-600">Login</a>
      </p>
    </form>
  );
}