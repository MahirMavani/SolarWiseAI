# SolarWise AI — Netlify Deployment Guide

This guide walks you through deploying **SolarWise AI** to [Netlify](https://www.netlify.com/) with full-stack capability (Static Frontend + Netlify Serverless Functions for Gemini AI and ML Predictions).

---

## Architecture on Netlify

```
┌────────────────────────────────────────────────────────┐
│                   Netlify CDN (Edge)                   │
│   Serves index.html, style.css, script.js, /assets/    │
└──────────────────────────┬─────────────────────────────┘
                           │ Requests to /api/*
                           ▼
┌────────────────────────────────────────────────────────┐
│               Netlify Serverless Function              │
│                 netlify/functions/api.js               │
│                                                        │
│  ├── /api/ask                 (Google Gemini AI Engine)│
│  ├── /api/advisor             (Structured AI Dossier)  │
│  ├── /api/ml/predict-generation (Embedded ML R²=0.9863)│
│  ├── /api/subsidies           (36 States/UTs Dataset)  │
│  └── /api/health              (System Health Check)    │
└────────────────────────────────────────────────────────┘
```

---

## Deployment Option 1: Git + Netlify Web UI (Recommended)

This is the standard and easiest way to deploy with automatic continuous deployment on every Git push.

### Step 1: Initialize Git and Push to GitHub / GitLab
Open PowerShell or your terminal in `SolarWise_AI_v2`:

```powershell
# 1. Initialize Git repository
git init

# 2. Stage all files (sensitive .env is already protected by .gitignore)
git add .

# 3. Create your initial commit
git commit -m "feat: complete SolarWise AI with Netlify serverless deployment support"

# 4. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/SolarWise_AI.git
git branch -M main
git push -u origin main
```

### Step 2: Import into Netlify
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **"Add new site"** → **"Import an existing project"**.
3. Choose **GitHub** and select your repository.
4. Netlify will automatically detect `netlify.toml` with the following settings:
   - **Base directory**: *(leave blank / root)*
   - **Build command**: *(leave blank)*
   - **Publish directory**: `.`
   - **Functions directory**: `netlify/functions`
5. Click **Deploy Site**.

### Step 3: Configure Environment Variables in Netlify
To enable Google Gemini AI in the cloud:
1. In your Netlify dashboard, navigate to **Site configuration** → **Environment variables**.
2. Click **"Add a variable"** and add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `Your_Google_Gemini_API_Key`
   - *(Optional)* **Key**: `GEMINI_MODEL`, **Value**: `gemini-3.5-flash`
   - *(Optional)* **Key**: `XAI_API_KEY`, **Value**: `Your_xAI_Grok_API_Key` (if using Grok fallback)
3. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**.

---

## Deployment Option 2: Netlify CLI (Direct Terminal Deploy)

If you prefer to deploy directly from your local terminal without Git:

### Step 1: Install Netlify CLI
```powershell
npm install -g netlify-cli
```

### Step 2: Log In & Deploy
```powershell
# Authenticate with Netlify
netlify login

# Initialize and link site
netlify init

# Deploy directly to production
netlify deploy --prod
```

### Step 3: Set Environment Variables via CLI
```powershell
netlify env:set GEMINI_API_KEY "your_gemini_api_key_here"
netlify env:set GEMINI_MODEL "gemini-3.5-flash"
```

---

## Verification Checklist

Once deployed, verify that all features work:
1. **Frontend**: Open `https://your-site.netlify.app/` — verify that 3D visuals, hero environment, and tabs load smoothly.
2. **Health Check**: Open `https://your-site.netlify.app/api/health` — should return:
   ```json
   {
     "status": "healthy",
     "geminiConfigured": true,
     "geminiModel": "gemini-3.5-flash"
   }
   ```
3. **Subsidy Directory**: Open `https://your-site.netlify.app/api/subsidies` — returns all 36 Indian states and UTs subsidy calculations.
4. **ML Solar Predictor**: Run a solar calculation in the calculator — generations are computed instantly via the embedded ML model.
5. **AI Advisor**: Ask SolarWise AI a question (e.g., *"What is the PM Surya Ghar subsidy in Maharashtra?"*) — receives structured, live intelligence from Gemini.

---

## Local Development (Unchanged)
You can continue running SolarWise AI locally at any time:
```powershell
npm start
# Server boots at http://localhost:3000
```
