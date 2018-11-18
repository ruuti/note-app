import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const AppContainer = ({children}) => (
  <div className={'App'}>
    <DragDropContextProvider backend={HTML5Backend}>
      <Router>
        { children }
      </Router>
    </DragDropContextProvider>
  </div>
);

export default AppContainer;