import React from 'react';
import { SubContainer, OperatorButton } from './FormulaBuilder.styles';

type OperatorsProps = {
  addToFormula: (
    eventProps: React.MouseEvent<HTMLElement>,
    addSpace?: boolean,
  ) => void;
};

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

export const Operators: React.FC<OperatorsProps> = ({ addToFormula }) => {
  const numbers = Array(10)
    .fill(1)
    .map((_, index) => index);

  const numbersAndOperators = [...numbers, ...arithmeticOperators];

  return (
    <SubContainer>
      <h3>Numbers & Operators</h3>
      <div style={{ textAlign: 'center' }}>
        {numbersAndOperators.map((operator, index) => (
          <OperatorButton
            key={index}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              let addSpace = true;
              if (typeof operator === 'number') {
                addSpace = false;
              }
              addToFormula(e, addSpace);
            }}
          >
            {operator}
          </OperatorButton>
        ))}
      </div>
    </SubContainer>
  );
};
