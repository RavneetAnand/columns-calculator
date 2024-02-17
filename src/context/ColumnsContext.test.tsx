import { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';
import {
  ColumnsProvider,
  ColumnsContext,
  SET_COLUMNS,
  SET_AGGREGATE_FUNCTION,
} from './ColumnsContext';

describe('ColumnsContext', () => {
  it('should render without crashing', () => {
    render(
      <ColumnsProvider>
        <div />
      </ColumnsProvider>,
    );
  });

  it('should update columns when dispatch SET_COLUMNS', () => {
    const TestComponent = () => {
      const { columns, dispatch } = useContext(ColumnsContext);

      useEffect(() => {
        dispatch({
          type: SET_COLUMNS,
          payload: [
            {
              columnId: '1',
              columnName: 'Column 1',
              formula: 'x + y',
              columnType: 'data',
              aggregateFunctions: [],
            },
          ],
        });
      }, [dispatch]);

      return <div>{columns.length}</div>;
    };

    const { getByText } = render(
      <ColumnsProvider>
        <TestComponent />
      </ColumnsProvider>,
    );

    expect(getByText('1')).toBeDefined();
  });

  it('should update aggregate functions when dispatch SET_AGGREGATE_FUNCTION', () => {
    const TestComponent = () => {
      const { columns, dispatch } = useContext(ColumnsContext);
      useEffect(() => {
        dispatch({
          type: SET_AGGREGATE_FUNCTION,
          payload: { columnId: 'var_col_2', aggregateFunctions: ['SUM'] },
        });
      }, [dispatch]);

      return (
        <div>
          {columns
            .find((col) => col.columnId === 'var_col_2')
            ?.aggregateFunctions.join(',')}
        </div>
      );
    };

    const { getByText } = render(
      <ColumnsProvider>
        <TestComponent />
      </ColumnsProvider>,
    );

    expect(getByText('SUM')).toBeDefined();
  });
});
