'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react'; // using lucide-react for the pencil icon

interface User {
  id: number;
  email: string;
  is_verified: boolean;
  is_active: boolean;
  user_type: string;
  created_at: string;
}

interface Props {
  users: User[];
}

export function UserTable({ users: initialUsers }: Props) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);

  const handleUpdate = async (user: User) => {
    setSaving(user.id);

    const res = await fetch(`http://localhost:8080/admin/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        is_active: user.is_active,
        user_type: user.user_type,
      }),
    });

    if (!res.ok) {
      alert('Failed to update user');
    }

    setSaving(null);
    setEditingId(null); // exit editing mode
  };

  const updateUserField = (id: number, field: keyof User, value: unknown) => {
    setUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, [field]: value } : user))
    );
  };

  return (
    <table className="w-full text-left border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Email</th>
          <th className="border p-2">Verified</th>
          <th className="border p-2">Active</th>
          <th className="border p-2">User Type</th>
          <th className="border p-2">Created At</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          const isEditing = editingId === user.id;

          return (
            <tr key={user.id}>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.is_verified ? '✅' : '❌'}</td>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={user.is_active}
                  disabled={!isEditing}
                  onChange={e =>
                    updateUserField(user.id, 'is_active', e.target.checked)
                  }
                />
              </td>
              <td className="border p-2">
                <select
                  disabled={!isEditing}
                  value={user.user_type}
                  onChange={e =>
                    updateUserField(user.id, 'user_type', e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="standard">Standard</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="border p-2">
                {new Date(user.created_at).toLocaleString()}
              </td>
              <td className="border p-2 flex gap-2 items-center">
                {isEditing ? (
                  <button
                    onClick={() => handleUpdate(user)}
                    disabled={saving === user.id}
                    className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    {saving === user.id ? 'Saving...' : 'Save'}
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingId(user.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}