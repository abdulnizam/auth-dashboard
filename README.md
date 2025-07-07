# Auth Dashboard - Next.js (Frontend)

This is a Next.js + React admin dashboard for managing users of the Toggo App Auth Service. Admins can:

- View registered users
- Create users and send verification email
- Edit users (set active/inactive, change role between admin and standard)
- View email verification status

---

## 🛠 Tech Stack

- **Next.js App Router**
- **React 19**
- **Tailwind CSS**
- **Lucide React** (icons)
- **Cookie-based JWT auth**
- **Fetch API** to Go backend

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-org/auth-dashboard.git
cd auth-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

This should point to your Go backend service.

---

## 🚀 Running Locally

```bash
npm run dev
```

Runs on [http://localhost:3001](http://localhost:3001)

Make sure your Go backend is running on `http://localhost:8080`.

---

## 🔐 Auth & Routing

- Protected routes: `/`, `/users`
- Public routes: `/login`, `/register`, `/verify`

Middleware checks for a valid `token` cookie. If absent, users are redirected to `/login`.

---

## 🧪 Features

### ✅ Login
- JWT stored in HTTP-only cookie.

### ✅ Dashboard
- Lists all users with:
  - Email
  - Verification status
  - Activation status
  - Role (Admin / Standard)

### ✅ Create User
- Admins can create new users and send verification email.

### ✅ Edit User
- Toggle active status
- Change user type (admin or standard)

### ✅ Verify User
- `/verify?token=...&email=...` handles verification without needing to enter a code.

---

## 📝 File Structure

```
app/
  ├── layout.tsx
  ├── page.tsx             # Home (Dashboard)
  ├── users/
  │   └── page.tsx         # Users listing
  ├── login/
  │   └── page.tsx
  ├── register/
  │   └── page.tsx
  ├── verify/
  │   ├── page.tsx
  │   └── layout.tsx       # Public layout (no navbar)
components/
  ├── Navbar.tsx
  ├── UserTable.tsx
  └── CreateUserForm.tsx
lib/
  └── api.ts               # Fetch helpers
middleware.ts              # JWT auth check
```

---

## 🧼 Useful Scripts

```bash
npm run build    # Build the app
npm run lint     # Lint code
```

---

## 🛡️ Environment

Ensure CORS is allowed from `http://localhost:3001` in your Go server.

In production, you can reverse proxy or set environment domains securely.

---

## 🤝 Credits

Built with ❤️ using Next.js, Go, and Mailjet.
