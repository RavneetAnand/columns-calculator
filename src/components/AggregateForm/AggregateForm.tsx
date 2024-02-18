import React, { useContext, useState } from 'react';
import {
  ButtonsContainer,
  FormContainer,
  FunctionCheckbox,
  StyledHTMLSelect,
  ActionButton2,
} from './AggregateForm.styles';
import {
  ColumnsContext,
  SET_AGGREGATE_FUNCTION,
} from '../../context/ColumnsContext';
import {
  aggregateFunctions,
  timeAggregateFunctions,
} from '../../utils/constants';
import { showToast } from '../../utils/toast';
import { aggregateFunctionsSaved } from '../../utils/messages';

const AggregateForm = () => {
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);

  const { columns, dispatch } = useContext(ColumnsContext);

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const colId = event.target.value;
    setSelectedColumn(colId);

    setSelectedFunctions(() => {
      const selectedCol = columns.find((col) => col.columnId === colId);
      return selectedCol?.aggregateFunctions || [];
    });
  };

  const handleFunctionListChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setSelectedFunctions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = () => {
    // Save the selected column and functions to the context
    dispatch({
      type: SET_AGGREGATE_FUNCTION,
      payload: {
        columnId: selectedColumn,
        aggregateFunctions: selectedFunctions, // Save the selected functions to the column
      },
    });

    showToast(aggregateFunctionsSaved, 'success');
  };

  const clear = () => {
    setSelectedColumn('');
    setSelectedFunctions([]);
  };

  const isOptionDisabled = (func: string) => {
    // If the selected column is of type "time", disable the function checkboxes not available in defaultTimeAggregateFunctions
    const selectedCol = columns.find((col) => col.columnId === selectedColumn);

    if (selectedCol?.columnType === 'time') {
      return !timeAggregateFunctions.includes(func);
    }
    return false;
  };

  return (
    <FormContainer data-testid="aggregateFormPanel">
      <h3>Choose a column name:</h3>
      <StyledHTMLSelect
        id="column-select"
        data-testid="columnSelect"
        onChange={handleColumnChange}
        defaultValue={'placeholder'}
      >
        <option value="placeholder">Select a column</option>
        {columns.map((col) => (
          <option key={col.columnId} value={col.columnId}>
            {col.columnName}
          </option>
        ))}
      </StyledHTMLSelect>

      <h3>Select aggregate functions:</h3>
      {aggregateFunctions.map((func) => (
        <FunctionCheckbox
          key={func}
          label={func}
          value={func}
          checked={selectedFunctions.includes(func)}
          disabled={isOptionDisabled(func) ? true : false}
          onChange={handleFunctionListChange}
        />
      ))}
      <ButtonsContainer>
        <ActionButton2 text="Clear" onClick={clear} />
        <ActionButton2 text="Submit" onClick={handleSubmit} />
      </ButtonsContainer>
    </FormContainer>
  );
};

export default AggregateForm;
