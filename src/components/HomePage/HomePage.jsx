import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';


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

  return (
    <>
      {/* {JSON.stringify(profile)} */}
      {/* {JSON.stringify(logHistory)} */}
      <div className="container">
        <p><img src={profile.profile_picture_thumb}></img></p>
        <p>Feed</p> <hr />
        <button
          onClick={event => history.push('/addPhotos')}>
          Log New Find
        </button> <br />
        {logHistory.map((logs) => (
                    <div key={logs.log_id}>
                    <p><img width="250" height="200" src={logs.mushroom_picture_thumb} /></p>
                    </div>
                ))}
        <hr />
       
        <button
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
        </button><br /><br />

        <LogOutButton className="btn" />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
