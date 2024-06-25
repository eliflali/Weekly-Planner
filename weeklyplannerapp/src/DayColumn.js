import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete'; 
import SimpleModal  from './SimpleModal';

const DayColumn = ({ day, tasks, internalDroppableId, onDeleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);

  };

  // Handles closing the modal
  const handleClose = () => {
    setSelectedTask(null);
  };

  const taskColors = {"High": "#c62828", 
  "Moderate": "#ffa726",
  "Low": "#26c6da",
  "Hobby": "#66bb6a"}

  const taskHoverColors = {"High": "#b71c1c", 
  "Moderate": "#ffb74d",
  "Low": "#00acc1",
  "Hobby": "#43a047"}

  return (
    <>
    <Droppable droppableId={internalDroppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver ? '#f3e8ff' : '#ede7f6', // Light purple background
            padding: '16px',
            borderRadius: '8px', // Rounded corners for the column
            width: '250px',
            minHeight: '500px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            margin: '8px', // Spacing between columns
          }}
          {...provided.droppableProps}
        >
          <h3 style={{
              textAlign: 'center',
              color: '#5e35b1', // Deeper purple for the day heading
              marginBottom: '16px', // Space between heading and tasks
            }}
          >
            {day}
          </h3>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.draggableId} index={index}>
              {(provided, snapshot) => (
                <div
                  className='taskContent'
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: 'none',
                    padding: '12px 16px',
                    margin: '0 0 8px 0',
                    backgroundColor: snapshot.isDragging ? taskHoverColors[task.emergencyStatus] : taskColors[task.emergencyStatus], // Gradient of purple for tasks
                    color: 'white', // White text for contrast
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: '4px', // Rounded corners for tasks
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for tasks
                    

                    ...provided.draggableProps.style,
                  }}
                  onClick={() => handleTaskClick(task)}
                >
                  {task.content}

                  <DeleteIcon
                    onClick={(event) => {
                        event.stopPropagation(); // Prevent click from propagating to the parent div
                        onDeleteTask(day, task.id);
                    }}
                    style={{
                        cursor: 'pointer',
                        color: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                        color: '#f8bbd0',
                        },
                    }}
                    />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
        
      )}
      
    </Droppable>
    {selectedTask && (
        <SimpleModal
          isOpen={!!selectedTask}
          onClose={handleClose}
          task={selectedTask}
        />
      )}
    </>
  );
};

export default DayColumn;
