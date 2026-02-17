# Project Setup Guide

Step-by-step instructions to set up the Plast Düsseldorf website development environment.

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18.17 or later ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Code Editor** (VS Code recommended)
- **GitHub Account** (for version control)
- **Sanity Account** (free tier - create at [sanity.io](https://www.sanity.io/))
- **Vercel Account** (free tier - create at [vercel.com](https://vercel.com/))
- **Resend Account** (free tier - create at [resend.com](https://resend.com/))

## Step 1: Create Next.js Project

```bash
# Create new Next.js project with TypeScript
npx create-next-app@latest plast-duesseldorf --typescript --tailwind --app --eslint

# Navigate to project directory
cd plast-duesseldorf
```

When prompted, choose:
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **Yes**
- App Router: **Yes**
- Import alias: **@/***

## Step 2: Install Core Dependencies

```bash
# Install Sanity
npm install @sanity/client @sanity/image-url next-sanity

# Install internationalization
npm install next-intl

# Install form libraries
npm install react-hook-form zod @hookform/resolvers

# Install email service
npm install resend

# Install UI libraries
npm install lucide-react

# Install development dependencies
npm install -D @sanity/eslint-config-studio prettier
```

## Step 3: Set Up Sanity Project

### 3.1 Create Sanity Project

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity in your project
npm create sanity@latest -- --template clean --create-project "Plast Düsseldorf" --dataset production
```

When prompted:
- **Project name:** Plast Düsseldorf
- **Dataset name:** production
- **Schema:** Start from scratch

### 3.2 Set Up Sanity Studio

Create the following directory structure:

```
plast-duesseldorf/
├── src/
│   └── sanity/
│       ├── schemas/
│       │   ├── objects/
│       │   │   └── localizedString.ts
│       │   ├── page.ts
│       │   ├── event.ts
│       │   ├── post.ts
│       │   ├── teamMember.ts
│       │   ├── settings.ts
│       │   ├── formSubmission.ts
│       │   └── index.ts
│       ├── lib/
│       │   ├── client.ts
│       │   └── queries.ts
│       └── sanity.config.ts
```

### 3.3 Configure Sanity

Create `src/sanity/sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'plast-duesseldorf',
  title: 'Plast Düsseldorf CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

Create `src/sanity/lib/client.ts`:

```typescript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true in production
})
```

## Step 4: Configure Internationalization

### 4.1 Create i18n Configuration

Create `src/lib/i18n.ts`:

```typescript
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['uk', 'de', 'en'] as const
export const defaultLocale = 'uk' as const

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

### 4.2 Create Translation Files

Create directory `messages/` with three files:

**messages/uk.json:**
```json
{
  "navigation": {
    "home": "Головна",
    "about": "Про нас",
    "activities": "Діяльність",
    "events": "Події",
    "news": "Новини",
    "contact": "Контакти"
  },
  "common": {
    "learnMore": "Дізнатися більше",
    "register": "Зареєструватися",
    "submit": "Надіслати"
  }
}
```

**messages/de.json:**
```json
{
  "navigation": {
    "home": "Startseite",
    "about": "Über uns",
    "activities": "Aktivitäten",
    "events": "Veranstaltungen",
    "news": "Nachrichten",
    "contact": "Kontakt"
  },
  "common": {
    "learnMore": "Mehr erfahren",
    "register": "Anmelden",
    "submit": "Senden"
  }
}
```

**messages/en.json:**
```json
{
  "navigation": {
    "home": "Home",
    "about": "About Us",
    "activities": "Activities",
    "events": "Events",
    "news": "News",
    "contact": "Contact"
  },
  "common": {
    "learnMore": "Learn More",
    "register": "Register",
    "submit": "Submit"
  }
}
```

### 4.3 Configure Next.js for i18n

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts')

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
}

export default withNextIntl(nextConfig)
```

## Step 5: Set Up Environment Variables

Create `.env.local`:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"

# Resend
RESEND_API_KEY="your-resend-api-key"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_EMAIL="admin@plast-duesseldorf.de"
```

**Important:** Add `.env.local` to `.gitignore` (it should already be there)

## Step 6: Configure Tailwind CSS

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        plast: {
          blue: '#0057B7',
          yellow: '#FFD700',
          green: '#228B22',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

## Step 7: Create Basic File Structure

Create the following directory structure:

```bash
mkdir -p src/app/[locale]/{about,activities,events,news,contact}
mkdir -p src/app/api/{contact,register}
mkdir -p src/components/{layout,events,forms,ui}
mkdir -p src/lib
```

## Step 8: Set Up Git Repository

```bash
# Initialize Git (if not already done)
git init

# Create .gitignore (should already exist)
# Make sure it includes:
# .env.local
# .next
# node_modules

# Initial commit
git add .
git commit -m "Initial project setup"

# Create GitHub repository and push
git remote add origin https://github.com/your-username/plast-duesseldorf.git
git branch -M main
git push -u origin main
```

## Step 9: Deploy to Vercel

### Option 1: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com/)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables (copy from `.env.local`)
5. Deploy

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add SANITY_API_TOKEN
vercel env add RESEND_API_KEY
vercel env add ADMIN_EMAIL
```

## Step 10: Access Sanity Studio

After deployment, access Sanity Studio at:
- **Local:** http://localhost:3000/studio
- **Production:** https://your-domain.vercel.app/studio

### Configure CORS for Sanity

Add your domains to Sanity CORS settings:

```bash
# Add localhost
sanity cors add http://localhost:3000

# Add Vercel domain
sanity cors add https://your-domain.vercel.app
```

## Step 11: Install Development Tools

### VS Code Extensions (Recommended)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- GitLens

### Configure Prettier

Create `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100
}
```

## Step 12: Run Development Server

```bash
# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

## Verification Checklist

- [ ] Next.js runs on http://localhost:3000
- [ ] Sanity Studio accessible at http://localhost:3000/studio
- [ ] Can create content in Sanity Studio
- [ ] All environment variables are set
- [ ] Git repository created and connected to GitHub
- [ ] Deployed to Vercel successfully
- [ ] Tailwind CSS is working

## Troubleshooting

### Sanity Studio Not Loading

- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Verify CORS settings in Sanity dashboard
- Clear browser cache

### Build Errors

- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check Node.js version (must be 18.17+)

### TypeScript Errors

- Run `npm run build` to check for type errors
- Update `tsconfig.json` if needed

## Next Steps

After completing setup:

1. Review [02-sanity-schemas.md](./02-sanity-schemas.md) and implement schemas
2. Create sample content in Sanity Studio
3. Build components and pages
4. Test multilingual functionality

---

For detailed implementation guidance, see [01-implementation-plan.md](./01-implementation-plan.md).
