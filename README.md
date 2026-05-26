# Task Manager Frontend

Frontend application for the Task Manager platform built with Next.js, TypeScript and TailwindCSS.

## 🚀 Live Demo

Frontend:
https://task-manager-frontend-eight-lime.vercel.app

Backend API:
https://task-manager-api-o1ko.onrender.com

Swagger Docs:
https://task-manager-api-o1ko.onrender.com/api-docs

---

# ✨ Features

- JWT Authentication
- Protected Routes
- Task CRUD
- Loading States
- Error Handling
- Responsive UI
- API Integration

---

# 🛠️ Tech Stack

- Next.js
- TypeScript
- TailwindCSS
- Axios
- Vercel

---

# 📂 Project Structure

src/
│
├── app/
├── components/
├── hooks/
├── services/
├── utils/
└── types/

---

# 🔐 Authentication

Authentication is handled using JWT tokens.

After login:
- token is stored in localStorage
- protected routes are enabled
- authenticated requests automatically include Bearer token

---

# ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://task-manager-api-o1ko.onrender.com
```

---

# 📦 Installation

Clone repository:

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

# 🌐 Deployment

Frontend deployed on Vercel.

Backend deployed on Render.

Database hosted on Supabase PostgreSQL.

---

# 📄 License

MIT
