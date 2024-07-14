'use client'
import { blueGrey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Theme = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    const theme = createTheme({
        palette: {
          primary: {
            main: blueGrey[900],
          }
          
        },
      });
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
export default Theme;