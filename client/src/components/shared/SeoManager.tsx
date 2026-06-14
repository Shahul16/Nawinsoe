import { useEffect } from "react";
import { useLocation } from "wouter";

const SITE_NAME = "Nawins Education";
const BASE_URL = 
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? `${window.location.protocol}//${window.location.host}`
    : (import.meta.env.VITE_DOMAIN || "https://www.nawinsedutech.com");
const LOGO_URL = "/Nawins-static/nawins_education_logo.svg";

type SchemaPayload = Record<string, any>;

const META_BY_PATH: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Study in UK. Simplified | Nawins Education",
    description:
      "Explore UK universities, courses, counseling, and visa guidance with NAWINS Edutech.",
  },
  "/about": {
    title: "About Nawins Education",
    description:
      "Learn how Nawins Education supports students with honest guidance, quality-first counseling, and global education pathways.",
  },
  "/services": {
    title: "Study Abroad Services | Nawins Education",
    description:
      "Free counseling, university selection, IELTS/TOEFL coaching, and application plus visa support for UK studies.",
  },
  "/destinations": {
    title: "Study Abroad Destinations | Nawins Education",
    description:
      "Explore UK, Canada, Australia, Ireland, and Europe. Compare universities, costs, and career opportunities.",
  },
  "/success-stories": {
    title: "Student Success Stories | Nawins Education",
    description:
      "Read inspiring stories of 1200+ students who achieved their dreams with Nawins Education counseling and guidance.",
  },
  "/universities": {
    title: "Top UK Universities | Nawins Education",
    description:
      "Browse leading UK universities, popular programs, and find the right admission pathway.",
  },
  "/blogs": {
    title: "Study Abroad Blog | Nawins Education",
    description:
      "Read practical guides and stories about UK admissions, visa strategy, courses, and student life.",
  },
  "/gallery": {
    title: "Student Gallery | Nawins Education",
    description:
      "See campus moments, events, and student journey highlights from the Nawins Education community.",
  },
  "/contact": {
    title: "Contact Nawins Education",
    description:
      "Talk to our counselors for UK admissions, course planning, and visa guidance.",
  },
  "/tasks": {
    title: "Application Tasks & Reminders | Nawins Education",
    description:
      "Manage counseling and admission tasks with completion tracking and optional browser notifications.",
  },
  "/study-in-uk": {
    title: "Study in UK | Nawins Education",
    description:
      "Explore UK education opportunities with guidance for top universities, courses, and visa applications.",
  },
  "/study-in-canada": {
    title: "Study in Canada | Nawins Education",
    description:
      "Discover Canadian education pathways with affordable tuition, work opportunities, and PR routes.",
  },
  "/study-in-australia": {
    title: "Study in Australia | Nawins Education",
    description:
      "Experience world-class education in Australia with excellent lifestyle and career prospects.",
  },
  "/study-in-ireland": {
    title: "Study in Ireland | Nawins Education",
    description:
      "Study in Ireland's innovation hub with EU access and thriving tech ecosystem.",
  },
  "/study-in-germany": {
    title: "Study in Germany | Nawins Education",
    description:
      "Experience world-class education in Europe's largest economy with no tuition fees at public universities.",
  },
  "/study-in-france": {
    title: "Study in France | Nawins Education",
    description:
      "Experience world-class education in the land of art, culture, and innovation with English-taught programs.",
  },
  "/study-in-netherlands": {
    title: "Study in Netherlands | Nawins Education",
    description:
      "Experience innovative education in Europe with English-taught programs and excellent career opportunities.",
  },
  "/study-in-new-zealand": {
    title: "Study in New Zealand | Nawins Education",
    description:
      "Study in one of the world's most beautiful and safest countries with quality education and PR pathways.",
  },
  "/careers": {
    title: "Careers at Nawins Education",
    description:
      "Join our team of education experts and help shape the futures of aspiring students studying abroad.",
  },
  "/book-consultation": {
    title: "Book Free Consultation | Nawins Education",
    description:
      "Schedule your free study abroad consultation with expert counselors for personalized guidance.",
  },
  "/scholarships": {
    title: "Scholarships & Bursaries | Nawins Education",
    description:
      "Explore scholarships for UK, Canada, and Australia students. Get eligibility guidance and application support from Nawins Education.",
  },
  "/visa-guidance": {
    title: "UK Student Visa Guidance | Nawins Education",
    description:
      "Step-by-step UK student visa support for Indian students. Document prep, application guidance, and post-arrival compliance help.",
  },
  "/admin/blog": {
    title: "Blog Admin | Nawins Education",
    description: "Admin dashboard for managing blog posts.",
  },
};

function setMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name=\"${name}\"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property=\"${property}\"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url: string) {
  let link = document.querySelector("link[rel=\"canonical\"]");
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setStructuredData(path: string) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "NAWINS EDUTECH PRIVATE LIMITED",
    url: BASE_URL,
    logo: `${BASE_URL}${LOGO_URL}`,
    email: "info@nawinsedutech.com",
    telephone: "+91 99437 38177",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61590763943705",
      "https://www.instagram.com/nawins_education/",
      "https://www.linkedin.com/company/nawins-education/",
      "https://www.x.com/nawinseducation/",
    ],
    address: {
      "@type": "PostalAddress",
streetAddress:
         "No 59/3 - 13/4, 3rd Floor, HDFC Bank Upstairs, Marappa Gounder Plaza, West Car Street",
      addressLocality: "Tiruchengode",
      addressRegion: "Tamil Nadu",
      postalCode: "637211",
      addressCountry: "IN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: META_BY_PATH[path]?.title ?? "Nawins Education Page",
    url: `${BASE_URL}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: (() => {
      const breadcrumbs = [];
      breadcrumbs.push({
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      });

      const pathMap: Record<string, string> = {
        "/about": "About",
        "/services": "Services",
        "/destinations": "Destinations",
        "/success-stories": "Success Stories",
        "/universities": "Universities",
        "/blogs": "Blog",
        "/gallery": "Gallery",
        "/contact": "Contact",
        "/careers": "Careers",
        "/book-consultation": "Book Consultation",
        "/study-in-uk": "Study in UK",
        "/study-in-canada": "Study in Canada",
        "/study-in-australia": "Study in Australia",
        "/study-in-ireland": "Study in Ireland",
        "/study-in-germany": "Study in Germany",
        "/study-in-france": "Study in France",
        "/study-in-netherlands": "Study in Netherlands",
        "/study-in-new-zealand": "Study in New Zealand",
      };

      const pathParents: Record<string, string> = {
        "/study-in-uk": "/destinations",
        "/study-in-canada": "/destinations",
        "/study-in-australia": "/destinations",
        "/study-in-ireland": "/destinations",
        "/study-in-germany": "/destinations",
        "/study-in-france": "/destinations",
        "/study-in-netherlands": "/destinations",
        "/study-in-new-zealand": "/destinations",
      };

      if (pathParents[path] && pathMap[pathParents[path] as keyof typeof pathMap]) {
        breadcrumbs.push({
          "@type": "ListItem",
          position: 2,
          name: pathMap[pathParents[path] as keyof typeof pathMap]!,
          item: `${BASE_URL}${pathParents[path]}`,
        });
      }

      if (pathMap[path]) {
        breadcrumbs.push({
          "@type": "ListItem",
          position: pathParents[path] ? 3 : 2,
          name: pathMap[path],
          item: `${BASE_URL}${path}`,
        });
      }

      return breadcrumbs;
    })(),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Nawins Education provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nawins Education provides free counseling, university selection, test preparation, application assistance, and visa support for studying abroad.",
        },
      },
      {
        "@type": "Question",
        name: "Which countries does Nawins Education help students study in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nawins Education helps students with admissions to UK, Canada, Australia, Ireland, and European universities.",
        },
      },
      {
        "@type": "Question",
        name: "What is the success rate of Nawins Education?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nawins Education has helped 1200+ students get admitted to leading universities with a 95% visa success rate.",
        },
      },
    ],
  };

  const payload: SchemaPayload[] = [orgSchema, websiteSchema, pageSchema, breadcrumbSchema];

  // Add FAQ schema only to specific pages
  if (["/", "/faq"].includes(path)) {
    payload.push(faqSchema);
  }

  let script = document.getElementById("seo-jsonld");
  if (!script) {
    script = document.createElement("script");
    script.id = "seo-jsonld";
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload);
}

export default function SeoManager() {
  const [path] = useLocation();

  useEffect(() => {
    const seo = META_BY_PATH[path] ?? {
      title: "Page Not Found | NAWINS Edutech",
      description: "The page you are looking for does not exist.",
    };

    document.title = seo.title;
    setMetaByName("description", seo.description);
    setMetaByProperty("og:site_name", SITE_NAME);
    setMetaByProperty("og:title", seo.title);
    setMetaByProperty("og:description", seo.description);
    setMetaByProperty("og:image", `${BASE_URL}${LOGO_URL}`);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:url", `${BASE_URL}${path}`);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", seo.title);
    setMetaByName("twitter:description", seo.description);
    setMetaByName("twitter:image", `${BASE_URL}${LOGO_URL}`);
    setCanonical(`${BASE_URL}${path}`);
    setStructuredData(path);
  }, [path]);

  return null;
}