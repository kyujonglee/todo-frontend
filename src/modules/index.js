import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { errorReducer } from './error';
import { pendingReducer } from './pending';
import { todoReducer, todoSaga } from './todos';

// root reducer
export const rootReducer = combineReducers({
  todo: todoReducer,
  pending: pendingReducer,
  error: errorReducer,
});

// root saga
export function* rootSaga() {
  yield all([fork(todoSaga)]);
}
