import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingSpinner() {
  return (
    <Box sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#181c28"}} className="loading-container">
        <CircularProgress sx={{'color': "#00ceb8"}}/>
    </Box>
  )
}

export default LoadingSpinner



