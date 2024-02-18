import React from 'react';
import { SubContainer, SyntaxValidationText } from './FormulaBuilder.styles';

import {
  ClearFormulaButton,
  FormulaContainer,
} from './FormulaExpression.styles';
import {
  emptyColumnNameMessage,
  emptyFormulaMessage,
} from '../../utils/messages';

type FormulaExpressionProps = {
  expression: string;
  setFormula: (expression: string) => void;
  formulaValidation: { isValid: boolean; message: string };
  setFormulaValidation: (formulaValidation: {
    isValid: boolean;
    message: string;
  }) => void;
};

export const FormulaExpression: React.FC<FormulaExpressionProps> = ({
  expression,
  setFormula,
  formulaValidation,
  setFormulaValidation,
}) => {
  return (
    <SubContainer data-testid="formulaExpression">
      <h3>Formula Expression</h3>
      <FormulaContainer>
        <div data-testid="formulaField">{expression}</div>
        {!!expression.trim() && (
          <ClearFormulaButton
            data-testid="clearFormulaButton"
            onClick={() => {
              setFormula('');
              setFormulaValidation({
                isValid: false,
                message: emptyFormulaMessage,
              });
            }}
          >
            x
          </ClearFormulaButton>
        )}
      </FormulaContainer>
      {formulaValidation.message !== emptyColumnNameMessage && (
        <SyntaxValidationText $isValid={formulaValidation.isValid}>
          {formulaValidation.message}
        </SyntaxValidationText>
      )}
    </SubContainer>
  );
};
