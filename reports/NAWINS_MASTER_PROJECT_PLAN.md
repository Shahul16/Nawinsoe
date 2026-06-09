# NAWINS MASTER PROJECT PLAN

## SECTION 1: EXECUTIVE SUMMARY

### Current Project Status
The Nawins Edutech website is in a **transition phase** - previously cleaned up with duplicate files removed, TypeScript errors fixed, and build passing. The core infrastructure is in place but significant content and feature gaps remain.

### Existing Strengths
- ✅ Modern tech stack (React 19, tRPC, Drizzle ORM)
- ✅ Clean component organization
- ✅ Type-safe API endpoints
- ✅ Responsive design foundation
- ✅ Analytics integration ready
- ✅ HubSpot CRM integration structure
- ✅ Contact form working
- ✅ University database schema

### Existing Weaknesses
- ❌ Missing destination pages (Germany, France, Netherlands, New Zealand)
- ❌ Missing careers page
- ❌ Blog posts not individual pages (link to /contact)
- ❌ Limited testimonial quantity
- ❌ No team profiles
- ❌ Missing trust certifications
- ❌ No university detail pages
- ❌ Placeholder emoji content

### Readiness Scores

| Category | Score | Notes |
|----------|-------|-------|
| **Launch Readiness** | 45/100 | Core site works, missing key pages |
| **Business Readiness** | 35/100 | Missing destination content, limited testimonials |
| **Technical Readiness** | 85/100 | Build passes, clean architecture |

---

## SECTION 2: FINAL WEBSITE ARCHITECTURE

### Complete Sitemap

```
/ (HOME)
├── /about
│   ├── /company-profile
│   ├── /founder-message
│   ├── /mission-vision
│   └── /why-choose-nawins
├── /services
│   ├── /study-abroad-counselling
│   ├── /university-admissions
│   ├── /ielts-coaching
│   ├── /visa-assistance
│   ├── /sop-documentation
│   ├── /scholarship-guidance
│   └── /education-loan-guidance
├── /destinations
│   ├── /study-in-uk
│   ├── /study-in-canada
│   ├── /study-in-australia
│   ├── /study-in-ireland
│   ├── /study-in-germany
│   ├── /study-in-france
│   ├── /study-in-netherlands
│   └── /study-in-new-zealand
├── /universities
│   ├── /uk-universities
│   ├── /canada-universities
│   ├── /australia-universities
│   └── /ireland-universities
├── /courses
│   ├── /business
│   ├── /it-computer-science
│   ├── /engineering
│   ├── /healthcare
│   ├── /hospitality
│   └── /data-science
├── /success-stories
├── /blog
├── /careers
├── /book-consultation
└── /contact
```

### Current Routes vs Required Routes

| Required Route | Current Route | Status |
|----------------|---------------|--------|
| / | / | ✅ Available |
| /about | /about | ✅ Available |
| /about/company-profile | /about | Partial |
| /about/founder-message | Missing | ❌ Missing |
| /about/mission-vision | /about | Partial |
| /about/why-choose-nawins | /about | Partial |
| /services | /services | ✅ Available |
| /destinations | /destinations | ✅ Available |
| /study-in-uk | /study-in-uk | ✅ Available |
| /study-in-canada | /study-in-canada | ✅ Available |
| /study-in-australia | /study-in-australia | ✅ Available |
| /study-in-ireland | /study-in-ireland | ✅ Available |
| /study-in-germany | Missing | ❌ Missing |
| /study-in-france | Missing | ❌ Missing |
| /study-in-netherlands | Missing | ❌ Missing |
| /study-in-new-zealand | Missing | ❌ Missing |
| /universities | /universities | ✅ Available |
| /success-stories | /success-stories | ✅ Available |
| /blog | /blogs | ✅ Available |
| /careers | Missing | ❌ Missing |
| /book-consultation | Missing | ❌ Missing |
| /contact | /contact | ✅ Available |

---

## SECTION 3: CONTENT REQUIREMENTS

