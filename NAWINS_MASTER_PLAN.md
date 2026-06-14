# NAWINS EDUCATION — Complete Strategic & Technical Master Plan
**Version 2.0 | June 2026 | Confidential**

---

## PART 1 — EXECUTIVE REVIEW SCORES

| Area | Score | Notes |
|------|-------|-------|
| Business Strategy | 9/10 | Strong vision, clear UK focus |
| Website Architecture | 8.5/10 | Solid React/tRPC foundation |
| CRM Planning | 8/10 | Pipeline is real, needs extra stages |
| Operations Framework | 8.5/10 | Good structure, needs role expansion |
| Marketing Strategy | 6.5/10 | Too light — no content calendar |
| Information Security | 4/10 | CRITICAL: credentials in documents |
| Financial Planning | 5/10 | Targets unaligned with KPIs |
| Data Governance | 5/10 | No DPDPA/UK GDPR plan |
| Investor Readiness | 7/10 | Needs revenue projections |
| **Overall** | **8/10** | Strong foundation, 3 critical gaps |

---

## PART 2 — CRITICAL ISSUES (FIX IMMEDIATELY)

### CRITICAL #1 — Credentials in Documents
All documents containing passwords must be treated as compromised.

**Action required TODAY:**
1. Change ALL passwords listed in any shared document
2. Transfer all credentials to Bitwarden (free) or 1Password
3. Share access only with Directors — never in WhatsApp or Google Docs
4. Enable 2FA on every account: Google Workspace, HubSpot, Hostinger, GitHub, social media

**Accounts to change immediately:**
- nawins.oe@gmail.com
- drkchandrakumar@nawinsoe.com / info@nawinsoe.com
- chandrakumar@nawinsedutech.com / harshini@nawinsedutech.com
- Instagram / Facebook / LinkedIn / X
- Hostinger dashboard

---

### CRITICAL #2 — Growth Targets vs KPI Mismatch

**The problem:**
| Year | Students Target | Required Leads (at 5% conversion) | Current KPI |
|------|----------------|-----------------------------------|-------------|
| 2026 | 50 | 1,000 | 100/month ✅ |
| 2027 | 100 | 2,000 | 100/month ❌ |
| 2028 | 250 | 5,000 | 100/month ❌ |
| 2029 | 500 | 10,000 | 100/month ❌ |
| 2030 | 1,000 | 20,000 | 100/month ❌ |

**The fix — revised KPI targets:**
| Year | Students | Leads/Month Needed | Conversion Target |
|------|----------|-------------------|-------------------|
| 2026 | 50 | 85/month | 5% |
| 2027 | 100 | 170/month | 5% |
| 2028 | 250 | 420/month | 5% |
| 2029 | 500 | 840/month | 5% |
| 2030 | 1,000 | 1,700/month | 5% |

**Revenue projections (at ₹75,000 avg commission):**
| Year | Students | Revenue |
|------|----------|---------|
| 2026 | 50 | ₹37.5 lakh |
| 2027 | 100 | ₹75 lakh |
| 2028 | 250 | ₹1.87 crore |
| 2029 | 500 | ₹3.75 crore |
| 2030 | 1,000 | ₹7.5 crore |

---

### CRITICAL #3 — CRM Pipeline Missing Stages

**Current stages:**
Lead → Consultation → Documents → Application → Offer Letter → Interview → Payment → CAS → Visa → Travel → Enrollment

**Add these stages:**
| New Stage | Purpose |
|-----------|---------|
| Qualified Lead | Confirmed budget + eligibility |
| Follow Up Scheduled | Needs nurturing — not ready |
| Deferred Intake | Moving to next intake |
| Application Rejected | University declined |
| Visa Rejected | UKVI refused |
| Lost Lead | Not proceeding |
| Alumni | Enrolled — ongoing relationship |

**Add these fields to every deal:**
- Lead Source (website / referral / social / walk-in)
- Counsellor Assigned
- Preferred Intake (Jan / May / Sep + Year)
- IELTS Score
- Budget Range
- Commission Amount
- Commission Received Date

