import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';

function Header() {
    const profile = useSelector(store => store.user);
    const history = useHistory();
    return(
        <>
        <Box sx={{height:70, maxWidth:'300px'}}>
        <Box sx={{position:'absolute',left:20, top:40}}>  
        <Avatar sx={{height:60, width:60, right:10, bottom:15, left:1}} onClick={event => history.push('/profile')} src={profile.profile_picture_thumb}/>
        </Box>
        <Box sx={{position:'absolute', width:240, bottom:15, top:5, left:90}}> <h1>ShroomLogger</h1> </Box>
      <Box sx={{position:'absolute', height:60, width:60, right:15, top:9}}>  <img onClick={event => history.push('/about')} className ="logo" src="/images/mushrooms.png"/></Box>
        </Box><br />
        <hr />
          
        </>
    );
}

export default Header;