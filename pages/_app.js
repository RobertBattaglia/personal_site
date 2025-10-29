import React, { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import typography from '../src/config/typography';
import '../src/assets/css/font-faces.css';

// Inject Typography.js styles
if (typeof window !== 'undefined') {
  typography.injectStyles();
}

const GA_TRACKING_ID = process.env.GA_TRACKING_ID || process.env.NEXT_PUBLIC_GA_TRACKING_ID;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Inject Typography.js styles on client-side
    typography.injectStyles();

    // Google Analytics page view tracking
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={cache}>
      {/* Google Analytics */}
      {GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: false,
                cookie_expires: 0,
              });
            `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
