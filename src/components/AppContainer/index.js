import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

const AppContainer = ({children}) => (
  <div className={'App'}>
    <Router>
      { children }
    </Router>
  </div>
);

export default AppContainer;