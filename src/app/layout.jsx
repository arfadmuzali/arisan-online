import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/authProvider";
import Nav from "@/components/nav";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arisan",
  description: "Tools For Arisan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <Nav />
          <Separator />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
