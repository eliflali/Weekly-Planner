import React, { useState } from 'react';
import './TaskInput.css'; // Adjust the import path according to your file structure

const TaskInput = ({onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [emergencyStatus, setEmergencyStatus] = useState('Moderate');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(taskName, deadline, emergencyStatus);
    setTaskName('');
    setDeadline('');
    setEmergencyStatus('Moderate');
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        required
        className="inputField"
      />
      <div className="emergencyStatusContainer">
      <strong>Deadline:</strong>
      <input 
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="dateTimeField"
      />
      </div>
      <div className="emergencyStatusContainer">
        <strong>Emergency Status:</strong>
        <select value={emergencyStatus} onChange={(e) => setEmergencyStatus(e.target.value)} className="emergencyStatusSelect">
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
          <option value="Hobby">Hobby</option>
        </select>
      </div>
      <button type="submit" className="submitButton">
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
