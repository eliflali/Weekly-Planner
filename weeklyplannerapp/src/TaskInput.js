import React, { useState } from 'react';
import './TaskInput.css'; // Adjust the import path according to your file structure

const TaskInput = ({onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [emergencyStatus, setEmergencyStatus] = useState('Moderate');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(taskName, deadline, emergencyStatus);
    setTaskName('');
    setDeadline('');
    setDescription('');
    setEmergencyStatus('Moderate');
    const day = "unscheduled";
    // Prepare the data
    const taskData = {
        title: taskName,
        description,
        day,
        deadline,
        emergency_status: emergencyStatus,
    };
    // Send a POST request to the Django backend
    fetch('http://localhost:8000/api/tasks/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Include authentication tokens here if your API requires
        },
        body: JSON.stringify(taskData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Reset form, handle success, etc.
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message
    });

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
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        required
        className="inputField"
      />
      </div>
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
