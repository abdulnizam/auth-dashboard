// File: app/(dashboard)/layout.tsx
'use client'

import { Navbar } from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </>
  );
}