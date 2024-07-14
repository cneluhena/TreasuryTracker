'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey } from "@mui/material/colors";


const theme = ({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: "#000000",
    },
  },
});

export default function Home() {
  const router = useRouter();
  return (
      router.push('/login')
  );
}
