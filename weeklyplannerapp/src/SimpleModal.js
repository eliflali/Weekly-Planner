// SimpleModal.js
import React from 'react';
import './SimpleModal.css';

const SimpleModal = ({ isOpen, onClose, task }) => {
  const backdropClasses = isOpen ? "modal-backdrop open" : "modal-backdrop";

  return (
    <div className={backdropClasses}>
      <div className="modal-content">
        <h2>Task Details</h2>
        <p>Deadline: {task.deadline}</p>
        <p>Emergency Status: {task.emergencyStatus}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SimpleModal;
