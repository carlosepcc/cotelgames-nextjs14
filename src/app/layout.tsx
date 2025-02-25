import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { H1 } from "@/components/Typography/H1";

export const APP_TITLE = "Cotel Games";
export const metadata: Metadata = {
  title: { default: APP_TITLE, template: `%s | ${APP_TITLE}` },
  description: "A coctel of casual games",
  applicationName: APP_TITLE,
  authors: [{ name: "carlosepc", url: "https://carlosepcc.github.io" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-between ring min-h-screen">
        <header className="w-full shadow-lg p-4 px-6 fixed top-0 left-0 right-0 z-20">
          <Link href="/">
            <H1>{APP_TITLE}</H1>
          </Link>
          <nav></nav>
        </header>
        <main className="pt-20 size-full grow">
          {children}
        </main>
        <footer className="bg-neutral-900 p-5 text-center text-neutral-500 w-full">
          <p>All rights reserved. carlosepc<sup>&copy;</sup> 2024 - present</p>
        </footer>
      </body>
    </html>
  );
}
