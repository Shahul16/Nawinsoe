# Production Deployment Guide - Nawins Education

## Pre-Deployment Checklist

### Environment Setup
- [ ] Set up production environment variables in `.env`
  - [ ] Database connection string (MySQL)
  - [ ] Google Analytics ID
  - [ ] Google Tag Manager ID
  - [ ] HubSpot Portal ID and API Key
  - [ ] Meta Pixel ID
  - [ ] AWS S3 credentials (if using file uploads)
  - [ ] SMTP configuration for email notifications
  - [ ] Admin email address

### Code Quality
- [ ] All tests passing: `pnpm test`
- [ ] Type checking passes: `pnpm check`
- [ ] Code formatted: `pnpm format`
- [ ] No console errors or warnings
- [ ] No unused dependencies
- [ ] All TODO comments resolved

### SEO Verification
- [ ] Sitemap updated: `/client/public/sitemap.xml`
- [ ] Robots.txt configured: `/client/public/robots.txt`
- [ ] Meta tags verified on all pages
- [ ] Open Graph tags set correctly
- [ ] Canonical URLs implemented
- [ ] Schema markup validated (JSON-LD)
- [ ] Breadcrumbs implemented
- [ ] FAQ schema added (homepage)

### Performance Optimization
- [ ] Images optimized (AVIF/WebP)
- [ ] Fonts preloaded and optimized
- [ ] Code splitting configured
- [ ] Bundle size analyzed: `pnpm build`
- [ ] Lazy loading implemented for routes
- [ ] CSS critical path optimized
- [ ] JavaScript minified
- [ ] Compression enabled (Gzip/Brotli)

### Accessibility
- [ ] WCAG 2.2 AA compliance verified
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified (4.5:1 for text)
- [ ] ARIA labels added
- [ ] Skip link functional
- [ ] Focus states visible
- [ ] Form labels accessible

### Security
- [ ] Environment variables not committed
- [ ] CORS properly configured
- [ ] CSP headers set
- [ ] HTTPS enabled
- [ ] SQL injection prevention verified
- [ ] XSS protection implemented
- [ ] CSRF tokens implemented
- [ ] Input validation on forms
- [ ] API rate limiting configured

### Analytics & Tracking
- [ ] Google Analytics initialized
- [ ] Google Tag Manager initialized
- [ ] Meta Pixel initialized
- [ ] HubSpot form embedded
- [ ] Event tracking verified
- [ ] Conversion tracking tested
- [ ] UTM parameter tracking working

### Database
- [ ] Migrations run successfully
- [ ] Database backed up
- [ ] Schema verified
- [ ] Indexes optimized
- [ ] Relationships verified
- [ ] Sample data loaded

### Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests on critical paths
- [ ] Mobile responsive testing
- [ ] Cross-browser testing
- [ ] Load testing (if applicable)

## Deployment Steps

### 1. Build Production Assets

```bash
# Clean previous builds
rm -rf dist/

# Install dependencies
pnpm install --frozen-lockfile

# Run type checking
pnpm check

# Build frontend
pnpm run build

# Build backend
# (Backend is built as part of pnpm build)
```

### 2. Prepare Server

```bash
# Create production environment file
cp .env.example .env

# Edit .env with production values
nano .env

# Create necessary directories
mkdir -p logs
mkdir -p uploads
```

### 3. Start Application

```bash
# For production
NODE_ENV=production PORT=3000 node dist/index.js

# Or with PM2 for process management
pm2 start dist/index.js --name "nawins" --env production
```

### 4. Verify Deployment

```bash
# Check application is running
curl http://localhost:3000/

# Check API is responding
curl http://localhost:3000/api/trpc/

# Check database connection
curl http://localhost:3000/api/trpc/universities.list

# Monitor logs
pm2 logs nawins
```

### 5. Configure Reverse Proxy (Nginx)

