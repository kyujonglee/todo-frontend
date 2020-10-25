import { createReducer } from '@reduxjs/toolkit';
import { all, call, takeEvery } from 'redux-saga/effects';
import { createRequestAction } from '../helpers';
import * as api from './api';

export const getTodos = createRequestAction('todos/GET_TODOS');
export const getTodo = createRequestAction('todos/GET_TODO');
export const removeTodo = createRequestAction('todos/REMOVE_TODO');
export const createTodo = createRequestAction('todos/CREATE_TODO');

const initialState = {
  todos: null,
  todo: null,
};

export const todoReducer = createReducer(initialState, (builder) =>
  builder.addCase(getTodos.SUCCESS, (state, action) => {
    state.todos = action.payload;
  }).addCase(getTodo.SUCCESS, (state, action) => {
      state.todo = action.payload;
  })
);

export function* todoSaga() {
  yield all([
    takeEvery(getTodos.REQUEST, function* () {
      const response = yield call(api.getTodos);
      return response.data;
    }),
    takeEvery(getTodo.REQUEST, function* (action) {
      const { payload: todoId } = action;
      yield call(api.getTodo, todoId);
    }),
    takeEvery(removeTodo.REQUEST, function* (action) {
      const { payload: todoId } = action;
      yield call(api.removeTodo, todoId);
    }),
  ]);
}
