// SimpleModal.js

import React from 'react';

const SimpleModal = ({ isOpen, onClose, task }) => {
    console.log(isOpen)
  if (!isOpen) {
    
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, .5)',
      zIndex: 1000, // Ensure it's above other content
    }}>
      <h2>Task Details</h2>
      <p>Deadline: {task.deadline}</p>
      <p>Emergency Status: {task.emergencyStatus}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SimpleModal;
