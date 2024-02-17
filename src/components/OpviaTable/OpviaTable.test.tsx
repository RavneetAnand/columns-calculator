import { render, fireEvent, act } from '@testing-library/react';
import { OpviaTable } from './OpviaTable';
import { ColumnsContext } from '../../context/ColumnsContext';

describe('OpviaTable', () => {
  let mockDispatch = jest.fn();

  it('should render without crashing', () => {
    render(
      <ColumnsContext.Provider value={{ columns: [], dispatch: mockDispatch }}>
        <OpviaTable />
      </ColumnsContext.Provider>,
    );
  });

  /* it('should call dispatch when deleting a calculated column', () => {
    const columns = [
      { columnId: '1', columnName: 'Column 1', formula: 'x + y' },
      { columnId: '2', columnName: 'Column 2' },
    ];

    const { getByText } = render(
      <ColumnsContext.Provider value={{ columns, dispatch: mockDispatch }}>
        <OpviaTable />
      </ColumnsContext.Provider>,
    );

    fireEvent.click(getByText('Column 1'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_COLUMNS',
      payload: [{ columnId: '2', columnName: 'Column 2' }],
    });
  }); */

  // Add more tests here for other functionalities like sorting, rendering aggregate functions popover, etc.
});
