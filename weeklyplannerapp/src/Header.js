import { useNavigate } from 'react-router-dom';
import logo from './assets/weeklyplanner-logo.png'
import './Header.css';

const Header = () => {
    const navigate = useNavigate(); // Hook to navigate to different routes
    const handlePinBoardClick = (event) => {
        event.preventDefault(); // Prevent form submission
        navigate('/pinboard'); // Navigate to register page
    };
    return(

        <div className='header-container'>
          <div className='button-container'>
        <button 
    onClick={handlePinBoardClick} 
    className='pinboard-button'
    
  >
    Pinboard
  </button>
  </div>
  <div className='logo-container'>
  <img src = {logo}></img>
  </div>
  </div>
    );
}

export default Header;