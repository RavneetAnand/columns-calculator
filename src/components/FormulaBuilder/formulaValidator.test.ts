import {
  balancedParenthesesMessage,
  consecutiveOperatorsMessage,
  emptyFormulaMessage,
  endsWithOperatorMessage,
  invalidOperandsMessage,
  validFormulaMessage,
} from '../../utils/messages';
import { validateFormula } from './formulaValidator';

describe('validateFormula', () => {
  it('should return false for empty formula', () => {
    const result = validateFormula('', ['column1', 'column2']);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(emptyFormulaMessage);
  });

  it('should return false for unbalanced parentheses', () => {
    const result = validateFormula('(1 + 2', ['column1', 'column2']);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(balancedParenthesesMessage);
  });

  it('should return false for invalid operands', () => {
    const result = validateFormula('column3 + 4', ['column1', 'column2']);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(invalidOperandsMessage);
  });

  it('should return false for consecutive operators', () => {
    const result = validateFormula('1 ++ 2', ['column1', 'column2']);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(consecutiveOperatorsMessage);
  });

  it('should return false for formula ending with an operator', () => {
    const result = validateFormula('1 + 2 +', ['column1', 'column2']);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(endsWithOperatorMessage);
  });

  it('should return true for valid formula', () => {
    const result = validateFormula('1 + 2 * column1', ['column1', 'column2']);
    expect(result.isValid).toBe(true);
    expect(result.message).toBe(validFormulaMessage);
  });
});
