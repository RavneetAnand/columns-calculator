import React from 'react';
import { SliderPanel } from './components/SliderPanel/SliderPanel';
import { ColumnsProvider } from './context/ColumnsContext';
import { FocusStyleManager } from '@blueprintjs/core';
import { OpviaTable } from './components/OpviaTable/OpviaTable';
import { AppContainer, TableContainer } from './App.styles';

const App: React.FC = () => {
  FocusStyleManager.onlyShowFocusOnTabs();

  return (
    <AppContainer>
      <ColumnsProvider>
        <SliderPanel />
        <TableContainer>
          <OpviaTable />
        </TableContainer>
      </ColumnsProvider>
    </AppContainer>
  );
};

export default App;
