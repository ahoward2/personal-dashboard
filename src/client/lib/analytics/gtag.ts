export const GA_TRACKING_ID = process.env.PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: (type: "config" | "event", idOrAction?: string, options?: any) => any;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const customGEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: any;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const searchEvent = ({ term }: { term: string }) => {
  window.gtag("event", "search", {
    search_term: term,
  });
};
