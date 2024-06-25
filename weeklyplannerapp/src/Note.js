import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';  // Material-UI delete icon for better UI

const Note = ({ note, onDelete }) => {
    return (
        <div style={{
            backgroundColor: note.color, 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            padding:'0px',
            display:'flex'
        }}>
            <span style={{
            padding:'10px',
            marginTop: '10px'
        }}>{note.content}</span>
            <div className='delete-button-container'
            >
            <DeleteIcon className= 'delete-button' onClick={() => onDelete(note.i)}/>
            </div>
        </div>
    );
};

export default Note;
