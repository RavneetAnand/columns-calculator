import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { dummyTableData } from '../../data/dummyData';
import { columns } from '../../utils/constants';
import { showToast } from '../../utils/toast';
import { formulaEvaluationSuccessMessage } from '../../utils/messages';
import { ColumnsContext, ColumnsType } from '../../context/ColumnsContext';

const testData = [
  {
    column_2: 1,
    column_3: '2021-01-01T00:00:00.000Z',
  },
  {
    column_2: 3,
    column_3: '2021-01-02T00:00:00.000Z',
  },
];

let mockAddCalculatedField = jest.fn();
let mockConvertDataFormat = jest.fn().mockReturnValue(testData);

// Mock the utils/formatData.ts
jest.mock('../../utils/formatData', () => ({
  convertDataFormat: mockConvertDataFormat,
  addCalculatedField: mockAddCalculatedField,
  formatDateTime: jest.fn(),
}));

const testColumns: ColumnsType[] = [
  {
    columnId: 'column_1',
    columnName: 'Column 1',
    formula: 'column_2 + 123',
    columnType: 'data',
    aggregateFunctions: ['SUM'],
  },
  {
    columnId: 'column_2',
    columnName: 'Column 2',
    columnType: 'data',
    aggregateFunctions: ['SUM'],
  },
  {
    columnId: 'column_3',
    columnName: 'Column 3',
    columnType: 'time',
    aggregateFunctions: ['MAX', 'MIN'],
  },
];

// Mock the toast function
jest.mock('../../utils/toast', () => ({
  showToast: jest.fn(),
}));

import { OpviaTable } from './OpviaTable';

describe('OpviaTable', () => {
  let mockDispatch = jest.fn();

  const renderComponent = () => {
    return render(
      <ColumnsContext.Provider
        value={{ columns: testColumns, dispatch: mockDispatch }}
      >
        <OpviaTable />
      </ColumnsContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const screen = renderComponent();

    expect(screen).toBeTruthy();
    expect(mockConvertDataFormat).toHaveBeenCalled();
    expect(mockConvertDataFormat).toHaveBeenCalledWith(dummyTableData, columns);

    expect(mockAddCalculatedField).toHaveBeenCalled();
  });

  it('should call dispatch when deleting a calculated column', () => {
    const screen = renderComponent();

    const column1BinBtn = screen.getAllByTestId(
      'deleteCalculatedColumn-column_1',
    )[0];

    fireEvent.click(column1BinBtn);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_COLUMNS',
      payload: [
        {
          aggregateFunctions: ['SUM'],
          columnId: 'column_2',
          columnName: 'Column 2',
          columnType: 'data',
        },
        {
          aggregateFunctions: ['MAX', 'MIN'],
          columnId: 'column_3',
          columnName: 'Column 3',
          columnType: 'time',
        },
      ],
    });
  });

  it('opens popover on the menu click', async () => {
    const { container } = renderComponent();

    const tableColumnHeaderMenu = container.getElementsByClassName(
      'bp4-table-th-menu bp4-popover2-target',
    );

    const target = [...tableColumnHeaderMenu][0];
    if (target) {
      fireEvent.click(target);
    }

    // Assert that the popover is now open
    expect(target).toHaveClass('bp4-popover2-open');
  });

  it('should trigger the useEffect callback when the column is added with right formula', () => {
    const screen = renderComponent();
    const updatedColumns = [
      ...testColumns,
      {
        columnId: 'column_4',
        columnName: 'Column 4',
        columnType: 'data',
        formula: '123',
        aggregateFunctions: [],
      },
    ];

    mockAddCalculatedField.mockReturnValueOnce([]);

    // Change the columns
    screen.rerender(
      <ColumnsContext.Provider
        value={{
          columns: updatedColumns,
          dispatch: mockDispatch,
        }}
      >
        <OpviaTable />
      </ColumnsContext.Provider>,
    );

    expect(mockAddCalculatedField).toHaveBeenCalledTimes(2);
    expect(mockAddCalculatedField).toHaveBeenCalledWith(
      testData,
      updatedColumns,
    );
    expect(showToast).toHaveBeenCalledWith(
      formulaEvaluationSuccessMessage,
      'success',
    );
  });

  it('should delete the column when added with wrong formula', () => {
    const screen = renderComponent();
    const updatedColumns = [
      ...testColumns,
      {
        columnId: 'column_4',
        columnName: 'Column 4',
        columnType: 'data',
        formula: 'x + y',
        aggregateFunctions: [],
      },
    ];

    mockAddCalculatedField.mockReturnValueOnce(undefined);

    // Change the columns
    screen.rerender(
      <ColumnsContext.Provider
        value={{
          columns: updatedColumns,
          dispatch: mockDispatch,
        }}
      >
        <OpviaTable />
      </ColumnsContext.Provider>,
    );

    expect(mockAddCalculatedField).toHaveBeenCalledTimes(2);
    expect(mockAddCalculatedField).toHaveBeenCalledWith(
      testData,
      updatedColumns,
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_COLUMNS',
      payload: testColumns,
    });
  });
});
