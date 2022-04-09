import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <div
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}

    >
      <LogoutIcon onClick={() => dispatch({ type: 'LOGOUT' })}
      />

    </div>
  );
}

export default LogOutButton;
