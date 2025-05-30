import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Proposal Creator',
  description: 'Generate professional project proposals using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 