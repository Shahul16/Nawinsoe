# WEBSITE ARCHITECTURE

## Executive Summary

NAWINS EDUTECH PRIVATE LIMITED operates a modern, full-stack web application for international education consulting. The platform serves Indian students seeking higher education opportunities in the UK, Canada, Australia, Ireland, and Europe. Built on a React frontend with Express backend and MySQL database via Drizzle ORM, the website combines contemporary design with comprehensive student journey support.

## Business Purpose

**Primary Mission**: Connect ambitious Indian students with world-class education opportunities globally through expert counseling, application support, and visa guidance.

**Core Value Proposition**: End-to-end study abroad support from initial consultation to enrollment, with a 95% visa success rate and 5,000+ students successfully placed.

## Target Audience

| Segment | Characteristics |
|---------|----------------|
| Primary | Indian students (12th grade graduates, undergraduates, graduates) seeking international education |
| Secondary | Parents of prospective students researching overseas education options |
| Tertiary | Educational institutions seeking partnership opportunities |

## Business Goals

1. Generate qualified student leads through digital channels
2. Increase consultation booking conversion rates
3. Build authority and trust in overseas education sector
4. Achieve top search rankings for study abroad keywords
5. Support scalable business expansion across destinations

## Website Goals

1. **Lead Generation**: Capture prospective student information via forms
2. **Conversion Optimization**: Guide visitors through counseling-to-application journey
3. **Trust Building**: Showcase testimonials, university partnerships, success metrics
4. **SEO Growth**: Rank for education destination and program keywords
5. **User Experience**: Provide seamless mobile-first experience across all devices

## Information Architecture

### Sitemap

```
HOME (/)
├── ABOUT (/about)
│   ├── Our Story
│   ├── Mission & Values
│   └── Why Choose Us
├── SERVICES (/services)
│   ├── Free Counseling
│   ├── Course & University Identification
│   ├── Test Preparation
│   └── Application & Visa Support
├── DESTINATIONS (/destinations)
│   ├── United Kingdom (/study-in-uk)
│   ├── Canada (/study-in-canada)
│   ├── Australia (/study-in-australia)
│   ├── Ireland (/study-in-ireland)
│   └── Europe (Germany, France, Netherlands, etc.)
├── UNIVERSITIES (/universities)
│   └── University listings with search functionality
├── SUCCESS STORIES (/success-stories)
│   ├── Student Testimonials
│   ├── Statistics
│   └── Journey Timeline
├── BLOGS (/blogs)
│   ├── Articles by Category
│   ├── Search & Filter
│   └── Newsletter Signup
├── GALLERY (/gallery)
│   └── Event Photos
├── CONTACT (/contact)
│   ├── Contact Form
│   ├── Office Hours
│   └── Quick Contact CTA
├── FAQ (/faq)
│   ├── General Questions
│   ├── Admission Process
│   ├── Visa & Immigration
│   └── Costs & Scholarships
├── TASKS (/tasks)
│   └── Student Task Management (CRM)
└── LEGAL
    ├── PRIVACY (/privacy)
    ├── TERMS (/terms)
    └── COOKIES (/cookies)
```

## Navigation Architecture

### Primary Navigation (Header)

| Link | Route | Purpose |
|------|-------|---------|
| Home | / | Main landing page |
| About | /about | Company story and values |
| Services | /services | Service offerings |
| Destinations | /destinations | Study destination overview |
| Universities | /universities | University database |
| Success Stories | /success-stories | Student testimonials |
| Blogs | /blogs | Educational content |
| Gallery | /gallery | Community moments |
| Contact | /contact | Lead capture forms |

### Secondary Navigation

- **Destinations Sub-pages**: Country-specific study pages (UK, Canada, Australia, Ireland)
- **Legal Pages**: Privacy, Terms, Cookie Policy
- **FAQ**: Comprehensive question database

### Footer Navigation

**Company Section**: About Us, Services, Destinations, Universities, Contact
**Resources Section**: Success Stories, Blogs, Gallery, FAQ
**Legal Section**: Privacy Policy, Terms of Service, Cookie Policy

