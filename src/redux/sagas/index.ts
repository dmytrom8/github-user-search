/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, fork } from 'redux-saga/effects';
import userSaga from './user.saga';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
  ]);
}

export interface ResponseGenerator{
  config?: any,
  data?: any,
  headers?: any,
  request?: any,
  status?: number,
  statusText?: string
}
