import styled from 'styled-components';
import { Button } from '@blueprintjs/core';

export const SliderContainer = styled.div<{ $isOpen: boolean }>`
  height: 100%;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: ${(props) => (props.$isOpen ? '0' : '-100%')};
  width: 350px;
  transition: left 0.3s;
  z-index: 1000;
  overflow-x: hidden;
`;

export const ToolbarContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 10px;
  background-color: #fff;
  padding: 5px 10px;
  z-index: 1000;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

export const SliderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  background-color: #2dd3bf;
`;

export const Title = styled.h3`
  margin: 0;
  padding: 10px 0;
`;

export const ToolbarButton = styled(Button)`
  background-color: #fff !important;
  width: 40px;
  height: 40px;

  /* Background should have light gray border */
  border: 1px solid rgb(17 20 24 / 39%);
  border-radius: 50%;
  margin: 8px 0px;

  .bp5-icon {
    color: #2dd3bf;
  }

  &:hover {
    background-color: #f5f5f5; // Lighter background on hover
    border-color: #5c7080; // Slightly darker border on hover
    box-shadow: 0 0 0 1px #5c7080, 0 2px 6px rgba(17, 20, 24, 0.2);

    .bp5-icon {
      color: #2d99b6; // Change icon color on hover
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #c4dbf1;
  }
`;

export const ChevronCloseButton = styled(Button)`
  margin-left: 300px;
  margin-top: 5px;
  margin-bottom: 5px;
  /* Color should be black with white background */
  background-color: white !important;

  /* Background should have no border */
  border: none;
  box-shadow: none !important;

  .bp5-icon {
    color: black;
  }
`;

export const ActionButton = styled(Button)`
  background-color: black !important;
  color: white !important;
  border-radius: 5px;

  // Hover style
  &:hover {
    background-color: #333 !important;
    color: #f0f0f0 !important;
    cursor: pointer;
  }

  // Disabled style
  &:disabled {
    background-color: #666 !important;
    color: #a0a0a0 !important;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
