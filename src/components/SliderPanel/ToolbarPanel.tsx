import { SliderPanelType } from './SliderPanel';
import { ToolbarButton, ToolbarContainer } from './SliderPanel.styles';
import { Icon, Tooltip } from '@blueprintjs/core';

type Props = {
  toggleSlider: () => void;
  handleSliderPanel: (panel: SliderPanelType) => void;
};

export const ToolbarPanel = ({ toggleSlider, handleSliderPanel }: Props) => {
  const handleButtonClick = (panel: SliderPanelType) => {
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
              onClick={() => handleButtonClick(SliderPanelType.ADD_COLUMN)}
              data-testid="addCalculatedColumnBtn"
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
              data-testid="manageAggregateFunctionsBtn"
              onClick={() =>
                handleButtonClick(SliderPanelType.AGGREGATE_FUNCTION)
              }
            >
              <Icon icon="function" size={20} />
            </ToolbarButton>
          </Tooltip>
        </div>
      </ToolbarContainer>
    </>
  );
};