### Content Checklist

#### HOMEPAGE
| Content | Status |
|---------|--------|
| Hero headline | ✅ "Empowering Minds. Building Futures." |
| Hero subheading | ✅ Complete |
- Hero CTA buttons | ✅ Apply Now, Book Consultation |
| Statistics section | ✅ 5000+ students, 100+ partners |
| Services section | ✅ Available via ServicesGrid |
| Destinations section | ✅ Available via Destinations |
| Partners wall | ✅ Available via PartnersWall |
| Journey timeline | ✅ Available via JourneyTimeline |
| Testimonials | ✅ Available (limited count) |
| Contact form premium | ✅ Available |

#### ABOUT
| Content | Status |
|---------|--------|
| Company story | ✅ Available |
| Mission & Values | ✅ Available |
| Why Choose Us | ✅ Available |
| Founder message | ❌ Missing |
| Company profile | ❌ Missing (separate page) |

#### SERVICES
| Content | Status |
|---------|--------|
| Free Counseling | ✅ Available |
| Course & University ID | ✅ Available |
| Test Preparation | ✅ Available |
| Application & Visa Support | ✅ Available |
| Scholarship Guidance | ❌ Missing |
| Education Loan Guidance | ❌ Missing |
| SOP Documentation | ❌ Missing |

#### DESTINATIONS
| Content | Status |
|---------|--------|
| UK content | ✅ Available |
| Canada content | ✅ Available |
| Australia content | ✅ Available |
| Ireland content | ✅ Available |
| Germany content | ❌ Missing |
| France content | ❌ Missing |
| Netherlands content | ❌ Missing |
| New Zealand content | ❌ Missing |

#### UNIVERSITIES
| Content | Status |
|---------|--------|
| UK Universities | ✅ 8 in database |
| Search functionality | ✅ Available |
| Detail pages | ❌ Missing |
| Rankings | ✅ Partial |
| Logos | ❌ Missing |

#### BLOG
| Content | Status |
|---------|--------|
| 8 blog posts (static) | ✅ Available |
| Individual post pages | ❌ Missing |
| Categories | ✅ Available |
| Search | ✅ Available |
| Newsletter signup | ✅ Available |

#### SUCCESS STORIES
| Content | Status |
|---------|--------|
| 6 student stories | ✅ Available |
| Photos | ❌ Missing (emoji placeholders) |
| More stories needed | ❌ Missing (~50+ needed) |

#### CONTACT
| Content | Status |
|---------|--------|
| Contact form | ✅ Available |
| Office hours | ✅ Available |
| Location | ✅ Available |
| Quick contact CTA | ✅ Available |

---

## SECTION 4: CRM ARCHITECTURE

### Complete CRM Flow

```
Lead Created
   ↓
Lead Contacted
   ↓
Counselling Session Scheduled
   ↓
Document Collection
   ↓
Application Submission
   ↓
Offer Letter Received
   ↓
CAS Processing
   ↓
Visa Filing
   ↓
Visa Approval
   ↓
Pre Departure
   ↓
Student Travel
   ↓
Post Arrival
```

### Data Fields

#### Student Profile Structure
| Field | Type | Required |
|-------|------|----------|
| id | UUID | Auto |
| name | String | Yes |
| email | String | Yes |
| phone | String | Yes |
| location | String | No |
| highestEducation | Enum | Yes |
| workExperience | Enum | Yes |
| targetCountry | Enum | Yes |
| targetCourse | String | No |
| targetUniversity | String | No |
| intakePeriod | String | Yes |
| budgetRange | Enum | No |
| passportStatus | Enum | Yes |
| englishTest | Enum | No |
| testScore | Number | No |
| source | String | Yes (UTM) |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

#### Lead Structure
| Field | Type | Required |
|-------|------|----------|
| leadId | UUID | Auto |
| name | String | Yes |
| email | String | Yes |
| phone | String | No |
| preferredCourse | String | No |
| message | Text | No |
| status | Enum | Yes |
| assignedCounselor | String | No |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

