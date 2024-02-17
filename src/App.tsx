import React from 'react';
import './App.css';
import { SliderPanel } from './components/SliderPanel/SliderPanel';
import { ColumnsProvider } from './context/ColumnsContext';
import { FocusStyleManager } from '@blueprintjs/core';
import { OpviaTable } from './components/OpviaTable/OpviaTable';

const App: React.FC = () => {
  FocusStyleManager.onlyShowFocusOnTabs();

  return (
    <div className="App">
      <ColumnsProvider>
        <SliderPanel />
        <div className="table-container">
          <OpviaTable />
        </div>
      </ColumnsProvider>
    </div>
  );
};

export default App;
