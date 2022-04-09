import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { positions } from '@mui/system';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';



function HomePage() {

  // get profile info from the reducer store
  const profile = useSelector(store => store.user);
  const logHistory = useSelector(store => store.logHistory.logHistory)

  // allows access to useHistory module from React
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_LOGS' });
    dispatch({ type: 'FETCH_PROFILE_INFO' });
    window.scrollTo(0, 0)
  }, [dispatch]);


  const viewLogDetail = (logId) => {
    dispatch({ type: 'SET_SELECTED_LOG', payload: logId });
    history.push(`/details/${logId}`)
  }


  return (
    <>
      {/* {JSON.stringify(profile)} */}
      {/* {JSON.stringify(logHistory)} */}
      <div className="container log-summary">
        {logHistory.map((logs) => (
          <div className="log-picture">
            <img
              src={logs.mushroom_picture_medium}
              alt={logs.common_name}
              onClick={(event => viewLogDetail(logs.log_id))}
              loading="lazy" />
            <div className="log-name">{logs.common_name}</div>
          </div>
        ))}
        {!logHistory.length && <div
          onClick={event => history.push('/addPhotos')}>
          <img src="/images/mushroom.jpg"></img><br />
          <p>Add a log to get started!</p>
        </div>}
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