---

## PART 3 — WEBSITE GAPS & NEW PAGES NEEDED

### Phase 1 — Launch (Immediate)
These pages are built ✅:
- Home, About, Services, Destinations (UK/Canada/Australia/Ireland/Germany/France/Netherlands/NZ)
- Universities (Top 50 QS), Success Stories, Blog (admin CMS), Careers, Contact
- Book Consultation (Google Calendar), FAQ, Gallery, Legal (Privacy/Terms/Cookies)

### Phase 2 — High Priority (30–60 days)

**Free Assessment Form** `/free-assessment`
Fields: Name, Phone, Email, Country of Interest, Highest Qualification, IELTS/PTE Score, Budget Range, Preferred Intake
→ Goes directly to HubSpot as a deal at "Qualified Lead" stage

**Eligibility Checker** `/eligibility-checker`
4-step wizard:
1. Education level (10th/12th/Diploma/Graduate/PG)
2. Target country (UK/Canada/Australia/Ireland/Germany)
3. Budget range (₹15-25L / ₹25-50L / ₹50L+)
4. English test (IELTS / Not Yet / Plan to take)
→ Shows matching universities with "Apply Now" CTA

**Scholarships Page** `/scholarships`
Subpages: /scholarships/uk, /scholarships/canada, /scholarships/australia
Each scholarship: Name, Amount, University, Eligibility, Deadline, Apply link

**Course Pages** `/courses`
High-traffic SEO pages:
/courses/mba, /courses/msc-data-science, /courses/nursing, /courses/engineering, /courses/cyber-security
Each: Overview, Top Universities offering it, Fees, Career outcomes, Apply CTA

### Phase 3 — Growth (60–120 days)

**Student Portal** `/student/dashboard`
Login with email/OTP → See application status, documents, visa progress, messages

**University Detail Pages** `/universities/[slug]`
Example: /universities/university-of-greenwich
Sections: Overview, Rankings, Courses offered, Fees, Scholarships, Apply through Nawins

**AI Counsellor Chatbot** (widget)
Powered by Claude API — answers common questions, qualifies leads, books consultations

---

## PART 4 — DATABASE SCHEMA ADDITIONS NEEDED

Tables to add:
```sql
-- blogs (for blog admin CMS)
CREATE TABLE blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  category VARCHAR(100),
  author VARCHAR(255) DEFAULT 'Nawins Education',
  readTime VARCHAR(50),
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  imageUrl VARCHAR(500),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

-- scholarships
CREATE TABLE scholarships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  university VARCHAR(255),
  amount VARCHAR(100),
  eligibility TEXT,
  deadline DATE,
  applyUrl VARCHAR(500),
  createdAt TIMESTAMP DEFAULT NOW()
);

-- consultations
CREATE TABLE consultations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  preferredDate DATE,
  preferredTime VARCHAR(50),
  destination VARCHAR(100),
  qualification VARCHAR(100),
  ieltsScore VARCHAR(20),
  budget VARCHAR(100),
  calendarEventId VARCHAR(255),
  status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT NOW()
);
```

---

## PART 5 — SEO KEYWORD STRATEGY

**Primary keywords (Tamil Nadu / India focus):**
- "study in UK from Tamil Nadu"
- "UK student visa consultant Namakkal"
- "overseas education consultancy Tiruchengode"
- "UK university admission consultants India"
- "study abroad consultants Tamil Nadu"

**Secondary keywords:**
- "University of Greenwich admissions India"
- "Ulster University London application"
- "UK student visa 2026 Tamil Nadu"
- "IELTS coaching Tiruchengode"
- "MSc UK from India"

