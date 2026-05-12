# NaijaCart Deployment Guide

## ✅ Completed Steps
- [x] Git repository initialized
- [x] Code pushed to GitHub: https://github.com/stopitmane/naijacart.git
- [x] Deployment configurations ready

## 🚀 Deploy Backend to Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `stopitmane/naijacart`
   - Configure the service:
     - **Name**: `naijacart-backend`
     - **Root Directory**: `naijacart/backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`

3. **Environment Variables** (Render will auto-detect from render.yaml):
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: (auto-generated)
   - `FRONTEND_URL`: (update after frontend deployment)

## 🌐 Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import `stopitmane/naijacart` repository
   - Configure the project:
     - **Framework Preset**: `Vite`
     - **Root Directory**: `naijacart/frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Environment Variables**
   - Add your backend API URL after Render deployment

## 🔧 Post-Deployment Steps

1. **Update Backend Environment**
   - Copy your Vercel frontend URL
   - Update `FRONTEND_URL` in Render dashboard
   - Redeploy backend service

2. **Update Frontend API URL**
   - Copy your Render backend URL
   - Update API endpoints in frontend code if needed

## 📝 Important Notes

- Backend will be available at: `https://naijacart-backend.onrender.com`
- Frontend will be available at: `https://naijacart-[random].vercel.app`
- Both services will auto-deploy on git pushes to main branch
- Free tier limitations: Render spins down after 15 minutes of inactivity

## 🔍 Troubleshooting

- Check build logs in respective dashboards
- Ensure environment variables are set correctly
- Verify CORS settings match your frontend URL