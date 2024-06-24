// WeekPlanner.js
import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DayColumn from './DayColumn'; // Ensure this path matches your project structure
import { reorder } from './reorder'; // Ensure this path matches your project structure
import TaskInput from './TaskInput'; // Import the new component


// Initial state setup for columns
const initialColumns = {
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [], unscheduled: []
  };
  
  
const WeekPlanner = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    fetch('http://localhost:8000/api/tasks/') // Adjust this URL to your Django server's address
      .then(response => response.json())
      .then(data => {
        const newColumns = { ...initialColumns };
        data.forEach(task => {
          const day = task.day || 'unscheduled';
          if (!newColumns[day]) {
            newColumns[day] = [];
          }
          newColumns[day].push({
            id: task.id,
            content: task.title, // Assuming you want to display the title as content
            draggableId: task.id,
            deadline: task.deadline,
            emergencyStatus: task.emergency_status,
            // Add other fields as needed
          });
        });
        setColumns(newColumns);
      })
      .catch(error => console.log(error));
  }, []); // Empty dependency array means this effect runs once on mount

  const addTask = (taskName, deadline, emergencyStatus) => {
    const newTask = {
      day: "Unscheduled",
      id: `task-${Date.now()}`, // Using current timestamp for a unique ID
      content: taskName,
      deadline,
      emergencyStatus,
      draggableId: `unscheduled-task-${Date.now()}`,
    };
    const newUnscheduledTasks = [...columns['unscheduled'], newTask];
    const newColumns = { ...columns, unscheduled: newUnscheduledTasks };
    setColumns(newColumns);
  };

  const deleteTask = (day, taskId) => {
    fetch(`http://localhost:8000/api/tasks/${taskId}/`, { // Use the correct URL and taskId
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        // Include any necessary headers, such as authentication tokens
    },
})
.then(response => {
    if (response.ok) {
        // Remove the task from the local state if the deletion was successful
        const newColumns = { ...columns };
        if (day === "Unscheduled") {
            newColumns.unscheduled = newColumns.unscheduled.filter(task => task.id !== taskId);
        } else {
            newColumns[day] = newColumns[day].filter(task => task.id !== taskId);
        }
        setColumns(newColumns);
    } else {
        // Handle errors, such as showing a message to the user
        console.error('Failed to delete the task.');
    }
})
.catch(error => console.error('Error:', error));
  };

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
  
    if (source.droppableId === destination.droppableId) {
      const newItems = reorder(columns[source.droppableId], source.index, destination.index);
      const newColumns = { ...columns, [source.droppableId]: newItems };
      setColumns(newColumns);
    } else {
      const start = columns[source.droppableId];
      const finish = columns[destination.droppableId];
      const [removed] = start.splice(source.index, 1);
      finish.splice(destination.index, 0, removed);
  
      const newColumns = { ...columns, [source.droppableId]: start, [destination.droppableId]: finish };
      setColumns(newColumns);
  
      // After updating local state, send a PATCH request to the backend
      // Assuming your task IDs are unique and can be used directly
      const taskId = removed.id; // Use the actual task ID here
      const newDay = destination.droppableId; // The droppableId is used as the day
      console.log(newDay);
      
      fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
        method: 'PATCH', // or 'PUT' if your API expects a full update
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary headers, such as authentication tokens
        },
        body: JSON.stringify({
          day: newDay, // Update the day based on the destination droppableId
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Task updated successfully:', data);
        // Optionally, refresh the tasks from the backend to ensure UI consistency
      })
      .catch(error => console.error('Error updating task:', error));
    }
  };
  

  return (
    <>
      <TaskInput days={days} onAddTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', gap: '20px', padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
      {days.map(day => (
        <DayColumn key={day} day={day} tasks={columns[day]} internalDroppableId={day} onDeleteTask={deleteTask} />
      ))}
      {/* Render unscheduled tasks */}
      <DayColumn key="unscheduled" day="Unscheduled" tasks={columns.unscheduled} internalDroppableId="unscheduled" onDeleteTask={deleteTask} />
    </div>
  </DragDropContext>
    </>
  );
};

export default WeekPlanner;
