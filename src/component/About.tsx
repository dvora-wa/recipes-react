import { Box, Typography } from "@mui/material";

const About=()=>{
return(<>

<Box sx={{ position: 'relative', height: `calc(100vh - 80px)`, overflow: 'hidden' }}>
            <Typography variant="h2" sx={{ position: 'relative', zIndex: 1, color: 'black', textAlign: 'center', paddingTop: '20px' }}>
                אודות
            </Typography>
        </Box>

</>)
}
export default About;