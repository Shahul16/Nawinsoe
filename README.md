# Nawins Education - Premium Study Abroad Consultancy Website

Premium international education consultancy website built with React, Vite, Tailwind CSS, tRPC, and Node.js. Fully production-ready with advanced features for student recruitment, lead management, and analytics.

## Brand

- **Company**: Nawins Overseas Education
- **Tagline**: Empowering Minds. Building Futures.
- **Positioning**: Premium international education consultancy and university recruitment partner
- **Visual Identity**: Deep navy (#07133a), gold (#ffbf47), steel blue, and clean white surfaces
- **Typography**: Sora for headings, Plus Jakarta Sans for body text

## Features

### Core Pages
- **Home** - Premium landing page with hero, services, destinations, universities, testimonials, and CTAs
- **About** - Company story, mission, values, and why choose Nawins
- **Services** - Detailed service offerings with benefits and success statistics
- **Destinations** - Study destination guides for UK, Canada, Australia, Ireland, and Europe
- **Universities** - Partner universities directory with search functionality
- **Success Stories** - Student testimonials, achievements, and visa success metrics
- **Blog** - Educational articles with category filtering and reading time
- **Gallery** - Visual content with category organization
- **Contact** - Contact form, office hours, and location information

### Advanced Features
- **Responsive Design** - Mobile-first, fully responsive across all devices
- **Premium Animations** - Framer Motion transitions and scroll reveals
- **Analytics Integration** - Google Analytics 4, Google Tag Manager, Meta Pixel
- **CRM Integration** - HubSpot lead capture and tracking
- **Lead Management** - Contact forms with automatic lead routing
- **UTM Tracking** - Campaign tracking and attribution
- **SEO Optimized** - Schema markup, meta tags, sitemaps, robots.txt
- **Accessibility** - WCAG 2.2 AA compliant with keyboard navigation
- **Task Management** - Internal task tracking with browser notifications

## Project Structure

```
nawinsoe/
├── client/
│   ├── src/
│   │   ├── pages/          # Route-level page components
│   │   ├── components/     # Shared UI and premium sections
│   │   ├── lib/            # Utilities (analytics, CRM, etc.)
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.tsx         # Router configuration
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets, fonts, SEO files
│   └── index.html          # HTML template
├── server/
│   ├── _core/              # Core backend utilities
│   ├── routers.ts          # tRPC API routes
│   ├── db.ts               # Database operations
│   └── storage.ts          # File storage
├── drizzle/                # Database schema and migrations
├── scripts/                # Asset generation utilities
├── DEPLOYMENT.md           # Quick deployment guide
├── DEPLOYMENT_GUIDE.md     # Comprehensive deployment guide
├── PRODUCTION_CHECKLIST.md # Production readiness checklist
└── BRANDING.md            # Brand guidelines

```

## Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - Component library
- **React Query** - Data fetching
- **Wouter** - Routing
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime
- **tRPC** - Type-safe API
- **Express** - HTTP server
- **Drizzle ORM** - Database ORM
- **MySQL** - Database

### DevTools
- **TypeScript** - Type checking
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Sharp** - Image processing
- **Puppeteer** - Screenshot generation

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Development

```bash
# Start development server
pnpm run dev

# The app will be available at http://localhost:5173
# API available at http://localhost:3000/api/trpc
```

### Production Build

```bash
# Build frontend and backend
pnpm run build

# Start production server
NODE_ENV=production node dist/index.js

# Server runs on http://localhost:3000
```

## Configuration

### Environment Variables

```bash
# Database
DATABASE_URL=mysql://user:password@localhost:3306/nawins_db

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX-X
VITE_GTM_ID=GTM-XXXXXXX

# CRM
VITE_HUBSPOT_PORTAL_ID=your-portal-id
VITE_HUBSPOT_FORM_ID=your-form-id
HUBSPOT_API_KEY=your-api-key

# Pixels
VITE_META_PIXEL_ID=your-pixel-id

# Application
NODE_ENV=production
PORT=3000
VITE_API_URL=https://api.yourdomain.com
VITE_DOMAIN=https://nawinsukstudyabroad.com
```

## Database Schema

### Tables
- **users** - User accounts and authentication
- **universities** - Partner universities
- **courses** - Available courses
- **inquiries** - Student inquiries and leads
- **testimonials** - Student testimonials
- **tasks** - Internal task management

### Setup

```bash
# Generate migrations
pnpm run db:push

# Run migrations
pnpm run migrate
```

## SEO & Analytics

### SEO Features
- Canonical tags on all pages
- Meta tags (description, OG, Twitter)
- Schema markup (Organization, WebSite, WebPage, BreadcrumbList, FAQ)
- XML sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Proper heading hierarchy
- Internal linking structure

### Analytics Integration
- Google Analytics 4 tracking
- Google Tag Manager event tracking
- Meta Pixel conversion tracking
- HubSpot lead capture
- UTM parameter tracking
- Custom event tracking for inquiries and conversions

## Performance

### Optimization Features
- Code splitting by route
- Image optimization (AVIF/WebP)
- Font preloading (WOFF2)
- CSS critical path optimization
- JavaScript minification
- Gzip/Brotli compression
- Cache headers optimization

### Lighthouse Targets
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Accessibility

### WCAG 2.2 AA Compliance
- Keyboard navigation throughout
- Screen reader optimized
- Color contrast 4.5:1 minimum
- ARIA labels and roles
- Focus states visible
- Skip to main content link
- Semantic HTML structure
- Accessible forms with proper labels

## Testing

```bash
# Run tests
pnpm test

# Run type checking
pnpm check

# Format code
pnpm format
```

## Deployment

### Quick Start
```bash
# See DEPLOYMENT.md for quick steps
pnpm run build
NODE_ENV=production node dist/index.js
```

### Comprehensive Guide
See `DEPLOYMENT_GUIDE.md` for:
- Pre-deployment checklist
- Step-by-step deployment
- Server configuration (Nginx)
- SSL/TLS setup
- Monitoring and maintenance
- Scaling considerations
- Troubleshooting guide
- Backup and recovery

## Scripts

```bash
# Development
pnpm run dev              # Start dev server

# Building
pnpm run build           # Build for production
pnpm run format          # Format code
pnpm check              # Type check

# Testing
pnpm test               # Run tests

# Database
pnpm run db:push        # Generate migrations
pnpm run migrate        # Run migrations

# Assets
pnpm run generate:assets    # Generate optimized assets
pnpm run generate:avif      # Convert images to AVIF
pnpm run generate:woff2     # Convert fonts to WOFF2
pnpm run fetch:fonts        # Fetch and optimize fonts
```

## Asset Generation

### Image Optimization

```bash
# Generate AVIF versions
pnpm run generate:avif

# Uses Sharp for optimization
# Supports: PNG, JPG, WebP → AVIF
```

### Font Optimization

```bash
# Download and optimize fonts
pnpm run fetch:fonts

# Converts to WOFF2 format
pnpm run generate:woff2
```

## API Documentation

### tRPC Routes

#### Universities
- `universities.list` - Get all universities
- `universities.getById` - Get university by ID

#### Courses
- `courses.list` - Get all courses

#### Inquiries
- `inquiries.create` - Submit student inquiry

#### Testimonials
- `testimonials.list` - Get testimonials

#### Tasks
- `tasks.list` - Get tasks (filtered by status)
- `tasks.create` - Create new task
- `tasks.complete` - Mark task complete
- `tasks.updateStatus` - Update task status

## Production Checklist

Before launching, verify:
- [ ] All pages tested and content finalized
- [ ] Analytics configured and verified
- [ ] CRM integration working
- [ ] Forms tested end-to-end
- [ ] Database backups configured
- [ ] SSL certificate installed
- [ ] Monitoring and alerts set up
- [ ] Sitemap submitted to Google Search Console
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked

See `PRODUCTION_CHECKLIST.md` for comprehensive checklist.

## Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf dist/ node_modules/
pnpm install
pnpm run build
```

### Database Connection
```bash
# Test MySQL connection
mysql -h localhost -u user -p -e "SELECT 1"

# Check .env DATABASE_URL
cat .env | grep DATABASE_URL
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 node dist/index.js
```

## Support & Contact

- **Email**: info@nawinsoe.com
- **Phone**: +91 99437 38177
- **Office**: Tiruchengode, Namakkal, Tamil Nadu, India

## License

MIT License - See LICENSE file for details

## Contributing

This is a production website. Changes should go through:
1. Feature branch
2. Testing and QA
3. Code review
4. Staging deployment
5. Production deployment

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: June 1, 2024

