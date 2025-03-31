import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "PlanIt",
  description: "Where Travelers Meet & Memories Begin",
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

const paperlogy = localFont({
  src: "../fonts/Paperlogy-7Bold.woff2",
  weight: "700",
  style: "normal",
  variable: "--font-paperlogy",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${paperlogy.variable}`}
      suppressHydrationWarning
    >
      <body className={pretendard.className}>
        <Providers>
          <Navbar />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
