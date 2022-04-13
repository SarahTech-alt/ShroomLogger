import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
// import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import LogHistory from '../LogHistory/LogHistory';
import LogDetails from '../LogDetails/LogDetails';
import EditLog from '../EditLog/EditLog';
import MapView from '../MapView/MapView';
import AddPhotos from '../AddLog/AddPhotos';
import AddType from '../AddLog/AddType';
import AddLocationTime from '../AddLog/AddLocationTime';
import AddDescription from '../AddLog/AddDescription';
import Summary from '../AddLog/Summary';
import './App.css';
import Header from '../Header/Header';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <div className='wrapper'>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the HomePage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows HomePage else shows LoginPage
            exact
            path="/home"
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProfilePage else shows LoginPage
            exact
            path='/profile'
          >
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows LogHistory else shows LoginPage
            exact
            path='/history'
          >
            <LogHistory />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows LogDetails else shows LoginPage
            exact
            path="/details/:id"
          >
            <LogDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows EditLog else shows LoginPage
            exact
            path="/edit/:id"
          >
            <EditLog />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows MapView else shows LoginPage
            exact
            path="/map"
          >
            <MapView />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows MapView else shows LoginPage
            exact
            path="/testmap"
          >
            <TestMap />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddPhotos else shows LoginPage
            exact
            path="/addPhotos"
          >
            <AddPhotos />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddType else shows LoginPage
            exact
            path="/addType"
          >
            <AddType />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddLocationTime else shows LoginPage
            exact
            path="/locationtime"
          >
            <AddLocationTime />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddDescription else shows LoginPage
            exact
            path="/description"
          >
            <AddDescription />

          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddDescription else shows LoginPage
            exact
            path="/summary"
          >
            <Summary />

          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>

        {/* <Nav /> */}
      </div>
      {user.id ?
        <>
          <div className="push"></div>
          <Footer className="footer" id="footer" /></> : null}

    </Router>
  );
}

export default App;
