'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '@/lib/api';
import { UserTable } from '@/components/UserTable';
import CreateUserForm from '@/components/CreateUserForm';

interface User {
  id: number;
  email: string;
  is_verified: boolean;
  is_active: boolean;
  user_type: string;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [refreshTrigger]);

  const handleUserCreated = () => {
    setRefreshTrigger((prev) => prev + 1); // triggers user list reload
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Users</h1>

      <CreateUserForm onUserCreated={handleUserCreated} />

      {loading ? <p>Loading users...</p> : <UserTable users={users} />}
    </div>
  );
}