import { ColumnsType } from '../context/ColumnsContext';
import { evaluate } from 'mathjs';
import { showToast } from './toast';
import { formulaEvaluationErrorMessage } from './messages';

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  if (date.toString() === 'Invalid Date') {
    return date.toString();
  }

  return new Intl.DateTimeFormat('en-UK', {
    year: '2-digit',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(date);
}

export const convertDataFormat = (
  dummyTableData: {
    [key: string]: string | number;
  },
  columns: ColumnsType[],
): [] => {
  // Convert data into a json object in format, e.g.,
  // {time_col: '2021-01-01T20:00:00Z', var_col_1: 0, var_col_2: 0}
  const formattedData: any = [];
  for (const key in dummyTableData) {
    const [columnIndex, rowIndex] = key.split('-');

    if (!formattedData[rowIndex]) {
      formattedData[rowIndex] = {};
    }

    const { columnId } = columns[Number(columnIndex)];
    formattedData[rowIndex][columnId] = dummyTableData[key] as string;

    formattedData[rowIndex]['id'] = rowIndex;
  }
  return formattedData;
};

export const safeEvaluate = (
  expression: string,
  context: { [key: string]: any },
  columns: ColumnsType[],
) => {
  let result;

  try {
    let preparedExpression: string = expression;
    columns.forEach(({ columnName, columnId }) => {
      preparedExpression = preparedExpression.replace(
        columnName,
        context[columnId],
      );
    });

    result = evaluate(preparedExpression);
  } catch (e: any) {
    console.error('Cannot evaluate the formula', e.message);
    showToast(formulaEvaluationErrorMessage, 'danger');
    return 'Error';
  }

  if (typeof result === 'number' && !Number.isInteger(result)) {
    return result.toFixed(2);
  }

  return result;
};

export const addCalculatedField = (
  data: { [key: string]: any }[],
  allColumns: ColumnsType[],
) => {
  // Get the columns with formulas
  const calculatedColumns = allColumns.filter((col) => col.formula);
  let breakFlag = false;

  for (const item of data) {
    // Add the calculated fields to the data
    for (const col of calculatedColumns) {
      const { columnId, formula } = col;

      if (formula) {
        const value = safeEvaluate(formula, item, allColumns).toString();

        // If the result is an error, display a toast message
        if (value === 'Error') {
          breakFlag = true;
          break;
        }

        item[columnId] = value;
      }
    }
    if (breakFlag) {
      return;
    }
  }
  return data;
};

export function times<T>(n: number, callback: (i: number) => T): T[] {
  if (n < 0) {
    return [];
  }
  const result: T[] = Array(n);
  for (let index = 0; index < n; index++) {
    result[index] = callback(index);
  }
  return result;
}
