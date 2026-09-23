// Declare gtag on the global window object for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Log custom Google Analytics events safely (only in browser)
 */
export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

/**
 * Track PDF download conversion event
 */
export function trackPdfDownload(templateName?: string) {
  trackEvent('download_resume_pdf', {
    event_category: 'conversion',
    event_label: templateName || 'Resume Maamey Template',
    value: 1,
  });
}