import {
  applyAggregateFunctionToTimeColumn,
  applyAggregateFunction,
} from './aggregateFunctionHelpers';

describe('aggregateFunctionHelpers', () => {
  describe('#applyAggregateFunctionToTimeColumn', () => {
    const data = [
      { date1: '2021-01-01T20:00:00Z' },
      { date1: '2021-01-02T20:00:00Z' },
    ];
    const column = {
      columnId: 'date1',
      columnName: 'Date1',
      columnType: 'time',
      aggregateFunctions: ['MIN', 'MAX', 'COUNT'],
    };
    it('should return the minimum date', () => {
      const aggregateFunction = 'MIN';

      const result = applyAggregateFunctionToTimeColumn(
        data,
        column,
        aggregateFunction,
      );
      expect(result).toEqual(new Date('2021-01-01T20:00:00Z'));
    });

    it('should return the maximum date', () => {
      const aggregateFunction = 'MAX';

      const result = applyAggregateFunctionToTimeColumn(
        data,
        column,
        aggregateFunction,
      );
      expect(result).toEqual(new Date('2021-01-02T20:00:00Z'));
    });

    it('should return the count of dates', () => {
      const aggregateFunction = 'COUNT';

      const result = applyAggregateFunctionToTimeColumn(
        data,
        column,
        aggregateFunction,
      );
      expect(result).toEqual(2);
    });
  });

  describe('#applyAggregateFunction', () => {
    const data = [{ value: 1 }, { value: 2 }];
    const column = {
      columnId: 'value',
      columnName: 'Value',
      columnType: 'data',
      aggregateFunctions: [],
    };

    it('should return the sum of values', () => {
      const aggregateFunction = 'SUM';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(3);
    });

    // Add more tests for AVG, COUNT, MAX, MIN, STDDEV, VARIANCE, MEDIAN
    it('should return the average of values', () => {
      const aggregateFunction = 'AVG';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(1.5);
    });

    it('should return the count of values', () => {
      const aggregateFunction = 'COUNT';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(2);
    });

    it('should return the maximum value', () => {
      const aggregateFunction = 'MAX';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(2);
    });

    it('should return the minimum value', () => {
      const aggregateFunction = 'MIN';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(1);
    });

    it('should return the standard deviation of values', () => {
      const aggregateFunction = 'STDDEV';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(0.5);
    });

    it('should return the variance of values', () => {
      const aggregateFunction = 'VARIANCE';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(0.25);
    });

    it('should return the median of values', () => {
      const aggregateFunction = 'MEDIAN';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(1.5);
    });

    it('should return 0 for an invalid aggregate function', () => {
      const aggregateFunction = 'INVALID';

      const result = applyAggregateFunction(data, column, aggregateFunction);
      expect(result).toEqual(0);
    });
  });
});
