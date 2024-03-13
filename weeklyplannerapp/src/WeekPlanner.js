// WeekPlanner.js
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DayColumn from './DayColumn'; // Ensure this path matches your project structure
import { reorder } from './reorder'; // Ensure this path matches your project structure
import TaskInput from './TaskInput'; // Import the new component


// Initial state setup for columns
const initialColumns = days => {
    const dayColumns = days.reduce((acc, day) => ({
      ...acc,
      [day]: []
    }), {});
    return { ...dayColumns, unscheduled: [] }; // Add an unscheduled section for new tasks
  };
  
const WeekPlanner = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [columns, setColumns] = useState(initialColumns(days));

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
    if (day === "Unscheduled")
    {
        const filteredTasks = columns.unscheduled.filter(task => task.id !== taskId)
        const newColumns = { ...columns, unscheduled: filteredTasks };
        setColumns(newColumns);
    }
    else
    {
        const filteredTasks = columns[day].filter(task => task.id !== taskId);
        const newColumns = { ...columns, [day]: filteredTasks };
        setColumns(newColumns);
    }
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
