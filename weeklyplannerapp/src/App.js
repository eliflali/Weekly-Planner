import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WeekPlanner from './WeekPlanner';


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <WeekPlanner />
    </DndProvider>
  );
}

export default App;
