import { ColumnsType } from '../context/ColumnsContext';
import {
  columns,
  defaultAggregateFunctions,
  timeAggregateFunctions,
} from './constants';

describe('Columns', () => {
  it('should have the correct length', () => {
    expect(columns.length).toBe(3);
  });

  it('should have the correct column names', () => {
    const columnNames = columns.map((column: ColumnsType) => column.columnName);
    expect(columnNames).toEqual([
      'Time',
      'Cell Density (Cell Count/Litre)',
      'Volume (Litres)',
    ]);
  });

  it('should have the correct column types', () => {
    const columnTypes = columns.map((column) => column.columnType);
    expect(columnTypes).toEqual(['time', 'data', 'data']);
  });

  it('should have the correct column ids', () => {
    const columnIds = columns.map((column) => column.columnId);
    expect(columnIds).toEqual(['time_col', 'var_col_1', 'var_col_2']);
  });

  it('should have the correct aggregate functions', () => {
    const aggregateFunctions = columns.map(
      (column) => column.aggregateFunctions,
    );
    expect(aggregateFunctions).toEqual([
      timeAggregateFunctions,
      defaultAggregateFunctions,
      defaultAggregateFunctions,
    ]);
  });
});
