import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Task Manager',
  description: 'A simple, offline-first personal task manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">✓</span>
                Personal Task Manager
              </h1>
            </div>
          </header>
          
          {/* Main content */}
          <main className="max-w-4xl mx-auto px-4 py-6">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            Built with Next.js • Data stored locally in your browser
          </footer>
        </div>
      </body>
    </html>
  );
}