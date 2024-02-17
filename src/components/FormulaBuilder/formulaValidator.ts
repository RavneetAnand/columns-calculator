import { arithmeticOperators } from '../../utils/constants';
import {
  emptyFormulaMessage,
  balancedParenthesesMessage,
  invalidOperandsMessage,
  consecutiveOperatorsMessage,
  endsWithOperatorMessage,
  validFormulaMessage,
} from '../../utils/messages';

type ValidationResult = {
  isValid: boolean;
  message: string;
};

export const validateFormula = (
  expression: string,
  columnNames: string[],
): ValidationResult => {
  // Check if empty
  if (!expression.trim()) {
    return { isValid: false, message: emptyFormulaMessage };
  }

  // Replace valid column names with a placeholder number to simplify validation
  columnNames.forEach((column) => {
    expression = expression.replace(column, '1');
  });

  // Check for balanced parentheses
  const parenthesesBalance = expression.split('').reduce((balance, char) => {
    if (balance < 0) {
      return balance; // found a closing parenthesis before an opening
    }
    if (char === '(') {
      return balance + 1;
    } else if (char === ')') {
      return balance - 1;
    }
    return balance;
  }, 0);

  if (parenthesesBalance !== 0) {
    return { isValid: false, message: balancedParenthesesMessage };
  }

  // Replace all spaces and split by valid operators to isolate potential operands
  const operands = expression
    .replace(/ /g, '')
    .split(new RegExp(`\\${arithmeticOperators.join('\\')}|\\(|\\)`, 'g'))
    .filter(Boolean);

  // Check that all operands are either numbers or were valid column names
  const allOperandsValid = operands.every(
    (operand) => !isNaN(parseFloat(operand)),
  );

  if (!allOperandsValid) {
    return {
      isValid: false,
      message: invalidOperandsMessage,
    };
  }

  const operatorsToCheck = arithmeticOperators.filter(
    (operator: string) => operator !== '(' && operator !== ')',
  );

  // Check for consecutive operators (not including parentheses)
  const operatorsToCheckString = operatorsToCheck
    .join('')
    .replace(/[+]/g, '\\+')
    .replace(/[-]/g, '\\-');

  const operatorSequenceCheck = new RegExp(
    `[${operatorsToCheckString}]\\s*[${operatorsToCheckString}]`,
  );

  if (operatorSequenceCheck.test(expression)) {
    return {
      isValid: false,
      message: consecutiveOperatorsMessage,
    };
  }

  // Check for an operator at the end of the expression
  if (operatorsToCheck.includes(expression.trim().slice(-1))) {
    return { isValid: false, message: endsWithOperatorMessage };
  }

  return { isValid: true, message: validFormulaMessage };
};
