'use client';

import { useState } from 'react';

interface CreateUserFormProps {
  onUserCreated?: () => void;
}

export default function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'admin' | 'standard'>('standard');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const res = await fetch('http://localhost:8080/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, type: userType }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ User created and verification email sent.');
      setEmail('');
      setPassword('');
      setUserType('standard');
      onUserCreated?.(); // refresh user list
    } else {
      setMessage(`❌ ${data.message || data.error}`);
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-white p-4 border rounded shadow">
      <h2 className="text-xl font-bold">Create User</h2>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value as 'admin' | 'standard')}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="standard">Standard</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {submitting ? 'Creating...' : 'Create and Send Link'}
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}