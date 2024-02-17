import styled from 'styled-components';
import { Button } from '@blueprintjs/core';

export const FormulaBuilderContainer = styled.div`
  background: #fff;
  padding: 0 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Align the content to left */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const SubContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
`;

export const InputContainer = styled.input`
  width: 100%;
  padding: 10px;
`;

export const StyledButton = styled(Button)`
  background-color: #2dd3bf !important;
  color: white !important;
  font-weight: bold;

  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  margin: 5px;

  /* Set button label show ellipsis if it's too long */
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px;
  text-align: center;

  &:hover {
    background-color: #28c0ab !important;
    cursor: pointer;
  }
`;

export const ColumnNameButton = styled(StyledButton)`
  width: 65px;
`;

export const OperatorButton = styled(StyledButton)`
  width: 40px;
`;

export const SyntaxValidationText = styled.p<{ $isValid: boolean }>`
  color: ${({ $isValid }) => ($isValid ? 'green' : 'rgb(220 38 38)')};
  margin-top: 5px;
  margin-bottom: 0;
`;
