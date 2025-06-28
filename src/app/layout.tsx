import type { Metadata } from "next";
import "./styles/global.css";
import App from "./app";
import ProvidersTree from "@/providers/provider-tree";

export const metadata: Metadata = {
  title: "Dev-Blog",
  description:
    "A platform for developers to share their knowledge and experiences through blog posts",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <ProvidersTree>
        <App>{children}</App>
      </ProvidersTree>
    </html>
  );
}
