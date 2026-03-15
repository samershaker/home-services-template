import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/en/',
  },
};

/**
 * Root page — simple client-side redirect to /en/.
 * Works with static export (no server-side redirect needed).
 */
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <noscript>
        <a href="/en/">Click here to continue</a>
      </noscript>
    </>
  );
}
