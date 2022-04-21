import React, { useState, useEffect } from 'react';
import './Footer.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import classNames from 'classnames';


function Footer() {
  // access use history component for user navigation
  const history = useHistory();
  var classNames = require('classnames');
  // hooks for rendering the highlighting of 
  // current footer element
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  console.log(document.location.href.split('/')[4])

  const [selectedIcon, setSelectedIcon] = useState(selectedIcon);

  const navItems = [
    { label: 'Home', icon: <HomeOutlinedIcon /> },
    { label: 'History', icon: <FormatListBulletedOutlinedIcon /> },
    { label: 'Map', icon: <MapOutlinedIcon /> },
    { label: 'AddNew', icon: <AddOutlinedIcon /> }
  ];

  return (
    <>
      <div className="bottom-nav">
        {navItems.map((navItem) => {
          const { label, icon } = navItem;
          return (
            <div
              key={label}
              label={label}
              selected={selectedIcon === label ? true : false}
              onClick={() => {
                setSelectedIcon(label || '');
                history.push(`/${label}`);
              }}
              className={selectedIcon === label ? "nav-item-default-selected" : "nav-item-default"}>
              {navItem.icon}<br />{label}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Footer;
