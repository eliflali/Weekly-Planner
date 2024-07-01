// SimpleModal.js
import React from 'react';
import './SimpleModal.css';
import { formatDate } from './utils'; // Import the date formatting utility

const SimpleModal = ({ isOpen, onClose, task }) => {
  const backdropClasses = isOpen ? "modal-backdrop open" : "modal-backdrop";

  return (
    <div className={backdropClasses}>
      <div className="modal-content">
        <h2>Task Details</h2>
        <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
        <p><strong>Emergency Status:</strong> {task.emergencyStatus}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SimpleModal;
