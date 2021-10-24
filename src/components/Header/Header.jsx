import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useHistory} from 'react-router-dom';

function Header() {
    const history = useHistory();
    return(
        <>
             <Box sx={{height:100, maxWidth:'300px'}}>
        <Box sx={{mx:"auto", width:250, bottom:10}}> <h1>ShroomLogger</h1> </Box>
      <Box sx={{position:'absolute', height:90, width:95, right:20, top:0}}>  <img className ="logo" src="/images/mushrooms.png"/></Box>
        </Box>
          
        </>
    );
}

export default Header;