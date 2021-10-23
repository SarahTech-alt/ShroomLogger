import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { useHistory } from 'react-router-dom'

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="nav">
   
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <HomeOutlinedIcon sx={{height:100, width:50, pr:1}} onClick={event => history.push("/home")} />
            

            <ListOutlinedIcon sx={{height:100, width:50, pr:1}} onClick={event => history.push("/history")} />
              

            <MapOutlinedIcon sx={{height:100, width:50, pr:1}} onClick={event => history.push("/map")} />
            </>
        )}
            

            {user.id && (
          <>
            <p className="navLink" onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</p>
            </>
            )}

        
          
      </div>
    </div>
  );
}

export default Nav;
