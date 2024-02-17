import { fireEvent, render } from '@testing-library/react';
import { FormulaBuilder } from './FormulaBuilder';
import { ColumnsContext, ColumnsType } from '../../context/ColumnsContext';
import '@testing-library/jest-dom';

const mockToggleSlider = jest.fn();

const columns: ColumnsType[] = [
  {
    columnName: 'column1',
    columnType: 'data',
    aggregateFunctions: ['SUM'],
    columnId: 'column1',
  },
  {
    columnName: 'column2',
    columnType: 'data',
    aggregateFunctions: ['SUM'],
    columnId: 'column2',
  },
];

const renderComponent = () => {
  return render(
    <ColumnsContext.Provider value={{ columns, dispatch: jest.fn() }}>
      <FormulaBuilder toggleSlider={mockToggleSlider} />
    </ColumnsContext.Provider>,
  );
};

describe('FormulaBuilder', () => {
  it('should render without crashing', () => {
    renderComponent();
  });

  it('should update the column name when the input field is changed', () => {
    const screen = renderComponent();

    const inputField = screen.getByPlaceholderText('Enter column name');
    fireEvent.change(inputField, { target: { value: 'new column' } });

    expect((inputField as HTMLInputElement).value).toBe('new column');
  });

  it('should update the formula when a table column is clicked', () => {
    const screen = renderComponent();

    const tableColumn = screen.getByText('column1');
    fireEvent.click(tableColumn);

    const formulaExpression = screen.getByTestId('formulaExpression');
    expect(formulaExpression.textContent).toContain('column1');
  });

  it('should update the formula when an operator is clicked', () => {
    const screen = renderComponent();

    const operator = screen.getByText('+');
    fireEvent.click(operator);

    const formulaExpression = screen.getByTestId('formulaExpression');
    expect(formulaExpression.textContent).toContain('+');
  });

  it('should validate the form when the validate button is clicked', () => {
    const screen = renderComponent();

    const validateButton = screen.getByText('Validate form');
    fireEvent.click(validateButton);

    const syntaxValidationText = screen.getByTestId('syntaxValidationText');
    expect(syntaxValidationText).toBeDefined();
  });

  it('should disable the add column button when the form is invalid', () => {
    const screen = renderComponent();

    const addButton = screen.getByTestId('addColumnButton');
    expect(addButton).toBeDisabled();
  });

  it('should add a new column and close the slider when the add column button is clicked', () => {
    const screen = renderComponent();

    const inputField = screen.getByPlaceholderText('Enter column name');
    fireEvent.change(inputField, { target: { value: 'new column' } });

    const tableColumn = screen.getByText('column1');
    fireEvent.click(tableColumn);

    const validateButton = screen.getByText('Validate form');
    fireEvent.click(validateButton);

    const addButton = screen.getByTestId('addColumnButton');
    fireEvent.click(addButton);

    expect(mockToggleSlider).toHaveBeenCalled();
  });
});
