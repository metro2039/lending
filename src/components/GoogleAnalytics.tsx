'use client';

import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-4YFS289EC7';

export default function GoogleAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || true) { // Force enable for now or use env
      ReactGA.initialize(GA_MEASUREMENT_ID);
    }
  }, []);

  return null;
}
