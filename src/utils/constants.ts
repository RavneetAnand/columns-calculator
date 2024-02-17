export const aggregateFunctions = [
  'COUNT',
  'SUM',
  'AVG',
  'MAX',
  'MIN',
  'STDDEV',
  'VARIANCE',
  'MEDIAN',
];

export const arithmeticOperators = [
  '+',
  '-',
  '*',
  '÷',
  '%',
  '<',
  '>',
  '≤',
  '≥',
  '(',
  ')',
];

export type AggregateFunctionType = (typeof aggregateFunctions)[number];

export const defaultAggregateFunctions = ['COUNT', 'SUM', 'AVG', 'MAX', 'MIN'];
export const timeAggregateFunctions = ['COUNT', 'MAX', 'MIN'];

export const columns = [
  {
    columnName: 'Time',
    columnType: 'time',
    columnId: 'time_col',
    aggregateFunctions: timeAggregateFunctions,
  },
  {
    columnName: 'Cell Density (Cell Count/Litre)',
    columnType: 'data',
    columnId: 'var_col_1',
    aggregateFunctions: defaultAggregateFunctions,
  },
  {
    columnName: 'Volume (Litres)',
    columnType: 'data',
    columnId: 'var_col_2',
    aggregateFunctions: defaultAggregateFunctions,
  },
];
