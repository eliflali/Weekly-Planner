import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'; 
import 'react-resizable/css/styles.css';
import axios from 'axios';
import Note from './Note';
import './Pinboard.css'

const PinboardComponent = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [color, setColor] = useState('#FFFFFF');

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
            w: 2,  // Slightly wider default width
            h: 2,  // Default height
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
            setColor('#FFFFFF');
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
    

    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <textarea
                className="note-input"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new note"
                style={{ backgroundColor: color }}
            />
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <GridLayout
                className="layout"
                layout={notes}
                cols={60}  // More columns for finer control
                rowHeight={10}  // Smaller row height for more vertical precision
                width={1200}
                compactType={null}  // No automatic compacting
                onLayoutChange={(layout) => handleDragStop(layout)}
                isResizable={true}  // Allow resizing
                isDraggable={true}  // Allow dragging
            >
                
                {notes.map(note => (
                    <div key={note.i}>
                        <Note note={note} onDelete={handleDeleteNote} />
                    </div>
                ))}
            </GridLayout>
        </div>
    );
};

export default PinboardComponent;
