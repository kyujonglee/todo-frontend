import { createReducer } from '@reduxjs/toolkit';

export const errorReducer = createReducer({}, (builder) =>
  builder.addDefaultCase((state, action) => {
    const { type } = action;
    const actionName = type.split('/').slice(0, -1).join('/');
    if (actionName) {
      if (type.endsWith('/REQUEST')) {
        state[actionName] = false;
      } else if (type.endsWith('/FAILURE')) {
        state[actionName] = true;
      }
    }
  })
);
