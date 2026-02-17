# Deployment & Production Guide

Complete guide for deploying the Plast Düsseldorf website to production and managing it.

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All content schemas are finalized in Sanity
- [ ] Sample content created in all three languages (uk/de/en)
- [ ] All pages render correctly locally
- [ ] Forms are working and tested
- [ ] Email notifications are configured and tested
- [ ] Images are optimized and have alt text
- [ ] SEO metadata is complete
- [ ] Accessibility tested (keyboard navigation, screen reader)
- [ ] Privacy policy and legal pages completed
- [ ] All environment variables documented

## Deployment Platforms

### Vercel (Recommended - Free Tier)

#### Initial Deployment

1. **Connect GitHub Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Framework Preset: Next.js (auto-detected)

3. **Configure Environment Variables**

   Add the following in Vercel project settings:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-api-token
   RESEND_API_KEY=your-resend-key
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ADMIN_EMAIL=admin@plast-duesseldorf.de
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

#### Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `plast-duesseldorf.de`)

2. **Configure DNS Records**

   In your domain registrar, add:

   **For Root Domain (plast-duesseldorf.de):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www Subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Vercel automatically provisions SSL certificate
   - Wait 24-48 hours for DNS propagation

4. **Update Environment Variable**
   ```
   NEXT_PUBLIC_SITE_URL=https://plast-duesseldorf.de
   ```

#### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Vercel automatically builds and deploys
```

**Preview Deployments:**
- Every pull request gets a unique preview URL
- Test changes before merging to main

### Sanity Configuration for Production

#### Enable Production CDN

Update `src/sanity/lib/client.ts`:

```typescript
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // Enable CDN in production
})
```

#### Configure CORS

Add production domains:

```bash
# Add production domain
sanity cors add https://plast-duesseldorf.de --credentials

# Add Vercel preview domains
sanity cors add https://*.vercel.app --credentials
```

#### Create Production API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API → Tokens
4. Create token with "Editor" permissions
5. Add to Vercel environment variables

### Resend Email Configuration

#### Production Setup

1. **Verify Domain**
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add domain: `plast-duesseldorf.de`
   - Add DNS records (MX, TXT, CNAME)

2. **DNS Records for Email**
   ```
   Type: MX
   Name: @
   Priority: 10
   Value: feedback-smtp.eu-central-1.amazonses.com

   Type: TXT
   Name: @
   Value: v=spf1 include:amazonses.com ~all

   Type: TXT
   Name: resend._domainkey
   Value: [provided by Resend]
   ```

3. **Update Email Templates**

   Use verified sender address:
   ```typescript
   from: 'Plast Düsseldorf <noreply@plast-duesseldorf.de>'
   ```

## Performance Optimization

### Enable ISR (Incremental Static Regeneration)

Update page components to use revalidation:

```typescript
// src/app/[locale]/events/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function EventsPage() {
  const events = await getEvents()
  return <EventsList events={events} />
}
```

### Image Optimization

Use Next.js Image component with Sanity images:

```typescript
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

<Image
  src={urlFor(image).url()}
  alt={image.alt.en}
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={urlFor(image).width(20).blur(10).url()}
/>
```

### Configure Caching

Update `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
        },
      ],
    },
  ],
}
```

## Monitoring & Analytics

### Vercel Analytics

Already included in free tier:

1. **Enable in Project Settings**
   - Go to Analytics tab
   - Enable Web Analytics (free)

2. **View Metrics**
   - Page views
   - Unique visitors
   - Top pages
   - Referrers

### Sanity Studio Analytics

Monitor content changes:

1. **Activity Feed**
   - View in Sanity Studio sidebar
   - Shows recent edits, publishes, deletes

2. **Usage Metrics**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - View API requests, bandwidth usage

### Error Monitoring (Optional)

For production error tracking, consider:
- **Sentry** (free tier available)
- **LogRocket** (for session replay)

## Backup & Recovery

### Sanity Content Backup

Automatic backups included in free tier.

**Manual Export:**
```bash
# Export all content
sanity dataset export production backup.tar.gz

# Export specific dataset
sanity dataset export production backup-$(date +%Y%m%d).tar.gz
```

**Scheduled Backup Script:**
```bash
#!/bin/bash
# backup-sanity.sh

