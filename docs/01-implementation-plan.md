# Plast Düsseldorf Website - Implementation Plan

## Executive Summary

Building a multilingual (Ukrainian/German/English) website for Plast Düsseldorf with **zero monthly hosting costs**, designed for 5-10 daily-active content editors, with event management, registration forms, and GDPR compliance.

## Technology Stack Recommendation

### Core Platform: Next.js + Sanity + Vercel (All Free Tiers)

**Why Sanity over Payload CMS:**
- **Cost**: Sanity is cloud-hosted (no database hosting costs), while Payload requires PostgreSQL/MongoDB hosting (€10-25/month minimum)
- **Sanity Free Tier**: 100K API requests/month, 10GB bandwidth, unlimited admin users, 3 datasets - sufficient for your needs
- **Ease of Use**: Better for non-technical volunteer editors with intuitive Studio interface
- **Multilingual**: First-class localization support built-in (handles Ukrainian/German/English seamlessly)
- **Scalability**: Handles 5-10 editors with daily updates comfortably
- **Future-Ready**: Built-in role-based permissions for Phase 2 authentication

### Complete Technology Stack

| Component | Technology | Cost | Justification |
|-----------|-----------|------|---------------|
| **Frontend Framework** | Next.js 15 (App Router) | Free | Best React framework, excellent Vercel integration, ISR for performance |
| **CMS** | Sanity.io | Free tier | Cloud-hosted, no database costs, excellent multilingual support |
| **Hosting** | Vercel | Free tier | Optimized for Next.js, automatic deployments, edge network |
| **Styling** | Tailwind CSS | Free | Utility-first, mobile-first, rapid responsive development |
| **Internationalization** | next-intl | Free | Industry standard for Next.js multilingual sites |
| **Forms** | React Hook Form + Sanity | Free | Client-side validation, Sanity form submissions |
| **Email Notifications** | Resend (free tier) | Free | 3K emails/month (sufficient for event registrations) |
| **Image Optimization** | Sanity Image Pipeline | Free | Built-in CDN, automatic responsive images |
| **Analytics** | Vercel Analytics | Free tier | Privacy-friendly, GDPR compliant |
| **Cookie Consent** | Custom + CookieConsent | Free | Open-source GDPR/BFSG compliant solution |
| **Icons** | Lucide React | Free | Consistent, accessible icon system |
| **Deployment** | Vercel CI/CD | Free | Automatic deployments from GitHub |

**Total Monthly Cost: €0** (within all free tier limits)

## Website Structure & Content Architecture

### Site Navigation (Synchronized in 3 Languages)

```
Home (Головна / Startseite / Home)
├── About Us (Про нас / Über uns / About Us)
│   ├── Our History (Наша історія)
│   ├── Leadership (Керівництво)
│   ├── Scout Law & Promise (Пластовий закон)
│   └── Parent Organizations (Батьківські організації)
├── Activities (Діяльність / Aktivitäten / Activities)
│   ├── Age Groups (Вікові групи)
│   ├── Regular Meetings (Сходини)
│   ├── Camps & Expeditions (Табори)
│   └── Training Programs (Навчання)
├── Events (Події / Veranstaltungen / Events)
│   ├── Calendar View (Календар)
│   ├── Upcoming Events (Майбутні події)
│   └── Event Registration (Реєстрація)
├── News & Blog (Новини / Nachrichten / News)
│   ├── Latest News (Останні новини)
│   ├── Photo Galleries (Фотогалереї)
│   └── Stories (Історії)
├── Get Involved (Долучитись / Mitmachen / Get Involved)
│   ├── Join Us (Приєднуйся)
│   ├── Volunteer (Волонтерство)
│   └── Support Us (Підтримати)
└── Contact (Контакти / Kontakt / Contact)
    ├── Contact Form (Форма зв'язку)
    ├── Locations (Локації)
    └── Social Media (Соціальні мережі)
```

## Implementation Plan (8 Phases)

