'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <h1 className="text-lg font-bold">Auth Dashboard</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/users">Users</Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}