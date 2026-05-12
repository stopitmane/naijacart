# 🔧 Vercel Deployment Fix for NaijaCart

## The Problem
Vercel is having trouble with the nested folder structure (`naijacart/frontend/`).

## 🚀 Solution Options

### Option 1: Deploy with Root Directory Setting (Recommended)

1. **Go to Vercel Dashboard**
   - Import your GitHub repo: `stopitmane/naijacart`
   
2. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `naijacart/frontend` ← This is crucial!
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables** (if needed)
   - Add `VITE_API_URL` with your backend URL

### Option 2: Create Separate Frontend Repository

If Option 1 doesn't work, create a separate repo:

```bash
# Create new repo for frontend only
cd naijacart/frontend
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin https://github.com/stopitmane/naijacart-frontend.git
git push -u origin main
```

Then deploy this new repo to Vercel normally.

## 🔍 Common Issues & Fixes

### Issue: "Build failed"
- Check that `package.json` has correct build script
- Ensure all dependencies are in `dependencies`, not `devDependencies`

### Issue: "404 on refresh"
- The `vercel.json` rewrites should handle this
- Make sure React Router is configured for browser routing

### Issue: "API calls failing"
- Update API URLs to use absolute URLs (not relative)
- Set CORS properly on backend

## 📝 Updated Files
- ✅ Updated `vercel.json` with proper build config
- ✅ Added `.vercelignore` file
- ✅ Verified `package.json` scripts

## 🎯 Next Steps
1. Try Option 1 first (set Root Directory in Vercel)
2. If that fails, use Option 2 (separate repo)
3. Update backend CORS settings with your Vercel URL