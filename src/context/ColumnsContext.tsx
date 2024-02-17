import { Dispatch, FC, ReactNode, createContext, useReducer } from 'react';
import { AggregateFunctionType, columns } from '../utils/constants';

// Define the action types for the context
export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_AGGREGATE_FUNCTION = 'SET_AGGREGATE_FUNCTION';

export type ColumnsType = {
  columnName: string;
  formula?: string;
  columnType: string;
  columnId: string;
  aggregateFunctions: AggregateFunctionType[];
};

type ColumnsContextType = {
  columns: ColumnsType[];
  dispatch: Dispatch<any>;
};

// Define the initial state with a matching structure and a dummy setter function
const initialState: ColumnsContextType = {
  dispatch: () => {},
  // Check local storage for any saved values
  columns:
    JSON.parse(localStorage.getItem('columnsContext') || '{}').columns ||
    columns,
};

const updateColumnAggregateFunction = (
  columns: ColumnsType[],
  updatedColumn: ColumnsType,
) => {
  const updatedColumns = columns.map((col) => {
    if (col.columnId === updatedColumn.columnId) {
      col = { ...col, aggregateFunctions: updatedColumn.aggregateFunctions };
      return col;
    }
    return col;
  });

  return updatedColumns;
};

const reducer = (
  state: ColumnsContextType,
  action: { type: string; payload: any },
) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_COLUMNS:
      newState = { ...state, columns: action.payload };
      break;
    case SET_AGGREGATE_FUNCTION:
      const updateColumns = updateColumnAggregateFunction(
        state.columns,
        action.payload,
      );
      newState = { ...state, columns: updateColumns };
      break;
    default:
      throw new Error();
  }

  localStorage.removeItem('columnsContext');
  localStorage.setItem('columnsContext', JSON.stringify(newState));
  return newState;
};

// Creating the context with the initialState as the default value
const ColumnsContext = createContext<ColumnsContextType>(initialState);

// Context provider component
const ColumnsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ColumnsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ColumnsContext.Provider>
  );
};

export { ColumnsContext, ColumnsProvider };