## User Journey Maps

### Visitor Journey

```
Awareness → Interest → Consideration → Decision → Action
    ↓         ↓           ↓           ↓        ↓
Homepage → Destinations → Universities → Success Stories → Contact Form
    ↓         ↓           ↓           ↓        ↓
Blog SEO → Comparison → Search/Filter → Testimonials → Lead Capture
```

### Lead Journey (CRM Pipeline)

```
Visitor
   ↓
Lead (Form Submission)
   ↓
Counselling Session Scheduled
   ↓
Document Collection
   ↓
Application Process
   ↓
Offer Letter Received
   ↓
Visa Processing
   ↓
Enrollment Complete
   ↓
Success Story Generated
```

### Lead Statuses

| Status | Description |
|--------|-------------|
| pending | Initial inquiry received, not yet contacted |
| in_progress | Active counseling phase |
| completed | Application/enrollment finalized |

## CRM Architecture

### Lead Capture Sources

1. **Contact Form**: Primary lead capture via /contact page
2. **Newsletter Signup**: Email subscriptions via /blogs page
3. **UTM Tracking**: Campaign source attribution
4. **Tasks Page**: Internal task management for counselors

### Forms

| Form | Location | Fields | Purpose |
|------|----------|--------|---------|
| Contact Form | /contact | Name, Email, Phone, Subject, Message | Lead capture |
| Newsletter | /blogs | Email | Subscription funnel |
| Task Creation | /tasks | Title, Description | Internal workflow |

### Pipelines

```
INQUIRIES TABLE
- id (Primary Key)
- name (Required)
- email (Required)
- phone (Optional)
- preferredCourse (Optional)
- message (Optional)
- intakeYear (Optional)
- createdAt/updatedAt timestamps

NEWSLETTER_SUBSCRIBERS TABLE
- id (Primary Key)
- email (Required)
- name (Optional)
- interests (Optional)
- createdAt timestamp

TASKS TABLE
- id (Primary Key)
- title (Required)
- description (Optional)
- status (pending/in_progress/completed)
- completedAt (Optional)
- createdAt/updatedAt timestamps
```

### Automations

1. **Owner Notifications**: Email alerts on new inquiries
2. **Task Status Notifications**: Browser notifications for completeness
3. **UTM Tracking**: Automatic source capture for marketing attribution
4. **Lead Forwarding**: CRM fallback when database unavailable

## Content Architecture

### Section Inventory

| Section | Pages | Content Type |
|---------|-------|--------------|
| Hero/Banner | Home, About, Services, Destinations, Universities, Success Stories, Blogs, Contact, FAQ, Gallery | Headline, Subheadline, CTA |
| Statistics | Home, Services, Success Stories | Metrics (5000+ students, 95% success) |
| University Showcase | Universities, Destinations | University cards with search |
| Testimonials | Home, Success Stories | Student success stories |
| Contact Information | Contact, Footer | Email, Phone, Address |
| Blog Articles | Blogs | Educational content |
| Journey Timeline | Success Stories | Process visualization |
| Gallery | Gallery | Event photos and moments |

### Country Content

- **United Kingdom**: 🇬🇧 Focus on Russell Group, PSW visa, 1-2 year Masters
- **Canada**: 🇨🇦 Pathway to PR, affordable, tech/research sectors
- **Australia**: 🇦🇺 Great lifestyle, work rights, Group of Eight universities
- **Ireland**: 🇮🇪 EU gateway, tech hub, Trinity College Dublin
- **Europe**: 🇪🇺 Diverse systems, Erasmus opportunities, ETH Zurich mentioned

### Course Categories

From fallback data and blog content:
- Business & Management
- Engineering
- Computer Science
- Medicine & Health
- Law
- Software Engineering
- Data Science
- Environmental Science
- Business Analytics

## SEO Architecture

### Meta Structure

