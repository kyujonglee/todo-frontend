import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { pendingReducer } from './pending';
import { todoReducer, todoSaga } from './todos';

// root reducer
export const rootReducer = combineReducers({
  todo: todoReducer,
  pending: pendingReducer,
});

// root saga
export function* rootSaga() {
  yield all([fork(todoSaga)]);
}
