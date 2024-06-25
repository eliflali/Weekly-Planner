import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'; 
import 'react-resizable/css/styles.css';
import axios from 'axios';
import Note from './Note';
import './Pinboard.css';
import DeleteIcon from '@mui/icons-material/Delete';  // Material-UI delete icon for better UI
import PinboardHeader from './PinboardHeader';
import ColorPicker from './ColorPicker';

const PinboardComponent = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);
    const [color, setColor] = useState('#e1bee7');

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && newNote.trim() !== '') {
            e.preventDefault(); // Prevent the default action to stop from submitting form
            handleAddNote();
            setNewNote(''); // Clear the input field
        }
    };

    const fetchNotes = async () => {
        const { data } = await axios.get('http://localhost:8000/api/notes/');
        setNotes(data.map(note => ({
            ...note,
            x: note.x_position,
            y: note.y_position,
            w: 7,  // Slightly wider default width
            h: 3,  // Default height
            i: note.id.toString() 
        })));
    };

    const handleDragStop = (layout) => {
        // Persist the layout changes
        const updates = layout.map(item => ({
            id: item.i,
            x_position: item.x,
            y_position: item.y
        }));

        updates.forEach(update => {
            axios.patch(`http://localhost:8000/api/notes/${update.id}/`, {
                x_position: update.x_position,
                y_position: update.y_position
            }).catch(error => console.error('Error updating note position:', error));
        });
    };

    const handleAddNote = async () => {
        if (!newNote) return;
        await axios.post('http://localhost:8000/api/notes/', {
            content: newNote,
            color,
            x_position: 0,
            y_position: 0
        }).then(() => {
            setNewNote('');
            fetchNotes();
        });
    };

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/notes/${noteId}/`);
            if (response.status === 204) {  // Typically a 204 No Content is returned on successful delete
                setNotes(prevNotes => prevNotes.filter(note => note.i !== noteId.toString()));
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };
    
    

  const handleNoteClick = (task) => {
    setSelectedNote(task);

  };

  // Handles closing the modal
  const handleClose = () => {
    setSelectedNote(null);
  };

    return (
        <>
        <PinboardHeader></PinboardHeader>
        <div className='input-container'>
            <div className='color-picker-container'>
            <ColorPicker selectedColor={color} onChangeColor={setColor} />
            </div>
            
            <textarea
                className="note-input"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new note"
                style={{ backgroundColor: color }}
            />
            </div>
        <div className="pinboard-container">
            
            
            <div className='pinboard-container-grid'>
            <GridLayout
                className="grid-layout"
                layout={notes}
                cols={60}
                rowHeight={30}
                width={1200}
                compactType={null}
                onLayoutChange={handleDragStop}
                isResizable={true}
                isDraggable={true}
            >
                {notes.map(note => (
                    <div key={note.i} className="note-item">
                        <Note note={note} onDelete={() => handleDeleteNote(note.id)} />
                       
                    </div>
                    
                ))}
            </GridLayout>
            </div>
        </div>
        </>
    );
};

export default PinboardComponent;
