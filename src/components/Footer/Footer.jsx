import React from 'react';
import './Footer.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


function Footer() {
  // access use history component for user navigation
  const history = useHistory();
  // hooks for rendering the highlighting of 
  // current footer element
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);


  return (
    <>
      <Box sx={{ pb: 7 }} ref={ref} >

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction onClick={event => history.push('/home')} label="Home" icon={<HomeOutlinedIcon />} />
            <BottomNavigationAction onClick={event => history.push('/history')} label="History" icon={<FormatListBulletedOutlinedIcon />} />
            <BottomNavigationAction onClick={event => history.push('/map')} label="Map" icon={<MapOutlinedIcon />} />
            <BottomNavigationAction onClick={event => history.push('/addPhotos')} label="Add New" icon={<AddOutlinedIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>

    </>
  )
}

export default Footer;