#### Notes Structure
| Field | Type |
|-------|------|
| noteId | UUID |
| leadId | UUID (FK) |
| counselorName | String |
| noteText | Text |
| createdAt | DateTime |

#### Follow-up Structure
| Field | Type |
|-------|------|
| followUpId | UUID |
| leadId | UUID (FK) |
| type | Enum (call/email/meeting) |
| scheduledAt | DateTime |
| status | Enum (pending/completed/missed) |
| notes | Text |

---

## SECTION 5: LEAD CAPTURE SYSTEM

### Quick Enquiry Form
| Field | Type | Validation |
|-------|------|------------|
| name | Text | Required, min 2 chars |
| email | Email | Required, valid format |
| phone | Tel | Required, 10 digits |
| destination | Select | Required, country list |
| submit | Button | Honeypot protection |

### Book Consultation Form
| Field | Type | Validation |
|-------|------|------------|
| name | Text | Required |
| email | Email | Required |
| phone | Tel | Required |
| preferredDate | Date | Required |
| preferredTime | Select | Required |
| courseInterest | Text | Required |
| submit | Button | Honeypot protection |

### Call Back Request
| Field | Type | Validation |
|-------|------|------------|
| name | Text | Required |
| phone | Tel | Required |
| bestTime | Select | Required |
| submit | Button | |

### University Matching Form
| Field | Type | Validation |
|-------|------|------------|
| name | Text | Required |
| email | Email | Required |
| phone | Tel | Required |
| educationLevel | Select | Required |
| fieldOfStudy | Select | Required |
| gpa | Number | Optional |
| budget | Range | Optional |
| country | Multi-select | Required |
| submit | Button | |

### Contact Form (Existing)
| Field | Type | Validation |
|-------|------|------------|
| name | Text | Required |
| email | Email | Required |
| phone | Tel | Optional |
| subject | Text | Required |
| message | Textarea | Required, max 2000 chars |

---

## SECTION 6: SEO STRATEGY

### Primary Keywords & Pages

#### Study in UK
- **Keywords**: study in uk, uk universities, uk education, pswoffer, uk student visa
- **Title**: "Study in UK | Best UK Education Consultant | Nawins Edutech"
- **Meta**: "Expert guidance for studying in the United Kingdom. Get admission to top UK universities with our proven counseling."

#### Study in Canada
- **Keywords**: study in canada, canada education, canadian universities, pgwp
- **Title**: "Study in Canada | Canada Education Consultant | Nawins Edutech"
- **Meta**: "Canada study guidance with PR pathways. Get expert counseling for Canadian universities and visas."

#### Study in Australia
- **Keywords**: study in australia, australia education, anu, unsw, monash
- **Title**: "Study in Australia | Australia Education Consultant | Nawins Edutech"
- **Meta**: "Study in Australia with Nawins. Best universities in Australia and visa guidance."

#### Study Abroad Consultant Tamil Nadu
- **Keywords**: overseas education consultant tamil nadu, education consultant namakkal
- **Title**: "Best Overseas Education Consultant in Tamil Nadu | Nawins"
- **Meta**: "Top education consultant in Tamil Nadu. Expert guidance for UK, Canada, Australia study."

#### Best Overseas Education Consultant
- **Keywords**: best overseas education consultant, top education consultant india
- **Title**: "Best Overseas Education Consultant | Nawins Edutech"
- **Meta**: "India's trusted overseas education consultant. 95% visa success rate."

### Internal Linking Strategy
- Homepage → Destinations → Universities → Contact
- Services → Contact (counselling)
- Success Stories → Contact (inspiration)
- Blog → Contact (lead magnet)
- Footer cross-links all main pages

---

## SECTION 7: BLOG STRATEGY

### First 50 Blog Ideas

