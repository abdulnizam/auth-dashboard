export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-2xl mx-auto p-4">{children}</main>
  );
}