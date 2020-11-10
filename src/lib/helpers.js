import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import { rootReducer, rootSaga } from '../modules';

export const createStore = (preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, sagaMiddleware],
    preloadedState,
  });

  const sagaTask = sagaMiddleware.run(rootSaga);

  return { store, sagaTask };
};
