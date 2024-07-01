import { useNavigate } from 'react-router-dom';
import logo from './assets/weeklyplanner-logo.png'
import './Header.css';

const Header = () => {
    const navigate = useNavigate(); // Hook to navigate to different routes
    const handlePinBoardClick = (event) => {
        event.preventDefault(); // Prevent form submission
        navigate('/pinboard'); // Navigate to register page
    };
    const handleTaskViewClick = (event) => {
      event.preventDefault(); // Prevent form submission
      navigate('/task-viewer'); // Navigate to register page
  };
  const handleEmergencyStatusViewerClick = (event) => {
    event.preventDefault(); // Prevent form submission
    navigate('/manage-emergency-status'); // Navigate to register page
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
  <button 
    onClick={handleTaskViewClick} 
    className='pinboard-button'
    
  >
    View Tasks
  </button>
  <button 
    onClick={handleEmergencyStatusViewerClick} 
    className='pinboard-button'
    
  >
    Manage Emergency Status
  </button>
  </div>
  <div className='logo-container'>
  <img src = {logo}></img>
  </div>
  </div>
    );
}

export default Header;