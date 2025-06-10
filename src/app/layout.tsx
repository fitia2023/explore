import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Explore Durable",
  description: "Voyager de manière durable",
  icons: {
    icon: "/logo_ed.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
