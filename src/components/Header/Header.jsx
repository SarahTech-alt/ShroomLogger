import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        borderRadius: 1,
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

function Header() {
  const profile = useSelector(store => store.user);
  const history = useHistory();
  
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          pt: 1,
          gap: 1,
        }}
      >
        <Avatar className='profile-picture' sx={{ gridRow: '1', gridColumn: '1', height: 60, width: 60, left: 1 }} onClick={event => history.push('/profile')} src={profile.profile_picture_thumb} />
        <Item sx={{ gridRow: '1', gridColumn: 'span 2', width: 240, mx: 'auto' }}> <h1>ShroomLogger</h1> </Item>
        <Item sx={{ gridRow: '1', gridColumn: '4', height: 60, width: 60 }}>  <img onClick={event => history.push('/about')} className="logo" src="/images/mushrooms.png" /></Item>
      </Box>
      <hr />
    </>
  );
}

export default Header;