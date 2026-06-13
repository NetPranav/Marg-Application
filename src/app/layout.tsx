import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TransitFlow HUD",
  description: "Active Transit HUD for Driver Operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen pb-24 relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
