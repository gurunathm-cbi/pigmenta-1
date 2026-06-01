import type { Metadata } from "next";
import "./globals.css";
// Navbar is imported here — it shows on EVERY page automatically.
// We'll create this file in the next step.
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pigmenta",
  description: "A home for artists who deserve to be seen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        suppressHydrationWarning tells React to ignore mismatches on <body>.
        Some browser extensions (e.g. password managers, colour pickers) inject
        attributes like cz-shortcut-listen="true" into <body> after the page
        loads. This causes a harmless React hydration warning — suppressing it
        here is the standard Next.js fix.
      */}
      <body suppressHydrationWarning>
        {/*
          This <div> matches the structure you had in App.tsx:
            <div className="relative">
              <Navbar />
              {page content}
            </div>
        */}
        <div className="relative">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
