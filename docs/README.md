# Plast Düsseldorf Website Documentation

Complete documentation for the Plast Düsseldorf multilingual website project.

## 📚 Documentation Overview

This documentation provides everything needed to build, deploy, and maintain the Plast Düsseldorf website - a trilingual (Ukrainian/German/English) website built with Next.js, Sanity CMS, and Vercel.

### Quick Navigation

| Document | Purpose | Audience |
|----------|---------|----------|
| [01-implementation-plan.md](./01-implementation-plan.md) | High-level project plan and architecture | Project managers, developers |
| [02-sanity-schemas.md](./02-sanity-schemas.md) | Complete Sanity CMS schema definitions | Developers |
| [03-content-templates.md](./03-content-templates.md) | Multilingual content examples | Content editors, translators |
| [04-setup-guide.md](./04-setup-guide.md) | Step-by-step development setup | Developers |
| [05-deployment-guide.md](./05-deployment-guide.md) | Production deployment and monitoring | DevOps, administrators |
| [06-editor-training-guide.md](./06-editor-training-guide.md) | Content editor training manual | Content editors, volunteers |

## 🎯 Project Goals

Build a **zero-cost** multilingual website for the Plast Düsseldorf scout organization featuring:

- **Multilingual Content:** Ukrainian, German, and English (synchronized)
- **Event Management:** Calendar, registration forms, capacity tracking
- **Blog/News:** Photo galleries, categories, author profiles
- **Forms:** Contact, event registration, event feedback
- **Legal Compliance:** GDPR, BFSG (accessibility), cookie consent
- **Mobile-First Design:** Responsive across all devices

## 🛠️ Technology Stack

### Core Technologies (All Free Tier)

- **Frontend:** Next.js 15 (App Router) with TypeScript
- **CMS:** Sanity.io (cloud-hosted, no database costs)
- **Hosting:** Vercel (automatic deployments, edge network)
- **Styling:** Tailwind CSS (utility-first CSS)
- **i18n:** next-intl (multilingual routing)
- **Forms:** React Hook Form + Zod (validation)
- **Email:** Resend (3K emails/month free)
- **Images:** Sanity Image Pipeline (CDN included)
- **Analytics:** Vercel Analytics (privacy-friendly)

### Total Monthly Cost: €0

All services operate within generous free tiers suitable for a local non-profit organization.

## 📖 Getting Started

### For Developers

1. **Start Here:** [04-setup-guide.md](./04-setup-guide.md)
   - Complete development environment setup
   - Local development server configuration
   - Initial Sanity project creation

2. **Then Review:** [02-sanity-schemas.md](./02-sanity-schemas.md)
   - Implement content schemas
   - Understand localization strategy

3. **Finally:** [05-deployment-guide.md](./05-deployment-guide.md)
   - Deploy to production
   - Configure custom domain
   - Set up monitoring

### For Content Editors

1. **Essential Reading:** [06-editor-training-guide.md](./06-editor-training-guide.md)
   - Complete Sanity Studio tutorial
   - Multilingual content workflow
   - Publishing and management

2. **Content Examples:** [03-content-templates.md](./03-content-templates.md)
   - Sample content in all three languages
   - Tone and style guidelines

### For Project Managers

1. **Project Overview:** [01-implementation-plan.md](./01-implementation-plan.md)
   - Complete 8-phase implementation plan
   - Timeline estimates (7-8 weeks)
   - Budget breakdown and scaling considerations

## 🚀 Key Features

### Phase 1 (MVP - Launch)

✅ **Public Content**
- Home page with hero section
- About Us pages (history, leadership, mission)
- Activities pages (age groups, meetings, camps)
- Contact page with form

✅ **Event Management**
- Calendar view (month/list)
- Event detail pages
- Registration forms (dynamic fields)
- Email notifications
- Capacity tracking

✅ **News/Blog**
- Blog listing with pagination
- Post detail pages
- Photo galleries
- Author profiles
- Categories and tags

✅ **Forms**
- Contact form
- Event registration
- Event feedback
- Spam protection

✅ **Legal Compliance**
- Cookie consent banner
- Privacy policy (multilingual)
- Impressum (German legal requirement)
- GDPR compliance
- WCAG 2.1 Level AA accessibility

### Phase 2 (Future Enhancements)

🔄 **Planned Features:**
- User authentication (NextAuth.js)
- Role-based access (Admin, Editor, Viewer, Member)
- Private member areas
- Social media auto-publishing (Facebook, Instagram)
- Payment integration (Stripe for paid events)
- Advanced event features (waitlist, QR check-in)

