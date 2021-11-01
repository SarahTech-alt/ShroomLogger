import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { positions } from '@mui/system';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';



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
    dispatch({ type: 'FETCH_PROFILE_INFO' });
    console.log('log id on page load', profile);
  }, [dispatch]);

  const viewLogDetail = (logId) => {
    dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
    history.push(`/details/${logId}`)
  }


  return (
    <>
      {/* {JSON.stringify(profile)} */}
      {/* {JSON.stringify(logHistory)} */}
      <div className="container">
        <ImageList sx={{ mx: "auto", width: 250 }} cols={1} gap={6}>
          {logHistory.map((logs) => (
            <ImageListItem key={logs.log_id} >
              <img
                src={logs.mushroom_picture_medium}
                alt={logs.common_name}
                onClick={(event => viewLogDetail(logs.log_id))}
                loading="lazy" />
              <ImageListItemBar position="below" title={logs.common_name}/>
            </ImageListItem>

          ))}
        </ImageList>
        <hr />

      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
