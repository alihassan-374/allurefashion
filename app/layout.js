import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AllUre - The Art of Attraction",
  description:
    "AllUre is a men's grooming and lifestyle brand that offers a range of products and services to help men look and feel their best. From skincare and haircare to fashion and accessories, AllUre is dedicated to helping men express their unique style and personality. Our mission is to empower men to embrace their individuality and confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet"/>
          </head>

          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <AuthProvider>{children}</AuthProvider>
          </body>
        </html>
        );
}