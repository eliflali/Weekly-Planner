import React from 'react';

const Task = ({ task }) => {
  return (
    <div style={{ padding: '8px', border: '1px solid lightgrey', borderRadius: '2px', marginBottom: '8px', backgroundColor: 'white' }}>
      {task.content}
      {task.deadline}
      {task.emergencyStatus}
    </div>
  );
};

export default Task;