#### UK (Priority 1)
1. Complete Guide to UK University Applications 2024
2. UK Student Visa Requirements and Process
3. Top 10 UK Universities for Indian Students
4. UK Post-Study Work Visa (PSW) Guide
5. Cost of Studying in UK for Indian Students
6. UK Intake Periods Explained
7. UK Application Deadlines 2024
8. Living in UK as an Indian Student
9. UK University Rankings Explained
10. Scholarships for UK Study

#### Canada (Priority 2)
11. Complete Guide to Canada Study Permit
12. Top Canadian Universities for Indian Students
13. Canada PGWP Rules and Benefits
14. Cost of Studying in Canada
15. Canada Study Visa Requirements
16. Canadian Education System Explained
17. Scholarships in Canada for Indians
18. Canada Intake Periods 2024
19. Life in Canada for Indian Students
20. Pathway from Canada Study to PR

#### Australia (Priority 3)
21. Australia Student Visa (Subclass 500) Guide
22. Top Australian Universities Rankings
23. Cost of Studying in Australia
24. Australia Post-Study Work Rights
25. Australian Education System
26. Scholarships in Australia
27. Australia Intake Periods
28. Living Costs in Australia Cities

#### Visa (Priority 4)
29. UK Visa Interview Tips
30. Canada Visa Document Checklist
31. Australia Visa Processing Time
32. Ireland Visa Requirements
33. Germany Visa for Students
34. France Student Visa Guide
35. Netherlands Student Visa

#### IELTS (Priority 5)
36. IELTS Preparation Tips
37. IELTS Score Requirements by Country
38. IELTS vs TOEFL Comparison
39. IELTS Writing Task 2 Guide
40. IELTS Band 7 Preparation Plan

#### Scholarships (Priority 6)
41. Chevening Scholarship Guide
42. Commonwealth Scholarship
43. University of Melbourne Scholarships
44. University of Toronto Funding
45. Rhodes Scholarship
46. Full Scholarship Programs in UK
47. Canada Scholarships for International Students
48. Australia Awards Scholarship

#### General Education
49. How to Choose Your University
50. SOP Writing Tips for Applications

---

## SECTION 8: UNIVERSITY SECTION

### University Listing Structure
| Element | Details |
|---------|---------|
| Search Bar | Keyword search by name/location |
| Filters | Country, Ranking, Course |
| Sort | By ranking, name |
| Card Display | Logo, Name, Location, Ranking |

### University Details Page
| Element | Details |
|---------|---------|
| Hero Banner | University image/name |
| Overview | Description, Year founded |
| Location Info | City, Country, Campus map |
| Rankings | QS, Times, World rankings |
| Courses | Popular courses list |
| Admission Requirements | GPA, Tests, Documents |
| Tuition Fees | International student fees |
| Scholarships | Available scholarships |
| Intakes | January, September dates |
| Application Process | Step-by-step guide |

---

## SECTION 9: SUCCESS STORIES

### Success Story Structure

| Field | Type |
|-------|------|
| Student Name | String |
| Photo | Image URL |
| Background | Education level |
| Target Country | Flag/Name |
| University | Name |
| Program | Course name |
| Visa Status | Approved/Process |
| Achievement | Scholarship/Offer |
| Testimonial | Quote |
| Current Status | Employment/Study |

### Required for 50+ Stories
- 15 UK students
- 15 Canada students  
- 10 Australia students
- 5 Ireland students
- 5 Other destinations
- Professional photos
- Verified employment outcomes

---

## SECTION 10: ANALYTICS

### Integration Plan

| Tool | Status | Implementation |
|------|--------|--------------|
| Google Analytics 4 | Ready | VITE_GOOGLE_ANALYTICS_ID |
| Google Search Console | Required | Verify property |
| Meta Pixel | Ready | VITE_META_PIXEL_ID |
| Microsoft Clarity | Optional | Add script |
| Conversion Tracking | Ready | Form submissions |

### Events to Track
- form_submit (contact, consultation)
- newsletter_subscribe
- page_view (all pages)
- utm_tracking
- lead_capture

---

## SECTION 11: COMMUNICATIONS

