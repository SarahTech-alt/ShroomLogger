import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useHistory, Route, Link } from 'react-router-dom';
import { useState } from 'react-redux';
import HomePage from '../HomePage/HomePage'


// function BasicTabs(props) {
//   const { children, value, index, ...other } = props;

//   const history = useHistory();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
// <>
//     <div
//     role="tabpanel"
//     hidden={value !== index}
//     id={`simple-tabpanel-${index}`}
//     aria-labelledby={`simple-tab-${index}`}
//     {...other}
//   >
//     {value === index && (
//       <Box sx={{ p: 3 }}>
//         <Typography>{children}</Typography>
//       </Box>
//     )}
//   </div>

//     <Box sx={{ width: '100%' }}>
//                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//   <Tabs>
//     <Tab label="Home" 
//     onClick={event => history.push('/home')}
//     index={0} />
//     <Tab 
//     label="View History" 
//     onClick={event => history.push('/history')}
//     index={1} />
//     <Tab 
//     label="Map"  
//     onClick={event => history.push('/map')}
//     index={2}/>
//     <Tab 
//     label="Add New" 
//     onClick={event => history.push('/addPhotos')} 
//     index={3}/>
//   </Tabs>
//     </Box>
//     </Box>
//     </>
//   );
// }


// export default BasicTabs;



// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);
//     const history = useHistory()

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };



//   return (
//     <Box sx={{ width: '50%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <LinkTab href="/home" label="Home"  {...a11yProps(0)} />
//           <LinkTab href="/history" label="View History"  {...a11yProps(1)} />
//           <LinkTab href="/map" label="Map" {...a11yProps(2)} />
//           <LinkTab href="/addPhotos" label="Add New" {...a11yProps(3)} />
//         </Tabs>
//       </Box>
//     </Box>
//   );
// }

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Home"  onClick={event => history.push('/home')} {...a11yProps(0)}/>
        <LinkTab label="Log History" onClick={event => history.push('/history')} {...a11yProps(1)}/>
        <LinkTab label="Map" href="/map" onClick={event => history.push('/history')}/>
      </Tabs>
    </Box>
  );
}