// EmergencyStatusManager.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography, Container, CssBaseline } from '@mui/material';
import './EmergencyStatusManager.css';
import { formatDate } from './utils'; // Import the date formatting utility
import PinboardHeader from './PinboardHeader';

const columns = {
    High: 'High',
    Moderate: 'Moderate',
    Low: 'Low',
    Hobby: 'Hobby'
};

const EmergencyStatusManager = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/tasks/')
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const onDragEnd = result => {
        const { source, destination } = result;

        // If dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = source.droppableId;
            const destinationColumn = destination.droppableId;

            const task = tasks.find(task => task.id === result.draggableId);
            if (task) {
                fetch(`http://localhost:8000/api/tasks/${task.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ emergency_status: destinationColumn }),
                })
                .then(response => response.json())
                .then(data => {
                    setTasks(tasks.map(t => (t.id === task.id ? { ...t, emergency_status: destinationColumn } : t)));
                })
                .catch(error => console.error('Error updating task:', error));
            }
        }
    };

    return (
        <>
            <PinboardHeader></PinboardHeader>
            <CssBaseline />
            <Container className="root">
                <div className='title-container'>
                <Typography variant="h3" className="title">
                    Manage Emergency Status
                </Typography>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="columns">
                        {Object.keys(columns).map(column => (
                            <Droppable key={column} droppableId={column}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="column"
                                    >
                                        <Typography variant="h6" className="column-title">{column}</Typography>
                                        {tasks.filter(task => task.emergency_status === column).map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <Card
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="card"
                                                    >
                                                        <CardContent className="cardContent">
                                                            <Typography variant="body1">{task.title}</Typography>
                                                            <Typography variant="body2"><strong>Deadline:</strong> {formatDate(task.deadline)}</Typography>
                                                            <Typography variant="body2"><strong>Completed Status:</strong> 
                                                                <span className={task.completed ? "completed" : "incomplete"}>
                                                                    {task.completed ? "Completed" : "Incomplete"}
                                                                </span>
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </Container>
        </>
    );
};

export default EmergencyStatusManager;
