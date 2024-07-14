
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { blueGrey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Theme from "@/app/assets/theme";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "TreasuryTracker",
  description: "TreasuryTracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <Theme>
    <html lang="en">
      <body className={inter.className}>
        
        {children}
        </body>
    </html>
    </Theme>

  );
}
