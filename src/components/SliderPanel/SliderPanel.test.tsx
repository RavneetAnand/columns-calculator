import { fireEvent, render } from '@testing-library/react';
import { SliderPanel } from './SliderPanel';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

describe('SliderPanel', () => {
  it('should render without crashing', () => {
    render(<SliderPanel />);
  });

  it('should open and close the slider when the toggle button is clicked', () => {
    const { getByTestId } = render(<SliderPanel />);

    const toggleButton = getByTestId('closeSliderButton');

    act(() => {
      fireEvent.click(toggleButton);
    });
    // Container should be open
    expect(getByTestId('sliderContainer')).toHaveStyle('left: 0');

    act(() => {
      fireEvent.click(toggleButton);
    });
    // Container should be closed
    expect(getByTestId('sliderContainer')).toHaveStyle('left: -100%');
  });

  it('should display the FormulaBuilder panel when the add column button is clicked', () => {
    const { getByTestId } = render(<SliderPanel />);

    const addButton = getByTestId('addCalculatedColumnBtn');

    act(() => {
      fireEvent.click(addButton);
    });

    expect(getByTestId('formulaBuilderPanel')).toBeDefined();
  });

  it('should display the AggregateForm panel when the aggregate function button is clicked', () => {
    const { getByTestId } = render(<SliderPanel />);

    const aggregateButton = getByTestId('manageAggregateFunctionsBtn');

    act(() => {
      fireEvent.click(aggregateButton);
    });

    expect(getByTestId('aggregateFormPanel')).toBeDefined();
  });
});
