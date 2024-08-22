import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Good Company Calculator",
  description: "Run the numbers to optizize your business!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container py-10 flex-1 items-start grid grid-cols-[100px_minmax(0,1fr)] gap-6 ">
          <div className="">
            <Sidebar />
          </div>
          <div className="">{children}</div>
        </div>
      </body>
    </html>
  );
}
