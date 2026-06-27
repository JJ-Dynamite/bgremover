import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'One-click background removal',
  description: 'One-click background removal - Built with Rust + Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
