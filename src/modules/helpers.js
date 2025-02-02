import { createAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';

export function createRequestAction(type) {
  const REQUEST = `${type}/REQUEST`;
  const SUCCESS = `${type}/SUCCESS`;
  const FAILURE = `${type}/FAILURE`;

  return {
    type,
    REQUEST,
    SUCCESS,
    FAILURE,
    request: createAction(REQUEST, (payload, meta) => ({ payload, meta })),
    success: createAction(SUCCESS, (payload, meta) => ({ payload, meta })),
    failure: createAction(FAILURE, (payload, meta) => ({ payload, meta })),
  };
}

export function createRequestThunk(actions) {
  return (payload, meta) => (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({ ...actions.request(payload, meta), resolve, reject });
    });
  };
}

export function createRequestSaga(actions, saga) {
  return function* (action) {
    try {
      const result = yield call(saga, action);
      yield put(actions.success(result, action.meta));
      if (action.resolve) action.resolve(result);
    } catch (e) {
      if (process.env.NODE_ENV === 'development') console.error(e);
      yield put(actions.failure(e, action.meta));
      if (action.reject) action.reject(e);
    }
  };
}
