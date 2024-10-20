import { Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface Props{
    open: boolean,
    icon: JSX.Element,
    text: string, 
    onClick: ()=>void

}


const SideBarItem = ({open, icon, text,  onClick}:Props)=>{
   
    return (
        <ListItem key={text} disablePadding sx={{ display: 'block' ,"&:hover": {
            backgroundColor: "#b0bec5",
            color: "#1976d2",
          },}}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    flexDirection: open ? "row" : "column", 
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
                onClick={onClick}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      alignItems: 'center'
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: '1',
                        },
                  ]}
                >
                  {icon}
                
                </ListItemIcon>
                <ListItemText
                  primary={<Typography
                    variant="body1"
                    sx={{
                      fontSize: open ? "inherit" : "10px"
                    }}
                  >
                    {text}
                  </Typography>
      }
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 1,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
        
    )
}

export default SideBarItem;