## 📁 Project Structure

```
plast-duesseldorf/
├── src/                          # Source code directory
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/             # Locale-based routes (uk/de/en)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── about/
│   │   │   ├── activities/
│   │   │   ├── events/
│   │   │   ├── news/
│   │   │   └── contact/
│   │   └── api/                  # API routes
│   │       ├── contact/route.ts
│   │       └── register/route.ts
│   ├── components/
│   │   ├── layout/               # Header, Footer, Navigation
│   │   ├── events/               # Event components
│   │   ├── forms/                # Form components
│   │   └── ui/                   # Reusable UI components
│   ├── sanity/                   # Sanity CMS
│   │   ├── schemas/              # Content schemas
│   │   │   ├── page.ts
│   │   │   ├── event.ts
│   │   │   ├── post.ts
│   │   │   ├── teamMember.ts
│   │   │   └── settings.ts
│   │   └── lib/
│   │       ├── client.ts
│   │       └── queries.ts
│   └── lib/                      # Utilities
│       ├── i18n.ts               # i18n config
│       └── email.ts              # Email client
├── messages/                     # Translations
│   ├── uk.json
│   ├── de.json
│   └── en.json
├── docs/                         # THIS FOLDER
└── public/                       # Static assets
```

## 🌍 Multilingual Implementation

### Localization Strategy

**Field-Level Localization:**
```typescript
{
  title: {
    uk: "Пластовий осередок у Дюссельдорфі",
    de: "Plast-Gruppe Düsseldorf",
    en: "Plast Düsseldorf Scout Group"
  }
}
```

**Benefits:**
- Editors see all three languages side-by-side
- Easy to maintain content parity
- No duplicate documents
- Simplified workflow

### URL Structure

```
/ → redirects to /uk (browser language detection)
/uk/about → Ukrainian About page
/de/about → German About page
/en/about → English About page
```

### Language Switcher

Users can switch languages at any time. Preference saved in cookie.

## 📊 Performance Targets

### Lighthouse Scores (Target: >90)

- **Performance:** >90
- **Accessibility:** >90
- **Best Practices:** >90
- **SEO:** >90

### Optimization Strategies

1. **ISR (Incremental Static Regeneration):** Revalidate every hour
2. **Image Optimization:** WebP/AVIF, lazy loading, blur placeholders
3. **Code Splitting:** Automatic with Next.js App Router
4. **CDN:** Vercel Edge Network + Sanity CDN
5. **Caching:** Aggressive caching with revalidation

## 🔒 Security & Compliance

### GDPR Compliance

✅ Cookie consent before analytics
✅ Privacy policy in all languages
✅ User data deletion requests supported
✅ Data processing documented
✅ HTTPS enforced

### BFSG (Accessibility) Compliance

✅ WCAG 2.1 Level AA
✅ Keyboard navigation
✅ Screen reader compatible
✅ Sufficient color contrast (4.5:1)
✅ Alt text for all images
✅ Semantic HTML

### Security Headers

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- HTTPS enforced (Vercel automatic)

## 📞 Support & Resources

### External Links

- **Plast Deutschland:** https://plastde.org/
- **Worldwide Plast:** https://en.plast.org.ua/
- **Facebook:** https://www.facebook.com/plastduesseldorf/
- **Instagram:** https://www.instagram.com/plast.duesseldorf/

### Technical Documentation

- **Next.js:** https://nextjs.org/docs
- **Sanity:** https://www.sanity.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **next-intl:** https://next-intl-docs.vercel.app/

### Service Dashboards

- **Vercel:** https://vercel.com/dashboard
- **Sanity:** https://www.sanity.io/manage
- **Resend:** https://resend.com/dashboard

## 🤝 Contributing

### For Developers

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Create Pull Request

### For Content Editors

Use Sanity Studio directly:
- Production: https://plast-duesseldorf.de/studio
- No code changes required!

## 📝 License

This project is maintained by Plast Düsseldorf for the Ukrainian Scout Organization in Germany.

## 🎖️ About Plast

**Plast** (Пласт) is the Ukrainian Scouting organization, founded in 1912. It operates worldwide with over 10,000 members across Ukraine, USA, Canada, Australia, and Europe.

**Plast Düsseldorf** is the local cell (осередок) in Düsseldorf, Germany, part of Plast Deutschland, serving Ukrainian youth in the Rhine-Ruhr region.

**Motto:** Скоб! (Skob!)

---

**Version:** 1.0
**Last Updated:** February 17, 2026
**Maintained by:** Plast Düsseldorf Technology Team

For questions or support, contact: admin@plast-duesseldorf.de
