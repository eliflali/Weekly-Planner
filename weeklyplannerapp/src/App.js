import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WeekPlanner from './WeekPlanner';
import PinboardComponent from './Pinboard';



function App() {
  return (


    <DndProvider backend={HTML5Backend}>

      <Router>
      <Routes>-
        <Route path="/" element={<WeekPlanner />} />
        <Route path="/pinboard" element={<PinboardComponent />} />
      </Routes>
    </Router>

    </DndProvider>


    
  );
}

export default App;
