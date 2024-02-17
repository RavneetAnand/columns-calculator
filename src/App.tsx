import React from 'react';
import './App.css';
import { Slider } from './components/Slider/Slider';
import { ColumnsProvider } from './context/ColumnsContext';
import { FocusStyleManager } from '@blueprintjs/core';
import { OpviaTable } from './OpviaTable/OpviaTable';

const App: React.FC = () => {
  FocusStyleManager.onlyShowFocusOnTabs();
  return (
    <div className="App">
      <ColumnsProvider>
        <Slider />
        <div className="table-container">
          <OpviaTable />
        </div>
      </ColumnsProvider>
    </div>
  );
};

export default App;
