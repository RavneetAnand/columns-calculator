import styled from 'styled-components';
import { Button } from '@blueprintjs/core';

export const FormulaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 52px;

  width: 100%;
  padding: 10px;

  border: 1px solid #e2e8f0;
  border-radius: 8px;
`;

export const ClearFormulaButton = styled(Button)`
  background-color: white !important;
  color: rgb(220 38 38) !important;
  box-shadow: none !important;
  border: none;
  margin: 0 5px;

  font-weight: 500;
  }
`;
