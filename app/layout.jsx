import localFont from "next/font/local";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
import { ThemeProvider } from "../components/theme-provider";

// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "../components/ui/toaster";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata is no longer a TypeScript type, convert to a plain object
export const metadata = {
  title: "Eigengram",
  description:
    "EigenGram, the leading healthcare platform for all your medical health data and analytics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
