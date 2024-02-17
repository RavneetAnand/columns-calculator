import { ColumnsType } from '../context/ColumnsContext';
import { AggregateFunctionType } from './constants';

export const applyAggregateFunctionToTimeColumn = (
  data: { [key: string]: any }[],
  column: ColumnsType,
  aggregateFunction: AggregateFunctionType,
): number | string | Date => {
  const { columnId } = column;

  // For datetime operations, convert strings to Date objects
  const dateValues = data.map((row) => new Date(row[columnId] as string));

  switch (aggregateFunction) {
    // Existing cases for numeric and string aggregates...
    case 'MIN':
      return new Date(Math.min(...dateValues.map((date) => date.getTime())));
    case 'MAX':
      return new Date(Math.max(...dateValues.map((date) => date.getTime())));
    case 'COUNT':
      return dateValues.length;
    default:
      return 0;
  }
};

export const applyAggregateFunction = (
  data: { [key: string]: any }[],
  column: ColumnsType,
  aggregateFunction: AggregateFunctionType,
): number => {
  const { columnId } = column;

  const values = data
    .map((row) => Number(row[columnId]))
    .filter((val) => !isNaN(val));

  switch (aggregateFunction) {
    case 'SUM':
      return values.reduce((acc, val) => acc + val, 0);
    case 'AVG':
      return values.reduce((acc, val) => acc + val, 0) / values.length;
    case 'COUNT':
      return values.length;
    case 'MAX':
      return Math.max(...values);
    case 'MIN':
      return Math.min(...values);
    case 'STDDEV': {
      const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
      const result = Math.sqrt(
        values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
          values.length,
      );
      return Number(result.toFixed(2));
    }
    case 'VARIANCE': {
      const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
      const result =
        values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
        values.length;
      return Number(result.toFixed(2));
    }
    case 'MEDIAN': {
      const sortedValues = values.slice().sort((a, b) => a - b);
      const mid = Math.floor(sortedValues.length / 2);
      const result =
        sortedValues.length % 2 !== 0
          ? sortedValues[mid]
          : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
      return Number(result.toFixed(2));
    }
    default:
      return 0;
  }
};