### Phase 1: Project Setup (Week 1)
**Tasks:**
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS with custom theme (Plast colors)
- [ ] Set up Sanity project and Studio
- [ ] Configure next-intl for multilingual routing
- [ ] Set up Git repository and Vercel deployment
- [ ] Configure ESLint, Prettier, Husky

**Deliverable:** Development environment ready

### Phase 2: Sanity Schema & Content Model (Week 1-2)
**Tasks:**
- [ ] Define Sanity schemas (Page, Event, Post, TeamMember, Settings)
- [ ] Configure localization fields (uk/de/en)
- [ ] Set up Sanity Studio customizations (localized preview)
- [ ] Create sample content in all three languages
- [ ] Configure Sanity Image Pipeline

**Deliverable:** CMS ready for content entry

### Phase 3: Core Layout & Components (Week 2-3)
**Tasks:**
- [ ] Create responsive layout components (Header, Footer, Navigation)
- [ ] Implement language switcher
- [ ] Build reusable UI components (Button, Card, Container)
- [ ] Mobile navigation (hamburger menu)
- [ ] Accessibility enhancements (skip links, ARIA)

**Deliverable:** Responsive layout framework

### Phase 4: Public Pages (Week 3-4)
**Tasks:**
- [ ] Home page with hero section
- [ ] About Us pages (History, Leadership, Scout Law)
- [ ] Activities pages (Age Groups, Camps, Training)
- [ ] Contact page with contact info
- [ ] Footer with parent org links and social media

**Deliverable:** Static informational pages

### Phase 5: Event Calendar & Registration (Week 4-5)
**Tasks:**
- [ ] Event listing page (calendar + list view)
- [ ] Event detail pages (dynamic routes)
- [ ] Event registration form (dynamic fields)
- [ ] Form validation (React Hook Form + Zod)
- [ ] Email notifications setup (Resend)
- [ ] Capacity tracking and registration closure

**Deliverable:** Full event management system

### Phase 6: News/Blog & Forms (Week 5-6)
**Tasks:**
- [ ] Blog listing page with pagination
- [ ] Blog post detail pages
- [ ] Image galleries for blog posts
- [ ] Contact form implementation
- [ ] Event feedback form
- [ ] "Join Us" inquiry form
- [ ] Spam protection (honeypot)

**Deliverable:** Content publishing and user communication

### Phase 7: Legal Compliance & SEO (Week 6-7)
**Tasks:**
- [ ] Cookie consent banner (CookieConsent.js)
- [ ] Privacy Policy page (localized)
- [ ] Impressum page (German legal requirement)
- [ ] Terms of Service
- [ ] Accessibility testing (keyboard, screen reader)
- [ ] Color contrast validation
- [ ] SEO metadata (Open Graph, Twitter Cards)
- [ ] Sitemap.xml generation
- [ ] Robots.txt configuration

**Deliverable:** Legally compliant website

### Phase 8: Testing & Launch (Week 7-8)
**Tasks:**
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility audit (@axe-core/react)
- [ ] Performance optimization (Lighthouse score >90)
- [ ] Content migration from Facebook/Instagram
- [ ] Editor training (Sanity Studio walkthrough)
- [ ] Deploy to production (Vercel)
- [ ] Set up custom domain (if available)

**Deliverable:** Live website

## Budget Summary

| Service | Free Tier Limits | Expected Usage | Cost |
|---------|------------------|----------------|------|
| Vercel | 100GB bandwidth, 6K build minutes | ~10GB/month | €0 |
| Sanity | 100K API requests, 10GB bandwidth | ~50K requests/month | €0 |
| Resend | 3K emails/month | ~500 emails/month | €0 |
| Vercel Analytics | 2.5K events/month | ~1K events/month | €0 |
| **Total** | - | - | **€0/month** |

## Timeline Estimate

**Total Duration:** 7-8 weeks (part-time work)
**Accelerated Path (full-time):** 3-4 weeks

**Milestones:**
- Week 2: Basic site structure ready
- Week 4: All public pages complete
- Week 6: Event system working
- Week 8: Launch-ready with full testing

---

**Prepared for:** Plast Düsseldorf
**Date:** February 17, 2026
