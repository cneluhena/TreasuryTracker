"use client";

import Toolbar from "@mui/material/Toolbar";
import MiniVariantDrawer from "./components/sidebar";
import ProfileIcon from "./components/ProfileIcon";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import Theme from "@/app/assets/theme";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current path
  const noToolbarPaths = ["/login", "/signup"]; // Define paths where toolbar should be hidden

  const showToolbar = !noToolbarPaths.includes(pathname);

  return (
    <Theme>
      {showToolbar && (
        <Toolbar
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100, // To ensure it stays on top
            backgroundColor: "white", // Set background color to avoid transparency issues
          }}
        >
          <MiniVariantDrawer />
          <Box sx={{ flexGrow: 1, marginRight:'10px' }} />
          <ProfileIcon  name="Chamod Neluhena" />
        </Toolbar>
      )}
      <Box component="main" sx={{ marginTop: showToolbar ? "64px" : "0px" }}>
        {children}
      </Box>
    </Theme>
  );
}
