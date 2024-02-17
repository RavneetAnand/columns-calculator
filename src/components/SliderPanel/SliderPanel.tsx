import React, { useState } from 'react';
import { FormulaBuilder } from '../FormulaBuilder/FormulaBuilder';
import {
  SliderContainer,
  ChevronCloseButton,
  SliderHeader,
  Title,
} from './SliderPanel.styles';
import { ToolbarPanel } from './ToolbarPanel';
import AggregateForm from '../AggregateForm/AggregateForm';

export enum SliderPanelType {
  ADD_COLUMN = 'add_column',
  AGGREGATE_FUNCTION = 'aggregate_function',
}

export const SliderPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<SliderPanelType>(
    SliderPanelType.ADD_COLUMN,
  );

  const toggleSlider = () => setIsOpen(!isOpen);

  const handleSliderPanel = (panel: SliderPanelType) => {
    switch (panel) {
      case SliderPanelType.ADD_COLUMN:
        setActivePanel(SliderPanelType.ADD_COLUMN);
        break;
      case SliderPanelType.AGGREGATE_FUNCTION:
        setActivePanel(SliderPanelType.AGGREGATE_FUNCTION);
        break;
      default:
        setActivePanel(SliderPanelType.ADD_COLUMN);
    }
  };

  const panelHeaderTitle =
    activePanel === SliderPanelType.ADD_COLUMN
      ? 'Add Calculated Column'
      : 'Choose Aggregate Functions';

  return (
    <>
      <ToolbarPanel
        toggleSlider={toggleSlider}
        handleSliderPanel={handleSliderPanel}
      />
      <SliderContainer $isOpen={isOpen} data-testid="sliderContainer">
        <ChevronCloseButton
          onClick={toggleSlider}
          data-testid="closeSliderButton"
          icon={'double-chevron-left'}
        />
        <SliderHeader>
          <Title>{panelHeaderTitle}</Title>
        </SliderHeader>
        {activePanel === SliderPanelType.ADD_COLUMN ? (
          <FormulaBuilder toggleSlider={toggleSlider} />
        ) : (
          <AggregateForm />
        )}
      </SliderContainer>
    </>
  );
};
