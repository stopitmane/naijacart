# 🛒 NaijaCart — Nigerian E-Commerce Platform

A full-stack Nigerian e-commerce platform built with **React + Node.js/Express**.

---

## 🗂️ Project Structure
```
naijacart/
├── backend/        → Node.js/Express REST API
└── frontend/       → React + Vite SPA
```

---

## 🚀 Local Development

### 1. Backend
```bash
cd backend
cp .env.example .env        # fill in your values
npm install
npm run dev                  # runs on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env         # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                  # runs on http://localhost:5173
```

---

## ☁️ Deployment

### Backend → Render.com (Free)
1. Push the `backend/` folder to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variables:
   - `JWT_SECRET` → any long random string
   - `FRONTEND_URL` → your Vercel frontend URL
   - `NODE_ENV` → `production`
6. Click **Deploy** → copy your Render URL (e.g. `https://naijacart-api.onrender.com`)

### Frontend → Vercel (Free)
1. Push the `frontend/` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add environment variable:
   - `VITE_API_URL` → `https://your-render-url.onrender.com/api`
4. Click **Deploy** 🎉

---

## ✨ Features
- 🔐 JWT Authentication (register/login)
- 🛒 Shopping cart (persisted in localStorage)
- 🔍 Search, filter by category, sort by price/rating
- 📦 Order placement & order history
- 🚚 Free delivery threshold (₦50,000+)
- 💳 Pay on Delivery / Bank Transfer / Paystack options
- 🇳🇬 14 Nigerian products across 5 categories
- 📱 Fully responsive

## 🛠️ Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router, Axios, Vite |
| Backend | Node.js, Express.js |
| Auth | JWT + bcryptjs |
| Styling | Custom CSS (no framework) |
| Deploy | Vercel (frontend) + Render (backend) |

---

Built by **Ajayi Taiwo John** — [github.com/stopitmane](https://github.com/stopitmane)
