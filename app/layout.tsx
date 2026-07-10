import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAILAI LAB — Version 2.0",
  description: "LAILAI LAB 是莱莱的个人创意实践，聚焦品牌、视觉与数字体验。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
