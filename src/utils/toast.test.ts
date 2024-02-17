import { OverlayToaster, Position } from '@blueprintjs/core';
import { showToast } from './toast';

// Mock the OverlayToaster.create function
jest.mock('@blueprintjs/core', () => ({
  OverlayToaster: {
    create: jest.fn().mockReturnValue({ show: jest.fn() }),
  },
  Position: {
    TOP: 'top',
  },
}));

describe('AppToaster', () => {
  it('should call OverlayToaster.create with correct parameters', () => {
    showToast('Hello, world!');

    expect(OverlayToaster.create).toHaveBeenCalledWith({
      position: Position.TOP,
    });

    expect(OverlayToaster.create().show).toHaveBeenCalledWith({
      message: 'Hello, world!',
      intent: 'primary',
      timeout: 5000,
    });
  });
});
