import { useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Typography, Box, Tooltip } from '@mui/material';
import * as Muicon from "@mui/icons-material";
const CustomListItem = ({ to, primary, icon }) => {
  const location = useLocation();
  // Check if the current location matches the 'to' prop
  const isSelected = location.pathname === to;
  const Icon = Muicon[icon]
  return (
    <ListItemButton component={Link} to={to} selected={isSelected}>

      {isSelected ?
        <>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={primary} placement="bottom" arrow>
              <ListItemIcon 
             // color={"secondary"}
              color="primary"
              >
                <Icon fontWeight={"bold"}
                // color={"secondary"}
                 color={"primary"}
                 fontSize="small" /></ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Typography fontWeight={"bold"} fontSize={"small"} 
           // color={isSelected ? "secondary" : ""}
            color={isSelected ? "primary" : ""}
            >{primary}</Typography>} />

          </Box>

        </>
        : <>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={primary} placement="bottom" arrow>
              <ListItemIcon><Icon fontSize="small" /></ListItemIcon>
            </Tooltip>
            <ListItemText primary={<Typography fontSize={"small"}>{primary}</Typography>} />
          </Box>

        </>}

    </ListItemButton>
  );
};
export default CustomListItem;
