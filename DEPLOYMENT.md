# Deploying Plast Düsseldorf to Vercel

This guide will walk you through deploying your Next.js application to Vercel.

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket account)
- Vercel account (sign up at https://vercel.com)
- Your Sanity credentials ready

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Plast Düsseldorf website"
```

### 1.2 Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `plast-duesseldorf` (or your preferred name)
3. **Important:** Do NOT initialize with README, .gitignore, or license (your project already has these)

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/plast-duesseldorf.git
git branch -M main
git push -u origin main
```

**Note:** Make sure `.env.local` is NOT pushed to GitHub (it's already in .gitignore)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for first-time users)

1. **Go to Vercel:** Visit https://vercel.com and sign in
2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository `plast-duesseldorf`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `next build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. **Add Environment Variables:** Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=pghav3v6
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=skLPqa1mXrOdljrtLxbuUQcJJOexaUpOgWCTt9jMxnjsQPONMOLaJruv0AXZVoC97YRBS7XFY7XfHDW6zsIrGOKVsJfy4d1mIDJZBxJ6YRT2UqcaEEIuJ7u1bmRPTzkhXIk1eReeoM6iLTuiURGlJgHJQJLSSAfDKQtHXHnhlUVu4YHhn2jT
   RESEND_API_KEY=re_hvPPLR9B_6TnbK8fKT9Rv6A7wVrktHBd9
   NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
   ADMIN_EMAIL=olturua@gmail.com
   ```

   **Important:**
   - Set these for all environments (Production, Preview, Development)
   - You'll update `NEXT_PUBLIC_SITE_URL` after deployment with your actual URL

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a URL like `https://plast-duesseldorf.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

## Step 3: Post-Deployment Configuration

### 3.1 Update Site URL

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Find `NEXT_PUBLIC_SITE_URL` and update it to your actual Vercel URL:
   ```
   NEXT_PUBLIC_SITE_URL=https://plast-duesseldorf.vercel.app
   ```
4. Click "Save"
5. Redeploy your project (Deployments → click ⋯ → Redeploy)

### 3.2 Configure Sanity CORS

To allow your deployed site to access Sanity:

1. Go to https://www.sanity.io/manage
2. Select your project `pghav3v6`
3. Go to "API" → "CORS Origins"
4. Click "Add CORS origin"
5. Add your Vercel URL:
   ```
   https://plast-duesseldorf.vercel.app
   ```
6. Check "Allow credentials"
7. Click "Save"

Also add your Sanity Studio URL if you're hosting it separately:
```
https://plast-duesseldorf.vercel.app/studio
```

### 3.3 Configure Custom Domain (Optional)

1. In Vercel project dashboard, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `plast-duesseldorf.de`)
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_SITE_URL` environment variable with your custom domain

## Step 4: Verify Deployment

Visit your deployed site and check:

- ✅ All pages load correctly (Home, About, Activities, Events, News, Contact)
- ✅ Language switching works (UK, DE, EN)
- ✅ Header and Footer appear on all pages
- ✅ Sanity content loads properly
- ✅ Maps display in Events page
- ✅ Sanity Studio is accessible at `/studio`

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches or pull requests

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | `pghav3v6` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | `production` |
| `SANITY_API_TOKEN` | Sanity API token (keep secret!) | Your token |
| `RESEND_API_KEY` | Resend email API key | Your key |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | `https://yoursite.vercel.app` |
| `ADMIN_EMAIL` | Admin email for notifications | `olturua@gmail.com` |

## Troubleshooting

### Build fails with "Module not found"
- Ensure all dependencies are in `package.json`
- Run `npm install` locally and commit `package-lock.json`

### Environment variables not working
- Make sure variable names match exactly (case-sensitive)
- Redeploy after changing environment variables
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser

### Sanity content not loading
- Verify Sanity CORS origins include your Vercel URL
- Check API token has correct permissions
- Check browser console for CORS errors

### Images not displaying
- Verify Sanity CDN domain is in `next.config.ts` `remotePatterns`
- Check images exist in Sanity

## Useful Commands

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Remove a deployment
vercel remove [deployment-url]

# Link to existing project
vercel link
```

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Sanity CORS Setup: https://www.sanity.io/docs/cors

## Security Notes

⚠️ **Never commit sensitive data:**
- `.env.local` is in `.gitignore` - keep it that way
- Store all secrets in Vercel environment variables
- Rotate API keys if accidentally exposed

🔒 **API Token Security:**
- Sanity tokens in environment variables are only accessible server-side
- Never use API tokens in client-side code
- Use `NEXT_PUBLIC_` prefix only for non-sensitive configuration
