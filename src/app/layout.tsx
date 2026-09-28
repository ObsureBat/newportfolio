import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ayush Sharma | Software Engineer | Cloud & Security',
  description: 'Portfolio of Ayush Sharma, a 2026 Computer Science graduate building software, AWS cloud systems and security-focused applications.',
  metadataBase: new URL('https://ayush-sharma.pages.dev'),
  alternates: {
    canonical: 'https://ayush-sharma.pages.dev',
  },
  keywords: [
    'Ayush Sharma',
    'Software Engineer',
    'Cloud Engineer',
    'Cybersecurity',
    'AWS Certified',
    'Full-Stack Developer',
    'React',
    'TypeScript',
    'Node.js',
    'Electron',
    'TensorFlow',
    'NIDS',
    'AGESIFY',
    'SmartGalla',
  ],
  authors: [{ name: 'Ayush Sharma' }],
  creator: 'Ayush Sharma',
  openGraph: {
    title: 'Ayush Sharma | Software Engineer | Cloud & Security',
    description: 'Portfolio of Ayush Sharma, a 2026 Computer Science graduate building software, AWS cloud systems and security-focused applications.',
    url: 'https://ayush-sharma.pages.dev',
    siteName: 'Ayush Sharma Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Sharma | Software Engineer | Cloud & Security',
    description: 'Portfolio of Ayush Sharma, a 2026 Computer Science graduate building software, AWS cloud systems and security-focused applications.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ]
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="leading-relaxed text-slate-500 font-sans antialiased selection:bg-slate-900 selection:text-white relative min-h-screen">
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
