import { Intent, OverlayToaster, Position } from '@blueprintjs/core';

const AppToaster = OverlayToaster.create({
  position: Position.TOP,
});

export const showToast = (
  message: string,
  intent: Intent | undefined = 'primary',
  timeout = 5000,
) => {
  AppToaster.show({ message, intent, timeout });
};