### Integration Plan

| Channel | Status | Details |
|---------|--------|---------|
| WhatsApp | Active | wa.me/919943738177 |
| Email | Ready | SMTP configured |
| Contact Forms | Active | /contact working |
| Consultation Booking | Needed | Calendar integration |
| Notifications | Active | Owner alerts |

---

## SECTION 12: DESIGN SYSTEM

### Brand Colors
| Color | Value | Usage |
|-------|--------|-------|
| Primary Blue | #04133a | Headers, buttons |
| Secondary Blue | #17337d | Links, accents |
| Accent Gold | #C59D50 | CTAs, highlights |
| Success Green | #10b981 | Visa status |
| Background | #f7f9ff | Page background |

### Typography
- Headings: System fonts, bold
- Body: System fonts, regular
- Responsive sizing with Tailwind

### Spacing
- Container padding: responsive
- Section gaps: py-20
- Card gaps: gap-8

### Button Styles
- Primary: Gold gradient, dark text
- Secondary: Outline white
- WhatsApp: Green solid

### Mobile Responsiveness
- Mobile-first Tailwind
- Hamburger menu
- Stacked layouts on mobile

---

## SECTION 13: REPOSITORY STRUCTURE REVIEW

### Good Structure
- ✅ Clean page organization (pages/home/, pages/about/)
- ✅ Component separation (layout, navigation, premium)
- ✅ Type-safe tRPC API
- ✅ Drizzle ORM migrations
- ✅ Environment variable configuration

### Needs Improvement
- ❌ No /careers page
- ❌ No /book-consultation page
- ❌ Blog posts need individual pages
- ❌ Missing destination pages
- ❌ Limited testimonial count

### Future Refactoring Opportunities
- Move premium components to features/destinations/
- Add proper university detail routes
- Create course-specific pages
- Implement admin dashboard

---

## SECTION 14: LAUNCH CHECKLIST

### Pre-Launch Items

| Category | Item | Status |
|----------|------|--------|
| Content | All 8 destinations covered | ❌ Missing 4 |
| Content | 50+ testimonials | ❌ 6 available |
| Content | Careers page | ❌ Missing |
| SEO | Meta descriptions all pages | ❌ Missing |
| SEO | XML sitemap | ✅ Available |
| CRM | Lead forms working | ✅ Working |
| CRM | Email notifications | ✅ Configured |
| Analytics | GA4 property | ❌ Not verified |
| Analytics | Search Console | ❌ Not verified |
| Performance | Lighthouse >90 | ❌ Unknown |
| Security | SSL certificate | ❌ Not configured |
| Testing | Form submissions | ✅ Working |
| Deployment | Production build | ✅ Passing |

---

## SECTION 15: IMPLEMENTATION ROADMAP

### Phase 1 - Core Website
| Item | Priority | Hours | Dependencies | Outcome |
|------|----------|-------|--------------|---------|
| Create missing destination pages | High | 24 | Content research | 4 new pages |
| Create careers page | High | 8 | Job listings | 1 new page |
| Update blog to individual pages | High | 16 | Content writing | 8 blog pages |
| Add university detail pages | Medium | 12 | University data | 8 pages |
| Add more testimonials | Medium | 16 | Student interviews | 50+ stories |

**Phase 1 Total: 76 hours**

### Phase 2 - CRM
| Item | Priority | Hours | Dependencies | Outcome |
|------|----------|-------|--------------|---------|
| Design lead scoring | Medium | 8 | CRM logic | Scoring system |
| Add follow-up tracking | Medium | 6 | Database schema | Follow-up system |
| Create admin dashboard | Medium | 12 | Auth system | Counselor portal |
| Integrate calendar booking | Medium | 8 | Calendar API | Booking system |

**Phase 2 Total: 34 hours**

