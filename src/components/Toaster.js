import { Position, Toaster } from '@blueprintjs/core';

const AppToaster =
  typeof window !== 'undefined'
    ? Toaster.create({
        className: 'recipe-toaster',
        position: Position.TOP,
      })
    : null;

export default AppToaster;
