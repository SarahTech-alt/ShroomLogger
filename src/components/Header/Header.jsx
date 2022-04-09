
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';



function Header() {

  // access use history component for user navigation
  const history = useHistory();

  return (
    <div className='header'>
      <img onClick={event => history.push('/about')} className="logo" src="/images/mushrooms.png" />
      <div className='header-text'>ShroomLogger</div>
      <div className='logout-icon'><LogOutButton /></div>
    </div>
  );
}

export default Header;