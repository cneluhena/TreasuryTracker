'use client'
import { blueGrey, blue } from "@mui/material/colors";
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
          },
          secondary:{
            main:"#ffffff"
          },
          background: {
            default: "#F5F5F7", // Change this to your desired background color
        },
          
        },
      });
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
export default Theme;