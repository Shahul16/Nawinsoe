import { trackEvent } from "./analytics";

export function initializeHubSpot() {
  const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
  if (!portalId) return;

  const script = document.createElement("script");
  script.src = "https://js.hsforms.net/forms/shell.js";
  document.body.appendChild(script);

  script.onload = () => {
    if ((window as any).hbspt) {
      (window as any).hbspt.enqueueForm = (window as any).hbspt.enqueueForm || [];
      // HubSpot will be available globally
    }
  };
}

export function embedHubSpotForm(formId: string, containerId: string) {
  const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
  if (!portalId || !(window as any).hbspt) {
    console.warn("HubSpot not properly initialized");
    return;
  }

  (window as any).hbspt.forms.create({
    region: "na1",
    portalId: portalId,
    formId: formId,
    target: `#${containerId}`,
    onFormSubmit: () => {
      trackEvent("hubspot_form_submit", {
        formId,
      });
    },
  });
}

export function trackLeadCapture(leadData: {
  name: string;
  email: string;
  phone?: string;
  preferredCourse?: string;
  university?: string;
}) {
  trackEvent("lead_capture", leadData);

  // If HubSpot is available, send lead data to HubSpot
  if ((window as any).hbspt) {
    (window as any).hbspt.identify({
      ...leadData,
    });
  }
}

export function trackPageview(pageName: string, properties?: Record<string, any>) {
  trackEvent("pageview", {
    pageName,
    ...properties,
  });
}

export function trackUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utmData: Record<string, any> = {};

  if (params.has("utm_source"))
    utmData.utm_source = params.get("utm_source");
  if (params.has("utm_medium"))
    utmData.utm_medium = params.get("utm_medium");
  if (params.has("utm_campaign"))
    utmData.utm_campaign = params.get("utm_campaign");
  if (params.has("utm_content"))
    utmData.utm_content = params.get("utm_content");
  if (params.has("utm_term")) utmData.utm_term = params.get("utm_term");

  if (Object.keys(utmData).length > 0) {
    trackEvent("utm_tracking", utmData);
  }

  return utmData;
}
