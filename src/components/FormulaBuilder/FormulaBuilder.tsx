import { useContext, useState } from 'react';
import {
  FormulaBuilderContainer,
  SyntaxValidationText,
  TopContainer,
} from './FormulaBuilder.styles';
import { InputField } from './InputField';
import { Operators } from './Operators';
import { FormulaExpression } from './FormulaExpression';
import { TableColumns } from './TableColumns';
import { emptyColumnNameMessage } from '../../utils/messages';
import { ColumnsContext, SET_COLUMNS } from '../../context/ColumnsContext';
import { ActionButton } from '../SliderPanel/SliderPanel.styles';
import { defaultAggregateFunctions } from '../../utils/constants';
import { validateFormula } from './formulaValidator';
import { expression } from 'mathjs';

type FormulaBuilderProps = {
  toggleSlider: () => void;
};

export const FormulaBuilder = ({ toggleSlider }: FormulaBuilderProps) => {
  const [columnName, setColumnName] = useState('');
  const [formula, setFormula] = useState('');
  const [formValidation, setFormValidation] = useState({
    isValid: false,
    message: '',
  });

  const { columns: allColumns, dispatch } = useContext(ColumnsContext);
  const columnHeaders = allColumns.map((col) => col.columnName);

  const isColumnNameValid = !!columnName.trim();

  const validateColumn = () => {
    // Validate the column name
    if (!isColumnNameValid) {
      setFormValidation({
        isValid: false,
        message: emptyColumnNameMessage,
      });
      return;
    }
    // Validate the formula
    const isFormulaValid = validateFormula(formula.trim(), columnHeaders);
    setFormValidation(isFormulaValid);
  };

  const addToFormula = (
    eventProps: React.MouseEvent<HTMLElement>,
    addSpace = true,
  ) => {
    const str = (eventProps.target as HTMLButtonElement).textContent;
    const updatedFormula = `${formula}${addSpace ? ` ${str} ` : str}`;

    setFormula(updatedFormula);
  };

  // Add a new column
  const addCalculatedColumn = () => {
    const sanitizedFormula = formula
      .replace('÷', '/')
      .replace('≤', '<=')
      .replace('≥', '>=')
      .trim();

    dispatch({
      type: SET_COLUMNS,
      payload: [
        ...allColumns,
        {
          columnName,
          formula: sanitizedFormula,
          columnType: 'data',
          columnId: `calculated_col_${allColumns.length}`,
          aggregateFunctions: defaultAggregateFunctions,
        },
      ],
    });

    // Clear the form
    setColumnName('');
    setFormula('');
    setFormValidation({ isValid: false, message: '' });

    // Close the slider
    toggleSlider();
  };

  const showEmptyColumnNameMessage =
    !formValidation.isValid &&
    formValidation.message === emptyColumnNameMessage;

  return (
    <FormulaBuilderContainer data-testid="formulaBuilderPanel">
      <TopContainer>
        <h3>Column name</h3>
        <ActionButton
          data-testid="addColumnButton"
          onClick={addCalculatedColumn}
          disabled={!formValidation.isValid || !isColumnNameValid}
        >
          Add Column
        </ActionButton>
      </TopContainer>
      <InputField
        value={columnName}
        onChange={setColumnName}
        placeholder="Enter column name"
      />
      {showEmptyColumnNameMessage && (
        <SyntaxValidationText
          $isValid={false}
          data-testid="syntaxValidationText"
        >
          {formValidation.message}
        </SyntaxValidationText>
      )}
      <FormulaExpression
        expression={formula}
        setFormula={setFormula}
        formulaValidation={formValidation}
        setFormulaValidation={setFormValidation}
      />
      <ActionButton onClick={validateColumn}>Validate form</ActionButton>
      <TableColumns addToFormula={addToFormula} />
      <Operators addToFormula={addToFormula} />
    </FormulaBuilderContainer>
  );
};
