import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link';
import { H1 } from '@/components/Typography/H1';



export const metadata: Metadata = {
  title: { default: "Cotel Games", template: "%s | Cotel Games" },
  description: "A coctel of casual games",
  applicationName: "Cotel Games",
  authors: [{ name: "carlosepc", url: "https://carlosepcc.github.io" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className='w-full shadow-lg p-4 px-6 fixed top-0 left-0 right-0 z-20'>
          <Link href='/'>
            <H1>{metadata.title.default??metadata.title}</H1>
          </Link>
          <nav></nav>
        </header>
        <main className='pt-20 pb-32 min-h-screen'>{children}</main>
        <footer className='bg-gray-700 p-5 text-center text-muted-dark'>
          <p>All rights reserved - carlosepc 2024-present</p>
        </footer>
      </body>
    </html>
  )
}
