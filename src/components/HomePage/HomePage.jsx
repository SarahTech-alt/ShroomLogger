import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function HomePage() {

  // // matches parameters of current route
  // const allParams = useParams();
  // // // selects the id from the parameters
  // const logId = allParams.id;
  // // get profile info from the reducer store
  const profile = useSelector(store => store.user);
  const logHistory = useSelector(store => store.logHistory.logHistory)

  // allows access to useHistory module from React
  const history = useHistory();
  const dispatch = useDispatch();
  // access profile picture reducer
  // const profilePicture = profile.profilePictureReducer[0];

  useEffect(() => {
    dispatch({ type: 'FETCH_LOGS' });
    console.log('log id on page load', profile);
  }, [dispatch]);

const viewLogDetail = (logId) => {
  dispatch({type: 'SET_SELECTED_LOG', payload: logId});
  history.push(`/details/${logId}`)
}


  return (
    <>
      {/* {JSON.stringify(profile)} */}
      {/* {JSON.stringify(logHistory)} */}
      <div className="container">
        <p><img 
        src={profile.profile_picture_thumb}
        onClick={event => history.push('/profile')}></img> 
        <img className ="logo" src="/mushroom.png"/></p>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs>
    <Tab label="View History" onClick={event => history.push('/history')} />
    <Tab label="Map"  onClick={event => history.push('/map')}/>
    <Tab label="Add New" onClick={event => history.push('/addPhotos')} />
  </Tabs>
</Box>
       
        {logHistory.map((logs) => (
                    <div key={logs.log_id}>
                    <img width="250" 
                    height="200" 
                    src={logs.mushroom_picture_medium}
                    alt={logs.common_name}
                    onClick={(event => viewLogDetail(logs.log_id))} />
                    <p>{logs.common_name}</p>
                    </div>
                    
                ))}
        <hr />
       
        {/* <button
          onClick={event => history.push('/history')}>
          Log History
        </button>
        <button
          onClick={event => history.push('/map')}>
          Map
        </button>
        <button
          onClick={event => history.push('/addPhotos')}>
          Add Log
        </button><br /><br /> */}

        <p onClick={() => dispatch({ type: 'LOGOUT' })}> Logout </p>
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
