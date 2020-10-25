import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  all,
  call,
  debounce,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  createRequestAction,
  createRequestSaga,
  createRequestThunk,
} from '../helpers';
import * as api from './api';

export const getTodos = createRequestAction('todos/GET_TODOS');
export const getTodo = createRequestAction('todos/GET_TODO');
export const removeTodo = createRequestAction('todos/REMOVE_TODO');
export const removeTodoThunk = createRequestThunk(removeTodo);
export const createTodo = createRequestAction('todos/CREATE_TODO');
export const createTodoThunk = createRequestThunk(createTodo);
export const createTodoLog = createAction('todos/CREATE_TODO_LOG');

const initialState = {
  todos: [],
  todo: null,
  todoLog: [],
};

export const todoReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getTodos.SUCCESS, (state, action) => {
      state.todos = action.payload;
    })
    .addCase(getTodo.SUCCESS, (state, action) => {
      state.todo = action.payload;
    })
    .addCase(removeTodo.SUCCESS, (state, action) => {
      const { payload: todoId } = action;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
      state.todo?.id === todoId && (state.todo = null);
    })
    .addCase(createTodo.SUCCESS, (state, action) => {
      const { payload: newTodo } = action;
      state.todos.push(newTodo);
    })
    .addCase(createTodoLog, (state, action) => {
      const { payload: log } = action;
      state.todoLog.push({
        content: log,
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      });
    })
);

export function* todoSaga() {
  yield all([
    takeEvery(
      getTodos.REQUEST,
      createRequestSaga(getTodos, function* () {
        delay(1000);
        const response = yield call(api.getTodos);
        return response.data;
      })
    ),
    takeLatest(
      getTodo.REQUEST,
      createRequestSaga(getTodo, function* (action) {
        delay(100);
        const { payload: todoId } = action;
        const todo = yield select((state) => state.todo.todo);
        yield put(createTodoLog(`Todo Detail (todoId: ${todoId})`));

        let resultTodo;
        if (todo && todo.id === todoId) resultTodo = todo;
        ({ data: resultTodo } = yield call(api.getTodo, todoId));

        return resultTodo;
      })
    ),
    takeEvery(
      removeTodo.REQUEST,
      createRequestSaga(removeTodo, function* (action) {
        const { payload: todoId } = action;
        yield call(api.removeTodo, todoId);
        yield put(createTodoLog(`todo removed (todoId: ${todoId})`));
        return todoId;
      })
    ),
    debounce(
      300,
      createTodo.REQUEST,
      createRequestSaga(createTodo, function* (action) {
        const { payload: todoData } = action;
        const response = yield call(api.createTodo, todoData);
        yield put(
          createTodoLog(
            `todo added (title: ${todoData.title}, content: ${todoData.content})`
          )
        );
        return response.data;
      })
    ),
  ]);
}
