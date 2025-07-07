// File: lib/api.ts

export async function fetchUsers() {
  const res = await fetch("http://localhost:8080/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}