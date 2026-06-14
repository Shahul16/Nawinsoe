declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: string, ...args: any[]) => void;
    fbq: any;
  }
}

declare function gtag(
  command: string,
  ...args: any[]
): void;

export function initializeGoogleAnalytics() {
  const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  if (!gaId) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  (window as any).gtag = function() {
    (window as any).dataLayer.push(arguments);
  };
  (window as any).gtag("js", new Date());
  (window as any).gtag("config", gaId);
}

export function initializeGTM() {
  const gtmId = import.meta.env.VITE_GTM_ID;
  if (!gtmId) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  (window as any).dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });
}

export function initializeMetaPixel() {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId) return;

  const script = document.createElement("script");
  script.innerHTML = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');`;
  document.head.appendChild(script);
}

export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if ((window as any).gtag) {
    (window as any).gtag("event", eventName, eventData);
  }

  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }

  if ((window as any).fbq) {
    (window as any).fbq("track", eventName, eventData);
  }
}

export function trackConversion(value: number, currency: string = "USD") {
  trackEvent("purchase", {
    value,
    currency,
  });
}

export function trackInquiry(inquiryData: Record<string, any>) {
  trackEvent("inquiry_submission", inquiryData);
}