| Page | Title Template | Description |
|------|---------------|-------------|
| Home | "NAWINS Edutech - Study Abroad Consultants" | "Connect with leading universities worldwide" |
| About | "About Us - NAWINS Edutech" | "Trusted partner for international education" |
| Services | "Our Services - NAWINS Edutech" | "Comprehensive study abroad support" |
| Destinations | "Study Destinations - NAWINS Edutech" | "Explore UK, Canada, Australia, Ireland" |
| Universities | "UK Universities - NAWINS Edutech" | "World-renowned institutions" |
| Success Stories | "Success Stories - NAWINS Edutech" | "Real students, real achievements" |
| Blogs | "Study Abroad Blog - NAWINS Edutech" | "Tips and insights for overseas education" |
| Gallery | "Gallery - NAWINS Edutech" | "Community moments and events" |
| Contact | "Contact - NAWINS Edutech" | "Get expert guidance today" |
| FAQ | "FAQ - NAWINS Edutech" | "Answers to common questions" |

### Schema Structure

- **Organization Schema**: NAWINS EDUTECH PRIVATE LIMITED
- **LocalBusiness Schema**: Office location in Tiruchengode, Namakkal
- **Article Schema**: Blog posts with author and publication dates
- **FAQ Schema**: Structured FAQ content on /faq page

### Sitemap Structure

Static routes defined in App.tsx:
- /, /about, /services, /destinations, /success-stories, /universities, /blogs, /gallery, /contact, /tasks, /privacy, /terms, /cookies, /faq
- /study-in-uk, /study-in-canada, /study-in-australia, /study-in-ireland

### Internal Linking

- **Primary**: Navigation and footer links to all main pages
- **Contextual**: "Learn More" buttons on university cards → /contact
- **Progression**: CTA sections across pages → /contact
- **Cross-linking**: Blogs reference destinations, universities, and services

## Technical Architecture

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.1 | UI Library |
| TypeScript | Latest | Type Safety |
| Wouter | 3.3.5 | Routing |
| TailwindCSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Radix UI | Latest | Component Primitives |
| TanStack Query | 5.x | Server State Management |
| tRPC | 11.x | Type-safe API |
| Lucide React | 0.453 | Icons |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Express | 4.21.2 | Web Server |
| MySQL2 | 3.x | Database Driver |
| Drizzle ORM | 0.44.5 | Database ORM |
| tRPC | 11.x | API Layer |

### Hosting & Deployment

- **Build Tool**: Vite 7.x
- **Server Bundling**: esbuild
- **Platform**: Node.js
- **Database**: MySQL
- **File Storage**: AWS S3 (configured)
- **CI/CD**: GitHub Actions (generate-assets.yml)

### Analytics & Integrations

| Service | Environment Variable | Purpose |
|---------|---------------------|---------|
| Google Analytics | VITE_GOOGLE_ANALYTICS_ID | Pageview tracking |
| Google Tag Manager | VITE_GTM_ID | Tag management |
| HubSpot | VITE_HUBSPOT_PORTAL_ID | CRM integration |
| Meta Pixel | VITE_META_PIXEL_ID | Facebook tracking |
| SMTP | SMTP_* | Email notifications |

## Security Architecture

- **Session Management**: Cookie-based auth
- **Environment Variables**: Sensitive keys in .env
- **Input Validation**: Zod schemas on all endpoints
- **CORS**: Configured for cross-origin requests
- **Privacy Policy**: GDPR-compliant privacy documentation

## Scalability Architecture

- **Database Design**: Normalized MySQL schema with relations
- **API Design**: tRPC with type-safe endpoints
- **Caching**: TanStack Query for client-side caching
- **Lazy Loading**: React.lazy for code splitting on heavy pages
- **Responsive Design**: Mobile-first TailwindCSS

## Future Expansion Architecture

### UK Expansion (Current Focus)

- UK-specific university partnerships
- Russell Group university showcase
- PSW visa guidance content
- UK-focused blog content

### Student Portal (Planned)

- Student dashboard for application tracking
- Document upload functionality
- Task progress monitoring
- Communication with counselors

### Partner Portal (Planned)

- University partner login
- Referral tracking
- Commission management
- Bulk application processing

### ERP Integration (Planned)

- CRM system integration
- Financial management
- Document processing workflows
- Reporting dashboards