### Phase 3 - Lead Management
| Item | Priority | Hours | Dependencies | Outcome |
|------|----------|-------|--------------|---------|
| Email nurture sequences | High | 6 | SMTP config | Automated emails |
| WhatsApp integration | Medium | 4 | WhatsApp API | Messaging |
| Lead assignment rules | Medium | 4 | CRM design | Auto-assignment |
| Source tracking | High | 2 | UTM params | Attribution |

**Phase 3 Total: 16 hours**

### Phase 4 - Content
| Item | Priority | Hours | Dependencies | Outcome |
|------|----------|-------|--------------|---------|
| Write 50 blog posts | High | 80 | Research | Content library |
| Add destination guides | High | 24 | Research | 4 guides |
| Team profiles | Medium | 8 | Staff info | 5 profiles |
| Certification badges | Medium | 4 | Certificates | Trust signals |
| Video testimonials | Medium | 8 | Recording | Multimedia |

**Phase 4 Total: 124 hours**

### Phase 5 - SEO
| Item | Priority | Hours | Dependencies | Outcome |
|------|----------|-------|--------------|---------|
| Meta descriptions | High | 6 | Content | All pages optimized |
| Open Graph tags | High | 4 | Images | Social sharing |
| Schema markup | High | 6 | JSON-LD | Rich results |
| Internal linking | Medium | 4 | Site map | Cross-linking |
| Verify Search Console | High | 2 | GSC | Indexed |

**Phase 5 Total: 22 hours**

### Phase 6 - Analytics
| Item | Priority | Hours | Dependencies | Outcome |
|------|----------|-------|--------------|---------|
| GA4 setup | High | 2 | GA account | Analytics |
| Meta Pixel | High | 2 | Meta account | Facebook |
| Conversion events | High | 2 | Events | Tracking |
| Clarity integration | Low | 2 | MS account | Heatmaps |

**Phase 6 Total: 8 hours**

### Phase 7 - Testing
| Item | Priority | Hours | Dependencies | Outcome |
|------|----------|-------|--------------|---------|
| Unit tests | High | 16 | Test setup | Coverage |
| Integration tests | High | 8 | Tests | API tests |
| E2E flows | Medium | 12 | Cypress | User flows |
| Accessibility | High | 4 | axe | A11y score |
| Performance | Medium | 4 | Lighthouse | 90+ score |

**Phase 7 Total: 44 hours**

### Phase 8 - Launch
| Item | Priority | Hours | Dependencies | Outcome |
|------|----------|-------|--------------|---------|
| Production deploy | High | 4 | All phases | Live site |
| DNS configuration | High | 2 | Domain | nawinsedutech.com |
| SSL certificate | High | 2 | Cert provider | HTTPS |
| Monitoring setup | High | 4 | Tools | Alerts |
| Go-live announcement | Medium | 2 | Social | Marketing |

**Phase 8 Total: 14 hours**

### **Total Project Effort: 314 hours**

---

## SECTION 16: FINAL PENDING ITEMS

### Critical (Must Have Before Launch)
| Item | Effort |
|------|--------|
| Create 4 missing destination pages | 24h |
| Create careers page | 8h |
| Add meta descriptions to all pages | 6h |
| Verify GA4 and Search Console | 4h |
| SSL certificate | 2h |

### Important (Should Have)
| Item | Effort |
|------|--------|
| 50+ testimonials | 16h |
| Individual blog pages | 16h |
| More university data | 8h |
| Team profiles | 8h |
| Certification badges | 4h |

### Optional (Nice to Have)
| Item | Effort |
|------|--------|
| Video testimonials | 8h |
| Calendar booking | 8h |
| Admin dashboard | 12h |
| Microsoft Clarity | 2h |
| Multi-language support | 20h |

---

**Reports Generated:**
- `reports/PROJECT_MASTER_ANALYSIS.md` - This comprehensive plan
- `FINAL_IMPLEMENTATION_CHECKLIST.md` - Detailed checklist
- `FINAL_PENDING_ITEMS.md` - Itemized pending tasks
- `FINAL_LAUNCH_READINESS_REPORT.md` - Readiness assessment