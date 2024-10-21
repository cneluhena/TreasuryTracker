import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ArrowDownward } from "@mui/icons-material";


interface StatCardProps {
    title: string;
    value: string;
    trend: 'success'| 'error'; // You can extend this to support more types or specific icons.
    comparison: string;
  }

const StatCard= ({title, value, trend, comparison}:StatCardProps)=>{
    return(
        
        <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">
                <Paper  variant="outlined" elevation={0.85} sx={{width:"100%", height:"100%", p:2,borderRadius: '8px' }}>
                    <Typography style={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    
                    <Typography sx={{ fontWeight: 'bold', fontSize:"26px"}}>
                        {value}
                    </Typography>
                   
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                        {
                            trend == 'success' ?( <ArrowUpwardIcon color={trend} />) :
                            (<ArrowDownward color={trend}></ArrowDownward>)
                        }
                    
                    <Typography gridColumn="span 5">
                        {comparison}
                    </Typography>
                    </Box>
                    
                </Paper>
                
                </Box>
    )


}


export default StatCard;