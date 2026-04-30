import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "こどもトリアージ | お子さまの症状から相談タイミングの目安を",
  description:
    "お子さまの症状をもとに、いつ・どこに相談するかの一般的な目安をお示しする保護者向けの情報提供サービスです。日本小児科学会『こどもの救急』を参考にしています。",
  keywords: [
    "こども",
    "小児科",
    "症状",
    "発熱",
    "救急",
    "子供",
    "相談",
    "#8000",
    "トリアージ",
  ],
  authors: [{ name: "こどもトリアージ運営" }],
  openGraph: {
    title: "こどもトリアージ",
    description:
      "お子さまの症状から、医療機関への相談タイミングの一般的な目安をお伝えします。",
    type: "website",
    locale: "ja_JP",
    siteName: "こどもトリアージ",
  },
  twitter: {
    card: "summary_large_image",
    title: "こどもトリアージ",
    description:
      "お子さまの症状から、医療機関への相談タイミングの一般的な目安をお伝えします。",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
google: "qyyFYm2msvx9QrRQIxPVfqBEgkHxCYQOKQ3XiIuIOVQ",
},
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fda4af",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
