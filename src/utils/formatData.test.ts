import { ColumnsType } from '../context/ColumnsContext';
import {
  addCalculatedField,
  convertDataFormat,
  formatDateTime,
  safeEvaluate,
  times,
} from './formatData';

jest.mock('./toast', () => ({
  showToast: jest.fn(),
}));

describe('formatData', () => {
  const columns2 = [
    {
      columnName: 'column1',
      columnId: 'column1',
      columnType: 'data',
      aggregateFunctions: [],
    },
    {
      columnName: 'column2',
      columnId: 'column2',
      columnType: 'data',
      aggregateFunctions: [],
    },
  ];
  describe('#safeEvaluate', () => {
    const columns = [
      {
        columnName: 'column1',
        columnId: 'column1',
        columnType: 'data',
        aggregateFunctions: [],
      },
    ];

    it('should correctly evaluate an expression', () => {
      const result = safeEvaluate('1 + 2 * column1', { column1: 3 }, columns);
      expect(result).toBe(7);
    });

    it('should replace column names with their values in the context', () => {
      const result = safeEvaluate(
        'column1 + column2',
        { column1: 1, column2: 2 },
        [
          ...columns,
          {
            columnName: 'column2',
            columnId: 'column2',
            columnType: 'data',
            aggregateFunctions: [],
          },
        ],
      );
      expect(result).toBe(3);
    });

    it('should return "Error" for an invalid expression', () => {
      const result = safeEvaluate('1 +', { column1: 1 }, columns);
      expect(result).toBe('Error');
    });

    it('should return a number as is if it is an integer', () => {
      const result = safeEvaluate('1 + 2', {}, []);
      expect(result).toBe(3);
    });

    it('should return a number with two decimal places if it is a float', () => {
      const result = safeEvaluate('1 / 2', {}, []);
      expect(result).toBe('0.50');
    });
  });

  describe('#addCalculatedField', () => {
    const data = [
      { column1: 1, column2: 2 },
      { column1: 3, column2: 4 },
    ];

    it('should add a calculated field to the data', () => {
      const calculatedColumn: ColumnsType = {
        columnId: 'calculated_column',
        columnName: 'Calculated Column',
        columnType: 'data',
        formula: 'column1 + column2',
        aggregateFunctions: [],
      };

      const result = addCalculatedField(data, [...columns2, calculatedColumn]);
      expect(result).toEqual([
        { column1: 1, column2: 2, calculated_column: '3' },
        { column1: 3, column2: 4, calculated_column: '7' },
      ]);
    });

    it('should return "Error" for an invalid formula', () => {
      const calculatedColumn = {
        columnId: 'calculated_column',
        columnName: 'Calculated Column',
        formula: '1 +',
        columnType: 'data',
        aggregateFunctions: [],
      };

      const columns3 = [...columns2, calculatedColumn];

      const result = addCalculatedField(data, columns3);
      expect(result).toBeUndefined();
    });
  });

  describe('convertDataFormat', () => {
    it('should convert data from array format to object format', () => {
      const data = {
        '0-0': '2021-01-01T20:00:00Z',
        '0-1': '2021-01-01T21:00:00Z',
        '1-0': '100',
        '1-1': '101',
      };

      const result = convertDataFormat(data, columns2);
      expect(result).toEqual([
        { column1: '2021-01-01T20:00:00Z', column2: '100', id: '0' },
        { column1: '2021-01-01T21:00:00Z', column2: '101', id: '1' },
      ]);
    });

    it('should return an empty array for empty data', () => {
      const data = {};

      const result = convertDataFormat(data, columns2);
      expect(result).toEqual([]);
    });
  });

  describe('#formatDateTime', () => {
    it('should correctly format a date time string', () => {
      const result = formatDateTime('2021-01-01T20:00:00Z');
      expect(result).toBe('Jan 01, 21, 8:00:00 PM GMT');
    });

    it('should correctly format a date time string in a different timezone', () => {
      const result = formatDateTime('2021-01-01T20:00:00-05:00');
      expect(result).toBe('Jan 02, 21, 1:00:00 AM GMT');
    });

    it('should return "Invalid Date" for an invalid date string', () => {
      const result = formatDateTime('invalid date');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('#times', () => {
    it('should correctly repeat a function n times', () => {
      const mockFn = jest.fn();
      times(3, mockFn);

      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it('should pass the index to the function', () => {
      const mockFn = jest.fn();
      times(3, mockFn);

      expect(mockFn).toHaveBeenNthCalledWith(1, 0);
      expect(mockFn).toHaveBeenNthCalledWith(2, 1);
      expect(mockFn).toHaveBeenNthCalledWith(3, 2);
    });

    it('should return an array of the results', () => {
      const result = times(3, (i) => i * 2);

      expect(result).toEqual([0, 2, 4]);
    });

    it('should return an empty array for n = 0', () => {
      const mockFn = jest.fn();
      const result = times(0, mockFn);

      expect(mockFn).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
