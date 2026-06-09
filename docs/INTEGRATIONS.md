# INTEGRATIONS

## Integration Architecture

NAWINS Edutech website is configured with multiple integrations for analytics, CRM, and communications.

## Google Analytics 4

### Configuration
- **Environment Variable**: `VITE_GOOGLE_ANALYTICS_ID`
- **Initialization**: `client/src/lib/analytics.ts` - `initializeGoogleAnalytics()`
- **Events Tracked**:
  - Page views
  - Lead capture
  - Form submissions
  - UTM parameters

### Setup Instructions
1. Create GA4 property in Google Analytics
2. Get Measurement ID (format: GA-XXXXXXXXX-X)
3. Add to `.env` file: `VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX-X`

## Google Tag Manager

### Configuration
- **Environment Variable**: `VITE_GTM_ID`
- **Initialization**: `client/src/lib/analytics.ts` - `initializeGTM()`

### Setup Instructions
1. Create GTM container
2. Get Container ID (format: GTM-XXXXXXX)
3. Add to `.env` file: `VITE_GTM_ID=GTM-XXXXXXX`

## Meta Pixel

### Configuration
- **Environment Variable**: `VITE_META_PIXEL_ID`
- **Initialization**: `client/src/lib/analytics.ts` - `initializeMetaPixel()`

### Setup Instructions
1. Create Meta Pixel in Facebook Events Manager
2. Get Pixel ID
3. Add to `.env` file: `VITE_META_PIXEL_ID=your-pixel-id`

## HubSpot CRM

### Configuration
- **Environment Variable**: `VITE_HUBSPOT_PORTAL_ID`
- **Initialization**: `client/src/lib/crm.ts` - `initializeHubSpot()`

### Features
- Lead capture via `trackLeadCapture()`
- Form embedding via `embedHubSpotForm()`
- Identity tracking via `hbspt.identify()`

### Setup Instructions
1. Create HubSpot account
2. Get Portal ID from HubSpot settings
3. Add to `.env` file: `VITE_HUBSPOT_PORTAL_ID=your-portal-id`
4. Configure HubSpot forms if needed

## WhatsApp Business

### Configuration
- **Phone Number**: `+91 99437 38177` (hardcoded)
- **Integration Point**: `client/src/components/CTASection.tsx`

### Features
- Quick contact button in all CTAs
- WhatsApp link: `https://wa.me/919943738177`

## Contact Forms

### Primary Form
- **Location**: `/contact` page
- **Fields**: Name, Email, Phone, Subject, Message
- **Submission**: tRPC mutation via `/api/trpc/inquiries.create`
- **Validation**: Zod schema in `server/routes/app.router.ts`

### Newsletter Form
- **Location**: `/blogs` page
- **Fields**: Email (required), Name (optional), Interests (optional)
- **Submission**: tRPC mutation via `/api/trpc/newsletter.subscribe`

## Email Configuration

### SMTP Settings
- **Host**: `SMTP_HOST` - SMTP server address
- **Port**: `SMTP_PORT` - 587 (TLS)
- **User**: `SMTP_USER` - Email address
- **Password**: `SMTP_PASSWORD` - App password
- **Admin Email**: `ADMIN_EMAIL` - Notification recipient

### Usage
- Owner notifications on new inquiries
- Newsletter subscription confirmations
- Task completion alerts

## Environment Variables Required

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/nawins_db

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX-X
VITE_GTM_ID=GTM-XXXXXXX
VITE_META_PIXEL_ID=your-pixel-id

# HubSpot
VITE_HUBSPOT_PORTAL_ID=your-portal-id

# AWS (for file uploads)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@nawins.com
```

## Integration Status

| Integration | Status | Notes |
|-------------|--------|-------|
| Google Analytics 4 | ✅ Configured | Ready for GA ID |
| Google Tag Manager | ✅ Configured | Ready for GTM ID |
| Meta Pixel | ✅ Configured | Ready for Pixel ID |
| HubSpot CRM | ✅ Configured | Ready for Portal ID |
| WhatsApp | ✅ Active | Working phone link |
| SMTP Email | ✅ Configured | Ready for credentials |
| AWS S3 | ✅ Configured | For file uploads |