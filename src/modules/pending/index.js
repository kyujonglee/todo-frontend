import { createReducer } from '@reduxjs/toolkit';

export const pendingReducer = createReducer({}, (builder) =>
  builder.addDefaultCase((state, action) => {
    const { type } = action;
    const actionName = type.split('/').slice(0, -1).join('/');
    if (actionName) {
      if (type.endsWith('/REQUEST')) {
        state[actionName] = true;
      } else if (type.endsWith('/SUCCESS') || type.endsWith('/FAILURE')) {
        state[actionName] = false;
      }
    }
  })
);