DATE=$(date +%Y%m%d)
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

sanity dataset export production "$BACKUP_DIR/backup-$DATE.tar.gz"

# Keep only last 30 days
find $BACKUP_DIR -name "backup-*.tar.gz" -mtime +30 -delete
```

Add to crontab (monthly):
```bash
0 0 1 * * /path/to/backup-sanity.sh
```

### Code Backup

Always maintained in GitHub:
- Main branch = production
- All commits tracked
- Can rollback to any commit

### Vercel Rollback

If deployment has issues:

1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → Promote to Production

## Security Best Practices

### Environment Variables

- ✅ Never commit `.env.local` to Git
- ✅ Use Vercel environment variables for production
- ✅ Rotate API keys every 6 months
- ✅ Use separate keys for development and production

### Sanity Security

```typescript
// Rate limiting for public API routes
// src/app/api/contact/route.ts

import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
})

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }

  // Process form submission
}
```

### HTTPS Enforcement

Vercel automatically enforces HTTPS. Add security headers:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
}
```

## Testing in Production

### Lighthouse CI

Add to GitHub Actions:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://plast-duesseldorf.de
            https://plast-duesseldorf.de/uk/about
            https://plast-duesseldorf.de/uk/events
          uploadArtifacts: true
```

### Manual Testing Checklist

After deployment:

- [ ] All pages load correctly
- [ ] Language switcher works (uk/de/en)
- [ ] Forms submit successfully
- [ ] Event registration sends emails
- [ ] Images load and are optimized
- [ ] Mobile responsive design works
- [ ] Accessibility (keyboard, screen reader)
- [ ] SEO metadata present
- [ ] Lighthouse score >90

## Maintenance

### Weekly Tasks
- [ ] Check Sanity API usage (stay within free tier)
- [ ] Review form submissions
- [ ] Check error logs in Vercel

### Monthly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Review and approve pending content
- [ ] Backup Sanity content
- [ ] Check Lighthouse scores
- [ ] Review analytics data

### Quarterly Tasks
- [ ] Security audit
- [ ] Content audit (remove outdated posts)
- [ ] Update legal pages if needed
- [ ] Review and optimize images

## Troubleshooting

### Build Failures

1. **Check Vercel Logs**
   - Go to Deployments → Failed deployment
   - View build logs

2. **Common Issues**
   - Missing environment variables
   - TypeScript errors
   - Sanity schema changes not deployed

3. **Fix and Redeploy**
   ```bash
   # Fix locally first
   npm run build

   # Then push
   git push origin main
   ```

### Email Not Sending

1. **Check Resend Dashboard**
   - Verify domain is verified
   - Check email logs

2. **Test Email Configuration**
   ```bash
   # Send test email
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "noreply@plast-duesseldorf.de",
       "to": "test@example.com",
       "subject": "Test",
       "html": "<p>Test email</p>"
     }'
   ```

### High API Usage

If approaching Sanity free tier limits:

1. **Enable CDN** (reduces API calls)
2. **Increase revalidation time** (ISR)
3. **Implement client-side caching**

## Cost Management

### Free Tier Limits

| Service | Free Tier | Typical Usage | Status |
|---------|-----------|---------------|--------|
| Vercel | 100GB bandwidth | ~10GB/month | ✅ Safe |
| Sanity | 100K API requests | ~50K/month | ✅ Safe |
| Resend | 3K emails/month | ~500/month | ✅ Safe |

### Monitoring Usage

**Vercel:**
- Dashboard → Usage
- Set up usage alerts

**Sanity:**
- [sanity.io/manage](https://sanity.io/manage) → Project → Usage

**Resend:**
- Dashboard → Usage

### Scaling Strategy

If you exceed free tiers:

1. **Vercel:** €20/month (unlikely for local org)
2. **Sanity:** €99/month (optimize first with CDN)
3. **Resend:** €10/month (10K emails)

**Recommendation:** Current setup should handle 1000+ monthly visitors within free tiers.

---

**Production URL:** https://plast-duesseldorf.de
**Sanity Studio:** https://plast-duesseldorf.de/studio
**Status Page:** https://plastduesseldorf.vercel.app/_vercel/insights

For setup instructions, see [04-setup-guide.md](./04-setup-guide.md).
