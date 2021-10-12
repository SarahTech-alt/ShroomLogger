import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // allows access to useHistory module from React
  const history = useHistory();

  return (
    <div className="container">
      <p>Profile picture placeholder</p>
      <p>Feed</p> <hr />
      <button 
      onClick= {event => history.push('/addPhotos')}>
        Log Find Placeholder
        </button> <br />
      <p>Image display placeholder</p><br />
      <button
      onClick= {event => history.push('/history')}>
        Log History
        </button>
      <button
      onClick= {event => history.push('/map')}>
        Map
        </button>
      <button 
      onClick= {event => history.push('/addPhotos')}>
        Add Log
        </button><br /><br />

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