**Blog content calendar (weekly posts):**
| Week | Topic | Target Keyword |
|------|-------|---------------|
| 1 | UK Student Visa Guide 2026 | uk student visa 2026 india |
| 2 | Top 10 UK Universities for Indian Students | uk universities for indian students |
| 3 | IELTS Score Requirements for UK | ielts score for uk university |
| 4 | How to Write a Strong SOP | sop for uk university |
| 5 | University of Greenwich Review | university of greenwich admissions india |
| 6 | CAS Process Explained | cas student visa uk |
| 7 | Scholarships for Indian Students in UK | scholarships uk 2026 indian students |
| 8 | Cost of Studying in UK | cost of studying in uk for indian students |

---

## PART 6 — MARKETING ENGINE

### Social Media Plan

**Instagram (3 posts/week):**
- Monday: Student visa approval 🎉 (real student, with permission)
- Wednesday: Study abroad tip or UK university info
- Friday: Motivational quote + Nawins branding

**YouTube (1 video/week):**
- Visa approval reactions
- University campus tours
- "Day in the life" UK student stories
- IELTS tips
- Q&A sessions

**LinkedIn (2 posts/week):**
- University partnership announcements
- Industry news (UK education policy updates)
- Team/company updates

**WhatsApp Broadcasts (weekly):**
- Scholarship alerts
- Intake deadlines
- Visa approval celebrations

---

## PART 7 — INFORMATION SECURITY PLAN

### Immediate Actions
1. **Password Manager**: Set up Bitwarden (free for teams)
2. **2FA**: Enable on all accounts — Google, HubSpot, Hostinger, GitHub
3. **Document Policy**: No credentials in Google Docs, WhatsApp, email
4. **Access Control**: Create role-based access in Google Workspace

### Data Protection (India DPDPA + UK GDPR)
- Add explicit cookie consent banner to website
- Privacy Policy must mention: what data collected, how stored, how long retained
- Student documents (passport, transcripts) must be stored encrypted
- Right to deletion — must be able to delete student data on request
- Do not share student PII with third parties without consent

---

## PART 8 — UNIVERSITY PARTNERSHIP TIERS

| Tier | Universities | Commission | Priority |
|------|-------------|------------|---------|
| A (Active) | Greenwich, Roehampton, UEL, Ulster, UWS, Univ. of Law | 15-20% | High |
| B (In Progress) | Chester, Wolverhampton, Portsmouth, Regent College | 12-15% | Medium |
| C (Target) | Hertfordshire, Coventry, Anglia Ruskin, Middlesex | 10-12% | Phase 2 |

---

## PART 9 — HR EXPANSION ROADMAP

| Year | Headcount | New Roles |
|------|-----------|-----------|
| 2026 (now) | 4 | Add: CRM Administrator |
| 2027 | 8 | Add: SEO Specialist, 2nd Counsellor, Visa Officer |
| 2028 | 15 | Add: University Relations Manager, Content Writer, IT Admin |
| 2029 | 25 | Add: Regional Manager, Finance Manager, Partner Manager |
| 2030 | 40 | UK Office Team (3-5 people) |

---

## PART 10 — 30-DAY LAUNCH CHECKLIST

### Week 1
- [ ] Deploy website to Vercel
- [ ] Point nawinsedutech.com DNS to Vercel
- [ ] Set up all .env production values
- [ ] Test all forms → HubSpot CRM
- [ ] Set up n8n + whapi.cloud for WhatsApp
- [ ] Verify GA4 tracking
- [ ] Change all passwords → Bitwarden

### Week 2
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile (all fields correct)
- [ ] Publish first 4 blog posts
- [ ] Set up WhatsApp Business quick replies
- [ ] Add 5+ photos to Google Business Profile
- [ ] Create HubSpot pipeline with all stages

### Week 3
- [ ] Launch Facebook + Instagram + LinkedIn + YouTube
- [ ] Start weekly content schedule
- [ ] Set up WhatsApp Broadcast audience list
- [ ] Build Free Assessment form (Phase 2)

### Week 4
- [ ] Review analytics — first 30-day report
- [ ] Optimise top landing pages based on data
- [ ] Begin university database expansion
- [ ] Plan Student Portal roadmap

---

*Document classification: Internal — Board Level*
*Prepared by: Shahul Hameed, Technology Consultant*
*Review date: Quarterly*
