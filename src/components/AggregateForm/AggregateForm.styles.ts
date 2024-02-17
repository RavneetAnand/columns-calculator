// AggregateForm.tsx
import styled from 'styled-components';
import { Checkbox, HTMLSelect } from '@blueprintjs/core';
import { ActionButton } from '../Slider/Slider.styles';

export const FormContainer = styled.div`
  /* Align the content to left */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  background: #fff;
  padding: 0 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FunctionCheckbox = styled(Checkbox)`
  margin-bottom: 10px;
`;

export const ActionButton2 = styled(ActionButton)`
  margin-right: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const StyledHTMLSelect = styled(HTMLSelect)`
  display: block;
  width: 100%;
  margin-bottom: 10px;

  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;

  border: 0.5px solid black;
  border-radius: 3px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; // Transition for focus
  background-color: #2dd3bf !important;

  &:focus {
    border-color: #66afe9;
    outline: 0; // Remove default focus outline
    box-shadow: 0 0 5px rgba(102, 175, 233, 0.6); // Glow effect on focus
  }
`;
