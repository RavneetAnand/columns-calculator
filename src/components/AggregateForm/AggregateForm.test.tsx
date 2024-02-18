import { render, fireEvent } from '@testing-library/react';
import { ColumnsContext } from '../../context/ColumnsContext';
import AggregateForm from './AggregateForm';
import '@testing-library/jest-dom';

// mock the showToast function
jest.mock('../../utils/toast', () => ({
  showToast: jest.fn(),
}));

describe('AggregateForm', () => {
  const columns = [
    {
      columnName: 'column1',
      columnId: 'column1',
      columnType: 'data',
      aggregateFunctions: [],
    },
    {
      columnName: 'column2',
      columnId: 'column2',
      columnType: 'time',
      aggregateFunctions: [],
    },
  ];

  const dispatch = jest.fn();

  const renderComponent = () => {
    return render(
      <ColumnsContext.Provider value={{ columns, dispatch }}>
        <AggregateForm />
      </ColumnsContext.Provider>,
    );
  };

  it('should render without crashing', () => {
    renderComponent();
  });

  it('should update selected column when a column is selected', () => {
    const screen = renderComponent();

    const select = screen.getByTestId('columnSelect');
    fireEvent.change(select, { target: { value: 'column1' } });

    expect(screen.getByDisplayValue('column1')).toBeInTheDocument();
  });

  it('should update selected functions when a function is checked', () => {
    const screen = renderComponent();

    const checkbox = screen.getByLabelText('SUM');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should update selected functions when a function is checked again', () => {
    const screen = renderComponent();

    const checkbox = screen.getByLabelText('SUM');
    fireEvent.click(checkbox);

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('should clear selected column and functions when clear button is clicked', () => {
    const screen = renderComponent();

    const select = screen.getByTestId('columnSelect');
    fireEvent.change(select, { target: { value: 'column1' } });

    const checkbox = screen.getByLabelText('SUM');
    fireEvent.click(checkbox);

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(screen.getByText('Select a column')).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should dispatch SET_AGGREGATE_FUNCTION action when submit button is clicked', () => {
    const screen = renderComponent();

    const select = screen.getByTestId('columnSelect');
    fireEvent.change(select, { target: { value: 'column1' } });

    const checkbox = screen.getByLabelText('SUM');
    fireEvent.click(checkbox);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_AGGREGATE_FUNCTION',
      payload: {
        columnId: 'column1',
        aggregateFunctions: ['SUM'],
      },
    });
  });

  it("should display items as disabled if they're not valid for time type", () => {
    const screen = renderComponent();

    const select = screen.getByTestId('columnSelect');
    fireEvent.change(select, { target: { value: 'column2' } });

    const checkbox = screen.getByLabelText('AVG');
    expect(checkbox).toBeDisabled();
  });
});
