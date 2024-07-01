import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WeekPlanner from './WeekPlanner';
import PinboardComponent from './Pinboard';
import TaskViewer from './TaskViewer';
import EmergencyStatusManager from './EmergencyStatusManager';


function App() {
  return (


    <DndProvider backend={HTML5Backend}>

      <Router>
      <Routes>-
        <Route path="/" element={<WeekPlanner />} />
        <Route path="/pinboard" element={<PinboardComponent />} />
        <Route path="/task-viewer" element={<TaskViewer />} />
        <Route path="/manage-emergency-status" element={<EmergencyStatusManager />} />
      </Routes>
    </Router>

    </DndProvider>


    
  );
}

export default App;
