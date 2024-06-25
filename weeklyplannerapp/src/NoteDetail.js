import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';  // Material-UI delete icon for better UI

const NoteDetail = ({ note, onDelete }) => {
    return (
        <div style={{
            backgroundColor: note.color, 
            position: 'relative', 
            width: '100%', 
            height: '100%'
        }}>
            <span>{note.content}</span>
            <button
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                    cursor: 'pointer',
                    background: 'transparent'
                }}
                onClick={() => onDelete(note.i)}  // Passing note ID to onDelete
            >
                <DeleteIcon/>
            </button>
        </div>
    );
};

export default NoteDetail;
