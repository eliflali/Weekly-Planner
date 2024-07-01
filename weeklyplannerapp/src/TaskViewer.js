// TaskViewer.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container, CssBaseline, Button } from '@mui/material';
import './TaskViewer.css';
import PinboardHeader from './PinboardHeader';
import { formatDate } from './utils'; // Import the date formatting utility

const TaskViewer = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/tasks/')
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const deleteTask = (taskId) => {
        fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                setTasks(tasks.filter(task => task.id !== taskId));
            } else {
                console.error('Failed to delete the task.');
            }
        })
        .catch(error => console.error('Error deleting task:', error));
    };

    const completeTask = (taskId) => {
        fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: true }),
        })
        .then(response => response.json())
        .then(data => {
            setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed: true } : task)));
        })
        .catch(error => console.error('Error completing task:', error));
    };

    return (
        <>
            <PinboardHeader />
            <CssBaseline />
            <Container className="root">
                <div className="title-container">
                    <Typography variant="h3" className="title">
                        Tasks:
                    </Typography>
                </div>
                <div>
                    {tasks.map(task => (
                        <Card key={task.id} className="card">
                            <div className="cardHeader">
                                <Typography variant="h6">
                                    {task.title}
                                </Typography>
                            </div>
                            <CardContent className="cardContent">
                                <Typography variant="body1">{task.description}</Typography>
                                <Typography variant="body2"><strong>Deadline:</strong> {formatDate(task.deadline)}</Typography>
                                <Typography variant="body2"><strong>Emergency Status:</strong> {task.emergency_status}</Typography>
                                <Typography variant="body2"><strong>Completed Status:</strong> 
                                    <span className={task.completed ? "completed" : "incomplete"}>
                                        {task.completed ? "Completed" : "Incomplete"}
                                    </span>
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <Button variant="contained" color="primary" onClick={() => completeTask(task.id)} disabled={task.completed}>
                                        {task.completed ? "Completed" : "Complete"}
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => deleteTask(task.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default TaskViewer;
