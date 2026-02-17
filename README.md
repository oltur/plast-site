# Plast Düsseldorf Website

Multilingual (Ukrainian/German/English) website for Plast Düsseldorf scout organization built with Next.js, Sanity CMS, and Vercel.

## 🚀 Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **CMS:** Sanity.io
- **Styling:** Tailwind CSS
- **i18n:** next-intl
- **Forms:** React Hook Form + Zod
- **Email:** Resend
- **Hosting:** Vercel

## 📁 Project Structure

```
plast-duesseldorf/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Locale-based routes (uk/de/en)
│   │   └── studio/            # Sanity Studio
│   ├── components/            # React components
│   ├── sanity/                # Sanity schemas & config
│   └── lib/                   # Utilities
├── messages/                  # Translations (uk.json, de.json, en.json)
├── docs/                      # Complete documentation
└── public/                    # Static assets
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your Sanity project credentials:

1. Create a Sanity project at [sanity.io](https://www.sanity.io/)
2. Get your Project ID and Dataset name
3. Create an API token with Editor permissions
4. Add them to `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Access Sanity Studio

Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the CMS.

## 📖 Documentation

Complete documentation is available in the `docs/` folder:

- **[01-implementation-plan.md](./docs/01-implementation-plan.md)** - Project overview and timeline
- **[02-sanity-schemas.md](./docs/02-sanity-schemas.md)** - Sanity schema definitions
- **[03-content-templates.md](./docs/03-content-templates.md)** - Multilingual content examples
- **[04-setup-guide.md](./docs/04-setup-guide.md)** - Development environment setup
- **[05-deployment-guide.md](./docs/05-deployment-guide.md)** - Production deployment
- **[06-editor-training-guide.md](./docs/06-editor-training-guide.md)** - Content editor manual

## 🌍 Multilingual Support

The website supports three languages:

- **Ukrainian (Українська)** - Default
- **German (Deutsch)**
- **English**

Switch languages using the language selector in the header.

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

## 📝 License

© 2026 Plast Düsseldorf. All rights reserved.

## 🤝 Contributing

This project is maintained by Plast Düsseldorf volunteers.

For questions or support, contact: admin@plast-duesseldorf.de

**Слава Україні! Скоб!** 🇺🇦
