import { useEffect } from "react";
import { useLocation } from "wouter";

const SITE_NAME = "Nawins Overseas Education";
const BASE_URL = "https://nawinsukstudyabroad.com";
const LOGO_URL = "/manus-static/nawins_education_advanced_logo_e06c3e9e.svg";

const META_BY_PATH: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Study in UK. Simplified | Nawins Overseas Education",
    description:
      "Explore UK universities, courses, counseling, and visa guidance with Nawins Overseas Education.",
  },
  "/about": {
    title: "About Nawins Overseas Education",
    description:
      "Learn how Nawins supports students with honest guidance, quality-first counseling, and global education pathways.",
  },
  "/services": {
    title: "Study Abroad Services | Nawins",
    description:
      "Free counseling, university selection, IELTS/TOEFL coaching, and application plus visa support for UK studies.",
  },
  "/destinations": {
    title: "Study Abroad Destinations | Nawins",
    description:
      "Explore UK, Canada, Australia, Ireland, and Europe. Compare universities, costs, and career opportunities.",
  },
  "/success-stories": {
    title: "Student Success Stories | Nawins",
    description:
      "Read inspiring stories of 1200+ students who achieved their dreams with Nawins counseling and guidance.",
  },
  "/universities": {
    title: "Top UK Universities | Nawins",
    description:
      "Browse leading UK universities, popular programs, and find the right admission pathway.",
  },
  "/blogs": {
    title: "Study Abroad Blog | Nawins",
    description:
      "Read practical guides and stories about UK admissions, visa strategy, courses, and student life.",
  },
  "/gallery": {
    title: "Student Gallery | Nawins",
    description:
      "See campus moments, events, and student journey highlights from the Nawins community.",
  },
  "/contact": {
    title: "Contact Nawins Overseas Education",
    description:
      "Talk to our counselors for UK admissions, course planning, and visa guidance.",
  },
  "/tasks": {
    title: "Application Tasks & Reminders | Nawins",
    description:
      "Manage counseling and admission tasks with completion tracking and optional browser notifications.",
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
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}${LOGO_URL}`,
    email: "info@nawinsoe.com",
    telephone: "+91 99437 38177",
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "12A - 3rd Floor, HDFC Bank Upstairs, Marappa Gounder Plaza, West Car Street",
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
    name: META_BY_PATH[path]?.title ?? "Nawins Page",
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
      };

      if (pathMap[path]) {
        breadcrumbs.push({
          "@type": "ListItem",
          position: breadcrumbs.length + 1,
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
        name: "What services does Nawins provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nawins provides free counseling, university selection, test preparation, application assistance, and visa support for studying abroad.",
        },
      },
      {
        "@type": "Question",
        name: "Which countries does Nawins help students study in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nawins helps students with admissions to UK, Canada, Australia, Ireland, and European universities.",
        },
      },
      {
        "@type": "Question",
        name: "What is the success rate of Nawins?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nawins has helped 1200+ students get admitted to leading universities with a 95% visa success rate.",
        },
      },
    ],
  };

  const payload = [orgSchema, websiteSchema, pageSchema, breadcrumbSchema];

  // Add FAQ schema only to specific pages
  if (["/" ].includes(path)) {
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
      title: "Page Not Found | Nawins Overseas Education",
      description: "The page you are looking for does not exist.",
    };

    document.title = seo.title;
    setMetaByName("description", seo.description);
    setMetaByProperty("og:site_name", SITE_NAME);
    setMetaByProperty("og:title", seo.title);
    setMetaByProperty("og:description", seo.description);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:url", `${BASE_URL}${path}`);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", seo.title);
    setMetaByName("twitter:description", seo.description);
    setCanonical(`${BASE_URL}${path}`);
    setStructuredData(path);
  }, [path]);

  return null;
}