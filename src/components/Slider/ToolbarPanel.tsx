import { SliderPanel } from './Slider';
import { ToolbarButton, ToolbarContainer } from './Slider.styles';
import { Icon, Tooltip } from '@blueprintjs/core';

type Props = {
  toggleSlider: () => void;
  handleSliderPanel: (panel: SliderPanel) => void;
};

export const ToolbarPanel = ({ toggleSlider, handleSliderPanel }: Props) => {
  const handleButtonClick = (panel: SliderPanel) => {
    handleSliderPanel(panel);
    toggleSlider();
  };

  return (
    <>
      <ToolbarContainer>
        <div>
          <Tooltip
            content={<span>Add calculated column</span>}
            placement="right"
          >
            <ToolbarButton
              onClick={() => handleButtonClick(SliderPanel.ADD_COLUMN)}
            >
              <Icon icon="add-column-right" size={20} />
            </ToolbarButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip
            content={<span>Manage aggregate functions</span>}
            placement="right"
          >
            <ToolbarButton
              onClick={() => handleButtonClick(SliderPanel.AGGREGATE_FUNCTION)}
            >
              <Icon icon="function" size={20} />
            </ToolbarButton>
          </Tooltip>
        </div>
      </ToolbarContainer>
    </>
  );
};
