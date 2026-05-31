# Deployment Guide - Nawins UK Study Abroad

## Pre-Deployment Checklist

### 1. Environment Setup
```bash
cp .env.example .env
# Edit .env with production values
```

**Required Variables:**
- `DATABASE_URL` - MySQL connection string
- `AWS_*` - S3 credentials (for file uploads)
- `SMTP_*` - Email configuration for admin notifications
- `VITE_ANALYTICS_*` - Analytics endpoints (optional)

### 2. Database Setup
```bash
npm run db:push  # Run migrations
```

### 3. Build for Production
```bash
npm run build   # Creates dist/ folder
```

**Output:**
- `dist/public/` - Static client files (deploy to CDN/static server)
- `dist/index.js` - Production server bundle

### 4. Running the Server
```bash
# Development
npm run dev

# Production
NODE_ENV=production npm start
```

## Deployment Platforms

### Option A: Vercel (Recommended for Full-Stack)
```bash
# 1. Connect repository to Vercel
# 2. Add environment variables in Settings
# 3. Deploy (automatic on git push)
```

### Option B: AWS (EC2/Lambda)
```bash
# 1. Set up EC2 instance with Node.js
# 2. Clone repository
# 3. Install dependencies: pnpm install
# 4. Build: npm run build
# 5. Start: npm start
# 6. Use PM2 for process management
```

### Option C: Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Metrics

- Client Bundle: 472.87 KB (138.82 KB gzipped)
- Server Bundle: 31.7 KB
- Total Gzip: ~140 KB
- Build Time: <2s

## Security Checklist

- [ ] Database credentials in .env (not in git)
- [ ] AWS credentials secured (IAM roles preferred)
- [ ] HTTPS enabled on production
- [ ] CORS configured properly
- [ ] Input validation active
- [ ] SQL injection prevention (Drizzle ORM handles this)

## Monitoring

- Enable analytics: Set `VITE_ANALYTICS_*` in .env
- Monitor server logs
- Set up error tracking (Sentry recommended)
- Monitor database performance

## Troubleshooting

**Analytics not loading?**
- Check `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` in .env
- If not needed, variables can remain empty

**Build fails?**
- Run `npm run check` to verify TypeScript
- Clear node_modules: `rm -rf node_modules && pnpm install`

**Database connection error?**
- Verify `DATABASE_URL` format: `mysql://user:password@host:port/database`
- Check MySQL server is running
- Verify credentials and network access
