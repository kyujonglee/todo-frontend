import { createReducer } from '@reduxjs/toolkit';

export const pendingReducer = createReducer({}, (builder) =>
  builder.addDefaultCase((state, action) => {
    const { type } = action;
  })
);
