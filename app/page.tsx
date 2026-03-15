import { redirect } from 'next/navigation';

/**
 * Root page — redirects to /en/ for locale-ready routing.
 */
export default function RootPage() {
  redirect('/en');
}
