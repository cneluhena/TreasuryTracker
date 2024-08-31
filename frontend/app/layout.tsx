import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { blueGrey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Theme from "@/app/assets/theme";
import Toolbar from "@mui/material/Toolbar";
import MiniVariantDrawer from "./components/sidebar";
import ProfileIcon from "./components/ProfileIcon";
import Box from "@mui/material/Box";

import ClientLayout from "./clientlayout";

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
              
     <ClientLayout>
           {children}
           </ClientLayout>
             
           
         </body>
     </html>
     </Theme>
 
   );
  
  
}
