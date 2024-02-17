import React, { useState } from 'react';
import { FormulaBuilder } from '../FormulaBuilder/FormulaBuilder';
import {
  SliderContainer,
  ChevronCloseButton,
  SliderHeader,
  Title,
} from './Slider.styles';
import { ToolbarPanel } from './ToolbarPanel';
import AggregateForm from '../AggregateForm/AggregateForm';

export enum SliderPanel {
  ADD_COLUMN = 'add_column',
  AGGREGATE_FUNCTION = 'aggregate_function',
}

export const Slider: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<SliderPanel>(
    SliderPanel.ADD_COLUMN,
  );

  const toggleSlider = () => setIsOpen(!isOpen);

  const handleSliderPanel = (panel: SliderPanel) => {
    switch (panel) {
      case SliderPanel.ADD_COLUMN:
        setActivePanel(SliderPanel.ADD_COLUMN);
        break;
      case SliderPanel.AGGREGATE_FUNCTION:
        setActivePanel(SliderPanel.AGGREGATE_FUNCTION);
        break;
      default:
        setActivePanel(SliderPanel.ADD_COLUMN);
    }
  };

  const panelHeaderTitle =
    activePanel === SliderPanel.ADD_COLUMN
      ? 'Add Calculated Column'
      : 'Choose Aggregate Functions';

  return (
    <>
      <ToolbarPanel
        toggleSlider={toggleSlider}
        handleSliderPanel={handleSliderPanel}
      />
      <SliderContainer $isOpen={isOpen}>
        <ChevronCloseButton
          onClick={toggleSlider}
          icon={'double-chevron-left'}
        />
        <SliderHeader>
          <Title>{panelHeaderTitle}</Title>
        </SliderHeader>
        {activePanel === SliderPanel.ADD_COLUMN ? (
          <FormulaBuilder toggleSlider={toggleSlider} />
        ) : (
          <AggregateForm />
        )}
      </SliderContainer>
    </>
  );
};
