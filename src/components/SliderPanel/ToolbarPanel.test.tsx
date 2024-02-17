import { fireEvent, render } from '@testing-library/react';
import { SliderPanelType } from './SliderPanel';
import { ToolbarPanel } from './ToolbarPanel';

const mockToggleSlider = jest.fn();
const mockHandleSliderPanel = jest.fn();

const renderComponent = () => {
  return render(
    <ToolbarPanel
      toggleSlider={mockToggleSlider}
      handleSliderPanel={mockHandleSliderPanel}
    />,
  );
};

describe('ToolbarPanel', () => {
  it('should render without crashing', () => {
    renderComponent();
  });

  it('should call toggleSlider and handleSliderPanel with ADD_COLUMN when add column button is clicked', () => {
    const screen = renderComponent();

    const addCalculatedColumnButton = screen.getByTestId(
      'addCalculatedColumnBtn',
    );
    fireEvent.click(addCalculatedColumnButton);

    expect(mockToggleSlider).toHaveBeenCalled();
    expect(mockHandleSliderPanel).toHaveBeenCalledWith(
      SliderPanelType.ADD_COLUMN,
    );
  });

  it('should call toggleSlider and handleSliderPanel with AGGREGATE_FUNCTION when aggregate function button is clicked', () => {
    const screen = renderComponent();

    const manageAggregateFunctionsButton = screen.getByTestId(
      'manageAggregateFunctionsBtn',
    );
    fireEvent.click(manageAggregateFunctionsButton);

    expect(mockToggleSlider).toHaveBeenCalled();
    expect(mockHandleSliderPanel).toHaveBeenCalledWith(
      SliderPanelType.AGGREGATE_FUNCTION,
    );
  });
});
