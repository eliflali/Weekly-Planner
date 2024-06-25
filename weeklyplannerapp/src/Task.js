import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; 

const Task = ({ task, onDelete }) => {
    return (
        <div style={{ backgroundColor: task.color, position: 'relative' }}>
            <span>{task.content}</span>
            <button
                style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    cursor: 'pointer',
                    zIndex: 1000,
                }}
                onClick={onDelete}
            >
                <DeleteIcon />
            </button>
        </div>
    );
};

export default Task;