```nginx
upstream nawins {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name nawinsukstudyabroad.com;
  
  # Redirect to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name nawinsukstudyabroad.com;

  # SSL certificates
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;

  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-XSS-Protection "1; mode=block" always;

  # Compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss;

  # Static assets caching
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Proxy to Node.js
  location / {
    proxy_pass http://nawins;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### 6. Enable SSL/TLS with Let's Encrypt

```bash
# Using Certbot
sudo certbot certonly --nginx -d nawinsukstudyabroad.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

## Post-Deployment Verification

### Check Website

1. Visit https://nawinsukstudyabroad.com
2. Verify all pages load correctly
3. Test form submissions
4. Check navigation links
5. Verify contact forms work
6. Test search functionality

### Monitor Performance

```bash
# Run Lighthouse audit
curl -X POST https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://nawinsukstudyabroad.com&key=YOUR_API_KEY
```

### Check Analytics

1. Verify Google Analytics data flowing
2. Check Google Tag Manager events
3. Confirm Meta Pixel tracking
4. Verify HubSpot form submissions

### Database Verification

```bash
# Check database size
SELECT table_schema, SUM(data_length + index_length) / 1024 / 1024 AS size_mb
FROM information_schema.tables
WHERE table_schema = 'nawins_db'
GROUP BY table_schema;

# Verify backups running
ls -lah /path/to/backups/
```

## Monitoring & Maintenance

### Daily Tasks

- [ ] Check error logs
- [ ] Monitor server performance
- [ ] Check database size
- [ ] Verify backups completed

### Weekly Tasks

- [ ] Review analytics data
- [ ] Check for security updates
- [ ] Monitor form submissions
- [ ] Test critical workflows

### Monthly Tasks

- [ ] Full backup verification
- [ ] Performance optimization review
- [ ] Security audit
- [ ] Update dependencies (if safe)

## Scaling Considerations

### When to Scale

- If traffic exceeds server capacity
- If database queries slow down
- If memory usage consistently high
- If response times degrade

### Scaling Options

1. **Vertical Scaling**: Increase server resources
2. **Horizontal Scaling**: Add load balancer + multiple servers
3. **Database Optimization**: Add indexes, optimize queries
4. **CDN**: Use CloudFront for static assets
5. **Caching**: Implement Redis for sessions/data

## Troubleshooting

### Application won't start

```bash
# Check logs
npm log show
node dist/index.js

# Verify environment variables
env | grep VITE_
env | grep DATABASE_URL
```

### Database connection fails

```bash
# Test MySQL connection
mysql -h localhost -u user -p -e "SELECT 1"

# Check credentials in .env
cat .env | grep DATABASE_URL
```

### Performance issues

```bash
# Check server resources
htop

# Check Node.js memory
node --max-old-space-size=4096 dist/index.js

# Profile CPU usage
node --prof dist/index.js
```

### 404 errors on routes

- Verify build output: `ls -la dist/`
- Check routing configuration
- Clear browser cache
- Verify Nginx configuration

## Backup & Recovery

### Automated Backups

```bash
# MySQL backup script
#!/bin/bash
BACKUP_DIR="/path/to/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mysqldump -u user -p database > $BACKUP_DIR/nawins_$TIMESTAMP.sql
gzip $BACKUP_DIR/nawins_$TIMESTAMP.sql
```

### Restore from Backup

```bash
# Restore MySQL database
gunzip < backup_file.sql.gz | mysql -u user -p database

# Restore application files
tar -xzf backup_file.tar.gz -C /opt/nawins/
```

## Rollback Procedure

```bash
# In case of critical issues:

# 1. Stop current application
pm2 stop nawins

# 2. Restore previous version
git checkout previous_tag
pnpm install
pnpm build

# 3. Restart application
pm2 start dist/index.js

# 4. Verify
curl http://localhost:3000/
```

## Additional Resources

- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Google Analytics Setup](https://support.google.com/analytics)
- [HubSpot Integration](https://developers.hubspot.com/)
